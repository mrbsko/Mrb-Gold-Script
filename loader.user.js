// ==UserScript==
// @name         MRB Gold Edition Loader v3.1 Status
// @namespace    https://barafranca.nl
// @version      3.1.0
// @description  Stabiele GitHub-loader met zichtbare versie/status, sandbox-koppeling, dubbele reservekopie en automatische rollback.
// @author       Mrb
// @match        http://barafranca.nl/*
// @match        https://barafranca.nl/*
// @match        http://*.barafranca.nl/*
// @match        https://*.barafranca.nl/*
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      maker.ifttt.com
// @connect      script.google.com
// @connect      script.googleusercontent.com
// ==/UserScript==

(function () {
    'use strict';

    const LOADER_VERSION = '3.1.0';
    const SCRIPT_URL = 'https://raw.githubusercontent.com/Mrbsko/Mrb-Gold-Script/main/mrb-gold.js';

    const KEY = Object.freeze({
        currentCode: 'mrb_loader_v3_current_code',
        currentTime: 'mrb_loader_v3_current_time',
        currentHash: 'mrb_loader_v3_current_hash',
        previousCode: 'mrb_loader_v3_previous_code',
        previousTime: 'mrb_loader_v3_previous_time',
        previousHash: 'mrb_loader_v3_previous_hash',
        lastSource: 'mrb_loader_v3_last_source',
        lastError: 'mrb_loader_v3_last_error',
        lastSuccess: 'mrb_loader_v3_last_success',
        lastVersion: 'mrb_loader_v3_last_version',
        lastHash: 'mrb_loader_v3_last_started_hash',
        lastChecked: 'mrb_loader_v3_last_checked'
    });

    const RUN_GUARD = '__MRB_GOLD_LOADER_V3_ACTIVE__';
    const SCRIPT_GUARD = '__MRB_GOLD_SCRIPT_V3_STARTED__';
    const RECOVERY_KEY = 'mrb_loader_v3_recovery_mode';
    const RECOVERY_COUNT_KEY = 'mrb_loader_v3_recovery_count';

    const MIN_SCRIPT_LENGTH = 50_000;
    const REQUEST_TIMEOUT = 30_000;
    const MAX_ATTEMPTS = 3;
    const RETRY_DELAY_MS = 2_500;
    const MAX_RECOVERY_RELOADS = 2;

    const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;


    // Zichtbare loaderstatus. Blijft compact rechtsboven staan en kan worden
    // aangeklikt voor details. De status wordt ook beschikbaar op unsafeWindow.
    const STATUS_ID = 'mrbLoaderStatusV31';
    let statusHideTimer = 0;

    function extractScriptVersion(code) {
        const match = String(code || '').match(/^\s*\/\/\s*@version\s+([^\r\n]+)/mi);
        return match ? String(match[1]).trim() : 'onbekend';
    }

    function ensureStatusBox() {
        let box = document.getElementById(STATUS_ID);
        if (box) return box;
        box = document.createElement('div');
        box.id = STATUS_ID;
        box.setAttribute('role', 'status');
        box.title = 'Klik voor loaderdetails';
        Object.assign(box.style, {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '2147483647',
            maxWidth: '340px',
            padding: '7px 10px',
            borderRadius: '9px',
            border: '1px solid rgba(212,175,55,.85)',
            background: 'rgba(20,16,8,.96)',
            color: '#ffe08a',
            font: '12px/1.35 Arial,sans-serif',
            boxShadow: '0 4px 18px rgba(0,0,0,.45)',
            cursor: 'pointer',
            userSelect: 'none'
        });
        box.addEventListener('click', () => {
            const d = pageWindow.__MRB_LOADER_STATUS__ || {};
            alert([
                `MRB Loader v${LOADER_VERSION}`,
                `Status: ${d.message || 'onbekend'}`,
                `MRB-versie: ${d.scriptVersion || 'onbekend'}`,
                `Bron: ${d.source || 'onbekend'}`,
                `Hash: ${d.hash || 'onbekend'}`,
                `Laatste controle: ${d.checkedAt ? new Date(d.checkedAt).toLocaleString('nl-NL') : 'onbekend'}`
            ].join('\n'));
        });
        (document.documentElement || document.body).appendChild(box);
        return box;
    }

    function setVisibleStatus(message, state = 'info', details = {}, autoHideMs = 0) {
        const colors = {
            info:  { border: 'rgba(212,175,55,.85)', color: '#ffe08a', icon: '⏳' },
            ok:    { border: 'rgba(105,255,135,.65)', color: '#b8ffbf', icon: '✅' },
            warn:  { border: 'rgba(255,190,70,.75)', color: '#ffe08a', icon: '⚠️' },
            error: { border: 'rgba(255,100,100,.75)', color: '#ffb5b5', icon: '❌' }
        };
        const theme = colors[state] || colors.info;
        const box = ensureStatusBox();
        box.style.borderColor = theme.border;
        box.style.color = theme.color;
        box.textContent = `${theme.icon} ${message}`;
        box.style.display = 'block';

        const snapshot = {
            loaderVersion: LOADER_VERSION,
            message,
            state,
            source: details.source || '',
            scriptVersion: details.scriptVersion || '',
            hash: details.hash || '',
            checkedAt: details.checkedAt || Date.now()
        };
        pageWindow.__MRB_LOADER_STATUS__ = snapshot;

        if (statusHideTimer) window.clearTimeout(statusHideTimer);
        if (autoHideMs > 0) {
            statusHideTimer = window.setTimeout(() => {
                box.style.opacity = '0.72';
                box.textContent = `✅ MRB ${snapshot.scriptVersion || ''} geladen`;
            }, autoHideMs);
        }
    }

    if (pageWindow[RUN_GUARD]) {
        console.info('[MRB Loader v3] Loader is op deze pagina al actief.');
        return;
    }
    pageWindow[RUN_GUARD] = true;
    setVisibleStatus('Controleren op de nieuwste MRB-versie…', 'info');

    function log(message, ...extra) {
        console.info(`[MRB Loader v${LOADER_VERSION}] ${message}`, ...extra);
    }

    function warn(message, ...extra) {
        console.warn(`[MRB Loader v${LOADER_VERSION}] ${message}`, ...extra);
    }

    function fail(message, ...extra) {
        try { GM_setValue(KEY.lastError, `${new Date().toISOString()} | ${message}`); } catch (_) {}
        console.error(`[MRB Loader v${LOADER_VERSION}] ${message}`, ...extra);
    }

    function simpleHash(text) {
        let hash = 2166136261;
        for (let i = 0; i < text.length; i += 1) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return (`00000000${(hash >>> 0).toString(16)}`).slice(-8);
    }

    function isValidScript(code) {
        if (typeof code !== 'string') return false;
        const text = code.trim();

        if (text.length < MIN_SCRIPT_LENGTH) return false;
        if (!text.includes('// ==UserScript==')) return false;
        if (!/MRB Gold Edition|Mrb script NL/i.test(text.slice(0, 10_000))) return false;
        if (!text.includes('(function')) return false;

        if (/^\s*<!doctype html/i.test(text) || /^\s*<html/i.test(text)) return false;
        if (/404:\s*Not Found|429:\s*Too Many Requests|503\s*Service Unavailable|Unsupported Media Type/i.test(text)) return false;

        return true;
    }

    function compileScript(code, sourceLabel) {
        return new Function(
            'unsafeWindow',
            'GM_addStyle',
            'GM_setValue',
            'GM_getValue',
            'GM_notification',
            'GM_xmlhttpRequest',
            `${code}\n//# sourceURL=mrb-gold-${sourceLabel}.js`
        );
    }

    function executeScript(code, sourceLabel) {
        if (pageWindow[SCRIPT_GUARD]) {
            warn(`Het hoofdscript is al gestart; tweede start via ${sourceLabel} is geblokkeerd.`);
            return true;
        }

        if (!isValidScript(code)) {
            fail(`Versie uit ${sourceLabel} is ongeldig en wordt niet uitgevoerd.`);
            return false;
        }

        let runner;
        try {
            runner = compileScript(code, sourceLabel);
        } catch (error) {
            setVisibleStatus(`Compileren mislukt via ${sourceLabel}`, 'error', { source: sourceLabel });
            fail(`Compileren via ${sourceLabel} mislukt.`, error);
            return false;
        }

        pageWindow[SCRIPT_GUARD] = true;
        try {
            runner(
                pageWindow,
                GM_addStyle,
                GM_setValue,
                GM_getValue,
                GM_notification,
                GM_xmlhttpRequest
            );

            const startedHash = simpleHash(code);
            const scriptVersion = extractScriptVersion(code);
            const checkedAt = Date.now();
            GM_setValue(KEY.lastSource, sourceLabel);
            GM_setValue(KEY.lastSuccess, checkedAt);
            GM_setValue(KEY.lastChecked, checkedAt);
            GM_setValue(KEY.lastVersion, scriptVersion);
            GM_setValue(KEY.lastHash, startedHash);
            GM_setValue(KEY.lastError, '');
            sessionStorage.removeItem(RECOVERY_KEY);
            sessionStorage.removeItem(RECOVERY_COUNT_KEY);
            setVisibleStatus(`MRB v${scriptVersion} geladen via ${sourceLabel} • ${startedHash}`, 'ok', {
                source: sourceLabel, scriptVersion, hash: startedHash, checkedAt
            }, 7000);
            log(`MRB Gold v${scriptVersion} gestart via ${sourceLabel} (hash ${startedHash}).`);
            return true;
        } catch (error) {
            pageWindow[SCRIPT_GUARD] = false;
            setVisibleStatus(`Starten mislukt via ${sourceLabel}`, 'error', { source: sourceLabel });
            fail(`Uitvoeren via ${sourceLabel} mislukt.`, error);
            return false;
        }
    }

    function readSlot(slot) {
        const prefix = slot === 'previous' ? 'previous' : 'current';
        return {
            code: String(GM_getValue(KEY[`${prefix}Code`], '') || ''),
            time: Number(GM_getValue(KEY[`${prefix}Time`], 0)) || 0,
            hash: String(GM_getValue(KEY[`${prefix}Hash`], '') || '')
        };
    }

    function slotDescription(slot, data) {
        const date = data.time ? new Date(data.time).toLocaleString('nl-NL') : 'onbekende datum';
        return `${slot === 'previous' ? 'vorige reserveversie' : 'huidige reserveversie'} (${date}, hash ${data.hash || 'onbekend'})`;
    }

    function storeSuccessfulDownload(code) {
        const newHash = simpleHash(code);
        const current = readSlot('current');

        if (current.hash === newHash && isValidScript(current.code)) {
            GM_setValue(KEY.currentTime, Date.now());
            log(`GitHub-versie is ongewijzigd (hash ${newHash}); reservedatum bijgewerkt.`);
            return;
        }

        if (isValidScript(current.code)) {
            GM_setValue(KEY.previousCode, current.code);
            GM_setValue(KEY.previousTime, current.time || Date.now());
            GM_setValue(KEY.previousHash, current.hash || simpleHash(current.code));
        }

        GM_setValue(KEY.currentCode, code);
        GM_setValue(KEY.currentTime, Date.now());
        GM_setValue(KEY.currentHash, newHash);
        log(`Nieuwe werkende GitHub-versie opgeslagen (hash ${newHash}).`);
    }

    function requestRecoveryReload(mode, reason) {
        const count = Number(sessionStorage.getItem(RECOVERY_COUNT_KEY) || 0);
        if (count >= MAX_RECOVERY_RELOADS) {
            fail(`Automatische rollback gestopt na ${count} herstelpogingen. Laatste reden: ${reason}`);
            return false;
        }

        sessionStorage.setItem(RECOVERY_KEY, mode);
        sessionStorage.setItem(RECOVERY_COUNT_KEY, String(count + 1));
        warn(`Pagina wordt eenmaal herladen voor rollback naar ${mode}. Reden: ${reason}`);
        window.setTimeout(() => location.reload(), 500);
        return true;
    }

    function runSlot(slot, reason, allowReloadFallback = true) {
        const data = readSlot(slot);
        if (!isValidScript(data.code)) {
            fail(`Geen geldige ${slotDescription(slot, data)} beschikbaar. ${reason || ''}`);
            if (slot === 'current' && allowReloadFallback) {
                return runSlot('previous', reason, false);
            }
            return false;
        }

        setVisibleStatus(`${reason || 'GitHub niet beschikbaar.'} Reserveversie starten…`, 'warn', { source: slot });
        warn(`${reason || 'GitHub niet beschikbaar.'} Start ${slotDescription(slot, data)}.`);
        if (executeScript(data.code, slot === 'previous' ? 'cache-previous' : 'cache-current')) return true;

        if (slot === 'current' && allowReloadFallback) {
            return requestRecoveryReload('previous', 'De huidige reserveversie gaf een uitvoerfout.');
        }
        return false;
    }

    function handleRecoveryMode() {
        const mode = String(sessionStorage.getItem(RECOVERY_KEY) || '');
        if (!mode) return false;

        if (mode === 'previous') {
            sessionStorage.removeItem(RECOVERY_KEY);
            runSlot('previous', 'Automatische rollback na een uitvoerfout.', false);
            return true;
        }

        if (mode === 'current') {
            sessionStorage.removeItem(RECOVERY_KEY);
            runSlot('current', 'Automatisch herstel met de laatst werkende versie.', true);
            return true;
        }

        sessionStorage.removeItem(RECOVERY_KEY);
        return false;
    }

    function retryOrUseCache(attempt, reason) {
        if (attempt < MAX_ATTEMPTS) {
            const wait = RETRY_DELAY_MS * attempt;
            setVisibleStatus(`${reason} Nieuwe poging volgt…`, 'warn');
            warn(`${reason} Nieuwe poging over ${Math.round(wait / 1000)} seconden.`);
            window.setTimeout(() => downloadLatest(attempt + 1), wait);
            return;
        }

        runSlot('current', `${reason} Alle ${MAX_ATTEMPTS} downloadpogingen zijn mislukt.`, true);
    }

    function downloadLatest(attempt) {
        const separator = SCRIPT_URL.includes('?') ? '&' : '?';
        const freshUrl = `${SCRIPT_URL}${separator}mrb_v3=${Date.now()}_${attempt}`;

        setVisibleStatus(`GitHub controleren (${attempt}/${MAX_ATTEMPTS})…`, 'info');
        log(`GitHub-versie ophalen, poging ${attempt}/${MAX_ATTEMPTS}.`);

        GM_xmlhttpRequest({
            method: 'GET',
            url: freshUrl,
            headers: {
                'Cache-Control': 'no-cache, no-store, max-age=0',
                'Pragma': 'no-cache',
                'Accept': 'text/plain, application/javascript;q=0.9, */*;q=0.1'
            },
            timeout: REQUEST_TIMEOUT,

            onload(response) {
                const status = Number(response.status || 0);
                const code = String(response.responseText || '').trim();
                const contentType = String(response.responseHeaders || '').match(/content-type:\s*([^\r\n]+)/i)?.[1] || '';

                if (status < 200 || status >= 300) {
                    retryOrUseCache(attempt, `GitHub gaf HTTP-status ${status || 'onbekend'}.`);
                    return;
                }

                if (!isValidScript(code)) {
                    retryOrUseCache(attempt, `GitHub-download is geen geldig MRB-script${contentType ? ` (${contentType})` : ''}.`);
                    return;
                }

                // Eerst syntactisch controleren voordat er iets op de pagina wordt uitgevoerd.
                try {
                    compileScript(code, 'github-validation');
                } catch (error) {
                    retryOrUseCache(attempt, `De GitHub-versie bevat een syntaxfout: ${error.message || error}`);
                    return;
                }

                if (executeScript(code, 'github')) {
                    storeSuccessfulDownload(code);
                    return;
                }

                // Een runtimefout kan al gedeeltelijke paginawijzigingen hebben veroorzaakt.
                // Herlaad daarom schoon en gebruik daarna de laatst werkende cache.
                requestRecoveryReload('current', 'De nieuwe GitHub-versie gaf tijdens de start een uitvoerfout.');
            },

            onerror(error) {
                retryOrUseCache(attempt, 'Netwerkfout tijdens het ophalen van GitHub.');
                console.debug('[MRB Loader v3] Netwerkdetails:', error);
            },

            ontimeout() {
                retryOrUseCache(attempt, `GitHub reageerde niet binnen ${REQUEST_TIMEOUT / 1000} seconden.`);
            },

            onabort() {
                retryOrUseCache(attempt, 'De GitHub-aanvraag werd afgebroken.');
            }
        });
    }

    log(`Loader gestart op ${location.hostname}.`);

    if (!handleRecoveryMode()) {
        downloadLatest(1);
    }
})();
