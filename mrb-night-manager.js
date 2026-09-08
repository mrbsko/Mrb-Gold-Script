// ==UserScript==
// @name         MRB Heist Night Manager
// @version      2.1.3
// @description  Standalone login-detectie fix: Night Manager velden tellen niet als game-login; Race/Spot/Heist gebruiken dezelfde betrouwbare gate-status.
// @author       Mrb
// @include      http://*.barafranca.nl/*
// @include      https://*.barafranca.nl/*
// @include      http://barafranca.nl/*
// @include      https://barafranca.nl/*
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-end
// @grant        GM_deleteValue
// ==/UserScript==

// GitHub core: mrb-night-manager.js
// =====================================================================
// MRB NIGHT MANAGER STANDALONE CORE
// Alleen de bewezen Race-, Spot Overval- en Heist-cores uit MRB Gold 5.8.51
// zijn hier opgenomen. Er is geen apart MRB Gold-script nodig.
// =====================================================================
(function MRBNightStandaloneCore(){
  'use strict';
  const GM_Get=(k,d)=>{try{return GM_getValue(k,d);}catch(_){return d;}};
  const GM_Set=(k,v)=>{try{GM_setValue(k,v);}catch(_){}};
  const mrbSetInterval=(fn,ms)=>setInterval(fn,ms);
  unsafeWindow.mrbModuleStateRegistry=unsafeWindow.mrbModuleStateRegistry||(()=>{
    const m=new Map(); const key=n=>String(n||'').toLowerCase();
    return {set:(n,v)=>m.set(key(n),{...(v||{})}),get:n=>m.get(key(n)),all:()=>[...m.entries()]};
  })();
  unsafeWindow.mrbNavigate=unsafeWindow.mrbNavigate||((path)=>{try{if(unsafeWindow?.omerta?.GUI?.container?.loadPage){unsafeWindow.omerta.GUI.container.loadPage(path);return true;}}catch(_){} try{location.href=path;return true;}catch(_){return false;}});
  unsafeWindow.mrbVarDelayMs=unsafeWindow.mrbVarDelayMs||(()=>2000+Math.floor(Math.random()*3001));

  // Standalone gedeelde gate/login-detectie.
  // De ingebouwde Gold-cores gebruikten deze helpers oorspronkelijk uit de
  // globale Gold-shell. In standalone zijn ze hier bewust lokaal eigendom van
  // de core, zodat Race/Spot/Heist geen MRB Gold-afhankelijkheid meer hebben.
  function gm_isCloudflareCheck(){
    const t=String(document.body?.innerText||'').replace(/\s+/g,' ').trim();
    return /Verifying you are human|Verify you are human|Verifieer dat u een mens bent|security of your connection|Dit kan enkele seconden duren|This may take a few seconds/i.test(t)
      || !!document.querySelector('form[action*="cdn-cgi"],script[src*="cdn-cgi/challenge-platform"],#cf-challenge-running,.cf-browser-verification,#recaptcha-popup,.g-recaptcha');
  }
  function gm_isLoginVisible(){
    // v2.1.2: alleen een ECHT zichtbaar game-loginformulier telt als uitgelogd.
    // Tekst zoals "login" of de velden van de Night Manager zelf tellen nooit mee.
    const visible=el=>!!el && !el.closest('#mrb-night-manager-panel') &&
      (el.offsetWidth||el.offsetHeight||el.getClientRects().length) &&
      getComputedStyle(el).visibility!=='hidden' && getComputedStyle(el).display!=='none';
    const password=[...document.querySelectorAll('input[type="password"]')].find(visible);
    if(password) return true;
    const loginForm=[...document.querySelectorAll('form[action*="login" i],#loginModal')].find(visible);
    return !!loginForm;
  }
  function gm_isGateVisible(){ return gm_isCloudflareCheck() || gm_isLoginVisible(); }
  function gm_gateReason(){
    if (gm_isCloudflareCheck()) return 'Cloudflare/captcha';
    if (gm_isLoginVisible()) return 'Login zichtbaar';
    return '';
  }

  // Gedeelde DOM-helpers die de uit Gold afkomstige cores verwachten.
  // In standalone zijn deze bewust onderdeel van de eigen core.
  const q=(selector,root=document)=>(root||document).querySelector(selector);
  const qa=(selector,root=document)=>[...(root||document).querySelectorAll(selector)];

  // De drie bestaande cores verwachten een MRB-menucanvas voor hun interne UI.
  // In standalone is dit bewust onzichtbaar; de Night Manager is de enige UI.
  let hiddenMenu=document.getElementById('mrbGoldMenu');
  if(!hiddenMenu){hiddenMenu=document.createElement('div');hiddenMenu.id='mrbGoldMenu';hiddenMenu.style.display='none';hiddenMenu.innerHTML='<div class="gm-blocks"></div>';document.documentElement.appendChild(hiddenMenu);}
  function addBlock(html,idHint=''){
    const el=document.createElement('div');el.className='gm-block';if(idHint)el.dataset.id=idHint;
    el.innerHTML='<div class="gm-block-header"><div class="gm-block-title"></div></div><div class="gm-block-body"></div>';
    el.querySelector('.gm-block-body').innerHTML=html;
    const h4=el.querySelector('.gm-block-body h4');if(h4){el.querySelector('.gm-block-title').textContent=h4.textContent;h4.remove();}
    hiddenMenu.querySelector('.gm-blocks').appendChild(el);return el;
  }
  // SPRINT 5.7.0 — SPOT OVERVAL COM-STYLE CLEAN REBUILD
  // - Oude geïntegreerde Spot scheduler/pulse volledig verwijderd.
  // - Eén zelfstandige module met één eigen timeout, zoals de stabiele COM-Heist.
  // - Leider/Driver-flow uit de bewezen Spot-test behouden.
  // - Na afronding terug naar Mijn Account; tijdens cooldown volledig passief.
  // =====================================================================
  (function MRBSpotOvervalComStyleV570(){

  'use strict';

  const P = 'mrb_spot_complete_v1_';
  const K = {
    enabled: P + 'enabled', role: P + 'role', state: P + 'state',
    timerReady: P + 'timer_ready', timerAt: P + 'timer_at', family: P + 'family', lastNav: P + 'last_nav',
    leaderGo: P + 'leader_go', driverAccepted: P + 'driver_accepted',
    startCount: P + 'start_count', lastAction: P + 'last_action', driverName: P + 'driver_name',
    lastReadyCheck: P + 'last_ready_check', driverAcceptedAt: P + 'driver_accepted_at',
    startClickedAt: P + 'start_clicked_at', secondPass: P + 'second_pass', spotOpenedAt: P + 'spot_opened_at',
    driverLastVerify: P + 'driver_last_verify'
  };

  const DRIVER_SETTING_KEYS = ['race_partner_name', 'driver_name', 'mrb_driver_name', 'partner_name'];
  const NAV_GUARD = 1200;
  const ACTION_GUARD = 1500;
  const DRIVER_READY_RECHECK = 35000;
  const IDLE_RECHECK = 12000;
  const PAGE_RECHECK = 2200;
  const COOLDOWN_RECHECK = 30000;
  const START_RETRY = 8000;
  const SECOND_PASS_SETTLE = 5000;
  const START_BACKGROUND_RECHECK = 35000;
  const START_MAX_CLICKS = 2;
  const START_FINALIZE_WAIT = 9000;
  const DRIVER_REINVITE_RECHECK = 8000;
  const SPOT_PAGE_SETTLE = 8000;

  let panel, statusEl, detailEl, familyLabel, toggleBtn, roleLeader, roleDriver;
  let busy = false;
  let loopTimer = null;

  function clearLoop() { if (loopTimer) { clearTimeout(loopTimer); loopTimer = null; } }
  function schedule(ms) {
    clearLoop();
    if (!enabled()) return;
    loopTimer = setTimeout(() => tick(), Math.max(250, Number(ms) || PAGE_RECHECK));
  }
  function nextDelay() {
    // Absolute GroupCrimes-prioriteit: een gereed Spot-detail met zichtbare
    // Start/Update-knop mag nooit 30-35 seconden wachten op een oude state.
    if (role() === 'leader' && isGroupPage() && isActiveSpotDetailsPage() && activeDriverReady() && findStartUpdate()) return 1200;
    const st = state();
    const at = timerAt();
    if (at > Date.now()) {
      const untilReady = Math.max(500, at - Date.now() + 100);
      if (untilReady < COOLDOWN_RECHECK) return untilReady;
    }
    if (/COOLDOWN/i.test(st)) return COOLDOWN_RECHECK;
    if (/WAIT_DRIVER_READY|RECHECK_DRIVER_READY|INVITE_SENT|WAIT_ACTIVE_DETAILS/i.test(st)) return DRIVER_READY_RECHECK;
    if (/WAIT_SERVER_AFTER_START|WAIT_START_SETTLE|START_RECHECK_PENDING|SECOND_PASS/i.test(st)) return 1200;
    if (role() === 'driver' && /DRIVER_(?:WAIT_INVITE|WAIT_LEADER|WAIT_SERVER|TIMER_READY|GO_GROUP|OPEN_SPOT|READY)/i.test(st)) return 4000;
    if (/COMPLETE|LEADER_START_CLICKED|DRIVER_READY/i.test(st)) return 5000;
    if (isInfoPage()) return IDLE_RECHECK;
    return PAGE_RECHECK;
  }

  const norm = v => String(v ?? '').replace(/\s+/g, ' ').trim();
  const low = v => norm(v).toLowerCase();
  const visible = el => !!el && el.isConnected && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden' && el.getClientRects().length > 0;

  function get(key, fallback) { return GM_Get(key, fallback); }
  function set(key, value) { GM_Set(key, value); }
  function enabled() { return get(K.enabled, false) === true; }
  function role() { return get(K.role, 'leader') === 'driver' ? 'driver' : 'leader'; }
  function setState(v) { set(K.state, v); }
  function state() { return String(get(K.state, 'IDLE')); }
  function family() { return norm(get(K.family, '')); }
  function syncFamilyFromInfo() {
    if (!isInfoPage()) return family();
    const detected = readFamilyFromInfo();
    if (detected && low(detected) !== low(family())) set(K.family, detected);
    if (familyLabel) familyLabel.textContent = `Eigen familie: ${family() || 'niet herkend'} (automatisch)`;
    return family();
  }
  function timerAt() { return Math.max(0, Number(get(K.timerAt, 0) || 0)); }
  function timerReady() { const at = timerAt(); return get(K.timerReady, false) === true || (at > 0 && Date.now() >= at); }
  function actionAllowed() { return Date.now() - Number(get(K.lastAction, 0) || 0) >= ACTION_GUARD; }
  function markAction() { set(K.lastAction, Date.now()); }
  function canNavigate() { return !unsafeWindow.mrbManualControl?.isPaused?.() && Date.now() - Number(get(K.lastNav, 0) || 0) >= NAV_GUARD; }
  function markNav() { set(K.lastNav, Date.now()); }
  function crimesCarsOwnPriority(){
    try {
      const st = unsafeWindow.mrbV9CrimesCars?.state?.();
      if (!st?.running) return false;
      const now = Date.now();
      return !!st.busy || !!st.confirmPendingKind || !!st.forcedRetryKind
        || (!!st.doCrimes && Number(st.crimesNext || 0) <= now + 1500)
        || (!!st.doCars && Number(st.carsNext || 0) <= now + 1500);
    } catch(e) { return false; }
  }

  function resetFlow(keepTimer = true) {
    set(K.state, 'IDLE'); set(K.leaderGo, false); set(K.driverAccepted, false);
    set(K.startCount, 0); set(K.lastAction, 0); set(K.lastNav, 0); set(K.lastReadyCheck, 0); set(K.driverAcceptedAt, 0); set(K.driverLastVerify, 0); set(K.startClickedAt, 0); set(K.secondPass, ''); set(K.spotOpenedAt, 0);
    if (!keepTimer) { set(K.timerReady, false); set(K.timerAt, 0); }
  }

  function clearStaleCooldown() {
    if (/^(COOLDOWN|COMPLETE_COOLDOWN|DRIVER_COOLDOWN)$/i.test(state())) {
      set(K.state, 'IDLE');
      set(K.leaderGo, false);
      set(K.driverAccepted, false);
      set(K.startClickedAt, 0);
      set(K.startCount, 0);
      set(K.lastAction, 0);
      set(K.lastNav, 0);
      set(K.lastReadyCheck, 0);
      set(K.driverAcceptedAt, 0);
      set(K.driverLastVerify, 0);
      set(K.startClickedAt, 0);
      set(K.secondPass, '');
      set(K.spotOpenedAt, 0);
    }
  }

  function getDriverName() {
    const local = norm(get(K.driverName, ''));
    if (local && !/^invullen$/i.test(local)) return local;
    for (const key of DRIVER_SETTING_KEYS) {
      const value = norm(GM_getValue(key, ''));
      if (value && !/^invullen$/i.test(value)) return value;
    }
    return 'Dos';
  }

  function pageText() {
    const root = document.querySelector('#game_container, #game_container_wrapper, main') || document.body;
    return norm(root?.textContent || '');
  }

  function isInfoPage() { return /information\.php/i.test(location.href) || !!document.querySelector('.moduleInformation, #module_Information, #game_container.moduleInformation'); }
  function isGroupPage() {
    const container = document.querySelector('#game_container, #game_container_wrapper, main');
    const cls = low(container?.className || '');
    const visibleText = norm(container?.innerText || '');
    // Tijdens een SPA-wissel kan de URL achterlopen. De zichtbare module is leidend.
    if (/modulespots|modulespot\b/.test(cls) || document.querySelector('#module_Spots,.moduleSpots')) return false;
    if (/modulegroupcrimes/.test(cls) || document.querySelector('#module_GroupCrimes,.moduleGroupCrimes')) return true;
    if (/^(?:GROEPSMISDADEN|GROUP CRIMES)\b/i.test(visibleText)) return true;
    return /module=GroupCrimes/i.test(location.href) && !isSpotTargetPage();
  }
  function isSpotTargetPage() { return /start\s+raiding\s+in/i.test(pageText()) && !!findTargetTable(); }
  function isDriverInvitePage() { const text = low(pageText()); return !!findCarSelect() && /accepteer\s+uitnodiging|accept\s+invitation/.test(text); }
  function isDriverReadyPage() {
    return /je doet nu mee met deze overval|you are now participating|je hebt de overval uitnodiging geaccepteerd[^.]*wacht op de leider|raid invitation has been accepted[^.]*wait(?:ing)? for the leader/i.test(pageText());
  }
  function isActiveSpotDetailsPage() { const text = low(pageText()); return /overval details|raid details/.test(text) && /huidige bestuurder|current driver/.test(text); }
  function isFinalResultPage() { const text = low(pageText()); return /overval.*(?:afgerond|geslaagd|mislukt)|raid.*(?:completed|succeeded|failed)/.test(text); }

  function findGroupLink() {
    return [...document.querySelectorAll('a')].find(a => visible(a) && /^groepsmisdaden$/i.test(norm(a.textContent))) ||
      [...document.querySelectorAll('a')].find(a => visible(a) && /module=GroupCrimes/i.test(a.getAttribute('href') || '')) || null;
  }
  function findSpotEntry() {
    const links = [...document.querySelectorAll('a')].filter(visible).filter(a => {
      const label = low(a.textContent || '');
      const href = low(a.getAttribute('href') || '');
      return !/annuleer|cancel|wijs af|decline|reject/.test(label) && !/cancel|decline|reject/.test(href);
    });
    return links.find(a => /module=Spot/i.test(a.getAttribute('href') || '')) ||
      links.find(a => /klik hier om het te doen|click here to do it|bekijk.*overval|open.*raid|overval details|raid details/i.test(norm(a.textContent))) || null;
  }
  function clickOnce(el) { if (!visible(el) || !actionAllowed()) return false; markAction(); el.click(); return true; }
  function navigateToGroup() { if (isGroupPage()) return true; if (!canNavigate()) return false; const link = findGroupLink(); if (!link) return false; markNav(); link.click(); return true; }
  function openSpot() { if (!canNavigate()) return false; const link = findSpotEntry(); if (!link) return false; markNav(); set(K.spotOpenedAt, Date.now()); link.click(); return true; }
  function spotPageSettling() {
    const openedAt = Number(get(K.spotOpenedAt, 0) || 0);
    if (!openedAt || Date.now() - openedAt >= SPOT_PAGE_SETTLE) return false;
    return !isSpotTargetPage() && !isActiveSpotDetailsPage() && !isDriverInvitePage() && !isDriverReadyPage();
  }

  function readFamilyFromInfo() {
    for (const row of document.querySelectorAll('tr')) {
      const cells = [...row.querySelectorAll('th,td')];
      const label = norm(cells[0]?.textContent || '').replace(/[:?]+$/, '');
      if (cells.length >= 2 && /^(?:familie|family)$/i.test(label)) {
        const value = norm(cells[1].textContent).split('(')[0].trim();
        if (value && !/geen|none/i.test(value)) return value;
      }
    }
    return '';
  }

  function readSpotTimer() {
    // Omerta bouwt Mijn Account niet altijd als tabelrijen op. Lees eerst tabelcellen,
    // maar val daarna terug op de zichtbare paginatekst die in alle layouts aanwezig is.
    for (const row of document.querySelectorAll('tr')) {
      const cells = [...row.querySelectorAll(':scope > th, :scope > td')];
      for (let i = 0; i < cells.length; i += 1) {
        const label = norm(cells[i]?.textContent || '').replace(/[:?]+$/, '');
        if (!/^(?:volgende\s+spot\s+overval|next\s+spot\s+(?:raid|robbery))$/i.test(label)) continue;
        const raw = norm((cells[i + 1] || cells[cells.length - 1])?.textContent || '');
        if (raw) return { found: true, ready: /^(?:nu|now)$/i.test(raw), raw };
      }
    }

    const text = pageText();
    const match = text.match(/(?:volgende\s+spot\s+overval|next\s+spot\s+(?:raid|robbery))\s*[:?\-]?\s*(nu|now|(?:(?:\d+)\s*(?:d|h|m|s|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)\s*)+)/i);
    if (match) {
      const raw = norm(match[1]);
      return { found: true, ready: /^(?:nu|now)$/i.test(raw), raw };
    }

    return { found: false, ready: false, raw: '' };
  }

  function parseSpotDuration(raw) {
    const text = norm(raw);
    if (/^(?:nu|now)$/i.test(text)) return 0;
    let total = 0, match;
    const units = /(\d+)\s*(d|h|m|s|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)/gi;
    while ((match = units.exec(text))) {
      const amount = Number(match[1] || 0);
      const unit = String(match[2] || '').toLowerCase();
      if (unit.startsWith('d')) total += amount * 86400000;
      else if (unit.startsWith('h') || unit.startsWith('u')) total += amount * 3600000;
      else if (unit.startsWith('m')) total += amount * 60000;
      else total += amount * 1000;
    }
    return total;
  }

  function syncSpotTimer(timer) {
    if (!timer?.found) return;
    if (timer.ready) {
      set(K.timerReady, true);
      set(K.timerAt, Date.now());
      return;
    }
    const wait = parseSpotDuration(timer.raw);
    set(K.timerReady, false);
    set(K.timerAt, wait > 0 ? Date.now() + wait : 0);
  }

  function readGroupSpotCooldown() {
    if (!isGroupPage()) return '';
    const t = pageText();
    const m = t.match(/(?:Je kunt opnieuw een overval doen in|Je kunt weer een overval doen in|You can (?:do|raid) another (?:spot )?(?:raid|robbery) in)\s*((?:(?:\d+)\s*(?:D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)\s*)+)/i);
    return norm(m?.[1] || '');
  }

  function hardStopSpotCooldown(raw, source='server') {
    const wait = parseSpotDuration(raw);
    if (!(wait > 0)) return false;
    set(K.timerReady, false);
    set(K.timerAt, Date.now() + wait);
    set(K.state, 'COOLDOWN');
    set(K.leaderGo, false);
    set(K.driverAccepted, false);
    set(K.driverAcceptedAt, 0);
    set(K.driverLastVerify, 0);
    set(K.startCount, 0);
    set(K.lastReadyCheck, 0);
    set(K.lastAction, 0);
    set(K.startClickedAt, 0);
    set(K.secondPass, '');
    set(K.spotOpenedAt, 0);
    setStatus('COOLDOWN', `Spot Overval cooldown (${source}): ${raw}. Actieve flow volledig gewist.`);
    if (!isInfoPage() && canNavigate()) {
      goInformationForFreshTimers('Spot-cooldown bevestigd op Groepsmisdaden; terug naar Mijn Account en volledig passief.');
    }
    return true;
  }

  function localTimerText() {
    const remaining = Math.max(0, timerAt() - Date.now());
    if (!remaining) return 'Nu';
    const seconds = Math.ceil(remaining / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [days && `${days}D`, hours && `${hours}H`, minutes && `${minutes}M`, `${secs}S`].filter(Boolean).join(' ');
  }

  function parseMoney(text) { const n = norm(text).replace(/[^0-9]/g, ''); return n ? Number(n) : 0; }
  function findTargetTable() {
    for (const table of document.querySelectorAll('table')) {
      const header = [...table.querySelectorAll('tr')].find(row => {
        const cells = [...row.querySelectorAll('th,td')].map(c => low(c.textContent));
        return cells.includes('type') && cells.includes('owner') && cells.includes('profit') && cells.includes('next raid') && cells.includes('invite');
      });
      if (header) return { table, header };
    }
    return null;
  }

  function bestTarget() {
    const found = findTargetTable(); if (!found) return null;
    const headers = [...found.header.querySelectorAll('th,td')].map(c => low(c.textContent));
    const idx = n => headers.indexOf(n); const own = low(family()); const candidates = [];
    for (const row of found.table.querySelectorAll('tr')) {
      if (row === found.header) continue;
      const cells = [...row.querySelectorAll(':scope > th, :scope > td')]; if (!cells.length) continue;
      const owner = norm(cells[idx('owner')]?.textContent); const profit = parseMoney(cells[idx('profit')]?.textContent);
      const ownerParts = owner.match(/^(.*?)\s*\(([^()]*)\)\s*$/);
      const ownerName = norm(ownerParts?.[1] || owner);
      const ownerFamily = norm(ownerParts?.[2] || '');
      const next = norm(cells[idx('next raid')]?.textContent); const actionCell = cells[idx('invite')];
      const action = actionCell?.querySelector('a,button,input[type="button"],input[type="submit"]');
      const actionText = norm(action?.textContent || action?.value);
      // Elk doel is toegestaan, ongeacht Local Mob/Lonewolf/Sanctum-status.
      // Layouts kunnen de familie vóór of tussen haakjes tonen; alleen een
      // exacte overeenkomst met de eigen familie wordt uitgesloten.
      if (own && (low(ownerName) === own || low(ownerFamily) === own)) continue;
      if (profit <= 0 || !/^(nu|now)$/i.test(next)) continue;
      if (!visible(action) || !/^(go|ga)$/i.test(actionText)) continue;
      candidates.push({ row, action, profit, type: norm(cells[idx('type')]?.textContent), owner });
    }
    candidates.sort((a,b) => b.profit - a.profit); return candidates[0] || null;
  }

  function setInputValue(input, value) {
    if (!input) return false;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    if (setter) setter.call(input, String(value)); else input.value = String(value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return norm(input.value) === norm(value);
  }

  function findLeaderForm() {
    const container = document.querySelector('#game_container.moduleSpots, #game_container, #game_container_wrapper') || document;
    const driver = container.querySelector('form#raidForm input[name="driver"], input[name="driver"]');
    const bullets = container.querySelector('form#raidForm input[name="bullets"], input[name="bullets"]');
    return { root: container, driver, bullets };
  }

  function fillLeaderForm() {
    const name = getDriverName();
    if (!name) return { ok: false, reason: 'Drivernaam ontbreekt.' };
    const form = findLeaderForm();
    if (!form.driver) return { ok: false, reason: 'Driver-veld niet gevonden.' };
    if (!form.bullets) return { ok: false, reason: 'Kogelveld niet gevonden.' };
    const driverOk = setInputValue(form.driver, name);
    const bulletsOk = setInputValue(form.bullets, '0');
    const verified = low(form.driver.value) === low(name) && parseInt(String(form.bullets.value || '0').replace(/\D/g, ''), 10) === 0;
    return { ok: driverOk && bulletsOk && verified, reason: verified ? '' : 'Ingevulde waarden konden niet worden bevestigd.', name };
  }

  function findCarSelect() { return [...document.querySelectorAll('select')].find(s => visible(s) && [...s.options].some(o => /damage|schade|\$/.test(norm(o.textContent)))) || null; }
  function isCarPlaceholder(option) {
    const value = low(option?.value || '');
    const label = low(option?.textContent || option?.label || '');
    return !option || option.disabled || !value || /^(?:0|-1|-|none|null)$/.test(value) ||
      /kies|selecteer|choose|select|geen auto|no car|verwijder|remove|none yet/.test(label);
  }
  function chooseCar() {
    const select = findCarSelect(); if (!select) return { ok: false, reason: 'Auto-dropdown niet gevonden.' };
    const current = select.selectedOptions?.[0] || null;
    if (current && !isCarPlaceholder(current)) return { ok: true, label: norm(current.textContent) };
    const option = [...select.options].find(o => !isCarPlaceholder(o));
    if (!option) return { ok: false, reason: 'Geen beschikbare auto.' };
    select.value = option.value;
    select.dispatchEvent(new Event('input', { bubbles: true }));
    select.dispatchEvent(new Event('change', { bubbles: true }));
    return { ok: String(select.value) === String(option.value), label: norm(option.textContent) };
  }
  function findAcceptInvite() { return [...document.querySelectorAll('a,button,input[type="submit"],input[type="button"]')].find(el => visible(el) && /accepteer\s+uitnodiging|accept\s+invitation/.test(low(el.textContent || el.value))) || null; }
  function findStartUpdate() { return [...document.querySelectorAll('a,button,input[type="submit"],input[type="button"]')].find(el => visible(el) && /start\s*\/\s*update\s+overval|start\s*\/\s*update\s+raid|start overval|start raid/.test(low(el.textContent || el.value))) || null; }
  function readDetailValue(labels) {
    const wanted = labels.map(low);
    for (const row of document.querySelectorAll('tr')) {
      const cells = [...row.querySelectorAll(':scope > th, :scope > td')];
      if (cells.length < 2) continue;
      const label = low(cells[0].textContent).replace(/[:?]+$/, '');
      if (wanted.includes(label)) return norm(cells[1].textContent);
    }
    return '';
  }

  function activeDriverReady() {
    const driver = readDetailValue(['Huidige Bestuurder', 'Current Driver', 'Bestuurder', 'Driver']);
    const car = readDetailValue(['Auto', 'Car']);
    const driverReady = !!driver && !/^(?:none|none yet|geen|niemand|-|n\/?a)$/i.test(driver);
    const carReady = !!car && !/^(?:none|none yet|geen|nog geen|-|n\/?a)$/i.test(car);
    return driverReady && carReady;
  }

  function goInformationForFreshTimers(reason) {
    if (!canNavigate()) return false;
    markNav();
    set(K.leaderGo, false);
    set(K.lastReadyCheck, 0);
    try { unsafeWindow.omerta?.GUI?.container?.loadPage?.('/information.php'); }
    catch (_) { location.href = '/information.php'; }
    setStatus('REFRESH_ALL_TIMERS', reason || 'Spot is afgerond; Mijn Account openen zodat alle timers opnieuw worden gelezen.');
    return true;
  }

  function spotCooldownKnown(){
    const at = timerAt();
    const st = String(state() || '').toUpperCase();
    return (at > Date.now() + 1000 && get(K.timerReady, false) !== true) || /^(?:COOLDOWN|COMPLETE_COOLDOWN|DRIVER_COOLDOWN)$/.test(st);
  }

  function clearStaleSecondPassForCooldown(reason='cooldown bekend'){
    set(K.leaderGo, false);
    set(K.driverAccepted, false);
    set(K.driverAcceptedAt, 0);
    set(K.driverLastVerify, 0);
    set(K.startCount, 0);
    set(K.lastReadyCheck, 0);
    set(K.lastAction, 0);
    set(K.startClickedAt, 0);
    set(K.secondPass, '');
    set(K.spotOpenedAt, 0);
    setStatus('COOLDOWN', `Spot second-pass gestopt: ${reason}. Volledig passief tot verse server-timer.`);
  }

  function loadGroupCrimesForSecondPass(){
    // 5.8.45: een oude second-pass callback mag nooit een bekende cooldown doorbreken.
    if (spotCooldownKnown()) {
      clearStaleSecondPassForCooldown('bekende Spot-cooldown blokkeert GroupCrimes');
      return false;
    }
    if (!canNavigate()) return false;
    markNav();
    try { unsafeWindow.omerta?.GUI?.container?.loadPage?.('/?module=GroupCrimes'); }
    catch (_) { location.href = '/index.php#/?module=GroupCrimes'; }
    return true;
  }

  // De server toont na de eerste afronding soms nog één keer dezelfde Spot.
  // Daarom is de tweede klik geen lokale retry: de Leider verlaat het detail,
  // opent Groepsmisdaden -> Spot opnieuw en klikt daar pas opnieuw Start/Update.
  function handleExplicitSecondPass(){
    if (Number(get(K.startCount, 0) || 0) !== 1) return false;

    // 5.8.44: second-pass is uitsluitend geldig binnen een aantoonbaar actieve Spot-cyclus.
    // Een bekende cooldown is altijd sterker dan oude start/secondPass-state.
    if (spotCooldownKnown()) {
      clearStaleSecondPassForCooldown('cooldown was al bekend voordat second-pass kon starten');
      return true;
    }
    let pass = String(get(K.secondPass, '') || 'need_group');
    const lastClick = Number(get(K.startClickedAt, 0) || 0);
    const elapsed = lastClick ? Date.now() - lastClick : Infinity;

    if (elapsed < SECOND_PASS_SETTLE) {
      setStatus('SECOND_PASS_SETTLE', `Eerste Start/Update uitgevoerd. Server afronden; actieve Spot opnieuw openen over ongeveer ${Math.ceil((SECOND_PASS_SETTLE - elapsed) / 1000)} sec.`);
      return true;
    }

    if (pass === 'need_group') {
      if (loadGroupCrimesForSecondPass()) {
        set(K.secondPass, 'need_spot');
        setStatus('SECOND_PASS_OPEN_GROUP', 'Eerste Start/Update afgerond. Groepsmisdaden opnieuw geopend voor de verplichte tweede Spot-doorgang.');
      }
      return true;
    }

    if (pass === 'need_spot') {
      // Het spel kan na het opnieuw openen van GroupCrimes direct het actieve
      // Overval Details-scherm tonen, zonder tussenliggende Spot-link. Dat is
      // juist de serverbug-pagina waarop de tweede Start/Update nodig is.
      if (isActiveSpotDetailsPage() && activeDriverReady() && findStartUpdate()) {
        set(K.secondPass, 'reopened');
        setStatus('SECOND_PASS_DETAILS_READY', 'Actieve Spot is direct opnieuw geopend; verplichte tweede Start/Update wordt nu uitgevoerd.');
        return false;
      }
      if (!isGroupPage()) {
        loadGroupCrimesForSecondPass();
        return true;
      }
      const entry = findSpotEntry();
      if (entry && openSpot()) {
        set(K.secondPass, 'reopened');
        setStatus('SECOND_PASS_OPEN_SPOT', 'Spot Overval opnieuw geopend; tweede Start/Update wordt uitgevoerd zodra het actieve detail zichtbaar is.');
      } else {
        setStatus('SECOND_PASS_WAIT_SPOT', 'Groepsmisdaden geopend; wachten op de actieve Spot Overval-link.');
      }
      return true;
    }

    if (pass === 'reopened') {
      if (isActiveSpotDetailsPage()) return false;
      if (isGroupPage()) {
        const entry = findSpotEntry();
        if (entry) openSpot();
      } else {
        loadGroupCrimesForSecondPass();
        set(K.secondPass, 'need_spot');
      }
      setStatus('SECOND_PASS_WAIT_DETAILS', 'Actieve Spot is opnieuw geopend; wachten op Start/Update overval.');
      return true;
    }

    set(K.secondPass, 'need_group');
    return true;
  }

  // Algemene GroupCrimes cleanup-guard. Deze draait vóór alle gewone Spot-states.
  // Alleen wanneer de server aantoonbaar een Driver én een echte auto toont,
  // krijgt Start/Update absolute voorrang. Dit voorkomt dat Heist of een oude
  // cooldown-state een half afgeronde Spot Overval laat staan.
  function handleMandatorySpotFinalize() {
    if (!isGroupPage() || !isActiveSpotDetailsPage() || !activeDriverReady()) return false;
    const start = findStartUpdate();
    if (!start) return false;

    const clicks = Number(get(K.startCount, 0) || 0);
    const lastClick = Number(get(K.startClickedAt, 0) || 0);
    const elapsed = lastClick ? Date.now() - lastClick : Infinity;

    if (clicks < START_MAX_CLICKS) {
      if (!lastClick || elapsed >= START_RETRY) {
        if (clickOnce(start)) {
          const nextCount = clicks + 1;
          set(K.startCount, nextCount);
          set(K.startClickedAt, Date.now());
          set(K.leaderGo, true);
          set(K.secondPass, nextCount === 1 ? 'need_group' : '');
          setStatus(
            nextCount === 1 ? 'SPOT_FINALIZE_CLICK_1' : 'SPOT_FINALIZE_CLICK_2',
            nextCount === 1
              ? 'Driver en auto zijn gereed. Eerste verplichte Start/Update-klik uitgevoerd; tweede controle volgt automatisch.'
              : 'Driver en auto zijn gereed. Tweede verplichte Start/Update-klik uitgevoerd; daarna worden alle timers opnieuw gelezen.'
          );
        } else {
          setStatus('SPOT_FINALIZE_CLICK_WAIT', 'Start/Update is verplicht, maar de korte klikbeveiliging is nog actief.');
        }
      } else {
        setStatus('SPOT_FINALIZE_BETWEEN_CLICKS', `Eerste Start/Update is uitgevoerd. Tweede verplichte klik volgt over ongeveer ${Math.ceil((START_RETRY - elapsed) / 1000)} sec.`);
      }
      return true;
    }

    // Na exact twee klikken nooit op GroupCrimes blijven hangen. De zichtbare
    // server-timers op Mijn Account worden opnieuw de enige bron van waarheid.
    if (elapsed >= START_FINALIZE_WAIT) {
      goInformationForFreshTimers('Twee verplichte Start/Update-klikken zijn uitgevoerd. Alle module-timers worden nu opnieuw gelezen.');
    } else {
      setStatus('SPOT_FINALIZE_SERVER_WAIT', `Twee Start/Update-klikken uitgevoerd. Server afronden; Mijn Account volgt over ongeveer ${Math.ceil((START_FINALIZE_WAIT - elapsed) / 1000)} sec.`);
    }
    return true;
  }

  function setStatus(s, d) { setState(s); if (statusEl) statusEl.textContent = s; if (detailEl) detailEl.textContent = d; if (familyLabel) familyLabel.textContent = `Eigen familie: ${family() || 'niet herkend'} (automatisch)`; renderMeta(); }
  function renderMeta() {
    // Geen zichtbaar debugpaneel in de geïntegreerde MRB Gold-module.
  }

  async function leaderTick() {
    // 5.8.44: servercooldown controleren VOOR enige second-pass/recovery-navigatie.
    // Dit voorkomt precies de GroupCrimes -> Mijn Account -> GroupCrimes lus van een stale secondPass.
    if (isInfoPage()) {
      const freshTimer = readSpotTimer();
      if (freshTimer?.found) {
        syncSpotTimer(freshTimer);
        if (!freshTimer.ready && hardStopSpotCooldown(freshTimer.raw, 'Mijn Account pre-second-pass')) return;
      }
    }
    if (isGroupPage()) {
      const freshGroupCooldown = readGroupSpotCooldown();
      if (freshGroupCooldown && hardStopSpotCooldown(freshGroupCooldown, 'Groepsmisdaden pre-second-pass')) return;
    }
    if (spotCooldownKnown()) {
      clearStaleSecondPassForCooldown('lokale/servercooldown al bekend bij LeaderTick');
      return;
    }

    if (handleExplicitSecondPass()) return;

    // Altijd een half afgeronde Spot Overval opruimen. Dit geldt ook wanneer
    // Groepsmisdaden door Heist of een andere module werd geopend.
    if (handleMandatorySpotFinalize()) return;

    if (spotPageSettling()) {
      const remaining = Math.max(0, SPOT_PAGE_SETTLE - (Date.now() - Number(get(K.spotOpenedAt, 0) || 0)));
      setStatus('SPOT_PAGE_SETTLE', `Spot-pagina wordt opgebouwd; geen nieuwe navigatie gedurende ongeveer ${Math.ceil(remaining / 1000)} sec.`);
      return;
    }

    // Zodra het echte Leiderformulier zichtbaar is, vormt invullen + Go één
    // korte atomaire stap. Crimes/Cars mag de pagina pas daarna overnemen.
    if (!isSpotTargetPage() && crimesCarsOwnPriority()) {
      setStatus('YIELD_PRIORITY_TIMERS', 'Crimes/Cars is gereed of bezig; Spot laat pagina en navigatie volledig vrij.');
      return;
    }

    if (isFinalResultPage()) {
      setStatus('COMPLETE', 'Definitieve Spot Overval-uitkomst zichtbaar. Terug naar Mijn Account; daarna volledig passief tijdens cooldown.');
      set(K.timerReady, false);
      set(K.timerAt, 0);
      set(K.leaderGo, false);
      set(K.driverAccepted, false);
      set(K.secondPass, '');
      if (canNavigate()) {
        markNav();
        try { unsafeWindow.omerta?.GUI?.container?.loadPage?.('/information.php'); }
        catch (_) { location.href = '/information.php'; }
      }
      return;
    }

    if (isActiveSpotDetailsPage()) {
      if (!activeDriverReady()) {
        const lastCheck = Number(get(K.lastReadyCheck, 0) || 0);
        const elapsed = Date.now() - lastCheck;
        if (elapsed >= DRIVER_READY_RECHECK && canNavigate()) {
          set(K.lastReadyCheck, Date.now());
          markNav();
          try { unsafeWindow.omerta?.GUI?.container?.loadPage?.('/?module=GroupCrimes'); }
          catch (_) { location.href = '/index.php#/?module=GroupCrimes'; }
          setStatus('RECHECK_DRIVER_READY', 'Driver of auto is nog niet gereed. Alleen de huidige Groepsmisdaden-status wordt ververst; Mijn Account blijft ongemoeid.');
          return;
        }
        const remaining = Math.max(0, DRIVER_READY_RECHECK - elapsed);
        setStatus('WAIT_DRIVER_READY', `Uitnodiging is verstuurd. Driver of auto is nog niet gereed; nieuwe controle over ongeveer ${Math.ceil(remaining / 1000)} sec.`);
        return;
      }
      set(K.lastReadyCheck, 0);
      setStatus('WAIT_START_CONTROL', 'Driver en auto zijn gereed, maar Start/Update overval is niet zichtbaar. Wachten op serveropbouw.');
      return;
    }

    if (isSpotTargetPage()) {
      set(K.spotOpenedAt, 0);
      // Een opnieuw zichtbaar doel-/formulieroverzicht betekent dat een vorige cyclus is geannuleerd
      // of niet meer actief is. Wis daarom uitsluitend de tijdelijke Spot-cyclusgegevens.
      if (get(K.leaderGo, false) || Number(get(K.startCount, 0) || 0) > 0) {
        set(K.leaderGo, false); set(K.startCount, 0); set(K.lastReadyCheck, 0); set(K.lastAction, 0); set(K.startClickedAt, 0); set(K.secondPass, '');
      }
      const target = bestTarget(); if (!target) { setStatus('NO_TARGET', 'Geen winstgevend doel op Nu buiten de eigen familie gevonden.'); return; }
      const filled = fillLeaderForm(); if (!filled.ok) { setStatus('WAIT_FORM', filled.reason); return; }
      if (clickOnce(target.action)) { set(K.leaderGo, true); setStatus('INVITE_SENT', `Driver ${filled.name}, 0 kogels en beste doel ${target.type} gekozen; Go exact één keer geklikt.`); }
      else setStatus('WAIT_GO', 'Formulier is gereed. Wachten tot de eenmalige klikbeveiliging vrij is.');
      return;
    }

    if (isInfoPage()) {
      syncFamilyFromInfo();
      const timer = readSpotTimer();
      if (!timer.found) { setStatus('WAIT_TIMER_READ', 'Spot Overval-timer nog niet gevonden op Mijn Account.'); return; }
      syncSpotTimer(timer);
      if (!timer.ready) {
        // De actuele servercooldown is de absolute bron van waarheid.
        // Wis elke oude/pending Spot-cyclus, ook wanneer startCount nog 0 is.
        hardStopSpotCooldown(timer.raw, 'Mijn Account');
        return;
      }

      // Spot heeft zijn eigen timer nu veilig gelezen. Synchroniseer vervolgens
      // Crimes, Cars en Race vanaf dezelfde Mijn Account-pagina. Als Crimes of
      // Cars verlopen/bezig is, mag Spot niet alweer naar Groepsmisdaden gaan.
      const priorityTaken = !!unsafeWindow.mrbResumePriorityTimers?.('spot-raid');
      if (priorityTaken) {
        setStatus('YIELD_PRIORITY_TIMERS', 'Crimes/Cars is gereed of bezig en krijgt eerst voorrang; Spot wacht op Mijn Account.');
        return;
      }

      // FIX: de actuele timer is altijd de bron van waarheid. COOLDOWN wordt nooit blind hergebruikt.
      if (timer.ready) {
        clearStaleCooldown();
        set(K.timerReady, true);

        // Nadat Start/Update is aangeklikt, mag Spot andere modules niet voortdurend
        // terugtrekken naar Groepsmisdaden. Hercontroleer hoogstens eens per 35 seconden.
        const startClicks = Number(get(K.startCount, 0) || 0);
        const lastStartClick = Number(get(K.startClickedAt, 0) || 0);
        if (startClicks > 0 && lastStartClick) {
          const elapsed = Date.now() - lastStartClick;
          if (elapsed < START_BACKGROUND_RECHECK) {
            setStatus('WAIT_START_SETTLE', `Start/Update is verzonden. Andere modules zijn vrij; Spot controleert opnieuw over ongeveer ${Math.ceil((START_BACKGROUND_RECHECK - elapsed) / 1000)} sec.`);
            return;
          }
          if (navigateToGroup()) {
            set(K.startClickedAt, Date.now());
            setStatus('RECHECK_AFTER_START', 'Serverstatus na Start/Update wordt rustig opnieuw gecontroleerd.');
          } else {
            setStatus('WAIT_START_RECHECK_NAV', 'Wachten tot één rustige Spot-hercontrole mogelijk is.');
          }
          return;
        }

        if (navigateToGroup()) setStatus('GO_GROUP', 'Spot Overval staat op Nu; oude cooldown-state gewist en Groepsmisdaden geopend.');
        else setStatus('TIMER_READY', 'Spot Overval staat op Nu. Wachten tot de navigatiebeveiliging vrij is.');
        return;
      }

      if (Number(get(K.startCount, 0) || 0) >= START_MAX_CLICKS) {
        setStatus('COMPLETE_COOLDOWN', `Spot Overval afgerond. Cooldown: ${timer.raw}. Volledig passief.`);
        set(K.leaderGo, false); set(K.driverAccepted, false); set(K.driverAcceptedAt, 0); set(K.startCount, 0); set(K.lastReadyCheck, 0); set(K.startClickedAt, 0); set(K.secondPass, '');
      } else {
        setStatus('COOLDOWN', `Volgende Spot Overval: ${timer.raw}. Volledig passief.`);
      }
      return;
    }

    if (isGroupPage()) {
      const groupCooldown = readGroupSpotCooldown();
      if (groupCooldown && hardStopSpotCooldown(groupCooldown, 'Groepsmisdaden')) return;
      const entry = findSpotEntry();
      if (entry && (get(K.leaderGo, false) || Number(get(K.startCount, 0) || 0) > 0)) {
        // De gewone Spot-link is opnieuw zichtbaar: de vorige overval is geannuleerd/verdwenen.
        set(K.leaderGo, false); set(K.startCount, 0); set(K.lastReadyCheck, 0); set(K.lastAction, 0); set(K.startClickedAt, 0); set(K.secondPass, '');
        setStatus('CANCELLED_RESET', 'Vorige Spot Overval is geannuleerd of verdwenen. Tijdelijke cyclus gewist; nieuwe Spot wordt opnieuw geopend.');
      }
      if (entry && openSpot()) setStatus('OPEN_SPOT', 'Spot Overval-link exact één keer geopend.');
      else if (get(K.leaderGo, false)) setStatus('WAIT_ACTIVE_DETAILS', 'Uitnodiging is verstuurd; Leider blijft op Groepsmisdaden wachten zonder naar Mijn Account te springen.');
      else setStatus('WAIT_SPOT_LINK', 'Wachten op zichtbare Spot Overval-link of actieve Spot-details.');
      return;
    }

    if (Number(get(K.startCount, 0) || 0) > 0) {
      // Start is al verzonden. Laat Crimes, Cars en andere modules hun pagina gebruiken;
      // Spot claimt de navigatie pas weer via de rustige hercontrole op Mijn Account.
      setStatus('WAIT_START_BACKGROUND', 'Start/Update is verzonden. Spot blijft op de achtergrond en blokkeert andere modules niet.');
    } else if (get(K.leaderGo, false)) {
      if (navigateToGroup()) setStatus('RECOVER_GROUP', 'Actieve Leider-flow hersteld via Groepsmisdaden.');
    } else if (timerReady()) {
      // Een lokale deadline die Nu bereikt is mag nooit zelfstandig GroupCrimes openen.
      // Eerst verse serverbevestiging op Mijn Account om stale ready-state te voorkomen.
      if (goInformationForFreshTimers('Lokale Spot-timer is verlopen; eerst verse serverbevestiging op Mijn Account voordat Groepsmisdaden mag openen.')) return;
      setStatus('WAIT_TIMER_VERIFY', 'Lokale Spot-timer is verlopen; wachten op verse Mijn Account-bevestiging.');
    } else if (timerAt() > Date.now()) {
      setStatus('LOCAL_COOLDOWN', `Spot telt lokaal af: ${localTimerText()}. Andere modules houden de pagina volledig vrij.`);
    } else if (/^(COOLDOWN|COMPLETE_COOLDOWN)$/i.test(state())) {
      // Een reeds gelezen servercooldown blijft passief. Zo trekt Spot tijdens
      // een bekende cooldown niet elke 30 seconden een andere module weg.
      setStatus(state(), 'Spot-cooldown is bekend; wachten tot een normale terugkeer naar Mijn Account de timer opnieuw bijwerkt.');
    } else {
      // Een actieve Spot-module mag nooit afhankelijk zijn van handmatige
      // navigatie. Open Mijn Account zelf; daar leest Spot eerst zijn eigen
      // timer en draagt dezelfde pagina vervolgens over aan Race/Crimes/Cars.
      if (goInformationForFreshTimers('Spot-timer is nog onbekend. Mijn Account wordt automatisch geopend om Spot, Crimes, Cars en Race opnieuw te synchroniseren.')) return;
      setStatus('WAIT_TIMER_NAV_GUARD', 'Spot-timer is onbekend; wachten tot de korte navigatiebeveiliging Mijn Account kan openen.');
    }
  }

  async function driverTick() {
    if (spotPageSettling()) {
      const remaining = Math.max(0, SPOT_PAGE_SETTLE - (Date.now() - Number(get(K.spotOpenedAt, 0) || 0)));
      setStatus('DRIVER_SPOT_PAGE_SETTLE', `Spot-uitnodigingspagina wordt opgebouwd; Driver wacht ongeveer ${Math.ceil(remaining / 1000)} sec zonder opnieuw te navigeren.`);
      return;
    }
    if (isDriverReadyPage()) {
      set(K.driverAccepted, true);
      if (!Number(get(K.driverAcceptedAt, 0) || 0)) set(K.driverAcceptedAt, Date.now());
      set(K.driverLastVerify, Date.now());
      setStatus('DRIVER_READY', 'Driver heeft auto ingezet en wacht op de Leider. Een geannuleerde en opnieuw verstuurde uitnodiging wordt automatisch herkend.');
      return;
    }
    if (isDriverInvitePage()) {
      const accept = findAcceptInvite();
      const accepted = get(K.driverAccepted, false) === true;
      const acceptedAt = Number(get(K.driverAcceptedAt, 0) || 0);

      // Na annuleren verschijnt opnieuw een echte Accepteer-knop. Pas na 12 seconden mag dit
      // als nieuwe uitnodiging gelden, zodat een trage serverreactie nooit een dubbele klik geeft.
      if (accepted && accept && acceptedAt && Date.now() - acceptedAt > 12000) {
        set(K.driverAccepted, false); set(K.driverAcceptedAt, 0); set(K.driverLastVerify, 0); set(K.lastAction, 0);
      }

      if (get(K.driverAccepted, false)) {
        setStatus('DRIVER_WAIT_SERVER', 'Auto en uitnodiging zijn al verzonden. De dropdown wordt niet opnieuw gewijzigd.');
        return;
      }

      const car = chooseCar(); if (!car.ok) { setStatus('WAIT_CAR', car.reason); return; }
      if (!accept) { setStatus('WAIT_ACCEPT', 'Auto gekozen, maar Accepteer Uitnodiging niet gevonden.'); return; }
      if (clickOnce(accept)) {
        set(K.driverAccepted, true); set(K.driverAcceptedAt, Date.now()); set(K.driverLastVerify, Date.now());
        setStatus('DRIVER_ACCEPT_CLICKED', `Auto gekozen: ${car.label}. Uitnodiging exact één keer geaccepteerd.`);
      }
      return;
    }
    if (isInfoPage()) {
      syncFamilyFromInfo();
      const timer = readSpotTimer();
      if (!timer.found) { setStatus('DRIVER_WAIT_TIMER_READ', 'Spot Overval-timer nog niet gevonden.'); return; }
      syncSpotTimer(timer);
      if (!timer.ready) {
        hardStopSpotCooldown(timer.raw, 'Mijn Account Driver');
        return;
      }
      if (get(K.driverAccepted, false)) {
        if (!timer.ready) {
          set(K.driverAccepted, false); set(K.driverAcceptedAt, 0); set(K.driverLastVerify, 0); set(K.lastAction, 0);
          setStatus('DRIVER_COOLDOWN', `Spot Overval is voorbij. Cooldown: ${timer.raw || '-'}. Driver-opdracht gewist.`);
        } else {
          const lastVerify = Number(get(K.driverLastVerify, 0) || 0);
          const elapsed = Date.now() - lastVerify;
          if (elapsed >= DRIVER_REINVITE_RECHECK && canNavigate()) {
            set(K.driverLastVerify, Date.now());
            if (navigateToGroup()) setStatus('DRIVER_RECHECK_INVITE', 'Auto was ingezet; Driver controleert kort of de Leider inmiddels heeft geannuleerd en opnieuw uitgenodigd.');
            else setStatus('DRIVER_RECHECK_WAIT_NAV', 'Nieuwe uitnodigingscontrole wacht op de navigatiebeveiliging.');
          } else {
            const remaining = Math.max(0, DRIVER_REINVITE_RECHECK - elapsed);
            setStatus('DRIVER_WAIT_LEADER', `Auto is ingezet. Nieuwe uitnodiging wordt over ongeveer ${Math.ceil(remaining / 1000)} sec gecontroleerd.`);
          }
        }
        return;
      }
      if (timer.ready) {
        clearStaleCooldown(); set(K.timerReady, true);
        if (navigateToGroup()) setStatus('DRIVER_GO_GROUP', 'Spot-timer staat op Nu; Driver controleert Groepsmisdaden op een echte uitnodiging.');
        else setStatus('DRIVER_TIMER_READY', 'Spot-timer staat op Nu. Wachten tot navigatiebeveiliging vrij is.');
        return;
      }
      setStatus('DRIVER_COOLDOWN', `Geen actieve Driver-opdracht. Spot-timer: ${timer.raw || '-'}. Passief.`); return;
    }
    if (isGroupPage()) { if (openSpot()) setStatus('DRIVER_OPEN_SPOT', 'Spot-link geopend om echte uitnodiging te controleren.'); else setStatus('DRIVER_WAIT_INVITE', 'Geen aantoonbare Spot-uitnodiging zichtbaar. Driver doet niets.'); return; }
    if (get(K.driverAccepted, false)) { setStatus('DRIVER_WAIT_LEADER', 'Auto is ingezet. Driver blijft passief wachten en navigeert niet opnieuw.'); return; }
    if (timerReady()) { set(K.timerReady, true); if (navigateToGroup()) setStatus('DRIVER_GO_GROUP', 'Lokale Spot-timer staat op Nu; Driver controleert een mogelijke uitnodiging via Groepsmisdaden.'); }
    else if (timerAt() > Date.now()) setStatus('DRIVER_LOCAL_COOLDOWN', `Driver wacht passief; lokaal onthouden Spot-timer: ${localTimerText()}.`);
    else setStatus('DRIVER_PASSIVE', 'Driver wacht passief; eerst Mijn Account openen om timer te bevestigen.');
  }

  async function tick() {
    if (!enabled() || busy) return;
    const sessionBatch = unsafeWindow.mrbHeistSessionBatch;
    if (sessionBatch?.managed?.() === true && sessionBatch?.allows?.('spot') !== true) {
      setStatus('SESSION_WAIT', 'Sessie Manager: Spot Overval wacht op Race of Heist.');
      schedule(1000);
      return;
    }
    if (unsafeWindow.mrbManualControl?.isPaused?.()) {
      const seconds = Math.max(1, Math.ceil((unsafeWindow.mrbManualControl.remaining?.() || 0) / 1000));
      setStatus('MANUAL_PAUSE', `Handmatige bediening actief. Spot hervat automatisch over ongeveer ${seconds} sec.`);
      schedule(Math.min(1000, Math.max(250, unsafeWindow.mrbManualControl.remaining?.() || 1000)));
      return;
    }
    busy = true;
    try {
      if (role() === 'leader') await leaderTick();
      else await driverTick();
    } catch (err) {
      setStatus('ERROR', err && err.message ? err.message : String(err));
      console.error('[MRB Spot COM-style]', err);
    } finally {
      busy = false;
      schedule(nextDelay());
    }
  }

  function makePanel() {
    panel = addBlock(`
      <h4>Spot Overval</h4>
      <div class="gm-row" style="gap:9px;">
        <label><input type="radio" name="mrbSpotRoleIntegrated" value="leader"> Leider</label>
        <label><input type="radio" name="mrbSpotRoleIntegrated" value="driver"> Driver</label>
      </div>
      <div id="mrbSpotFamilyAutoIntegrated" style="font-size:11px;line-height:1.35;margin-top:6px;opacity:.9;">Eigen familie: niet herkend (automatisch)</div>
      <div class="gm-row" style="margin-top:7px;gap:8px;align-items:center;">
        <button id="mrbSpotToggleIntegrated" class="gm-btn"></button>
        <span id="mrbSpotStatusIntegrated" class="gm-status" style="margin:0;"></span>
      </div>
      <div id="mrbSpotDetailIntegrated" style="font-size:11px;line-height:1.35;margin-top:5px;"></div>
    `, '03-spot-overval');

    statusEl = panel.querySelector('#mrbSpotStatusIntegrated');
    detailEl = panel.querySelector('#mrbSpotDetailIntegrated');
    toggleBtn = panel.querySelector('#mrbSpotToggleIntegrated');
    familyLabel = panel.querySelector('#mrbSpotFamilyAutoIntegrated');
    roleLeader = panel.querySelector('input[value="leader"]');
    roleDriver = panel.querySelector('input[value="driver"]');
    if (familyLabel) familyLabel.textContent = `Eigen familie: ${family() || 'niet herkend'} (automatisch)`;
    roleLeader.checked = role() === 'leader';
    roleDriver.checked = role() === 'driver';

    panel.querySelectorAll('input[name="mrbSpotRoleIntegrated"]').forEach(r => r.addEventListener('change', () => {
      if (!r.checked) return;
      set(K.role, r.value);
      resetFlow(true);
      setStatus('IDLE', `Rol gewijzigd naar ${r.value === 'leader' ? 'Leider' : 'Driver'}.`);
      if (enabled()) { clearLoop(); schedule(200); }
    }));
    function setEnabled(on) {
      const wanted=on===true;
      if(enabled()===wanted){renderToggle();return;}
      set(K.enabled, wanted);
      if (wanted) {
        resetFlow(true);
        setStatus('IDLE', `${role() === 'leader' ? 'Leider' : 'Driver'} gestart.`);
        clearLoop(); schedule(150);
      } else {
        clearLoop();
        setStatus('STOPPED', 'Module gestopt.');
      }
      renderToggle();
    }
    toggleBtn.addEventListener('click', () => setEnabled(!enabled()));
    unsafeWindow.mrbSpotSessionSetEnabled=setEnabled;
    renderToggle();
    setStatus(enabled() ? state() : 'STOPPED', enabled() ? 'Spot Overval actief.' : 'Module gestopt.');
  }

  function renderToggle() {
    if (!toggleBtn) return;
    toggleBtn.textContent = enabled() ? 'Stop' : 'Start';
  }

  // Eenmalige migratie: behoud oude aan/uit- en rolkeuze, maar verwijder alle
  // oude Spot-runtimegegevens zodat de vervangen core niet kan hervatten.
  const MIGRATION_KEY = 'mrb_spot_com_style_integrated_570';
  if (!get(MIGRATION_KEY, false)) {
    if (get(K.enabled, null) === null) set(K.enabled, !!GM_Get('mrb_spot_raid_on_v2', false));
    if (get(K.role, null) === null) set(K.role, String(GM_Get('mrb_spot_raid_role_v2', 'leader')) === 'driver' ? 'driver' : 'leader');
    [
      'mrb_spot_raid_state_v3','mrb_spot_raid_next_v3','mrb_spot_raid_last_action_v3',
      'mrb_spot_raid_invited_v3','mrb_spot_raid_driver_meta_v3','mrb_spot_raid_invite_meta_v3',
      'mrb_spot_raid_start_meta_v3','mrb_spot_raid_state_since_v3','mrb_spot_raid_retries_v3',
      'mrb_spot_raid_last_error_v3','mrb_spot_raid_cycle_v3'
    ].forEach(k => GM_Set(k, ''));
    resetFlow(false);
    set(MIGRATION_KEY, true);
  }

  makePanel();
  unsafeWindow.mrbSpotRaidCoreV3 = {
    version: '5.8.26-com-style-exact-family-exclusion',
    step: () => false,
    wake: () => { if (enabled()) { set(K.lastAction, 0); set(K.lastNav, 0); clearLoop(); schedule(150); } },
    setEnabled: on => unsafeWindow.mrbSpotSessionSetEnabled?.(on===true),
    getState: () => ({ enabled: enabled(), role: role(), state: state(), nextAt: timerAt() })
  };
  unsafeWindow.mrbV9SpotRaid = unsafeWindow.mrbSpotRaidCoreV3;
  if (enabled()) schedule(150);

  })();
// 1) RACEBLOK
// =====================================================================
try {
(function RaceScriptCombined(){
  function normalizeRaceRole(v){
    v = String(v || '').toLowerCase();
    // UI heet Driver, maar de bestaande werkende interne flow heet nog steeds 'slave'.
    return (v === 'slave' || v === 'driver') ? 'slave' : 'leader';
  }

  // persistent state
  let scriptAan       = GM_Get("race_scriptAan", false);
  let raceRole        = normalizeRaceRole(GM_Get("race_role", "leader")); // 'leader' | 'slave' (Driver in UI)
  GM_Set("race_role", raceRole);
  let raceAutoTravel  = GM_Get("race_autoTravel", false); // auto-travel voor driver
  let raceCorePhase = 'IDLE';
  let raceCoreDetail = 'gereed';
  let raceCoreUpdatedAt = Date.now();

  function raceRegistryState(phase, detail=''){
    raceCorePhase = String(phase || 'IDLE');
    raceCoreDetail = String(detail || '');
    raceCoreUpdatedAt = Date.now();
    try {
      unsafeWindow.mrbModuleStateRegistry?.set?.('Race', {
        phase: raceCorePhase,
        detail: raceCoreDetail,
        updatedAt: raceCoreUpdatedAt,
        running: !!scriptAan,
        role: raceRole
      });
    } catch(e) {}
  }

  // 5.8.40: centrale vrijgave van een afgeronde/gepauzeerde Race-actie.
  // In 5.8.38/5.8.39 werd deze helper wel aangeroepen maar nergens gedefinieerd,
  // waardoor callbacks met een ReferenceError stopten voordat Mijn Account kon openen.
  function raceReleaseAction(detail='Race-actie vrijgegeven'){
    raceCorePhase = 'IDLE';
    raceCoreDetail = String(detail || 'Race-actie vrijgegeven');
    raceCoreUpdatedAt = Date.now();
    try {
      unsafeWindow.mrbModuleStateRegistry?.set?.('Race', {
        phase:'IDLE', state:'IDLE', detail:raceCoreDetail, updatedAt:raceCoreUpdatedAt,
        running:!!scriptAan, role:raceRole
      });
    } catch(e) {}
    return true;
  }

  // Alleen echte transactie-fasen blokkeren Heist. Idle/cooldown/info-wacht nooit.
  const RACE_ACTIVE_PHASE_RE = /^(?:STARTING|LEADER_OPEN|LEADER_INVITE|WAITING_DRIVER|RUNNING|DRIVER_OPEN|DRIVER_ACCEPT|DRIVER_CAR|TRAVEL|CANCEL_PENDING|CANCELLING)$/;
  try {
    unsafeWindow.mrbRaceTransaction = Object.freeze({
      active:()=>RACE_ACTIVE_PHASE_RE.test(String(raceCorePhase||'').toUpperCase()),
      phase:()=>String(raceCorePhase||'IDLE'),
      release:()=>raceReleaseAction('extern vrijgegeven')
    });
  } catch(e) {}

  // persistente idle-planning
  const K_RACE_PLAN = 'race_idlePlan_v1'; // { type:'start'|'info', at:number, createdAt:number }

  // timers en helpers om dubbel-loop te voorkomen
  let failsafeTimer = null;
  let loopTimer     = null;

  // 5.8.36: Driver onthoudt kort dat hij voor de huidige uitnodiging al een auto
  // heeft ingestuurd. Als de Leider daarna annuleert, verdwijnt de ready/wachttekst.
  // Na enkele bevestigde lege Race-controles synchroniseert Driver opnieuw via Mijn Account.
  let driverAcceptedWatch = false;
  let driverAcceptedMisses = 0;
  // 5.8.50: onafhankelijke Driver-exit. Na een bevestigde/ingestuurde auto mag de
  // Driver niet afhankelijk blijven van de gedeelde Race loopTimer. Die timer kan door
  // een andere Race-callback worden vervangen. Deze aparte timer keert daarom altijd
  // terug naar Mijn Account zolang de Driver nog op een Race-pagina staat.
  let driverReadyExitTimer = null;
  function clearDriverReadyExit(){
    if (driverReadyExitTimer){ clearTimeout(driverReadyExitTimer); driverReadyExitTimer = null; }
  }
  function driverReadyHardExit(reason='Driver-race afgerond; terug naar Mijn Account'){
    clearDriverReadyExit();
    driverReadyExitTimer = setTimeout(()=>{
      driverReadyExitTimer = null;
      if(!scriptAan || raceRole!=='slave' || isLoggedOut()) return;
      if (/information\.php/i.test(location.href)) {
        raceReleaseAction(reason);
        return;
      }
      // Alleen Race zelf verlaten; nooit een andere modulepagina onverwacht onderbreken.
      if (!/races\.php/i.test(location.href)) return;
      raceRegistryState('DRIVER_POST_RACE_HOME', reason);
      clearRacePlan();
      raceReleaseAction(reason);
      guiLoad('/information.php');
      setTimeout(()=>{
        if(!scriptAan || raceRole!=='slave' || isLoggedOut()) return;
        if (/information\.php/i.test(location.href)) checkAvailability(true);
      }, randomDelay(2500,4500));
    }, randomDelay(6500,9000));
  }

  const next = (fn, ms)=>{
    if(loopTimer) clearTimeout(loopTimer);
    loopTimer = setTimeout(fn, Math.max(0, ms || 0));
  };
  const clearAll = ()=>{
    if(loopTimer) clearTimeout(loopTimer);
    if(failsafeTimer) clearTimeout(failsafeTimer);
    clearDriverReadyExit();
  };

  const block = addBlock(`
    <h4>Race</h4>
    <div class="gm-row">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="radio" name="raceRole" value="leader" ${raceRole==='leader'?'checked':''}> Leider
      </label>
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="radio" name="raceRole" value="slave" ${raceRole==='slave'?'checked':''}> Driver
      </label>
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="raceToggle" class="gm-btn">${scriptAan?'Stop':'Start'}</button>
      <div id="raceStatus" class="gm-status" style="margin:0;">
        ${scriptAan?'<span class="ok">✅ Actief</span>':'<span class="bad">⛔</span>'}
      </div>
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;margin-top:4px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="checkbox" id="raceAutoTravel" ${raceAutoTravel?'checked':''}>
        Travel <span style="opacity:.85">(driver: naar race-stad reizen)</span>
      </label>
    </div>
  `,'01-race');

  const $jq = ()=> (unsafeWindow.$ || unsafeWindow.jQuery || null);


  const guiLoad = (path)=>{
    if (unsafeWindow.mrbNavigate?.(path,{source:'race'})) return true;
    try { unsafeWindow.omerta.GUI.container.loadPage(path); return true; }
    catch {
      // Gebruik voor Race altijd de normale pagina-URL; nooit een half geladen
      // fragment in de bestaande game-container laten staan.
      if (path.startsWith('/')) location.href = path;
      else location.href = '/'+path.replace(/^\//,'');
      return true;
    }
  };

  function randomDelay(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function actionDelay(){ return (typeof unsafeWindow.mrbVarDelayMs === 'function') ? unsafeWindow.mrbVarDelayMs() : randomDelay(2000,5000); }

  function parseTimer(txt){
    const value = String(txt || '').replace(/\s+/g,' ').trim();
    if (!value || /^(Nu|Now)$/i.test(value)) return 0;
    let h=0,m=0,s=0;
    for (const part of value.toUpperCase().split(/\s+/)){
      const hit = part.match(/^(\d+)([HMS])$/);
      if (!hit) continue;
      const n = Number(hit[1]) || 0;
      if (hit[2] === 'H') h = n;
      else if (hit[2] === 'M') m = n;
      else s = n;
    }
    return ((h*3600)+(m*60)+s)*1000;
  }

  // uniforme “moe van de race” detectie (NL + EN)
  const isTired = (text)=> /(Je\s*bent\s*nog\s*moe\s*van\s*je\s*vorige\s*race|still\s*tired\s*from\s*your\s*last\s*race)/i.test(text);

  // Driver-ready/wachtstatus (NL + EN). De NL-pagina toont o.a.
  // "Je hebt een auto geselecteerd om mee te racen" en "Je bent klaar voor de race".
  const alreadyAcceptedMsg = (text) =>
    /You're ready for the race/i.test(text) ||
    /wait for the race to end/i.test(text) ||
    /Je\s*hebt\s*een\s*auto\s*geselecteerd\s*om\s*mee\s*te\s*racen/i.test(text) ||
    /Je\s*bent\s*klaar\s*voor\s*de\s*race/i.test(text) ||
    /wacht(?:en)?\s*tot\s*de\s*race/i.test(text);

  // Driver-ready is geen wachtpagina meer: na bevestiging keert Driver terug naar Mijn Account.


  // ---------- UITLOG-GUARD ----------
  function isLoggedOut(){ return gm_isGateVisible(); }

  function loadRacePlan(){
    try{
      const raw = GM_Get(K_RACE_PLAN, '');
      if (!raw) return null;
      if (typeof raw === 'string') return JSON.parse(raw);
      if (typeof raw === 'object') return raw;
    }catch{}
    return null;
  }

  function saveRacePlan(plan){
    try{
      GM_Set(K_RACE_PLAN, JSON.stringify(plan));
    }catch{
      GM_Set(K_RACE_PLAN, plan);
    }
    return plan;
  }

  function clearRacePlan(){
    try{ GM_Set(K_RACE_PLAN, ''); }catch{}
  }

  function armStoredRacePlan(){
    if(!scriptAan) return false;

    const plan = loadRacePlan();
    if (!plan || !plan.type || !plan.at) return false;

    const wait = Math.max(0, plan.at - Date.now());


    next(()=>{
      if(!scriptAan) return;

      const latest = loadRacePlan();
      if (!latest || !latest.type || !latest.at) return;

      const remaining = latest.at - Date.now();
      if (remaining > 250){
        armStoredRacePlan();
        return;
      }

      if (latest.type === 'start'){
        clearRacePlan();
        if (isLoggedOut()) return pauseForGate('Geplande racestart tijdens gate');
        if (raceRole === 'leader') leader_startRace();
        else slave_startRace();
        return;
      }

      if (latest.type === 'info'){
        clearRacePlan();
        if (isLoggedOut()) return pauseForGate('Geplande info-check tijdens gate');
        guiLoad('/information.php');
        next(()=>checkAvailability(true), randomDelay(3000,6000));
        return;
      }

      clearRacePlan();
    }, wait);

    return true;
  }

  function planRaceStart(){
    // Leider krijgt altijd ruim de tijd om de uitnodiging eerst aan te maken.
    // De oude vensters overlapten (Leider 4-10s, Driver 10-15s), waardoor de
    // Driver soms tegelijk of zelfs eerder op de racepagina aankwam.
    const delay = (raceRole === 'leader')
      ? randomDelay(3000,7000)
      : randomDelay(25000,30000);

    saveRacePlan({
      type: 'start',
      at: Date.now() + delay,
      createdAt: Date.now(),
      role: raceRole
    });

    armStoredRacePlan();
  }

  function planInfoRecheck(waitMs){
    // Een cooldown/info-wachtmoment is geen actieve Race-transactie.
    // Geef de Core Planner daarom direct weer vrij.
    raceReleaseAction();
    saveRacePlan({
      type: 'info',
      at: Date.now() + Math.max(0, waitMs),
      createdAt: Date.now()
    });

    armStoredRacePlan();
  }

  function bootstrapRaceIdle(){
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('bootstrapRaceIdle: uitgelogd');

    const existingPlan = loadRacePlan();
    if (existingPlan && existingPlan.type && existingPlan.at){
      armStoredRacePlan();
      return;
    }

    if (/information\.php/i.test(location.href)){
      checkAvailability(true);
      return;
    }

    guiLoad('/information.php');
    next(()=>checkAvailability(true), randomDelay(3000,6000));
  }

  function pauseForGate(reason=''){
    if(!scriptAan) return;
    clearAll();
    raceReleaseAction();

    try{ console.log('[Race] Pauze (gate):', reason || gm_gateReason()); }catch{}

    next(()=>{
      if(!scriptAan) return;
      if (gm_isGateVisible()) return pauseForGate(reason);
      bootstrapRaceIdle();
    }, 5000);
  }

  function paint(){
    q('#raceToggle',block).textContent = scriptAan ? 'Stop' : 'Start';
    q('#raceStatus',block).innerHTML  = scriptAan
      ? `<span class="ok">✅ Actief</span>`
      : '<span class="bad">⛔</span>';

    const travelEl = q('#raceAutoTravel', block);
    if (travelEl){
      travelEl.checked = !!raceAutoTravel;
      travelEl.title   = 'Als dit aan staat mag de driver automatisch naar de race-stad reizen.';
    }
  }

  function stopRaceScript(reason){
    raceReleaseAction();
    scriptAan = false;
    GM_Set("race_scriptAan", false);
    clearAll();
    clearRacePlan();
    paint();
    try { console.warn('[Race] Gestopt:', reason); } catch {}
  }

  // ===================================================================
  // Auto-Travel helpers
  // ===================================================================
  const RACE_NAME_TO_CODE = {
    'philadelphia':'Phi',
    'baltimore'   :'Bal',
    'corleone'    :'Cor',
    'palermo'     :'Pal',
    'new york'    :'NY',
    'detroit'     :'Det',
    'chicago'     :'Chi',
    'las vegas'   :'LV'
  };

  const RACE_CODE_TO_ID = {
    Det: 0,
    Chi: 1,
    Pal: 2,
    NY : 3,
    LV : 4,
    Phi: 5,
    Bal: 6,
    Cor: 7
  };

  function raceCityNameToCode(name){
    if (!name) return null;
    const key = name.trim().toLowerCase();
    return RACE_NAME_TO_CODE[key] || null;
  }

  function raceClickCityByCode(code){
    const id = RACE_CODE_TO_ID[code];
    if (id==null) return false;

    try{
      if (typeof unsafeWindow.onTravelData === 'function'){
        unsafeWindow.onTravelData(id);
        return true;
      }
    }catch{}

    const cityName = ({Det:'Detroit',Chi:'Chicago',NY:'New York',LV:'Las Vegas',Phi:'Philadelphia',Bal:'Baltimore',Cor:'Corleone',Pal:'Palermo'})[code];
    const a = document.querySelector(`a[onclick="onTravelData(${id});"]`)
           || document.querySelector(`a[onclick^="onTravelData(${id})"]`)
           || document.querySelector(`a[href*="CityId=${id}"]`)
           || Array.from(document.querySelectorAll('a')).find(el =>
                String(el.textContent || '').replace(/\s+/g,' ').trim().toLowerCase() === String(cityName || '').toLowerCase()
              );
    if (!a) return false;

    try {
      a.click();
      a.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
      return true;
    }catch(e){
      console.warn('[Race] raceClickCityByCode error', e);
    }
    return false;
  }

  function racePromptOpen(){
    return document.querySelector('.jqi') !== null;
  }

  function raceFindTravelButton(){
    return document.querySelector('button[name="jqi_state0_buttonTravel"][value="true"]')
      || document.querySelector('.jqi .jqibuttons button[name="jqi_state0_buttonTravel"]')
      || Array.from(document.querySelectorAll('button.jqibutton, .jqibuttons button, button.btn'))
           .find(b => /travel/i.test(b.textContent || ''))
      || null;
  }

  function raceAutoTravelToCityName(cityName){
    raceRegistryState('TRAVEL', 'naar racestad reizen');
    const code = raceCityNameToCode(cityName);
    if (!code){
      console.warn('[Race] Auto-Travel: stad niet herkend:', cityName);
      return;
    }
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('Auto-Travel gestart terwijl je uitgelogd bent');

    console.log('[Race] Auto-Travel naar', cityName, '(', code, ')');
    clearAll();
    guiLoad('/?module=Travel');
    next(()=>raceAutoTravelFlow(code), randomDelay(800,1500));
  }

  function raceAutoTravelFlow(code){
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('Auto-Travel flow: uitgelogd');

    const ok = raceClickCityByCode(code);
    if (!ok){
      return next(()=>raceAutoTravelFlow(code), 600);
    }

    next(()=>raceConfirmTravelAndBackToInfo(), randomDelay(700,1100));
  }

  function raceConfirmTravelAndBackToInfo(){
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('Auto-Travel confirm: uitgelogd');

    if (!racePromptOpen()){
      return next(raceConfirmTravelAndBackToInfo, 500);
    }

    const btn = raceFindTravelButton();
    if (!btn){
      return next(raceConfirmTravelAndBackToInfo, 500);
    }

    try { btn.click(); }catch{}

    let tries = 0;
    (function poll(){
      if(!scriptAan) return;
      if (isLoggedOut()) return pauseForGate('Auto-Travel poll: uitgelogd');

      if (!racePromptOpen() || tries>20){
        next(()=>{
          if(!scriptAan) return;
          if (isLoggedOut()) return pauseForGate('Auto-Travel klaar: uitgelogd bij terugkeer');
          clearRacePlan();
          guiLoad('/information.php');
          next(()=>checkAvailability(true), randomDelay(2000,4000));
        }, actionDelay());
        return;
      }
      tries++;
      setTimeout(poll, 250);
    })();
  }

  function raceFindFirstCityInText(text){
    if (!text) return null;
    const lower = text.toLowerCase();
    let bestName = null;
    let bestIdx  = Infinity;
    for (const name in RACE_NAME_TO_CODE){
      const idx = lower.indexOf(name);
      if (idx !== -1 && idx < bestIdx){
        bestIdx  = idx;
        bestName = name;
      }
    }
    return bestName;
  }

  // ===================================================================
  // SPECIALS
  // ===================================================================

  // LEIDER: "You started a race in Chicago. Please return there." → Cancel
  function handleLeaderReturnToRaceCity(body){
    if (raceRole!=='leader') return false;
    if (!/You started a race in/i.test(body)) return false;

    const cancel = document.querySelector('input[type="submit"][value="Cancel"][data-oc-auto-filled="1"]')
                 || document.querySelector('input[type="submit"][value="Cancel"]');
    if (!cancel) return false;

    console.log('[Race] Leader: race in andere stad -> Cancel & terug naar info');
    try { cancel.click(); } catch {}
    next(()=>{
      if (isLoggedOut()) return pauseForGate('Leader-cancel: uitgelogd na klik');
      clearRacePlan();
      guiLoad('/information.php');
      next(()=>checkAvailability(true), randomDelay(2000,4000));
    }, randomDelay(1500,3000));
    return true;
  }

  // DRIVER: "Chicago (travel to this city to accept)" → auto-travel naar die stad
  function handleSlaveTravelToRaceCity(){
    if (raceRole!=='slave') return false;
    if (!raceAutoTravel) return false;
    if (isLoggedOut()) return false;

    const link = document.querySelector('#game_container a[href*="module=Travel"][href*="CityId="]');
    if (!link) return false;

    const cell = link.closest('td') || link.parentElement;
    if (!cell) return false;

    const full = (cell.textContent || '').trim();
    let cityName = null;
    const m = full.match(/^([A-Za-z ]+)\s*\(/);
    if (m) cityName = m[1].trim();
    if (!cityName){
      const fallback = raceFindFirstCityInText(full);
      if (fallback) cityName = fallback;
    }
    if (!cityName) return false;

    console.log('[Race] Driver: uitnodiging in andere stad -> Auto-Travel naar', cityName);
    raceAutoTravelToCityName(cityName);
    return true;
  }

  // ===================================================================
  // Algemene flows
  // ===================================================================

  function goInfo(){
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('goInfo: uitgelogd');
    // 5.8.45: zodra Race bewust terugkeert naar Mijn Account is de lopende
    // Race-transactie voor andere modules klaar. In 5.8.44 kon vooral de Leider
    // hier terugkeren terwijl WAITING_DRIVER/RUNNING in het geheugen bleef staan.
    // Heist zag die stale lock vervolgens als een nog actieve Race. Een echte
    // browserrefresh loste dit op omdat raceCorePhase dan opnieuw IDLE werd.
    // Geef de lock daarom VOOR de navigatie vrij; checkAvailability leest daarna
    // op Mijn Account opnieuw de actuele server-timer en bouwt zo nodig een nieuw plan.
    clearRacePlan();
    raceReleaseAction('Race terug naar Mijn Account; server-timer opnieuw synchroniseren');
    guiLoad('/information.php');
    next(()=>checkAvailability(true), randomDelay(3000,6000));
  }

  // ------------------ LEIDER FLOW ------------------
  function raceSafeClick(el){
    if (!el) return false;
    try{ el.focus(); }catch{}
    try{ el.click(); return true; }catch{}
    try{
      el.dispatchEvent(new MouseEvent('mousedown', {bubbles:true,cancelable:true,view:window}));
      el.dispatchEvent(new MouseEvent('mouseup',   {bubbles:true,cancelable:true,view:window}));
      el.dispatchEvent(new MouseEvent('click',     {bubbles:true,cancelable:true,view:window}));
      return true;
    }catch{}
    return false;
  }

  function raceSetInputValue(el, value){
    if (!el) return false;
    try{ el.focus(); }catch{}
    el.value = value || '';
    try{ el.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
    try{ el.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
    return true;
  }

  function racePartnerName(){
    return String(GM_Get('race_partner_name', 'Invullen') || 'Invullen').trim() || 'Invullen';
  }

  function raceGetInputLabelText(el){
    try{
      const id = el && el.id;
      const lbl = id ? document.querySelector(`label[for="${id}"]`) : null;
      const row = el?.closest('tr, .row, div, p, td');
      return ((lbl?.textContent || '') + ' ' + (row?.textContent || '')).replace(/\s+/g,' ').trim();
    }catch{ return ''; }
  }

  function racePrefillInviteName(){
    const partner = racePartnerName();

    // Bekende BF/Omerta race velden eerst.
    const preferred = [
      'input[name="racer2"]',
      'input[name="driver"]',
      'input[name="racer"]',
      'input[name="player"]',
      'input[name="invite"]',
      'input[name="username"]'
    ];
    for (const sel of preferred){
      const el = document.querySelector(sel);
      if (el && !el.disabled && (el.type || '').toLowerCase() !== 'hidden'){
        raceSetInputValue(el, partner);
        return true;
      }
    }

    // Daarna tekstvelden zoeken waarbij label/naam/id naar racer/driver/speler wijst.
    const inputs = Array.from(document.querySelectorAll('input[type="text"], input:not([type])'))
      .filter(i => !i.disabled && i.offsetParent !== null)
      .filter(i => {
        const hay = ((i.name||'') + ' ' + (i.id||'') + ' ' + (i.placeholder||'') + ' ' + raceGetInputLabelText(i)).toLowerCase();
        return /racer|driver|speler|player|naam|name|invite|uitnodig/.test(hay);
      });

    const el = inputs[0] || Array.from(document.querySelectorAll('input[type="text"], input:not([type])')).find(i => !i.disabled && i.offsetParent !== null) || null;
    if (el){
      raceSetInputValue(el, partner);
      return true;
    }
    return false;
  }

  function raceButtonText(b){
    return String(b?.value || b?.textContent || b?.getAttribute?.('title') || b?.getAttribute?.('alt') || '').replace(/\s+/g,' ').trim();
  }

  function raceFindButtonByText(patterns){
    const candidates = Array.from(document.querySelectorAll('input[type="submit"], button, input[type="button"], a'))
      .filter(b => !b.disabled && b.offsetParent !== null);
    return candidates.find(b => patterns.some(re => re.test(raceButtonText(b)))) || null;
  }

  function raceFindGoToInvitesButton(){
    return raceFindButtonByText([
      /go\s*to\s*invites/i,
      /ga\s*naar\s*uitnodigingen/i,
      /naar\s*uitnodigingen/i
    ]);
  }

  function raceFindSendInviteButton(){
    return raceFindButtonByText([
      /send\s*invite\(s\)/i,
      /send\s*invites?/i,
      /verstuur/i,
      /verzenden/i,
      /uitnodig/i,
      /invite/i
    ]);
  }

  function raceFindRaceStartButton(){
    return raceFindButtonByText([
      /^race!!!$/i,
      /^race!?$/i,
      /start\s*race/i,
      /starten/i
    ]);
  }

  // 5.8.35: wanneer de server een oude/achtergebleven gestarte race toont,
  // blokkeert die onder meer Travel. Annuleer uitsluitend bij deze expliciete melding.
  function raceStartedTravelBlockVisible(){
    const body = String(document.body?.innerText || '').replace(/\s+/g,' ').trim();
    return /je\s+hebt\s+een\s+race\s+gestart\s+in\s+.+?ga\s+hiernaar\s+terug\s+aub/i.test(body)
      || /you\s+have\s+started\s+a\s+race\s+in\s+.+?(?:go|return)\s+back/i.test(body);
  }

  function raceFindStartedCancelButton(){
    if (!raceStartedTravelBlockVisible()) return null;
    return raceFindButtonByText([
      /^annuleer$/i,
      /^cancel$/i,
      /^annuleren$/i
    ]);
  }

  function raceRecoverStartedTravelBlock(source='Race'){
    if (!raceStartedTravelBlockVisible()) return false;
    const cancel = raceFindStartedCancelButton();
    if (!cancel) {
      raceRegistryState('CANCEL_PENDING', `${source}: gestarte race blokkeert Travel; Annuleer nog niet zichtbaar`);
      next(()=>raceRecoverStartedTravelBlock(source) || goInfo(), randomDelay(1200,2200));
      return true;
    }

    raceRegistryState('CANCELLING', `${source}: achtergebleven gestarte race annuleren`);
    clearRacePlan();
    raceReleaseAction();
    raceSafeClick(cancel);
    next(()=>{
      if(!scriptAan) return;
      clearRacePlan();
      guiLoad('/information.php');
      next(()=>checkAvailability(true), randomDelay(3000,6000));
    }, randomDelay(1200,2200));
    return true;
  }

  // Selecteer robuust een race-auto voordat invites/verzenden worden geklikt.
  function raceSelectFirstAvailableCar(){
    let did = false;

    const isPlaceholder = (txt, val) => {
      txt = String(txt || '').replace(/\s+/g,' ').trim().toLowerCase();
      val = String(val || '').trim().toLowerCase();
      // "Willekeurige auto in deze stad" is een geldige keuze, geen placeholder.
      if (/willekeurige auto|random car/.test(txt)) return false;
      return /^(-|0|select|choose|kies|maak|geen|none)$/i.test(val) ||
             /^(select|choose|kies|maak een keuze|geen auto|no car)/i.test(txt);
    };

    const fire = (el) => {
      try{ el.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
      try{ el.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
      try{
        const $ = $jq && $jq();
        if ($) $(el).trigger('input').trigger('change');
      }catch{}
    };

    // Driver-layout kan maar één geldige optie bevatten. Die moet ook bevestigd worden.
    const selects = Array.from(document.querySelectorAll('select'));
    for (const sel of selects){
      if (!sel || sel.disabled || !sel.options || !sel.options.length) continue;
      const opts = Array.from(sel.options);
      const opt = opts.find(o => !o.disabled && !isPlaceholder(o.textContent, o.value));
      if (!opt) continue;
      sel.selectedIndex = opts.indexOf(opt);
      sel.value = opt.value;
      fire(sel);
      did = true;
    }

    // Fallback voor layouts met radio's/checkboxes voor auto's.
    const carInputs = Array.from(document.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
      .filter(i => !i.disabled && /car|auto|race/i.test((i.name || '') + ' ' + (i.id || '') + ' ' + (i.value || '')));
    if (carInputs.length && !carInputs.some(i => i.checked)){
      const first = carInputs[0];
      first.checked = true;
      fire(first);
      did = true;
    }

    return did;
  }

  function leader_startRace(){
    raceRegistryState('LEADER_OPEN', 'racepagina openen');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('leader_startRace: uitgelogd');

    clearRacePlan();
    guiLoad('/races.php');

    if(failsafeTimer) clearTimeout(failsafeTimer);
    failsafeTimer = setTimeout(()=>{
      if(!scriptAan) return;
      goInfo();
    }, 60000);

    next(leader_raceFlow, randomDelay(1500,3000));
  }

  function leader_raceFlow(){
    raceRegistryState('LEADER_INVITE', 'uitnodiging voorbereiden');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('leader_raceFlow: uitgelogd');
    const body = document.body.innerText || '';

    if (raceRecoverStartedTravelBlock('Leider-flow')) return;
    if (handleLeaderReturnToRaceCity(body)) return;

    if (isTired(body)){ next(goInfo, randomDelay(5000,10000)); return; }

    // Als de Driver klaar staat/auto heeft ingezet: direct racen.
    if (/All racers are ready for the race|Race!!!|ready for the race/i.test(body) || raceFindRaceStartButton()){
      leader_tryStart();
      return;
    }

    // 1) Startpagina: naam invullen en op "Ga naar uitnodigingen" klikken.
    const goInvites = raceFindGoToInvitesButton();
    if (goInvites){
      racePrefillInviteName();
      next(()=>{
        if(!scriptAan) return;
        racePrefillInviteName();
        raceSafeClick(goInvites);
        next(leader_raceFlow, randomDelay(1500,2800));
      }, actionDelay());
      return;
    }

    // 2) Invitepagina: Driver invullen en uitnodiging verzenden.
    const inviteBtn = raceFindSendInviteButton();
    if (inviteBtn){
      racePrefillInviteName();
      raceSelectFirstAvailableCar();
      next(()=>{
        if(!scriptAan) return;
        racePrefillInviteName();
        raceSelectFirstAvailableCar();
        raceSafeClick(inviteBtn);
        if(failsafeTimer) clearTimeout(failsafeTimer);
        next(()=> leader_checkPartner(0), randomDelay(10000,15000));
      }, actionDelay());
      return;
    }

    // 3) Bekende starttekst, maar knoppen nog niet gevonden: blijf kort pollen.
    if (/You can start a race with your car against|Please fill in the names|invites?|uitnodigingen/i.test(body)){
      next(leader_raceFlow, randomDelay(1000,2000));
      return;
    }

    next(()=>{
      if(!scriptAan) return;
      if (isLoggedOut()) return pauseForGate('leader_raceFlow fallback: uitgelogd');
      guiLoad('/races.php');
      next(leader_raceFlow, randomDelay(1500,3000));
    }, randomDelay(5000,10000));
  }

  function leader_checkPartner(retries){
    raceRegistryState('WAITING_DRIVER', 'wacht op Driver');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('leader_checkPartner: uitgelogd');
    if(retries>=3){ goInfo(); return; }

    guiLoad('/races.php');
    next(()=>{
      const body = document.body.innerText || '';

      if (raceRecoverStartedTravelBlock('Leider-wacht')) return;
      if (handleLeaderReturnToRaceCity(body)) return;

      if (isTired(body)){ next(goInfo, randomDelay(5000,10000)); return; }

      if (/Race!!!|All racers are ready for the race|ready for the race/i.test(body) || raceFindRaceStartButton()) {
        leader_tryStart();
        return;
      }

      if (/invited|accepted|uitgenodigd|geaccepteerd|waiting|wachten/i.test(body)){
        next(()=> leader_checkPartner(retries+1), randomDelay(10000,15000));
        return;
      }

      next(leader_raceFlow, randomDelay(2000,4000));
    }, randomDelay(1000,2000));
  }

  function leader_tryStart(){
    raceRegistryState('STARTING', 'Race starten');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('leader_tryStart: uitgelogd');

    if (raceRecoverStartedTravelBlock('Race-start')) return;

    const btn = raceFindRaceStartButton()
      || document.querySelector('input[type="submit"][value="Race!!!"]')
      || document.querySelector('input[type="submit"][name="race"]');

    if (btn){
      raceSafeClick(btn);
      if(failsafeTimer) clearTimeout(failsafeTimer);
      next(leader_checkDone, randomDelay(5000,8000));
    } else {
      next(()=>{
        guiLoad('/races.php');
        next(leader_raceFlow, randomDelay(1200,2500));
      }, randomDelay(2500,4500));
    }
  }

  function leader_checkDone(attempt=0){
    raceRegistryState('RUNNING', 'wacht op race-resultaat');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('leader_checkDone: uitgelogd');
    const $ = $jq();
    const body = document.body.innerText || '';
    const done = $ ? $('#game_container:contains("The Race has ended, check your inbox for results"), #game_container:contains("check your inbox for results"), #game_container:contains("The race has ended")').length>0 : false;

    if (raceRecoverStartedTravelBlock('Race-resultaatcontrole')) return;

    if (done || body.includes("The race has ended") || body.includes("check your inbox for results")){
      GM_Set("lastRaceTime", Math.floor(Date.now()/1000));
      next(goInfo, randomDelay(5000,10000));
    } else if (isTired(body)){
      next(goInfo, randomDelay(5000,10000));
    } else if (attempt >= 2){
      // 5.8.49: de Race-start is al verzonden. Als de website geen bekende
      // eindtekst toont, mag Race niet onbeperkt op /races.php blijven pollen.
      // Mijn Account is daarna de bron van waarheid voor de nieuwe Race-timer.
      raceRegistryState('POST_RACE_HOME', 'resultaattekst niet herkend; terug naar Mijn Account');
      next(goInfo, randomDelay(2500,4500));
    } else {
      next(()=>leader_checkDone(attempt+1), randomDelay(5000,8000));
    }
  }

  // ------------------ DRIVER FLOW ------------------
  function raceIsLeaderPage(){
    const body = String(document.body?.innerText || '').replace(/\s+/g,' ').trim();
    if (document.querySelector('input[name="racer2"], input[name="driver"]')) return true;
    if (raceFindGoToInvitesButton()) return true;
    if (raceFindSendInviteButton()) return true;
    return /je\s*kan\s*hier\s*een\s*race\s*starten|you\s*can\s*start\s*a\s*race|racer\s*2|ga\s*naar\s*uitnodigingen|go\s*to\s*invites|uitnodiging\s*versturen|send\s*invite/i.test(body);
  }

  function raceDriverHasRealCarStep(){
    const body = String(document.body?.innerText || '').replace(/\s+/g,' ').trim();
    return /select\s*our\s*car\s*for\s*the\s*race|selecteer\s*je\s*auto\s*voor\s*de\s*race|kies\s*je\s*auto\s*voor\s*de\s*race/i.test(body);
  }

  function raceDriverLeaveLeaderPage(reason='Leider-pagina gedetecteerd'){
    raceRegistryState('DRIVER_WAIT_INVITE', reason);
    clearRacePlan();
    raceReleaseAction();
    next(()=>{
      if(!scriptAan || raceRole!=='slave') return;
      guiLoad('/information.php');
      // Niet direct opnieuw naar Race: eerst opnieuw de centrale timer lezen.
      next(()=>checkAvailability(true), randomDelay(12000,16000));
    }, randomDelay(700,1300));
  }

  function raceDriverRecoverCancelledInvite(reason='oude Race-uitnodiging verdwenen'){
    clearDriverReadySince();
    driverAcceptedWatch = false;
    driverAcceptedMisses = 0;
    clearRacePlan();
    raceReleaseAction();
    raceRegistryState('DRIVER_RESTART_AFTER_CANCEL', reason);
    next(()=>{
      if(!scriptAan || raceRole!=='slave') return;
      guiLoad('/information.php');
      // De racetimer is opnieuw de bron van waarheid. Staat die nog op Nu, dan
      // plant checkAvailability vanzelf weer een Driver-open voor de nieuwe invite.
      next(()=>checkAvailability(true), randomDelay(1800,3200));
    }, randomDelay(700,1300));
    return true;
  }

  function slave_startRace(){
    raceRegistryState('DRIVER_OPEN', 'uitnodiging openen');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('slave_startRace: uitgelogd');

    clearRacePlan();
    guiLoad('/races.php');
    next(slave_acceptLoop, randomDelay(1500,3000));
  }

  function slave_acceptLoop(){
    raceRegistryState('DRIVER_ACCEPT', 'uitnodiging accepteren');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('slave_acceptLoop: uitgelogd');
    const $ = $jq();
    if(!$){ next(slave_acceptLoop, 400); return; }

    const body = document.body.innerText || '';

    // Harde rolscheiding: een Driver mag nooit de Leider-pagina bedienen.
    if (raceIsLeaderPage()){
      raceDriverLeaveLeaderPage('Driver blokkeert Leider-racepagina');
      return;
    }

    if (isTired(body)){
      next(()=>{
        clearRacePlan();
        guiLoad('/information.php');
        next(()=>checkAvailability(true), randomDelay(10000,20000));
      }, randomDelay(10000,20000));
      return;
    }

    if (alreadyAcceptedMsg(body)){
      driverAcceptedWatch = true;
      driverAcceptedMisses = 0;

      // Driver heeft zijn auto bevestigd. Vanaf dit moment niet op de oude
      // Race-pagina blijven pollen: Mijn Account is de bron van waarheid voor
      // de volgende Race-timer. Zodra die weer op Nu staat, plant checkAvailability
      // automatisch een nieuw bezoek aan Race en kan een nieuwe invite worden geaccepteerd.
      raceRegistryState('DRIVER_READY_INFO', 'auto gereed; gegarandeerde terugkeer naar Mijn Account gepland');
      clearRacePlan();
      raceReleaseAction();
      // Onafhankelijke hard-exit: kan niet meer door de gedeelde Race-loop worden geannuleerd.
      driverReadyHardExit('Driver is gereed; terug naar Mijn Account om de Race-timer te volgen');
      return;
    }

    if (handleSlaveTravelToRaceCity()) return;

    // Alleen expliciete Driver-tekst geldt als autostap. Een willekeurige
    // <select> staat ook op de Leider-pagina en mag dus nooit voldoende zijn.
    if (raceDriverHasRealCarStep()){
      driverAcceptedMisses = 0;
      slave_selectCar();
      return;
    }

    const accept = $('a').filter(function(){ return /(Accepteer|Accept)/i.test($(this).text()); });
    if (accept.length){
      driverAcceptedWatch = true;
      driverAcceptedMisses = 0;
      accept[0].click();
      next(slave_selectCar, actionDelay());
      return;
    }

    // Driver had aantoonbaar een geaccepteerde uitnodiging/auto, maar op een
    // volledig opgebouwde Race-pagina is die toestand nu verdwenen. Dat gebeurt
    // wanneer de Leider annuleert. Twee lege controles voorkomen een false positive
    // tijdens een trage SPA-opbouw; daarna wordt direct opnieuw via Mijn Account gestart.
    if (driverAcceptedWatch){
      driverAcceptedMisses += 1;
      if (driverAcceptedMisses >= 2){
        raceDriverRecoverCancelledInvite('Leider heeft de vorige Race geannuleerd; nieuwe uitnodiging afwachten');
        return;
      }
      next(()=>{
        if(!scriptAan || raceRole!=='slave') return;
        guiLoad('/races.php');
        next(slave_acceptLoop, randomDelay(1200,2200));
      }, randomDelay(1800,3000));
      return;
    }

    if (body.includes("You're still tired from your last race")){
      next(()=>{
        clearRacePlan();
        guiLoad('/information.php');
        next(()=>checkAvailability(true), randomDelay(10000,40000));
      }, randomDelay(10000,40000));
      return;
    }

    next(()=>{
      guiLoad('/races.php');
      next(slave_acceptLoop, randomDelay(1500,4000));
    }, randomDelay(5000,10000));
  }

  function slave_selectCar(){
    raceRegistryState('DRIVER_CAR', 'auto selecteren');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('slave_selectCar: uitgelogd');

    const body = document.body?.innerText || '';

    // Tweede guard voor reeds geplande callbacks: ook hier mag de Driver nooit
    // een Leider-formulier of de algemene race-auto selecteren.
    if (raceIsLeaderPage()){
      raceDriverLeaveLeaderPage('Oude Driver-callback geblokkeerd op Leider-pagina');
      return;
    }

    const onSelectCar = raceDriverHasRealCarStep();

    if (onSelectCar){
      raceSelectFirstAvailableCar();

      const submit = Array.from(document.querySelectorAll('input[type="submit"], input[type="button"], button[type="submit"], button'))
        .find(b => /^(ga|go)$/i.test(String(b.value || b.textContent || '').trim()) || /select|ready|race|kies|bevestig|submit/i.test((b.value || b.textContent || '')))
        || document.querySelector('input[type="submit"], input[type="button"], button[type="submit"], button');

      if (submit){
        const form = submit.form || submit.closest('form');
        next(()=>{
          if(!scriptAan) return;
          raceSelectFirstAvailableCar();
          try{ submit.focus(); }catch{}
          let submitted = false;
          try{
            if (form && typeof form.requestSubmit === 'function'){
              form.requestSubmit(submit);
              submitted = true;
            }
          }catch{}
          if (!submitted){
            try{ submit.click(); submitted = true; }catch{}
          }
          if (!submitted && form){
            try{ form.submit(); submitted = true; }catch{}
          }

          driverAcceptedWatch = true;
          driverAcceptedMisses = 0;
          // Zet direct ook de onafhankelijke hard-exit klaar. Zodra de bevestigingspagina
          // zichtbaar is, kan geen andere Race-callback deze terugkeer meer blokkeren.
          driverReadyHardExit('Auto bevestigd; Driver verlaat Race altijd naar Mijn Account');
          // De onafhankelijke Driver-exit hierboven is nu de enige eigenaar van deze
          // terugkeer. Daardoor kan een andere Race-callback hem niet meer annuleren.
        }, actionDelay());
        return;
      }
    }

    next(slave_selectCar, randomDelay(5000,10000));
  }

  // ------------------ AVAILABILITY (gedeeld) ------------------
  function checkAvailability(fromInfoSync=false){
    raceRegistryState('CHECK_TIMER', 'Race-timer controleren');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('checkAvailability: uitgelogd');

    if (!/information\.php/i.test(location.href)){
      if (armStoredRacePlan()) return;

      if (fromInfoSync){
        guiLoad('/information.php');
        next(()=>checkAvailability(true), randomDelay(3000,6000));
        return;
      }

      bootstrapRaceIdle();
      return;
    }

    const $ = $jq();
    if (!$){
      next(()=>checkAvailability(fromInfoSync), 300);
      return;
    }

    // v10.0.4.23: lees de Race-timer op label in plaats van een vaste tabelrij.
    // De vaste rij verschoof na website-/modulewijzigingen, waardoor Race niet meer startte.
    function readRaceStatusByLabel(){
      const root = document.querySelector('#game_container') || document.body;
      if (!root) return '';

      const labelRe = /^(?:Volgende\s+.*race.*|Next\s+.*race.*)$/i;
      for (const row of root.querySelectorAll('tr')){
        const cells = row.querySelectorAll('td,th');
        if (!cells.length) continue;
        const label = String(cells[0]?.textContent || '').replace(/\s+/g,' ').trim();
        if (!labelRe.test(label)) continue;
        return String(cells[1]?.textContent || '').replace(/\s+/g,' ').trim();
      }

      const text = String(root.innerText || root.textContent || '').replace(/\s+/g,' ').trim();
      const m = text.match(/(?:Volgende\s+[^:|]{0,40}race[^:|]{0,40}|Next\s+[^:|]{0,40}race[^:|]{0,40})\s*[:\-]?\s*(Nu|Now|\d+H(?:\s+\d+M)?(?:\s+\d+S)?|\d+M(?:\s+\d+S)?|\d+S)/i);
      if (m) return String(m[1] || '').trim();

      // Alleen als laatste fallback de oude positie gebruiken.
      try { return String($('.thinline:eq(1)>tbody>tr:eq(9)>td:eq(1)').text() || '').trim(); }
      catch(e) { return ''; }
    }

    const status = readRaceStatusByLabel();

    if (/^(Nu|NOW|Now)$/i.test(status)){
      const existingPlan = loadRacePlan();
      if (existingPlan && existingPlan.type === 'start' && existingPlan.at > Date.now() + 250){
        armStoredRacePlan();
        return;
      }

      planRaceStart();
      return;
    }

    const wait = parseTimer(status);
    if (wait > 0){
      planInfoRecheck(wait + randomDelay(5000,15000));
      return;
    }

    // fallback bij onduidelijke tekst
    planInfoRecheck(10000);
  }

  // Zelfstandige lokale Race-watcher.
  let raceLocalWatchBusy = false;
  mrbSetInterval(()=>{
    if (!scriptAan || raceLocalWatchBusy) return;
    if (isLoggedOut()) return;
    if (!/information\.php/i.test(location.href)) return;

    const existing = loadRacePlan();
    if (existing && Number(existing.at) > Date.now() + 250) return;

    raceLocalWatchBusy = true;
    try { checkAvailability(true); }
    catch(e) { try { console.warn('[Race local watcher]', e); } catch(_) {} }
    finally { setTimeout(()=>{ raceLocalWatchBusy = false; }, 1500); }
  }, 2000);

  // ------------------ UI handlers ------------------
  block.querySelectorAll('input[name="raceRole"]').forEach(r=>{
    r.addEventListener('change', (e)=>{
      raceRole = normalizeRaceRole(e.target.value);
      GM_Set("race_role", raceRole);
      paint();
    });
  });

  const travelBox = block.querySelector('#raceAutoTravel');
  if (travelBox){
    travelBox.addEventListener('change', (e)=>{
      raceAutoTravel = !!e.target.checked;
      GM_Set('race_autoTravel', raceAutoTravel);
      paint();
    });
  }

  q('#raceToggle',block).addEventListener('click', ()=>{
    // Start blokkeren als je uitgelogd bent
    if (!scriptAan && isLoggedOut()){
      scriptAan = false;
      GM_Set("race_scriptAan", false);
      paint();
      console.warn('[Race] Start geweigerd: je bent uitgelogd.');
      return;
    }

    scriptAan = !scriptAan;
    GM_Set("race_scriptAan", scriptAan);
    paint();

    if (scriptAan){
      raceRegistryState('STARTING', 'module gestart');
      clearAll();
      clearRacePlan(); // echte nieuwe start = opnieuw 1x info-sync

      const $ = $jq && $jq();
      if (raceRole === 'slave' && $) {
        if (raceIsLeaderPage()) {
          raceDriverLeaveLeaderPage('Start geblokkeerd op Leider-pagina');
          return;
        }
        if (raceDriverHasRealCarStep()) {
          slave_selectCar();
          return;
        }
        const accept = $('a').filter(function(){ return /(Accepteer|Accept)/i.test($(this).text()); });
        if (accept.length) {
          accept[0].click();
          next(slave_selectCar, randomDelay(1500,4000));
          return;
        }
      }

      bootstrapRaceIdle();
    } else {
      raceRegistryState('OFF', 'module gestopt');
      clearAll();
      clearRacePlan();
    }
  });

  // init
  paint();
  if (scriptAan){
    // Bij een harde refresh zijn Omerta GUI/jQuery soms nog een fractie te vroeg.
    // Hervat daarom vertraagd en laat een tijdelijke initfout nooit de opgeslagen
    // Race-schakelaar uitschakelen.
    setTimeout(()=>{
      if (!scriptAan) return;
      try {
        if (isLoggedOut()){
          pauseForGate('Uitgelogd/Cloudflare bij init');
        } else {
          // bij reload: bestaand plan hervatten, anders 1x info-sync
          bootstrapRaceIdle();
        }
      } catch (raceResumeError) {
        try {
          console.warn('[Race refresh resume] tijdelijke initialisatiefout; Race blijft actief', raceResumeError);
          raceRegistryState('WAIT_RETRY', 'refresh-init wordt opnieuw geprobeerd');
          const st = block?.querySelector('#raceStatus');
          if (st) st.innerHTML = '<span class="warn">Actief - hervatten...</span>';
        } catch (_) {}
        setTimeout(()=>{
          if (!scriptAan || isLoggedOut()) return;
          try { bootstrapRaceIdle(); }
          catch (retryError) { try { console.warn('[Race refresh retry]', retryError); } catch (_) {} }
        }, 2500);
      }
    }, 750);
  }



  // ---- Master hook (direct start/stop zonder refresh) ----
  unsafeWindow.cc_api = unsafeWindow.cc_api || {};
  unsafeWindow.cc_api.raceSet = function(on, why='master'){
    on = !!on;

    // Als uitgelogd: start weigeren
    if (on && isLoggedOut()){
      scriptAan = false;
      GM_Set("race_scriptAan", false);
      paint();
      console.warn('[Race] Master start geweigerd: uitgelogd.');
      return;
    }

    if (on){
      if (scriptAan) return; // al aan

      scriptAan = true;
      GM_Set("race_scriptAan", true);
      paint();

      clearAll();
      clearRacePlan(); // master start = opnieuw 1x info-sync

      const $ = $jq && $jq();
      if (raceRole === 'slave' && $) {
        if ($('#game_container:contains("Select our car for the race")').length) {
          slave_selectCar();
          return;
        }
        const accept = $('a').filter(function(){ return /(Accepteer|Accept)/i.test($(this).text()); });
        if (accept.length) {
          accept[0].click();
          next(slave_selectCar, randomDelay(1500,4000));
          return;
        }
      }

      bootstrapRaceIdle();
    } else {
      if (!scriptAan) return; // al uit
      clearAll();
      clearRacePlan();
      scriptAan = false;
      GM_Set("race_scriptAan", false);
      paint();
    }
  };

  // eventueel extern stopbaar houden
  unsafeWindow.cc_api.raceStopLocal = function(reason='local'){
    stopRaceScript(reason);
  };

})()
} catch (raceBootError) {
  try { console.error("[MRB Race boot] Race kon niet direct initialiseren; opgeslagen Race-status blijft behouden.", raceBootError); } catch (_) {}
  try {
    // Een tijdelijke fout tijdens een refresh mag de persistente gebruikerskeuze
    // nooit overschrijven. Bij de volgende paginalaad wordt Race opnieuw gestart.
    const raceWasEnabled = !!GM_Get("race_scriptAan", false);
    const raceBlock = document.querySelector("#mrbGoldMenu .gm-block[data-id=\"01-race\"]");
    const st = raceBlock?.querySelector("#raceStatus");
    if (st) st.innerHTML = raceWasEnabled
      ? "<span class=\"warn\">Actief - initialisatie opnieuw bij volgende laadbeurt</span>"
      : "<span class=\"bad\">Race niet actief</span>";
  } catch (_) {}
}
;
// SPRINT 5.6.0 - HEIST COM ARCHITECTURE CLEAN REBUILD
// SPRINT 5.8.2 — uitsluitend Heist UI-normalisatie.
// De dubbele lege statusbadge is verwijderd en de bestaande toggle gebruikt nu
// de normale MRB Gold knop/statusklassen. De Heist-flow blijft ongewijzigd.
// Eén zelfstandige Heist-module met één timer. Geen gedeelde FSM, jobs,
// scheduler-adapters of patchlagen. Gebaseerd op de bewezen COM-opbouw.
// =====================================================================
(function MRBHeistComArchitectureNL(){
  'use strict';

  const K_ON='mrb_heist_integrated_enabled';
  const K_ROLE='mrb_heist_integrated_role';
  const K_STATUS='mrb_heist_integrated_status';
  const K_CITIES='mrb_heist_p1_leader_cities';
  const K_DRIVER='race_partner_name';
  const K_MIG='mrb_heist_560_com_clean_done';
  const K_INVITE_PENDING='mrb_heist_5812_invite_pending';
  const CITIES=['Detroit','Chicago','New York','Las Vegas','Philadelphia','Baltimore','Corleone','Palermo'];
  const CITY_ID={Detroit:0,Chicago:1,Palermo:2,'New York':3,'Las Vegas':4,Philadelphia:5,Baltimore:6,Corleone:7};
  const get=(k,d)=>{try{return GM_getValue(k,d);}catch(_){return d;}};
  const set=(k,v)=>{try{GM_setValue(k,v);}catch(_){}};
  const del=k=>{try{GM_deleteValue(k);}catch(_){try{GM_setValue(k,undefined);}catch(__){}}};
  const norm=v=>String(v||'').replace(/\s+/g,' ').trim();
  const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const enabled=()=>get(K_ON,false)===true;
  const role=()=>String(get(K_ROLE,'leader')).toLowerCase()==='driver'?'driver':'leader';
  const driverName=()=>norm(get(K_DRIVER,'Invullen'))||'Invullen';
  const status=s=>set(K_STATUS,s);
  const invitePending=()=>get(K_INVITE_PENDING,false)===true;
  const setInvitePending=v=>set(K_INVITE_PENDING,v===true);
  const sessionAllowsHeist=()=>unsafeWindow.mrbHeistSessionBatch?.managed?.()!==true||unsafeWindow.mrbHeistSessionBatch?.allows?.('heist')===true;

  if(get(K_MIG,false)!==true){
    [
      'mrb_heist_p6_leader_state','mrb_heist_p6_leader_target','mrb_heist_p6_leader_travel_started',
      'mrb_heist_p6_invite_clicked_at','mrb_heist_p6_invite_signature','mrb_heist_p6_invite_confirmed',
      'mrb_heist_p6_heist_start_clicked_at','mrb_heist_p6_heist_start_signature','mrb_heist_p6_last_ready_refresh',
      'mrb_heist_p67_profit_clicked_at','mrb_heist_p67_profit_signature','mrb_heist_p67_profit_confirm_clicked',
      'mrb_heist_p67_result_check_at','mrb_heist_driver_state','mrb_heist_driver_job',
      'mrb_heist_driver_accept_clicked','mrb_heist_driver_ready_clicked','mrb_heist_driver_last_navigation',
      'mrb_heist_p5_driver_job','mrb_heist_p5_driver_state','mrb_heist_p5_accept_clicked',
      'mrb_heist_p5_ready_clicked','mrb_heist_p5_ready_clicked_at','mrb_heist_p5_ready_before'
    ].forEach(del);
    set(K_MIG,true);
  }

  let loopTimer=null;
  let phase='idle';
  let heistLastGroupNavAt=0;
  const HEIST_GROUP_RENAV_MIN_MS=10000;
  let acceptChecks=0;
  let travelTarget='';
  let lastPageLoad=0;
  const MAX_ACCEPT_CHECKS=30;

  function clearLoop(){ if(loopTimer){clearTimeout(loopTimer);loopTimer=null;} }
  function next(fn,ms){
    clearLoop();
    loopTimer=setTimeout(()=>{
      if(!enabled()) return;
      if(!sessionAllowsHeist()){
        status('Sessie Manager: Heist wacht tot Race en Spot Overval klaar zijn');
        next(fn,1000);return;
      }
      if(unsafeWindow.mrbManualControl?.isPaused?.()){
        const wait=Math.min(1000,Math.max(250,unsafeWindow.mrbManualControl.remaining?.()||1000));
        status(`Handmatige pauze · hervat over ${Math.max(1,Math.ceil((unsafeWindow.mrbManualControl.remaining?.()||0)/1000))}s`);
        next(fn,wait);return;
      }
      try{fn();}catch(e){console.warn('[MRB Heist 5.6.0]',e);status(`Fout: ${e?.message||e}`);next(goInfo,15000);}
    },Math.max(0,ms||0));
  }
  function load(path){
    if(Date.now()-lastPageLoad<900) return;
    lastPageLoad=Date.now();
    try{unsafeWindow?.omerta?.GUI?.container?.loadPage(path);}catch(_){location.href=path;}
  }
  function text(){return norm(document.body?.innerText||'');}
  function heistVisibleRoot(){return document.querySelector('#game_container, #game_container_wrapper, main')||document.body;}
  function heistVisibleText(){return norm(heistVisibleRoot()?.innerText||'');}
  function onGroup(){
    const root=heistVisibleRoot(), cls=String(root?.className||'').toLowerCase(), t=heistVisibleText();
    if(/modulegroupcrimes/.test(cls)||document.querySelector('#module_GroupCrimes,.moduleGroupCrimes'))return true;
    if(/^(?:GROEPSMISDADEN|GROUP CRIMES)\b/i.test(t))return true;
    return /module=GroupCrimes/i.test(location.href)&&!onHeist()&&!onTravel();
  }
  function onHeist(){return !!document.querySelector('#module_Heist,.moduleHeist')||/moduleheist/.test(String(heistVisibleRoot()?.className||'').toLowerCase())||/module=Heist/i.test(location.href);}
  function onTravel(){return !!document.querySelector('#module_Travel,.moduleTravel')||/moduletravel/.test(String(heistVisibleRoot()?.className||'').toLowerCase())||/module=Travel/i.test(location.href);}
  function onInfo(){
    const root=heistVisibleRoot(), cls=String(root?.className||'').toLowerCase(), t=heistVisibleText();
    // Zichtbare GroupCrimes/Heist/Travel wint altijd van een achterlopende information.php URL.
    if(onGroup()||onHeist()||onTravel())return false;
    if(/moduleinformation/.test(cls)||document.querySelector('.moduleInformation,#module_Information,#game_container.moduleInformation'))return true;
    if(/\bWachttijden\b/i.test(t)&&/Volgende\s+(?:misdaadpoging|autojatpoging|heist)/i.test(t))return true;
    return /information\.php/i.test(location.href);
  }
  function visible(el){return !!(el&&!el.disabled&&(el.offsetParent!==null||el.getClientRects?.().length));}

  function parseTimer(raw){
    const s=norm(raw);
    if(/^(Nu|Now|Ready)$/i.test(s)) return 0;
    let total=0;
    const re=/(\d+)\s*(D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)/gi;
    let m; while((m=re.exec(s))){const n=+m[1],u=m[2].toLowerCase();if(u.startsWith('d'))total+=n*864e5;else if(u.startsWith('h')||u.startsWith('u'))total+=n*36e5;else if(u.startsWith('m'))total+=n*6e4;else total+=n*1e3;}
    return total;
  }
  // 5.8.47: deze helpers moeten binnen MRBHeistComArchitectureNL leven.
  // In 5.8.46 stonden ze alleen in de aparte Sessie Manager-IIFE, waardoor
  // inspectLeaderGroup() een ReferenceError kreeg zodra Groepsmisdaden open stond.
  function readGroupHeistCooldown(){
    if(!onGroup())return '';
    const t=heistVisibleText();
    const m=t.match(/(?:Je kunt weer een heist doen in|You can do another heist in)\s*((?:(?:\d+)\s*(?:D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)\s*)+)/i);
    return norm(m?.[1]||'');
  }
  function hardStopHeistCooldown(raw,source='server'){
    const wait=parseTimer(raw);
    if(!(wait>0))return false;
    phase='cooldown';
    acceptChecks=0;
    travelTarget='';
    heistLastGroupNavAt=0;
    setInvitePending(false);
    status(`Heist cooldown (${source}): ${raw} · flow volledig gestopt`);
    load('/information.php');
    next(checkAvailability,Math.min(wait+rand(5000,15000),2147480000));
    return true;
  }

  function readHeistTimer(){
    for(const row of document.querySelectorAll('tr')){
      const cells=[...row.querySelectorAll(':scope > th,:scope > td')];
      for(let i=0;i<cells.length;i++){
        if(!/^(Volgende\s+heist|Next\s+heist)$/i.test(norm(cells[i].textContent).replace(/[:?]+$/,''))) continue;
        return norm((cells[i+1]||cells[cells.length-1])?.textContent||'');
      }
    }
    const m=text().match(/(?:Volgende\s+heist|Next\s+heist)\s*[:?\-]?\s*(Nu|Now|Ready|(?:(?:\d+)\s*(?:D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)\s*)+)/i);
    return norm(m?.[1]||'');
  }
  function citySettings(){
    let raw=get(K_CITIES,{});
    // Oudere builds konden dezelfde instelling als JSON-tekst bewaren.
    // Normaliseer beide vormen, zodat een bestaande uitvinkkeuze niet stil
    // terugvalt naar "alle steden toegestaan".
    if(typeof raw==='string'){
      try{raw=JSON.parse(raw)||{};}catch(_){raw={};}
    }
    const out={};
    for(const c of CITIES)out[c]=!(raw&&raw[c]===false);
    return out;
  }
  function currentCity(){
    const top=norm(document.querySelector('.top-city-text a,.top-city-text,#cityName,.cityName')?.textContent||'');
    const c=CITIES.find(x=>new RegExp(`\\b${x.replace(' ','\\s+')}\\b`,'i').test(top));
    if(c)return c;
    const bg=[document.body?.style?.backgroundImage||'',getComputedStyle(document.body||document.documentElement).backgroundImage||''].join(' ');
    const m=bg.match(/backgrounds\/(detroit|chicago|newyork|lasvegas|philadelphia|baltimore|corleone|palermo)\.jpg/i);
    return m?({detroit:'Detroit',chicago:'Chicago',newyork:'New York',lasvegas:'Las Vegas',philadelphia:'Philadelphia',baltimore:'Baltimore',corleone:'Corleone',palermo:'Palermo'})[m[1].toLowerCase()]:'Onbekend';
  }
  function availableCities(){
    const t=text();
    const m=t.match(/(?:You might want to try your luck in|Je kunt je geluk proberen in)\s*[:\-]?\s*([^|]+?)(?=(?:Georganiseerde Misdaad|Mega OC|Overval een zaak|$))/i);
    let arr=CITIES.filter(c=>m&&new RegExp(`\\b${c.replace(' ','\\s+')}\\b`,'i').test(m[1]));
    if(!arr.length){
      const blocked=[];
      if(/shouldn['’]t plan another heist in this town|mag geen heist doen in deze stad/i.test(t)&&currentCity()!=='Onbekend')blocked.push(currentCity());
      arr=CITIES.filter(c=>!blocked.includes(c));
    }
    const allowed=citySettings();
    return arr.filter(c=>allowed[c]);
  }

  function setInput(el,value){
    if(!el)return false;
    const d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');
    try{d?.set?d.set.call(el,String(value)):el.value=String(value);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return String(el.value)===String(value);}catch(_){return false;}
  }
  function selectTommy(sel){
    if(!sel)return false;
    const opt=[...sel.options].find(o=>/tommy\s*gun/i.test(norm(o.textContent))&&/36\s*[.,]?\s*000/i.test(norm(o.textContent))&&!/nep|fake/i.test(norm(o.textContent)));
    if(!opt)return false;sel.value=opt.value;sel.dispatchEvent(new Event('change',{bubbles:true}));return String(sel.value)===String(opt.value);
  }
  function groupLeadLink(){
    return [...document.querySelectorAll('a')].find(a=>{
      const label=norm(a.textContent||'');
      const href=a.getAttribute('href')||'';
      const all=`${label} ${href}`;
      if(/annuleer|cancel|verwijder|remove|kick|wijs af|decline|reject/i.test(all)) return false;
      return /^(?:Lead a Heist|Leid een heist)$/i.test(label)||/module=Heist(?:&|&amp;)action=(?:lead|create|new)?(?:&|$)/i.test(href);
    });
  }
  function driverInviteCity(){
    const t=text();
    // Betrouwbaarste bron: de echte Travel-link van de Heistmelding, zoals
    // /?module=Travel&action=FetchInfo&CityId=0 voor Detroit.
    const travelLink=[...document.querySelectorAll('a[href*="module=Travel" i][href*="CityId=" i]')]
      .find(a=>!/annuleer|cancel/i.test(norm(a.textContent||'')));
    if(travelLink){
      try{
        const url=new URL(travelLink.getAttribute('href')||'',location.href);
        const id=Number(url.searchParams.get('CityId'));
        const byId=Object.entries(CITY_ID).find(([,cityId])=>cityId===id)?.[0];
        if(byId)return byId;
      }catch(_){}
    }
    const patterns=[
      /(?:reis|travel)\s+(?:naar|to)\s+(Detroit|Chicago|New York|Las Vegas|Philadelphia|Baltimore|Corleone|Palermo)/i,
      /(?:overval|heist)\s+plaatsvindt[^.]*?(?:in|te)\s+(Detroit|Chicago|New York|Las Vegas|Philadelphia|Baltimore|Corleone|Palermo)/i,
      /(?:stad|city)\s*[:\-]?\s*(Detroit|Chicago|New York|Las Vegas|Philadelphia|Baltimore|Corleone|Palermo)/i
    ];
    for(const re of patterns){const m=t.match(re);if(m)return CITIES.find(c=>c.toLowerCase()===m[1].toLowerCase())||m[1];}
    const cityLink=[...document.querySelectorAll('a')].find(a=>CITIES.some(c=>new RegExp(`^${c.replace(' ','\\s+')}$`,'i').test(norm(a.textContent)))&&!/annuleer|cancel/i.test(norm(a.textContent)));
    return cityLink?CITIES.find(c=>new RegExp(`^${c.replace(' ','\\s+')}$`,'i').test(norm(cityLink.textContent)))||'':'';
  }
  function driverMustTravelTo(inviteCity){
    if(!inviteCity)return false;
    const cur=currentCity();
    if(cur!=='Onbekend')return cur!==inviteCity;
    return /niet\s+in\s+de\s+stad.*(?:reis\s+naar)|not\s+in\s+the\s+(?:right\s+)?city.*(?:travel\s+to)|reis\s+naar|travel\s+to/i.test(text());
  }
  function acceptLink(){return [...document.querySelectorAll('a[href*="module=Heist"],button,input[type="submit"],input[type="button"]')].find(a=>/^(Accept|Accepteer)(?:\s+(?:invitation|uitnodiging))?$/i.test(norm(a.textContent||a.value)));}
  function finalStart(){return [...document.querySelectorAll('input[type="submit"],button')].find(b=>/^(Start Heist|Start overval)$/i.test(norm(b.value||b.textContent)));}
  function transferLink(){return [...document.querySelectorAll('a[href^="javascript:MakeTransfer("],a[onclick*="MakeTransfer"]')].find(a=>/Make Transfer|Verstuur|Transfer/i.test(norm(a.textContent))||/MakeTransfer/i.test((a.getAttribute('href')||'')+(a.getAttribute('onclick')||'')));}

  function goInfo(){
    if(!enabled())return;
    if(heistRaceOwnPriority()){
      status('Heisttimer wacht: actieve of geplande Race wordt eerst volledig afgerond');
      next(goInfo,3000);
      return;
    }
    phase='idle';
    status('Heist: Mijn Account controleren');
    load('/information.php');
    next(()=>{
      checkAvailability();
      // Heist heeft zijn eigen timer hierboven eerst gelezen. Daarna worden
      // verlopen Crimes/Cars direct uitgevoerd en wordt Race meteen gewekt.
      setTimeout(()=>unsafeWindow.mrbResumePriorityTimers?.('heist'),100);
    },rand(1400,2600));
  }
  function checkAvailability(){
    if(!enabled())return;
    if(heistRaceOwnPriority()){
      status('Heistcontrole wacht: Race heeft voorrang');
      next(checkAvailability,3000);
      return;
    }
    if(!onInfo()){goInfo();return;}
    const raw=readHeistTimer();
    if(!raw){status('Heisttimer niet gevonden; over 15 sec opnieuw');next(checkAvailability,15000);return;}
    const wait=parseTimer(raw);
    if(wait>0){setInvitePending(false);status(`Heist cooldown: ${raw}`);next(goInfo,wait+rand(5000,15000));return;}
    if(!/^(Nu|Now|Ready)$/i.test(raw)){status(`Heiststatus: ${raw}`);next(checkAvailability,10000);return;}
    if(role()==='leader'){status('Heist Nu · Leider start over enkele seconden');next(leaderStart,rand(4000,10000));}
    else{status('Heist Nu · Driver zoekt uitnodiging');next(driverStart,rand(8000,14000));}
  }

  function heistCrimesCarsOwnPriority(){
    try {
      const st=unsafeWindow.mrbV9CrimesCars?.state?.();
      if(!st?.running)return false;
      const now=Date.now();
      return !!st.busy||!!st.confirmPendingKind||!!st.forcedRetryKind
        ||(!!st.doCrimes&&Number(st.crimesNext||0)<=now+1500)
        ||(!!st.doCars&&Number(st.carsNext||0)<=now+1500);
    }catch(_){return false;}
  }
  function readRaceTimerForHeist(){
    if(!onInfo()) return '';
    for(const row of document.querySelectorAll('tr')){
      const cells=[...row.querySelectorAll(':scope > th,:scope > td')];
      if(cells.length<2) continue;
      const label=norm(cells[0]?.textContent||'').replace(/[:?]+$/,'');
      if(!/^(?:Volgende\s+.*race.*|Next\s+.*race.*)$/i.test(label)) continue;
      return norm(cells[1]?.textContent||cells[cells.length-1]?.textContent||'');
    }
    return '';
  }
  function releaseStaleRaceBeforeHeist(){
    const raw=readRaceTimerForHeist();
    if(!raw || /^(Nu|Now|Ready)$/i.test(raw)) return false;
    const wait=parseTimer(raw);
    if(!(wait>0)) return false;

    // De server bevestigt dat Race al klaar/cooldown is. Een in-memory
    // WAITING_DRIVER/RUNNING of achtergebleven startplan is dan per definitie stale.
    try{unsafeWindow.mrbRaceTransaction?.release?.();}catch(_){}
    try{
      const saved=get('race_idlePlan_v1','');
      const plan=typeof saved==='string'&&saved?JSON.parse(saved):saved;
      if(plan?.type==='start') set('race_idlePlan_v1','');
    }catch(_){set('race_idlePlan_v1','');}
    try{
      const race=unsafeWindow.mrbModuleStateRegistry?.get?.('race');
      const phase=String(race?.phase||race?.state||'').toUpperCase();
      if(/^(?:STARTING|LEADER_OPEN|LEADER_INVITE|WAITING_DRIVER|RUNNING|DRIVER_OPEN|DRIVER_ACCEPT|DRIVER_CAR|WAIT_CRIMES_CARS)$/.test(phase)){
        unsafeWindow.mrbModuleStateRegistry?.set?.('Race',{phase:'IDLE',state:'IDLE',detail:`servercooldown bevestigd: ${raw}`,updatedAt:Date.now(),running:!!get('race_scriptAan',false)});
      }
    }catch(_){}
    return true;
  }
  function heistRaceOwnPriority(){
    try{
      // 5.8.46: serverstatus wint van oude JavaScript-state. Dit is hetzelfde
      // herstel dat een handmatige browserrefresh eerder toevallig veroorzaakte.
      releaseStaleRaceBeforeHeist();
      if(unsafeWindow.mrbRaceTransaction?.active?.()===true)return true;

      // De herstelde bewezen Race-module publiceert zijn actuele fase in het
      // centrale register. Heist leest die fase alleen; Race zelf blijft exact
      // gelijk aan de werkende versie van vóór Sprint 5.8.13.
      const race=unsafeWindow.mrbModuleStateRegistry?.get?.('race');
      const phase=String(race?.phase||race?.state||'').toUpperCase();
      if(/^(?:STARTING|LEADER_OPEN|LEADER_INVITE|WAITING_DRIVER|STARTING|RUNNING|DRIVER_OPEN|DRIVER_ACCEPT|DRIVER_CAR|WAIT_CRIMES_CARS)$/.test(phase))return true;

      // Ook de 3-30 seconden startspreiding is Race-tijd. Zonder deze check
      // kon Heist Mijn Account openen nadat Race al op Nu was gepland, maar
      // voordat Leider of Driver de Race-pagina had geopend.
      const raw=get('race_idlePlan_v1','');
      const plan=typeof raw==='string'&&raw?JSON.parse(raw):raw;
      return !!(get('race_scriptAan',false)&&plan?.type==='start'&&Number(plan.at||0)>Date.now()-5000&&Number(plan.at||0)<Date.now()+60000);
    }catch(_){return false;}
  }
  function waitForRaceBefore(fn,context='Heist-actie'){
    if(!heistRaceOwnPriority())return false;
    let detail='actieve Race wordt eerst afgemaakt';
    try{
      const phase=unsafeWindow.mrbRaceTransaction?.phase?.();
      if(phase)detail+=` (${phase})`;
    }catch(_){}
    status(`${context} wacht: ${detail}`);
    next(fn,3000);
    return true;
  }
  function leaderStart(){
    if(heistCrimesCarsOwnPriority()){status('Heist wacht: Crimes/Cars heeft voorrang');next(leaderStart,5000);return;}
    if(waitForRaceBefore(leaderStart,'Heist Leider'))return;
    // 5.8.41: een eerder geplande start mag nooit blind GroupCrimes openen.
    // Op Mijn Account is de actuele server-timer opnieuw de bron van waarheid.
    if(onInfo()){
      const raw=readHeistTimer();
      if(raw){
        const wait=parseTimer(raw);
        if(wait>0){setInvitePending(false);phase='cooldown';status(`Heist start geannuleerd · cooldown: ${raw}`);next(goInfo,wait+rand(5000,15000));return;}
        if(!/^(Nu|Now|Ready)$/i.test(raw)){status(`Heist start wacht op geldige timerstatus: ${raw}`);next(goInfo,10000);return;}
      }
    }
    phase='inviting';acceptChecks=0;load('/?module=GroupCrimes');next(()=>inspectLeaderGroup(true),rand(1500,3000));
  }
  function inspectLeaderGroup(initial=false){
    if(!enabled()||role()!=='leader')return;
    if(heistCrimesCarsOwnPriority()){status('Heist Leider-controle wacht: Crimes/Cars rondt eerst af');next(()=>inspectLeaderGroup(initial),3000);return;}
    if(waitForRaceBefore(()=>inspectLeaderGroup(initial),'Heist Leider-controle'))return;
    // 5.8.41: GroupCrimes zelf kan al aantonen dat de vorige Heist is afgerond.
    // Stop dan onmiddellijk de stale Leider-flow voordat enige hernavigatie plaatsvindt.
    if(onGroup()){
      const cooldownRaw=readGroupHeistCooldown();
      if(cooldownRaw&&hardStopHeistCooldown(cooldownRaw,'Groepsmisdaden'))return;
    }
    if(!onGroup()){
      const since=Date.now()-heistLastGroupNavAt;
      if(since>=HEIST_GROUP_RENAV_MIN_MS){
        heistLastGroupNavAt=Date.now();
        load('/?module=GroupCrimes');
        status('Heist: Groepsmisdaden éénmalig geopend; wachten op zichtbare pagina');
        next(()=>inspectLeaderGroup(initial),rand(2500,4000));
      }else{
        status(`Heist: SPA-pagina wordt nog opgebouwd; geen hernavigatie (${Math.ceil((HEIST_GROUP_RENAV_MIN_MS-since)/1000)}s)`);
        next(()=>inspectLeaderGroup(initial),Math.max(1200,HEIST_GROUP_RENAV_MIN_MS-since));
      }
      return;
    }
    heistLastGroupNavAt=0;
    const transfer=transferLink();
    if(transfer){setInvitePending(false);status(`Heist winst versturen naar ${driverName()}`);transfer.click();next(goInfo,rand(5000,10000));return;}
    const start=finalStart();
    if(start){setInvitePending(false);status('Driver gereed · Heist starten');start.click();phase='started';next(()=>inspectLeaderGroup(false),rand(5000,8000));return;}
    if(/Wanna kick him out for his lazy behaviour|wachten op.*(?:driver|bestuurder)|driver.*(?:accepted|geaccepteerd)|verwijder(?:en|d)?\s+als\s+bestuurder|remove.*driver|huidige\s+bestuurder/i.test(text())){phase='waiting';scheduleLeaderCheck();return;}
    // Controleer de Leider-stad vóórdat "Leid een heist" mag worden geopend.
    // Voorheen stond deze controle pas na groupLeadLink(), waardoor een
    // zichtbare link in een uitgevinkte huidige stad onmiddellijk werd gevolgd.
    const allowed=citySettings(),av=availableCities(),cur=currentCity();
    if(cur!=='Onbekend'&&allowed[cur]===false){
      if(!av.length){
        travelTarget='';
        status(`Heist geblokkeerd: ${cur} is uitgevinkt en er is geen toegestane beschikbare stad.`);
        next(goInfo,30000);
        return;
      }
      travelTarget=av[0];
      status(`${cur} is uitgevinkt · reizen naar toegestane stad ${travelTarget}`);
      load('/?module=Travel');
      next(travelFlow,rand(900,1600));
      return;
    }
    if(av.length&&cur!=='Onbekend'&&!av.includes(cur)){
      travelTarget=av[0];
      status(`Huidige stad ongeschikt · reizen naar ${travelTarget}`);
      load('/?module=Travel');
      next(travelFlow,rand(900,1600));
      return;
    }
    const lead=groupLeadLink();
    if(lead){status('Leid een heist openen');lead.click();next(leaderActionPage,rand(1500,3000));return;}
    if(invitePending()){
      phase='waiting';
      status('Uitnodiging loopt · over 35-40 sec opnieuw controleren');
      scheduleLeaderCheck();
      return;
    }
    if(initial){status('Geen Heistactie zichtbaar; over 30 sec opnieuw');next(goInfo,30000);return;}
    scheduleLeaderCheck();
  }
  function leaderActionPage(){
    if(!enabled()||role()!=='leader')return;
    if(!onHeist()){load('/?module=Heist&action=');next(leaderActionPage,rand(1200,2200));return;}
    const root=document.querySelector('#module_Heist,.moduleHeist,#game_container')||document;
    const driver=root.querySelector('input[name="driver"],input[name*="driver" i]');
    const bullets=root.querySelector('input[name*="bullet" i],input[name*="kogel" i],input[name*="ammo" i]');
    const gun=root.querySelector('select[name="gun"],select[name*="weapon" i]');
    if(driver&&norm(driver.value).toLowerCase()!==driverName().toLowerCase()){setInput(driver,driverName());return next(leaderActionPage,450);}
    if(bullets&&String(bullets.value).replace(/\D/g,'')!=='50'){setInput(bullets,'50');return next(leaderActionPage,450);}
    if(gun&&!/tommy\s*gun/i.test(norm(gun.selectedOptions?.[0]?.textContent))){selectTommy(gun);return next(leaderActionPage,450);}
    const btn=[...root.querySelectorAll('input[type="submit"],button')].find(b=>/^Start$/i.test(norm(b.value||b.textContent)));
    if(btn&&driver&&bullets&&gun){status(`Heist uitnodiging versturen aan ${driverName()}`);setInvitePending(true);btn.click();phase='waiting';acceptChecks=0;next(()=>inspectLeaderGroup(false),rand(35000,40000));return;}
    status('Heistformulier wordt opgebouwd');next(leaderActionPage,1500);
  }
  function scheduleLeaderCheck(){
    acceptChecks++;
    if(acceptChecks>=MAX_ACCEPT_CHECKS){setInvitePending(false);status('Driver niet gereed na 30 controles; terug naar Mijn Account');next(goInfo,3000);return;}
    const delay=rand(35000,40000);
    status(`Wachten op Driver · controle ${acceptChecks}/${MAX_ACCEPT_CHECKS} over 35-40 sec · overige timers vrij`);
    // Tussen controles staat de Leider op Mijn Account. Daardoor kunnen Crimes, Cars,
    // Race en andere actieve modules hun eigen timers blijven lezen en uitvoeren.
    load('/information.php');
    next(()=>inspectLeaderGroup(false),delay);
  }

  function driverStart(){
    if(heistCrimesCarsOwnPriority()){status('Heist Driver wacht: Crimes/Cars heeft voorrang');next(driverStart,5000);return;}
    if(waitForRaceBefore(driverStart,'Heist Driver'))return;
    phase='driver';load('/?module=GroupCrimes');next(driverAcceptLoop,rand(1500,3000));
  }
  function driverAcceptLoop(){
    if(!enabled()||role()!=='driver')return;
    if(heistCrimesCarsOwnPriority()){status('Heist-uitnodiging wacht: Crimes/Cars rondt eerst af');next(driverAcceptLoop,3000);return;}
    if(waitForRaceBefore(driverAcceptLoop,'Heist-uitnodiging'))return;
    if(onHeist()){driverFinalize();return;}
    if(!onGroup()){load('/?module=GroupCrimes');next(driverAcceptLoop,rand(1500,3000));return;}
    const inviteCity=driverInviteCity();
    const cur=currentCity();
    if(driverMustTravelTo(inviteCity)){
      travelTarget=inviteCity;
      status(`Uitnodiging is in ${inviteCity} · Driver reist vanaf ${cur}`);
      load('/?module=Travel');
      next(travelFlow,rand(900,1600));
      return;
    }
    const acc=acceptLink();
    if(acc){status('Heist-uitnodiging accepteren');acc.click();next(driverFinalize,rand(1500,4000));return;}
    // 5.8.48: zonder echte uitnodiging blijft de Driver niet op Groepsmisdaden hangen.
    // Eén controle is genoeg; daarna terug naar Mijn Account en pas later opnieuw kijken.
    status('Geen Heist-uitnodiging zichtbaar · terug naar Mijn Account en later opnieuw controleren');
    load('/information.php');
    next(driverStart,rand(15000,30000));
  }
  function driverFinalize(){
    if(!enabled()||role()!=='driver')return;
    if(heistCrimesCarsOwnPriority()){status('Heist Driver-auto/reis wacht: Crimes/Cars rondt eerst af');next(driverFinalize,3000);return;}
    if(waitForRaceBefore(driverFinalize,'Heist Driver-auto/reis'))return;
    if(!onHeist()){load('/?module=Heist&action=');next(driverFinalize,rand(1200,2400));return;}

    // De 'je bent niet in de stad'-melding is zelf al een moduleHeist-pagina.
    // Controleer daarom vóór het zoeken naar een auto altijd eerst de Travel-link.
    const inviteCity=driverInviteCity();
    if(driverMustTravelTo(inviteCity)){
      const cur=currentCity();
      travelTarget=inviteCity;
      status(`Heist is in ${inviteCity} · Driver reist vanaf ${cur}`);
      load('/?module=Travel');
      next(travelFlow,rand(900,1600));
      return;
    }

    const root=document.querySelector('#module_Heist,.moduleHeist,#game_container')||document;
    const select=root.querySelector('select[name*="car" i],select[name*="auto" i],select');
    if(select){
      const opt=[...select.options].find(o=>!o.disabled&&!/^(?:|0|-1|-)$/.test(norm(o.value))&&!/kies|choose|select|geen auto|no car/i.test(norm(o.textContent)));
      if(opt&&String(select.value)!==String(opt.value)){select.value=opt.value;select.dispatchEvent(new Event('change',{bubbles:true}));return next(driverFinalize,450);}
    }
    const ready=[...root.querySelectorAll('input[type="submit"],button')].find(b=>/^(Ready|Klaar|Gereed)$/i.test(norm(b.value||b.textContent)));
    if(ready){status('Auto gekozen · Klaar bevestigen');ready.click();next(goInfo,rand(18000,30000));return;}
    if(/wacht.*leider|wait.*leader|you are ready|je bent klaar/i.test(text())){status('Driver staat klaar · wachten op Leider');next(goInfo,rand(10000,20000));return;}
    status('Driver-autoformulier wordt opgebouwd');next(driverFinalize,3000);
  }

  function travelFlow(){
    if(!enabled()||!travelTarget)return;
    if(heistCrimesCarsOwnPriority()){status('Heist-reis wacht: Crimes/Cars rondt eerst af');next(travelFlow,3000);return;}
    if(waitForRaceBefore(travelFlow,'Heist-reis'))return;
    if(role()==='leader'){
      const allowed=citySettings();
      if(allowed[travelTarget]!==true){
        const rejected=travelTarget;
        travelTarget='';
        status(`Reis geannuleerd: ${rejected} is inmiddels uitgevinkt.`);
        next(goInfo,500);
        return;
      }
    }
    if(!onTravel()){load('/?module=Travel');next(travelFlow,1000);return;}
    if(currentCity()===travelTarget){const arrived=travelTarget;travelTarget='';status(`Aangekomen in ${arrived}`);if(role()==='leader')leaderStart();else driverStart();return;}
    const confirm=document.querySelector('button[name="jqi_state0_buttonTravel"],.jqi button[name*="buttonTravel"]');
    if(confirm){confirm.click();next(()=>{if(role()==='leader')leaderStart();else driverStart();},rand(1800,3200));return;}
    const id=CITY_ID[travelTarget];
    try{if(typeof unsafeWindow.onTravelData==='function'){unsafeWindow.onTravelData(id);next(travelFlow,700);return;}}catch(_){}
    const a=document.querySelector(`a[onclick^="onTravelData(${id})"]`);
    if(a){a.click();next(travelFlow,700);return;}
    status(`Reis naar ${travelTarget} kon niet worden geopend`);next(goInfo,15000);
  }

  function syncMenu(){
    const old=document.getElementById('mrb-heist-integrated-block');
    if(old) old.remove();
    const root=document.querySelector('#mrbGoldMenu .gm-blocks');
    if(!root){setTimeout(syncMenu,500);return;}
    const block=document.createElement('div');block.className='gm-block';block.dataset.id='02-heist-rebuild';block.id='mrb-heist-integrated-block';
    const cs=citySettings();
    block.innerHTML=`<div class="gm-block-header"><div class="gm-block-title">Heist</div><div class="gm-block-tools"><button class="gm-min">↧</button></div></div><div class="gm-block-body"><div class="gm-row" style="align-items:center;gap:8px"><button data-heist-toggle class="gm-btn">Start</button><div data-heist-state class="gm-status" style="margin:0">Uit</div></div><div style="margin-top:6px"><label><input type="radio" name="mrb-heist-role" value="leader"> Leider</label> <label><input type="radio" name="mrb-heist-role" value="driver"> Driver</label></div><div style="margin-top:6px;font-size:11px"><b>Driver:</b> <span data-heist-driver>-</span></div><div data-heist-status style="margin-top:5px;font-size:11px;color:#d8c98f">Gestopt</div><div data-heist-cities-wrap style="margin-top:7px;border-top:1px solid rgba(255,214,102,.16);padding-top:6px"><b style="font-size:11px">Leider: steden gebruiken</b><div style="margin-top:3px">${CITIES.map(c=>`<label style="display:inline-flex;align-items:center;gap:4px;width:47%;margin:2px 0"><input type="checkbox" data-heist-city="${c}" ${cs[c]?'checked':''}> ${c}</label>`).join('')}</div></div></div>`;
    root.appendChild(block);
    const render=()=>{const on=enabled(),r=role();block.querySelector('[data-heist-toggle]').textContent=on?'Stop':'Start';block.querySelector('[data-heist-state]').textContent=on?`Actief · ${r==='leader'?'Leider':'Driver'}`:'Uit';block.querySelector('[data-heist-driver]').textContent=driverName();block.querySelector('[data-heist-status]').textContent=on?String(get(K_STATUS,'Wachten op controle')):'Gestopt';block.querySelector('[data-heist-cities-wrap]').style.display=r==='leader'?'block':'none';block.classList.toggle('gm-block-active',on);block.querySelectorAll('input[name="mrb-heist-role"]').forEach(x=>x.checked=x.value===r);};
    block.querySelector('.gm-min').onclick=()=>block.classList.toggle('gm-collapsed');
    function setEnabled(on){
      on=on===true;
      if(enabled()===on){render();return;}
      set(K_ON,on);clearLoop();phase='idle';acceptChecks=0;if(!on)setInvitePending(false);status(on?'Heist gestart':'Gestopt');render();if(on&&sessionAllowsHeist())next(goInfo,300);
    }
    unsafeWindow.mrbHeistSessionSetEnabled=setEnabled;
    block.querySelector('[data-heist-toggle]').onclick=()=>setEnabled(!enabled());
    block.querySelectorAll('input[name="mrb-heist-role"]').forEach(x=>x.onchange=()=>{if(x.checked){set(K_ROLE,x.value);clearLoop();phase='idle';status(`Rol: ${x.value==='leader'?'Leider':'Driver'}`);render();if(enabled())next(goInfo,300);}});
    block.querySelectorAll('input[data-heist-city]').forEach(x=>x.onchange=()=>{
      const city=x.dataset.heistCity;
      const s=citySettings();
      s[city]=x.checked;
      set(K_CITIES,s);
      if(!x.checked&&role()==='leader'&&travelTarget===city){
        travelTarget='';
        status(`Reisdoel ${city} gewist omdat de stad is uitgevinkt.`);
        clearLoop();
        if(enabled())next(goInfo,300);
      }
      render();
    });
    render();setInterval(render,1000);
    try{window.__mrbAddManualOrderButtons?.(block);window.__mrbRefreshCategories?.();setTimeout(()=>window.__mrbRefreshCategories?.(),250);}catch(_){}
  }

  syncMenu();
  unsafeWindow.mrbHeistCoreControl=Object.freeze({
    setEnabled:on=>unsafeWindow.mrbHeistSessionSetEnabled?.(on===true),
    wake:()=>{if(enabled()&&sessionAllowsHeist()){clearLoop();next(goInfo,150);}},
    getState:()=>({enabled:enabled(),role:role(),phase,status:String(get(K_STATUS,'')||'')})
  });
  if(enabled()) next(goInfo,600);
})();
})();


(function MRBHeistNightManager(){
  'use strict';

  const K={
    on:'mrb_night_manager_on_v1',
    user:'mrb_night_manager_username_v1',
    pass:'mrb_night_manager_password_v1',
    driver:'mrb_night_manager_driver_name_v1',
    role:'mrb_night_manager_role_v2',
    loginAt:'mrb_night_manager_login_at_v1',
    readyAt:'mrb_night_manager_ready_at_v1',
    state:'mrb_night_manager_state_v1',
    lastLogin:'mrb_night_manager_last_login_try_v1',
    lastLogout:'mrb_night_manager_last_logout_try_v1',
    lead:'mrb_night_manager_lead_minutes_v1',
    jitterMin:'mrb_night_manager_jitter_min_sec_v1',
    jitterMax:'mrb_night_manager_jitter_max_sec_v1',
    jitterPick:'mrb_night_manager_jitter_pick_sec_v1',
    batchActive:'mrb_night_manager_batch_active_v1',
    batchPhase:'mrb_night_manager_batch_phase_v1',
    batchStarted:'mrb_night_manager_batch_started_v1',
    doRace:'mrb_night_manager_do_race_v1',
    doSpot:'mrb_night_manager_do_spot_v1',
    doHeist:'mrb_night_manager_do_heist_v1'
  };
  const CHECK_MS=5000;
  const MIN_LOGOUT_REMAINING=15*60*1000;
  const FALLBACK_SESSION_MS=3*60*60*1000;
  const MANAGER_CITIES=['Detroit','Chicago','New York','Las Vegas','Philadelphia','Baltimore','Corleone','Palermo'];
  const HEIST_CITY_KEY='mrb_heist_p1_leader_cities';
  const get=(k,d)=>{try{return GM_getValue(k,d);}catch(_){return d;}};
  const set=(k,v)=>{try{GM_setValue(k,v);}catch(_){}};
  const norm=v=>String(v||'').replace(/\s+/g,' ').trim();
  const on=()=>get(K.on,false)===true;
  const batchActive=()=>on()&&get(K.batchActive,false)===true;
  const batchPhase=()=>String(get(K.batchPhase,'race')||'race');
  const selected=name=>name==='race'?get(K.doRace,true)===true:name==='spot'?get(K.doSpot,true)===true:get(K.doHeist,true)===true;
  const selectedList=()=>['race','spot','heist'].filter(selected);
  const driverName=()=>norm(get(K.driver,''));
  const managerRole=()=>String(get(K.role,'leader')||'leader').toLowerCase()==='driver'?'driver':'leader';
  function managerCitySettings(){
    let raw=get(HEIST_CITY_KEY,{});
    if(typeof raw==='string'){try{raw=JSON.parse(raw)||{};}catch(_){raw={};}}
    const out={};
    for(const city of MANAGER_CITIES) out[city]=!(raw&&raw[city]===false);
    return out;
  }
  function selectedManagerCities(){const c=managerCitySettings();return MANAGER_CITIES.filter(city=>c[city]);}
  function syncCitySettingsFromPanel(){
    if(!panel?.isConnected)return managerCitySettings();
    const next={};
    panel.querySelectorAll('[data-heist-city]').forEach(x=>{next[x.dataset.heistCity]=!!x.checked;});
    if(Object.keys(next).length) set(HEIST_CITY_KEY,next);
    return Object.keys(next).length?next:managerCitySettings();
  }

  let panel=null;

  const state=(v)=>{
    if(v!==undefined){
      const next=String(v), prev=String(get(K.state,'Uit')||'Uit');
      set(K.state,next);
      if(next!==prev) try{console.info('[MRB Night Manager]',next);}catch(_){}
    }
    return String(get(K.state,'Uit')||'Uit');
  };

  function clearBatch(){set(K.batchActive,false);set(K.batchPhase,'');set(K.batchStarted,0);}
  function setBatchPhase(p){set(K.batchPhase,p);state(`Sessie actief · ${p==='race'?'Race':p==='spot'?'Spot Overval':'Heist'}`);}
  function nextSelected(after=''){
    const order=['race','spot','heist'];
    const start=after?order.indexOf(after)+1:0;
    for(let i=start;i<order.length;i++) if(selected(order[i])) return order[i];
    return '';
  }
  function clearLoginSchedule(){set(K.loginAt,0);set(K.readyAt,0);set(K.jitterPick,-1);}
  function jitterRange(){
    let min=Math.max(0,Math.min(59,Math.round(Number(get(K.jitterMin,5))||0)));
    let max=Math.max(0,Math.min(59,Math.round(Number(get(K.jitterMax,55))||0)));
    if(max<min)[min,max]=[max,min];
    return {min,max};
  }
  function chooseJitterSeconds(){const {min,max}=jitterRange();return min+Math.floor(Math.random()*(max-min+1));}

  const visible=el=>!!el && !el.closest('#mrb-night-manager-panel') &&
    (el.offsetWidth||el.offsetHeight||el.getClientRects().length) &&
    getComputedStyle(el).visibility!=='hidden' && getComputedStyle(el).display!=='none';

  function loggedOut(){
    // v2.1.2: het Night Manager-paneel bevat zelf een wachtwoordveld en mag
    // daarom nooit als bewijs voor een uitgelogde spelpagina worden gebruikt.
    const gameVisible=el=>visible(el) && !el.closest('#mrb-night-manager-panel');
    const password=[...document.querySelectorAll('input[type="password"]')].find(gameVisible);
    if(password) return true;
    const loginForm=[...document.querySelectorAll('form[action*="login" i],#loginModal')].find(gameVisible);
    return !!loginForm;
  }
  function gateVisible(){
    const t=norm(document.body?.innerText||'');
    return /Verifying you are human|Verify you are human|Verifieer dat u een mens bent|security of your connection|Dit kan enkele seconden duren|This may take a few seconds/i.test(t)
      || !!document.querySelector('form[action*="cdn-cgi"],script[src*="cdn-cgi/challenge-platform"],#cf-challenge-running,.cf-browser-verification,#recaptcha-popup,.g-recaptcha');
  }
  const onInfo=()=>/information\.php/i.test(String(location.href||''));

  function parseTimer(raw){
    const s=norm(raw); if(/^(Nu|Now|Ready)$/i.test(s))return 0;
    let total=0,m; const re=/(\d+)\s*(D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)/gi;
    while((m=re.exec(s))){const n=+m[1],u=m[2].toLowerCase();if(u.startsWith('d'))total+=n*864e5;else if(u.startsWith('h')||u.startsWith('u'))total+=n*36e5;else if(u.startsWith('m'))total+=n*6e4;else total+=n*1e3;}
    return total;
  }
  function readHeistTimer(){
    for(const row of document.querySelectorAll('tr')){
      const cells=[...row.querySelectorAll(':scope > th,:scope > td')];
      for(let i=0;i<cells.length;i++) if(/^(Volgende\s+heist|Next\s+heist)$/i.test(norm(cells[i].textContent).replace(/[:?]+$/,''))) return norm((cells[i+1]||cells[cells.length-1])?.textContent||'');
    }
    const m=norm(document.body?.innerText||'').match(/(?:Volgende\s+heist|Next\s+heist)\s*[:?\-]?\s*(Nu|Now|Ready|(?:(?:\d+)\s*(?:D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)\s*)+)/i);
    return norm(m?.[1]||'');
  }
  function readActivityTimer(kind){
    const label=kind==='race'?/^(?:Volgende\s+.*race.*|Next\s+.*race.*)$/i:/^(?:Volgende\s+spot\s+overval|Next\s+spot\s+(?:raid|robbery))$/i;
    for(const row of document.querySelectorAll('tr')){
      const cells=[...row.querySelectorAll(':scope > th,:scope > td')];
      for(let i=0;i<cells.length;i++) if(label.test(norm(cells[i].textContent).replace(/[:?]+$/,''))) return norm((cells[i+1]||cells[cells.length-1])?.textContent||'');
    }
    return '';
  }

  function missingSelectedStandaloneModules(){
    const missing=[];
    if(selected('race') && !unsafeWindow.cc_api?.raceSet) missing.push('Race');
    if(selected('spot') && !unsafeWindow.mrbSpotRaidCoreV3?.setEnabled) missing.push('Spot Overval');
    if(selected('heist') && !unsafeWindow.mrbHeistCoreControl?.setEnabled) missing.push('Heist');
    return missing;
  }
  function moduleReady(name){
    if(name==='race') return !!unsafeWindow.cc_api?.raceSet;
    if(name==='spot') return !!unsafeWindow.mrbSpotRaidCoreV3?.setEnabled;
    if(name==='heist') return !!unsafeWindow.mrbHeistCoreControl?.setEnabled;
    return false;
  }
  function setModuleEnabled(name,on){
    try{
      if(name==='race' && unsafeWindow.cc_api?.raceSet){unsafeWindow.cc_api.raceSet(on===true,'night-manager');return true;}
      if(name==='spot' && unsafeWindow.mrbSpotRaidCoreV3?.setEnabled){unsafeWindow.mrbSpotRaidCoreV3.setEnabled(on===true);return true;}
      if(name==='heist' && unsafeWindow.mrbHeistCoreControl?.setEnabled){unsafeWindow.mrbHeistCoreControl.setEnabled(on===true,'night-manager');return true;}
    }catch(e){console.warn(`[MRB Night Manager] Interne ${name} instellen`,e);}
    return false;
  }
  let lastWakePhase='', lastWakeAt=0;
  function wakeModule(name,force=false){
    if(!selected(name)||!moduleReady(name))return false;
    const now=Date.now();
    if(!force && lastWakePhase===name && now-lastWakeAt<12000)return true;
    lastWakePhase=name;lastWakeAt=now;
    try{
      if(name==='race'){unsafeWindow.cc_api?.raceSet?.(true,'night-manager-wake');unsafeWindow.cc_api?.raceWake?.();return true;}
      if(name==='spot'){unsafeWindow.mrbSpotRaidCoreV3?.wake?.();return true;}
      if(name==='heist'){unsafeWindow.mrbHeistCoreControl?.wake?.();return true;}
    }catch(e){console.warn(`[MRB Night Manager] ${name} wake`,e);}
    return false;
  }
  function ensureStandaloneModules(){
    if(loggedOut()) return true;
    const missing=missingSelectedStandaloneModules();
    for(const name of ['race','spot','heist']){
      if(moduleReady(name)) setModuleEnabled(name,selected(name));
    }
    if(missing.length) console.warn('[MRB Night Manager] Niet geladen, overige modules gaan wel door:',missing.join(', '));
    return true;
  }
  function nextRunnableSelected(after=''){
    const order=['race','spot','heist'];
    const start=after?order.indexOf(after)+1:0;
    for(let i=start;i<order.length;i++) if(selected(order[i])&&moduleReady(order[i])) return order[i];
    return '';
  }

  function otherGoldModuleActive(){ return ''; }
  function load(path){
    try{if(unsafeWindow.mrbNavigate?.(path,{source:'night-manager'}))return;}catch(_){}
    try{if(unsafeWindow?.omerta?.GUI?.container?.loadPage){unsafeWindow.omerta.GUI.container.loadPage(path);return;}}catch(_){}
    location.href=path;
  }
  function findLogout(){
    return document.querySelector('a[href*="logout" i],button[name*="logout" i],input[value*="Logout" i],input[value*="Uitloggen" i]')
      || [...document.querySelectorAll('a,button,input[type="button"],input[type="submit"]')].find(el=>/^(?:log\s*out|logout|uitloggen)$/i.test(norm(el.textContent||el.value||'')));
  }
  function doLogout(){
    const last=Number(get(K.lastLogout,0)||0); if(Date.now()-last<30000)return;
    set(K.lastLogout,Date.now()); state('Uitloggen tot volgende Heist');
    const el=findLogout(); if(el){el.click();return;} location.href='/logout.php';
  }
  function inputSet(el,value){
    if(!el)return false;
    try{const d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');if(d?.set)d.set.call(el,value);else el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return true;}catch(_){return false;}
  }
  function savePanelSettings(){
    const root=panel;
    const user=norm(root?.querySelector('[data-user]')?.value||'');
    const pass=String(root?.querySelector('[data-pass]')?.value||'');
    const driver=norm(root?.querySelector('[data-driver]')?.value||'');
    const role=String(root?.querySelector('[data-role]')?.value||managerRole()).toLowerCase()==='driver'?'driver':'leader';
    // Credentials worden uitsluitend via de Opslaan-knop gewijzigd.
    // Zo kan browser/password-manager autofill nooit stilletjes de login overschrijven.
    if(user)set(K.user,user);
    if(pass)set(K.pass,pass);
    if(driver)set(K.driver,driver);
    set(K.role,role);
    if(driver){ try{GM_setValue('race_partner_name',driver);}catch(_){} }
    try{GM_setValue('race_role',role==='driver'?'slave':'leader');}catch(_){}
    try{GM_setValue('race_autoTravel',role==='driver');}catch(_){}
    try{GM_setValue('mrb_spot_complete_v1_role',role);}catch(_){}
    try{GM_setValue('mrb_heist_integrated_role',role);}catch(_){}
    return {user,pass,driver,role};
  }

  function doLogin(){
    if(gateVisible()){state('Gepauzeerd: captcha/Cloudflare');return;}
    const user=norm(get(K.user,''));
    const pass=String(get(K.pass,'')||'');
    if(!user||!pass){state('Login ontbreekt: vul gebruikersnaam en wachtwoord in en klik Opslaan');return;}
    const last=Number(get(K.lastLogin,0)||0); if(Date.now()-last<60000){state('Wachten na loginpoging');return;}
    const gameVisible=el=>visible(el) && !el.closest('#mrb-night-manager-panel');
    const p=[...document.querySelectorAll('input[type="password"]')].find(gameVisible); const form=p?.closest('form')||null;
    const u=[...(form||document).querySelectorAll('input[name="username" i],input[name="user" i],input[name="login" i],input[type="email"],input[type="text"]')].find(gameVisible);
    if(!u||!p){
      const open=[...document.querySelectorAll('a[data-bs-target="#loginModal"],button[data-bs-target="#loginModal"],a,button')].find(el=>gameVisible(el)&&(/#loginModal/i.test(el.getAttribute('data-bs-target')||'')||/^(?:login|inloggen|sign in)$/i.test(norm(el.textContent||el.value||''))));
      if(open){state('Loginvenster openen');open.click();return;} state('Loginformulier nog niet zichtbaar');return;
    }
    inputSet(u,user);inputSet(p,pass);
    const loginForm=form||u.closest('form');
    const btn=[...(loginForm||document).querySelectorAll('button[type="submit"],input[type="submit"]')].find(visible) || [...document.querySelectorAll('button,input[type="submit"]')].find(x=>visible(x)&&/login|inloggen|sign in/i.test(norm(x.textContent||x.value||'')));
    set(K.lastLogin,Date.now());state('Automatisch inloggen');
    if(btn)btn.click();else if(loginForm?.requestSubmit)loginForm.requestSubmit();else loginForm?.submit?.();
  }

  function scheduleFromHeist(wait){
    const lead=Math.max(2,Math.min(10,Number(get(K.lead,4)||4)))*60000;
    const now=Date.now(), readyAt=now+wait, jitter=chooseJitterSeconds();
    const loginAt=now+Math.max(60000,wait-lead-(jitter*1000));
    set(K.readyAt,readyAt);set(K.jitterPick,jitter);set(K.loginAt,loginAt);
    state(`Batch klaar · volgende login ${new Date(loginAt).toLocaleTimeString('nl-NL')} · ${jitter}s extra eerder`);
    return loginAt;
  }

  function finishSelectedBatch(){
    clearBatch();
    if(selected('heist')){state('Geselecteerde activiteiten afgerond');return;}
    const lead=Math.max(2,Math.min(10,Number(get(K.lead,4)||4)))*60000;
    const jitter=chooseJitterSeconds(), readyAt=Date.now()+FALLBACK_SESSION_MS;
    const loginAt=readyAt-lead-(jitter*1000);
    set(K.readyAt,readyAt);set(K.jitterPick,jitter);set(K.loginAt,loginAt);
    state(`Batch klaar · Heist uit · volgende sessie ${new Date(loginAt).toLocaleTimeString('nl-NL')}`);
    doLogout();
  }

  function startBatch(){
    const wanted=selectedList();
    if(!wanted.length){state('Geen activiteiten aangevinkt');return false;}
    if(!driverName()){state('Driver naam ontbreekt');return false;}
    if(selected('heist')&&managerRole()==='leader'&&!selectedManagerCities().length){state('Heist: selecteer minimaal één stad');return false;}
    ensureStandaloneModules();
    const first=nextRunnableSelected('');
    if(!first){state(`Geen geselecteerde interne module geladen (${wanted.join(', ')})`);return false;}
    set(K.batchActive,true);set(K.batchStarted,Date.now());setBatchPhase(first);
    // Cruciaal voor standalone: setEnabled gebeurde vóór batchActive en mocht Heist
    // daardoor nog niet starten. Na het zetten van de fase de eerste module expliciet wekken.
    wakeModule(first,true);
    return true;
  }
  function monitorBatch(){
    if(!batchActive())return false;
    ensureStandaloneModules();
    let phase=batchPhase();
    if(!selected(phase)||!moduleReady(phase)){
      const next=nextRunnableSelected(phase);
      if(next){setBatchPhase(next);wakeModule(next,true);return true;}
      finishSelectedBatch();return true;
    }
    if(!onInfo()){state(`Sessie actief · ${phase==='race'?'Race':phase==='spot'?'Spot Overval':'Heist'} wordt afgehandeld`);return true;}
    if(phase==='race'){
      const raw=readActivityTimer('race'); if(!raw){state('Sessie Race · timer wordt gelezen');wakeModule('race');return true;}
      if(parseTimer(raw)<=0){state('Sessie Race · beschikbaar, Race-module handelt af');wakeModule('race');return true;}
      const next=nextRunnableSelected('race');
      if(next){setBatchPhase(next);wakeModule(next,true);return true;}
      finishSelectedBatch();return true;
    }
    if(phase==='spot'){
      const raw=readActivityTimer('spot'); if(!raw){state('Sessie Spot Overval · timer wordt gelezen');wakeModule('spot');return true;}
      if(parseTimer(raw)<=0){state('Sessie Spot Overval · beschikbaar, Spot-module handelt af');wakeModule('spot');return true;}
      const next=nextRunnableSelected('spot');
      if(next){setBatchPhase(next);wakeModule(next,true);return true;}
      finishSelectedBatch();return true;
    }
    const raw=readHeistTimer(); if(!raw){state('Sessie Heist · timer wordt gelezen');wakeModule('heist');return true;}
    const wait=parseTimer(raw);
    if(wait<=MIN_LOGOUT_REMAINING){
      state(wait<=0?'Sessie Heist · beschikbaar, Heist-module handelt af':`Sessie Heist · binnen ${raw}, ingelogd blijven`);
      if(wait<=0)wakeModule('heist');
      return true;
    }
    scheduleFromHeist(wait);clearBatch();doLogout();return true;
  }

  function tickLoggedIn(){
    const other=otherGoldModuleActive(); if(other){state(`Geblokkeerd: andere Gold-module actief (${other})`);return;}
    if(monitorBatch())return;

    // v2.1.3 PRE-HEIST BATCH:
    // De Night Manager logt bewust enkele minuten voor Heist in. Race hoeft niet
    // op de Heist-timer te wachten en mag in dit venster direct starten.
    // We herkennen precies deze geplande sessie aan een verstreken loginAt met
    // een readyAt dat nog in de toekomst ligt. Zo start Race niet zomaar tijdens
    // een willekeurige handmatige login buiten de geplande nachtsessie.
    const now=Date.now();
    const scheduledLoginAt=Number(get(K.loginAt,0)||0);
    const scheduledReadyAt=Number(get(K.readyAt,0)||0);
    const inPreHeistWindow=scheduledLoginAt>0 && now>=scheduledLoginAt && scheduledReadyAt>now;
    if(inPreHeistWindow && selected('race')){
      if(!onInfo()){state('Ingelogd voor Heist · Mijn Account openen, daarna Race direct');load('/information.php');return;}
      state('Ingelogd voor Heist · Race direct starten');
      if(startBatch()) return;
    }

    if(!onInfo()){state('Mijn Account openen voor Heisttimer');load('/information.php');return;}
    const raw=readHeistTimer(); if(!raw){state('Heisttimer niet gevonden');return;}
    const wait=parseTimer(raw);
    if(wait<=0){clearLoginSchedule();startBatch();return;}
    if(wait<=MIN_LOGOUT_REMAINING){state(`Heist binnen ${raw} · ingelogd blijven`);return;}
    const lead=Math.max(2,Math.min(10,Number(get(K.lead,4)||4)))*60000;
    const planNow=Date.now(), readyAt=planNow+wait;
    const savedReadyAt=Number(get(K.readyAt,0)||0), savedLoginAt=Number(get(K.loginAt,0)||0);
    let jitter=Number(get(K.jitterPick,-1)), loginAt=savedLoginAt;
    const sameCycle=savedReadyAt>0&&Math.abs(savedReadyAt-readyAt)<=90000&&savedLoginAt>0&&jitter>=0&&jitter<=59;
    if(!sameCycle){jitter=chooseJitterSeconds();loginAt=planNow+Math.max(60000,wait-lead-(jitter*1000));set(K.readyAt,readyAt);set(K.jitterPick,jitter);set(K.loginAt,loginAt);}
    state(`Cooldown ${raw} · login gepland ${new Date(loginAt).toLocaleTimeString('nl-NL')} · ${jitter}s extra eerder`);doLogout();
  }
  function tickLoggedOut(){
    if(gateVisible()){state('Gepauzeerd: captcha/Cloudflare');return;}
    const at=Number(get(K.loginAt,0)||0); if(!at){state('Uitgelogd zonder geplande login');return;}
    if(Date.now()<at){state(`Uitgelogd · login om ${new Date(at).toLocaleTimeString('nl-NL')}`);return;}
    doLogin();
  }
  function tick(){
    render(); if(!on())return;
    if(unsafeWindow.mrbManualControl?.isPaused?.()){const seconds=Math.max(1,Math.ceil((unsafeWindow.mrbManualControl.remaining?.()||0)/1000));state(`Handmatige pauze · hervat over ${seconds}s`);render();return;}
    if(loggedOut())tickLoggedOut();else tickLoggedIn(); render();
  }

  GM_addStyle(`
    #mrb-night-manager-panel{position:fixed;right:14px;bottom:14px;z-index:2147483000;width:270px;background:#151515;color:#eee;border:1px solid #8b7440;border-radius:8px;padding:10px;font:12px Arial,sans-serif;box-shadow:0 4px 18px rgba(0,0,0,.5)}
    #mrb-night-manager-panel b.title{color:#e3c66b;font-size:13px} #mrb-night-manager-panel input,#mrb-night-manager-panel select{background:#222;color:#eee;border:1px solid #555;border-radius:4px;padding:4px}
    #mrb-night-manager-panel button{background:#3b3421;color:#f4df93;border:1px solid #806d37;border-radius:4px;padding:5px 8px;cursor:pointer} #mrb-night-manager-panel .row{display:flex;gap:6px;align-items:center;margin-top:6px}
    #mrb-night-manager-panel .status{margin-top:6px;color:#d8c98f;line-height:1.3} #mrb-night-manager-panel label{display:block;margin-top:6px} #mrb-night-manager-panel .small{font-size:10px;opacity:.75;margin-top:6px;line-height:1.3}
  `);
  function mount(){
    if(panel?.isConnected)return;
    document.getElementById('mrb-night-manager-panel')?.remove();
    panel=document.createElement('div');panel.id='mrb-night-manager-panel';
    panel.innerHTML=`<b class="title">MRB Heist Night Manager Standalone v2.1.3</b><div class="row"><button data-toggle>Start</button><strong data-on>Uit</strong></div><div class="status" data-status>Gestopt</div><label>Gebruikersnaam<br><input data-user type="text" autocomplete="off" data-lpignore="true" data-1p-ignore="true" style="width:95%"></label><label>Wachtwoord<br><input data-pass type="password" autocomplete="new-password" data-lpignore="true" data-1p-ignore="true" style="width:95%"></label><label>Driver naam<br><input data-driver type="text" autocomplete="off" placeholder="Naam van Driver" style="width:95%"></label><label>Rol van dit account<br><select data-role style="width:95%"><option value="leader">Leider</option><option value="driver">Driver</option></select></label><div class="row" style="flex-wrap:wrap"><label style="margin:0"><input data-do-race type="checkbox"> Race</label><label style="margin:0"><input data-do-spot type="checkbox"> Spot Overval/Raid</label><label style="margin:0"><input data-do-heist type="checkbox"> Heist</label></div><div data-city-wrap style="margin-top:7px;border-top:1px solid rgba(255,214,102,.18);padding-top:6px"><b style="font-size:11px">Heist-steden (Leider)</b><div data-city-list style="margin-top:3px"></div><div class="small" style="margin-top:4px">Alleen aangevinkte steden worden gebruikt. Is de huidige stad niet beschikbaar, dan reist de Leider automatisch naar een aangevinkte stad waar Heist wel beschikbaar is.</div></div><label>Inloggen vóór Heist Nu<br><select data-lead><option value="2">2 minuten</option><option value="3">3 minuten</option><option value="4">4 minuten</option><option value="5">5 minuten</option><option value="7">7 minuten</option><option value="10">10 minuten</option></select></label><div class="row"><span>Extra eerder</span><input data-jmin type="number" min="0" max="59" style="width:42px"><span>t/m</span><input data-jmax type="number" min="0" max="59" style="width:42px"><span>s</span></div><button data-save style="margin-top:7px">Opslaan</button><div class="small">Zelfstandig: Race, Spot Overval en Heist zitten in dit script. v2.1.2: login en Driver zijn strikt gescheiden; credentials wijzigen alleen via Opslaan. MRB Gold moet uit staan.</div>`;
    document.body.appendChild(panel);
    panel.querySelector('[data-user]').value=String(get(K.user,'')||'');panel.querySelector('[data-pass]').value=String(get(K.pass,'')||'');panel.querySelector('[data-driver]').value=String(get(K.driver,'')||'');panel.querySelector('[data-role]').value=managerRole();panel.querySelector('[data-lead]').value=String(get(K.lead,4)||4);panel.querySelector('[data-do-race]').checked=selected('race');panel.querySelector('[data-do-spot]').checked=selected('spot');panel.querySelector('[data-do-heist]').checked=selected('heist');
    const cityState=managerCitySettings();
    panel.querySelector('[data-city-list]').innerHTML=MANAGER_CITIES.map(city=>`<label style="display:inline-flex;align-items:center;gap:4px;width:47%;margin:2px 0"><input type="checkbox" data-heist-city="${city}" ${cityState[city]?'checked':''}> ${city}</label>`).join('');
    const r=jitterRange();panel.querySelector('[data-jmin]').value=String(r.min);panel.querySelector('[data-jmax]').value=String(r.max);
    panel.querySelector('[data-role]').addEventListener('change',()=>{const cityWrap=panel.querySelector('[data-city-wrap]');if(cityWrap)cityWrap.style.display=panel.querySelector('[data-role]').value==='leader'?'block':'none';});panel.querySelector('[data-do-heist]').addEventListener('change',render);panel.querySelectorAll('[data-heist-city]').forEach(x=>x.addEventListener('change',syncCitySettingsFromPanel));
    panel.querySelector('[data-save]').onclick=()=>{savePanelSettings();syncCitySettingsFromPanel();set(K.doRace,panel.querySelector('[data-do-race]').checked);set(K.doSpot,panel.querySelector('[data-do-spot]').checked);set(K.doHeist,panel.querySelector('[data-do-heist]').checked);set(K.lead,Number(panel.querySelector('[data-lead]').value||4));let min=Math.max(0,Math.min(59,Math.round(Number(panel.querySelector('[data-jmin]').value)||0))),max=Math.max(0,Math.min(59,Math.round(Number(panel.querySelector('[data-jmax]').value)||0)));if(max<min)[min,max]=[max,min];set(K.jitterMin,min);set(K.jitterMax,max);if(!loggedOut())clearLoginSchedule();state('Instellingen opgeslagen');render();};
    panel.querySelector('[data-toggle]').onclick=()=>{const n=!on();set(K.on,n);if(!n){clearLoginSchedule();clearBatch();try{unsafeWindow.cc_api?.raceSet?.(false,'night-manager-stop');}catch(_){}try{unsafeWindow.mrbSpotRaidCoreV3?.setEnabled?.(false);}catch(_){}try{unsafeWindow.mrbHeistCoreControl?.setEnabled?.(false);}catch(_){}state('Handmatig gestopt');}else{clearLoginSchedule();clearBatch();state('Gestart · Heisttimer bepaalt volgende sessie');}render();setTimeout(tick,100);};
    render();
  }
  function render(){
    if(!panel?.isConnected){mount();return;} const enabled=on();panel.querySelector('[data-toggle]').textContent=enabled?'Stop':'Start';panel.querySelector('[data-on]').textContent=enabled?'Actief':'Uit';panel.querySelector('[data-status]').textContent=enabled?state():'Gestopt';
    const cityWrap=panel.querySelector('[data-city-wrap]');
    if(cityWrap) cityWrap.style.display=managerRole()==='leader'?'block':'none';
    panel.querySelectorAll('[data-heist-city]').forEach(x=>x.disabled=!panel.querySelector('[data-do-heist]').checked);
  }

  unsafeWindow.mrbHeistSessionBatch=Object.freeze({
    managed:()=>on(),active:()=>batchActive(),phase:()=>batchPhase(),driverName:()=>driverName(),
    allows:name=>!on()?true:(selected(String(name||''))&&batchActive()&&batchPhase()===String(name||'')),
    state:()=>({managed:on(),active:batchActive(),phase:batchPhase(),driverName:driverName(),heistCities:selectedManagerCities(),startedAt:Number(get(K.batchStarted,0)||0)})
  });

  mount();setInterval(tick,CHECK_MS);setTimeout(tick,1000);
})();
