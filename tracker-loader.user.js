// ==UserScript==
// @name         MRB Tracker Suite Loader
// @namespace    https://barafranca.nl
// @version      1.0.0
// @description  Laadt automatisch de nieuwste MRB Tracker Suite vanaf GitHub met lokale cache en rollback.
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
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @updateURL    https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/tracker-loader.user.js
// @downloadURL  https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/tracker-loader.user.js
// ==/UserScript==

(function () {
  'use strict';

  const LOADER_VERSION = '1.0.0';
  const SCRIPT_URL = 'https://raw.githubusercontent.com/mrbsko/Mrb-Gold-Script/main/mrb-tracker.js';
  const REQUEST_TIMEOUT = 30000;
  const MIN_SCRIPT_LENGTH = 10000;
  const RUN_GUARD = '__MRB_TRACKER_LOADER_ACTIVE__';
  const pageWindow = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;

  const KEY = Object.freeze({
    currentCode: 'mrb_tracker_loader_current_code_v1',
    currentVersion: 'mrb_tracker_loader_current_version_v1',
    currentTime: 'mrb_tracker_loader_current_time_v1',
    previousCode: 'mrb_tracker_loader_previous_code_v1',
    previousVersion: 'mrb_tracker_loader_previous_version_v1',
    previousTime: 'mrb_tracker_loader_previous_time_v1',
    lastSource: 'mrb_tracker_loader_last_source_v1',
    lastError: 'mrb_tracker_loader_last_error_v1',
    lastSuccess: 'mrb_tracker_loader_last_success_v1'
  });

  if (pageWindow[RUN_GUARD]) {
    console.info('[MRB Tracker Loader] Tweede loader-start geblokkeerd.');
    return;
  }
  pageWindow[RUN_GUARD] = true;

  function log(msg, ...rest) {
    console.info(`[MRB Tracker Loader ${LOADER_VERSION}] ${msg}`, ...rest);
  }
  function warn(msg, ...rest) {
    console.warn(`[MRB Tracker Loader ${LOADER_VERSION}] ${msg}`, ...rest);
  }

  function extractVersion(code) {
    const m = String(code || '').match(/^\/\/\s*@version\s+([^\s]+)\s*$/im);
    return m ? m[1].trim() : 'onbekend';
  }

  function isValidScript(code) {
    if (typeof code !== 'string') return false;
    const t = code.trim();
    if (t.length < MIN_SCRIPT_LENGTH) return false;
    if (!t.includes('MRB Tracker Suite')) return false;
    if (!t.includes('mrb_plating_tracker_db_v1')) return false;
    if (!t.includes('mrb_moneydrop_history')) return false;
    return !['404: Not Found','429: Too Many Requests','503 Service Unavailable','Unsupported Media Type'].some(x => t.includes(x));
  }

  function executeScript(code, sourceLabel) {
    try {
      const runner = new Function(
        'unsafeWindow',
        'GM_getValue',
        'GM_setValue',
        'GM_deleteValue',
        `${code}\n//# sourceURL=mrb-tracker-${sourceLabel}.js`
      );
      runner(pageWindow, GM_getValue, GM_setValue, GM_deleteValue);
      GM_setValue(KEY.lastSource, sourceLabel);
      GM_setValue(KEY.lastSuccess, Date.now());
      GM_setValue(KEY.lastError, '');
      log(`Tracker ${extractVersion(code)} gestart via ${sourceLabel}.`);
      return true;
    } catch (e) {
      GM_setValue(KEY.lastError, String(e && e.stack ? e.stack : e));
      warn(`Uitvoeren via ${sourceLabel} mislukt.`, e);
      return false;
    }
  }

  function runCached(reason) {
    const current = GM_getValue(KEY.currentCode, '');
    if (isValidScript(current) && executeScript(current, 'cache')) {
      warn('GitHub niet beschikbaar; actuele cache gebruikt.', reason || '');
      return true;
    }
    const previous = GM_getValue(KEY.previousCode, '');
    if (isValidScript(previous) && executeScript(previous, 'rollback')) {
      warn('Actuele cache onbruikbaar; vorige versie gebruikt.', reason || '');
      return true;
    }
    return false;
  }

  function saveFresh(code) {
    const old = GM_getValue(KEY.currentCode, '');
    if (isValidScript(old) && old !== code) {
      GM_setValue(KEY.previousCode, old);
      GM_setValue(KEY.previousVersion, extractVersion(old));
      GM_setValue(KEY.previousTime, GM_getValue(KEY.currentTime, 0));
    }
    GM_setValue(KEY.currentCode, code);
    GM_setValue(KEY.currentVersion, extractVersion(code));
    GM_setValue(KEY.currentTime, Date.now());
  }

  function fetchLatest() {
    GM_xmlhttpRequest({
      method: 'GET',
      url: SCRIPT_URL + '?t=' + Date.now(),
      timeout: REQUEST_TIMEOUT,
      headers: { 'Cache-Control': 'no-cache' },
      onload: response => {
        const code = String(response.responseText || '');
        if (response.status >= 200 && response.status < 300 && isValidScript(code)) {
          saveFresh(code);
          if (!executeScript(code, 'github')) runCached('Nieuwe GitHub-versie kon niet worden uitgevoerd.');
          return;
        }
        const reason = `HTTP ${response.status}; ongeldige of lege GitHub-response.`;
        GM_setValue(KEY.lastError, reason);
        if (!runCached(reason)) warn('Geen geldige Tracker-versie beschikbaar.');
      },
      ontimeout: () => {
        const reason = 'GitHub-request timeout.';
        GM_setValue(KEY.lastError, reason);
        if (!runCached(reason)) warn('Geen geldige Tracker-versie beschikbaar.');
      },
      onerror: err => {
        const reason = 'GitHub-request mislukt.';
        GM_setValue(KEY.lastError, reason);
        if (!runCached(reason)) warn(reason, err);
      }
    });
  }

  fetchLatest();
})();
