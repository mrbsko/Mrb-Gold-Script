// ==UserScript==
// @name         MRB Gold Edition Loader
// @namespace    https://barafranca.nl
// @version      11.11.20
// @description  Laadt bij iedere paginalaad direct de nieuwste MRB Gold Edition vanaf GitHub
// @author       Mrb
// @include      http://*.barafranca.nl/*
// @include      https://*.barafranca.nl/*
// @include      http://barafranca.nl/*
// @include      https://barafranca.nl/*
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

    const SCRIPT_URL = 'https://raw.githubusercontent.com/Mrbsko/Mrb-Gold-Script/main/mrb-gold.js';
    const freshUrl = `${SCRIPT_URL}?mrb_cache_bust=${Date.now()}`;

    GM_xmlhttpRequest({
        method: 'GET',
        url: freshUrl,
        headers: {
            'Cache-Control': 'no-cache, no-store, max-age=0',
            'Pragma': 'no-cache'
        },
        timeout: 30000,
        onload(response) {
            if (response.status < 200 || response.status >= 300) {
                console.error('[MRB Loader] Download mislukt:', response.status, response.statusText);
                return;
            }

            const code = String(response.responseText || '').trim();
            if (!code || code === 'Unsupported Media Type' || code.length < 1000) {
                console.error('[MRB Loader] Ongeldige of onvolledige scriptinhoud ontvangen.');
                return;
            }

            try {
                // Uitvoeren in de Tampermonkey-sandbox, zodat GM_* functies beschikbaar blijven.
                const runLatestMrb = new Function(`${code}\n//# sourceURL=mrb-gold-latest.js`);
                runLatestMrb();
                console.info('[MRB Loader] Nieuwste GitHub-versie geladen:', new Date().toLocaleString());
            } catch (error) {
                console.error('[MRB Loader] Uitvoeren van MRB Gold mislukt:', error);
            }
        },
        onerror(error) {
            console.error('[MRB Loader] Netwerkfout bij ophalen van MRB Gold:', error);
        },
        ontimeout() {
            console.error('[MRB Loader] Ophalen van MRB Gold duurde langer dan 30 seconden.');
        }
    });
})();
