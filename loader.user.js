// ==UserScript==
// @name         MRB Gold Edition Loader v2.1 Failsafe
// @namespace    https://barafranca.nl
// @version      2.1.0
// @description  Laadt de nieuwste MRB Gold Edition vanaf GitHub en gebruikt bij een storing automatisch de laatst werkende versie.
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

    const SCRIPT_URL = 'https://raw.githubusercontent.com/Mrbsko/Mrb-Gold-Script/main/mrb-gold.js';
    const CACHE_KEY = 'mrb_loader_cached_script_v2';
    const CACHE_TIME_KEY = 'mrb_loader_cached_script_time_v2';
    const RUN_GUARD = '__MRB_GOLD_LOADER_ACTIVE__';
    const MIN_SCRIPT_LENGTH = 1000;
    const REQUEST_TIMEOUT = 30000;
    const MAX_ATTEMPTS = 3;
    const RETRY_DELAY_MS = 2500;

    const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

    if (pageWindow[RUN_GUARD]) {
        console.info('[MRB Loader] Loader is op deze pagina al gestart.');
        return;
    }
    pageWindow[RUN_GUARD] = true;

    function isValidScript(code) {
        if (typeof code !== 'string') return false;

        const trimmed = code.trim();
        if (trimmed.length < MIN_SCRIPT_LENGTH) return false;

        const invalidResponses = [
            'Unsupported Media Type',
            '404: Not Found',
            '429: Too Many Requests',
            '503 Service Unavailable'
        ];

        return !invalidResponses.some((text) => trimmed.includes(text));
    }

    function executeScript(code, sourceLabel) {
        try {
            const runner = new Function(
                `${code}\n//# sourceURL=mrb-gold-${sourceLabel}.js`
            );
            runner();
            console.info(`[MRB Loader] MRB Gold gestart via ${sourceLabel}.`);
            return true;
        } catch (error) {
            console.error(`[MRB Loader] Uitvoeren via ${sourceLabel} mislukt:`, error);
            return false;
        }
    }

    function runCachedVersion(reason) {
        const cachedCode = GM_getValue(CACHE_KEY, '');
        const cachedAt = Number(GM_getValue(CACHE_TIME_KEY, 0));

        if (!isValidScript(cachedCode)) {
            console.error('[MRB Loader] Geen geldige reserveversie beschikbaar.', reason || '');
            return false;
        }

        const cacheDate = cachedAt ? new Date(cachedAt).toLocaleString() : 'onbekend';
        console.warn(`[MRB Loader] GitHub niet beschikbaar. Reserveversie van ${cacheDate} wordt gestart.`, reason || '');
        return executeScript(cachedCode, 'cache');
    }

    function downloadLatest(attempt) {
        const separator = SCRIPT_URL.includes('?') ? '&' : '?';
        const freshUrl = `${SCRIPT_URL}${separator}mrb_cache_bust=${Date.now()}_${attempt}`;

        GM_xmlhttpRequest({
            method: 'GET',
            url: freshUrl,
            headers: {
                'Cache-Control': 'no-cache, no-store, max-age=0',
                'Pragma': 'no-cache'
            },
            timeout: REQUEST_TIMEOUT,

            onload(response) {
                const statusOk = response.status >= 200 && response.status < 300;
                const code = String(response.responseText || '').trim();

                if (!statusOk || !isValidScript(code)) {
                    const reason = `Ongeldige download (status ${response.status || 'onbekend'}, poging ${attempt}/${MAX_ATTEMPTS}).`;
                    console.error('[MRB Loader]', reason);
                    retryOrUseCache(attempt, reason);
                    return;
                }

                // Eerst uitvoeren. Alleen een daadwerkelijk uitvoerbare versie opslaan.
                if (executeScript(code, 'github')) {
                    GM_setValue(CACHE_KEY, code);
                    GM_setValue(CACHE_TIME_KEY, Date.now());
                    console.info('[MRB Loader] Nieuwste werkende GitHub-versie is als reserve opgeslagen.');
                } else {
                    runCachedVersion('De gedownloade versie bevatte een uitvoerfout.');
                }
            },

            onerror(error) {
                const reason = `Netwerkfout bij GitHub, poging ${attempt}/${MAX_ATTEMPTS}.`;
                console.error('[MRB Loader]', reason, error);
                retryOrUseCache(attempt, reason);
            },

            ontimeout() {
                const reason = `GitHub-aanvraag duurde langer dan ${REQUEST_TIMEOUT / 1000} seconden, poging ${attempt}/${MAX_ATTEMPTS}.`;
                console.error('[MRB Loader]', reason);
                retryOrUseCache(attempt, reason);
            }
        });
    }

    function retryOrUseCache(attempt, reason) {
        if (attempt < MAX_ATTEMPTS) {
            window.setTimeout(() => downloadLatest(attempt + 1), RETRY_DELAY_MS * attempt);
            return;
        }

        runCachedVersion(reason);
    }

    downloadLatest(1);
})();
