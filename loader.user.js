// ==UserScript==
// @name         MRB Gold Edition Loader
// @namespace    https://barafranca.nl
// @version      11.12.42
// @description  Laadt automatisch de nieuwste MRB Gold-versie vanaf GitHub met stille cache en rollback.
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
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      raw.githubusercontent.com
// @connect      maker.ifttt.com
// @connect      script.google.com
// @connect      script.googleusercontent.com
// @updateURL    https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/loader.user.js
// @downloadURL  https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/loader.user.js
// ==/UserScript==
(function () {
    'use strict';

    const LOADER_VERSION = '11.12.42';
    const SCRIPT_URL = 'https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/mrb-gold.js';
    const REQUEST_TIMEOUT = 30000;
    const MIN_SCRIPT_LENGTH = 50000;
    const RUN_GUARD = '__MRB_GOLD_LOADER_ACTIVE__';
    const SCRIPT_GUARD = '__MRB_GOLD_SCRIPT_STARTED__';
    const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
    const KEY = Object.freeze({
        currentCode: 'mrb_loader_v4_current_code',
        currentHash: 'mrb_loader_v4_current_hash',
        currentVersion: 'mrb_loader_v4_current_version',
        currentTime: 'mrb_loader_v4_current_time',
        previousCode: 'mrb_loader_v4_previous_code',
        previousHash: 'mrb_loader_v4_previous_hash',
        previousVersion: 'mrb_loader_v4_previous_version',
        previousTime: 'mrb_loader_v4_previous_time',
        lastSource: 'mrb_loader_v4_last_source',
        lastError: 'mrb_loader_v4_last_error',
        lastSuccess: 'mrb_loader_v4_last_success'
    });
    if (pageWindow[RUN_GUARD]) {
        console.info('[MRB Loader] Tweede start geblokkeerd.');
        return;
    }
    pageWindow[RUN_GUARD] = true;

    function log(message, ...extra) {
        console.info(`[MRB Loader ${LOADER_VERSION}] ${message}`, ...extra);
    }

    function warn(message, ...extra) {
        console.warn(`[MRB Loader ${LOADER_VERSION}] ${message}`, ...extra);
    }
    function extractVersion(code) {
        const match = String(code || '').match(/^\/\/\s*@version\s+([^\s]+)\s*$/im);
        return match ? match[1].trim() : 'onbekend';
    }

    function simpleHash(text) {
        let hash = 2166136261;
        const source = String(text || '');
        for (let i = 0; i < source.length; i += 1) {
            hash ^= source.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return (`00000000${(hash >>> 0).toString(16)}`).slice(-8);
    }
    function isValidScript(code) {
        if (typeof code !== 'string') return false;
        const text = code.trim();
        return text.length >= MIN_SCRIPT_LENGTH &&
            text.includes('// ==UserScript==') &&
            /MRB Gold(?: Edition| Recovery)?|Mrb script NL/i.test(text.slice(0, 12000)) &&
            !/^\s*(?:<!doctype html|<html)/i.test(text) &&
            !/404:\s*Not Found|429:\s*Too Many Requests|503\s*Service Unavailable/i.test(text);
    }
    function exposeStatus(source, code, error = '') {
        const status = Object.freeze({
            loaderVersion: LOADER_VERSION,
            source,
            scriptVersion: extractVersion(code),
            hash: code ? simpleHash(code) : '',
            loadedAt: error ? 0 : Date.now(),
            error
        });
        pageWindow.mrbLoaderStatus = status;
        try {
            GM_setValue(KEY.lastSource, source);
            GM_setValue(KEY.lastError, error);
            if (!error) GM_setValue(KEY.lastSuccess, status.loadedAt);
        } catch (_) {}
    }
    function executeScript(code, source) {
        if (!isValidScript(code)) throw new Error(`Ongeldige code uit ${source}`);
        if (pageWindow[SCRIPT_GUARD]) {
            log(`MRB draait al; tweede start via ${source} geblokkeerd.`);
            return true;
        }
        pageWindow[SCRIPT_GUARD] = true;
        try {
            // Directe eval draait in dezelfde Tampermonkey-sandbox als de loader.
            // Daardoor blijven GM_* functies en normale globale scriptrelaties beschikbaar.
            eval(`${code}\n//# sourceURL=mrb-gold-${source}.js`);
            exposeStatus(source, code);
            log(`MRB Gold ${extractVersion(code)} gestart via ${source} (${simpleHash(code)}).`);
            return true;
        } catch (error) {
            pageWindow[SCRIPT_GUARD] = false;
            exposeStatus(source, code, String(error && error.stack ? error.stack : error));
            console.error(`[MRB Loader ${LOADER_VERSION}] Uitvoeren via ${source} mislukt.`, error);
            return false;
        }
    }
    function readSlot(prefix) {
        return {
            code: String(GM_getValue(KEY[`${prefix}Code`], '') || ''),
            hash: String(GM_getValue(KEY[`${prefix}Hash`], '') || ''),
            version: String(GM_getValue(KEY[`${prefix}Version`], '') || ''),
            time: Number(GM_getValue(KEY[`${prefix}Time`], 0)) || 0
        };
    }
    function storeDownload(code) {
        const newHash = simpleHash(code);
        const current = readSlot('current');
        if (current.hash === newHash && isValidScript(current.code)) {
            GM_setValue(KEY.currentTime, Date.now());
            return;
        }
        if (isValidScript(current.code)) {
            GM_setValue(KEY.previousCode, current.code);
            GM_setValue(KEY.previousHash, current.hash || simpleHash(current.code));
            GM_setValue(KEY.previousVersion, current.version || extractVersion(current.code));
            GM_setValue(KEY.previousTime, current.time || Date.now());
        }
        GM_setValue(KEY.currentCode, code);
        GM_setValue(KEY.currentHash, newHash);
        GM_setValue(KEY.currentVersion, extractVersion(code));
        GM_setValue(KEY.currentTime, Date.now());
    }
    function migrateLegacyCache() {
        if (isValidScript(readSlot('current').code)) return;
        const legacyCode = String(GM_getValue('mrb_loader_v31_current_code', '') || '');
        if (isValidScript(legacyCode)) {
            GM_setValue(KEY.currentCode, legacyCode);
            GM_setValue(KEY.currentHash, simpleHash(legacyCode));
            GM_setValue(KEY.currentVersion, extractVersion(legacyCode));
            GM_setValue(KEY.currentTime, Date.now());
            log('Werkende cache uit Loader 3.x overgenomen.');
        }
    }
    function runFallback(reason) {
        warn(reason);
        const current = readSlot('current');
        if (isValidScript(current.code) && executeScript(current.code, 'cache')) return true;
        const previous = readSlot('previous');
        if (isValidScript(previous.code) && executeScript(previous.code, 'vorige-cache')) return true;
        const message = 'MRB kon niet worden geladen vanaf GitHub en er is geen werkende cache beschikbaar.';
        exposeStatus('geen', '', message);
        console.error(`[MRB Loader ${LOADER_VERSION}] ${message}`);
        try {
            GM_notification({ title: 'MRB Loader', text: message, timeout: 8000 });
        } catch (_) {}
        return false;
    }
    function downloadLatest() {
        log('GitHub-versie ophalen.');
        GM_xmlhttpRequest({
            method: 'GET',
            url: `${SCRIPT_URL}?t=${Date.now()}`,
            timeout: REQUEST_TIMEOUT,
            headers: { 'Cache-Control': 'no-cache' },
            onload(response) {
                const code = String(response.responseText || '');
                if (response.status < 200 || response.status >= 300 || !isValidScript(code)) {
                    runFallback(`GitHub gaf geen geldig MRB-bestand terug (HTTP ${response.status}).`);
                    return;
                }
                if (executeScript(code, 'github')) storeDownload(code);
                else runFallback('De GitHub-versie gaf een runtimefout. Cache wordt geprobeerd.');
            },
            ontimeout() {
                runFallback('GitHub-verzoek liep vast. Cache wordt geprobeerd.');
            },
            onerror(error) {
                runFallback('GitHub kon niet worden bereikt. Cache wordt geprobeerd.');
                console.error('[MRB Loader] Netwerkfout:', error);
            }
        });
    }
    try {
        migrateLegacyCache();
        downloadLatest();
    } catch (error) {
        runFallback(`Loaderfout: ${error && error.message ? error.message : error}`);
    }
}());
