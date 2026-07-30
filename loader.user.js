// ==UserScript==
// @name         MRB Gold Edition Loader v3.1 Source Status
// @namespace    https://barafranca.nl
// @version      3.1.0
// @description  Laadt MRB Gold vanaf GitHub met rollback en toont bron, versie, hash en laadstatus.
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
// @updateURL    https://raw.githubusercontent.com/Mrbsko/Mrb-Gold-Script/main/loader.user.js
// @downloadURL  https://raw.githubusercontent.com/Mrbsko/Mrb-Gold-Script/main/loader.user.js
// ==/UserScript==

(function () {
    'use strict';

    const LOADER_VERSION = '3.1.0';
    const SCRIPT_URL = 'https://raw.githubusercontent.com/Mrbsko/Mrb-Gold-Script/main/mrb-gold.js';

    const KEY = Object.freeze({
        currentCode: 'mrb_loader_v31_current_code',
        currentTime: 'mrb_loader_v31_current_time',
        currentHash: 'mrb_loader_v31_current_hash',
        currentVersion: 'mrb_loader_v31_current_version',
        previousCode: 'mrb_loader_v31_previous_code',
        previousTime: 'mrb_loader_v31_previous_time',
        previousHash: 'mrb_loader_v31_previous_hash',
        previousVersion: 'mrb_loader_v31_previous_version',
        lastSource: 'mrb_loader_v31_last_source',
        lastVersion: 'mrb_loader_v31_last_version',
        lastHash: 'mrb_loader_v31_last_hash',
        lastError: 'mrb_loader_v31_last_error',
        lastSuccess: 'mrb_loader_v31_last_success'
    });

    const RUN_GUARD = '__MRB_GOLD_LOADER_V31_ACTIVE__';
    const SCRIPT_GUARD = '__MRB_GOLD_SCRIPT_V31_STARTED__';
    const RECOVERY_KEY = 'mrb_loader_v31_recovery_mode';
    const RECOVERY_COUNT_KEY = 'mrb_loader_v31_recovery_count';
    const MIN_SCRIPT_LENGTH = 50000;
    const REQUEST_TIMEOUT = 30000;
    const MAX_ATTEMPTS = 3;
    const RETRY_DELAY_MS = 2500;
    const MAX_RECOVERY_RELOADS = 2;
    const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

    if (pageWindow[RUN_GUARD]) {
        console.info('[MRB Loader v3.1] Loader is op deze pagina al actief.');
        return;
    }
    pageWindow[RUN_GUARD] = true;

    const state = {
        loaderVersion: LOADER_VERSION,
        status: 'starten',
        source: 'nog niet geladen',
        scriptVersion: 'onbekend',
        hash: 'onbekend',
        loadedAt: 0,
        error: ''
    };

    function extractVersion(code) {
        const text = String(code || '');
        const header = text.match(/\/\/\s*@version\s+([^\s]+)/i);
        if (header && header[1]) return header[1].trim();
        const named = text.match(/\b(?:Version\s*:\s*v?|MRB GOLD EDITION\s+v)(\d+\.\d+\.\d+(?:\.\d+)?)/i);
        return named && named[1] ? named[1] : 'onbekend';
    }

    function simpleHash(text) {
        let hash = 2166136261;
        for (let i = 0; i < text.length; i += 1) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return (`00000000${(hash >>> 0).toString(16)}`).slice(-8);
    }

    function publishStatus(patch) {
        Object.assign(state, patch || {});
        pageWindow.mrbLoaderStatus = Object.freeze({ ...state });
        try {
            GM_setValue(KEY.lastSource, state.source);
            GM_setValue(KEY.lastVersion, state.scriptVersion);
            GM_setValue(KEY.lastHash, state.hash);
            GM_setValue(KEY.lastSuccess, state.loadedAt || 0);
            GM_setValue(KEY.lastError, state.error || '');
        } catch (_) {}
        renderStatus();
    }

    function renderStatus() {
        let box = document.getElementById('mrb-loader-source-status');
        if (!box) {
            box = document.createElement('div');
            box.id = 'mrb-loader-source-status';
            box.title = 'Klik om de loaderstatus in de console te tonen';
            box.addEventListener('click', () => console.info('[MRB Loader status]', pageWindow.mrbLoaderStatus));
            document.documentElement.appendChild(box);
        }
        const ok = state.status === 'geladen';
        const source = state.source === 'github' ? 'GitHub' : state.source.startsWith('cache') ? 'Cache' : state.source;
        box.className = ok ? 'mrb-loader-ok' : state.error ? 'mrb-loader-error' : 'mrb-loader-loading';
        box.innerHTML = `<strong>MRB ${state.scriptVersion}</strong><span>${source} | ${state.hash}</span>`;
    }

    GM_addStyle(`
      #mrb-loader-source-status{position:fixed;right:10px;bottom:10px;z-index:2147483646;min-width:145px;padding:7px 10px;border-radius:9px;font:12px/1.25 Arial,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.25);color:#fff;background:rgba(20,20,20,.92)}
      #mrb-loader-source-status strong,#mrb-loader-source-status span{display:block}#mrb-loader-source-status span{font-size:10px;opacity:.86;margin-top:2px}
      #mrb-loader-source-status.mrb-loader-ok{border-color:#66d17a;background:rgba(16,65,27,.94)}
      #mrb-loader-source-status.mrb-loader-loading{border-color:#d4af37;background:rgba(75,58,12,.94)}
      #mrb-loader-source-status.mrb-loader-error{border-color:#ef6b6b;background:rgba(90,20,20,.95)}
    `);

    function log(message, ...extra) { console.info(`[MRB Loader v${LOADER_VERSION}] ${message}`, ...extra); }
    function warn(message, ...extra) { console.warn(`[MRB Loader v${LOADER_VERSION}] ${message}`, ...extra); }
    function fail(message, ...extra) {
        const errorText = `${new Date().toISOString()} | ${message}`;
        publishStatus({ status: 'fout', error: errorText });
        console.error(`[MRB Loader v${LOADER_VERSION}] ${message}`, ...extra);
    }

    function isValidScript(code) {
        if (typeof code !== 'string') return false;
        const text = code.trim();
        if (text.length < MIN_SCRIPT_LENGTH) return false;
        if (!text.includes('// ==UserScript==')) return false;
        if (!/MRB Gold Edition|Mrb script NL/i.test(text.slice(0, 10000))) return false;
        if (!text.includes('(function')) return false;
        if (/^\s*<!doctype html/i.test(text) || /^\s*<html/i.test(text)) return false;
        if (/404:\s*Not Found|429:\s*Too Many Requests|503\s*Service Unavailable|Unsupported Media Type/i.test(text)) return false;
        return true;
    }

    function compileScript(code, sourceLabel) {
        return new Function('unsafeWindow','GM_addStyle','GM_setValue','GM_getValue','GM_notification','GM_xmlhttpRequest',`${code}\n//# sourceURL=mrb-gold-${sourceLabel}.js`);
    }

    function executeScript(code, sourceLabel) {
        const version = extractVersion(code);
        const hash = simpleHash(code);
        if (pageWindow[SCRIPT_GUARD]) {
            warn(`Het hoofdscript is al gestart; tweede start via ${sourceLabel} is geblokkeerd.`);
            return true;
        }
        if (!isValidScript(code)) { fail(`Versie uit ${sourceLabel} is ongeldig.`); return false; }
        let runner;
        try { runner = compileScript(code, sourceLabel); }
        catch (error) { fail(`Compileren via ${sourceLabel} mislukt.`, error); return false; }
        pageWindow[SCRIPT_GUARD] = true;
        try {
            runner(pageWindow, GM_addStyle, GM_setValue, GM_getValue, GM_notification, GM_xmlhttpRequest);
            publishStatus({ status:'geladen', source:sourceLabel, scriptVersion:version, hash, loadedAt:Date.now(), error:'' });
            sessionStorage.removeItem(RECOVERY_KEY);
            sessionStorage.removeItem(RECOVERY_COUNT_KEY);
            log(`MRB Gold ${version} gestart via ${sourceLabel} (hash ${hash}).`);
            return true;
        } catch (error) {
            pageWindow[SCRIPT_GUARD] = false;
            fail(`Uitvoeren via ${sourceLabel} mislukt.`, error);
            return false;
        }
    }

    function readSlot(slot) {
        const p = slot === 'previous' ? 'previous' : 'current';
        return {
            code: String(GM_getValue(KEY[`${p}Code`], '') || ''),
            time: Number(GM_getValue(KEY[`${p}Time`], 0)) || 0,
            hash: String(GM_getValue(KEY[`${p}Hash`], '') || ''),
            version: String(GM_getValue(KEY[`${p}Version`], '') || '')
        };
    }

    function storeSuccessfulDownload(code) {
        const newHash = simpleHash(code);
        const newVersion = extractVersion(code);
        const current = readSlot('current');
        if (current.hash === newHash && isValidScript(current.code)) {
            GM_setValue(KEY.currentTime, Date.now());
            GM_setValue(KEY.currentVersion, newVersion);
            return;
        }
        if (isValidScript(current.code)) {
            GM_setValue(KEY.previousCode, current.code);
            GM_setValue(KEY.previousTime, current.time || Date.now());
            GM_setValue(KEY.previousHash, current.hash || simpleHash(current.code));
            GM_setValue(KEY.previousVersion, current.version || extractVersion(current.code));
        }
        GM_setValue(KEY.currentCode, code);
        GM_setValue(KEY.currentTime, Date.now());
        GM_setValue(KEY.currentHash, newHash);
        GM_setValue(KEY.currentVersion, newVersion);
    }

    function runSlot(slot, reason, allowPrevious = true) {
        const data = readSlot(slot);
        if (!isValidScript(data.code)) {
            fail(`Geen geldige ${slot}-cache beschikbaar. ${reason || ''}`);
            return slot === 'current' && allowPrevious ? runSlot('previous', reason, false) : false;
        }
        warn(`${reason || 'GitHub niet beschikbaar.'} Cache ${data.version || extractVersion(data.code)} wordt gestart.`);
        return executeScript(data.code, slot === 'previous' ? 'cache-previous' : 'cache-current');
    }

    function requestRecoveryReload(mode, reason) {
        const count = Number(sessionStorage.getItem(RECOVERY_COUNT_KEY) || 0);
        if (count >= MAX_RECOVERY_RELOADS) { fail(`Rollback gestopt na ${count} pogingen. ${reason}`); return false; }
        sessionStorage.setItem(RECOVERY_KEY, mode);
        sessionStorage.setItem(RECOVERY_COUNT_KEY, String(count + 1));
        warn(`Pagina wordt herladen voor rollback naar ${mode}. ${reason}`);
        window.setTimeout(() => location.reload(), 500);
        return true;
    }

    function handleRecoveryMode() {
        const mode = String(sessionStorage.getItem(RECOVERY_KEY) || '');
        if (!mode) return false;
        sessionStorage.removeItem(RECOVERY_KEY);
        return runSlot(mode === 'previous' ? 'previous' : 'current', 'Automatische rollback na uitvoerfout.', mode !== 'previous');
    }

    function retryOrUseCache(attempt, reason) {
        if (attempt < MAX_ATTEMPTS) {
            const wait = RETRY_DELAY_MS * attempt;
            warn(`${reason} Nieuwe poging over ${Math.round(wait / 1000)} seconden.`);
            window.setTimeout(() => downloadLatest(attempt + 1), wait);
            return;
        }
        runSlot('current', `${reason} Alle downloadpogingen zijn mislukt.`, true);
    }

    function downloadLatest(attempt) {
        publishStatus({ status:'downloaden', source:'github', error:'' });
        const freshUrl = `${SCRIPT_URL}?mrb_v31=${Date.now()}_${attempt}`;
        log(`GitHub-versie ophalen, poging ${attempt}/${MAX_ATTEMPTS}.`);
        GM_xmlhttpRequest({
            method:'GET', url:freshUrl,
            headers:{'Cache-Control':'no-cache, no-store, max-age=0','Pragma':'no-cache','Accept':'text/plain, application/javascript;q=0.9, */*;q=0.1'},
            timeout:REQUEST_TIMEOUT,
            onload(response) {
                const status = Number(response.status || 0);
                const code = String(response.responseText || '').trim();
                if (status < 200 || status >= 300) { retryOrUseCache(attempt, `GitHub gaf HTTP ${status || 'onbekend'}.`); return; }
                if (!isValidScript(code)) { retryOrUseCache(attempt, 'GitHub-download is geen geldig MRB-script.'); return; }
                try { compileScript(code, 'github-validation'); }
                catch (error) { retryOrUseCache(attempt, `GitHub-versie bevat syntaxfout: ${error.message || error}`); return; }
                if (executeScript(code, 'github')) { storeSuccessfulDownload(code); return; }
                requestRecoveryReload('current', 'Nieuwe GitHub-versie gaf een runtimefout.');
            },
            onerror(error) { retryOrUseCache(attempt, 'Netwerkfout tijdens ophalen van GitHub.'); console.debug('[MRB Loader v3.1]', error); },
            ontimeout() { retryOrUseCache(attempt, `GitHub reageerde niet binnen ${REQUEST_TIMEOUT / 1000} seconden.`); },
            onabort() { retryOrUseCache(attempt, 'GitHub-aanvraag werd afgebroken.'); }
        });
    }

    publishStatus({ status:'starten', source:'loader', scriptVersion:'...', hash:'........' });
    log(`Loader gestart op ${location.hostname}.`);
    if (!handleRecoveryMode()) downloadLatest(1);
})();
