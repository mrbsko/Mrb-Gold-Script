// ==UserScript==
// @name         MRB Gold Loader
// @namespace    https://github.com/Mrbsko
// @version      12.0.0
// @description  Loader voor MRB Gold Script
// @match        https://*.barafranca.nl/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addElement
// @connect      raw.githubusercontent.com
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    if (window.__MRB_LOADER_RUNNING__) return;
    window.__MRB_LOADER_RUNNING__ = true;

    const SCRIPT_URL =
        "https://raw.githubusercontent.com/Mrbsko/Mrb-Gold-Script/main/mrb-gold.js";

    const CACHE_KEY = "MRB_GOLD_CACHE";
    const VERSION_KEY = "MRB_GOLD_CACHE_TIME";

    function log(...args) {
        console.log("[MRB Loader]", ...args);
    }

    function inject(code) {
        try {
            const s = document.createElement("script");
            s.textContent = code;
            document.documentElement.appendChild(s);
            s.remove();
            log("Script geïnjecteerd.");
        } catch (e) {
            console.error("Injectie mislukt", e);
        }
    }

    function loadCache() {
        const cached = GM_getValue(CACHE_KEY, "");
        if (cached && cached.length > 1000) {
            log("Cache gebruikt.");
            inject(cached);
            return true;
        }
        return false;
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: SCRIPT_URL + "?t=" + Date.now(),
        headers: {
            "Cache-Control": "no-cache"
        },
        onload(response) {

            if (
                response.status === 200 &&
                response.responseText &&
                response.responseText.includes("// ==UserScript==")
            ) {

                log("Nieuw script geladen vanaf GitHub.");

                GM_setValue(CACHE_KEY, response.responseText);
                GM_setValue(VERSION_KEY, Date.now());

                inject(response.responseText);

            } else {

                log("GitHub antwoord ongeldig, cache wordt gebruikt.");

                if (!loadCache()) {
                    alert("MRB Loader: geen geldig script gevonden.");
                }
            }
        },

        onerror() {

            log("GitHub niet bereikbaar.");

            if (!loadCache()) {
                alert("MRB Loader: geen internet of cache beschikbaar.");
            }
        }

    });

})();
