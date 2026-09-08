// ==UserScript==
// @name         MRB Night Manager GitHub Loader
// @namespace    https://github.com/mrbsko/Mrb-Gold-Script/night-manager-loader
// @version      1.1.0
// @description  Laadt de MRB Heist Night Manager automatisch vanaf GitHub met lokale cache en rollback.
// @author       Mrb
// @match        http://barafranca.nl/*
// @match        https://barafranca.nl/*
// @match        http://*.barafranca.nl/*
// @match        https://*.barafranca.nl/*
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      raw.githubusercontent.com
// @updateURL    https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/night-manager-loader-v1.1.user.js
// @downloadURL  https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/night-manager-loader-v1.1.user.js
// ==/UserScript==

(function () {
  'use strict';

  const LOADER_VERSION = '1.1.0';
  const SCRIPT_URL = 'https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/mrb-night-manager.js';
  const REQUEST_TIMEOUT = 30000;
  const MIN_SCRIPT_LENGTH = 50000;
  const RUN_GUARD = '__MRB_NIGHT_MANAGER_GITHUB_LOADER_V11_ACTIVE__';
  const SCRIPT_GUARD = '__MRB_NIGHT_MANAGER_GITHUB_CORE_STARTED__';
  const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

  const KEY = Object.freeze({
    currentCode: 'mrb_night_github_loader_v11_current_code',
    currentHash: 'mrb_night_github_loader_v11_current_hash',
    currentVersion: 'mrb_night_github_loader_v11_current_version',
    currentTime: 'mrb_night_github_loader_v11_current_time',
    previousCode: 'mrb_night_github_loader_v11_previous_code',
    previousHash: 'mrb_night_github_loader_v11_previous_hash',
    previousVersion: 'mrb_night_github_loader_v11_previous_version',
    previousTime: 'mrb_night_github_loader_v11_previous_time',
    lastSource: 'mrb_night_github_loader_v11_last_source',
    lastError: 'mrb_night_github_loader_v11_last_error',
    lastSuccess: 'mrb_night_github_loader_v11_last_success'
  });

  if (pageWindow[RUN_GUARD]) {
    console.info('[MRB Night Loader] Tweede loader-start geblokkeerd.');
    return;
  }
  pageWindow[RUN_GUARD] = true;

  const log = (msg, ...extra) => console.info(`[MRB Night Loader ${LOADER_VERSION}] ${msg}`, ...extra);
  const warn = (msg, ...extra) => console.warn(`[MRB Night Loader ${LOADER_VERSION}] ${msg}`, ...extra);

  function extractVersion(source) {
    const m = String(source || '').match(/^\/\/\s*@version\s+([^\s]+)\s*$/im);
    return m ? m[1].trim() : 'onbekend';
  }

  function simpleHash(source) {
    let hash = 2166136261;
    const s = String(source || '');
    for (let i = 0; i < s.length; i++) {
      hash ^= s.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (`00000000${(hash >>> 0).toString(16)}`).slice(-8);
  }

  function validScript(source) {
    if (typeof source !== 'string' || source.length < MIN_SCRIPT_LENGTH) return false;
    const bad = ['404: Not Found', '429: Too Many Requests', '503 Service Unavailable', '<html'];
    if (bad.some(x => source.includes(x))) return false;
    return /MRB Heist Night Manager/i.test(source) && /MRBNightStandaloneCore/i.test(source);
  }

  function execute(source, label) {
    if (pageWindow[SCRIPT_GUARD]) {
      log('Night Manager is op deze pagina al gestart.');
      return true;
    }

    try {
      const runner = new Function(
        'unsafeWindow',
        'GM_setValue',
        'GM_getValue',
        'GM_deleteValue',
        'GM_addStyle',
        `${source}\n//# sourceURL=mrb-night-manager-${label}.js`
      );

      pageWindow[SCRIPT_GUARD] = true;
      runner(
        pageWindow,
        GM_setValue,
        GM_getValue,
        GM_deleteValue,
        GM_addStyle
      );

      GM_setValue(KEY.lastSource, label);
      GM_setValue(KEY.lastSuccess, Date.now());
      GM_setValue(KEY.lastError, '');
      log(`Night Manager ${extractVersion(source)} gestart via ${label}.`);
      return true;
    } catch (err) {
      pageWindow[SCRIPT_GUARD] = false;
      GM_setValue(KEY.lastError, String(err && (err.stack || err.message) || err));
      warn(`Uitvoeren via ${label} mislukt.`, err);
      return false;
    }
  }

  function promoteToCache(source) {
    const hash = simpleHash(source);
    const currentHash = GM_getValue(KEY.currentHash, '');

    if (currentHash === hash) return;

    const old = GM_getValue(KEY.currentCode, '');
    if (validScript(old)) {
      GM_setValue(KEY.previousCode, old);
      GM_setValue(KEY.previousHash, GM_getValue(KEY.currentHash, ''));
      GM_setValue(KEY.previousVersion, GM_getValue(KEY.currentVersion, extractVersion(old)));
      GM_setValue(KEY.previousTime, GM_getValue(KEY.currentTime, 0));
    }

    GM_setValue(KEY.currentCode, source);
    GM_setValue(KEY.currentHash, hash);
    GM_setValue(KEY.currentVersion, extractVersion(source));
    GM_setValue(KEY.currentTime, Date.now());
  }

  function runCache(reason) {
    const current = GM_getValue(KEY.currentCode, '');
    if (validScript(current) && execute(current, 'cache')) {
      warn(`GitHub niet gebruikt; actuele cache gestart. ${reason || ''}`);
      return true;
    }

    const previous = GM_getValue(KEY.previousCode, '');
    if (validScript(previous) && execute(previous, 'rollback')) {
      warn(`Rollback-versie gestart. ${reason || ''}`);
      return true;
    }

    warn('Geen geldige cache of rollback beschikbaar.', reason || '');
    return false;
  }

  function fetchLatest() {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${SCRIPT_URL}?t=${Date.now()}`,
      timeout: REQUEST_TIMEOUT,
      headers: {
        'Accept': 'text/plain, text/javascript, application/javascript, */*'
      },
      onload(response) {
        const source = String(response.responseText || '');

        if (response.status < 200 || response.status >= 300 || !validScript(source)) {
          runCache(`GitHub-response ongeldig (HTTP ${response.status}).`);
          return;
        }

        // Eerst uitvoeren; alleen een werkende bron promoveren naar cache.
        if (execute(source, 'github')) {
          promoteToCache(source);
        } else {
          runCache('Nieuwe GitHub-versie gaf een uitvoerfout.');
        }
      },
      onerror() {
        runCache('GitHub-request mislukt.');
      },
      ontimeout() {
        runCache('GitHub-request timeout.');
      }
    });
  }

  try {
    GM_registerMenuCommand('Night Manager: cache-info', () => {
      alert(
        `Bron: ${GM_getValue(KEY.lastSource, '-')}\n` +
        `Versie: ${GM_getValue(KEY.currentVersion, '-')}\n` +
        `Laatste succes: ${GM_getValue(KEY.lastSuccess, 0) ? new Date(GM_getValue(KEY.lastSuccess, 0)).toLocaleString('nl-NL') : '-'}\n` +
        `Laatste fout: ${GM_getValue(KEY.lastError, '-') || '-'}`
      );
    });
  } catch (_) {}

  fetchLatest();
})();
