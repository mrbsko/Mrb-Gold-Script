// ==UserScript==
// @name         MRB Gold Recovery 1.0
// @version      5.8.26
// @description  Spot leest de exacte eigen familie en sluit die correct uit wanneer de familienaam tussen haakjes staat.
// @author       Mrb
// @include      http://*.barafranca.nl/*
// @include      https://*.barafranca.nl/*
// @include      http://barafranca.nl/*
// @include      https://barafranca.nl/*
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @connect      maker.ifttt.com
// @connect      script.google.com
// @connect      script.googleusercontent.com
// @run-at       document-end
// ==/UserScript==

// ==========================================================
// Release 5.8.26: de exacte Familie-rij en zowel basisnaam als haakjesnaam van een Spot-eigenaar worden veilig vergeleken.
// Release 5.8.25: Spot krijgt navigatierust, verzendt de uitnodiging atomair en sluit bij doelkeuze uitsluitend de eigen familie uit.
// Release 5.8.24: Heist Sessie Manager-kopbadge is rechtstreeks gekoppeld aan zijn werkelijke aan/uit-sleutel.
// Release 5.8.23: vertrouwde handmatige bediening activeert centraal 60 seconden navigatierust met automatische hervatting.
// Release 5.8.22: Spot bewaart een absolute deadline, telt lokaal af en laat Mijn Account de deadline corrigeren.
// Release 5.8.21: Spot Driver controleert begrensd op opnieuw verstuurde uitnodigingen en herstelt zijn oude acceptatiestatus.
// Release 5.8.20: Heist Sessie Manager opent en verwerkt het echte loginformulier zelfstandig.
// Release 5.8.19: stabiele GitHub-build.
// Sprint 5.7.0: Spot Overval clean rebuild volgens de stabiele COM-opbouw.
// Sprint 5.8.10: Heist Sessie Manager negeert zijn eigen actieve kaart bij de exclusiviteitscontrole; Heist mag actief blijven terwijl alle overige modules uit moeten staan.
// Sprint 5.8.11: Driver herkent de uitnodigingsstad en reist erheen; Leider keert tussen gereedcontroles terug naar Mijn Account en sluit verwijder/annuleerlinks uit.
// Sprint 5.8.12: een verstuurde Leider-uitnodiging blijft persistent pending; niet-Heistpagina’s wissen de flow niet en de 5-minutenfallback is verwijderd.
// Sprint 5.8.13: Race WAITING_DRIVER keert terug naar Mijn Account en wijkt vóór elke 15s-hercontrole voor gereed/bezig Crimes en Cars.
// Sprint 5.8.14: Heist/Spot dragen Mijn Account eerst over aan Crimes, Cars en Race; verlopen prioriteitstimers worden direct hervat.
// Sprint 5.8.15: Spot Leider voert expliciet GroupCrimes -> Spot -> tweede Start/Update uit om de serverbug na afronding op te ruimen.
// Sprint 5.8.16: Driver verwerkt 'Reis naar [stad]' binnen moduleHeist vóór driverFinalize en reist ook wanneer de huidige stad niet kon worden gelezen.
// Sprint 5.8.17: Spot WAIT_TIMER opent zelfstandig Mijn Account; handmatige startpaginanavigatie is niet meer nodig.
// Sprint 5.8.18: GroupCrimes dat direct het actieve Spot-detail opent geldt als geldige tweede doorgang; reloadlus verwijderd.
// Sprint 5.8.19: onderbroken Crimes/Cars-navigatie blijft herproberen; Mijn Account wordt ook via DOM herkend en verdwenen actieknoppen worden nooit geklikt.
// Oude centrale Spot-pulse verwijderd; Spot bezit nog maar één eigen timeout.
// Leider controleert Driver rustig (35s), Driver keert na auto-inzet terug naar Mijn Account,
// en servercooldown wist alle tijdelijke cyclusstatus zodat het hoofdscript passief blijft.
// Heist 5.6.0 is inhoudelijk ongemoeid gelaten.
// ==========================================================

// ==========================================================
// Sprint 5.5.2: zichtbare Leid een heist-link gebruikt directe Omerta module-navigatie; geen gewone DOM-click meer.
// Sprint 5.5.4: Leider WAIT_DRIVER_READY controleert maximaal 1x per 15 seconden en wijkt voor Crimes/Cars.
// Tussen controles navigeert Heist niet en blokkeert hij andere modules niet.
// Formulier-, Driver-, Start- en winstflow uit 5.3.18 blijven ongewijzigd.
// ==========================================================

// ==========================================================
// MRB Gold Recovery - Sprint 5.1.4 Clean Base Race Role Guard TEST
// Functionele basis: Sprint 3.2 D&D Inventory/Price Hotfix.
// Centrale intervalregistratie toegevoegd; modulecallbacks en functionele flows behouden.
// Race, Crimes, Cars, D&D, Spot Overval en navigatie blijven behouden.
// Sprint 5.1.9: één SPA-navigatie tegelijk; Crimes/Cars voorrang; Race wacht.
// Sprint 5.2.1: Crimes/Cars verwerkt de echte #popupButtonNow vóór de Te-moe-retry.
// - Crimes: onclick naar .menu-item-crimes-crimes a.
// - Cars: onclick naar .menu-item-crimes-cars a.
// - Geen tekst- of leestekenafhankelijkheid; geen hernavigatie bij Now.
// ==========================================================


// ==========================================================
// Sprint 5.2.1 CLEAN BASE - PROVEN CRIMES/CARS CORE
// - Crimes/Cars-core letterlijk hersteld uit de door gebruiker bevestigde v11.12.23.
// - Recovery-, visible-Now-, single-heartbeat- en extra navigatiepatches uit 5.1.5-5.1.9 verwijderd.
// - Race is niet meer afhankelijk van de latere crimesCarsPriority-berekening.
// - Vaste periodieke refresh blijft zelfstandig actief en wijzigt geen Crimes/Cars-state.
// - Heist blijft volledig verwijderd.
// ==========================================================
(function(){
  'use strict';

  // =====================================================================
  // MRB GOLD EDITION v10.1.6 - BODYGUARD TRAINER
  // - Ontbrekende bodyguards worden automatisch aangenomen.
  // - Bodyguards worden nooit automatisch ontslagen.
  // - Presets en aangepaste aanval/verdediging-doelen van niveau 0 t/m 10.
  // - Benodigde wapens/vesten kunnen automatisch worden aangeschaft.
  // - Gate-, Cloudflare-, login- en click-limitveilig.
  // =====================================================================

  // ---------- GM helpers ----------
  function GM_Get(k, def){ try{ return GM_getValue(k, def);}catch{ return def; } }
  function GM_Set(k, v){ try{ GM_setValue(k, v);}catch{} }


  // ---------- SPRINT 5.1: CENTRALE PULSMANAGER ----------
  // Alle bestaande module-intervals lopen via één native browserinterval.
  // De callbacks, intervalduur en moduleflow blijven ongewijzigd. De manager
  // voorkomt alleen 25 los concurrerende browserintervals en callback-overlap.
  const mrbCentralPulse = (() => {
    const nativeSetInterval = window.setInterval.bind(window);
    const nativeClearInterval = window.clearInterval.bind(window);
    const PULSE_MS = 250;
    const tasks = new Map();
    let sequence = 0;
    let pulseHandle = null;

    function normalizeDelay(value){
      const n = Number(value);
      return Number.isFinite(n) ? Math.max(PULSE_MS, Math.floor(n)) : PULSE_MS;
    }

    function ensurePulse(){
      if (pulseHandle !== null || !tasks.size) return;
      pulseHandle = nativeSetInterval(runDueTasks, PULSE_MS);
    }

    function stopPulseWhenIdle(){
      if (tasks.size || pulseHandle === null) return;
      nativeClearInterval(pulseHandle);
      pulseHandle = null;
    }

    function runDueTasks(){
      const now = Date.now();
      for (const task of Array.from(tasks.values())){
        if (!tasks.has(task.id) || task.running || now < task.nextAt) continue;

        // Plan eerst de volgende beurt. Een langzame callback veroorzaakt zo
        // geen inhaalstorm en dezelfde taak kan nooit parallel aan zichzelf lopen.
        task.nextAt = now + task.delay;
        task.running = true;
        try {
          const result = task.callback(...task.args);
          if (result && typeof result.then === 'function'){
            Promise.resolve(result)
              .catch(error => console.error('[MRB Central Pulse]', task.label, error))
              .finally(() => { task.running = false; });
          } else {
            task.running = false;
          }
        } catch(error){
          task.running = false;
          console.error('[MRB Central Pulse]', task.label, error);
        }
      }
      stopPulseWhenIdle();
    }

    function add(callback, delay, ...args){
      if (typeof callback !== 'function') return 0;
      const id = ++sequence;
      const normalized = normalizeDelay(delay);
      tasks.set(id, {
        id,
        callback,
        args,
        delay: normalized,
        nextAt: Date.now() + normalized,
        running: false,
        label: callback.name || `interval-${id}`
      });
      ensurePulse();
      return id;
    }

    function remove(id){
      tasks.delete(Number(id));
      stopPulseWhenIdle();
    }

    function state(){
      return {
        pulseMs: PULSE_MS,
        activeTasks: tasks.size,
        runningTasks: Array.from(tasks.values()).filter(task => task.running).length,
        tasks: Array.from(tasks.values()).map(task => ({
          id: task.id,
          label: task.label,
          delay: task.delay,
          nextAt: task.nextAt,
          running: task.running
        }))
      };
    }

    return { add, remove, state };
  })();

  const mrbSetInterval = (callback, delay, ...args) => mrbCentralPulse.add(callback, delay, ...args);
  const mrbClearInterval = id => mrbCentralPulse.remove(id);
  unsafeWindow.mrbCentralPulse = { state: () => mrbCentralPulse.state() };

  // ---------- SPRINT 5.8.23: CENTRALE HANDMATIGE BEDIENINGSPAUZE ----------
  // Een echte gebruikersactie buiten het MRB-menu geeft de speler 60 seconden
  // volledige navigatierust. Nieuwe acties verlengen de pauze. Timers blijven
  // doorlopen en na afloop hervatten de modules vanzelf volgens hun prioriteit.
  (function installManualControlPause(){
    const KEY = 'mrb_manual_control_pause_until_v1';
    const PAUSE_MS = 60000;
    let until = Math.max(0, Number(GM_Get(KEY, 0) || 0));
    let panel = null;
    let statusEl = null;
    let pauseBtn = null;
    let resumeBtn = null;
    let lastSignalAt = 0;

    function remaining(){ return Math.max(0, until - Date.now()); }
    function isPaused(){
      const active = remaining() > 0;
      if (!active && until) { until = 0; GM_Set(KEY, 0); }
      return active;
    }
    function notify(){
      try { window.dispatchEvent(new CustomEvent('mrb:manual-pause-change', { detail: state() })); } catch(_) {}
      render();
    }
    function pause(reason='Handmatige bediening', duration=PAUSE_MS){
      const nextUntil = Date.now() + Math.max(1000, Number(duration) || PAUSE_MS);
      if (nextUntil > until) until = nextUntil;
      GM_Set(KEY, until);
      try { unsafeWindow.mrbManualPauseReason = String(reason || 'Handmatige bediening'); } catch(_) {}
      notify();
      return until;
    }
    function resume(){ until = 0; GM_Set(KEY, 0); notify(); }
    function state(){ return { paused:isPaused(), until, remainingMs:remaining(), reason:String(unsafeWindow.mrbManualPauseReason || '') }; }
    function ignoredTarget(target){ return !!target?.closest?.('#mrbGoldMenu,#geneoSuperMenu,#mrbManualPauseControl'); }
    function trustedActivity(event){
      if (!event.isTrusted || ignoredTarget(event.target)) return;
      const now = Date.now();
      if (now - lastSignalAt < 250) return;
      lastSignalAt = now;
      pause(event.type === 'keydown' ? 'Handmatig typen' : 'Handmatige spelbediening');
    }

    function mount(){
      if (panel?.isConnected) return;
      try {
        panel = addBlock(`
          <h4>Handmatige pauze</h4>
          <div id="mrbManualPauseStatus" style="font-size:11px;line-height:1.35;margin-bottom:7px">Automatisering actief</div>
          <div class="gm-row" style="gap:6px">
            <button id="mrbManualPauseStart" class="gm-btn">Pauzeer 60s</button>
            <button id="mrbManualPauseResume" class="gm-btn">Hervat nu</button>
          </div>
        `, '00e-manual-pause');
        panel.id = 'mrbManualPauseControl';
        statusEl = panel.querySelector('#mrbManualPauseStatus');
        pauseBtn = panel.querySelector('#mrbManualPauseStart');
        resumeBtn = panel.querySelector('#mrbManualPauseResume');
        pauseBtn.addEventListener('click', ()=>pause('Handmatig gepauzeerd via MRB-menu'));
        resumeBtn.addEventListener('click', resume);
        render();
      } catch(_) { panel = null; setTimeout(mount, 1000); }
    }
    function render(){
      if (!panel?.isConnected) return;
      const seconds = Math.ceil(remaining() / 1000);
      const active = seconds > 0;
      statusEl.textContent = active ? `Handmatige bediening · automatisch hervatten over ${seconds}s` : 'Automatisering actief';
      resumeBtn.disabled = !active;
      panel.classList.toggle('gm-block-active', active);
    }

    document.addEventListener('pointerdown', trustedActivity, true);
    document.addEventListener('keydown', trustedActivity, true);
    document.addEventListener('input', trustedActivity, true);
    mrbSetInterval(()=>{ render(); isPaused(); }, 500);
    setTimeout(mount, 250);

    unsafeWindow.mrbManualControl = Object.freeze({
      version:'5.8.23', pause, resume, isPaused, remaining, state
    });
  })();

  // ---------- SPRINT 4.9: CENTRALE NAVIGATIEPOORT ----------
  // Alle modules die mrbNavigate gebruiken komen eerst langs deze poort.
  // De poort verandert geen moduleflow; hij voorkomt alleen navigatie wanneer
  // de doelpagina al open staat, dezelfde route net is aangevraagd of een
  // bekende modulecooldown aantoonbaar nog loopt.
  (function installCentralNavigationGate(){
    const NAV_MIN_GAP_MS = 2600;
    const SAME_TARGET_GAP_MS = 10000;
    const NAV_IN_FLIGHT_MS = 6500;
    let lastNavigationAt = 0;
    let lastTarget = '';
    let lastTargetAt = 0;
    let activeSource = '';
    let activeUntil = 0;

    const clean = value => String(value || '').trim();
    function canonical(raw){
      const value = clean(raw);
      try {
        const u = new URL(value, location.href);
        const hash = clean(u.hash).replace(/^#/, '');
        const route = hash && /(?:^\/?\?|module=|\.php)/i.test(hash) ? hash : (u.pathname + u.search);
        return route.replace(/^\/?index\.php#?/, '').replace(/^#/, '').replace(/\/$/, '').toLowerCase();
      } catch(_) {
        return value.toLowerCase();
      }
    }
    function currentCanonical(){
      const hash = clean(location.hash).replace(/^#/, '');
      return canonical(hash && /(?:^\/?\?|module=|\.php)/i.test(hash) ? hash : (location.pathname + location.search));
    }
    function visibleText(value){
      return clean(value).replace(/\s+/g, ' ');
    }
    function targetAlreadyVisible(wanted){
      const gc = document.querySelector('#game_container');
      const cls = clean(gc?.className).toLowerCase();
      const heading = visibleText(gc?.querySelector('h1,h2,h3,.title,.moduleTitle')?.textContent || '');
      const body = visibleText(gc?.innerText || '').slice(0, 500);
      if (/module=crimes/.test(wanted)) {
        const exactCrimeModule = /\bmodule(?:legacy)?crimes?\b/.test(cls) && !/groupcrimes|orgcrime/.test(cls);
        return exactCrimeModule || /^(misdaden|crimes)$/i.test(heading);
      }
      if (/module=cars/.test(wanted)) {
        const exactCarsModule = /\bmodule(?:legacy)?(?:cars|autotheft)\b/.test(cls);
        return exactCarsModule || /^(steel een auto|cars|car theft)$/i.test(heading);
      }
      if (/races\.php/.test(wanted)) return /race/.test(cls) || /autoraces|auto races/i.test(heading + ' ' + body);
      if (/information\.php/.test(wanted)) return /information/.test(cls) || /mijn account|wachttijden|wait times/i.test(heading + ' ' + body);
      return false;
    }
    function navigationLoading(){
      const el = document.querySelector('#game_loading, .game_loading, .loading, [data-loading="true"]');
      if (!el) return false;
      try { return el.offsetParent !== null && getComputedStyle(el).display !== 'none'; }
      catch(_) { return false; }
    }
    function normalizeFixedDue(){
    if(!fixedRefreshOn){ fixedRefreshDue=0; fixedRefreshPendingSince=0; GM_Set(K_FIXED_DUE,0); return; }
    if(!fixedRefreshDue) fixedRefreshDue=Date.now()+fixedRefreshMinutes*60_000;
    GM_Set(K_FIXED_DUE,fixedRefreshDue);
  }
  function gateVisible(){
      try { return typeof gm_isGateVisible === 'function' && gm_isGateVisible(); } catch(_) { return false; }
    }
    function captchaVisible(){
      return !!document.querySelector('#recaptcha-popup, .g-recaptcha, iframe[src*="recaptcha"], iframe[src*="hcaptcha"], iframe[src*="challenges.cloudflare.com"]');
    }
    function future(ts, margin=1500){
      const n = Number(ts || 0);
      return Number.isFinite(n) && n > Date.now() + margin;
    }
    function cooldownBlocks(source, target){
      source = clean(source).toLowerCase();
      target = clean(target).toLowerCase();

      if (source.includes('crimes-cars')) {
        try {
          const st = unsafeWindow.mrbV9CrimesCars?.state?.();
          if (st && !st.busy) {
            if (/module=cars/.test(target) && future(st.carsNext)) return true;
            if (/module=crimes/.test(target) && future(st.crimesNext)) return true;
          }
        } catch(_) {}
      }

      if (source.includes('spot')) {
        try {
          const st = unsafeWindow.mrbSpotRaidCoreV3?.getState?.();
          if (st && future(st.nextAt) && /^(CHECK_TIMER|WAIT_TIMER|COOLDOWN|IDLE)$/.test(String(st.state || ''))) return true;
        } catch(_) {}
      }

      if (source.includes('bodyguard')) {
        try {
          const api = unsafeWindow.mrbV10BodyguardTrainer || unsafeWindow.mrbBodyguardTrainer;
          const st = api?.state?.() || api?.getState?.();
          if (st && !st.busy && future(st.nextAt)) return true;
        } catch(_) {}
      }

      // D&D wordt bewust niet op generieke cooldownvelden geblokkeerd. De 4.8
      // state-machine bepaalt zelf of kopen, verkopen of reizen binnen het
      // toegestane venster nodig is.
      return false;
    }
    function perform(target){
      try {
        const gui = unsafeWindow?.omerta?.GUI?.container;
        if (gui && typeof gui.loadPage === 'function') { gui.loadPage(target); return true; }
      } catch(_) {}
      try {
        if (String(target).startsWith('/?module=')) location.href = '/index.php#' + target;
        else location.href = target;
        return true;
      } catch(_) { return false; }
    }

    unsafeWindow.mrbNavigate = function(target, meta={}){
      const now = Date.now();
      const source = clean(meta?.source || meta?.owner || 'onbekend');
      const crimesCarsPriority = source.toLowerCase().includes('crimes-cars');
      const wanted = canonical(target);
      const current = currentCanonical();

      // Tijdens handmatige bediening blijven timers actief, maar geen enkele
      // gewone module mag de door de speler gekozen pagina vervangen.
      if (!meta?.manualPauseBypass && unsafeWindow.mrbManualControl?.isPaused?.()) return true;

      // URL en zichtbare module worden beide gecontroleerd. Bij een SPA-wissel
      // loopt de URL soms voor op de DOM; opnieuw laden veroorzaakt dan de witte/raw pagina.
      if (targetAlreadyVisible(wanted)) return true;
      // Voor Crimes/Cars is de zichtbare DOM hierboven leidend. Een oude URL
      // kan na een SPA-onderbreking nog Crimes/Cars tonen terwijl Heist, Spot,
      // Race of een handmatige pagina daadwerkelijk in de container staat.
      if (!crimesCarsPriority && wanted && current && (wanted === current || current.endsWith(wanted) || wanted.endsWith(current))) return true;
      if (gateVisible() || captchaVisible()) return true;
      if (!meta?.force && cooldownBlocks(source, wanted)) return true;


      // Laat nooit twee verschillende modules tegelijk de SPA-container vervangen.
      if (!meta?.force && now < activeUntil && activeSource && activeSource !== source) {
        if (!source.includes('crimes-cars')) return true;
      }
      if (!meta?.force && navigationLoading() && !source.includes('crimes-cars')) return true;
      // Een onderbroken Crimes/Cars-actie moet dezelfde doelpagina opnieuw
      // kunnen openen. De zichtbaarheidstest hierboven voorkomt dubbel laden
      // wanneer de juiste module al werkelijk in de container staat.
      if (!meta?.force && !crimesCarsPriority && wanted === lastTarget && now - lastTargetAt < SAME_TARGET_GAP_MS) return true;
      if (!meta?.force && !crimesCarsPriority && now - lastNavigationAt < NAV_MIN_GAP_MS) return true;

      lastNavigationAt = now;
      lastTarget = wanted;
      lastTargetAt = now;
      activeSource = source;
      activeUntil = now + NAV_IN_FLIGHT_MS;
      try {
        unsafeWindow.mrbNavigationState = { source, target:wanted, at:now, activeUntil };
      } catch(_) {}
      return perform(target);
    };

    unsafeWindow.mrbNavigationGate = {
      version:'4.9',
      state:()=>({lastNavigationAt,lastTarget,lastTargetAt,activeSource,activeUntil}),
      reset:()=>{lastNavigationAt=0;lastTarget='';lastTargetAt=0;activeSource='';activeUntil=0;}
    };
  })();

  // ---------- V10.1.5 CLOUDFLARE HERSTELMODUS ----------
  // Tijdens de beveiligingscontrole wordt de normale module-opstart volledig
  // overgeslagen. Daardoor kunnen menu-observers, planners en automatische
  // navigatie de Cloudflare-pagina niet blijven belasten.
  function mrbEarlyCloudflareVisible(){
    try {
      const t = String(document.body?.innerText || '').replace(/\s+/g, ' ').trim();
      if (/Beveiliging wordt geverifieerd|Verifying you are human|Verify you are human|beveiligingsservice om zich te beschermen tegen schadelijke bots|security of your connection|Dit kan enkele seconden duren|This may take a few seconds/i.test(t)) return true;
      return !!(
        document.querySelector('form[action*="cdn-cgi"]') ||
        document.querySelector('script[src*="cdn-cgi/challenge-platform"]') ||
        document.querySelector('[data-cf-beacon], .cf-browser-verification, #cf-challenge-running, #challenge-running, #challenge-form') ||
        document.querySelector('iframe[src*="challenges.cloudflare.com"]')
      );
    } catch(e) {
      return false;
    }
  }

  function mrbCloudflareRecoveryOnly(){
    try { document.getElementById('mrbGoldMenu')?.remove(); } catch(e) {}
    try { unsafeWindow.__mrbCloudflareRecovery = true; } catch(e) {}

    const started = Date.now();
    const retryKey = 'mrb_cf_last_recovery_reload_v1015';
    const timer = mrbSetInterval(() => {
      const active = mrbEarlyCloudflareVisible();

      // Als Cloudflare klaar is maar de SPA niet vanzelf terugkeert, volgt
      // één schone herstart zodat alle modules normaal opnieuw beginnen.
      if (!active) {
        mrbClearInterval(timer);
        try { location.reload(); } catch(e) {}
        return;
      }

      // Alleen bij een echt vastgelopen controle: na 60 seconden en maximaal
      // eenmaal per 2 minuten herladen. Tijdens deze fase blijft MRB uit.
      if (Date.now() - started >= 60_000) {
        const last = Number(sessionStorage.getItem(retryKey) || 0);
        if (!last || Date.now() - last >= 120_000) {
          sessionStorage.setItem(retryKey, String(Date.now()));
          mrbClearInterval(timer);
          try { location.reload(); } catch(e) {}
        }
      }
    }, 1000);
  }

  // Staat Cloudflare al open wanneer Tampermonkey start, laad dan uitsluitend
  // de lichte herstelcontrole en initialiseer geen enkele spelmodule.
  if (mrbEarlyCloudflareVisible()) {
    mrbCloudflareRecoveryOnly();
    return;
  }

  // Verschijnt Cloudflare later vanuit een actieve spelpagina, verwijder het
  // menu en herlaad eenmaal. Daarna start bovenstaande veilige modus.
  (function mrbWatchForLateCloudflare(){
    let triggered = false;
    mrbSetInterval(() => {
      if (triggered || !mrbEarlyCloudflareVisible()) return;
      triggered = true;
      try { unsafeWindow.__mrbCloudflareRecovery = true; } catch(e) {}
      try { document.getElementById('mrbGoldMenu')?.remove(); } catch(e) {}
      setTimeout(() => {
        try { location.reload(); } catch(e) {}
      }, 500);
    }, 750);
  })();


  // =====================================================================
  // MRB GOLD EDITION v10.0.4.28 - CLOUDFLARE RUSTPAUZE
  // - Zodra de beveiligingscontrole zichtbaar is, stopt automatische navigatie.
  // - Na verdwijnen blijft een extra afkoelperiode actief om herhaling te voorkomen.
  // =====================================================================
  const MRB_CF_COOLDOWN_KEY = 'mrb_cloudflare_cooldown_until_v10428';
  const MRB_CF_COOLDOWN_MS = 2 * 60 * 1000;

  function mrbCloudflareCooldownUntil(){
    const v = Number(GM_Get(MRB_CF_COOLDOWN_KEY, 0));
    return Number.isFinite(v) ? v : 0;
  }

  function mrbStartCloudflareCooldown(){
    const until = Date.now() + MRB_CF_COOLDOWN_MS;
    if (until > mrbCloudflareCooldownUntil()) GM_Set(MRB_CF_COOLDOWN_KEY, until);
    return until;
  }

  function mrbCloudflareCoolingDown(){
    return Date.now() < mrbCloudflareCooldownUntil();
  }

  // ---------- Global Login / Cloudflare gate helper ----------
  // Doel: alle headers kunnen "pauzeren" als je niet ingelogd bent of als Cloudflare check actief is.
  function gm_isCloudflareCheck(){
const t = (document.body?.innerText || '').replace(/\s+/g,' ').trim();
if (!t) {
  // Soms heeft Cloudflare weinig tekst; check dan op structurele hints
  return !!(
    document.querySelector('form[action*="cdn-cgi"]') ||
    document.querySelector('script[src*="cdn-cgi/challenge-platform"]') ||
    document.querySelector('[data-cf-beacon], .cf-browser-verification, #cf-challenge-running')
  );
}

// NL / EN varianten die jij noemde (en een paar veelvoorkomende Cloudflare regels)
const textHit = /Verifying you are human|Verify you are human|Verifieer dat u een mens bent|needs to review the security of your connection|beveiliging van uw verbinding beoordelen|This may take a few seconds|Dit kan enkele seconden duren/i.test(t);
if (textHit) return true;

// Structurele hints (voor als tekst wijzigt / niet in bodyText staat)
if (document.querySelector('form[action*="cdn-cgi"]')) return true;
if (document.querySelector('script[src*="cdn-cgi/challenge-platform"]')) return true;
if (document.querySelector('[data-cf-beacon], .cf-browser-verification, #cf-challenge-running')) return true;

return false;
  }

  function gm_isLoginVisible(){
    const visible = el => !!el && !el.closest('#geneoSuperMenu,#mrbGoldMenu') &&
      (el.offsetWidth || el.offsetHeight || el.getClientRects().length) &&
      getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none';

    // Alleen echte, zichtbare BaraFranca-loginbediening telt als gate.
    // Het wachtwoordveld van de Heist Sessie Manager staat in het MRB-menu
    // en mag Crimes/Cars nooit als uitgelogd markeren.
    if ([...document.querySelectorAll('a[data-bs-target="#signupModal"],a[data-bs-target="#loginModal"]')].some(visible)) return true;
    if ([...document.querySelectorAll('input[type="password"],form[action*="login" i],#loginModal,#signupModal')].some(visible)) return true;

    const nav = document.querySelector('.navbar-brand');
    const navTxt = visible(nav) ? (nav.innerText || '').toUpperCase() : '';
    return navTxt.includes('LOGIN') || navTxt.includes('SIGNUP');
  }

  // ---------- Click-limit guard ----------
  // Als je te vaak (URL) requests doet krijg je: "You reached your click limit."
  // Gewenst gedrag: 60s pauze, daarna doorgaan (meestal door naar information.php te navigeren).
  const GM_CLICKLIMIT_KEY = 'gm_clicklimit_until'; // >now = actief; -1 = cooldown klaar maar tekst nog zichtbaar; 0 = idle

  function gm_isClickLimitMessageVisible(){
    const t = (document.body?.innerText || '').replace(/\s+/g,' ').trim();
    return /You reached your click limit\./i.test(t);
  }

  function gm_getClickLimitState(){
    const v = Number(GM_Get(GM_CLICKLIMIT_KEY, 0));
    return Number.isFinite(v) ? v : 0;
  }

  function gm_setClickLimitState(v){
    GM_Set(GM_CLICKLIMIT_KEY, v);
  }

  // True = we moeten pauzeren (60s cooldown)
  function gm_isClickLimitBlocking(){
    const msg = gm_isClickLimitMessageVisible();
    const st  = gm_getClickLimitState();

    // Als de melding weg is, en we stonden op "cooldown klaar maar melding nog zichtbaar" => reset
    if (!msg){
      if (st === -1) gm_setClickLimitState(0);
      return false;
    }

    // Melding is zichtbaar:
    // - nog nooit geactiveerd => start 60s cooldown
    if (st === 0){
      gm_setClickLimitState(Date.now() + 60_000);
      return true;
    }

    // - cooldown loopt nog
    if (st > 0 && Date.now() < st){
      return true;
    }

    // - cooldown is voorbij, maar melding staat nog op scherm:
    //   markeer als klaar (-1) en laat scripts weer doorlopen zodat ze kunnen weg navigeren.
    if (st > 0 && Date.now() >= st){
      gm_setClickLimitState(-1);
      return false;
    }

    // - st === -1: cooldown al klaar, melding nog zichtbaar => niet blokkeren
    return false;
  }


  function gm_isGateVisible(){
    if (gm_isClickLimitBlocking()) return true;
    if (gm_isCloudflareCheck()) {
      mrbStartCloudflareCooldown();
      return true;
    }
    if (mrbCloudflareCoolingDown()) return true;
    return gm_isLoginVisible();
  }

  function gm_gateReason(){
    if (gm_isClickLimitBlocking() || gm_getClickLimitState() > 0 || gm_getClickLimitState() === -1) return 'Click limit (60s pauze)';
    if (gm_isCloudflareCheck()) return 'Cloudflare check';
    if (mrbCloudflareCoolingDown()) return 'Cloudflare afkoelperiode';
    if (gm_isLoginVisible()) return 'Login/Signup zichtbaar';
    return '';
  }


  // ---------- SUPERMENU SHELL ----------
  const MENU_KEY_POS = 'gm_supermenu_pos';
  function q(sel,root=document){ return root.querySelector(sel); }
  function ce(tag,props={}){ const el=document.createElement(tag); Object.assign(el,props); return el; }
  function clampPos(pos){
    const margin = 10;
    const vw = Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let left = Math.min(Math.max((pos?.left ?? margin), margin), vw - 250 - margin);
    let top  = Math.min(Math.max((pos?.top  ?? margin), margin), vh - 120 - margin);
    return {left: Math.round(left), top: Math.round(top)};
  }
  function buildMenu(){
    const old = document.getElementById('mrbGoldMenu');
    if (old) old.remove();

    const wrap = ce('div',{ id:'mrbGoldMenu' });
    wrap.innerHTML = `
      <div class="gm-header">
        <div class="gm-drag-handle" title="Sleep mij">❖</div>
        <div class="gm-title">MRB Gold Edition</div>
        <div class="gm-actions">
          <button id="gmCollapseAll" class="gm-icon" title="Alles minimaliseren">↧</button>
          <button id="gmExpandAll" class="gm-icon" title="Alles uitklappen">↥</button>
        </div>
      </div>
      <div class="gm-blocks"></div>
    `;
    document.documentElement.appendChild(wrap);

    // global collapse/expand
    wrap.querySelector('#gmCollapseAll').addEventListener('click', () => {
      document.querySelectorAll('.gm-block').forEach(b => {
        b.classList.add('gm-collapsed');
        const id=b.dataset.id; GM_Set(`gm_collapsed_${id}`, true);
        const btn=b.querySelector('.gm-min'); if(btn) btn.textContent='↥';
      });
    });
    wrap.querySelector('#gmExpandAll').addEventListener('click', () => {
      document.querySelectorAll('.gm-block').forEach(b => {
        b.classList.remove('gm-collapsed');
        const id=b.dataset.id; GM_Set(`gm_collapsed_${id}`, false);
        const btn=b.querySelector('.gm-min'); if(btn) btn.textContent='↧';
      });
    });

    const saved = GM_Get(MENU_KEY_POS, null);
    const pos = clampPos(saved || {left: 10, top: 10});
    wrap.style.left = pos.left + 'px';
    wrap.style.top  = pos.top  + 'px';

    // drag
    (function(){
      let dragging=false,sx=0,sy=0,sl=0,st=0;
      const handle = q('.gm-drag-handle', wrap);
      function onDown(x,y){ dragging=true; const r=wrap.getBoundingClientRect(); sl=r.left; st=r.top; sx=x; sy=y; document.body.style.userSelect='none'; }
      function onMove(x,y){ if(!dragging) return; wrap.style.left = (sl+(x-sx))+'px'; wrap.style.top = (st+(y-sy))+'px'; }
      function onUp(){ if(!dragging) return; dragging=false; document.body.style.userSelect=''; const r=wrap.getBoundingClientRect(); const c=clampPos({left:r.left, top:r.top}); wrap.style.left=c.left+'px'; wrap.style.top=c.top+'px'; GM_Set(MENU_KEY_POS, c); }
      handle.addEventListener('mousedown', e=>{ if(e.button!==0) return; onDown(e.clientX,e.clientY); window.addEventListener('mousemove', mm); window.addEventListener('mouseup', mu); });
      function mm(e){ onMove(e.clientX,e.clientY); }
      function mu(){ onUp(); window.removeEventListener('mousemove', mm); window.removeEventListener('mouseup', mu); }
      handle.addEventListener('touchstart', e=>{ const t=e.touches[0]; if(!t) return; onDown(t.clientX,t.clientY); window.addEventListener('touchmove', tm, {passive:false}); window.addEventListener('touchend', tu); });
      function tm(e){ const t=e.touches[0]; if(t) onMove(t.clientX,t.clientY); }
      function tu(){ onUp(); window.removeEventListener('touchmove', tm); window.removeEventListener('touchend', tu); }
    })();

    window.__MRB_GOLD_MENU__ = { wrap, blocksRoot: wrap.querySelector('.gm-blocks') };
    return wrap;
  }
GM_addStyle(`
  #mrbGoldMenu{
    position:fixed;top:10px;left:10px;width:250px;max-height:90vh;overflow:auto;
    background:linear-gradient(180deg,rgba(21,17,9,.97),rgba(8,8,8,.95));
    color:#f8e7a1;font-family:Arial,sans-serif;
    font-size:13px;
    z-index:2147483000;border-radius:14px;
    border:1px solid rgba(212,175,55,.85);
    box-shadow:0 10px 30px rgba(0,0,0,.72),0 0 18px rgba(212,175,55,.28);
    scrollbar-color:#d4af37 rgba(0,0,0,.35);
  }
  #mrbGoldMenu .gm-header{
    display:flex;align-items:center;gap:5px;
    padding:6px 8px;
    border-bottom:1px solid rgba(212,175,55,.55);position:sticky;top:0;
    background:linear-gradient(180deg,rgba(65,48,12,.98),rgba(24,20,10,.98));
    border-top-left-radius:14px;border-top-right-radius:14px;
    box-shadow:inset 0 -1px 0 rgba(255,255,255,.08);
  }
  .gm-drag-handle{cursor:grab;padding:1px 5px;background:rgba(212,175,55,.18);border:1px solid rgba(212,175,55,.45);border-radius:8px;color:#ffe08a}
  .gm-title{font-weight:800;flex:1;color:#ffe08a;text-shadow:0 0 8px rgba(212,175,55,.45);letter-spacing:.2px}
  .gm-actions .gm-icon{background:linear-gradient(180deg,#3b2c0c,#18130a);border:1px solid rgba(212,175,55,.65);color:#f8e7a1;border-radius:8px;padding:2px 5px;cursor:pointer}
  .gm-actions .gm-icon:hover{background:linear-gradient(180deg,#5a4210,#21190b);color:#fff3bf}
  .gm-blocks{padding:6px;display:flex;flex-direction:column;gap:6px}
  .gm-block{background:rgba(255,244,193,.055);border:1px solid rgba(212,175,55,.28);border-radius:11px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.25)}
  .gm-block-header{display:flex;align-items:center;padding:5px 6px;gap:5px;background:linear-gradient(180deg,rgba(66,49,15,.70),rgba(24,20,12,.78));border-bottom:1px solid rgba(212,175,55,.20)}
  .gm-block-title{font-weight:700;flex:1;color:#f8d86a;text-shadow:0 0 6px rgba(212,175,55,.24)}
  .gm-block-tools .gm-min{background:rgba(212,175,55,.13);border:1px solid rgba(212,175,55,.45);color:#f8e7a1;border-radius:8px;padding:2px 6px;cursor:pointer}
  .gm-block-tools .gm-min:hover{background:rgba(212,175,55,.25);color:#fff}
  .gm-block-tools .gm-order{background:rgba(212,175,55,.10);border:1px solid rgba(212,175,55,.35);color:#f8e7a1;border-radius:7px;padding:2px 5px;cursor:pointer;font-weight:800;line-height:16px;min-width:22px}
  .gm-block-tools .gm-order:hover{background:rgba(212,175,55,.24);color:#fff}
  .gm-block-tools .gm-order:disabled{opacity:.35;cursor:not-allowed}
  .gm-active-badge{font-size:10px;line-height:14px;font-weight:900;border-radius:999px;padding:2px 6px;white-space:nowrap;letter-spacing:.2px;border:1px solid rgba(255,255,255,.18);box-shadow:0 1px 6px rgba(0,0,0,.22);}
  .gm-active-badge.gm-active{background:rgba(56,190,85,.24);border-color:rgba(105,255,135,.55);color:#b8ffbf;text-shadow:0 0 6px rgba(75,255,105,.35);}
  .gm-active-badge.gm-inactive{background:rgba(190,55,55,.18);border-color:rgba(255,120,120,.38);color:#ffb5b5;text-shadow:0 0 6px rgba(255,80,80,.20);}
  .gm-active-badge.gm-captcha{background:rgba(255,180,30,.22);border-color:rgba(255,210,90,.55);color:#ffe08a;text-shadow:0 0 6px rgba(255,200,70,.30);}
  .gm-block.gm-block-active{border-color:rgba(105,255,135,.45);box-shadow:0 2px 10px rgba(0,0,0,.25),0 0 10px rgba(75,255,105,.12);}
  .gm-category-header{display:flex;align-items:center;gap:6px;padding:5px 7px;margin-top:2px;border-radius:10px;border:1px solid rgba(212,175,55,.45);background:linear-gradient(180deg,rgba(90,66,18,.86),rgba(31,24,12,.88));box-shadow:0 2px 10px rgba(0,0,0,.25);cursor:pointer;user-select:none;-webkit-user-select:none;}
  .gm-category-header:hover{border-color:rgba(240,207,101,.70);background:linear-gradient(180deg,rgba(114,82,20,.90),rgba(38,29,13,.90));}
  .gm-category-arrow{width:18px;text-align:center;font-weight:900;color:#ffe08a;}
  .gm-category-title{flex:1;font-weight:900;color:#ffe08a;text-shadow:0 0 7px rgba(212,175,55,.30);}
  .gm-category-count{font-size:10px;line-height:14px;font-weight:900;border-radius:999px;padding:2px 6px;background:rgba(0,0,0,.35);border:1px solid rgba(212,175,55,.35);color:#f8e7a1;white-space:nowrap;}
  .gm-block.gm-category-hidden{display:none !important;}
  .gm-block-body{padding:6px;color:#f4e7bd}
  .gm-collapsed .gm-block-body{display:none}
  .gm-status{margin-top:3px;font-weight:bold}
  .ok{color:#9dff8a;text-shadow:0 0 6px rgba(124,252,0,.35)}.bad{color:#ff9f9f;text-shadow:0 0 6px rgba(255,90,90,.25)}
  .gm-row{display:flex;align-items:center;gap:5px;flex-wrap:wrap}
  .gm-btn{background:linear-gradient(180deg,#d4af37,#8a6818);color:#171207;border:1px solid rgba(255,230,150,.55);border-radius:7px;padding:4px 8px;cursor:pointer;font-weight:700;box-shadow:0 1px 0 rgba(255,255,255,.22) inset,0 2px 6px rgba(0,0,0,.35)}
  .gm-btn:hover{background:linear-gradient(180deg,#f0cf65,#a77f20);color:#000}
  .gm-block-tools{display:flex;align-items:center;gap:5px}
  .gm-head-controls{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
  .gm-btn-mini{background:linear-gradient(180deg,#d4af37,#8a6818);color:#171207;border:1px solid rgba(255,230,150,.55);border-radius:7px;padding:2px 7px;cursor:pointer;font-size:12px;line-height:16px;font-weight:700}
  .gm-btn-mini:hover{background:linear-gradient(180deg,#f0cf65,#a77f20);color:#000}
  .gm-pill{margin-top:0 !important;font-weight:800;font-size:12px;line-height:16px;padding:2px 7px;border-radius:999px;background:rgba(0,0,0,.38);border:1px solid rgba(212,175,55,.35);color:#ffe08a}
  #mrbGoldMenu input,#mrbGoldMenu select,#mrbGoldMenu textarea{background:#19150d;color:#ffeec0;border:1px solid rgba(212,175,55,.45);border-radius:6px}
  #mrbGoldMenu input:focus,#mrbGoldMenu select:focus,#mrbGoldMenu textarea:focus{outline:none;border-color:#f0cf65;box-shadow:0 0 0 2px rgba(212,175,55,.18)}
  #mrbGoldMenu label{color:#f4e7bd}

  #mrbGoldMenu button{touch-action:manipulation}
  #mrbGoldMenu .gm-block-tools{position:relative;z-index:5}
  #mrbGoldMenu .gm-min,#mrbGoldMenu .gm-btn-mini,#mrbGoldMenu .gm-btn{user-select:none;-webkit-user-select:none}
`);


  function ensureMenu(){ if (!document.getElementById('mrbGoldMenu')) buildMenu(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureMenu); else ensureMenu();
  mrbSetInterval(ensureMenu, 10000);
  window.addEventListener('keydown', (e)=>{ if (e.ctrlKey && e.shiftKey && e.key.toLowerCase()==='m'){ const w=document.getElementById('mrbGoldMenu')||buildMenu(); const vw=Math.max(document.documentElement.clientWidth,window.innerWidth||0); const vh=Math.max(document.documentElement.clientHeight,window.innerHeight||0); const left=Math.round((vw-300)/2),top=Math.round((vh-200)/2); w.style.left=left+'px'; w.style.top=top+'px'; GM_Set(MENU_KEY_POS,{left,top}); } });
function _normTitle(s){ return String(s||'').trim().toLowerCase().replace(/\s+/g,' '); }

  // ---------- Handmatige kopjes-volgorde ----------
  // Veilig alternatief voor de oude automatische organizer:
  // - alleen verplaatsen wanneer jij op omhoog/omlaag klikt
  // - alleen complete .gm-block elementen verplaatsen
  // - geen Start/Stop-knoppen of invoervelden uit hun module halen
  const MRB_ORDER_KEY = 'mrb_manual_block_order_v1';

  function gmLoadBlockOrder(){
    try {
      const raw = GM_Get(MRB_ORDER_KEY, '');
      const arr = typeof raw === 'string' ? JSON.parse(raw || '[]') : raw;
      return Array.isArray(arr) ? arr.filter(Boolean).map(String) : [];
    } catch(e) {
      return [];
    }
  }

  function gmSaveCurrentBlockOrder(){
    const root = document.querySelector('#mrbGoldMenu .gm-blocks');
    if (!root) return;
    const ids = Array.from(root.querySelectorAll(':scope > .gm-block'))
      .map(b => String(b.dataset.id || ''))
      .filter(Boolean);
    GM_Set(MRB_ORDER_KEY, JSON.stringify(ids));
    gmRefreshOrderButtons();
    gmRefreshCategories();
  }

  function gmApplyManualBlockOrder(){
    const root = document.querySelector('#mrbGoldMenu .gm-blocks');
    if (!root) return;
    const order = gmLoadBlockOrder();
    if (!order.length) { gmRefreshOrderButtons(); return; }

    const blocks = Array.from(root.querySelectorAll(':scope > .gm-block'));
    const byId = new Map(blocks.map(b => [String(b.dataset.id || ''), b]));

    // Eerst de bekende opgeslagen volgorde, daarna nieuwe/onbekende modules in originele volgorde.
    const sorted = [];
    for (const id of order) {
      const b = byId.get(id);
      if (b && !sorted.includes(b)) sorted.push(b);
    }
    for (const b of blocks) {
      if (!sorted.includes(b)) sorted.push(b);
    }

    for (const b of sorted) root.appendChild(b);
    gmRefreshOrderButtons();
    gmRefreshCategories();
  }

  function gmMoveBlock(block, dir){
    const root = document.querySelector('#mrbGoldMenu .gm-blocks');
    if (!root || !block) return;
    const blocks = Array.from(root.querySelectorAll(':scope > .gm-block'));
    const idx = blocks.indexOf(block);
    if (idx < 0) return;

    if (dir < 0 && idx > 0) {
      root.insertBefore(block, blocks[idx - 1]);
    } else if (dir > 0 && idx < blocks.length - 1) {
      root.insertBefore(blocks[idx + 1], block);
    } else {
      return;
    }

    gmSaveCurrentBlockOrder();
  }

  function gmRefreshOrderButtons(){
    const root = document.querySelector('#mrbGoldMenu .gm-blocks');
    if (!root) return;
    const blocks = Array.from(root.querySelectorAll(':scope > .gm-block'));
    blocks.forEach((b, i) => {
      const up = b.querySelector(':scope > .gm-block-header .gm-order-up');
      const down = b.querySelector(':scope > .gm-block-header .gm-order-down');
      if (up) up.disabled = i === 0;
      if (down) down.disabled = i === blocks.length - 1;
    });
  }

  function gmAddManualOrderButtons(block){
    if (!block || block.dataset.mrbOrderButtons === '1') return;
    const tools = block.querySelector(':scope > .gm-block-header .gm-block-tools');
    if (!tools) return;

    const up = document.createElement('button');
    up.type = 'button';
    up.className = 'gm-order gm-order-up';
    up.title = 'Kopje omhoog';
    up.textContent = '↑';

    const down = document.createElement('button');
    down.type = 'button';
    down.className = 'gm-order gm-order-down';
    down.title = 'Kopje omlaag';
    down.textContent = '↓';

    up.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      gmMoveBlock(block, -1);
    });
    down.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      gmMoveBlock(block, 1);
    });

    ['mousedown','pointerdown','touchstart'].forEach(type => {
      up.addEventListener(type, e => e.stopPropagation(), true);
      down.addEventListener(type, e => e.stopPropagation(), true);
    });

    tools.insertBefore(down, tools.firstChild);
    tools.insertBefore(up, tools.firstChild);
    block.dataset.mrbOrderButtons = '1';
  }


  // ---------- Inklapbare hoofdcategorieen ----------
  // Veilig: dit is alleen een visuele laag in het menu.
  // Modules blijven bestaan en blijven actief; dichtklappen verbergt alleen de kaartjes.
  const MRB_CATEGORY_KEY = 'mrb_category_collapsed_v1';

  // Vaste, door gebruiker gekozen indeling.
  // Belangrijk: dit sorteert alleen hele module-kaarten in het menu.
  // Module-inhoud, knoppen en eventlisteners blijven ongemoeid.
  const MRB_CATEGORIES = [
    {
      id:'settings',
      title:'Instellingen',
      ids:['00-partner-oc-setting','08-refresh','00b-mrb-timer','00e-manual-pause'],
      titles:['Settings','Refresh','Timer','Handmatige pauze']
    },
    {
      id:'alerts',
      title:'Alerts / Timers',
      ids:['00d-lackey-timer','00c-captcha-alert','02b-heist-session-manager'],
      titles:['Lackey Timer','Captcha Alert','Heist Sessie Manager']
    },
    {
      id:'ranken',
      title:'Ranken',
      ids:['03-crimes-cars','02-heist-rebuild','03-dnd-trade','03-oc','03-spot-overval','01-race','12-cd-boozen','04-travel','03-bodyguard-trainer'],
      titles:['Crimes','Heist','D&D','OC','Spot Overval','Race','Boozen','Travel','Bodyguard Trainer']
    },
    {
      id:'war',
      title:'War',
      ids:['15-sniper','09-enteren','11-molotov','14-prefill'],
      titles:['Sniper','Enteren','Molotov','Prefill']
    },
    {
      id:'gokken',
      title:'Gokken',
      ids:['07-slots'],
      titles:['Slots']
    },
    {
      id:'overige',
      title:'Overige',
      ids:['xx-fill-lackey','xx-bullets','10-milestones'],
      titles:['Fill lackey','Bullets','Milestones']
    }
  ];

  // Standaardvolgorde binnen Ranken. Deze wordt alleen gebruikt zolang de gebruiker
  // nog geen eigen handmatige volgorde heeft opgeslagen. De pijltjes blijven dus leidend
  // zodra er zelf een kaart is verplaatst.
  const MRB_DEFAULT_RANK_ORDER = [
    '03-crimes-cars',
    '01-race',
    '02-heist-rebuild',
    '03-spot-overval',
    '03-oc',
    '03-dnd-trade',
    '12-cd-boozen',
    '03-bodyguard-trainer',
    '04-travel'
  ];

  const MRB_CATEGORY_BY_ID = (() => {
    const m = new Map();
    for (const cat of MRB_CATEGORIES) for (const id of cat.ids) m.set(String(id).toLowerCase(), cat.id);
    return m;
  })();

  const MRB_CATEGORY_BY_TITLE = (() => {
    const m = new Map();
    for (const cat of MRB_CATEGORIES) for (const t of cat.titles) m.set(_normTitle(t), cat.id);
    return m;
  })();

  function gmLoadCategoryState(){
    try {
      const raw = GM_Get(MRB_CATEGORY_KEY, '');
      const obj = typeof raw === 'string' ? JSON.parse(raw || '{}') : raw;
      return obj && typeof obj === 'object' ? obj : {};
    } catch(e) {
      return {};
    }
  }

  function gmSetCategoryCollapsed(catId, collapsed){
    const st = gmLoadCategoryState();
    st[String(catId || '')] = !!collapsed;
    GM_Set(MRB_CATEGORY_KEY, JSON.stringify(st));
    gmUpdateCategoryDisplayOnly();
  }

  function gmCategoryCollapsed(catId){
    return !!gmLoadCategoryState()[String(catId || '')];
  }

  function gmCategoryForBlock(block){
    const id = String(block?.dataset?.id || '').toLowerCase();
    const title = String(block?.querySelector?.(':scope > .gm-block-header .gm-block-title')?.textContent || '');
    const nt = _normTitle(title);

    if (MRB_CATEGORY_BY_ID.has(id)) return MRB_CATEGORY_BY_ID.get(id);
    if (MRB_CATEGORY_BY_TITLE.has(nt)) return MRB_CATEGORY_BY_TITLE.get(nt);

    // Fallbacks voor eventuele kleine titelwijzigingen of toekomstige kopjes.
    const hay = (id + ' ' + nt).replace(/[-_]/g, ' ');
    if (/setting|dashboard|refresh|timer/.test(hay)) return 'dashboard';
    if (/lackey timer|captcha|alert/.test(hay)) return 'alerts';
    if (/crime|cars|d&d|smokkel|\boc\b|race|booze|travel/.test(hay)) return 'ranken';
    if (/sniper|enteren|molotov|prefill|war/.test(hay)) return 'war';
    if (/slots|gokken/.test(hay)) return 'gokken';
    return 'overige';
  }

  function gmCategoryTitle(catId){
    return (MRB_CATEGORIES.find(c => c.id === catId) || MRB_CATEGORIES[MRB_CATEGORIES.length - 1]).title;
  }

  function gmMakeCategoryHeader(catId){
    const header = document.createElement('div');
    header.className = 'gm-category-header';
    header.dataset.cat = catId;
    header.innerHTML = `
      <span class="gm-category-arrow"></span>
      <span class="gm-category-title"></span>
      <span class="gm-category-count"></span>
    `;
    // De klik zelf wordt via delegatie op .gm-blocks afgehandeld.
    // Dat is stabieler, omdat categorieheaders soms opnieuw worden opgebouwd
    // terwijl statusbadges worden bijgewerkt.
    ['mousedown','pointerdown','touchstart'].forEach(type => {
      header.addEventListener(type, e => e.stopPropagation(), true);
    });
    return header;
  }

  function gmEnsureCategoryClickDelegation(root){
    if (!root || root.dataset.mrbCategoryClickDelegated === '1') return;
    root.dataset.mrbCategoryClickDelegated = '1';

    function getHeader(target){
      try { return target && target.closest ? target.closest('.gm-category-header') : null; }
      catch(e) { return null; }
    }

    function toggleFromEvent(e){
      const header = getHeader(e.target);
      if (!header || !root.contains(header)) return;

      // Alleen hoofdcategorieen; moduleknoppen blijven volledig ongemoeid.
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();

      const now = Date.now();
      const last = Number(header.dataset.mrbCatLastToggle || 0);
      if (now - last < 250) return; // voorkomt dubbel toggle door click + touch/click
      header.dataset.mrbCatLastToggle = String(now);

      const catId = header.dataset.cat || '';
      gmSetCategoryCollapsed(catId, !gmCategoryCollapsed(catId));
    }

    // Eén eventtype voorkomt dat pointerup/touchend/click dezelfde categorie
    // meerdere keren proberen te wisselen. Click werkt voor muis, touch en toetsenbord.
    root.addEventListener('click', toggleFromEvent, true);
  }

  function gmRefreshCategories(){
    const root = document.querySelector('#mrbGoldMenu .gm-blocks');
    if (!root) return;
    gmEnsureCategoryClickDelegation(root);

    // Oude categorieheaders opnieuw opbouwen; modules zelf blijven ongemoeid.
    root.querySelectorAll(':scope > .gm-category-header').forEach(h => h.remove());

    const blocks = Array.from(root.querySelectorAll(':scope > .gm-block'));
    if (!blocks.length) return;

    const counts = {};
    const activeCounts = {};
    const grouped = {};
    const originalIndex = new Map(blocks.map((b, i) => [b, i]));

    for (const block of blocks) {
      const catId = gmCategoryForBlock(block);
      block.dataset.mrbCategory = catId;
      counts[catId] = (counts[catId] || 0) + 1;
      grouped[catId] = grouped[catId] || [];
      grouped[catId].push(block);
      if (block.classList.contains('gm-block-active')) activeCounts[catId] = (activeCounts[catId] || 0) + 1;
    }

    // Zorg dat categorieen echt als blokken bij elkaar staan.
    // Binnen elke categorie blijft de huidige/handmatige volgorde behouden.
    const frag = document.createDocumentFragment();
    for (const cat of MRB_CATEGORIES) {
      const list = grouped[cat.id] || [];
      if (!list.length) continue;
      if (cat.id === 'ranken' && gmLoadBlockOrder().length === 0) {
        const pos = new Map(MRB_DEFAULT_RANK_ORDER.map((id, index) => [id, index]));
        list.sort((a, b) => {
          const ai = pos.has(String(a.dataset.id || '')) ? pos.get(String(a.dataset.id || '')) : 999;
          const bi = pos.has(String(b.dataset.id || '')) ? pos.get(String(b.dataset.id || '')) : 999;
          return ai - bi || (originalIndex.get(a) || 0) - (originalIndex.get(b) || 0);
        });
      } else {
        list.sort((a,b) => (originalIndex.get(a) || 0) - (originalIndex.get(b) || 0));
      }
      frag.appendChild(gmMakeCategoryHeader(cat.id));
      for (const block of list) frag.appendChild(block);
    }
    root.appendChild(frag);

    root.querySelectorAll(':scope > .gm-category-header').forEach(header => {
      const catId = header.dataset.cat || 'overige';
      const collapsed = gmCategoryCollapsed(catId);
      const arrow = header.querySelector('.gm-category-arrow');
      const title = header.querySelector('.gm-category-title');
      const count = header.querySelector('.gm-category-count');
      if (arrow) arrow.textContent = collapsed ? '▶' : '▼';
      if (title) title.textContent = gmCategoryTitle(catId);
      if (count) {
        const total = counts[catId] || 0;
        const active = activeCounts[catId] || 0;
        count.textContent = active ? `${active}/${total} actief` : `${total}`;
      }
    });

    root.querySelectorAll(':scope > .gm-block').forEach(block => {
      const collapsed = gmCategoryCollapsed(block.dataset.mrbCategory || 'overige');
      block.classList.toggle('gm-category-hidden', !!collapsed);
    });

    gmRefreshOrderButtons();
  }


  // Publieke menu-hooks voor modules die later dynamisch worden toegevoegd.
  // Hiermee kunnen zulke modules exact dezelfde categorie- en volgordelogica gebruiken.
  window.__mrbRefreshCategories = gmRefreshCategories;
  window.__mrbAddManualOrderButtons = gmAddManualOrderButtons;
  window.__mrbRefreshOrderButtons = gmRefreshOrderButtons;

  function gmUpdateCategoryDisplayOnly(){
    const root = document.querySelector('#mrbGoldMenu .gm-blocks');
    if (!root) return;

    gmEnsureCategoryClickDelegation(root);

    const blocks = Array.from(root.querySelectorAll(':scope > .gm-block'));
    if (!blocks.length) return;

    const counts = {};
    const activeCounts = {};
    const presentCats = new Set();

    for (const block of blocks) {
      const catId = block.dataset.mrbCategory || gmCategoryForBlock(block);
      block.dataset.mrbCategory = catId;
      presentCats.add(catId);
      counts[catId] = (counts[catId] || 0) + 1;
      if (block.classList.contains('gm-block-active')) activeCounts[catId] = (activeCounts[catId] || 0) + 1;
    }

    const headers = Array.from(root.querySelectorAll(':scope > .gm-category-header'));
    const headerCats = new Set(headers.map(h => h.dataset.cat || ''));

    // Als er nieuwe modules/categorieen zijn of headers ontbreken, 1x volledig opbouwen.
    let needsFull = false;
    for (const catId of presentCats) if (!headerCats.has(catId)) needsFull = true;
    if (headers.length !== presentCats.size) needsFull = true;
    if (needsFull) return gmRefreshCategories();

    for (const header of headers) {
      const catId = header.dataset.cat || 'overige';
      const collapsed = gmCategoryCollapsed(catId);
      const arrow = header.querySelector('.gm-category-arrow');
      const title = header.querySelector('.gm-category-title');
      const count = header.querySelector('.gm-category-count');
      if (arrow) arrow.textContent = collapsed ? '▶' : '▼';
      if (title) title.textContent = gmCategoryTitle(catId);
      if (count) {
        const total = counts[catId] || 0;
        const active = activeCounts[catId] || 0;
        count.textContent = active ? `${active}/${total} actief` : `${total}`;
      }
    }

    for (const block of blocks) {
      const collapsed = gmCategoryCollapsed(block.dataset.mrbCategory || 'overige');
      block.classList.toggle('gm-category-hidden', !!collapsed);
    }
  }


  // ---------- Duidelijke actief-badges in kopjes ----------
  // Veilig: dit verplaatst geen Start/Stop-knoppen en geen originele statusregels.
  // Het leest alleen de bestaande status/knoptekst en toont een kleine badge in de header.
  function gmStatusStateForBlock(block){
    if (!block) return { state:'unknown', label:'' };

    // De Sessie Manager heeft eigen invoervelden en meerdere knoppen. Leid zijn
    // kopbadge daarom nooit af uit zichtbare woorden, maar gebruik exact dezelfde
    // persistente aan/uit-sleutel als de module zelf.
    if (String(block.dataset?.id || '').toLowerCase() === '02b-heist-session-manager') {
      const enabled = GM_Get('mrb_session_heist_cycle_on_v1', false) === true;
      return enabled ? { state:'active', label:'ACTIEF' } : { state:'inactive', label:'UIT' };
    }

    // Captcha Alert heeft knoppen als 'Test geluid' en 'Stop toon'.
    // Die mogen niet als actieve modulestatus worden gelezen.
    if (String(block.dataset?.id || '').toLowerCase() === '00c-captcha-alert') {
      const enabled = !!GM_Get('mrb_captcha_alert_enabled', true);
      return enabled ? { state:'active', label:'ACTIEF' } : { state:'inactive', label:'UIT' };
    }

    const statusText = String(block.querySelector('.gm-status')?.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();

    const btnText = Array.from(block.querySelectorAll('button'))
      .filter(b => !b.classList.contains('gm-min') && !b.classList.contains('gm-order'))
      .map(b => String(b.textContent || '').replace(/\s+/g, ' ').trim())
      .join(' ');

    const hay = (statusText + ' ' + btnText).toLowerCase();

    if (/captcha|human-check|zichtbaar|🔊/.test(hay)) return { state:'captcha', label:'CAPTCHA' };

    // Bij de meeste modules betekent knoptekst "Stop" dat de module actief is.
    if (/\bstop\b/.test(hay) || /actief|✅|running|aan\b/.test(hay)) {
      if (!/\buit\b|gestopt|⛔/.test(hay) || /\bstop\b/.test(hay)) return { state:'active', label:'ACTIEF' };
    }

    if (/\bstart\b/.test(hay) || /\buit\b|gestopt|⛔|inactive|off\b/.test(hay)) {
      return { state:'inactive', label:'UIT' };
    }

    return { state:'unknown', label:'' };
  }

  function gmEnsureStatusBadge(block){
    if (!block || block.dataset.mrbStatusBadge === '1') return;
    const tools = block.querySelector(':scope > .gm-block-header .gm-block-tools');
    if (!tools) return;

    const badge = document.createElement('span');
    badge.className = 'gm-active-badge';
    badge.style.display = 'none';
    badge.title = 'Status van dit kopje';

    tools.insertBefore(badge, tools.firstChild);
    block.dataset.mrbStatusBadge = '1';
    gmUpdateStatusBadge(block);
  }

  function gmUpdateStatusBadge(block){
    if (!block) return;
    const badge = block.querySelector(':scope > .gm-block-header .gm-active-badge');
    if (!badge) return;

    const info = gmStatusStateForBlock(block);
    badge.className = 'gm-active-badge';
    block.classList.remove('gm-block-active');

    if (!info.label) {
      badge.style.display = 'none';
      badge.textContent = '';
      return;
    }

    badge.textContent = info.label;
    badge.style.display = '';

    if (info.state === 'active') {
      badge.classList.add('gm-active');
      block.classList.add('gm-block-active');
    } else if (info.state === 'captcha') {
      badge.classList.add('gm-captcha');
      block.classList.add('gm-block-active');
    } else {
      badge.classList.add('gm-inactive');
    }
  }

  let gmBadgeFrame = 0;
  const gmDirtyBadgeBlocks = new Set();

  function gmFlushStatusBadges(){
    gmBadgeFrame = 0;
    const root = document.querySelector('#mrbGoldMenu .gm-blocks');
    if (!root) { gmDirtyBadgeBlocks.clear(); return; }

    const blocks = gmDirtyBadgeBlocks.size
      ? Array.from(gmDirtyBadgeBlocks).filter(block => block && root.contains(block))
      : Array.from(root.querySelectorAll(':scope > .gm-block'));
    gmDirtyBadgeBlocks.clear();

    for (const block of blocks) {
      gmEnsureStatusBadge(block);
      gmUpdateStatusBadge(block);
    }
    gmUpdateCategoryDisplayOnly();
  }

  function gmScheduleStatusBadges(block=null){
    if (block) gmDirtyBadgeBlocks.add(block);
    if (gmBadgeFrame) return;
    gmBadgeFrame = requestAnimationFrame(gmFlushStatusBadges);
  }

  function gmUpdateAllStatusBadges(){
    gmDirtyBadgeBlocks.clear();
    gmScheduleStatusBadges();
  }

  const gmStatusBadgeObserver = new MutationObserver(mutations => {
    let fullRefresh = false;
    for (const mutation of mutations) {
      const node = mutation.target?.nodeType === 1 ? mutation.target : mutation.target?.parentElement;
      if (!node) continue;

      // Negeer wijzigingen die de badge/category-renderer zelf veroorzaakt.
      if (node.closest?.('.gm-active-badge, .gm-category-header, .gm-order, .gm-min')) continue;

      const block = node.closest?.('.gm-block');
      if (block) gmDirtyBadgeBlocks.add(block);
      else if (mutation.type === 'childList') fullRefresh = true;
    }
    if (fullRefresh) gmDirtyBadgeBlocks.clear();
    if (fullRefresh || gmDirtyBadgeBlocks.size) gmScheduleStatusBadges();
  });

  function gmStartStatusBadges(){
    const perfMenu = document.getElementById('mrbGoldMenu');
    if (perfMenu) perfMenu.style.contain = 'layout style paint';
    gmUpdateAllStatusBadges();
    const menuRoot = document.getElementById('mrbGoldMenu');
    if (menuRoot && !window.__mrbStatusBadgeObserverStarted) {
      window.__mrbStatusBadgeObserverStarted = true;
      // Alleen het MRB-menu observeren; wijzigingen in het volledige spel hoeven
      // geen complete badge-update meer te veroorzaken.
      gmStatusBadgeObserver.observe(menuRoot, { childList:true, subtree:true });
      // Langzame fallback voor statuswijzigingen die buiten de menu-DOM ontstaan.
      mrbSetInterval(gmUpdateAllStatusBadges, 5000);
    }
  }

  // addBlock
  function addBlock(html, idHint=''){
    const menu = (window.__MRB_GOLD_MENU__ && window.__MRB_GOLD_MENU__.wrap) ? window.__MRB_GOLD_MENU__ : (function(){
      const w = buildMenu();
      return window.__MRB_GOLD_MENU__ || { wrap: w, blocksRoot: w.querySelector('.gm-blocks') };
    })();
    const blocksRoot = menu.blocksRoot || buildMenu().querySelector('.gm-blocks');

    const id = idHint || ('blk_'+Math.random().toString(36).slice(2,9));
    const keyCollapsed = `gm_collapsed_${id}`;
    const collapsed = !!GM_Get(keyCollapsed, false);

    const el = document.createElement('div');
    el.className = 'gm-block';
    el.dataset.id = id;
    el.innerHTML = `
      <div class="gm-block-header">
        <div class="gm-block-title"></div>
        <div class="gm-block-tools">
          <button class="gm-min" title="Minimaliseer/Herstel">${collapsed ? '↥' : '↧'}</button>
        </div>
      </div>
      <div class="gm-block-body"></div>
    `;
    const body = el.querySelector('.gm-block-body');
    body.innerHTML = html;
    blocksRoot.appendChild(el);

    const h4 = body.querySelector('h4');
    if (h4){ el.querySelector('.gm-block-title').textContent = h4.textContent; h4.remove(); }

    gmAddManualOrderButtons(el);
    gmApplyManualBlockOrder();

    gmEnsureStatusBadge(el);
    gmUpdateStatusBadge(el);
    gmStartStatusBadges();
    gmRefreshCategories();

     function setCollapsed(on){
      GM_Set(keyCollapsed, !!on);
      el.classList.toggle('gm-collapsed', !!on);
      el.querySelector('.gm-min').textContent = on ? '↥' : '↧';
    }
    el.querySelector('.gm-min').addEventListener('click', ()=> setCollapsed(!el.classList.contains('gm-collapsed')) );
    setCollapsed(collapsed);
    return el;
  }
  // =====================================================================
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
    const container = document.querySelector('#game_container');
    const cls = low(container?.className || '');
    // Tijdens een SPA-wissel kan de URL nog GroupCrimes bevatten terwijl de
    // zichtbare container al Spot is. De zichtbare module is dan leidend.
    if (/modulespots|modulespot\b/.test(cls) || document.querySelector('#module_Spots,.moduleSpots')) return false;
    if (/modulegroupcrimes/.test(cls) || document.querySelector('#module_GroupCrimes,.moduleGroupCrimes')) return true;
    return /module=GroupCrimes/i.test(location.href);
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
  function navigateToGroup() { if (!canNavigate()) return false; const link = findGroupLink(); if (!link) return false; markNav(); link.click(); return true; }
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

  function loadGroupCrimesForSecondPass(){
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
    } else if (timerReady() || get(K.leaderGo, false)) {
      if (timerReady()) set(K.timerReady, true);
      if (navigateToGroup()) setStatus('RECOVER_GROUP', 'Actieve Leider-flow hersteld via Groepsmisdaden.');
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
    toggleBtn.addEventListener('click', () => {
      set(K.enabled, !enabled());
      if (enabled()) {
        resetFlow(true);
        setStatus('IDLE', `${role() === 'leader' ? 'Leider' : 'Driver'} gestart.`);
        clearLoop(); schedule(150);
      } else {
        clearLoop();
        setStatus('STOPPED', 'Module gestopt.');
      }
      renderToggle();
    });
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
    getState: () => ({ enabled: enabled(), role: role(), state: state(), nextAt: timerAt() })
  };
  unsafeWindow.mrbV9SpotRaid = unsafeWindow.mrbSpotRaidCoreV3;
  if (enabled()) schedule(150);

  })();

  const rdelay=(min,max)=>Math.floor(Math.random()*(max-min+1))+min;


  // ---------- MRB variabele actie-timer ----------
  // Centrale timer voor automatische klik-/submit-acties.
  // Standaard: 2 t/m 5 seconden. Aanpasbaar via het Timer-blok in het menu.
  const MRB_DELAY_MIN_KEY = 'mrb_delay_min_sec';
  const MRB_DELAY_MAX_KEY = 'mrb_delay_max_sec';

  function mrbDelayMinSec(){
    const v = Number(GM_Get(MRB_DELAY_MIN_KEY, 2));
    return Number.isFinite(v) ? Math.max(0, Math.min(60, v)) : 2;
  }

  function mrbDelayMaxSec(){
    const min = mrbDelayMinSec();
    const v = Number(GM_Get(MRB_DELAY_MAX_KEY, 5));
    const max = Number.isFinite(v) ? Math.max(0, Math.min(120, v)) : 5;
    return Math.max(min, max);
  }

  function mrbVarDelayMs(){
    const minMs = Math.round(mrbDelayMinSec() * 1000);
    const maxMs = Math.round(mrbDelayMaxSec() * 1000);
    return minMs + Math.floor(Math.random() * (maxMs - minMs + 1));
  }

  unsafeWindow.mrbVarDelayMs = mrbVarDelayMs;
  unsafeWindow.mrbDelayMinSec = mrbDelayMinSec;
  unsafeWindow.mrbDelayMaxSec = mrbDelayMaxSec;


// =====================================================================
// MRB MENU CLICK STABILIZER
// Maakt Start/Stop-knoppen en inklap-pijltjes responsiever.
// Voorkomt dat menu-drag/reorder/collapse elkaar bij een klik dwarszitten.

// Detectives: Bulk (ALWAYS ON) — originele werking + input newline/comma + sets(1..5)
// =====================================================================
(function DetectivesBulkAlwaysOn_original(){
  // voorkom dubbele bind, maar laat re-inject toe als het element weg is
  if (unsafeWindow.__DB_ORIG_BOUND__) return;
  unsafeWindow.__DB_ORIG_BOUND__ = true;

  let uiInjected = false;

  const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));

  function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const step=100; let t=0;
      const it=mrbSetInterval(()=>{
        const el=document.querySelector(selector);
        if (el){ mrbClearInterval(it); resolve(el); }
        else if ((t+=step)>=timeout){ mrbClearInterval(it); reject(new Error("Element niet gevonden: "+selector)); }
      }, step);
    });
  }

  function parseTargets(raw){
    // ✅ accepteert zowel:
    // - Naam1, Naam2, Naam3,
    // - Naam1\nNaam2\nNaam3
    // - of mixed
    return String(raw || '')
      .split(/,|\r?\n/g)
      .map(s => s.trim())
      .filter(Boolean);
  }

  async function injectUI(){
    const form   = document.querySelector('#detectives-search-div');
    const parent = document.querySelector('#detectivesMain');
    if (!form || !parent) return;

    // als de box al bestaat, markeer injected en klaar
    if (parent.querySelector('#bulkDetectivesBox')) { uiInjected = true; return; }

    uiInjected = true;
    const box = document.createElement('div');
    box.id = 'bulkDetectivesBox';
    box.innerHTML = `
      <hr><h3>🔍 Bulk Detective Search</h3>

      <textarea id="bulkTargets" rows="6" cols="60"
        placeholder="Kommagescheiden of onder elkaar. Voorbeeld:
Naam1, Naam2, Naam3, of
Naam1
Naam2
Naam3"></textarea><br><br>

      <label>Detectives per stad:</label> <input type="number" id="bulkDetectives" value="100"><br><br>

      <label>Uren:</label>
      <select id="bulkHours">
        <option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
      </select><br><br>

      <label>Sets:</label>
      <select id="bulkSets">
        <option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
      </select><br><br>

      <label>Steden:</label><br>
      <label><input type="checkbox" class="bulkCity" value="Detroit"> Detroit</label>
      <label><input type="checkbox" class="bulkCity" value="Baltimore"> Baltimore</label>
      <label><input type="checkbox" class="bulkCity" value="Chicago"> Chicago</label>
      <label><input type="checkbox" class="bulkCity" value="Palermo"> Palermo</label>
      <label><input type="checkbox" class="bulkCity" value="New York"> New York</label>
      <label><input type="checkbox" class="bulkCity" value="Las Vegas"> Las Vegas</label>
      <label><input type="checkbox" class="bulkCity" value="Philadelphia"> Philadelphia</label>
      <label><input type="checkbox" class="bulkCity" value="Corleone"> Corleone</label><br><br>

      <button id="startBulkSearch">🚀 Start Zoekactie</button>
      <div id="bulkStatus" style="margin-top:10px;color:lime;"></div><hr>
    `;
    parent.appendChild(box);

    document.querySelector('#startBulkSearch').addEventListener('click', async ()=>{
      const targetsRaw = document.querySelector('#bulkTargets').value;
      const detectives = parseInt(document.querySelector('#bulkDetectives').value, 10);
      const hours      = parseInt(document.querySelector('#bulkHours').value, 10);
      const sets       = parseInt(document.querySelector('#bulkSets').value, 10);
      const cities     = [...document.querySelectorAll('.bulkCity:checked')].map(cb=>cb.value);
      const statusDiv  = document.querySelector('#bulkStatus');

      const targets = parseTargets(targetsRaw);

      if (!targets.length || !cities.length){
        alert('⚠️ Voer minimaal 1 doelwit en 1 stad in.');
        return;
      }

      const totalRuns = targets.length * sets;
      let doneRuns = 0;

      statusDiv.textContent = `Start zoeken: ${targets.length} targets × ${sets} sets = ${totalRuns} acties...`;

      for (let i=0;i<targets.length;i++){
        for (let s=1;s<=sets;s++){
          await submitSearch(targets[i], cities, detectives, hours);

          doneRuns++;
          statusDiv.textContent =
            `Zoekactie '${targets[i]}' — set ${s}/${sets} voltooid • ${doneRuns}/${totalRuns} acties (target ${i+1}/${targets.length})`;

          await sleep(1000); // *** originele pauze tussen targets (nu tussen elke run)
        }
      }

      statusDiv.textContent = `✅ Klaar: ${totalRuns} acties uitgevoerd (${targets.length} targets × ${sets} sets).`;
    });
  }

  // *** originele flow & timings ***
  async function submitSearch(target, cities, detectives, hours){
    const form  = document.querySelector('#detectives-search-div');
    const input = form?.querySelector('input[name="target"]');
    if (!form || !input) return;

    input.value = target;

    await new Promise(r=>setTimeout(r,500));                         // (1) oorspronkelijke 500ms
    form.querySelector('input[type="submit"]').click();

    await new Promise(r=>setTimeout(r,1000));                        // (2) oorspronkelijke 1000ms
    await waitForElement('.jqi .jqiform').catch(()=>{});
    await new Promise(r=>setTimeout(r,1000));                        // (3) oorspronkelijke 1000ms

    const rows = document.querySelectorAll('.jqi .jqiform table tbody tr');
    for (let i=0;i<rows.length;i++){
      const row=rows[i];
      const cityCell=row.querySelector('.city-td');
      const det=row.querySelector('.detectives-td input');
      const sel=row.querySelector('.hours-td select');
      if (!cityCell||!det||!sel) continue;

      const city=cityCell.innerText.trim();
      if (cities.includes(city)){
        det.value=detectives;
        sel.value=hours;
      } else {
        det.value=0;
      }

      await new Promise(r=>setTimeout(r,300));                       // (4) oorspronkelijke 300ms per rij
    }

    const hireBtn=document.querySelector('.jqi .jqiform button[name="jqi_form_buttonHire"]');
    if (hireBtn) hireBtn.click(); else return;

    await waitForElement('.jqi .jqistate[data-jqi-name="Hired"]').catch(()=>{});
    await new Promise(r=>setTimeout(r,1000));                        // (5) oorspronkelijke 1000ms

    const okBtn=document.querySelector('.jqi .jqistate[data-jqi-name="Hired"] button[name="jqi_Hired_buttonOK"]');
    if (okBtn) okBtn.click();

    await new Promise(r=>setTimeout(r,1000));                        // (6) oorspronkelijke 1000ms
  }

  // persistente (re)injectie zoals origineel bedoeld, maar zonder herlaad nodig
  // CPU-hotfix: niet meer bij iedere wijziging de volledige pagina doorzoeken.
  let injectScheduled = false;
  const scheduleInject = () => {
    if (injectScheduled) return;
    injectScheduled = true;
    setTimeout(() => { injectScheduled = false; injectUI(); }, 250);
  };
  const mo = new MutationObserver(mutations=>{
    for (const m of mutations) {
      for (const node of m.addedNodes || []) {
        if (node.nodeType !== 1) continue;
        if (node.id === 'detectivesMain' || node.id === 'detectives-search-div' ||
            node.querySelector?.('#detectivesMain, #detectives-search-div')) {
          scheduleInject();
          return;
        }
      }
    }
  });
  const detectiveRoot = document.querySelector('#game_container') || document.body;
  if (detectiveRoot) mo.observe(detectiveRoot,{childList:true,subtree:true});

  // eerste poging
  injectUI();
})();


// =====================================================================
// TRAVEL — Enter focus (altijd actief, geen menu/geen toggle)
// =====================================================================
;(function TravelEnterFocusHidden(){
  // Guard tegen dubbel initialiseren
  if (unsafeWindow.__gm_travelEnterFocusInit) return;
  unsafeWindow.__gm_travelEnterFocusInit = true;

  const BTN_SELECTOR = 'button.jqibutton[name="jqi_state0_buttonTravel"]';

  // Helpers
  const isTyping = (el) =>
    el &&
    (el.tagName === 'INPUT' ||
     el.tagName === 'TEXTAREA' ||
     el.tagName === 'SELECT' ||
     el.isContentEditable);

  const isVisible = (el) => !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));

  const findBtn = () => {
    const btn = document.querySelector(BTN_SELECTOR);
    return (btn && isVisible(btn) && !btn.disabled) ? btn : null;
  };

  const focusBtn = (btn) => {
    if (!btn) return;
    if (isTyping(document.activeElement)) return; // steel geen focus als gebruiker typt
    if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex','0');
    if (document.activeElement !== btn) {
      try { btn.focus({ preventScroll: true }); } catch { btn.focus(); }
    }
  };

  // Enter -> klik, alleen als gebruiker niet typt
  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    if (isTyping(e.target)) return;
    const btn = findBtn();
    if (btn) {
      e.preventDefault();
      btn.click();
    }
  };

  // Start (observeer DOM voor modals/overlays)
  let mo = null;
  const start = () => {
    // 1) Probeer direct te focussen als knop er al is
    focusBtn(findBtn());

    // 2) Observeer latere injecties
    let focusScheduled = false;
    mo = new MutationObserver((mutations) => {
      if (focusScheduled) return;
      let relevant = false;
      for (const m of mutations) {
        for (const node of m.addedNodes || []) {
          if (node.nodeType !== 1) continue;
          if (node.matches?.(BTN_SELECTOR) || node.querySelector?.(BTN_SELECTOR)) { relevant = true; break; }
        }
        if (relevant) break;
      }
      if (!relevant) return;
      focusScheduled = true;
      requestAnimationFrame(() => { focusScheduled = false; focusBtn(findBtn()); });
    });
    const travelRoot = document.querySelector('#game_container') || document.body;
    if (travelRoot) {
      mo.observe(travelRoot, { childList: true, subtree: true });
    }

    // 3) Enter-listener (capture om modals te pakken)
    document.addEventListener('keydown', onKeyDown, true);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

// =====================================================================
// ALGEMENE INSTELLING — Settings (Partnernaam + OC EE/WE/DR + Opt-out Master)
// =====================================================================
(function GeneralPartnerAndOCSettings(){
  // Keys & defaults
  const K_NAME   = 'race_partner_name';
  const K_EE     = 'oc_ee';
  const K_WE     = 'oc_we';
  const K_DR     = 'oc_dr';

  // Master opt-out (per browser)
  // true  = deze browser negeert master commands (Race/OC)
  // false = volgt master commands
  const K_OPTOUT = 'cc.local.optOutAll';

  let partnerName  = GM_Get(K_NAME, 'Invullen'); // standaard Invullen
  let ocEE         = GM_Get(K_EE,   '');         // standaard leeg
  let ocWE         = GM_Get(K_WE,   '');
  let ocDR         = GM_Get(K_DR,   '');
  let optOutMaster = GM_Get(K_OPTOUT, false);

  // UI — Settings blok (Partner/OC rechtsboven grid, Save onderaan)
  const block = addBlock(`
    <h4>Settings</h4>

    <div class="gm-row" style="justify-content:flex-end;width:100%;">
      <div style="
        margin-left:auto;
        display:grid;
        grid-template-columns: 28px 12ch;
        column-gap:8px; row-gap:6px; align-items:center;">

        <!-- Rij 0: Driver + Partner (boven het grid, over 2 kolommen) -->
        <div style="grid-column:1 / span 2; display:flex; align-items:center; gap:8px;">
          <span style="font-weight:600;">Driver</span>
          <input id="grpsName" type="text" maxlength="12" value="${partnerName}"
                 placeholder="Partner (max 12)"
                 style="width:12ch; height:22px; padding:2px 6px;">
        </div>

        <!-- Grid: EE / WE / DR -->
        <label for="ocEE">EE</label>
        <input id="ocEE" type="text" maxlength="12" value="${ocEE}"
               style="width:12ch; height:22px; padding:2px 6px;">

        <label for="ocWE">WE</label>
        <input id="ocWE" type="text" maxlength="12" value="${ocWE}"
               style="width:12ch; height:22px; padding:2px 6px;">

        <label for="ocDR">DR</label>
        <input id="ocDR" type="text" maxlength="12" value="${ocDR}"
               style="width:12ch; height:22px; padding:2px 6px;">

        <!-- Opt-out Master (volledige breedte, rechts uitgelijnd) -->
        <label style="grid-column:1 / span 2; justify-self:end; display:flex; align-items:center; gap:8px; margin-top:2px;">
          <input id="optOutMaster" type="checkbox" ${optOutMaster ? 'checked' : ''}>
          Opt-out Master
        </label>

        <!-- Save onderaan (volledige breedte, rechts uitgelijnd) -->
        <button id="grpsSave" class="gm-btn"
                style="grid-column:1 / span 2; justify-self:end; margin-top:2px;">Save</button>
      </div>
    </div>
  `, '00-partner-oc-setting');

  // Elementen
  const nameInp   = block.querySelector('#grpsName');
  const eeInp     = block.querySelector('#ocEE');
  const weInp     = block.querySelector('#ocWE');
  const drInp     = block.querySelector('#ocDR');
  const optOutInp = block.querySelector('#optOutMaster');
  const saveBtn   = block.querySelector('#grpsSave');

  // Opt-out direct opslaan bij toggle (staat los van Save)
  optOutInp.addEventListener('change', ()=>{
    optOutMaster = !!optOutInp.checked;
    GM_Set(K_OPTOUT, optOutMaster);
  });

  // Opslaan
  function doSave(){
    partnerName = (nameInp.value || '').trim().slice(0,13) || 'Invullen';
    ocEE = (eeInp.value || '').trim().slice(0,12);
    ocWE = (weInp.value || '').trim().slice(0,12);
    ocDR = (drInp.value || '').trim().slice(0,12);

    GM_Set(K_NAME, partnerName);
    GM_Set(K_EE, ocEE);
    GM_Set(K_WE, ocWE);
    GM_Set(K_DR, ocDR);
  }
  saveBtn.addEventListener('click', doSave);
  [nameInp, eeInp, weInp, drInp].forEach(inp=>{
    inp.addEventListener('keydown', e=>{
      if(e.key==='Enter'){ e.preventDefault(); doSave(); }
    });
  });

  // ===== Prefill logica =====
  function $jq(){ return unsafeWindow.$ || unsafeWindow.jQuery || null; }

  // Robuust invullen: werkt ook als jQuery nog niet klaar is en triggert input/change events.
  function setFieldValue(el, value){
    if (!el) return false;
    try{ el.focus(); }catch{}
    el.value = value || '';
    try{ el.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
    try{ el.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
    return true;
  }

  function nnIsCenter(){
    const nn = unsafeWindow.nn;
    return (typeof nn === 'string' ? nn === 'center' : true);
  }
  function onPageRaces(){ return location.pathname === '/races.php' || location.href.includes('/races.php'); }
  function onPageOC(){ return location.pathname === '/orgcrime2.php' || location.href.includes('/orgcrime2.php'); }

  function prefillOnce(){
    // Races — vul partnernaam in voor de tweede racer.
    if (onPageRaces() && nnIsCenter()){
      const input = document.querySelector('input[name="racer2"]');
      if (input){
        setFieldValue(input, partnerName || 'Invullen');
        const submit = document.querySelector('input[type="submit"]');
        try{ submit?.focus(); }catch{}
        return;
      }
    }


    // OC start — vul EE / WE / DR in.
    if (onPageOC()){
      const txt = document.querySelector('#game_container')?.innerText || document.body?.innerText || '';
      if (/Start an Organised Crime/i.test(txt)){
        const ee = document.querySelector("input[name='expexp']");
        const we = document.querySelector("input[name='weapexp']");
        const dr = document.querySelector("input[name='carexp']");
        let did = false;
        if (ee){ setFieldValue(ee, ocEE); did = true; }
        if (we){ setFieldValue(we, ocWE); did = true; }
        if (dr){ setFieldValue(dr, ocDR); did = true; }
        if (did){
          const submit = document.querySelector("input[type='submit']");
          try{ submit?.focus(); }catch{}
          return;
        }
      }
    }
  }

  // CPU-hotfix: alleen op relevante pagina's en maximaal eenmaal per 250 ms.
  let prefillTimer = 0;
  function schedulePrefill(){
    if (!(onPageRaces() || onPageOC())) return;
    clearTimeout(prefillTimer);
    prefillTimer = setTimeout(prefillOnce, 250);
  }
  const mo = new MutationObserver(schedulePrefill);
  const prefillRoot = document.querySelector('#game_container') || document.body;
  if (prefillRoot) mo.observe(prefillRoot, { childList:true, subtree:true });
  window.addEventListener('hashchange', schedulePrefill, true);
  window.addEventListener('popstate', schedulePrefill, true);
  setTimeout(prefillOnce, 300);
  setTimeout(prefillOnce, 1000);
  setTimeout(prefillOnce, 2000);
})();

// =====================================================================
// MRB TIMER — globale variabele vertraging
// =====================================================================
(function MRBGlobalDelaySettings(){
  const minVal = (typeof unsafeWindow.mrbDelayMinSec === 'function') ? unsafeWindow.mrbDelayMinSec() : Number(GM_Get('mrb_delay_min_sec', 2));
  const maxVal = (typeof unsafeWindow.mrbDelayMaxSec === 'function') ? unsafeWindow.mrbDelayMaxSec() : Number(GM_Get('mrb_delay_max_sec', 5));

  const block = addBlock(`
    <h4>Timer</h4>
    <div class="gm-row" style="align-items:center;gap:7px;">
      <label>Min</label>
      <input id="mrbDelayMin" type="number" min="0" max="60" step="0.5" value="${minVal}" style="width:56px;">
      <span>sec</span>
    </div>
    <div class="gm-row" style="align-items:center;gap:7px;margin-top:5px;">
      <label>Max</label>
      <input id="mrbDelayMax" type="number" min="0" max="120" step="0.5" value="${maxVal}" style="width:56px;">
      <span>sec</span>
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;margin-top:6px;">
      <button id="mrbDelaySave" class="gm-btn">Save</button>
      <div id="mrbDelayStatus" class="gm-status" style="margin:0;">${minVal}-${maxVal}s</div>
    </div>
  `,'00b-mrb-timer');

  const minInp = block.querySelector('#mrbDelayMin');
  const maxInp = block.querySelector('#mrbDelayMax');
  const status = block.querySelector('#mrbDelayStatus');

  function clampNum(v, def, lo, hi){
    v = Number(v);
    if (!Number.isFinite(v)) v = def;
    return Math.max(lo, Math.min(hi, v));
  }

  function save(){
    let min = clampNum(minInp.value, 2, 0, 60);
    let max = clampNum(maxInp.value, 5, 0, 120);
    if (max < min) max = min;
    GM_Set('mrb_delay_min_sec', min);
    GM_Set('mrb_delay_max_sec', max);
    minInp.value = min;
    maxInp.value = max;
    status.textContent = `${min}-${max}s`;
  }

  block.querySelector('#mrbDelaySave').addEventListener('click', save);
  [minInp, maxInp].forEach(inp=>inp.addEventListener('keydown', e=>{
    if(e.key === 'Enter'){ e.preventDefault(); save(); }
  }));
})();


// =====================================================================
// MRB GOLD EDITION v8.2.8
// - Autojat/Cars kiest betrouwbaarder de optie met de hoogste %-kans.
// - Percentage wordt eerst uit de knop zelf gelezen, daarna pas uit de eigen optiekaart.
// - Voorkomt dat een grote parent met meerdere opties de verkeerde keuze veroorzaakt.
// =====================================================================


// =====================================================================
// [SPRINT 3] Dashboard en dashboard-metrics volledig verwijderd.
// =====================================================================
// CAPTCHA ALERT v8.2.9 — robuust geluid + automatische stop
// - Testgeluid werkt altijd vanaf de Test-knop, ook zonder captcha.
// - AudioContext wordt via Start/Test ontgrendeld voor Safari/Chrome.
// - Bij captcha: herhaald piepen zolang captcha zichtbaar is.
// - Zodra captcha weg is: timer en geluid worden direct gestopt.
// =====================================================================
(function MRBCaptchaAlertRobustV829(){
  'use strict';

  const K_ON = 'mrb_captcha_alert_enabled';
  const K_INTERVAL_SEC = 'mrb_captcha_alert_interval_sec';
  const K_SOUND = 'mrb_captcha_alert_sound_on';

  let on = !!GM_Get(K_ON, true);
  let intervalSec = Number(GM_Get(K_INTERVAL_SEC, 10));
  if (!Number.isFinite(intervalSec) || intervalSec < 2) intervalSec = 10;

  let soundOn = !!GM_Get(K_SOUND, true);

  let audioCtx = null;
  let alarmTimer = null;
  let scanTimer = null;
  let lastBeep = 0;
  let audioUnlocked = false;

  const block = addBlock(`
    <h4>Captcha Alert</h4>

    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="mrbCaptchaToggle" class="gm-btn">${on ? 'Stop' : 'Start'}</button>
      <div id="mrbCaptchaStatus" class="gm-status" style="margin:0;"></div>
    </div>

    <div class="gm-row" style="align-items:center;gap:7px;margin-top:7px;">
      <label>Geluid elke</label>
      <input id="mrbCaptchaIntervalSec" type="number" min="2" max="120" step="1" value="${intervalSec}" style="width:58px;">
      <span>sec</span>
    </div>


    <div class="gm-row" style="align-items:center;gap:8px;margin-top:4px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input id="mrbCaptchaSound" type="checkbox" ${soundOn ? 'checked' : ''}>
        Geluid
      </label>
    </div>

    <div class="gm-row" style="align-items:center;gap:8px;margin-top:7px;">
      <button id="mrbCaptchaSave" class="gm-btn">Save</button>
      <button id="mrbCaptchaTest" class="gm-btn">Test geluid</button>
      <button id="mrbCaptchaStopSound" class="gm-btn">Stop toon</button>
    </div>

    <div id="mrbCaptchaInfo" style="font-size:11px;opacity:.85;margin-top:5px;line-height:1.35;"></div>
  `, '00c-captcha-alert');

  function clean(s){ return String(s || '').replace(/\s+/g, ' ').trim(); }

  function captchaVisible(){
    const t = clean(document.body?.innerText || '');

    // 1) Bekende captcha/human-check elementen.
    if (
      document.getElementById('recaptcha-popup') ||
      document.querySelector('.g-recaptcha, .h-captcha, [data-sitekey], iframe[src*="recaptcha"], iframe[src*="hcaptcha"], iframe[src*="captcha"], iframe[src*="challenges.cloudflare.com"]') ||
      document.querySelector('form[action*="cdn-cgi"], script[src*="cdn-cgi/challenge-platform"]') ||
      document.querySelector('[data-cf-beacon], .cf-browser-verification, #cf-challenge-running, #challenge-running, #challenge-form')
    ) return true;

    // 2) Tekstherkenning. Breed genoeg voor Cloudflare, reCAPTCHA en NL/EN meldingen.
    return /captcha|recaptcha|hcaptcha|verify you are human|verifying you are human|verifieer dat u een mens bent|controleer dat je een mens bent|security of your connection|beveiliging van uw verbinding|human check|menselijke controle|challenge/i.test(t);
  }

  function pageName(){
    const title = clean(document.querySelector('#game_container h1, #game_container h2, .title')?.innerText || '');
    if (title) return title;
    return String(location.hash || location.href || 'Barafranca').replace(/^#\/?/, '');
  }

  function getAudioCtx(){
    if (!soundOn) return null;
    try {
      if (!audioCtx || audioCtx.state === 'closed') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext || unsafeWindow.AudioContext || unsafeWindow.webkitAudioContext;
        if (!AudioCtx) return null;
        audioCtx = new AudioCtx();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      audioUnlocked = true;
      return audioCtx;
    } catch(e) {
      return null;
    }
  }

  function playBeep(force=false){
    // force=true wordt gebruikt door Test geluid; die moet ook zonder captcha werken.
    if (!force && (!on || !soundOn || !captchaVisible())) return false;
    if (force && !soundOn) return false;

    const ctx = getAudioCtx();
    if (!ctx) return false;

    try {
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      gain.connect(ctx.destination);

      // Dubbele korte toon is duidelijker dan 1 piep.
      [880, 660].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);
        osc.connect(gain);
        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.16);
      });

      window.__mrbCaptchaSoundPlaying = true;
      setTimeout(() => { try { window.__mrbCaptchaSoundPlaying = false; } catch(_) {} }, 600);
      return true;
    } catch(e) {
      return false;
    }
  }

  function stopSound(){
    if (alarmTimer) {
      mrbClearInterval(alarmTimer);
      clearTimeout(alarmTimer);
      alarmTimer = null;
    }

    [
      '__mrbCaptchaSoundTimer',
      '__mrbCaptchaBeepTimer',
      '__mrbCaptchaAlertTimer',
      '__mrbGateSoundTimer',
      '__mrbGateBeepTimer',
      '__mrbCaptchaMasterControlTimer'
    ].forEach(k => {
      try {
        if (window[k]) {
          mrbClearInterval(window[k]);
          clearTimeout(window[k]);
          window[k] = null;
        }
      } catch(e) {}
    });

    try {
      document.querySelectorAll('audio, video').forEach(a => {
        try { a.pause(); a.currentTime = 0; } catch(e) {}
      });
    } catch(e) {}

    try { window.__mrbCaptchaSoundPlaying = false; } catch(e) {}
    try { window.__mrbCaptchaAlertPlaying = false; } catch(e) {}
    try { window.__mrbGateSoundPlaying = false; } catch(e) {}
    try { if (audioCtx && audioCtx.state !== 'closed') audioCtx.close(); } catch(e) {}
    audioCtx = null;
    audioUnlocked = false;
  }

  function updateStatus(extra=''){
    const st = block.querySelector('#mrbCaptchaStatus');
    const btn = block.querySelector('#mrbCaptchaToggle');
    const info = block.querySelector('#mrbCaptchaInfo');

    if (btn) btn.textContent = on ? 'Stop' : 'Start';

    const visible = captchaVisible();
    if (st) {
      if (!on) st.innerHTML = '<span class="bad">⛔ Uit</span>';
      else if (visible) st.innerHTML = '<span class="bad">🔊 Captcha zichtbaar</span>';
      else st.innerHTML = '<span class="ok">✅ Actief</span>';
    }

    if (info) {
      const audioText = soundOn ? (audioUnlocked ? 'geluid vrijgegeven' : 'klik Test geluid of Start om geluid vrij te geven') : 'geluid uit';
      const capText = visible ? 'captcha gedetecteerd' : 'geen captcha zichtbaar';
      info.textContent = extra || `${capText} • ${audioText}`;
    }
  }

  function saveSettings(){
    const i = block.querySelector('#mrbCaptchaIntervalSec');
    const s = block.querySelector('#mrbCaptchaSound');

    intervalSec = Math.max(2, Math.min(120, Math.floor(Number(i?.value || 10))));
    soundOn = !!s?.checked;

    GM_Set(K_INTERVAL_SEC, intervalSec);
    GM_Set(K_SOUND, soundOn);

    if (i) i.value = intervalSec;
    if (!soundOn || !on || !captchaVisible()) stopSound();
    updateStatus('Instellingen opgeslagen.');
  }

  function startAlarmLoop(){
    if (!on || !captchaVisible()) {
      stopSound();
      return;
    }

    if (!alarmTimer) {
      // Eerste piep direct bij detectie.
      if (soundOn) {
        lastBeep = Date.now();
        playBeep(false);
      }

      alarmTimer = mrbSetInterval(() => {
        if (!on || !captchaVisible()) {
          stopSound();
          updateStatus();
          return;
        }

        if (soundOn && Date.now() - lastBeep >= intervalSec * 1000) {
          lastBeep = Date.now();
          playBeep(false);
        }
          updateStatus();
      }, 500);

      window.__mrbCaptchaAlertTimer = alarmTimer;
    }
  }

  function tick(){
    if (!on) {
      stopSound();
      updateStatus();
      return;
    }

    if (captchaVisible()) startAlarmLoop();
    else stopSound();

    updateStatus();
  }

  block.querySelector('#mrbCaptchaToggle')?.addEventListener('click', () => {
    on = !on;
    GM_Set(K_ON, on);

    if (on) {
      getAudioCtx(); // user-gesture unlock
      tick();
    } else {
      stopSound();
    }
    updateStatus(on ? 'Captcha Alert gestart.' : 'Captcha Alert gestopt.');
  });

  block.querySelector('#mrbCaptchaSave')?.addEventListener('click', () => {
    saveSettings();
    getAudioCtx();
  });

  block.querySelector('#mrbCaptchaTest')?.addEventListener('click', () => {
    saveSettings();
    on = true;
    soundOn = true;
    GM_Set(K_ON, true);
    GM_Set(K_SOUND, true);
    const cb = block.querySelector('#mrbCaptchaSound');
    if (cb) cb.checked = true;

    const ok = playBeep(true);
    updateStatus(ok ? 'Testgeluid afgespeeld. Captcha Alert staat aan.' : 'Testgeluid kon niet starten. Controleer browser/site geluidstoestemming.');
  });

  block.querySelector('#mrbCaptchaStopSound')?.addEventListener('click', () => {
    stopSound();
    updateStatus('Geluid handmatig gestopt.');
  });

  ['#mrbCaptchaIntervalSec', '#mrbCaptchaSound'].forEach(sel => {
    const el = block.querySelector(sel);
    if (!el) return;
    el.addEventListener('change', saveSettings);
    el.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        saveSettings();
      }
    });
  });

  const mo = new MutationObserver(() => {
    clearTimeout(window.__mrbCaptchaAlertTickV829);
    window.__mrbCaptchaAlertTickV829 = setTimeout(tick, 150);
  });

  function start(){
    updateStatus();
    tick();

    // CPU fix: geen full-document MutationObserver meer. De 1,5 s scan
    // detecteert captcha's betrouwbaar zonder duizenden callbacks per minuut.
    try { mo.disconnect(); } catch (_) {}

    scanTimer = mrbSetInterval(tick, 1500);
    window.__mrbCaptchaScanTimer = scanTimer;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once:true });
  } else {
    start();
  }
})();

// =====================================================================
// MRB GOLD EDITION v10.2.5 - CONDITIONELE BG-PLANNING
// - Na navigatie krijgt dezelfde module gegarandeerd eerst een vervolgrun.
// - BG STIPT kan Crimes, Cars, Race en andere flows niet meer onderbreken.
// - Het vervolgslot vervalt zodra de module op de doelpagina zonder nieuwe navigatie heeft gedraaid.
// - Bodyguard Trainer wacht kort na navigatie van een andere module.
// - Crimes en andere modules krijgen daardoor tijd om hun pagina-actie af te ronden.
// - paint() plant de BG-taak niet meer telkens opnieuw op "nu".
// - STIPT blijft actief zodra de pagina stabiel is en de BG-timer gereed is.
// - BG navigeert alleen wanneer een echte training/aankoop gereedstaat.
// - Zonder openstaande BG-actie blijven Crimes, Cars en Race ongemoeid.
// =====================================================================
// =====================================================================
// MRB BODYGUARD TRAINER v10.1.7 - totaallevel als bron van waarheid
// Automatisch aannemen en trainen; nooit automatisch ontslaan.
// =====================================================================
(function MRBBodyguardTrainerV1016(){
  'use strict';

  const K_ON='mrb_bg_trainer_on_v1';
  const K_MODE='mrb_bg_trainer_mode_v1';
  const K_CUSTOM='mrb_bg_trainer_custom_v1';
  const K_EQUIP='mrb_bg_trainer_auto_equip_v1';
  const K_LAST='mrb_bg_trainer_last_action_v1';
  const K_PRIORITY='mrb_bg_trainer_priority_v1';
  const K_NEEDS_WORK='mrb_bg_trainer_needs_work_v1';
  const K_NEXT_CHECK='mrb_bg_trainer_next_check_v1';

  const ALL=['Lee','Vic','Ike','Joe','Lex','Ray'];
  const META={
    Lee:{weapon:false,vest:true}, Ray:{weapon:true,vest:true},
    Vic:{weapon:true,vest:false}, Ike:{weapon:true,vest:true},
    Joe:{weapon:true,vest:true}, Lex:{weapon:true,vest:false}
  };
  const STATS={
    Lee:{attBase:0,attPer:1,defBase:50,defPer:10},
    Ike:{attBase:10,attPer:6,defBase:25,defPer:7},
    Joe:{attBase:5,attPer:7,defBase:5,defPer:7},
    Ray:{attBase:0,attPer:2,defBase:10,defPer:5},
    Lex:{attBase:0,attPer:5,defBase:10,defPer:2},
    Vic:{attBase:20,attPer:8,defBase:0,defPer:3}
  };
  const PRESETS={
    full_att:{label:'Full Attack',lineup:['Lee','Vic','Ike','Joe','Lex'],targets:{Lee:{att:0,def:10},Vic:{att:10,def:0},Ike:{att:10,def:0},Joe:{att:10,def:0},Lex:{att:10,def:0}}},
    full_def:{label:'Full Defense',lineup:['Lee','Ike','Joe','Lex','Ray'],targets:{Lee:{att:0,def:10},Ike:{att:0,def:10},Joe:{att:0,def:10},Lex:{att:0,def:10},Ray:{att:0,def:10}}},
    three_two:{label:'3 Attack / 2 Defense',lineup:['Lee','Ike','Vic','Joe','Lex'],targets:{Lee:{att:0,def:10},Ike:{att:0,def:10},Vic:{att:10,def:0},Joe:{att:10,def:0},Lex:{att:10,def:0}}},
    balanced:{label:'Gebalanceerd',lineup:['Lee','Ike','Joe','Vic','Lex'],targets:{Lee:{att:0,def:10},Ike:{att:0,def:10},Joe:{att:5,def:5},Vic:{att:10,def:0},Lex:{att:10,def:0}}}
  };

  let on=!!GM_Get(K_ON,false);
  let mode=String(GM_Get(K_MODE,'full_att')||'full_att');
  let autoEquip=!!GM_Get(K_EQUIP,true);
  let busy=false;
  let plannerManaged=false;
  let priorityMode=String(GM_Get(K_PRIORITY,'normal')||'normal');
  if(!/^(normal|strict)$/.test(priorityMode)) priorityMode='normal';
  let localCooldownUntil=0;
  let needsWork=GM_Get(K_NEEDS_WORK,null);
  needsWork=needsWork===null ? true : !!needsWork;
  let nextCheckAt=Math.max(0,Number(GM_Get(K_NEXT_CHECK,0))||0);
  let lastStatus='Gereed';
  let lastRouteHref=String(location.href);
  let lastRouteChangeAt=Date.now();
  const ROUTE_GRACE_MS=6500;

  function noteRouteChange(){
    const href=String(location.href);
    if(href!==lastRouteHref){
      lastRouteHref=href;
      lastRouteChangeAt=Date.now();
    }
    return Date.now()-lastRouteChangeAt;
  }

  function defaultCustom(){
    return Object.fromEntries(ALL.map(n=>[n,{use:n!=='Ray',att:5,def:5}]));
  }
  function loadCustom(){
    try { const x=JSON.parse(String(GM_Get(K_CUSTOM,'')||'')); return x&&typeof x==='object'?x:defaultCustom(); }
    catch(e){ return defaultCustom(); }
  }
  let custom=loadCustom();
  const clamp=n=>Math.max(0,Math.min(10,Math.floor(Number(n)||0)));
  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  const block=addBlock(`
    <h4>Bodyguard Trainer</h4>
    <div class="gm-row" style="gap:8px;align-items:center;">
      <button id="mrbBgToggle" class="gm-btn">${on?'Stop':'Start'}</button>
      <div id="mrbBgStatus" class="gm-status"></div>
    </div>
    <div style="margin-top:7px;">
      <label>Opstelling</label>
      <select id="mrbBgMode" style="width:100%;margin-top:3px;">
        <option value="full_att">Full Attack</option>
        <option value="full_def">Full Defense</option>
        <option value="three_two">3 Attack / 2 Defense</option>
        <option value="balanced">Gebalanceerd</option>
        <option value="custom">Custom</option>
      </select>
    </div>
    <label style="display:flex;gap:6px;align-items:center;margin-top:7px;">
      <input id="mrbBgEquip" type="checkbox" ${autoEquip?'checked':''}> Automatisch wapen/vest kopen
    </label>
    <div id="mrbBgCustom" style="margin-top:7px;"></div>
    <div class="gm-row" style="gap:7px;margin-top:7px;">
      <button id="mrbBgPriority" class="gm-btn"></button>
      <button id="mrbBgSave" class="gm-btn">Save</button>
    </div>
    <div id="mrbBgInfo" style="font-size:11px;opacity:.9;line-height:1.4;margin-top:7px;"></div>
  `,'03-bodyguard-trainer');

  const modeEl=block.querySelector('#mrbBgMode'); modeEl.value=mode;
  const customRoot=block.querySelector('#mrbBgCustom');

  function renderCustom(){
    customRoot.style.display=modeEl.value==='custom'?'':'none';
    customRoot.innerHTML=ALL.map(n=>{
      const x=custom[n]||{use:false,att:0,def:0};
      return `<div style="display:grid;grid-template-columns:42px 1fr 36px 1fr 36px;gap:4px;align-items:center;margin-top:4px;">
        <label><input data-bg-use="${n}" type="checkbox" ${x.use?'checked':''}> ${n}</label>
        <span>Aanval</span><input data-bg-att="${n}" type="number" min="0" max="10" value="${clamp(x.att)}" style="width:36px;">
        <span>Verd.</span><input data-bg-def="${n}" type="number" min="0" max="10" value="${clamp(x.def)}" style="width:36px;">
      </div>`;
    }).join('');
  }
  renderCustom();

  function save(){
    mode=modeEl.value;
    autoEquip=!!block.querySelector('#mrbBgEquip').checked;
    if(mode==='custom'){
      ALL.forEach(n=>custom[n]={
        use:!!block.querySelector(`[data-bg-use="${n}"]`)?.checked,
        att:clamp(block.querySelector(`[data-bg-att="${n}"]`)?.value),
        def:clamp(block.querySelector(`[data-bg-def="${n}"]`)?.value)
      });
    }
    GM_Set(K_MODE,mode); GM_Set(K_EQUIP,autoEquip); GM_Set(K_CUSTOM,JSON.stringify(custom)); GM_Set(K_PRIORITY,priorityMode);
    setWorkState(true,Date.now()); lastStatus='Instellingen opgeslagen'; syncPlanner(); paint();
  }

  function cfg(){
    if(mode!=='custom') return PRESETS[mode]||PRESETS.full_att;
    const lineup=ALL.filter(n=>custom[n]?.use);
    const targets={}; lineup.forEach(n=>targets[n]={att:clamp(custom[n].att),def:clamp(custom[n].def)});
    return {label:'Custom',lineup,targets};
  }
  function onPage(){
    return /module=Bodyguards/i.test(String(location.href)) || !!document.querySelector('.moduleBodyguards, input[name="bgtype"], input[name="action"][value="train_attack"]');
  }
  function navigate(){
    const path='/?module=Bodyguards';
    if(unsafeWindow.mrbNavigate?.(path,{source:'bodyguard-trainer'})) return true;
    try { unsafeWindow.omerta?.GUI?.container?.loadPage?.(path); return true; } catch(e){}
    location.hash='/?module=Bodyguards'; return true;
  }
  function level(name,stat,pts){
    const x=STATS[name]; if(!x) return 0;
    return clamp(Math.round((Number(pts)-(stat==='att'?x.attBase:x.defBase))/(stat==='att'?x.attPer:x.defPer)));
  }
  function readBar(id){
    const p=document.querySelector('#pgb-bar-'+id+' p');
    const m=clean(p?.textContent).match(/(\d+)\s*\/\s*(\d+)/); return m?Number(m[1]):0;
  }
  function readOwned(){
    const result={};
    document.querySelectorAll('#game_container h2,.moduleBodyguards h2').forEach(h=>{
      const m=clean(h.textContent).match(/^(Lee|Vic|Ike|Joe|Lex|Ray)\s*-\s*ID\s*(\d+)\s*-\s*Level\s*(\d+)/i);
      if(!m)return; const name=m[1][0].toUpperCase()+m[1].slice(1).toLowerCase(),id=m[2];
      let weapon=false,vest=false;
      document.querySelectorAll('form').forEach(f=>{
        if(f.querySelector('input[name="bgid"]')?.value!==String(id))return;
        const a=f.querySelector('input[name="action"]')?.value||'';
        const txt=clean(f.textContent).toLowerCase();
        const timer=!!f.querySelector('span[data-timecb="bodyguard"]');
        if(a==='buy_gun') weapon=/heeft een wapen|has a weapon/.test(txt)||timer||!f.querySelector('input[type="submit"]');
        if(a==='buy_vest') vest=/heeft een vest|has a vest/.test(txt)||timer||!f.querySelector('input[type="submit"]');
      });
      const ap=readBar('attack_'+name),dp=readBar('defense_'+name);
      const totalLevel=Math.max(0,Number(m[3])||0);
      result[name]={
        id,
        level:totalLevel,
        att:level(name,'att',ap),
        def:level(name,'def',dp),
        weapon,
        vest
      };
    }); return result;
  }
  function available(){ return [...document.querySelectorAll('input[name="bgtype"]')].map(x=>x.value); }
  function cooldownEnd(){
    const sp=document.querySelector('span[data-timecb="bodyguard"][data-time-end]');
    const sec=Number(sp?.getAttribute('data-time-end')||0); return Number.isFinite(sec)?sec*1000:0;
  }
  function remaining(){ return Math.max(0,Math.max(cooldownEnd(),localCooldownUntil)-Date.now()); }
  function formAction(id,action){
    return [...document.querySelectorAll('form')].find(f=>f.querySelector('input[name="bgid"]')?.value===String(id)&&f.querySelector('input[name="action"]')?.value===action);
  }
  function clickWithBgConfirm(button){
    if(!button)return false;
    const page=unsafeWindow;
    const oldConfirm=page.confirm;
    const oldConfirmAction=page.confirmAction;
    try{
      // De game gebruikt een native confirm bij trainen/aannemen. Alleen tijdens
      // deze ene BG-klik automatisch akkoord geven en daarna direct herstellen.
      page.confirm=()=>true;
      if(typeof oldConfirmAction==='function') page.confirmAction=()=>true;
      button.click();
      return true;
    }catch(e){
      return false;
    }finally{
      try{ page.confirm=oldConfirm; }catch(e){}
      try{ page.confirmAction=oldConfirmAction; }catch(e){}
    }
  }
  function clickAction(id,action){
    const f=formAction(id,action),b=f?.querySelector('input[type="submit"],button[type="submit"]');
    if(!b||b.disabled||f.querySelector('span[data-timecb="bodyguard"]'))return false;
    return clickWithBgConfirm(b);
  }
  function hire(name){
    const f=[...document.querySelectorAll('form')].find(x=>x.querySelector('input[name="bgtype"]')?.value===name);
    const b=f?.querySelector('input[type="button"][value^="Huur"],input[type="button"][value^="Hire"],input[type="submit"],button');
    return clickWithBgConfirm(b);
  }
  function nextAction(name,o,t){
    const m=META[name];
    if(autoEquip&&m?.vest&&!o.vest)return ['buy_vest','vest kopen'];
    if(autoEquip&&m?.weapon&&!o.weapon)return ['buy_gun','wapen kopen'];

    const targetAttack=clamp(t.att);
    const targetDefense=clamp(t.def);
    const currentAttack=Math.max(0,Number(o.att)||0);
    const currentDefense=Math.max(0,Number(o.def)||0);

    // Een enkel ingestelde richting is hard leidend. Hierdoor kan een BG met
    // 0 Aanval / 5 Verdediging nooit per ongeluk Aanval trainen, en andersom.
    if(targetAttack===0 && targetDefense>0){
      return currentDefense<targetDefense
        ? ['train_defense',`verdediging ${currentDefense}/${targetDefense}`]
        : null;
    }
    if(targetDefense===0 && targetAttack>0){
      return currentAttack<targetAttack
        ? ['train_attack',`aanval ${currentAttack}/${targetAttack}`]
        : null;
    }

    // Bij een gemengde instelling blijven Aanval en Verdediging afzonderlijke
    // doelen. Eerst ontbrekende Aanval, daarna ontbrekende Verdediging.
    if(currentAttack<targetAttack)return ['train_attack',`aanval ${currentAttack}/${targetAttack}`];
    if(currentDefense<targetDefense)return ['train_defense',`verdediging ${currentDefense}/${targetDefense}`];
    return null;
  }
  function fmt(ms){ const s=Math.ceil(ms/1000),m=Math.floor(s/60); return m?`${m}m ${s%60}s`:`${s}s`; }
  function setWorkState(work,nextAt=0){
    needsWork=!!work;
    nextCheckAt=Math.max(0,Number(nextAt)||0);
    GM_Set(K_NEEDS_WORK,needsWork);
    GM_Set(K_NEXT_CHECK,nextCheckAt);
  }
  function actionDue(){
    if(!on||!needsWork)return false;
    const due=Math.max(nextCheckAt, cooldownEnd(), localCooldownUntil);
    return Date.now()>=due;
  }
  function plannerPriority(){ return priorityMode==='strict'?99:74; }
  function nextDueAt(){
    if(!on) return Date.now()+15000;
    if(!needsWork) return Date.now()+15*60*1000;
    const due=Math.max(nextCheckAt, cooldownEnd(), localCooldownUntil);
    return due>Date.now() ? due : Date.now()+250;
  }
  function syncPlanner(){
    try {
      unsafeWindow.mrbV9Planner?.updateTask?.('v10-bodyguard-trainer',{
        enabled:!!on, priority:plannerPriority(), nextAt:nextDueAt(),
        status:priorityMode==='strict'?'BG prioriteit: stipt':'BG prioriteit: normaal'
      });
    } catch(e) {}
  }
  function paint(){
    block.querySelector('#mrbBgToggle').textContent=on?'Stop':'Start';
    block.querySelector('#mrbBgStatus').innerHTML=on?`<span class="ok">✅ Actief${plannerManaged?' — 🧭 Planner':''}</span>`:'<span class="bad">⛔ Uit</span>';
    const pr=block.querySelector('#mrbBgPriority');
    if(pr){
      pr.textContent=priorityMode==='strict'?'Prioriteit: STIPT':'Prioriteit: Normaal';
      pr.title=priorityMode==='strict'?'Bodyguards krijgen direct voorrang zodra trainen mogelijk is.':'Bodyguards draaien tussen andere geplande modules door.';
    }
    const wait=remaining();
    const ptxt=priorityMode==='strict'?'stipt':'normaal';
    const planState=!needsWork?'doelen bereikt':(actionDue()?'actie gereed':`gepland over ${fmt(Math.max(0,nextDueAt()-Date.now()))}`);
    block.querySelector('#mrbBgInfo').textContent=(wait?`${lastStatus} • volgende actie over ${fmt(wait)}`:lastStatus)+` • ${planState} • prioriteit: ${ptxt} • ontbrekende BGs: automatisch kopen • ontslaan: uit`;
  }

  async function tick(force=false){
    if((!on&&!force)||busy)return {delayMs:3000,status:'trainer niet actief of bezig'};
    if(typeof gm_isGateVisible==='function'&&gm_isGateVisible()){lastStatus='Pauze: '+(gm_gateReason?.()||'beveiligingscontrole');paint();return;}
    const routeAge=noteRouteChange();
    if(!onPage()){
      // Nooit alleen voor een statuscontrole naar Bodyguards navigeren. De pagina
      // wordt uitsluitend geopend wanneer uit de laatste BG-inspectie blijkt dat
      // er nog werk is en de training/aankoop werkelijk aan de beurt is.
      if(!actionDue()){
        lastStatus=needsWork?'Wachten tot BG-actie gereed is':'Geen BG-actie nodig';
        paint();
        return;
      }
      if(routeAge < ROUTE_GRACE_MS){
        lastStatus=`Andere module afronden (${fmt(ROUTE_GRACE_MS-routeAge)})`;
        paint();
        return;
      }
      lastStatus='Navigeren naar Bodyguards voor gereedstaande actie';paint();navigate();return;
    }
    const wait=remaining();
    if(wait>0){
      setWorkState(true,Date.now()+wait);
      lastStatus='Wachten op trainingstimer';paint();return;
    }
    const c=cfg(); if(!c.lineup.length){setWorkState(false,0);lastStatus='Geen bodyguards geselecteerd';paint();return;}
    busy=true;
    try{
      const owned=readOwned(),avail=available();
      for(const name of c.lineup){
        if(!owned[name]){
          if(avail.includes(name)&&hire(name)){
            lastStatus=`${name} wordt aangenomen`; GM_Set(K_LAST,Date.now()); localCooldownUntil=Date.now()+7000; setWorkState(true,localCooldownUntil); paint(); return;
          }
          lastStatus=`${name} ontbreekt, maar koopknop niet gevonden`; setWorkState(true,Date.now()+60000); paint(); continue;
        }
        const n=nextAction(name,owned[name],c.targets[name]);
        if(!n)continue;
        if(clickAction(owned[name].id,n[0])){
          lastStatus=`${name}: ${n[1]}`; GM_Set(K_LAST,Date.now()); localCooldownUntil=Date.now()+65000; setWorkState(true,localCooldownUntil); paint(); return;
        }
        lastStatus=`${name}: wacht op knop voor ${n[1]}`; setWorkState(true,Date.now()+15000); paint(); return;
      }
      setWorkState(false,0); lastStatus='Alle geselecteerde bodyguards hebben hun doel bereikt'; paint();
    } finally { await sleep(700); busy=false; }
  }

  async function plannerStep(context){
    if(!on){ try{ context?.releaseAction?.(); }catch(e){}; return {delayMs:15000,status:'Bodyguard Trainer staat uit'}; }
    if(busy){ try{ context?.touchAction?.(90_000); }catch(e){}; return {delayMs:1500,status:'Bodyguard actie bezig'}; }

    // Zolang geen echte BG-actie klaarstaat, blijft deze taak volledig passief.
    // Daardoor kan hij Crimes/Cars/Race niet meer door alleen navigatie storen.
    if(!onPage() && !actionDue()){
      try{ context?.releaseAction?.(); }catch(e){}
      return {nextAt:nextDueAt(),status:needsWork?'wacht op BG-timer':'geen BG-actie nodig'};
    }

    if(actionDue() && !context?.acquireAction?.(90_000)){
      return {delayMs:1000,status:'wacht op centrale actielock'};
    }

    await tick(false);
    const wait=remaining();
    if(wait>0){ try{ context?.releaseAction?.(); }catch(e){}; return {nextAt:Math.max(nextCheckAt,Date.now()+wait),status:`volgende BG-actie over ${fmt(wait)}`}; }
    if(!needsWork){ try{ context?.releaseAction?.(); }catch(e){}; return {nextAt:Date.now()+15*60*1000,status:'alle BG-doelen bereikt'}; }
    const routeAge=noteRouteChange();
    if(!onPage() && routeAge < ROUTE_GRACE_MS){
      return {delayMs:Math.max(750,ROUTE_GRACE_MS-routeAge),status:'andere module krijgt navigatierust'};
    }
    return {nextAt:nextDueAt(),status:lastStatus};
  }

  modeEl.addEventListener('change',()=>{mode=modeEl.value;renderCustom();save();});
  block.querySelector('#mrbBgPriority').addEventListener('click',()=>{
    priorityMode=priorityMode==='strict'?'normal':'strict';
    GM_Set(K_PRIORITY,priorityMode);
    lastStatus=priorityMode==='strict'?'Stipte prioriteit ingeschakeld':'Normale prioriteit ingeschakeld';
    syncPlanner(); paint();
  });
  block.querySelector('#mrbBgSave').addEventListener('click',save);
  block.querySelector('#mrbBgToggle').addEventListener('click',()=>{
    save(); on=!on; GM_Set(K_ON,on); if(on)setWorkState(true,Date.now()); lastStatus=on?'Trainer gestart':'Trainer gestopt'; syncPlanner(); paint(); if(on&&!plannerManaged)tick();
  });
  block.querySelector('#mrbBgEquip').addEventListener('change',save);
  paint();
  mrbSetInterval(()=>{
    paint();
    if(on&&!plannerManaged) tick();
  },3000);
})();

// =====================================================================
// MRB D&D TRADE ROUTE
// Controleert eerst alle smokkelvoorraad, berekent per stad de totale koop- of
// verkoopwaarde en kiest daarna de goedkoopste/hoogste totaalstad.
// =====================================================================
(function MRBDnDTradeRoute(){
  'use strict';

  const K_ON = 'mrb_dnd_trade_on';
  const K_PHASE = 'mrb_dnd_trade_phase'; // buy | sell
  const K_RUM = 'mrb_dnd_rum_amount';
  const K_COKE = 'mrb_dnd_coke_amount';
  const K_LAST_ACTION = 'mrb_dnd_last_action_ts';
  const K_NEXT_CHECK = 'mrb_dnd_next_price_check_ts';
  const K_PENDING_TARGET = 'mrb_dnd_pending_target_city';
  const K_PENDING_PHASE = 'mrb_dnd_pending_phase';
  const K_FLIGHT_NEXT = 'mrb_core_flight_next_ts';
  const K_FLIGHT_SYNC_AT = 'mrb_core_flight_sync_at';
  const K_FLIGHT_READY = 'mrb_core_flight_ready';
  const K_RETRY_AFTER = 'mrb_dnd_retry_after_flight_ts';
  const K_LAST_BUY_HOUR = 'mrb_dnd_last_successful_buy_hour';
  const K_HOUR_BUY_PENDING = 'mrb_dnd_hour_buy_pending_hour';
  const K_INVENTORY_SNAPSHOT = 'mrb_dnd_inventory_snapshot';
  const K_INVENTORY_SYNC_AT = 'mrb_dnd_inventory_sync_at';
  const INVENTORY_SYNC_MAX_AGE = 10 * 60 * 1000;
  const FLIGHT_SYNC_MAX_AGE = 45_000;

  let on = !!GM_Get(K_ON, false);
  let nextCheckTs = Number(GM_Get(K_NEXT_CHECK, 0)) || 0;
  let phase = String(GM_Get(K_PHASE, 'buy') || 'buy');
  if (!/^(buy|sell)$/.test(phase)) phase = 'buy';

  let rumAmount = Number(GM_Get(K_RUM, 40)) || 40;
  let cokeAmount = Number(GM_Get(K_COKE, 13)) || 13;

  let busy = false;
  let loopTimer = null;
  let plannerManaged = false;

  // v11.4: gezamenlijke Boozen/Travel Core-state en centrale actielease.
  let coreStage = 'IDLE';
  let coreTargetCity = String(GM_Get(K_PENDING_TARGET, '') || '') || null;
  let coreLastError = '';
  let coreTransactions = Number(GM_Get('mrb_dnd_core_transactions', 0)) || 0;
  let dndActionContext = null;
  let travelAuthorizationUntil = 0;
  let retryAfterFlightTs = Math.max(0, Number(GM_Get(K_RETRY_AFTER, 0)) || 0);
  const DND_ACTION_TTL = 150_000;

  function setCoreStage(stage, target=null, error=''){
    coreStage = String(stage || 'IDLE');
    if (target !== undefined) coreTargetCity = target;
    if (error) coreLastError = String(error);
  }
  function dndAcquireAction(context){
    if (!plannerManaged) return true;
    if (context) dndActionContext = context;
    try {
      if (dndActionContext?.touchAction?.(DND_ACTION_TTL)) return true;
      return !!dndActionContext?.acquireAction?.(DND_ACTION_TTL);
    } catch(e) { return false; }
  }
  function dndTouchAction(){
    if (!plannerManaged) return true;
    try { return !!dndActionContext?.touchAction?.(DND_ACTION_TTL); }
    catch(e) { return false; }
  }
  function dndReleaseAction(){
    try { dndActionContext?.releaseAction?.(); } catch(e) {}
    dndActionContext = null;
  }

  const CITY_TO_ID = {
    Detroit: 0,
    Chicago: 1,
    Palermo: 2,
    'New York': 3,
    'Las Vegas': 4,
    Philadelphia: 5,
    Baltimore: 6,
    Corleone: 7
  };

  const ID_TO_CITY = Object.fromEntries(Object.entries(CITY_TO_ID).map(([k,v]) => [v,k]));
  const CITY_NAMES = Object.keys(CITY_TO_ID);

  const block = addBlock(`
    <h4>D&D</h4>

    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="dndToggle" class="gm-btn">${on ? 'Stop' : 'Start'}</button>
      <div id="dndStatus" class="gm-status" style="margin:0;">
        ${on ? '<span class="ok">✅ Actief</span>' : '<span class="bad">⛔</span>'}
      </div>
    </div>

    <div class="gm-row" style="align-items:center;gap:6px;margin-top:7px;">
      <label style="width:62px;">Rum</label>
      <input id="dndRumAmount" type="number" min="0" max="999" step="1" value="${rumAmount}" style="width:70px;">
    </div>

    <div class="gm-row" style="align-items:center;gap:6px;margin-top:5px;">
      <label style="width:62px;">Cocaine</label>
      <input id="dndCokeAmount" type="number" min="0" max="999" step="1" value="${cokeAmount}" style="width:70px;">
    </div>

    <div class="gm-row" style="align-items:center;gap:8px;margin-top:7px;">
      <button id="dndSave" class="gm-btn">Save</button>
      <button id="dndResetPhase" class="gm-btn">Reset koop</button>
    </div>

    <div id="dndInfo" style="font-size:12px;opacity:.9;margin-top:6px;">
      Fase: ${phase === 'buy' ? 'kopen' : 'verkopen'}
    </div>
  `, '03-dnd-trade');

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function clean(s){ return String(s || '').replace(/\s+/g, ' ').trim(); }

  function hourKey(ts = Date.now()){
    const d = new Date(ts);
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    const h = String(d.getHours()).padStart(2,'0');
    return `${y}-${m}-${day}-${h}`;
  }

  function nextHourTs(from = Date.now()){
    const d = new Date(from);
    d.setMinutes(0, 5, 0);
    d.setHours(d.getHours() + 1);
    return d.getTime();
  }

  function boughtThisHour(){
    return String(GM_Get(K_LAST_BUY_HOUR, '') || '') === hourKey();
  }

  function ensureHourlyBuyObligation(){
    const current = hourKey();
    if (boughtThisHour()) {
      if (String(GM_Get(K_HOUR_BUY_PENDING, '') || '') === current) GM_Set(K_HOUR_BUY_PENDING, '');
      return false;
    }
    GM_Set(K_HOUR_BUY_PENDING, current);
    return true;
  }

  function hourlyBuyPending(){
    return ensureHourlyBuyObligation();
  }

  function markHourlyBuySuccess(){
    const current = hourKey();
    GM_Set(K_LAST_BUY_HOUR, current);
    GM_Set(K_HOUR_BUY_PENDING, '');
  }

  function inventoryBuyComplete(inventory){
    if (!inventory || inventory.total == null) return false;
    return Number(inventory.rum || 0) >= rumAmount && Number(inventory.cocaine || 0) >= cokeAmount;
  }

  function inventorySellComplete(inventory){
    return !!inventory && inventory.total != null && Number(inventory.total || 0) === 0;
  }

  function applyHourlyPriorityFromInventory(reason='uurkoopcontrole'){
    if (!hourlyBuyPending() || !onSmugglingPage()) return false;
    const inventory = readSmugglingInventory();
    if (inventory.total == null) return false;

    // Gedeeltelijke aankoop: behoud wat al gelukt is en koop uitsluitend het
    // ontbrekende product. Alleen een VOLLEDIGE oude voorraad wordt eerst verkocht.
    const completeStock = inventoryBuyComplete(inventory);
    const required = completeStock ? 'sell' : 'buy';
    if (phase !== required) {
      phase = required;
      GM_Set(K_PHASE, phase);
    }
    // De uurcontrole mag een reeds geplande :01/:31-wachttijd nooit wissen.
    coreLastError = '';
    if (required === 'buy') {
      const missRum = Math.max(0, rumAmount - Number(inventory.rum || 0));
      const missCoke = Math.max(0, cokeAmount - Number(inventory.cocaine || 0));
      ui(`${reason}: ontbreekt ${missRum} Rum / ${missCoke} Cocaine`);
    } else {
      ui(`${reason}: volledige oude voorraad eerst verkopen`);
    }
    return true;
  }

  // D&D mag handelen en reizen binnen twee veilige vensters per uur:
  // :01 t/m :27 en :31 t/m :57. Buiten deze vensters wordt gewacht.
  // Een reeds aangekomen transactie in de doelstad mag altijd worden afgerond.
  function dndTravelWindowState(ts = Date.now()){
    const d = new Date(ts);
    const minute = d.getMinutes();
    const allowed = (minute >= 1 && minute <= 27) || (minute >= 31 && minute <= 57);
    if (allowed) return { allowed:true, waitMs:0, nextAt:ts, label:'D&D-reisvenster open' };

    const next = new Date(d);
    next.setSeconds(0, 0);
    if (minute < 1) {
      next.setMinutes(1);
    } else if (minute <= 30) {
      next.setMinutes(31);
    } else {
      next.setHours(next.getHours() + 1);
      next.setMinutes(1);
    }
    const nextAt = next.getTime();
    return { allowed:false, waitMs:Math.max(1000, nextAt - ts), nextAt, label:`volgende D&D-controle om ${String(next.getHours()).padStart(2,'0')}:${String(next.getMinutes()).padStart(2,'0')}` };
  }

  function dndTravelWindowOpen(){
    return dndTravelWindowState().allowed;
  }

  function nextHalfHourTs(from = Date.now()){
    const d = new Date(from);
    d.setSeconds(0, 0);
    const m = d.getMinutes();

    // Volgende start van een toegestaan D&D-venster is :01 of :31.
    if (m < 1) {
      d.setMinutes(1);
    } else if (m < 31) {
      d.setMinutes(31);
    } else {
      d.setHours(d.getHours() + 1);
      d.setMinutes(1);
    }
    return d.getTime();
  }

  function formatWait(ms){
    ms = Math.max(0, ms || 0);
    const total = Math.ceil(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}m ${s}s`;
  }

  function scheduleNextPriceCheck(){
    nextCheckTs = nextHalfHourTs();
    GM_Set(K_NEXT_CHECK, nextCheckTs);
    return nextCheckTs;
  }

  function priceCheckDue(){
    return !nextCheckTs || Date.now() >= nextCheckTs;
  }

  function setRetryAfterFlight(waitMs, reason='vluchttimer loopt'){
    const safeWait = Math.max(5000, Number(waitMs) || syncedFlightWaitMs() || 60_000);
    const until = Date.now() + safeWait + 1500;
    if (until > retryAfterFlightTs) {
      retryAfterFlightTs = until;
      GM_Set(K_RETRY_AFTER, retryAfterFlightTs);
    }
    revokeTravelNavigation();
    coreLastError = `D&D hervat na vluchttimer: ${reason}`;
    return retryAfterFlightTs;
  }

  function clearExpiredFlightRetry(){
    if (retryAfterFlightTs && Date.now() >= retryAfterFlightTs) {
      retryAfterFlightTs = 0;
      GM_Set(K_RETRY_AFTER, 0);
    }
    return retryAfterFlightTs;
  }

  function flightRetryWaitMs(){
    clearExpiredFlightRetry();
    return Math.max(0, retryAfterFlightTs - Date.now());
  }

  function isTravelPath(path){
    return /(?:\?|#|&)module=Travel\b/i.test(String(path || ''));
  }

  function authorizeTravelNavigation(ms=12_000){
    travelAuthorizationUntil = Date.now() + Math.max(1000, Number(ms) || 0);
  }

  function revokeTravelNavigation(){
    travelAuthorizationUntil = 0;
  }

  function loadPage(path){
    // Centrale D&D-navigatiepoort. Travel vereist voortaan ALTIJD beide:
    // 1) een recente expliciete vluchtvrijgave en 2) een kortdurende autorisatie
    // van de huidige D&D-actie. Een oude autorisatie of verlopen next_ts is niet genoeg.
    if (isTravelPath(path)) {
      // Het :01/:31-schema bepaalt alleen wanneer een volledig nieuwe cyclus start.
      // Een reeds openstaande koop/verkoopactie mag direct door zodra de echte
      // vluchttimer vrij is. De centrale planner bezit op dit punt al de actielock.
      const flightState = getFlightState();
      if (!flightState.ready) {
        revokeTravelNavigation();
        setRetryAfterFlight(flightState.waitMs || syncedFlightWaitMs() || 60_000, flightState.reason);
        setCoreStage(flightState.fresh ? 'WAIT_TRAVEL_TIMER' : 'WAIT_TIMER_SYNC', coreTargetCity);
        coreLastError = `Travel geblokkeerd: ${flightState.reason}`;
        ui(flightState.fresh
          ? `reizen geblokkeerd; timer nog ${formatWait(flightState.waitMs || 1000)}`
          : 'reizen geblokkeerd tot verse Volgende vlucht = Nu-sync');
        return false;
      }
    }
    dndTouchAction();
    if (unsafeWindow.mrbNavigate?.(path,{source:'dnd'})) return true;
    try { unsafeWindow?.omerta?.GUI?.container?.loadPage?.(path); return true; } catch(e) {}
    if (path.startsWith('#')) location.hash = path.slice(1);
    else if (path.startsWith('/?')) location.href = '/index.php#' + path.slice(1);
    else location.hash = path;
    return true;
  }

  function ui(msg=''){
    const btn = block.querySelector('#dndToggle');
    const st = block.querySelector('#dndStatus');
    const info = block.querySelector('#dndInfo');

    if (btn) btn.textContent = on ? 'Stop' : 'Start';
    if (st) st.innerHTML = on
      ? `<span class="ok">✅ Actief${plannerManaged ? ' — 🧭 V9 Planner' : ''}</span>`
      : '<span class="bad">⛔</span>';

    if (info) {
      const phaseText = phase === 'buy' ? 'kopen' : 'verkopen';
      const waitText = (!priceCheckDue() && on) ? ` • volgende check over ${formatWait(nextCheckTs - Date.now())}` : '';
      const coreText = ` • Core: ${coreStage}${coreTargetCity ? ` → ${coreTargetCity}` : ''}`;
      const txText = ` • transacties: ${coreTransactions}`;
      const hourText = hourlyBuyPending() ? ` • uurkoop ${hourKey()}: OPEN` : ` • uurkoop ${hourKey()}: OK`;
      const errText = coreLastError ? ` • laatste fout: ${coreLastError}` : '';
      info.textContent = msg
        ? `Fase: ${phaseText} • ${msg}${coreText}${txText}${hourText}${errText}${waitText}`
        : `Fase: ${phaseText}${coreText}${txText}${hourText}${errText}${waitText}`;
    }
  }

  function saveSettings(){
    const r = block.querySelector('#dndRumAmount');
    const c = block.querySelector('#dndCokeAmount');

    rumAmount = Math.max(0, Math.floor(Number(r?.value || 0)));
    cokeAmount = Math.max(0, Math.floor(Number(c?.value || 0)));

    GM_Set(K_RUM, rumAmount);
    GM_Set(K_COKE, cokeAmount);

    if (r) r.value = rumAmount;
    if (c) c.value = cokeAmount;
    ui('opgeslagen');
  }

  function onTravelPage(){
    const h = String(location.href || '');
    const t = clean(document.querySelector('#game_container')?.innerText || document.body?.innerText || '');
    return /module=Travel/i.test(h) || /\bReis\b/i.test(t) && /Smokkel Prijzen/i.test(t);
  }

  function onSmugglingPage(){
    return /smuggling\.php/i.test(String(location.href || '')) ||
           !!document.querySelector('form[action*="smuggling.php"]');
  }

  function parseMoney(s){
    const n = Number(String(s || '').replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) ? n : null;
  }

  function getCurrentCity(){
    const selectors = [
      '.top-city-text a', '.top-city-text', '#top_city', '#cityname',
      '[class*="city"] a', '[class*="city"]'
    ];
    for (const selector of selectors){
      for (const el of Array.from(document.querySelectorAll(selector))){
        const txt = clean(el.textContent || '');
        const exact = CITY_NAMES.find(c => txt.toLowerCase() === c.toLowerCase());
        if (exact) return exact;
      }
    }
    const topText = clean(document.querySelector('#top, #header, header')?.innerText || '');
    const topHit = CITY_NAMES.find(c => new RegExp('(?:^|\\s)' + c.replace(' ', '\\s+') + '(?:\\s|$)', 'i').test(topText));
    return topHit || null;
  }

  function readTravelTimerText(){
    // Information page: travel timer often in second thinline table row 6.
    try {
      const $ = unsafeWindow.$ || unsafeWindow.jQuery;
      if ($) {
        const txt = $('.thinline:eq(1)>tbody>tr:eq(6)>td:eq(1)').text().trim();
        if (txt) return txt;
      }
    } catch(e) {}

    const t = clean(document.body?.innerText || '');
    const m = t.match(/\b(?:Reis|Travel)\b[^0-9A-Za-z]*(Nu|Now|\d+H(?:\s+\d+M)?(?:\s+\d+S)?|\d+M(?:\s+\d+S)?|\d+S)/i);
    return m ? m[1] : '';
  }

  function parseTimer(txt){
    txt = clean(txt);
    if (!txt || /^(Nu|Now)$/i.test(txt)) return 0;
    let total = 0;
    const h = txt.match(/(\d+)\s*H/i); if (h) total += Number(h[1]) * 3600;
    const m = txt.match(/(\d+)\s*M/i); if (m) total += Number(m[1]) * 60;
    const s = txt.match(/(\d+)\s*S/i); if (s) total += Number(s[1]);
    return total * 1000;
  }

  function syncedFlightWaitMs(){
    const ts = Number(GM_Get(K_FLIGHT_NEXT, 0)) || 0;
    return Math.max(0, ts - Date.now());
  }

  function getVisibleFlightState(){
    // De Travel-pagina toont de meest directe serverwaarheid. Zodra daar staat
    // "Je kunt weer reizen over ...", is reizen absoluut NIET beschikbaar, ook
    // wanneer een oudere achtergrond-sync nog ready=true bevat.
    try {
      if (onTravelPage()) {
        const travelText = clean((document.querySelector('#game_container') || document.body)?.innerText || '');
        const cooldown = travelText.match(/(?:je\s+kunt\s+weer\s+reizen\s+over|you\s+can\s+travel\s+again\s+in)\s*((?:\d+\s*H\s*)?(?:\d+\s*M\s*)?(?:\d+\s*S)?)/i);
        if (cooldown && clean(cooldown[1])) {
          const ms = Math.max(1000, parseTimer(cooldown[1]));
          const now = Date.now();
          GM_Set(K_FLIGHT_NEXT, now + ms);
          GM_Set(K_FLIGHT_SYNC_AT, now);
          GM_Set(K_FLIGHT_READY, false);
          revokeTravelNavigation();
          return { ready:false, fresh:true, waitMs:ms, reason:'zichtbare Travel-cooldown loopt' };
        }
        if (/(?:je\s+kunt\s+nu\s+reizen|you\s+can\s+travel\s+now)/i.test(travelText)) {
          const now = Date.now();
          GM_Set(K_FLIGHT_NEXT, now);
          GM_Set(K_FLIGHT_SYNC_AT, now);
          GM_Set(K_FLIGHT_READY, true);
          return { ready:true, fresh:true, waitMs:0, reason:'zichtbare Travel-pagina staat vrij' };
        }
      }
    } catch(_) {}

    // Wanneer Mijn account zichtbaar is, is die DOM-timer de meest actuele bron.
    // Werk de drie flight-keys altijd atomair bij, zodat een oude false-flag niet
    // naast een nieuwe next_ts kan blijven bestaan.
    try {
      for (const row of Array.from(document.querySelectorAll('tr'))) {
        const cells = Array.from(row.querySelectorAll('th,td'));
        if (cells.length < 2) continue;
        const label = clean(cells[0]?.textContent || '');
        if (!/volgende\s+(?:vlucht|reis)|next\s+(?:flight|travel)/i.test(label)) continue;
        const value = clean(cells[cells.length - 1]?.textContent || '');
        if (!value) continue;
        const ms = parseTimer(value);
        const now = Date.now();
        const ready = /^(?:Nu|Now)$/i.test(value) || ms <= 0;
        GM_Set(K_FLIGHT_NEXT, now + (ready ? 0 : Math.max(1000, ms)));
        GM_Set(K_FLIGHT_SYNC_AT, now);
        GM_Set(K_FLIGHT_READY, ready);
        return { ready, fresh:true, waitMs:ready ? 0 : Math.max(1000, ms), reason:ready ? 'zichtbare Volgende vlucht = Nu' : 'zichtbare vluchttimer loopt' };
      }
    } catch(_) {}
    return null;
  }

  function getFlightState(){
    const visible = getVisibleFlightState();
    if (visible) return visible;

    const now = Date.now();
    const syncAt = Number(GM_Get(K_FLIGHT_SYNC_AT, 0)) || 0;
    const rawReady = GM_Get(K_FLIGHT_READY, false);
    const readyFlag = rawReady === true || rawReady === 1 || rawReady === 'true' || rawReady === '1';
    const nextTs = Number(GM_Get(K_FLIGHT_NEXT, 0)) || 0;
    const waitMs = Math.max(0, nextTs - now);
    const fresh = syncAt > 0 && (now - syncAt) <= FLIGHT_SYNC_MAX_AGE;

    // Fail-closed: een verstreken next_ts is GEEN zelfstandige vrijgave meer.
    // Alleen de expliciete ready-flag uit een recente zichtbare/background sync
    // mag reizen openen. Zo kan een D&D-timer nooit worden verward met de vluchttimer.
    if (!fresh) return { ready:false, fresh:false, waitMs, reason:'vluchttimer-sync ontbreekt of is verouderd' };
    if (!readyFlag) return { ready:false, fresh:true, waitMs:Math.max(waitMs, 1000), reason:'Volgende vlucht staat nog niet expliciet op Nu' };
    if (waitMs > 1000) return { ready:false, fresh:true, waitMs, reason:'vluchttimer loopt' };
    return { ready:true, fresh:true, waitMs:0, reason:'expliciete Volgende vlucht = Nu-sync' };
  }

  function travelReady(){
    const state = getFlightState();
    if (!state.ready) {
      revokeTravelNavigation();
      return false;
    }
    return true;
  }

  function normalizeDnDText(value){
    return clean(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function canonicalTradeItem(value){
    const key = normalizeDnDText(value).replace(/[^a-z0-9]/g, '');
    const aliases = {
      cocaïne:'cocaine', cocaine:'cocaine',
      wijn:'wine', wine:'wine',
      whiskey:'whiskey', whisky:'whiskey',
      marihuana:'marijuana', marijuana:'marijuana',
      amaretto:'amaretto', cognac:'cognac',
      morphine:'morphine', morfine:'morphine',
      heroine:'heroine', heroïne:'heroine',
      opium:'opium', tabak:'tobacco', tobacco:'tobacco',
      lijm:'glue', glue:'glue',
      bier:'beer', beer:'beer', port:'port', rum:'rum'
    };
    return aliases[key] || key;
  }

  function readSmugglingPriceMatrix(){
    const root = document.querySelector('#game_container') || document.body;
    const matrix = {};
    const tradeItems = new Set(['morphine','heroine','opium','cocaine','tobacco','glue','marijuana','wine','rum','whiskey','beer','port','amaretto','cognac']);
    const tables = Array.from(root.querySelectorAll('table'));

    for (const table of tables){
      const rows = Array.from(table.querySelectorAll('tr'));
      if (!rows.length) continue;

      // De prijstabel bevat meerdere blokken in dezelfde tabel:
      // eerst drugs, daarna drank. Elke nieuwe kopregel moet daarom
      // de actieve kolomindeling vervangen.
      let headers = null;

      for (const row of rows){
        const cells = Array.from(row.querySelectorAll('th,td'));
        if (!cells.length) continue;

        const normalized = cells.map(cell => canonicalTradeItem(cell.textContent));
        const recognized = normalized.filter(key => tradeItems.has(key));
        if (recognized.length >= 3){
          headers = normalized;
          continue;
        }

        if (!headers || cells.length < 2) continue;
        const city = CITY_NAMES.find(name => normalizeDnDText(name) === normalizeDnDText(cells[0]?.textContent));
        if (!city) continue;

        matrix[city] ||= {};
        for (let col=1; col<Math.min(cells.length, headers.length); col++){
          const item = headers[col];
          if (!tradeItems.has(item)) continue;
          const price = parseMoney(cells[col]?.textContent || '');
          if (price != null && price > 0) matrix[city][item] = price;
        }
      }
    }
    return matrix;
  }

  function saveInventorySnapshot(inventory){
    if (!inventory || inventory.total == null) return;
    const compact = { total:Number(inventory.total || 0), rum:Number(inventory.rum || 0), cocaine:Number(inventory.cocaine || 0), items:{} };
    for (const [key,item] of Object.entries(inventory.items || {})){
      const canonical = canonicalTradeItem(item?.label || key);
      const amount = Math.max(0, Number(item?.amount || 0));
      if (canonical && amount > 0) compact.items[canonical] = (compact.items[canonical] || 0) + amount;
    }
    GM_Set(K_INVENTORY_SNAPSHOT, compact);
    GM_Set(K_INVENTORY_SYNC_AT, Date.now());
  }

  function getInventorySnapshot(){
    const syncedAt = Number(GM_Get(K_INVENTORY_SYNC_AT, 0)) || 0;
    const snapshot = GM_Get(K_INVENTORY_SNAPSHOT, null);
    if (!snapshot || !syncedAt || Date.now() - syncedAt > INVENTORY_SYNC_MAX_AGE) return null;
    return snapshot;
  }

  function chooseTarget(priceMatrix, inventorySnapshot=null){
    // De reisbestemming wordt uitsluitend bepaald door de Cocaineprijs.
    // Rum reist mee en wordt meegekocht/verkocht, maar heeft geen invloed
    // op de keuze van de goedkoopste of duurste stad.
    const scored = Object.keys(priceMatrix || {})
      .filter(city => CITY_TO_ID[city] != null)
      .map(city => ({
        city,
        cocainePrice: Number(priceMatrix[city]?.cocaine || 0)
      }))
      .filter(row => row.cocainePrice > 0);

    if (!scored.length) return null;
    scored.sort((a,b) => phase === 'buy'
      ? a.cocainePrice - b.cocainePrice
      : b.cocainePrice - a.cocainePrice);

    return {
      city: scored[0].city,
      total: scored[0].cocainePrice,
      cocainePrice: scored[0].cocainePrice
    };
  }

  function setPendingAction(city, actionPhase=phase){
    coreTargetCity = city || null;
    GM_Set(K_PENDING_TARGET, city || '');
    GM_Set(K_PENDING_PHASE, actionPhase || '');
  }

  function clearPendingAction(){
    coreTargetCity = null;
    GM_Set(K_PENDING_TARGET, '');
    GM_Set(K_PENDING_PHASE, '');
  }

  function getPendingAction(){
    const city = String(GM_Get(K_PENDING_TARGET, '') || '');
    const actionPhase = String(GM_Get(K_PENDING_PHASE, '') || '');
    return city && /^(buy|sell)$/.test(actionPhase) ? { city, phase:actionPhase } : null;
  }

  function readSmugglingInventory(){
    const root = document.querySelector('#game_container') || document.body;
    const rows = Array.from(root.querySelectorAll('table tr'));
    const inventory = { rum:0, cocaine:0, total:null, items:{} };
    let found = 0;

    for (const tr of rows){
      const cells = Array.from(tr.querySelectorAll('td, th')).map(td => clean(td.textContent));
      if (cells.length < 3) continue;

      const input = Array.from(tr.querySelectorAll('input')).find(el => {
        const type = String(el.type || '').toLowerCase();
        return !['radio','checkbox','submit','button','hidden'].includes(type);
      });
      if (!input) continue;

      const label = clean(cells[0] || '');
      const key = String(input.name || label || '').trim().toLowerCase();
      const held = parseMoney(cells[2]);
      if (!key || held == null) continue;

      const amount = Math.max(0, held);
      inventory.items[key] = { key, label, amount };
      found += 1;

      const item = label.toLowerCase();
      if (/^rum$/.test(item) || key === 'rum') inventory.rum = amount;
      if (/^coca[iï]ne$|^cocaine$/.test(item) || /^coca[iï]?ne$|^cocaine$/.test(key)) inventory.cocaine = amount;
    }

    if (found > 0){
      inventory.total = Object.values(inventory.items)
        .reduce((sum, item) => sum + Math.max(0, Number(item.amount || 0)), 0);
    }
    return inventory;
  }

  function syncPhaseFromInventory(reason='voorraadcontrole'){
    if (!onSmugglingPage()) return false;
    const inventory = readSmugglingInventory();
    if (inventory.total == null) return false;
    saveInventorySnapshot(inventory);

    // Iedere aanwezige drank- of drugsvoorraad wordt eerst verkocht. Dit voorkomt
    // dat overige buit de gedeelde draagcapaciteit blokkeert. Tijdens één
    // lopende deeltransactie blijft de fase ongewijzigd; bij een nieuwe run
    // bepaalt de werkelijk aanwezige voorraad opnieuw de veilige fase.
    let desired = phase;
    if (phase === 'buy' && Number(inventory.total || 0) > 0) desired = 'sell';
    if (phase === 'sell' && inventorySellComplete(inventory)) desired = 'buy';

    if (phase !== desired){
      phase = desired;
      GM_Set(K_PHASE, phase);
      nextCheckTs = 0;
      GM_Set(K_NEXT_CHECK, 0);
      coreLastError = '';
      ui(`${reason}: ${inventory.rum || 0} Rum / ${inventory.cocaine || 0} Cocaine → ${phase === 'sell' ? 'verkopen' : 'kopen'}`);
    }
    return true;
  }

  function clickCity(city){
    const wanted = normalizeDnDText(city);

    // Eerst op zichtbare stadsnaam zoeken. Dit is betrouwbaarder dan vaste IDs,
    // omdat de volgorde van steden per server/layout kan verschillen.
    const candidates = Array.from(document.querySelectorAll(
      'a[onclick*="onTravelData"], a[href*="CityId="], a[href*="city"], #game_container a'
    ));
    const byText = candidates.find(a => normalizeDnDText(a.textContent) === wanted);
    if (byText){
      try { byText.click(); return true; } catch(e) {
        try { byText.dispatchEvent(new MouseEvent('click', { bubbles:true, cancelable:true, view:window })); return true; } catch(e2) {}
      }
    }

    // Daarna het onclick-ID uit het element met de juiste afbeelding/naam halen.
    const cityContainer = Array.from(document.querySelectorAll('#game_container *')).find(el => {
      const text = normalizeDnDText(el.textContent);
      return text === wanted && el.closest('a,button,[onclick]');
    });
    const clickable = cityContainer?.closest('a,button,[onclick]');
    if (clickable){
      try { clickable.click(); return true; } catch(e) {}
    }

    // Alleen als laatste terugvallen op de bekende mapping.
    const id = CITY_TO_ID[city];
    if (id == null) return false;
    try {
      if (typeof unsafeWindow.onTravelData === 'function') {
        unsafeWindow.onTravelData(id);
        return true;
      }
    } catch(e) {}

    const a = document.querySelector(`a[onclick="onTravelData(${id});"]`) ||
              document.querySelector(`a[onclick^="onTravelData(${id})"]`) ||
              document.querySelector(`a[href*="CityId=${id}"]`);
    if (!a) return false;
    try { a.click(); return true; } catch(e) {
      try { a.dispatchEvent(new MouseEvent('click', { bubbles:true, cancelable:true, view:window })); return true; } catch(e2) {}
    }
    return false;
  }

  function promptOpen(){
    return !!document.querySelector('.jqi');
  }

  function findTravelButton(){
    return document.querySelector('button[name="jqi_state0_buttonTravel"][value="true"]') ||
           document.querySelector('.jqi .jqibuttons button[name="jqi_state0_buttonTravel"]') ||
           Array.from(document.querySelectorAll('button.jqibutton, .jqibuttons button, button.btn, button'))
             .find(b => /travel|reis/i.test(clean(b.textContent || b.value || ''))) ||
           null;
  }

  async function travelTo(city){
    setCoreStage('TRAVEL_TO_CITY', city);
    dndTouchAction();
    ui('reis naar ' + city);

    if (!travelReady()) return false;
    authorizeTravelNavigation();
    if (!onTravelPage()) {
      if (!loadPage('/?module=Travel')) return false;
      await sleep(1800);
    }

    if (!onTravelPage()) return false;

    // Herlees de zichtbare Travel-cooldown vlak voor de stadklik. Dit voorkomt
    // dat een verouderde ready=true tussen plannercheck en navigatie doorslipt.
    const visibleGate = getVisibleFlightState();
    if (visibleGate && !visibleGate.ready) {
      revokeTravelNavigation();
      setRetryAfterFlight(visibleGate.waitMs || 60_000, visibleGate.reason || 'zichtbare Travel-cooldown');
      setCoreStage('WAIT_TRAVEL_TIMER', city);
      ui(`wacht op reistimer ~${Math.max(1, Math.ceil(visibleGate.waitMs/60000))}m`);
      return false;
    }

    if (getCurrentCity() === city) return true;

    if (!clickCity(city)) {
      await sleep(800);
      if (!clickCity(city)) return false;
    }

    let confirmed = false;
    for (let i=0; i<40; i++){
      const btn = findTravelButton();
      if (btn) {
        try { btn.click(); } catch(e) {
          try { btn.dispatchEvent(new MouseEvent('click', { bubbles:true, cancelable:true, view:window })); } catch(e2) {}
        }
        dndTouchAction();
        confirmed = true;
        break;
      }
      await sleep(250);
      dndTouchAction();
    }

    if (!confirmed) {
      coreLastError = 'reisbevestiging niet gevonden';
      setCoreStage('ERROR', city, coreLastError);
      return false;
    }

    setCoreStage('WAIT_TRAVEL', city);
    for (let i=0; i<24; i++){
      await sleep(250);
      dndTouchAction();
      const current = getCurrentCity();
      if (current === city) {
        revokeTravelNavigation();
        const now = Date.now();
        GM_Set(K_FLIGHT_READY, false);
        GM_Set(K_FLIGHT_SYNC_AT, now);
        GM_Set(K_FLIGHT_NEXT, now + 30 * 60 * 1000);
        retryAfterFlightTs = now + 30 * 60 * 1000 + 1500;
        GM_Set(K_RETRY_AFTER, retryAfterFlightTs);
        return true;
      }
      // Na een succesvolle SPA-navigatie kan de Travel-pagina verdwijnen voordat
      // de headerstad is bijgewerkt. Dat geldt eveneens als bevestiging.
      if (!onTravelPage() && i >= 4) {
        revokeTravelNavigation();
        const now = Date.now();
        GM_Set(K_FLIGHT_READY, false);
        GM_Set(K_FLIGHT_SYNC_AT, now);
        GM_Set(K_FLIGHT_NEXT, now + 30 * 60 * 1000);
        retryAfterFlightTs = now + 30 * 60 * 1000 + 1500;
        GM_Set(K_RETRY_AFTER, retryAfterFlightTs);
        return true;
      }
    }

    coreLastError = 'reis niet bevestigd';
    setCoreStage('ERROR', city, coreLastError);
    return false;
  }

  function setInput(el, value){
    if (!el) return false;
    const v = String(Math.max(0, Math.floor(Number(value) || 0)));
    try { el.focus(); } catch(e) {}
    try {
      const proto = Object.getPrototypeOf(el);
      const desc = Object.getOwnPropertyDescriptor(proto, 'value');
      if (desc?.set) desc.set.call(el, v);
      else el.value = v;
    } catch(e) { el.value = v; }
    try { el.dispatchEvent(new Event('input', { bubbles:true })); } catch(e) {}
    try { el.dispatchEvent(new Event('change', { bubbles:true })); } catch(e) {}
    try { el.blur(); } catch(e) {}
    return String(el.value || '') === v;
  }

  function findTradeRow(labelRe){
    const root = document.querySelector('#game_container') || document.body;
    return Array.from(root.querySelectorAll('tr')).find(tr => {
      const first = clean(tr.querySelector('td,th')?.textContent || '');
      return labelRe.test(first);
    }) || null;
  }

  function findTradeInput(labelRe, legacyName){
    const root = document.querySelector('#game_container') || document.body;
    const named = legacyName ? root.querySelector(`input[name="${legacyName}"]`) : null;
    if (named) return named;
    const row = findTradeRow(labelRe);
    if (!row) return null;
    return Array.from(row.querySelectorAll('input')).find(el => {
      const type = String(el.type || '').toLowerCase();
      return !['radio','checkbox','submit','button','hidden'].includes(type);
    }) || null;
  }

  function findSmugglingForm(){
    const root = document.querySelector('#game_container') || document.body;
    const submit = Array.from(root.querySelectorAll('button, input[type="button"], input[type="submit"]'))
      .find(b => /Koop\/Verkoop|Buy\/Sell|Kopen|Verkopen/i.test(clean(b.value || b.textContent || '')));
    return document.querySelector('form[action="smuggling.php"], form[action*="smuggling.php"]') ||
           findTradeInput(/^rum$/i, 'rum')?.closest('form') ||
           findTradeInput(/^coca[iï]ne$|^cocaine$/i, 'cocaine')?.closest('form') ||
           submit?.closest('form') || null;
  }

  function setRadioChecked(radio){
    if (!radio) return false;
    try { radio.click(); } catch(e) {}
    if (!radio.checked) {
      try {
        const proto = Object.getPrototypeOf(radio);
        const desc = Object.getOwnPropertyDescriptor(proto, 'checked');
        if (desc?.set) desc.set.call(radio, true);
        else radio.checked = true;
      } catch(e) { radio.checked = true; }
      try { radio.dispatchEvent(new Event('input', { bubbles:true })); } catch(e) {}
      try { radio.dispatchEvent(new Event('change', { bubbles:true })); } catch(e) {}
    }
    return !!radio.checked;
  }

  function setBuySellMode(mode){
    // Werkelijke Barafranca-formulierstructuur (bevestigd via DevTools):
    // drankgroep: name=typebooze, values buybooze/sellbooze
    // drugsgroep: name=typedrugs, values buydrugs/selldrugs
    const wanted = mode === 'buy'
      ? [
          ['typebooze', 'buybooze'],
          ['typedrugs', 'buydrugs']
        ]
      : [
          ['typebooze', 'sellbooze'],
          ['typedrugs', 'selldrugs']
        ];

    let selected = 0;
    for (const [name, value] of wanted){
      const radio = document.querySelector(`input[type="radio"][name="${name}"][value="${value}"]`);
      if (!radio) continue;

      // Zet eerst de hele echte radiogroep leeg en activeer daarna exact
      // de waarde die de server verwacht.
      document.querySelectorAll(`input[type="radio"][name="${name}"]`).forEach(other => {
        if (other !== radio){
          try { other.checked = false; } catch(e) {}
        }
      });

      if (setRadioChecked(radio)) selected += 1;
    }

    return selected === 2;
  }

  function buildTradePlan(inventory){
    inventory = inventory || {rum:0,cocaine:0,total:0,items:{}};
    if (phase === 'buy') {
      return {
        mode:'buy',
        rum: Math.max(0, rumAmount - Number(inventory.rum || 0)),
        cocaine: Math.max(0, cokeAmount - Number(inventory.cocaine || 0)),
        items:{}
      };
    }

    const items = {};
    for (const [key, item] of Object.entries(inventory.items || {})){
      const amount = Math.max(0, Number(item?.amount || 0));
      if (amount > 0) items[key] = { key, label:item?.label || key, amount };
    }
    return { mode:'sell', rum:0, cocaine:0, items };
  }

  function tradePlanTotal(plan){
    if (!plan) return 0;
    if (plan.mode === 'sell') {
      return Object.values(plan.items || {}).reduce((sum, item) => sum + Math.max(0, Number(item?.amount || 0)), 0);
    }
    return Math.max(0, Number(plan.rum || 0)) + Math.max(0, Number(plan.cocaine || 0));
  }

  function tradePlanDescription(plan){
    if (!plan) return 'geen voorraad';
    if (plan.mode === 'sell') {
      const parts = Object.values(plan.items || {})
        .filter(item => Number(item?.amount || 0) > 0)
        .map(item => `${item.amount} ${item.label}`);
      return parts.length ? parts.join(' / ') : 'geen voorraad';
    }
    return `${Number(plan.rum || 0)} Rum / ${Number(plan.cocaine || 0)} Cocaine`;
  }

  function tradePlanComplete(plan){
    return tradePlanTotal(plan) === 0;
  }

  function fillSmugglingAmounts(plan=null){
    const actualPlan = plan || buildTradePlan(readSmugglingInventory());
    const root = document.querySelector('#game_container') || document.body;
    const allInputs = Array.from(root.querySelectorAll('table tr input')).filter(el => {
      const type = String(el.type || '').toLowerCase();
      return !['radio','checkbox','submit','button','hidden'].includes(type);
    });
    if (!allInputs.length) return false;

    // Eerst alle velden leegmaken, zodat nooit een oud aantal wordt meegestuurd.
    let fieldsOk = true;
    allInputs.forEach(input => { if (!setInput(input, 0)) fieldsOk = false; });

    const modeOk = setBuySellMode(phase);
    if (actualPlan.mode === 'sell') {
      for (const item of Object.values(actualPlan.items || {})){
        const input = allInputs.find(el => String(el.name || '').toLowerCase() === String(item.key).toLowerCase()) ||
          findTradeInput(/^$a/, item.key);
        if (!input || !setInput(input, item.amount)) fieldsOk = false;
      }
      return modeOk && fieldsOk;
    }

    const rum = findTradeInput(/^rum$/i, 'rum');
    const coke = findTradeInput(/^coca[iï]ne$|^cocaine$/i, 'cocaine');
    if (!rum || !coke) return false;
    return modeOk && fieldsOk && setInput(rum, actualPlan.rum) && setInput(coke, actualPlan.cocaine);
  }

  function findSmugglingSubmit(){
    const form = findSmugglingForm();
    const root = form || document.querySelector('#game_container') || document.body;
    const controls = Array.from(root.querySelectorAll(
      'button, input[type="button"], input[type="submit"], input[type="image"], a[onclick], a.button, a.btn'
    )).filter(el => !el.disabled && el.getAttribute('aria-disabled') !== 'true');

    // Eerst expliciete koop/verkoopknoppen, daarna de eerste echte submit in het smokkel-formulier.
    return controls.find(el => /koop\s*\/?\s*verkoop|buy\s*\/?\s*sell|\bkopen\b|\bverkopen\b/i.test(
      clean((el.value || '') + ' ' + (el.textContent || '') + ' ' + (el.title || '') + ' ' + (el.alt || '') + ' ' + (el.name || ''))
    )) || controls.find(el => {
      const type = String(el.type || '').toLowerCase();
      return type === 'submit' || type === 'image';
    }) || null;
  }

  function fireMouseSequence(el){
    if (!el) return false;
    try { el.scrollIntoView({block:'center', inline:'center'}); } catch(e) {}
    try { el.focus({preventScroll:true}); } catch(e) { try { el.focus(); } catch(_) {} }
    try {
      for (const type of ['pointerdown','mousedown','pointerup','mouseup','click']) {
        const Ctor = type.startsWith('pointer') && typeof PointerEvent === 'function' ? PointerEvent : MouseEvent;
        el.dispatchEvent(new Ctor(type, { bubbles:true, cancelable:true, composed:true, view:window, button:0, buttons:type.endsWith('down')?1:0 }));
      }
      return true;
    } catch(e) { return false; }
  }

  function clickSmugglingSubmit(attempt=1){
    const form = findSmugglingForm();
    const btn = findSmugglingSubmit();
    if (!btn || btn.disabled || btn.getAttribute('aria-disabled') === 'true') return false;

    try { btn.scrollIntoView({block:'center', inline:'center'}); } catch(e) {}
    try { btn.focus({preventScroll:true}); } catch(e) { try { btn.focus(); } catch(_) {} }

    // Niet iedere Barafranca-layout verwerkt HTMLElement.click() hetzelfde.
    // Gebruik daarom per deelpoging precies één andere verzendmethode. Zo
    // ontstaat geen dubbele aankoop, maar kan een genegeerde synthetische klik
    // bij de volgende poging wel betrouwbaar worden hersteld.
    if (attempt <= 1) {
      try { btn.click(); return true; } catch(e) {}
    }

    if (attempt === 2) {
      try { return fireMouseSequence(btn); } catch(e) {}
    }

    try {
      if (form?.requestSubmit && /^(submit|image)$/i.test(String(btn.type || ''))){
        form.requestSubmit(btn);
        return true;
      }
    } catch(e) {}

    // Laatste fallback voor formulieren met een normale submitknop maar zonder
    // werkende requestSubmit-implementatie.
    try {
      if (form) {
        const ev = new Event('submit', {bubbles:true, cancelable:true});
        if (form.dispatchEvent(ev)) {
          HTMLFormElement.prototype.submit.call(form);
          return true;
        }
      }
    } catch(e) {}

    return false;
  }

  function inventorySignature(inv){
    if (!inv || inv.total == null) return null;
    return Object.entries(inv.items || {})
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([key,item]) => `${key}:${Math.max(0, Number(item?.amount || 0))}`)
      .join('|');
  }

  async function waitForInventoryChange(beforeSig, timeoutMs=10000){
    const started = Date.now();
    while (Date.now() - started < timeoutMs){
      dndTouchAction();
      await sleep(400);
      const sig = inventorySignature(readSmugglingInventory());
      if (sig != null && sig !== beforeSig) return true;
    }
    return false;
  }

  async function waitForSmugglingForm(timeoutMs = 12000){
    const started = Date.now();
    let lastNavigate = 0;

    while (Date.now() - started < timeoutMs){
      dndTouchAction();

      if (onSmugglingPage() && findSmugglingForm()) return true;

      // Barafranca NL laadt Smokkelen via een hash-route. Na een reis kan
      // location.href al aangepast zijn terwijl het formulier nog niet bestaat.
      if (Date.now() - lastNavigate > 2500){
        lastNavigate = Date.now();
        loadPage('/smuggling.php');
      }

      await sleep(400);
    }

    return onSmugglingPage() && !!findSmugglingForm();
  }

  async function doSmugglingAction(){
    setCoreStage(phase === 'buy' ? 'BUY' : 'SELL', coreTargetCity);
    dndTouchAction();

    if (!(await waitForSmugglingForm(15000))){
      coreLastError = 'Smokkelen-formulier niet geladen na reis';
      setCoreStage('ERROR', coreTargetCity, coreLastError);
      ui('Smokkelen wordt opnieuw geprobeerd');
      return false;
    }

    syncPhaseFromInventory('voorraad na reis');
    const completedPhase = phase;

    // Maximaal drie deelpogingen in dezelfde stad. Na iedere submit wordt de
    // echte voorraad opnieuw gelezen en worden alleen de nog ontbrekende
    // Rum/Cocaine-aantallen opnieuw ingevuld.
    for (let attempt=1; attempt<=3; attempt++){
      dndTouchAction();
      const beforeInventory = readSmugglingInventory();
      saveInventorySnapshot(beforeInventory);
      const plan = buildTradePlan(beforeInventory);

      if (tradePlanComplete(plan)) break;

      setCoreStage(completedPhase === 'buy' ? 'BUY_PARTIAL' : 'SELL_PARTIAL', coreTargetCity,
        `${tradePlanDescription(plan)} resterend`);
      ui(`${completedPhase === 'buy' ? 'kopen' : 'verkopen'}: nog ${tradePlanDescription(plan)}`);

      if (!fillSmugglingAmounts(plan)){
        await sleep(800);
        dndTouchAction();
        if (!fillSmugglingAmounts(plan)) {
          coreLastError = 'Smokkel-invoervelden niet beschikbaar';
          setCoreStage('ERROR', coreTargetCity, coreLastError);
          return false;
        }
      }

      await sleep(500);
      const beforeSig = inventorySignature(beforeInventory);
      if (!clickSmugglingSubmit(attempt)) {
        coreLastError = 'Koop/Verkoop-knop kon niet worden geactiveerd';
        setCoreStage('ERROR', coreTargetCity, coreLastError);
        return false;
      }

      dndTouchAction();
      const changed = await waitForInventoryChange(beforeSig, 15000);
      if (!changed) {
        if (attempt < 3) {
          ui(`deeltransactie ${attempt} niet bevestigd; alleen ontbrekende product opnieuw proberen`);
          await sleep(900);
          continue;
        }
        coreLastError = 'Knop geklikt, maar voorraad veranderde niet';
        setCoreStage('ERROR', coreTargetCity, coreLastError);
        return false;
      }

      coreTransactions += 1;
      GM_Set('mrb_dnd_core_transactions', coreTransactions);
      await sleep(700);
    }

    const finalInventory = readSmugglingInventory();
    saveInventorySnapshot(finalInventory);
    const fullyCompleted = completedPhase === 'buy'
      ? inventoryBuyComplete(finalInventory)
      : inventorySellComplete(finalInventory);

    if (!fullyCompleted) {
      const remain = buildTradePlan(finalInventory);
      coreLastError = `deeltransactie open: ${tradePlanDescription(remain)}`;
      setCoreStage(completedPhase === 'buy' ? 'BUY_PARTIAL' : 'SELL_PARTIAL', coreTargetCity, coreLastError);
      ui(`${completedPhase === 'buy' ? 'koop' : 'verkoop'} deels gelukt; alleen ontbrekende product blijft open`);
      return false;
    }

    GM_Set(K_LAST_ACTION, Date.now());
    coreLastError = '';
    if (completedPhase === 'buy') markHourlyBuySuccess();
    syncPhaseFromInventory('voorraad na volledige transactie');

    if (completedPhase === 'sell' && hourlyBuyPending()) {
      nextCheckTs = 0;
      GM_Set(K_NEXT_CHECK, 0);
      phase = 'buy';
      GM_Set(K_PHASE, phase);
      ui('volledig verkocht; uurkoop blijft open tot beide producten gekocht zijn');
    } else {
      scheduleNextPriceCheck();
      ui(completedPhase === 'buy'
        ? 'Rum en Cocaine volledig gekocht; uurkoop bevestigd'
        : 'Alle aanwezige drank en drugs volledig verkocht; wacht op volgende prijswissel');
    }

    setCoreStage('RETURN', coreTargetCity);
    await sleep(1500);
    dndTouchAction();
    return true;
  }

  async function readPricesAndAct(){
    dndTouchAction();

    const pending = getPendingAction();
    if (pending){
      phase = pending.phase;
      GM_Set(K_PHASE, phase);
      coreTargetCity = pending.city;
      const current = getCurrentCity();

      // Een nieuwe vluchttimer ontstaat direct na aankomst. Die timer mag alleen
      // een VOLGENDE reis blokkeren, nooit de koop/verkoop in de doelstad waar
      // het account zojuist is aangekomen.
      if (current && current === pending.city){
        clearExpiredFlightRetry();
        setCoreStage('RESUME_TRANSACTION', pending.city);
        const actionOk = await doSmugglingAction();
        if (actionOk) clearPendingAction();
        return;
      }

      // Als de headerstad tijdens een SPA-overgang tijdelijk leeg is, probeer
      // eerst het Smokkelen-formulier. Is dat formulier aanwezig, dan bevinden
      // we ons functioneel al in de aangekomen stad en mag de transactie door.
      if (!current && onSmugglingPage() && findSmugglingForm()){
        clearExpiredFlightRetry();
        setCoreStage('RESUME_TRANSACTION', pending.city);
        const actionOk = await doSmugglingAction();
        if (actionOk) clearPendingAction();
        return;
      }

      const retryWait = flightRetryWaitMs();
      if (retryWait > 0) {
        setCoreStage('WAIT_TRAVEL_TIMER', pending.city);
        ui(`openstaande ${pending.phase === 'sell' ? 'verkoop' : 'koop'} wacht op reistimer ~${Math.max(1, Math.ceil(retryWait/60000))}m`);
        return;
      }
      const windowState = dndTravelWindowState();
      if (!windowState.allowed) {
        revokeTravelNavigation();
        setCoreStage('WAIT_TRAVEL_WINDOW', pending.city);
        ui(`${windowState.label}; openstaande ${pending.phase === 'sell' ? 'verkoop' : 'koop'} blijft bewaard`);
        return;
      }
      setCoreStage('RESUME_TRAVEL', pending.city);
      if (travelReady()) await travelTo(pending.city);
      return;
    }

    setCoreStage('CHECK_PRICES', null);
    const windowState = dndTravelWindowState();
    if (!windowState.allowed) {
      revokeTravelNavigation();
      setCoreStage('WAIT_TRAVEL_WINDOW', coreTargetCity);
      ui(`${windowState.label}; prijscontrole/reis wordt uitgesteld`);
      return;
    }
    const flightState = getFlightState();
    if (!flightState.ready) {
      revokeTravelNavigation();
      setRetryAfterFlight(flightState.waitMs || syncedFlightWaitMs() || 60_000, flightState.reason);
      setCoreStage('WAIT_TRAVEL_TIMER', coreTargetCity);
      ui(flightState.fresh
        ? `wacht op reistimer ~${Math.max(1, Math.ceil(flightState.waitMs/60000))}m`
        : 'wacht op verse vluchttimer-sync');
      return;
    }
    authorizeTravelNavigation();

    // Voordat een nieuwe stad wordt gekozen, moet de actuele VOLLEDIGE
    // smokkelvoorraad bekend zijn. Dit vangt ook andere buit en items af.
    // Een verouderde of ontbrekende snapshot mag nooit een koopreis starten.
    let inventorySnapshot = getInventorySnapshot();
    if (!inventorySnapshot){
      revokeTravelNavigation();
      setCoreStage('CHECK_INVENTORY', null);
      if (!onSmugglingPage() || !findSmugglingForm()){
        ui('eerst volledige smokkelvoorraad controleren');
        loadPage('/smuggling.php');
        return;
      }
      const liveInventory = readSmugglingInventory();
      if (liveInventory.total == null){
        ui('voorraad nog niet leesbaar');
        return;
      }
      saveInventorySnapshot(liveInventory);
      inventorySnapshot = getInventorySnapshot();
      const desiredPhase = Number(liveInventory.total || 0) > 0 ? 'sell' : 'buy';
      if (phase !== desiredPhase){
        phase = desiredPhase;
        GM_Set(K_PHASE, phase);
      }
      nextCheckTs = 0;
      GM_Set(K_NEXT_CHECK, 0);
      ui(Number(liveInventory.total || 0) > 0 ? 'voorraad gevonden: eerst alles verkopen' : 'geen voorraad: kooproute bepalen');
      loadPage('/?module=Travel');
      return;
    }

    if (phase === 'sell' && Number(inventorySnapshot.total || 0) <= 0){
      phase = 'buy'; GM_Set(K_PHASE, phase);
    } else if (phase === 'buy' && Number(inventorySnapshot.total || 0) > 0){
      phase = 'sell'; GM_Set(K_PHASE, phase);
    }

    if (!onTravelPage()){
      if (!loadPage('/?module=Travel')) return;
      await sleep(2000);
    }

    const priceMatrix = readSmugglingPriceMatrix();
    if (!Object.keys(priceMatrix).length){
      coreLastError = 'smokkelprijzen niet leesbaar';
      setCoreStage('ERROR', null, coreLastError);
      ui('kan smokkelprijzen niet lezen');
      await sleep(5000);
      return;
    }

    inventorySnapshot = inventorySnapshot || getInventorySnapshot();
    const target = chooseTarget(priceMatrix, inventorySnapshot);
    if (!target){
      coreLastError = phase === 'sell' ? 'geen complete prijsdekking voor voorraad' : 'geen complete prijsdekking voor kooplijst';
      setCoreStage('ERROR', null, coreLastError);
      ui(coreLastError);
      await sleep(5000);
      return;
    }

    setPendingAction(target.city, phase);
    const actionText = phase === 'buy' ? 'laagste Cocaineprijs' : 'hoogste Cocaineprijs';
    ui(`${actionText}: ${target.city} ($${Math.round(target.cocainePrice).toLocaleString('en-US')})`);

    const current = getCurrentCity();

    if (current !== target.city){
      if (!travelReady()){
        const wait = syncedFlightWaitMs() || parseTimer(readTravelTimerText()) || 60_000;
        setRetryAfterFlight(wait, 'doelstad voor koop/verkoop nog niet bereikbaar');
        setCoreStage('WAIT_TRAVEL_TIMER', target.city);
        ui(`wacht op reistimer ~${Math.ceil(wait/60000)}m`);
        return;
      }

      const okTravel = await travelTo(target.city);
      if (!okTravel){
        coreLastError = 'reizen mislukt';
        setCoreStage('ERROR', target.city, coreLastError);
        ui('reizen mislukt, retry');
        await sleep(5000);
        return;
      }

      // Geef de SPA tijd om de nieuwe stad en reisbevestiging te verwerken,
      // maar houd de volledige D&D-transactie onder dezelfde actielease.
      setCoreStage('OPEN_SMUGGLING', target.city);
      await sleep(1200);
      dndTouchAction();
    }

    const actionOk = await doSmugglingAction();
    if (actionOk) clearPendingAction();
    if (!actionOk && coreStage !== 'ERROR') {
      coreLastError = 'koop/verkoopactie niet uitgevoerd';
      setCoreStage('ERROR', target.city, coreLastError);
    }
  }

  async function loop(){
    if (!on || busy) return;
    busy = true;

    try {
      // De zichtbare voorraad op Smokkelen is altijd leidend boven een oude opgeslagen fase.
      syncPhaseFromInventory('voorraad herkend');
      ensureHourlyBuyObligation();
      applyHourlyPriorityFromInventory('uurkoopcontrole');
      if (typeof gm_isGateVisible === 'function' && gm_isGateVisible()){
        ui('pauze gate/captcha');
        await sleep(5000);
        return;
      }

      // Nieuwe logica:
      // Na succesvolle koop/verkoop wachten tot de volgende prijswissel (:00 of :30).
      // Tijdens wachten niet naar Smokkelen blijven navigeren.
      if (!priceCheckDue()){
        // Tijdens de wachttijd nooit zelf naar D&D/Smokkelen navigeren.
        // Alleen wanneer de gebruiker daar al staat mag de zichtbare voorraad worden gelezen.
        if (onSmugglingPage()) syncPhaseFromInventory('voorraad voor wachttijd');
        // Na een succesvolle koop staat fase al op sell, maar de geplande
        // prijs-/vluchtwachttijd moet gewoon blijven gelden. Alleen wanneer er
        // helemaal geen geldige wachttijd is, mag voorraad direct verkopen.
        if (phase === 'sell' && (!nextCheckTs || nextCheckTs <= Date.now())) {
          nextCheckTs = 0;
          GM_Set(K_NEXT_CHECK, 0);
          ui('voorraad aanwezig en geen wachttijd: direct verkopen');
        } else {
          ui(phase === 'sell'
            ? 'gekocht: wachten op volgende verkoopmogelijkheid'
            : 'geen voorraad: wachten op volgend verkoopmoment');
          await sleep(Math.min(Math.max(nextCheckTs - Date.now(), 5000), 60_000));
          return;
        }
      }

      await readPricesAndAct();
    } catch(e){
      try { console.warn('[MRB D&D]', e); } catch(_) {}
      ui('fout, retry');
      await sleep(5000);
    } finally {
      busy = false;
      if (on && !plannerManaged) {
        clearTimeout(loopTimer);
        const wait = priceCheckDue() ? 3000 : Math.min(Math.max(nextCheckTs - Date.now(), 5000), 60_000);
        loopTimer = setTimeout(loop, wait);
      }
    }
  }

  function start(){
    if (on) return;
    saveSettings();
    on = true;
    GM_Set(K_ON, true);

    if (nextCheckTs && Date.now() >= nextCheckTs) {
      nextCheckTs = 0;
      GM_Set(K_NEXT_CHECK, 0);
    }

    ui('start');
    if (plannerManaged) {
      try { unsafeWindow.mrbV9Planner?.updateTask?.('v9-dnd', { nextAt:Date.now()+250, enabled:true, status:'start aangevraagd' }); } catch(e) {}
    } else {
      loop();
    }
  }

  function stop(){
    on = false;
    GM_Set(K_ON, false);
    clearTimeout(loopTimer);
    retryAfterFlightTs = 0;
    GM_Set(K_RETRY_AFTER, 0);
    setCoreStage('IDLE', null);
    dndReleaseAction();
    ui('gestopt');
  }

  block.querySelector('#dndToggle')?.addEventListener('click', () => {
    on ? stop() : start();
  });

  block.querySelector('#dndSave')?.addEventListener('click', saveSettings);

  block.querySelector('#dndResetPhase')?.addEventListener('click', () => {
    phase = 'buy';
    nextCheckTs = 0;
    GM_Set(K_PHASE, phase);
    GM_Set(K_NEXT_CHECK, 0);
    retryAfterFlightTs = 0;
    GM_Set(K_RETRY_AFTER, 0);
    clearPendingAction();
    ui('fase reset naar kopen');
  });

  [block.querySelector('#dndRumAmount'), block.querySelector('#dndCokeAmount')].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('change', saveSettings);
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveSettings();
      }
    });
  });

  async function plannerStep(context){
    // Ook tijdens een halfuur-wachtstand direct corrigeren als de gebruiker op
    // Smokkelen staat en er nog handelsvoorraad aanwezig is.
    syncPhaseFromInventory('voorraad herkend');
    ensureHourlyBuyObligation();
    applyHourlyPriorityFromInventory('uurkoopcontrole');
    if (!on) {
      setCoreStage('IDLE', null);
      dndReleaseAction();
      return { delayMs:15_000, status:'module staat uit' };
    }
    if (typeof gm_isGateVisible === 'function' && gm_isGateVisible()) {
      setCoreStage('PAUSED_GATE', coreTargetCity);
      dndReleaseAction();
      ui('pauze gate/captcha');
      return { delayMs:5000, status:'pauze gate/captcha' };
    }

    // De gesynchroniseerde vluchttimer is een harde poort. Zolang die loopt,
    // mag D&D alleen een reeds aangekomen transactie in dezelfde stad afronden.
    // Zonder zekere huidige stad wordt NIET naar Travel genavigeerd; zo kunnen
    // Cars en andere modules gewoon blijven draaien.
    const pendingTravel = getPendingAction();
    const currentCityForWait = getCurrentCity();
    const travelWindow = dndTravelWindowState();
    const inventoryForPriority = onSmugglingPage() ? readSmugglingInventory() : getInventorySnapshot();
    const hasTradeStock = Number(inventoryForPriority?.total || 0) > 0;
    const mustFinishOpenTrade = !!pendingTravel || phase === 'sell' || hasTradeStock;
    const needsNewTravel = !pendingTravel || !currentCityForWait || currentCityForWait !== pendingTravel.city;
    if (!travelWindow.allowed && needsNewTravel && !mustFinishOpenTrade) {
      revokeTravelNavigation();
      setCoreStage('WAIT_TRAVEL_WINDOW', pendingTravel?.city || coreTargetCity);
      dndReleaseAction();
      ui(`${travelWindow.label}; nog geen openstaande D&D-transactie`);
      return { nextAt:travelWindow.nextAt, status:`wacht op reisvenster (${formatWait(travelWindow.waitMs)})` };
    }
    const canFinishHere = !!(pendingTravel && currentCityForWait && currentCityForWait === pendingTravel.city);
    const canFinishOnLoadedForm = !!(pendingTravel && !currentCityForWait && onSmugglingPage() && findSmugglingForm());
    const retryWait = flightRetryWaitMs();
    if (retryWait > 0 && !canFinishHere && !canFinishOnLoadedForm) {
      revokeTravelNavigation();
      setCoreStage('WAIT_TRAVEL_TIMER', pendingTravel?.city || coreTargetCity);
      dndReleaseAction();
      ui(`openstaande ${pendingTravel?.phase === 'sell' ? 'verkoop' : 'koop'} wacht op reistimer ~${Math.max(1, Math.ceil(retryWait/60000))}m`);
      return { nextAt:retryAfterFlightTs, status:`pre-${pendingTravel?.phase === 'sell' ? 'sell' : 'buy'} wacht op reistimer ${formatWait(retryWait)}` };
    }
    const flightState = getFlightState();
    if (!flightState.ready && !canFinishHere) {
      revokeTravelNavigation();
      setRetryAfterFlight(flightState.waitMs || syncedFlightWaitMs() || 60_000, flightState.reason);
      setCoreStage(flightState.fresh ? 'WAIT_TRAVEL_TIMER' : 'WAIT_TIMER_SYNC', pendingTravel?.city || coreTargetCity);
      dndReleaseAction();
      if (flightState.fresh) {
        ui(`wacht op reistimer ~${Math.max(1, Math.ceil(flightState.waitMs/60000))}m`);
        return { nextAt:Date.now() + Math.min(Math.max(flightState.waitMs, 5000), 60_000), status:`reistimer nog ${formatWait(flightState.waitMs)}` };
      }
      ui('wacht op verse vluchttimer-sync');
      try { unsafeWindow.mrbBackgroundTimerSync?.('dnd-needs-flight-state'); } catch(_) {}
      return { delayMs:15_000, status:'wacht op verse vluchttimer-sync' };
    }
    if (!priceCheckDue() && !mustFinishOpenTrade) {
      // Alleen buiten de toegestane vensters wacht een volledig nieuwe koopcyclus. Een openstaande
      // verkoop, gedeeltelijke aankoop of reeds gekozen doelstad wordt direct hervat.
      if (onSmugglingPage()) syncPhaseFromInventory('voorraad tijdens wachttijd');
      setCoreStage('WAIT_PRICE_CHANGE', coreTargetCity);
      dndReleaseAction();
      ui('wachten op het volgende toegestane D&D-venster');
      return { nextAt:nextCheckTs, status:'D&D wacht op reisvenster' };
    }
    if (busy) {
      dndTouchAction();
      return { delayMs:1000, status:`exclusief bezig: ${coreStage}` };
    }
    if (!dndAcquireAction(context)) {
      return { delayMs:750, status:'wacht op centrale actielock' };
    }

    busy = true;
    try {
      await readPricesAndAct();
    } catch(e) {
      coreLastError = String(e?.message || e || 'onbekende fout').slice(0,120);
      setCoreStage('ERROR', coreTargetCity, coreLastError);
      try { console.warn('[MRB D&D planner]', e); } catch(_) {}
      ui('fout, retry');
      return { delayMs:10_000, status:'fout, retry' };
    } finally {
      busy = false;
      dndReleaseAction();
    }

    setCoreStage(nextCheckTs && nextCheckTs > Date.now() ? 'WAIT_PRICE_CHANGE' : 'IDLE', coreTargetCity);
    if (nextCheckTs && nextCheckTs > Date.now()) {
      return { nextAt:Math.min(nextCheckTs, nextHourTs()), status:'wacht op prijswissel of nieuw klokuur' };
    }
    return { delayMs:5000, status:'D&D opnieuw controleren' };
  }

  ensureHourlyBuyObligation();

  unsafeWindow.mrbV9DnD = {
    setPlannerManaged(value){
      plannerManaged = !!value;
      if (plannerManaged) clearTimeout(loopTimer);
      ui();
    },
    isRunning:()=>!!on,
    nextAt:()=> {
      if (!on) return Date.now()+15_000;
      const fs = getFlightState();
      if (!fs.ready) return Date.now() + Math.min(Math.max(fs.waitMs || 15_000, 15_000), 60_000);
      if (hourlyBuyPending()) return Date.now()+1000;
      const candidates = [nextCheckTs || Infinity, nextHourTs()];
      return Math.min(...candidates);
    },
    runStep:plannerStep,
    state:()=>({ on, busy, phase, nextCheckTs, hourlyBuyPending:hourlyBuyPending(), lastBuyHour:String(GM_Get(K_LAST_BUY_HOUR,'')||''), coreStage, coreTargetCity, coreLastError, coreTransactions, inventory:readSmugglingInventory() })
  };

  ui();
  if (on && !plannerManaged) setTimeout(loop, 1500);
})();

// =====================================================================
// CC ONE-SHOT OPS (alleen via Control Center / mobile button)
// - Buy Handgun (.45 Colt Command Officers ASP-Series)  -> terug naar /information.php
// - Buy Armor (Bulletproof Vest)                        -> terug naar /information.php
// - Travel Detroit / Chicago                             -> terug naar /information.php
// =====================================================================
;(function CC_OneShotShopTravel(){
  'use strict';

  // --- Lock zodat je niet 2 one-shots tegelijk draait ---
  const K_LOCK_UNTIL = 'cc.oneshot.lockUntil';
  const LOCK_MS = 90_000;

  const sleep = (ms)=>new Promise(r=>setTimeout(r, ms));

  const loadPage = (function(){
    try{
      const gui = unsafeWindow?.omerta?.GUI?.container;
      if (unsafeWindow.mrbNavigate) return (p)=>unsafeWindow.mrbNavigate(p,{source:'module'});
      if (gui && typeof gui.loadPage === 'function') return (p)=>gui.loadPage(p);
    }catch{}
    return (p)=>{
      if (p.startsWith('?')) location.search = p;
      else if (p.startsWith('#')) unsafeWindow.mrbNavigate ? unsafeWindow.mrbNavigate(p,{source:'fallback'}) : (location.hash = p.slice(1));
      else unsafeWindow.mrbNavigate ? unsafeWindow.mrbNavigate(p,{source:'fallback'}) : (location.href = p);
    };
  })();

  function lockAcquire(){
    const until = Number(GM_Get(K_LOCK_UNTIL, 0)) || 0;
    if (Date.now() < until) return false;
    GM_Set(K_LOCK_UNTIL, Date.now() + LOCK_MS);
    return true;
  }
  function lockRelease(){
    GM_Set(K_LOCK_UNTIL, 0);
  }

  function captchaActief(){
    return document.getElementById('recaptcha-popup') !== null;
  }

  async function waitGateClear(maxMs=120_000){
    const t0 = Date.now();
    while (typeof gm_isGateVisible === 'function' && gm_isGateVisible()){
      if (Date.now() - t0 > maxMs) return false;
      await sleep(2500);
    }
    return true;
  }

  function safeClick(el){
    try{ el.click(); }
    catch{ el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window})); }
  }

  // -------------------------
  // SHOP: Handgun
  // -------------------------
  async function buyHandgun(){
    if (!lockAcquire()) return;
    try{
      if (!(await waitGateClear())) return;

      loadPage('/?module=Shop&action=display_section&id=8');
      await sleep(1300);

      if (!(await waitGateClear())) return;
      if (captchaActief()) return; // laat captcha staan

      const NAME = '.45 Colt Command Officers ASP-Series';

      const boxes = Array.from(document.querySelectorAll('div.expandmiddleDiv'));
      const box = boxes.find(b => (b.textContent || '').includes(NAME));

      let a = null;
      if (box){
        a = box.querySelector('a[href*="action=buy_item"][href*="item=1"]')
         || Array.from(box.querySelectorAll('a')).find(x => /\(Buy\)/i.test(x.textContent || ''));
      }
      // fallback (als layout ooit afwijkt)
      if (!a){
        a = document.querySelector('a[href*="module=Shop"][href*="action=buy_item"][href*="item=1"]')
         || document.querySelector('a[href*="action=buy_item"][href*="item=1"]');
      }

      if (!a){
        // niets gevonden -> terug naar info
        loadPage('/information.php');
        return;
      }

      safeClick(a);
      await sleep(900);

      if (captchaActief()) return; // niet weg navigeren; eerst oplossen
      loadPage('/information.php');
    } finally {
      // lock altijd vrijgeven (ook bij errors)
      lockRelease();
    }
  }

  // -------------------------
  // SHOP: Armor (Bulletproof Vest)
  // -------------------------
  async function buyArmor(){
    if (!lockAcquire()) return;
    try{
      if (!(await waitGateClear())) return;

      loadPage('/?module=Shop&action=display_section&id=3');
      await sleep(1300);

      if (!(await waitGateClear())) return;
      if (captchaActief()) return;

      const NAME = 'Bulletproof Vest';

      // jouw voorbeeld: div met opacity + achtergrond
      const divs = Array.from(document.querySelectorAll('div'));
      const box = divs.find(d => (d.textContent || '').includes(NAME));

      let a = null;
      if (box){
        a = box.querySelector('a[href*="action=buy_item"][href*="item=8"]')
         || Array.from(box.querySelectorAll('a')).find(x => /available/i.test(x.textContent || ''));
      }
      // fallback
      if (!a){
        a = document.querySelector('a[href*="module=Shop"][href*="action=buy_item"][href*="item=8"]')
         || Array.from(document.querySelectorAll('a')).find(x => /available/i.test(x.textContent || '') && (x.getAttribute('href')||'').includes('action=buy_item'));
      }

      if (!a){
        loadPage('/information.php');
        return;
      }

      safeClick(a);
      await sleep(900);

      if (captchaActief()) return;
      loadPage('/information.php');
    } finally {
      lockRelease();
    }
  }

  // -------------------------
  // TRAVEL: Detroit / Chicago (hard travel logic)
  // -------------------------
  const CITY_TO_ID = { Det:0, Chi:1, Pal:2, NY:3, LV:4, Phi:5, Bal:6, Cor:7 };

  function promptOpen(){ return document.querySelector('.jqi') !== null; }

  function findTravelBtn(){
    return document.querySelector('button[name="jqi_state0_buttonTravel"][value="true"]')
      || document.querySelector('.jqi .jqibuttons button[name="jqi_state0_buttonTravel"]')
      || Array.from(document.querySelectorAll('button.jqibutton, .jqibuttons button, button.btn'))
           .find(b => /travel/i.test(b.textContent || ''))
      || null;
  }

  function findAnchorById(id){
    return document.querySelector(`a[onclick="onTravelData(${id});"]`)
        || document.querySelector(`a[onclick^="onTravelData(${id})"]`)
        || null;
  }

  function clickCityByCode(code){
    const id = CITY_TO_ID[code];
    if (id == null) return false;

    try{
      if (typeof unsafeWindow.onTravelData === 'function'){
        unsafeWindow.onTravelData(id);
        return true;
      }
    }catch{}

    const a = findAnchorById(id);
    if (!a) return false;
    safeClick(a);
    return true;
  }

  async function waitPromptClose(timeout=5000){
    const t0 = Date.now();
    while (promptOpen()){
      if (Date.now()-t0 > timeout) return false;
      await sleep(200);
    }
    return true;
  }

  async function travelTo(code){
    if (!lockAcquire()) return;
    try{
      if (!(await waitGateClear())) return;

      loadPage('/?module=Travel');
      await sleep(1100);

      if (!(await waitGateClear())) return;
      if (captchaActief()) return;

      const ok = clickCityByCode(code);
      if (!ok){
        loadPage('/information.php');
        return;
      }

      // wacht tot prompt + klik Travel
      for (let i=0; i<30; i++){
        if (captchaActief()) return;
        if (promptOpen()){
          const btn = findTravelBtn();
          if (btn){
            safeClick(btn);
            break;
          }
        }
        await sleep(250);
      }

      await waitPromptClose(6000);
      await sleep(1200);

      if (captchaActief()) return;
      loadPage('/information.php');
    } finally {
      lockRelease();
    }
  }
  // -------------------------
  // Public API voor MasterControl
  // -------------------------
unsafeWindow.cc_api = unsafeWindow.cc_api || {};
unsafeWindow.cc_api.shopBuyHandgun = ()=>buyHandgun();
unsafeWindow.cc_api.shopBuyArmor   = ()=>buyArmor();
unsafeWindow.cc_api.travelDetroit  = ()=>travelTo('Det');
unsafeWindow.cc_api.travelChicago  = ()=>travelTo('Chi');

// Centrale menuhelpers beschikbaar maken voor alle latere module-IIFE's.
// Deze modules staan bewust buiten de basis-IIFE en konden addBlock anders
// niet als identifier vinden, waardoor de planneropbouw voortijdig stopte.
try {
  globalThis.addBlock = addBlock;
  globalThis.GM_Get = GM_Get;
  globalThis.GM_Set = GM_Set;
  if (typeof unsafeWindow !== 'undefined') {
    unsafeWindow.addBlock = addBlock;
    unsafeWindow.GM_Get = GM_Get;
    unsafeWindow.GM_Set = GM_Set;
  }
} catch (_) {}
})();

// =====================================================================
// MASTER CONTROL 
// =====================================================================

    ;(function MasterControl_GAS(){
  'use strict';

  const FEED_URL = 'https://script.google.com/macros/s/AKfycbyCQ-VYbfhJunqM8ucDExXtRUrbNCLJMcic1sGCHO97djelQPtNLqmFXeNw8NYqNQzD/exec?token=MRB Gold';
  const POLL_MS = 40_000;

  const MODULES = {
    race:    { enabledKey:'race_scriptAan'    },
    oc:      { enabledKey:'oc_scriptAan'      },
  };

  // ✅ NIEUW: one-shot tasks (geen enabledKey, alleen uitvoeren)
  const TASKS = {
    buy_handgun:    { apiFn: 'shopBuyHandgun' },
    buy_armor:      { apiFn: 'shopBuyArmor'   },
    travel_detroit: { apiFn: 'travelDetroit'  },
    travel_chicago: { apiFn: 'travelChicago'  },
  };

  const K = {
    optOutAll: 'cc.local.optOutAll',
    lastSeen:  (m)=>`cc.local.${m}.lastSeenCmdId`,
    latch:     (m)=>`cc.local.${m}.stopLatch`,
    reason:    (m)=>`cc.local.${m}.stopReason`,
  };

  // Gebruik jouw GM helpers als ze bestaan
  const GM_Get_ = (unsafeWindow.GM_Get || ((k,d)=>GM_getValue(k,d)));
  const GM_Set_ = (unsafeWindow.GM_Set || ((k,v)=>GM_setValue(k,v)));

  const isOptedOut  = ()=> !!GM_Get_(K.optOutAll, false);
  const getLastSeen = (m)=> String(GM_Get_(K.lastSeen(m), '')||'');
  const setLastSeen = (m,id)=> GM_Set_(K.lastSeen(m), String(id||''));
  const setLatch    = (m,on,reason='')=>{
    GM_Set_(K.latch(m), !!on);
    GM_Set_(K.reason(m), on ? String(reason||'').slice(0,200) : '');
  };

  const normalizeAction = (a)=>{
    a = String(a||'').trim().toUpperCase();
    if (['ON','TRUE','1','START','RUN','DO','GO','TRIGGER'].includes(a)) return 'ON';
    if (['OFF','FALSE','0','STOP'].includes(a)) return 'OFF';
    return '';
  };

  // Public hook: modules kunnen zichzelf “latchen” (= blijft uit tot nieuw command-id)
  unsafeWindow.cc_localStop = function(module, reason){
    module = String(module||'').toLowerCase();
    if (!MODULES[module]) return;
    setLatch(module, true, reason || 'local stop');
    GM_Set_(MODULES[module].enabledKey, false);
  };

  function applyCommand(module, cmd){
    if (!cmd || !cmd.id) return;
    if (isOptedOut()) return;

    const api = unsafeWindow.cc_api || {};
    const isTask = !!TASKS[module];

    // --- bepaal actie ---
    let action = normalizeAction(cmd.action);

    // ✅ Tasks: als action niet ON/OFF is maar wel gevuld -> behandel als ON (execute)
    if (!action && isTask && String(cmd.action||'').trim()){
      action = 'ON';
    }
    if (!action) return;

    // ✅ Tasks: als functie nog niet bestaat, NIET lastSeen zetten (anders verlies je command)
    if (isTask){
      const fnName = TASKS[module].apiFn;
      if (typeof api?.[fnName] !== 'function'){
        return;
      }
    }

    const id = String(cmd.id);
    if (getLastSeen(module) === id) return; // one-shot
    setLastSeen(module, id);

    // -------------------------
    // TASKS (one-shot execute)
    // -------------------------
    if (isTask){
      const fnName = TASKS[module].apiFn;
      try{ api[fnName]?.(); }catch(e){}
      return;
    }

    // -------------------------
    // MODULES (start/stop)
    // -------------------------
    if (action === 'OFF'){
      GM_Set_(MODULES[module].enabledKey, false);

      // DIRECT stop zonder refresh
      if (module === 'race')    api.raceSet?.(false, 'master OFF');
      if (module === 'oc')      api.ocSet?.(false, 'master OFF');

      return;
    }

    if (action === 'ON'){
      // reset latch zodat ook eerder gestopte browsers weer 1x proberen
      setLatch(module, false, '');
      GM_Set_(MODULES[module].enabledKey, true);

      // DIRECT start zonder refresh
      if (module === 'race')    api.raceSet?.(true, 'master ON');
      if (module === 'oc')      api.ocSet?.(true, 'master ON');

      return;
    }
  }

  function fetchFeed(){
    return new Promise((resolve, reject)=>{
      GM_xmlhttpRequest({
        method: 'GET',
        url: FEED_URL,
        headers: { 'Accept': 'application/json' },
        timeout: 10_000,
        onload: (res)=>{
          try{ resolve(JSON.parse(res.responseText || '{}')); }
          catch(e){ reject(e); }
        },
        onerror: reject,
        ontimeout: ()=>reject(new Error('timeout')),
      });
    });
  }

async function poll(){
  try{
    if (isOptedOut()) return;

    const j = await fetchFeed();
    if (!j || j.ok === false) return;

    // modules
    for (const m of Object.keys(MODULES)){
      if (j[m]) applyCommand(m, j[m]);
    }
    // tasks
    for (const t of Object.keys(TASKS)){
      if (j[t]) applyCommand(t, j[t]);
    }

  } catch(e){
    // stil falen
  }
}

  // Init
  poll();
  mrbSetInterval(poll, POLL_MS);

})();


// =====================================================================
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

  // persistente idle-planning
  const K_RACE_PLAN = 'race_idlePlan_v1'; // { type:'start'|'info', at:number, createdAt:number }

  // timers en helpers om dubbel-loop te voorkomen
  let failsafeTimer = null;
  let loopTimer     = null;

  const next = (fn, ms)=>{
    if(loopTimer) clearTimeout(loopTimer);
    loopTimer = setTimeout(fn, Math.max(0, ms || 0));
  };
  const clearAll = ()=>{
    if(loopTimer) clearTimeout(loopTimer);
    if(failsafeTimer) clearTimeout(failsafeTimer);
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

  // Race heeft geen eigen Core-Planner-context meer. Houd deze release-helper
  // lokaal en foutvrij, zodat passieve Race-wachtmomenten nooit de hoofdloop
  // kunnen afbreken door een ontbrekende functie.
  function raceReleaseAction(){
    try { unsafeWindow.mrbV9Planner?.releaseAction?.('v9-race'); } catch(e) {}
  }

  function raceCrimesCarsNeedPriority(marginMs=1500){
    try {
      const st = unsafeWindow.mrbV9CrimesCars?.state?.();
      if (!st?.running) return false;
      if (st.busy || st.confirmPendingKind || st.forcedRetryKind) return true;

      const now = Date.now();
      const crimesDue = !!st.doCrimes && Number(st.crimesNext || 0) <= now + marginMs;
      const carsDue = !!st.doCars && Number(st.carsNext || 0) <= now + marginMs;
      return crimesDue || carsDue;
    } catch(e) {
      return false;
    }
  }

  function raceYieldToCrimesCars(resume){
    if (!raceCrimesCarsNeedPriority()) return false;
    raceRegistryState('WAIT_CRIMES_CARS', 'Race wacht op Crimes/Cars');
    raceReleaseAction();
    next(resume, 5000);
    return true;
  }

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

  // foutmelding die Driver kan laten vastlopen
  const alreadyAcceptedMsg = (text) =>
    /You're ready for the race/i.test(text) ||
    /wait for the race to end/i.test(text);

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
        const start = raceRole === 'leader' ? leader_startRace : slave_startRace;
        if (raceYieldToCrimesCars(start)) return;
        start();
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
    clearRacePlan();
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

    // Een openstaande Race-uitnodiging is alleen een wachtstatus. Crimes en
    // Cars houden absoluut voorrang en krijgen eerst alle tijd om hun actie
    // plus timerbevestiging af te ronden.
    if (raceYieldToCrimesCars(()=>leader_checkPartner(retries))) return;

    guiLoad('/races.php');
    next(()=>{
      if (raceYieldToCrimesCars(()=>leader_checkPartner(retries))) return;
      const body = document.body.innerText || '';

      if (handleLeaderReturnToRaceCity(body)) return;

      if (isTired(body)){ next(goInfo, randomDelay(5000,10000)); return; }

      if (/Race!!!|All racers are ready for the race|ready for the race/i.test(body) || raceFindRaceStartButton()) {
        leader_tryStart();
        return;
      }

      if (/invited|accepted|uitgenodigd|geaccepteerd|waiting|wachten/i.test(body)){
        raceReleaseAction();
        raceRegistryState('WAITING_DRIVER', 'wacht passief op Driver; overige timers vrij');
        guiLoad('/information.php');
        next(()=> leader_checkPartner(retries+1), 15000);
        return;
      }

      next(leader_raceFlow, randomDelay(2000,4000));
    }, randomDelay(1000,2000));
  }

  function leader_tryStart(){
    raceRegistryState('STARTING', 'Race starten');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('leader_tryStart: uitgelogd');

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

  function leader_checkDone(){
    raceRegistryState('RUNNING', 'wacht op race-resultaat');
    if(!scriptAan) return;
    if (isLoggedOut()) return pauseForGate('leader_checkDone: uitgelogd');
    const $ = $jq();
    const body = document.body.innerText || '';
    const done = $ ? $('#game_container:contains("The Race has ended, check your inbox for results"), #game_container:contains("check your inbox for results"), #game_container:contains("The race has ended")').length>0 : false;

    if (done || body.includes("The race has ended") || body.includes("check your inbox for results")){
      GM_Set("lastRaceTime", Math.floor(Date.now()/1000));
      next(goInfo, randomDelay(5000,10000));
    } else if (isTired(body)){
      next(goInfo, randomDelay(5000,10000));
    } else {
      next(leader_checkDone, randomDelay(5000,8000));
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
      console.log("⏳ Race al geaccepteerd — accept-flow opnieuw starten.");
      next(()=>{
        guiLoad('/races.php');
        next(slave_acceptLoop, randomDelay(1500,4000));
      }, randomDelay(3000,6000));
      return;
    }

    if (handleSlaveTravelToRaceCity()) return;

    // Alleen expliciete Driver-tekst geldt als autostap. Een willekeurige
    // <select> staat ook op de Leider-pagina en mag dus nooit voldoende zijn.
    if (raceDriverHasRealCarStep()){
      slave_selectCar();
      return;
    }

    const accept = $('a').filter(function(){ return /(Accepteer|Accept)/i.test($(this).text()); });
    if (accept.length){
      accept[0].click();
      next(slave_selectCar, actionDelay());
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

          next(()=>{
            clearRacePlan();
            guiLoad('/information.php');
            next(()=>checkAvailability(true), randomDelay(10000,20000));
          }, randomDelay(18000,40000));
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

  // Directe wake-up voor modules die na Heist/Raid terugkeren op Mijn Account.
  // checkAvailability leest synchroon de zichtbare Racetimer en plant alleen
  // een Race-actie wanneer die daadwerkelijk op Nu staat.
  unsafeWindow.mrbRacePriorityWake = function(source='module-resume'){
    if (!scriptAan || isLoggedOut() || !/information\.php/i.test(location.href)) return false;
    try {
      raceRegistryState('CHECK_TIMER', `directe timer-sync na ${source}`);
      checkAvailability(true);
      return true;
    } catch(e) {
      try { console.warn('[Race priority wake]', e); } catch(_) {}
      return false;
    }
  };

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
// =====================================================================


// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// 12) BOOZEN — Barafranca NL direct fix
// =====================================================================
(function CDBoozen(){
  const K_ON = 'cdBoozenScriptAan';
  const K_RUM = 'cdBoozenRumAmount';
  const K_COKE = 'cdBoozenCocaineAmount';
  const K_FORCE = 'cdBoozenForceSmuggling';

  let on = GM_Get(K_ON, false);
  let forceSmuggling = !!GM_Get(K_FORCE, false);
  let busy = false;
  let plannerManaged = false;
  let plannerNextAt = Date.now() + 1500;

  // v11.4: ook de losse Boozen-module gebruikt de centrale actielease.
  let boozenCoreStage = 'IDLE';
  let boozenLastError = '';
  let boozenTransactions = Number(GM_Get('mrb_boozen_core_transactions', 0)) || 0;
  let boozenActionContext = null;
  const BOOZEN_ACTION_TTL = 90_000;
  function boozenAcquireAction(context){
    if (!plannerManaged) return true;
    if (context) boozenActionContext = context;
    try {
      if (boozenActionContext?.touchAction?.(BOOZEN_ACTION_TTL)) return true;
      return !!boozenActionContext?.acquireAction?.(BOOZEN_ACTION_TTL);
    } catch(e) { return false; }
  }
  function boozenTouchAction(){
    if (!plannerManaged) return true;
    try { return !!boozenActionContext?.touchAction?.(BOOZEN_ACTION_TTL); }
    catch(e) { return false; }
  }
  function boozenReleaseAction(){
    try { boozenActionContext?.releaseAction?.(); } catch(e) {}
    boozenActionContext = null;
  }

  let rumAmount = Number(GM_Get(K_RUM, 40)) || 40;
  let cocaineAmount = Number(GM_Get(K_COKE, 13)) || 13;

  const block = addBlock(`
    <h4>Boozen</h4>

    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="cdbStart" class="gm-btn">${on ? 'Stop' : 'Start'}</button>
      <div id="cdbStatus" class="gm-status" style="margin:0;">
        ${on ? '<span class="ok">✅ Actief</span>' : '<span class="bad">⛔</span>'}
      </div>
    </div>

    <div class="gm-row" style="align-items:center;gap:6px;margin-top:7px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input id="cdbForceSmuggling" type="checkbox" ${forceSmuggling ? 'checked' : ''}>
        Force Smokkelen
      </label>
    </div>

    <div class="gm-row" style="align-items:center;gap:6px;margin-top:7px;">
      <label style="width:58px;">Rum</label>
      <input id="cdbRumAmount" type="number" min="0" max="999" step="1" value="${rumAmount}" style="width:70px;">
    </div>

    <div class="gm-row" style="align-items:center;gap:6px;margin-top:5px;">
      <label style="width:58px;">Cocaine</label>
      <input id="cdbCocaineAmount" type="number" min="0" max="999" step="1" value="${cocaineAmount}" style="width:70px;">
    </div>

    <div class="gm-row" style="align-items:center;gap:8px;margin-top:7px;">
      <button id="cdbSaveAmounts" class="gm-btn">Save</button>
      <span id="cdbAmountsStatus" style="opacity:.85;font-size:12px;">${rumAmount}/${cocaineAmount}</span>
    </div>
  `, '12-cd-boozen');

  function ui(){
    const btn = q('#cdbStart', block);
    const st  = q('#cdbStatus', block);
    const amountStatus = q('#cdbAmountsStatus', block);
    const forceBox = q('#cdbForceSmuggling', block);

    if (btn) btn.textContent = on ? 'Stop' : 'Start';
    if (forceBox) forceBox.checked = !!forceSmuggling;
    if (st) st.innerHTML = on
      ? `<span class="ok">✅ Actief${plannerManaged ? ' — 🧭 V9 Planner' : ''}</span>`
      : '<span class="bad">⛔</span>';

    if (amountStatus) amountStatus.textContent = `${rumAmount}/${cocaineAmount}`;
  }

  function saveAmounts(){
    const rumInput = q('#cdbRumAmount', block);
    const cokeInput = q('#cdbCocaineAmount', block);

    rumAmount = Math.max(0, Math.floor(Number(rumInput?.value || 0)));
    cocaineAmount = Math.max(0, Math.floor(Number(cokeInput?.value || 0)));

    GM_Set(K_RUM, rumAmount);
    GM_Set(K_COKE, cocaineAmount);

    if (rumInput) rumInput.value = rumAmount;
    if (cokeInput) cokeInput.value = cocaineAmount;

    ui();
  }

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function onSmugglingPage(){
    const h = String(location.href || '');
    const root = document.querySelector('#game_container');
    return /smuggling\.php/i.test(h) ||
           /moduleLegacySmuggling/i.test(String(root?.className || '')) ||
           !!document.querySelector('form[action="smuggling.php"], form[action*="smuggling.php"]');
  }

  function hasSmugglingForm(){
    const root = document.querySelector('#game_container') || document.body;
    return !!(
      root.querySelector('input[name="rum"]') &&
      root.querySelector('input[name="cocaine"]') &&
      (
        root.querySelector('input[type="submit"][value="Koop/Verkoop"]') ||
        root.querySelector('input[type="submit"][value="Buy/Sell"]') ||
        Array.from(root.querySelectorAll('input[type="submit"], button[type="submit"], button'))
          .some(b => /Koop\/Verkoop|Buy\/Sell|Kopen|Verkopen/i.test(String(b.value || b.textContent || '')))
      )
    );
  }

  function goSmugglingPage(){
    boozenCoreStage = 'OPEN_SMUGGLING';
    boozenTouchAction();
    try {
      if (unsafeWindow?.omerta?.GUI?.container?.loadPage) {
        unsafeWindow.mrbNavigate?.('/smuggling.php',{source:'boozen'}) || unsafeWindow.omerta.GUI.container.loadPage('/smuggling.php');
        return;
      }
    } catch(e) {}

    try {
      location.hash = '/smuggling.php';
    } catch(e) {}
  }

  let forceLastNav = 0;
  let forceHashRetry = false;

  function forceSmugglingWatchdog(){
    if (plannerManaged || !on || !forceSmuggling) return;

    const onSmug = onSmugglingPage();
    const hasForm = hasSmugglingForm();

    // Belangrijk:
    // Na een mislukte smokkelactie blijf je soms op #/smuggling.php,
    // maar zonder Rum/Cocaine formulier. Dan moet Smokkelen opnieuw geladen worden.
    if (onSmug && hasForm) {
      forceHashRetry = false;
      return;
    }

    const now = Date.now();
    if (now - forceLastNav < 1200) return;
    forceLastNav = now;

    try {
      if (location.hash !== '#/smuggling.php') {
        location.hash = '/smuggling.php';
        forceHashRetry = true;
        return;
      }
    } catch(e) {}

    try {
      if (unsafeWindow?.omerta?.GUI?.container?.loadPage) {
        unsafeWindow.mrbNavigate?.('/smuggling.php',{source:'boozen'}) || unsafeWindow.omerta.GUI.container.loadPage('/smuggling.php');
        forceHashRetry = false;
        return;
      }
    } catch(e) {}

    // Laatste fallback: forceer dezelfde hash opnieuw via lege hash.
    try {
      location.hash = '';
      setTimeout(() => { location.hash = '/smuggling.php'; }, 100);
    } catch(e) {}
  }

  function getMaxFromHeader(type){
    const root = document.querySelector('#game_container') || document.body;
    const spans = Array.from(root.querySelectorAll('span[value]'));

    const re = type === 'rum'
      ? /drank|booze|rum/i
      : /drugs|narcs|cocaine|cocaïne/i;

    const hit = spans.find(s => re.test(String(s.textContent || '')));
    const n = Number(hit?.getAttribute('value'));
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
  }

  function setValue(el, value){
    if (!el) return false;

    const v = String(Math.max(0, Math.floor(Number(value) || 0)));
    if (String(el.value || '') !== v) {
      try { el.focus(); } catch {}
      el.value = v;
      try { el.dispatchEvent(new Event('input',  { bubbles:true })); } catch {}
      try { el.dispatchEvent(new Event('change', { bubbles:true })); } catch {}
      try { el.blur(); } catch {}
    }
    return String(el.value || '') === v;
  }

  function findForm(){
    return document.querySelector('form[action="smuggling.php"], form[action*="smuggling.php"]')
        || document.querySelector('input[name="rum"]')?.closest('form')
        || document.querySelector('input[name="cocaine"]')?.closest('form')
        || null;
  }

  function fillAmounts(){
    const form = findForm();
    const root = form || document;

    const rum = root.querySelector('input[name="rum"]');
    const cocaine = root.querySelector('input[name="cocaine"]');

    if (!rum || !cocaine) return false;

    const maxRum = getMaxFromHeader('rum');
    const maxCoke = getMaxFromHeader('cocaine');

    const rumValue = Math.min(rumAmount, maxRum ?? rumAmount);
    const cokeValue = Math.min(cocaineAmount, maxCoke ?? cocaineAmount);

    const okRum = setValue(rum, rumValue);
    const okCoke = setValue(cocaine, cokeValue);

    return okRum && okCoke;
  }


  function readDashboardMoney(){
    const root = document.querySelector('#game_container') || document.body;
    const txt = String(root?.innerText || '').replace(/\s+/g, ' ');
    const values = Array.from(txt.matchAll(/\$\s*([0-9][0-9.,]*)/g))
      .map(m => Number(String(m[1]).replace(/\./g, '').replace(',', '.')))
      .filter(Number.isFinite);
    return values.length ? Math.max(...values) : null;
  }

  function clickKoopVerkoop(){
    const form = findForm();
    const root = form || document;

    const btn =
      root.querySelector('input[type="submit"][value="Koop/Verkoop"]') ||
      root.querySelector('input[type="submit"]') ||
      Array.from(root.querySelectorAll('button, input[type="button"], input[type="submit"]'))
        .find(b => /Koop\/Verkoop|Buy\/Sell|Kopen|Verkopen/i.test(String(b.value || b.textContent || '')));

    if (!btn || btn.disabled) return false;

    try { btn.focus(); } catch {}

    try {
      btn.click();
      return true;
    } catch {}

    try {
      btn.dispatchEvent(new MouseEvent('mousedown', { bubbles:true, cancelable:true, view:window }));
      btn.dispatchEvent(new MouseEvent('mouseup',   { bubbles:true, cancelable:true, view:window }));
      btn.dispatchEvent(new MouseEvent('click',     { bubbles:true, cancelable:true, view:window }));
      return true;
    } catch {}

    return false;
  }

  async function loop(){
    if (!on || busy) return;
    busy = true;

    try {
      if (!onSmugglingPage()){
        // Barafranca NL gebruikt hash-route: index.php#/smuggling.php
        goSmugglingPage();

        await sleep(3000);

        if (!onSmugglingPage()) {
          await sleep(1500);
          return;
        }
      }

      if (!hasSmugglingForm()){
        goSmugglingPage();
        await sleep(2500);
        return;
      }

      const filled = fillAmounts();

      if (!filled){
        await sleep(1000);
        return;
      }

      await sleep(400);

      const beforeMoney = readDashboardMoney();
      const clicked = clickKoopVerkoop();

      await sleep(3500);

      if (clicked) {
        const afterMoney = readDashboardMoney();
        if (beforeMoney != null && afterMoney != null) {
          const diff = afterMoney - beforeMoney;
          if (diff > 0) {
            try { unsafeWindow.mrbDashMetrics?.recordBoozenProfit?.(diff); } catch(e) {}
          }
        }
      }
    } finally {
      busy = false;
      if (on && !plannerManaged) setTimeout(loop, 1200);
    }
  }

  const startBtn = q('#cdbStart', block);
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      saveAmounts();
      on = !on;
      GM_Set(K_ON, on);
      ui();
      if (on) {
        if (plannerManaged) {
          plannerNextAt = Date.now()+250;
          try { unsafeWindow.mrbV9Planner?.updateTask?.('v9-boozen', { nextAt:plannerNextAt, enabled:true, status:'start aangevraagd' }); } catch(e) {}
        } else {
          loop();
        }
      }
    });
  }

  const saveBtn = q('#cdbSaveAmounts', block);
  if (saveBtn) saveBtn.addEventListener('click', saveAmounts);

  const forceBox = q('#cdbForceSmuggling', block);
  if (forceBox) {
    forceBox.addEventListener('change', () => {
      forceSmuggling = !!forceBox.checked;
      GM_Set(K_FORCE, forceSmuggling);
      ui();
      if (on && forceSmuggling && !onSmugglingPage()) goSmugglingPage();
    });
  }

  [q('#cdbRumAmount', block), q('#cdbCocaineAmount', block)].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveAmounts();
      }
    });
    inp.addEventListener('change', saveAmounts);
  });

  mrbSetInterval(forceSmugglingWatchdog, 1000);
  window.addEventListener('hashchange', () => setTimeout(forceSmugglingWatchdog, 50), true);
  window.addEventListener('popstate', () => setTimeout(forceSmugglingWatchdog, 50), true);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) setTimeout(forceSmugglingWatchdog, 50);
  }, true);

  async function plannerStep(context){
    if (!on) {
      boozenCoreStage = 'IDLE';
      boozenReleaseAction();
      return { delayMs:15_000, status:'module staat uit' };
    }
    if (typeof gm_isGateVisible === 'function' && gm_isGateVisible()) {
      boozenCoreStage = 'PAUSED_GATE';
      boozenReleaseAction();
      return { delayMs:5000, status:'pauze gate/captcha' };
    }
    if (busy) {
      boozenTouchAction();
      return { delayMs:1000, status:`exclusief bezig: ${boozenCoreStage}` };
    }
    if (!boozenAcquireAction(context)) {
      return { delayMs:750, status:'wacht op centrale actielock' };
    }

    busy = true;
    try {
      if (!onSmugglingPage() || !hasSmugglingForm()) {
        boozenCoreStage = 'OPEN_SMUGGLING';
        goSmugglingPage();
        plannerNextAt = Date.now()+5000;
        return { nextAt:plannerNextAt, status:'Smokkelen openen' };
      }

      boozenCoreStage = 'FILL_AMOUNTS';
      if (!fillAmounts()) {
        plannerNextAt = Date.now()+5000;
        return { nextAt:plannerNextAt, status:'wacht op invoervelden' };
      }

      await sleep(400);
      boozenTouchAction();
      boozenCoreStage = 'SUBMIT';
      const beforeMoney = readDashboardMoney();
      const clicked = clickKoopVerkoop();
      if (!clicked) {
        boozenLastError = 'Koop/Verkoop-knop niet gevonden';
        plannerNextAt = Date.now()+10_000;
        return { nextAt:plannerNextAt, status:boozenLastError };
      }

      boozenCoreStage = 'WAIT_RESULT';
      await sleep(3500);
      boozenTouchAction();
      const afterMoney = readDashboardMoney();
      if (beforeMoney != null && afterMoney != null) {
        const diff = afterMoney - beforeMoney;
        if (diff > 0) {
          try { unsafeWindow.mrbDashMetrics?.recordBoozenProfit?.(diff); } catch(e) {}
        }
      }
      boozenTransactions += 1;
      GM_Set('mrb_boozen_core_transactions', boozenTransactions);
      boozenLastError = '';
      boozenCoreStage = 'IDLE';
      plannerNextAt = Date.now()+30_000;
      return { nextAt:plannerNextAt, status:`actie uitgevoerd; transacties ${boozenTransactions}` };
    } catch(e) {
      boozenLastError = String(e?.message || e || 'onbekende fout').slice(0,120);
      boozenCoreStage = 'ERROR';
      plannerNextAt = Date.now()+10_000;
      try { console.warn('[Boozen planner]', e); } catch(_) {}
      return { nextAt:plannerNextAt, status:'fout, retry' };
    } finally {
      busy = false;
      boozenReleaseAction();
    }
  }

  unsafeWindow.mrbV9Boozen = {
    setPlannerManaged(value){
      plannerManaged = !!value;
      ui();
    },
    isRunning:()=>!!on,
    nextAt:()=> on ? plannerNextAt : Date.now()+15_000,
    runStep:plannerStep,
    state:()=>({ on, busy, forceSmuggling, plannerNextAt, coreStage:boozenCoreStage, lastError:boozenLastError, transactions:boozenTransactions })
  };

  ui();
  if (on && !plannerManaged) {
    if (forceSmuggling && !onSmugglingPage()) goSmugglingPage();
    setTimeout(loop, 1200);
  }
})();


// =====================================================================
// MRB GOLD EDITION v9.7.0 — FASE 8
// - OC idle/cooldown-wake-up gekoppeld aan de centrale V9 Planner.
// - Bestaande OC rollen en uitbetalingen blijven intact.
// =====================================================================

// =====================================================================
// 3) OCBLOK
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v11.7.0 — CENTRALE MODULE STATE REGISTRY
// =====================================================================
(function MRBModuleStateRegistry(){
  'use strict';
  if(unsafeWindow.mrbModuleStateRegistry?.version) return;
  const states=new Map();
  const listeners=new Set();
  function cleanId(v){return String(v||'').trim().toLowerCase();}
  function set(id,patch={}){id=cleanId(id);if(!id)return null;const prev=states.get(id)||{id,state:'IDLE',enabled:false,lastUpdate:0};const next={...prev,...patch,id,lastUpdate:Number(patch.lastUpdate)||Date.now()};states.set(id,next);for(const fn of listeners){try{fn({...next});}catch(e){}}return {...next};}
  function get(id){const v=states.get(cleanId(id));return v?{...v}:null;}
  function list(){return [...states.values()].map(v=>({...v}));}
  function subscribe(fn){if(typeof fn!=='function')return()=>{};listeners.add(fn);return()=>listeners.delete(fn);}
  unsafeWindow.mrbModuleStateRegistry=Object.freeze({version:'11.7.0',set,get,list,subscribe});
  ['crimes','cars','dnd','race','oc','boozen','lackey','bodyguard'].forEach(id=>set(id,{state:'IDLE',enabled:false,detail:'registry init'}));
})();

;(function MRBV11127OCPreparation(){
  'use strict';

  const TASK_ID = 'v9-oc';
  const PREP_MODE = true;
  const K_ON = 'oc_scriptAan';
  const K_ROLE = 'oc_role';
  const K_STATE = 'mrb_v117_oc_state';
  const K_NEXT = 'mrb_v117_oc_next_at';
  const ROLE_KEYS = Object.freeze({ dr:'oc_dr', ee:'oc_ee', we:'oc_we' });
  const VALID_ROLES = Object.freeze(['leader','dr','ee','we']);
  const ROLE_LABELS = Object.freeze({
    leader:'Leider', dr:'Driver (DR)', ee:'Explosieven Expert (EE)', we:'Wapen Expert (WE)'
  });
  const ROLE_REQUIREMENTS = Object.freeze({
    dr:Object.freeze({ vehicle:true, description:'Selecteer een beschikbare auto' }),
    ee:Object.freeze({ explosive:'C4', description:'Selecteer C4' }),
    we:Object.freeze({ weapon:'Tommy Gun', weaponCount:2, bullets:100, description:'Zet 2 Tommy Guns en 100 kogels in' })
  });
  const FLOW = Object.freeze([
    'CHECK_TIMER','OPEN_GROUP_CRIMES','OPEN_OC','LEADER_FILL_INVITES','LEADER_SEND_INVITES',
    'WAIT_DR_READY','WAIT_EE_READY','WAIT_WE_READY','LEADER_START_OC','WAIT_RESULT',
    'PAYOUT_DR','PAYOUT_EE','PAYOUT_WE','COMPLETE'
  ]);

  const savedRoleRaw = String(GM_Get(K_ROLE,'leader') || 'leader').toLowerCase();
  let role = savedRoleRaw === 'slave' || savedRoleRaw === 'driver' ? 'dr' : savedRoleRaw;
  if (!VALID_ROLES.includes(role)) role = 'leader';
  let requestedEnabled = !!GM_Get(K_ON,false);
  let state = requestedEnabled ? 'PREP_WAIT_HTML' : 'IDLE';
  let nextAt = Date.now() + 60_000;

  function names(){
    return {
      dr:String(GM_Get(ROLE_KEYS.dr,'') || '').trim(),
      ee:String(GM_Get(ROLE_KEYS.ee,'') || '').trim(),
      we:String(GM_Get(ROLE_KEYS.we,'') || '').trim()
    };
  }
  function missingNames(){
    const n=names();
    return ['dr','ee','we'].filter(k=>!n[k]);
  }
  function registry(){ return unsafeWindow.mrbModuleStateRegistry; }
  function publish(detail=''){
    registry()?.set?.('oc',{
      state, detail, enabled:requestedEnabled, requestedEnabled, prepMode:true, role, nextAt,
      participants:names(), requirements:ROLE_REQUIREMENTS, lastUpdate:Date.now()
    });
  }
  function saveRole(nextRole){
    role=VALID_ROLES.includes(nextRole)?nextRole:'leader';
    GM_Set(K_ROLE,role);
    publish(requestedEnabled ? 'rol opgeslagen; OC actief en wacht op HTML-koppeling' : 'rol opgeslagen; OC staat uit');
    paint();
  }

  // Adapterlaag: deze functies worden na ontvangst van de actuele HTML ingevuld.
  // Tot die tijd voeren ze bewust geen DOM-acties uit.
  const htmlAdapter = Object.freeze({
    findLeadLink:()=>null,
    findAcceptLink:()=>null,
    findLeaderInviteFields:()=>({dr:null,ee:null,we:null}),
    findSendInvitesButton:()=>null,
    detectReadyRoles:()=>({dr:false,ee:false,we:false}),
    findDriverVehicleControl:()=>null,
    findExplosivesControl:()=>null,
    findWeaponControls:()=>({weapon:null,count:null,bullets:null}),
    findParticipantConfirmButton:()=>null,
    findStartButton:()=>null,
    findResult:()=>null,
    findPayoutControl:(_role)=>null
  });

  function buildPayoutQueue(){
    const n=names();
    return ['dr','ee','we'].map(key=>({role:key,name:n[key],state:`PAYOUT_${key.toUpperCase()}`}));
  }
  function validatePreparation(){
    const missing=missingNames();
    return {
      ready:missing.length===0,
      missing,
      role,
      roleLabel:ROLE_LABELS[role],
      participants:names(),
      requirements:ROLE_REQUIREMENTS,
      payoutQueue:buildPayoutQueue(),
      flow:[...FLOW]
    };
  }

  const block=addBlock(`
    <h4>OC <span style="font-size:10px;opacity:.8;">TEST / VOORBEREIDING</span></h4>
    <div class="gm-row" style="display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;">
      ${VALID_ROLES.map(r=>`<label><input type="radio" name="ocRoleV1127" value="${r}" ${role===r?'checked':''}> ${ROLE_LABELS[r]}</label>`).join('')}
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;margin-top:6px;">
      <button id="ocToggleV1127" class="gm-btn">${requestedEnabled?'Stop':'Start'}</button>
      <div id="ocStatusV1127" class="gm-status"></div>
    </div>
    <div id="ocPrepDetailsV1127" style="font-size:11px;line-height:1.35;margin-top:6px;opacity:.9;"></div>
  `,'03-oc');

  function paint(){
    const check=validatePreparation();
    const status=block.querySelector('#ocStatusV1127');
    const details=block.querySelector('#ocPrepDetailsV1127');
    const toggle=block.querySelector('#ocToggleV1127');
    if(toggle) toggle.textContent=requestedEnabled?'Stop':'Start';
    block.classList.toggle('gm-block-active',requestedEnabled);
    if(status) status.innerHTML=requestedEnabled?'<span class="ok">ACTIEF</span>':'<span class="bad">UIT</span>';
    if(details){
      const missing=check.missing.length ? `Ontbrekende namen: ${check.missing.map(x=>x.toUpperCase()).join(', ')}` : 'DR, EE en WE zijn ingevuld';
      details.innerHTML=`${requestedEnabled?'Wacht op HTML — er worden nog geen OC-acties uitgevoerd':'Module gestopt'}<br>${missing}<br>DR: auto • EE: C4 • WE: 2 Tommy Guns + 100 kogels<br>Leider: starten na 3× gereed → uitbetalen aan DR, EE en WE`;
    }
  }
  block.querySelectorAll('input[name="ocRoleV1127"]').forEach(el=>el.addEventListener('change',e=>saveRole(e.target.value)));
  block.querySelector('#ocToggleV1127')?.addEventListener('click',()=>{
    requestedEnabled=!requestedEnabled;
    GM_Set(K_ON,requestedEnabled);
    state=requestedEnabled?'PREP_WAIT_HTML':'IDLE';
    nextAt=requestedEnabled?Date.now()+60_000:0;
    GM_Set(K_STATE,state);
    GM_Set(K_NEXT,nextAt);
    publish(requestedEnabled?'OC actief; wacht op HTML-koppeling':'OC handmatig gestopt');
    paint();
    try{ unsafeWindow.__mrbRefreshCategories?.(); }catch(e){}
  });

  async function runStep(context){
    try{ context?.releaseAction?.(); }catch(e){}
    if(!requestedEnabled){
      state='IDLE'; nextAt=0; GM_Set(K_STATE,state); GM_Set(K_NEXT,nextAt); publish('OC staat uit');
      return {nextAt:0,status:'OC uit',enabled:false};
    }
    state='PREP_WAIT_HTML';
    nextAt=Date.now()+60_000;
    GM_Set(K_STATE,state);
    GM_Set(K_NEXT,nextAt);
    publish('OC bewust geblokkeerd tot actuele HTML-selectors zijn gekoppeld');
    return {nextAt,status:'OC voorbereiding: wacht op HTML',enabled:true};
  }

  unsafeWindow.mrbOCPreparation = Object.freeze({
    version:'11.12.7', prepMode:PREP_MODE, roles:VALID_ROLES, labels:ROLE_LABELS,
    requirements:ROLE_REQUIREMENTS, flow:FLOW, names, validate:validatePreparation,
    payoutQueue:buildPayoutQueue, htmlAdapter
  });
  unsafeWindow.mrbOC2Control = Object.freeze({
    version:'11.12.7-prep-toggle', isEnabled:()=>requestedEnabled, isPlannerManaged:()=>true,
    role:()=>role, state:()=>state, prepMode:()=>true
  });
  unsafeWindow.mrbV9OC = {
    version:'11.12.7-prep', setPlannerManaged(){}, nextAt:()=>nextAt,
    runStep, wake(){ nextAt=Date.now(); unsafeWindow.mrbV9Planner?.updateTask?.(TASK_ID,{nextAt,status:'OC wacht op HTML'}); },
    getState:()=>({enabled:requestedEnabled,requestedEnabled,prepMode:true,role,state,nextAt,...validatePreparation()})
  };

  paint();
  publish(requestedEnabled?'OC actief; wacht op HTML-koppeling':'OC staat uit');
})();

// =====================================================================
// =====================================================================
// MRB GOLD EDITION v9.2.0 — FASE 3
// - Crimes en Cars als eerste modules gekoppeld aan de centrale V9 Planner.
// - De bestaande bewezen uitvoerflow blijft behouden.
// - De losse 1-seconde interval wordt in planner-modus uitgeschakeld.
// - Legacy D&D is uit dit Crimes/Cars-blok verwijderd; de aparte centrale D&D-module is exclusief.
// =====================================================================

// CRIMESBLOK
// =====================================================================
;(function CrimesCars(){

  // ---- Config
  const INFO_PAGE      = '/information.php';
  const CRIMES_QS      = '/?module=Crimes';
  const CARS_QS        = '/?module=Cars';
  const SMUGGLING_QS   = '/smuggling.php';

  const TICK_MS = 1000;
  const CLICK_TIMEOUT_MS = 1500; // aangepast van 8000 naar 1500

  // Variabele vertraging voor Crimes / Cars acties (instelbaar via Timer-blok)
  const CRIME_ACTION_DELAY_MIN_MS = 3000;
  const CRIME_ACTION_DELAY_MAX_MS = 5000;

  const FALLBACK_CRIMES_MS = 80_250;   // 80.2s
  const FALLBACK_CARS_MS   = 270_250;  // 270.2s
  const TOO_EARLY_RETRY_MS = 1_000;    // bij "Too tired" zonder popup countdown
  const JAIL_PAUSE_MS      = 10_000;   // centrale jail-pauze hele blok

  // D&D mag alleen als Crimes én Cars nog > 30 sec hebben
  const DD_MIN_BUFFER_MS = 30_000;
  const DD_POST_RUN_GRACE_MS = 3_000;

  // Confirm-sync na action
  const INFO_CONFIRM_TIMEOUT_MS = 8000;

  // Passieve achtervang-sync
  const PASSIVE_INFO_SYNC_MS = 25_000;

  // ---- Keys
  const K_RUN   = 'cc_running';
  const K_DOCR  = 'cc_doCrimes';
  const K_DOCA  = 'cc_doCars';
  const K_DODD  = 'cc_doDD';
  const K_BUY   = 'cc_buyout';

  const K_CR_NEXT      = 'cc_crimes_next';
  const K_CA_NEXT      = 'cc_cars_next';
  const K_DD_RETRY     = 'cc_dd_retry';
  const K_JAIL_UNTIL   = 'cc_jail_until';

  // ---- SPA loader
  const loadPage = (()=>{
    try{
      const gui = unsafeWindow?.omerta?.GUI?.container;
      if (unsafeWindow.mrbNavigate) return h=>unsafeWindow.mrbNavigate(h,{source:'crimes-cars'});
      if (gui && typeof gui.loadPage === 'function') return h=>gui.loadPage(h);
    }catch{}
    return h=>{
      // Barafranca NL gebruikt SPA-routes zoals /index.php#/?module=Cars.
      // De oude fallback stuurde /?module=Cars naar de root-query, waardoor Cars soms niet laadde.
      if (h.startsWith('/?module=')) location.href = '/index.php#' + h;
      else if (h.startsWith('?module=')) location.href = '/index.php#/' + h;
      else if (h.startsWith('?')) location.search = h;
      else if (h.startsWith('#')) location.hash = h.slice(1);
      else location.href = h;
    };
  })();

  // ---- Helpers
  function q(sel, root=document){ return root.querySelector(sel); }
  const norm = s => String(s||'').replace(/\s+/g,' ').trim();

  function pageText(){ return norm(document.body?.innerText || ''); }

  function gameContainer(){
    return document.querySelector('#game_container');
  }

  function gameText(){
    return norm(gameContainer()?.innerText || '');
  }

  function currentModuleClass(){
    return String(gameContainer()?.className || '');
  }

  function onRelevantJailModule(){
    const href = location.href || '';
    const moduleClass = currentModuleClass();

    return (
      /modulelegacy.*smuggl/i.test(moduleClass) ||
      /modulelegacy.*crime/i.test(moduleClass) ||
      /modulelegacy.*car/i.test(moduleClass) ||
      /smuggling\.php\b/i.test(href) ||
      /[?&]module=Crimes\b/i.test(href) ||
      /[?&]module=Cars\b/i.test(href)
    );
  }

  function jailBuyoutButton(){
    const gc = gameContainer();
    if (!gc) return null;
    return gc.querySelector('form[action="/iminjail.php"] input[type="submit"][name="buymeout"], input[type="submit"][name="buymeout"]');
  }

  function isVisible(el){
    return !!el && (el.offsetParent !== null) &&
      (getComputedStyle(el).visibility !== 'hidden') &&
      (getComputedStyle(el).display !== 'none');
  }

  function isLoggedOut(){ return gm_isGateVisible(); }
  function captchaActief(){ return document.getElementById('recaptcha-popup') !== null; }

  function safeClick(el){
    try{ el.click(); }
    catch{ el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window})); }
  }

  function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

  function crimeActionDelay(){
    if (typeof unsafeWindow.mrbVarDelayMs === 'function') return unsafeWindow.mrbVarDelayMs();
    return CRIME_ACTION_DELAY_MIN_MS + Math.floor(Math.random() * (CRIME_ACTION_DELAY_MAX_MS - CRIME_ACTION_DELAY_MIN_MS + 1));
  }

  function remainingMs(nextTs){
    return Math.max(0, Number(nextTs || 0) - Date.now());
  }

  function setInputValue(input, value){
    if (!input) return;
    input.value = String(value);
    input.dispatchEvent(new Event('input',  { bubbles:true }));
    input.dispatchEvent(new Event('change', { bubbles:true }));
  }

  function setRadioValue(name, value){
    const el = document.querySelector(`input[type="radio"][name="${name}"][value="${value}"]`);
    if (!el) return false;
    el.checked = true;
    el.dispatchEvent(new Event('change', { bubbles:true }));
    return true;
  }

  function getBuySellButton(){
    return Array.from(document.querySelectorAll('input[type="submit"]'))
      .find(btn => /buy\/sell/i.test(btn.value || '') && isVisible(btn) && !btn.disabled) || null;
  }

  function rowShowsNow(raw){
    const t = norm(raw);
    if (!t) return false;
    if (/\bnow\b/i.test(t)) return true;
    const ms = parseRemainingToMs(t);
    return ms === 0;
  }

  function onInfoPage(){
    const href = location.href;
    const path = location.pathname || '';
    if (/information\.php\b/i.test(path + href) || /[?&]module=Information\b/i.test(href)) return true;

    // Omerta wisselt de game-container via SPA zonder de browser-URL altijd
    // mee te veranderen. Herken Mijn Account daarom ook aan moduleklasse en
    // de twee vaste timerlabels die voor Crimes/Cars nodig zijn.
    const gc = gameContainer();
    const cls = String(gc?.className || '');
    if (/moduleInformation|information/i.test(cls)) return true;
    const t = norm(gc?.innerText || gc?.textContent || '');
    return /Volgende\s+misdaadpoging|Next\s+crime\s+attempt/i.test(t)
      && /Volgende\s+autojatpoging|Next\s+car\s+(?:theft\s+)?attempt/i.test(t);
  }

  function kindToPage(kind){
    return kind === 'crimes' ? CRIMES_QS : CARS_QS;
  }

  function readPopupCountdownMs(){
    const li = document.querySelector('.popup-countdown-footer li[data-time-end][data-timecb="popupButtonNow"]');
    if (!li) return null;

    const raw = li.getAttribute('data-time-end') || li.dataset.timeEnd;
    const endSec = parseInt(raw || '', 10);
    if (!Number.isFinite(endSec) || endSec <= 0) return null;

    return Math.max(0, (endSec * 1000) - Date.now());
  }

  // De echte Omerta cooldownknop heeft voor Crimes en Cars hetzelfde ID.
  // Het onclick-doel bepaalt bij welke module hij hoort. Tekst en leestekens
  // zijn daarom bewust niet leidend.
  function getReadyPopupButton(kind){
    const moduleRoot = document.querySelector(kind === 'crimes' ? '#module_Crimes' : '#module_Cars');
    const btn = moduleRoot?.querySelector('#popupButtonNow') || document.querySelector('#popupButtonNow');
    if (!btn || btn.disabled || !isVisible(btn)) return null;

    const onclick = String(btn.getAttribute('onclick') || '');
    const expected = kind === 'crimes' ? 'menu-item-crimes-crimes' : 'menu-item-crimes-cars';
    if (onclick && !onclick.includes(expected)) return null;

    const countdown = readPopupCountdownMs();
    if (countdown !== null && countdown > 1000) return null;
    return btn;
  }

  function resumeFromReadyPopup(kind){
    const btn = getReadyPopupButton(kind);
    if (!btn) return false;

    safeClick(btn);
    // De knop opent de echte Crimes/Cars-keuzepagina via de menu-handler.
    // Houd dezelfde actiecyclus en lease vast; start geen nieuwe navigatie.
    setTimeout(()=>{
      if (!running || pausedCaptcha || current !== kind) return;
      waitAndClick(kind);
    }, 700);
    return true;
  }

  // ---- State
  let running    = !!GM_Get(K_RUN, false);
  let gatePaused = false;

  let doCrimes = !!GM_Get(K_DOCR, true);
  let doCars   = !!GM_Get(K_DOCA, true);
  let doDD     = false; // v11.12.8: legacy D&D permanent uitgeschakeld
  let buyOut   = !!GM_Get(K_BUY,  false);

  // Oude opgeslagen vinkstatus migreren: centrale D&D is voortaan de enige uitvoerder.
  if (GM_Get(K_DODD, false)) GM_Set(K_DODD, false);

  let crimesNext = Number(GM_Get(K_CR_NEXT, Date.now())) || Date.now();
  let carsNext   = Number(GM_Get(K_CA_NEXT, Date.now())) || Date.now();
  let ddRetryAt  = Number(GM_Get(K_DD_RETRY, 0)) || 0;
  let jailUntil  = Number(GM_Get(K_JAIL_UNTIL, 0)) || 0;

  let ddBoozeReady = false;
  let ddDrugsReady = false;

  let tickId = null;
  let plannerMode = false;
  let captchaObserver = null;
  let pausedCaptcha = false;
  let beeped = false;

  let busy = false;
  let current = ''; // 'crimes' | 'cars' | 'dd'

  let obs = null;
  let clickTimeoutId = null;
  let outcomeTimeoutId = null;
  let crimeActionTimerId = null;
  let forcedRetryTimerId = null;
  let forcedRetryKind = '';
  let forcedRetryUntil = 0;

  let confirmObs = null;
  let confirmTimeoutId = null;
  let confirmPendingKind = '';

  let lastJailParkAt = 0;
  let lastPassiveInfoSyncAt = 0;

  // captcha resume state
  let resumeNeeded = false;
  let resumeKind = '';
  let resumePhase = '';

  // ---- UI
  const block = addBlock(`
    <h4>Crimes</h4>

    <button id="ccToggle" class="gm-btn">${running ? 'Stop' : 'Start'}</button>

    <div class="gm-row" style="gap:10px;margin-top:6px;">
      <label><input type="checkbox" id="ccDoCr"> Crimes</label>
      <label><input type="checkbox" id="ccDoCa"> Cars</label>
      <label><input type="checkbox" id="ccBuy"> Buy out</label>
    </div>

    <div id="ccStatus" class="gm-status" style="margin-top:6px;"></div>
  `,'03-crimes-cars');

  function jailPauseActive(){
    return Date.now() < jailUntil;
  }

  function forcedRetryActive(){
    return !!forcedRetryKind && Date.now() < forcedRetryUntil;
  }

  function statusText(){
    const r = running ? '✅ Actief' : '⛔';
    const cap = pausedCaptcha ? ' — ⏸️ Captcha' : '';
    const gate = gatePaused ? ' — ⏸️ Gate' : '';
    const jail = jailPauseActive() ? ` — ⏸️ Jail ${Math.ceil((jailUntil - Date.now())/1000)}s` : '';
    const early = forcedRetryActive() ? ` — ⏳ Retry ${forcedRetryKind} ${Math.ceil((forcedRetryUntil - Date.now())/1000)}s` : '';
    const conf = confirmPendingKind ? ` — 🔎 Confirm ${confirmPendingKind}` : '';
    const plan = plannerMode ? ' — 🧭 V9 Planner' : '';
    return `${r}${cap}${gate}${jail}${early}${conf}${plan}`;
  }

  function paint(){
    const tBtn = q('#ccToggle', block);
    if (tBtn) tBtn.textContent = running ? 'Stop' : 'Start';

    const cr = q('#ccDoCr', block);
    const ca = q('#ccDoCa', block);
    const bo = q('#ccBuy',  block);

    if (cr) cr.checked = !!doCrimes;
    if (ca) ca.checked = !!doCars;
    if (bo) bo.checked = !!buyOut;

    const st = q('#ccStatus', block);
    if (st) st.textContent = statusText();
  }

  // ---- beep
  let audioCtx = null;
  function ensureAudio(){
    if (!audioCtx){
      try{ audioCtx = new (unsafeWindow.AudioContext||unsafeWindow.webkitAudioContext)(); }catch{}
    }
    return !!audioCtx;
  }
  function beep(){
    if (!ensureAudio()) return;
    try{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      o.type='square'; o.frequency.value=880;
      o.connect(g); g.connect(audioCtx.destination);
      g.gain.setValueAtTime(0.06, audioCtx.currentTime);
      o.start(); o.stop(audioCtx.currentTime+0.25);
    }catch{}
  }

  function stopWaiters(){
    if (obs){ try{obs.disconnect();}catch{} obs=null; }
    if (clickTimeoutId){ clearTimeout(clickTimeoutId); clickTimeoutId=null; }
    if (outcomeTimeoutId){ clearTimeout(outcomeTimeoutId); outcomeTimeoutId=null; }
    if (crimeActionTimerId){ clearTimeout(crimeActionTimerId); crimeActionTimerId=null; }
  }

  function clearForcedRetry(){
    if (forcedRetryTimerId){
      clearTimeout(forcedRetryTimerId);
      forcedRetryTimerId = null;
    }
    forcedRetryKind = '';
    forcedRetryUntil = 0;
  }

  function stopConfirmSync(){
    if (confirmObs){ try{ confirmObs.disconnect(); }catch{} confirmObs = null; }
    if (confirmTimeoutId){ clearTimeout(confirmTimeoutId); confirmTimeoutId = null; }
    confirmPendingKind = '';
  }

  function setDDRetry(ms){
    ddRetryAt = Date.now() + Math.max(0, ms);
    GM_Set(K_DD_RETRY, ddRetryAt);
  }

  function finishDD(ms = DD_POST_RUN_GRACE_MS){
    setDDRetry(ms);
    busy = false;
    current = '';
    paint();
  }

  function parkOnInfoDuringJail(){
    const now = Date.now();
    if (onInfoPage()) return;
    if (now - lastJailParkAt < 1500) return;
    lastJailParkAt = now;
    loadPage(INFO_PAGE);
  }

  function enterJailPause(reason=''){
    clearForcedRetry();
    stopConfirmSync();

    jailUntil = Date.now() + JAIL_PAUSE_MS;
    GM_Set(K_JAIL_UNTIL, jailUntil);

    busy = false;
    current = '';
    stopWaiters();

    parkOnInfoDuringJail();

    try{ console.warn('[Crimes/Cars/D&D] Jail-pauze gestart:', { until: jailUntil, ms: JAIL_PAUSE_MS, reason }); }catch{}
    paint();
  }

  function parkForPopupCountdown(kind, remainingMs){
    clearForcedRetry();
    stopConfirmSync();
    stopWaiters();

    const targetTs = Date.now() + Math.max(0, remainingMs) + 200;

    if (kind === 'crimes'){
      crimesNext = targetTs;
      GM_Set(K_CR_NEXT, crimesNext);
    } else if (kind === 'cars'){
      carsNext = targetTs;
      GM_Set(K_CA_NEXT, carsNext);
    }

    busy = false;
    current = '';
    loadPage(INFO_PAGE);
    paint();
  }

  // ===================================================================
  // JAIL DETECT
  // ===================================================================
  function jailNowDetected(){
    const gc = gameContainer();
    if (!gc) return false;
    if (!onRelevantJailModule()) return false;

    if (jailBuyoutButton()) return true;

    const t = gameText();
    if (!t) return false;

    const hasTimer = !!gc.querySelector('span[data-time-end]');
    const hasMain  = /You are in jail for the next/i.test(t);
    const hasCops  = /The cops are all over you\./i.test(t);
    const hasWing  = /You'?re in the top security wing\./i.test(t);

    return (hasMain && hasTimer) || (hasMain && hasCops) || (hasMain && hasWing);
  }
  function jailFreeDetected(){
    const t = gameText();
    return /Thanks to your contacts, you are free again! But favours don't last forever/i.test(t);
  }

  // ===================================================================
  // CAPTCHA PAUSE/RESUME
  // ===================================================================
  function setCaptchaPaused(on){
    if (on === pausedCaptcha) return;
    pausedCaptcha = on;

if (pausedCaptcha){
  if (!resumeNeeded && running && busy && current && current !== 'dd'){
    resumeNeeded = true;
    resumeKind = current;
    resumePhase = outcomeTimeoutId ? 'afterClick' : 'waiting';
  }

  if (!beeped){ beep(); beeped = true; }

  stopWaiters();
  stopConfirmSync();
  clearForcedRetry();

    } else {
      beeped = false;

      if (running && resumeNeeded && resumeKind){
        const k = resumeKind;
        const p = resumePhase;

        resumeNeeded = false;
        resumeKind = '';
        resumePhase = '';

        setTimeout(()=>{
          if (!running) return;
          if (captchaActief()) return;
          if (jailPauseActive()) return;
          if (forcedRetryActive()) return;
          if (confirmPendingKind) return;

          if (p === 'afterClick'){
            handleOutcome(k);
          } else {
            loadPage(kindToPage(k));
            setTimeout(()=> waitAndClick(k), 500);
          }
        }, 600);
      }
    }

    paint();
  }

  function attachCaptchaObserver(){
    if (captchaObserver) try{captchaObserver.disconnect();}catch{}
    captchaObserver = new MutationObserver(()=> setCaptchaPaused(captchaActief()) );
    captchaObserver.observe(document.documentElement, {childList:true,subtree:true});
    setCaptchaPaused(captchaActief());
  }

  function detachCaptchaObserver(){
    if (!captchaObserver) return;
    try{captchaObserver.disconnect();}catch{}
    captchaObserver = null;
    pausedCaptcha = false;
    beeped = false;
    resumeNeeded = false;
    resumeKind = '';
    resumePhase = '';
  }

  // ===================================================================
  // INFO TIMER LEZEN
  // ===================================================================
  function parseRemainingToMs(raw){
    const t = norm(raw);
    if (!t) return null;

    // Zowel Engelse als Nederlandse directe beschikbaarheidslabels.
    // Zonder `Nu` bleef flightMs null, waardoor D&D ten onrechte op
    // WAIT_TRAVEL_TIMER / een verouderde sync bleef staan.
    if (/\b(ready|klaar|done|beschikbaar|now|nu)\b/i.test(t)) return 0;
    if (/^\-+$/.test(t)) return 0;

    const m = t.match(/\b(\d{1,2}):(\d{2})(?::(\d{2}))?\b/);
    if (m){
      const a = Number(m[1]), b = Number(m[2]);
      const c = (m[3]!==undefined) ? Number(m[3]) : null;
      if (c!==null) return ((a*3600)+(b*60)+c) * 1000;
      return ((a*60)+b) * 1000;
    }

    let mins=0, secs=0, hrs=0;
    const mh = t.match(/(\d+)\s*(h|uur|uren)\b/i);
    const mm = t.match(/(\d+)\s*(m|min|mins|minuut|minuten)\b/i);
    const ms = t.match(/(\d+)\s*(s|sec|secs|seconde|seconden)\b/i);
    if (mh) hrs = Number(mh[1]);
    if (mm) mins = Number(mm[1]);
    if (ms) secs = Number(ms[1]);
    if (mh || mm || ms) return ((hrs*3600)+(mins*60)+secs) * 1000;

    return null;
  }

  function getInfoRowText(row){
    if (!row) return '';
    const tds = Array.from(row.querySelectorAll('td')).map(td=>norm(td.textContent));
    const joined = tds.filter(Boolean).join(' | ');
    return joined || norm(row.textContent);
  }

  function readTimersFromRoot(root=document){
    const tables = root.querySelectorAll('.thinline');
    const t1 = tables?.[1] || null;
    if (!t1) return {
      crimesMs:null,
      carsMs:null,
      flightMs:null,
      ddBoozeReady:false,
      ddDrugsReady:false
    };

    const rows = Array.from(t1.querySelectorAll('tbody tr'));

    // Zoek Crimes en Cars op hun zichtbare label in plaats van vaste rijnummers.
    // De Mijn Account-layout kan per account/versie een rij verschuiven.
    const findTimerRow = re => rows.find(row => {
      const cells = Array.from(row.querySelectorAll('th,td'));
      const label = norm(cells[0]?.textContent || '');
      return re.test(label);
    }) || null;

    const rCr = findTimerRow(/^(?:Volgende\s+misdaadpoging|Next\s+crime\s+attempt)\b/i);
    const rCa = findTimerRow(/^(?:Volgende\s+autojatpoging|Next\s+car\s+(?:theft\s+)?attempt)\b/i);
    const rDdBooze  = rows?.[12] || null;
    const rDdDrugs  = rows?.[13] || null;

    const timerValueText = row => {
      if (!row) return '';
      const cells = Array.from(row.querySelectorAll('th,td'));
      return norm((cells[cells.length - 1] || row).textContent || '');
    };

    const crimesMs = parseRemainingToMs(timerValueText(rCr));
    const carsMs   = parseRemainingToMs(timerValueText(rCa));

    // Zoek de vluchttimer op label, omdat de rijpositie per layout kan verschillen.
    let flightMs = null;
    for (const row of Array.from(root.querySelectorAll('tr'))) {
      const cells = Array.from(row.querySelectorAll('th,td'));
      if (cells.length < 2) continue;
      const label = String(cells[0]?.textContent || '').replace(/\s+/g,' ').trim();
      if (!/volgende\s+(?:vlucht|reis)|next\s+(?:flight|travel)/i.test(label)) continue;
      flightMs = parseRemainingToMs(String(cells[cells.length-1]?.textContent || '').trim());
      break;
    }

    const ddBoozeReadyNow = rowShowsNow(getInfoRowText(rDdBooze));
    const ddDrugsReadyNow = rowShowsNow(getInfoRowText(rDdDrugs));

    return {
      crimesMs,
      carsMs,
      flightMs,
      ddBoozeReady: ddBoozeReadyNow,
      ddDrugsReady: ddDrugsReadyNow
    };
  }

  function syncAllFromInfoOnce(){
    if (!onInfoPage()) return false;

    const tables = document.querySelectorAll('.thinline');
    if (!tables?.[1]) return false;

    const parsed = readTimersFromRoot(document);

    if (parsed.crimesMs !== null){
      crimesNext = Date.now() + Math.max(0, parsed.crimesMs);
      GM_Set(K_CR_NEXT, crimesNext);
    }

    if (parsed.carsMs !== null){
      carsNext = Date.now() + Math.max(0, parsed.carsMs);
      GM_Set(K_CA_NEXT, carsNext);
    }

    if (parsed.flightMs !== null){
      const now = Date.now();
      const flightMs = Math.max(0, Number(parsed.flightMs) || 0);
      GM_Set('mrb_core_flight_next_ts', now + flightMs);
      GM_Set('mrb_core_flight_sync_at', now);
      GM_Set('mrb_core_flight_ready', flightMs <= 0);
    }

    ddBoozeReady = !!parsed.ddBoozeReady;
    ddDrugsReady = !!parsed.ddDrugsReady;

    return true;
  }

  // ===================================================================
  // ACHTERGROND TIMER-SYNC
  // Leest Information via een normale same-origin GET, zodat handmatig
  // navigeren de opgeslagen cooldowns niet verouderd achterlaat.
  // ===================================================================
  let backgroundSyncBusy = false;
  let backgroundSyncTimer = null;
  let lastBackgroundSyncAt = 0;

  function applyParsedTimers(parsed, source='background'){
    if (!parsed) return false;
    let changed = false;
    const now = Date.now();

    if (parsed.crimesMs !== null){
      const next = now + Math.max(0, parsed.crimesMs);
      if (Math.abs(next - crimesNext) > 750){ crimesNext = next; changed = true; }
      GM_Set(K_CR_NEXT, crimesNext);
    }

    if (parsed.carsMs !== null){
      const next = now + Math.max(0, parsed.carsMs);
      if (Math.abs(next - carsNext) > 750){ carsNext = next; changed = true; }
      GM_Set(K_CA_NEXT, carsNext);
    }

    if (parsed.flightMs !== null){
      const flightMs = Math.max(0, Number(parsed.flightMs) || 0);
      const flightNext = now + flightMs;
      const oldFlight = Number(GM_Get('mrb_core_flight_next_ts', 0)) || 0;
      if (Math.abs(flightNext - oldFlight) > 750) changed = true;
      GM_Set('mrb_core_flight_next_ts', flightNext);
      GM_Set('mrb_core_flight_sync_at', now);
      GM_Set('mrb_core_flight_ready', flightMs <= 0);
      try {
        unsafeWindow.mrbV9Planner?.updateTask?.('v9-dnd', {
          nextAt: flightMs > 0 ? now + Math.min(flightMs, 60_000) : now + 250,
          status: flightMs > 0 ? 'wacht op reistimer' : 'reizen beschikbaar'
        });
      } catch(_) {}
    }

    const booze = !!parsed.ddBoozeReady;
    const drugs = !!parsed.ddDrugsReady;
    if (booze !== ddBoozeReady || drugs !== ddDrugsReady) changed = true;
    ddBoozeReady = booze;
    ddDrugsReady = drugs;

    if (changed){
      try {
        unsafeWindow.mrbV9Planner?.updateTask?.('v9-crimes-cars', {
          nextAt: plannerNextAt(),
          enabled: !!running,
          status: `timers gesynchroniseerd (${source})`
        });
      } catch(_) {}
      paint();
    }
    return true;
  }

  async function backgroundSyncTimers(source='periodiek'){
    if (!running || backgroundSyncBusy || isLoggedOut() || captchaActief()) return false;
    if (busy || confirmPendingKind || forcedRetryActive() || jailPauseActive()) return false;

    const now = Date.now();
    if (source === 'periodiek' && now - lastBackgroundSyncAt < 10_000) return false;
    backgroundSyncBusy = true;
    lastBackgroundSyncAt = now;

    try {
      const response = await fetch(INFO_PAGE, {
        method:'GET',
        credentials:'same-origin',
        cache:'no-store',
        headers:{'X-Requested-With':'XMLHttpRequest'}
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const parsed = readTimersFromRoot(doc);
      // Een geldige vluchttimer is op zichzelf al voldoende. Hierdoor kan
      // D&D worden vrijgegeven, ook wanneer Crimes/Cars tijdelijk niet
      // uit dezelfde response konden worden gelezen.
      if (parsed.crimesMs === null && parsed.carsMs === null && parsed.flightMs === null) return false;
      return applyParsedTimers(parsed, source);
    } catch(e){
      try { console.debug('[MRB TimerSync] achtergrond-sync overgeslagen:', e?.message || e); } catch(_) {}
      return false;
    } finally {
      backgroundSyncBusy = false;
    }
  }

  function scheduleBackgroundSync(source='handmatig', delay=900){
    if (!running) return;
    clearTimeout(backgroundSyncTimer);
    backgroundSyncTimer = setTimeout(()=>backgroundSyncTimers(source), delay);
  }

  // Handmatige SPA-navigatie en browsernavigatie opnieuw synchroniseren.
  document.addEventListener('click', (event)=>{
    if (!event.isTrusted) return;
    scheduleBackgroundSync('handmatige klik', 1200);
  }, true);
  window.addEventListener('hashchange', ()=>scheduleBackgroundSync('hashchange', 700), true);
  window.addEventListener('popstate', ()=>scheduleBackgroundSync('popstate', 700), true);
  window.addEventListener('focus', ()=>scheduleBackgroundSync('focus', 300), true);
  document.addEventListener('visibilitychange', ()=>{
    if (!document.hidden) scheduleBackgroundSync('tab actief', 300);
  }, true);
  mrbSetInterval(()=>backgroundSyncTimers('periodiek'), 15_000);

  function confirmJobOnInfo(kind){
  if (!running || pausedCaptcha || captchaActief() || isLoggedOut() || jailPauseActive()) return;

    stopConfirmSync();
    confirmPendingKind = kind;

    loadPage(INFO_PAGE);

    const applyConfirm = ()=>{
      const ok = syncAllFromInfoOnce();
      if (!ok) return false;

      stopConfirmSync();
      paint();
      return true;
    };

    if (applyConfirm()) return;

    confirmObs = new MutationObserver(()=>{
      if (applyConfirm()) return;
    });
    confirmObs.observe(document.documentElement,{childList:true,subtree:true});

    confirmTimeoutId = setTimeout(()=>{
      stopConfirmSync();
      paint();
    }, INFO_CONFIRM_TIMEOUT_MS);

    paint();
  }

  function maybePassiveInfoSync(){
    if (!running) return;
    if (!onInfoPage()) return;
    if (busy || pausedCaptcha || gatePaused) return;
    if (jailPauseActive() || forcedRetryActive() || confirmPendingKind) return;

    const now = Date.now();
    if (now - lastPassiveInfoSyncAt < PASSIVE_INFO_SYNC_MS) return;

    if (syncAllFromInfoOnce()){
      lastPassiveInfoSyncAt = now;
      paint();
    }
  }

  // ===================================================================
  // RESULT DETECTIE
  // ===================================================================
  function successDetected(){
    const t = pageText();
    if (/\bWELL DONE\b/i.test(t)) return true;
    if (document.querySelector('.success-wrapper, .success-wrapper-contents-inner')) return true;
    return false;
  }

  function attemptFailedDetected(){
    return /\bATTEMPT FAILED!\b/i.test(pageText());
  }

  function tiredDetected(){
    return /\bToo tired\b/i.test(pageText()) ||
           /You are too tired to handle another crime attempt right now/i.test(pageText());
  }

  function carSuccessDetected(){
    const t = pageText();
    if (/\bYou Stole\b/i.test(t)) return true;
    if (/\bWELL DONE\b/i.test(t)) return true;
    if (document.querySelector('.success-wrapper, .success-wrapper-contents-inner')) return true;
    return false;
  }

  // ===================================================================
  // CLICK SELECTORS
  // ===================================================================
  function readChancePercent(btn){
    if (!btn) return -1;

    function parseBestPercent(text){
      text = String(text || '').replace(/\s+/g, ' ');
      let best = -1;

      // Zichtbaar percentage, bijvoorbeeld "73%" of "73,5%".
      const pctMatches = Array.from(text.matchAll(/(\d{1,3}(?:[\.,]\d+)?)\s*%/g));
      for (const m of pctMatches){
        const n = parseFloat(String(m[1]).replace(',', '.'));
        if (Number.isFinite(n) && n >= 0 && n <= 100) best = Math.max(best, n);
      }
      if (best >= 0) return best;

      // Data-attributen kunnen bv. "chance72", "chance_72" of "chance-72" zijn.
      const chanceMatches = Array.from(text.matchAll(/chance[^0-9]*(\d{1,3}(?:[\.,]\d+)?)/gi));
      for (const m of chanceMatches){
        const n = parseFloat(String(m[1]).replace(',', '.'));
        if (Number.isFinite(n) && n >= 0 && n <= 100) best = Math.max(best, n);
      }
      return best;
    }

    // 1) Eerst alleen de knop zelf. Dit voorkomt dat een grote parent met
    // meerdere auto-opties per ongeluk het verkeerde percentage meegeeft.
    const ownText = [
      btn.getAttribute?.('data-value') || '',
      btn.getAttribute?.('data-name') || '',
      btn.getAttribute?.('data-chance') || '',
      btn.dataset?.value || '',
      btn.dataset?.name || '',
      btn.dataset?.chance || '',
      btn.value || '',
      btn.textContent || '',
      btn.getAttribute?.('title') || '',
      btn.getAttribute?.('alt') || ''
    ].join(' ');

    let n = parseBestPercent(ownText);
    if (n >= 0) return n;

    // 2) Daarna de kleinste eigen optiekaart. Alleen gebruiken als daar
    // niet meerdere actieknoppen in zitten, anders hoort het percentage
    // mogelijk bij een andere auto.
    let node = btn.parentElement;
    for (let depth = 0; node && depth < 8; depth++, node = node.parentElement){
      const actionButtons = Array.from(node.querySelectorAll('button, input[type="submit"], input[type="button"], a'))
        .filter(el => el === btn || /chance|GA\s+ERVOOR|Go\s+for\s+it|Do\s+it/i.test([
          el.getAttribute?.('data-value') || '',
          el.getAttribute?.('data-name') || '',
          el.value || '',
          el.textContent || ''
        ].join(' ')));

      if (actionButtons.length > 1) continue;

      const txt = [
        node.textContent || '',
        node.getAttribute?.('data-value') || '',
        node.getAttribute?.('data-name') || '',
        node.getAttribute?.('data-chance') || '',
        node.dataset?.value || '',
        node.dataset?.name || '',
        node.dataset?.chance || ''
      ].join(' ');

      n = parseBestPercent(txt);
      if (n >= 0) return n;
    }

    return -1;
  }

  function getActionButtons(kind){
    // Barafranca Cars gebruikt vier kaartjes. Alleen het actieve kaartje toont
    // zijn actieknop als zichtbaar element. De oude generieke selector filterde
    // daardoor eerst drie verborgen knoppen weg en zag alleen de standaard
    // actieve (vaak laatste) kaart. Rangschik daarom eerst ALLE kaartjes op hun
    // eigen headerpercentage, activeer de beste kaart en pak daarna de knop.
    if (kind === 'cars') {
      const carsRoot = document.querySelector('#nick-car-choices, #car-choices, #cars-choices, [id*="car"][id*="choices"]');
      if (carsRoot) {
        const cards = Array.from(carsRoot.querySelectorAll(':scope > .popup-box-wrapper, .popup-box-wrapper'))
          .filter((card, index, all) => all.indexOf(card) === index);

        const rankedCards = cards
          .map((card, idx) => {
            const head = card.querySelector(':scope > .popup-place-wrapper > .head, .popup-place-wrapper > .head, .head');
            const chance = (() => {
              const m = String(head?.textContent || '').match(/(\d{1,3}(?:[\.,]\d+)?)\s*%/);
              return m ? Number(String(m[1]).replace(',', '.')) : -1;
            })();
            return { card, idx, chance };
          })
          .filter(x => Number.isFinite(x.chance) && x.chance >= 0 && x.chance <= 100)
          .sort((a, b) => b.chance !== a.chance ? b.chance - a.chance : a.idx - b.idx);

        const best = rankedCards[0];
        if (best) {
          const place = best.card.querySelector('.popup-place-wrapper') || best.card;
          if (!place.classList.contains('active')) {
            try {
              const clickTarget = best.card.querySelector('.head, .content-wrapper') || place;
              clickTarget.dispatchEvent(new MouseEvent('mousedown', { bubbles:true, cancelable:true, view:window }));
              clickTarget.dispatchEvent(new MouseEvent('mouseup', { bubbles:true, cancelable:true, view:window }));
              clickTarget.click();
            } catch(e) {}
          }

          const action = best.card.querySelector(
            '.foot button, .foot input[type="submit"], .foot input[type="button"], ' +
            'button, input[type="submit"], input[type="button"], a[data-value^="chance"]'
          );
          if (action && !action.disabled) {
            try { console.log('[Crimes/Cars] Hoogste Cars-kaart gekozen:', best.chance + '%'); } catch(e) {}
            return [action];
          }
        }
      }
    }

    const rootSelectors = (kind === 'crimes')
      ? ['#crime-choices', '#game_container']
      : ['#nick-car-choices', '#car-choices', '#cars-choices', '[id*="car"][id*="choices"]', '#game_container'];

    let root = null;
    for (const sel of rootSelectors){
      root = document.querySelector(sel);
      if (root) break;
    }
    if (!root) return [];

    // NL/Gold layout kan afwijken: bij Cars zijn de knoppen niet altijd exact
    // button.btn.btn-red.btn-bold.btn-big[data-name][data-value^="chance"].
    const selectorList = [
      'button.btn.btn-red.btn-bold.btn-big[data-name][data-value^="chance"]',
      'button[data-value^="chance"]',
      'button[data-name][data-value]',
      'button.btn.btn-red',
      'input[type="submit"][data-value^="chance"]',
      'input[type="button"][data-value^="chance"]',
      'a[data-value^="chance"]',
      'button',
      'input[type="submit"]',
      'input[type="button"]'
    ];

    let buttons = [];
    for (const sel of selectorList){
      buttons = Array.from(root.querySelectorAll(sel)).filter(isVisible).filter(btn => !btn.disabled);
      if (buttons.length) break;
    }

    if (!buttons.length) return [];

    // Vermijd algemene navigatie/annuleer-knoppen wanneer we vanuit #game_container fallbacken.
    buttons = buttons.filter(btn => {
      const t = norm(btn.value || btn.textContent || btn.getAttribute('title') || btn.getAttribute('alt') || '');
      const hay = [
        t,
        btn.getAttribute('data-value') || '',
        btn.getAttribute('data-name') || '',
        btn.name || '',
        btn.id || ''
      ].join(' ');
      if (/cancel|annuleer|back|terug|close|sluit/i.test(hay)) return false;

      // Als percentage/chance zichtbaar is, is het zeker een actieknop.
      if (/(chance|\d+\s*%)/i.test(hay)) return true;

      // Fallback: in Cars/Crimes zijn de actieknoppen meestal rode grote buttons.
      if (btn.matches && btn.matches('.btn-red, .btn-big, .btn-bold')) return true;

      // Laat submit buttons toe als laatste fallback.
      return /submit|button/i.test(btn.type || btn.tagName || '');
    });

    if (!buttons.length) return [];

    // Kies bij Crimes en Cars altijd de optie met de hoogste zichtbare/uitgelezen %-kans.
    const ranked = buttons
      .map((btn, idx) => ({ btn, idx, chance: readChancePercent(btn) }))
      .sort((a, b) => {
        if (b.chance !== a.chance) return b.chance - a.chance;
        return a.idx - b.idx;
      });

    if (ranked[0] && ranked[0].chance >= 0){
      try{ console.log('[Crimes/Cars/D&D] Hoogste kans gekozen:', kind, ranked[0].chance + '%'); }catch{}
      return [ranked[0].btn];
    }

    const activeBtn = root.querySelector('.popup-place-wrapper.active button, .active button, .popup-place-wrapper.active input[type="submit"]');
    if (activeBtn && isVisible(activeBtn) && !activeBtn.disabled) return [activeBtn];

    return [buttons[0]];
  }

  // ===================================================================
  // D&D HELPERS
  // ===================================================================
  function hasSmugglingPage(){
    return !!document.querySelector('.smuggling-table-container');
  }

  function getPocketCaps(){
    let boozeCap = 50;
    let narcCap  = 16;

    try{
      const spans = Array.from(document.querySelectorAll('span'));
      const pocketSpan = spans.find(sp => /Pocket:\s*\$/i.test(sp.textContent || ''));

      if (pocketSpan){
        const txt = pocketSpan.textContent || '';
        const mB = txt.match(/Booze:\s*(\d+)/i);
        const mN = txt.match(/Narcs:\s*(\d+)/i);

        if (mB) boozeCap = parseInt(mB[1],10);
        if (mN) narcCap  = parseInt(mN[1],10);
      }
    }catch(e){
      console.log('[Crimes/Cars/D&D] Fout bij lezen pocket-capaciteit:', e);
    }

    if (!Number.isFinite(boozeCap) || boozeCap < 0) boozeCap = 50;
    if (!Number.isFinite(narcCap)  || narcCap  < 0) narcCap  = 16;

    return { boozeCap, narcCap };
  }

  function getSmugglingSection(kind){
    return document.querySelector(
      kind === 'booze'
        ? '.smuggling-table.smuggling-booze'
        : '.smuggling-table.smuggling-drugs'
    );
  }

  function readSmugglingReady(kind, fallback=false){
    const root = getSmugglingSection(kind);
    if (!root) return fallback;

    const infoTxt = norm(root.querySelector('.smuggling-table-info')?.textContent || '');
    if (/\bnow\b/i.test(infoTxt)) return true;
    if (root.querySelector('[data-time-end]')) return false;

    const ms = parseRemainingToMs(infoTxt);
    if (ms === 0) return true;
    if (ms !== null && ms > 0) return false;

    return fallback;
  }

  function parseSmugglingInventory(kind){
    const root = getSmugglingSection(kind);
    if (!root) return [];

    return Array.from(root.querySelectorAll('input[type="text"][name]')).map(input=>{
      const row = input.closest('tr');
      const tds = row ? row.querySelectorAll('td') : [];
      const unitTxt = tds?.[2] ? norm(tds[2].textContent).replace(/[^\d-]/g,'') : '0';
      const unit = parseInt(unitTxt || '0', 10);

      return {
        name: input.name,
        input,
        unit: Number.isFinite(unit) ? unit : 0
      };
    });
  }

  function clearSmugglingInputs(){
    document.querySelectorAll('.smuggling-table-container input[type="text"][name]')
      .forEach(input => setInputValue(input, 0));
  }

  async function ddGuard(label=''){
    while (running && current === 'dd' && (pausedCaptcha || captchaActief())){
      setCaptchaPaused(captchaActief());
      await sleep(500);
    }

    if (!running || current !== 'dd') return false;

    if (isLoggedOut()){
      gatePause(`Gate tijdens D&D${label ? ` (${label})` : ''}`);
      return false;
    }

    if (jailPauseActive()){
      parkOnInfoDuringJail();
      return false;
    }

    if (forcedRetryActive()){
      return false;
    }

    if (jailFreeDetected()){
      await sleep(600);
    }

    if (jailNowDetected()){
      const buyBtn = jailBuyoutButton();
      if (buyBtn && buyOut){
        safeClick(buyBtn);
        await sleep(900);
        return true;
      }

      enterJailPause(`jail during D&D${label ? ` (${label})` : ''}`);
      return false;
    }

    return true;
  }

  async function waitForSmugglingPage(timeoutMs = 8000){
    const end = Date.now() + timeoutMs;

    while (Date.now() < end){
      if (!await ddGuard('waitForSmugglingPage')) return false;
      if (hasSmugglingPage()) return true;
      await sleep(200);
    }
    return hasSmugglingPage();
  }

  async function ddSubmitAndWait(label=''){
    const btn = getBuySellButton();
    if (!btn) return false;

    // D&D submit-acties 3-5 seconden vertragen
    await sleep(crimeActionDelay());
    if (!await ddGuard(`voor-submit${label ? ` (${label})` : ''}`)) return false;

    safeClick(btn);
    await sleep(1200);

    const ok = await waitForSmugglingPage(8000);
    if (!ok){
      console.warn(`[Crimes/Cars/D&D] Submit timeout (${label})`);
    }
    return ok;
  }

  async function runDD(){
    try{
      if (!await ddGuard('start')){ finishDD(JAIL_PAUSE_MS); return; }

      loadPage(SMUGGLING_QS);

      const pageOk = await waitForSmugglingPage(9000);
      if (!pageOk){
        finishDD(5000);
        return;
      }

      if (!await ddGuard('page-ready')){ finishDD(JAIL_PAUSE_MS); return; }

      const buyBooze = readSmugglingReady('booze', ddBoozeReady);
      const buyDrugs = readSmugglingReady('drugs', ddDrugsReady);

      clearSmugglingInputs();

      const boozeItems = parseSmugglingInventory('booze');
      const drugsItems = parseSmugglingInventory('drugs');

      let hasSellWork = false;

      boozeItems.forEach(item=>{
        if (item.unit > 0){
          setInputValue(item.input, item.unit);
          hasSellWork = true;
        }
      });

      drugsItems.forEach(item=>{
        if (item.unit > 0){
          setInputValue(item.input, item.unit);
          hasSellWork = true;
        }
      });

      if (boozeItems.some(x => x.unit > 0)){
        setRadioValue('typebooze', 'sellbooze');
      }
      if (drugsItems.some(x => x.unit > 0)){
        setRadioValue('typedrugs', 'selldrugs');
      }

      if (hasSellWork){
        const sold = await ddSubmitAndWait('sell-pass');
        if (!sold){
          finishDD(5000);
          return;
        }
        if (!await ddGuard('after-sell')){ finishDD(JAIL_PAUSE_MS); return; }
      }

      clearSmugglingInputs();

      const { boozeCap, narcCap } = getPocketCaps();
      let hasBuyWork = false;

      if (buyBooze){
        const beerInput = document.querySelector('input[type="text"][name="beer"]');
        if (beerInput){
          setInputValue(beerInput, boozeCap);
          setRadioValue('typebooze', 'buybooze');
          hasBuyWork = true;
        }
      }

      if (buyDrugs){
        const glueInput = document.querySelector('input[type="text"][name="glue"]');
        if (glueInput){
          setInputValue(glueInput, narcCap);
          setRadioValue('typedrugs', 'buydrugs');
          hasBuyWork = true;
        }
      }

      if (hasBuyWork){
        const bought = await ddSubmitAndWait('buy-pass');
        if (!bought){
          finishDD(5000);
          return;
        }
        if (!await ddGuard('after-buy')){ finishDD(JAIL_PAUSE_MS); return; }
      }

      finishDD();

    } catch (err){
      console.error('[Crimes/Cars/D&D] runDD error:', err);
      finishDD(5000);
    }
  }

  // ===================================================================
  // RUNNER CORE
  // ===================================================================
  function gatePause(reason=''){
    if (!running) return;
    if (!gatePaused){
      clearTimeout(backgroundSyncTimer);
      backgroundSyncTimer = null;
      clearForcedRetry();
      stopConfirmSync();

      gatePaused = true;
      busy = false;
      current = '';
      stopWaiters();
      detachCaptchaObserver();
      paint();
      try{ console.warn('[Crimes/Cars/D&D] Pauze (gate):', reason || (typeof gm_gateReason==='function' ? gm_gateReason() : 'gate')); }catch{}
    }
  }

  function startLoop(){
    if (tickId) mrbClearInterval(tickId);
    tickId = null;
    if (plannerMode) return;
    tickId = mrbSetInterval(tick, TICK_MS);
  }

  function stopLoop(){
    if (!tickId) return;
    mrbClearInterval(tickId);
    tickId = null;
  }

  function ddEligible(){
    if (!doDD) return false;
    if (Date.now() < ddRetryAt) return false;
    if (!(ddBoozeReady || ddDrugsReady)) return false;

    const crRemain = remainingMs(crimesNext);
    const caRemain = remainingMs(carsNext);

    return crRemain > DD_MIN_BUFFER_MS && caRemain > DD_MIN_BUFFER_MS;
  }

  function pickNextJob(){
    const now = Date.now();

    const crDue = doCrimes ? crimesNext : Infinity;
    const caDue = doCars   ? carsNext   : Infinity;

    if (now >= crDue || now >= caDue){
      return (crDue <= caDue) ? 'crimes' : 'cars';
    }

    return null;
  }

  function startForcedRetry(kind){
    if (!running) return;
    if (pausedCaptcha || captchaActief()) return;
    if (isLoggedOut()) return;
    if (jailPauseActive()) return;

    busy = true;
    current = kind;
    forcedRetryKind = '';
    forcedRetryUntil = 0;
    forcedRetryTimerId = null;

    loadPage(kindToPage(kind));
    waitAndClick(kind);
    paint();
  }

  function scheduleTooEarlyRetry(kind){
    const now = Date.now();

    if (kind === 'crimes'){
      crimesNext = now + TOO_EARLY_RETRY_MS;
      GM_Set(K_CR_NEXT, crimesNext);
    } else if (kind === 'cars'){
      carsNext = now + TOO_EARLY_RETRY_MS;
      GM_Set(K_CA_NEXT, carsNext);
    } else {
      finishDD(TOO_EARLY_RETRY_MS);
      return;
    }

    stopWaiters();
    clearForcedRetry();
    stopConfirmSync();

    busy = false;
    current = '';

    forcedRetryKind = kind;
    forcedRetryUntil = now + TOO_EARLY_RETRY_MS;

    forcedRetryTimerId = setTimeout(()=>{
      startForcedRetry(kind);
    }, TOO_EARLY_RETRY_MS);

    paint();
  }

  function tick(){
    if (!running) return;

    if (isLoggedOut()){
      gatePause('Gate gedetecteerd');
      return;
    } else if (gatePaused){
      gatePaused = false;
      attachCaptchaObserver();
      paint();
    }

    if (captchaActief()){
      setCaptchaPaused(true);
      return;
    }

    if (jailPauseActive()){
      busy = false;
      current = '';
      parkOnInfoDuringJail();
      paint();
      return;
    }

    if (forcedRetryActive()){
      busy = false;
      current = '';
      paint();
      return;
    }

    if (forcedRetryKind && Date.now() >= forcedRetryUntil){
      startForcedRetry(forcedRetryKind);
      return;
    }

    if (!busy && jailNowDetected()){
      const buyBtn = jailBuyoutButton();
      if (buyBtn && buyOut){
        safeClick(buyBtn);
        paint();
        return;
      }
      enterJailPause('idle on jail');
      return;
    }

    maybePassiveInfoSync();

    if (pausedCaptcha || busy || confirmPendingKind) { paint(); return; }

    const job = pickNextJob();
    if (!job) { paint(); return; }

    busy = true;
    current = job;

    loadPage(kindToPage(job));
    waitAndClick(job);

    paint();
  }

  function waitAndClick(kind){
    stopWaiters();

    const tryOnce = ()=>{
      if (!running || pausedCaptcha) return false;
      if (isLoggedOut()){ gatePause('Gate tijdens waitAndClick'); return false; }
      if (jailPauseActive()){ parkOnInfoDuringJail(); return false; }
      if (forcedRetryActive() && forcedRetryKind !== kind){ return false; }

      if (jailFreeDetected()){
        loadPage(kindToPage(kind));
        return true;
      }

      if (jailNowDetected()){
        const buyBtn = jailBuyoutButton();
        if (buyBtn && buyOut){
          safeClick(buyBtn);
          setTimeout(()=>{ loadPage(kindToPage(kind)); }, 800);
          return true;
        }

        enterJailPause(`jail during waitAndClick (${kind})`);
        return true;
      }

      // Zodra de echte cooldownknop op Now staat, moet die eerst worden
      // aangeklikt. Anders valt de code door naar "Te moe" en plant hij
      // ten onrechte een retry van ongeveer een minuut.
      if (resumeFromReadyPopup(kind)) return true;

      const popupCountdownMs = readPopupCountdownMs();
      if (popupCountdownMs !== null){
        if (popupCountdownMs > 5000){
          parkForPopupCountdown(kind, popupCountdownMs);
          return true;
        }

        return false;
      }

      if (tiredDetected()){
        scheduleTooEarlyRetry(kind);
        return true;
      }

      const buttons = getActionButtons(kind);
      if (buttons.length){
        const chosen = (buttons.length === 1) ? buttons[0] : buttons[Math.floor(Math.random()*buttons.length)];

        // Crimes/Cars klikken pas na een random vertraging van 3-5 seconden.
        stopWaiters();
        crimeActionTimerId = setTimeout(()=>{
          crimeActionTimerId = null;

          if (!running || pausedCaptcha) return;
          if (isLoggedOut()){ gatePause('Gate vlak voor crime/cars klik'); return; }
          if (jailPauseActive()){ parkOnInfoDuringJail(); return; }
          if (forcedRetryActive() && forcedRetryKind !== kind) return;

          // Heist, Spot, Race of een handmatige klik kan tijdens de menselijke
          // 3-5s vertraging de pagina vervangen. Klik dan nooit op het inmiddels
          // losgekoppelde element, maar herstel dezelfde actiecyclus.
          if (!chosen.isConnected || !isVisible(chosen)) {
            loadPage(kindToPage(kind));
            clickTimeoutId = setTimeout(()=>{
              clickTimeoutId = null;
              if (!running || pausedCaptcha || current !== kind) return;
              waitAndClick(kind);
            }, 900);
            return;
          }

          safeClick(chosen);

          outcomeTimeoutId = setTimeout(()=>{
            outcomeTimeoutId = null;
            handleOutcome(kind);
          }, 900 + Math.floor(Math.random()*800));
        }, crimeActionDelay());

        return true;
      }
      return false;
    };

    if (tryOnce()) return;

    obs = new MutationObserver(()=>{ tryOnce(); });
    obs.observe(document.documentElement,{childList:true,subtree:true});

    clickTimeoutId = setTimeout(()=>{
      clickTimeoutId = null;
      if (!running || pausedCaptcha || jailPauseActive()) return;
      if (forcedRetryActive()) return;
      if (tryOnce()) return;
      loadPage(kindToPage(kind));

      // Eén geblokkeerde of onderbroken SPA-navigatie mag busy/current nooit
      // permanent laten staan. Blijf opnieuw armeren tot de echte actieknop
      // zichtbaar is of een geldige pauzestatus de cyclus overneemt.
      clickTimeoutId = setTimeout(()=>{
        clickTimeoutId = null;
        if (!running || pausedCaptcha || current !== kind) return;
        if (isLoggedOut() || jailPauseActive() || forcedRetryActive()) return;
        waitAndClick(kind);
      }, 1200);
    }, CLICK_TIMEOUT_MS);
  }

  function handleOutcome(kind){
    if (!running) return;

    if (captchaActief()){
      setCaptchaPaused(true);
      return;
    }
    if (pausedCaptcha) return;

    if (isLoggedOut()){ gatePause('Gate tijdens outcome'); return; }
    if (jailPauseActive()){ parkOnInfoDuringJail(); return; }
    if (forcedRetryActive()) return;

    if (jailFreeDetected()){
      busy = false;
      current = '';
      loadPage(INFO_PAGE);
      paint();
      return;
    }

    if (jailNowDetected()){
      const buyBtn = jailBuyoutButton();
      if (buyBtn && buyOut){
        safeClick(buyBtn);
        scheduleCooldown(kind);
        return;
      }

      enterJailPause(`jail during outcome (${kind})`);
      return;
    }

    // Bij een direct verlopen cooldown blijft de bestaande cyclus actief.
    // Klik de echte Now-knop en ga daarna lokaal verder; navigeer niet opnieuw
    // en geef busy/current nog niet vrij.
    if (resumeFromReadyPopup(kind)) return;

    if (attemptFailedDetected()){ scheduleCooldown(kind); return; }

    const popupCountdownMs = readPopupCountdownMs();
    if (popupCountdownMs !== null){
      if (popupCountdownMs > 5000){
        parkForPopupCountdown(kind, popupCountdownMs);
        return;
      }

      busy = false;
      current = '';
      loadPage(kindToPage(kind));
      paint();
      return;
    }

    if (tiredDetected()){
      scheduleTooEarlyRetry(kind);
      return;
    }

    if (successDetected() || (kind==='cars' && carSuccessDetected())){
      if (kind === 'cars') {
        try { unsafeWindow.mrbDashMetrics?.recordCarSuccess?.(); } catch(e) {}
      }
      scheduleCooldown(kind);
      return;
    }

    scheduleCooldown(kind);
  }

  function scheduleCooldown(kind){
    const now = Date.now();

    clearForcedRetry();
    stopConfirmSync();

    if (kind === 'crimes'){
      crimesNext = now + FALLBACK_CRIMES_MS;
      GM_Set(K_CR_NEXT, crimesNext);
      confirmJobOnInfo('crimes');
    } else if (kind === 'cars'){
      carsNext = now + FALLBACK_CARS_MS;
      GM_Set(K_CA_NEXT, carsNext);
      confirmJobOnInfo('cars');
    } else if (kind === 'dd'){
      setDDRetry(DD_POST_RUN_GRACE_MS);
    }

    busy = false;
    current = '';
    paint();
  }

  // ===================================================================
  // V9 PLANNER BRIDGE
  // Houdt de bestaande Crimes/Cars-flow intact, maar laat de centrale
  // planner bepalen wanneer tick() wordt aangeroepen.
  // ===================================================================
  function plannerNextAt(){
    const now = Date.now();
    if (!running) return now + 60_000;
    if (busy || confirmPendingKind || forcedRetryActive() || jailPauseActive()) return now + 1000;
    const candidates = [];
    if (doCrimes) candidates.push(Number(crimesNext || now));
    if (doCars) candidates.push(Number(carsNext || now));
    if (!candidates.length) return now + 15_000;
    return Math.max(now, Math.min(...candidates));
  }

  function setPlannerMode(on){
    plannerMode = !!on;
    if (plannerMode) stopLoop();
    else if (running) startLoop();
    paint();
    return plannerMode;
  }

  unsafeWindow.mrbV9CrimesCars = {
    version:'11.1.0',
    setPlannerMode,
    wake:()=>{ tick(); return plannerNextAt(); },
    resyncFromInfo:()=>{
      if (!onInfoPage()) return false;
      const ok = syncAllFromInfoOnce();
      if (ok) paint();
      return ok;
    },
    nextAt:plannerNextAt,
    isRunning:()=>running,
    isBusy:()=>busy,
    state:()=>({
      running, plannerMode, busy, current, doCrimes, doCars, doDD:false,
      crimesNext, carsNext, ddRetryAt, jailUntil, pausedCaptcha, gatePaused,
      confirmPendingKind, forcedRetryKind
    })
  };

  // ===================================================================
  // UI EVENTS
  // ===================================================================
  q('#ccToggle', block).addEventListener('click', ()=>{
    if (!running && isLoggedOut()){
      console.warn('[Crimes/Cars] Start geweigerd: je bent uitgelogd.');
      return;
    }

    running = !running;
    GM_Set(K_RUN, running);

    if (running){
      gatePaused = false;
      attachCaptchaObserver();
      startLoop();
      if (onInfoPage()) syncAllFromInfoOnce();
      scheduleBackgroundSync('module gestart', 250);
    } else {
      clearForcedRetry();
      stopConfirmSync();
      stopWaiters();
      stopLoop();
      detachCaptchaObserver();
      busy = false;
      current = '';
    }

    paint();
  });

  q('#ccDoCr', block).addEventListener('change', (e)=>{
    doCrimes = !!e.target.checked;
    GM_Set(K_DOCR, doCrimes);
    paint();
  });

  q('#ccDoCa', block).addEventListener('change', (e)=>{
    doCars = !!e.target.checked;
    GM_Set(K_DOCA, doCars);
    paint();
  });

  q('#ccBuy', block).addEventListener('change', (e)=>{
    buyOut = !!e.target.checked;
    GM_Set(K_BUY, buyOut);
    paint();
  });

  // ---- Init
  paint();
  if (running){
    if (isLoggedOut()){
      gatePause('Gate bij init');
    } else {
      attachCaptchaObserver();
      startLoop();
      if (onInfoPage()) syncAllFromInfoOnce();
      scheduleBackgroundSync('init', 500);
    }
  }

})();

// Centrale overdracht na Heist/Spot, zonder extra planner of interval.
// Retourneert true wanneer Crimes/Cars de pagina direct heeft overgenomen.
unsafeWindow.mrbResumePriorityTimers = (function(){
  let lastAt = 0;
  return function(source='module'){
    if (!/information\.php/i.test(location.href)) return false;
    const now = Date.now();
    if (now - lastAt < 500) return false;
    lastAt = now;

    try { unsafeWindow.mrbRacePriorityWake?.(source); } catch(e) {}

    try {
      const cc = unsafeWindow.mrbV9CrimesCars;
      cc?.resyncFromInfo?.();
      const st = cc?.state?.();
      if (!st?.running) return false;
      const due = !!st.busy || !!st.confirmPendingKind || !!st.forcedRetryKind
        || (!!st.doCrimes && Number(st.crimesNext || 0) <= now + 1500)
        || (!!st.doCars && Number(st.carsNext || 0) <= now + 1500);
      if (due) {
        cc?.wake?.();
        return true;
      }
    } catch(e) {
      try { console.warn('[Priority timer resume]', e); } catch(_) {}
    }
    return false;
  };
})();


// =====================================================================
// BULLETSBLOK
// =====================================================================
;(function BulletsAutoBuyer(){
  'use strict';

  // ---------- URLS ----------
  const URL_INFO    = '/information.php';
  const URL_BULLETS = '/bullets2.php';
  const URL_SLUGGS  = '/?module=Lackeys&action=tab&type=6';

  // ---------- Timings ----------
  const FALLBACK_WAIT_MS     = 60_000;
  const CHECK_MS_PRICE_HIGH  = 60_000;
  const CHECK_MS_RESET_WAIT  = 60_000;
  const CAPTCHA_RETRY_MS     = 60_000;
  const LOOP_TICK_IDLE       = 1200;
  const SLEEP_SMALL          = 400;

  // ---------- Persistente state ----------
  const K_RUN        = 'bullets_running';
  const K_MAXPRICE   = 'bullets_maxprice';
  const K_SLUGGS     = 'bullets_sluggs';
  const K_SLUGGS_ON  = 'bullets_sluggs_hired_flag'; // ons "ik weet zeker hired" vlaggetje

  let running   = GM_Get(K_RUN, false);
  let maxPrice  = Number(GM_Get(K_MAXPRICE, 800)) || 800; // default 800
  let useSluggs = !!GM_Get(K_SLUGGS, false);
  let sluggsHiredFlag = !!GM_Get(K_SLUGGS_ON, false);     // kan true zijn na hire

  // ---------- Runtime ----------
  let loopPromise = null;
  let stopFlag = false;
  let plannerManaged = false;
  let plannerBusy = false;
  const K_PLANNER_NEXT = 'v9_bullets_next_at';

  // ---------- UI ----------
  const block = addBlock(`
    <h4>Bullets</h4>

    <div class="gm-row" style="gap:8px; align-items:center; flex-wrap:wrap;">
      <div style="font-size:12px; opacity:.9;">Max prijs:</div>
      <input id="buMaxPrice" type="text" inputmode="numeric" maxlength="4"
             style="width:72px; padding:3px 6px; border-radius:6px; border:none;"
             value="${String(maxPrice)}" />
      <label style="display:flex;align-items:center;gap:6px; margin-left:auto;">
        <input type="checkbox" id="buSluggs" ${useSluggs?'checked':''}>
        Sluggs
      </label>
    </div>

    <div class="gm-row" style="gap:8px; align-items:center; margin-top:6px;">
      <button id="buToggle" class="gm-btn">${running?'Stop':'Start'}</button>
      <div id="buStatus" class="gm-status" style="margin:0;"></div>
    </div>

    <div class="gm-row" style="margin-top:6px;">
      <div id="buInfo" style="opacity:.9;font-size:12px;">-</div>
    </div>
  `,'xx-bullets');

  const q1 = (s,r=document)=> (r||document).querySelector(s);
  const qa = (s,r=document)=> Array.from((r||document).querySelectorAll(s));
  const sleep = (ms)=>new Promise(r=>setTimeout(r, ms));
  const rdelay = (min,max)=> Math.floor(min + Math.random()*(max-min+1));
  const toInt = (x)=> {
    const n = parseInt(String(x ?? '').replace(/[^\d]/g,''),10);
    return Number.isFinite(n) ? n : null;
  };

  function bodyText(){
    return (document.body?.innerText || '').replace(/\s+/g,' ').trim();
  }

  function isVisible(el){
    if (!el) return false;
    try{
      const st = window.getComputedStyle(el);
      if (st.display === 'none' || st.visibility === 'hidden' || st.opacity === '0') return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }catch{
      return true;
    }
  }

  function setStatus(){
    const el = q1('#buStatus', block);
    if (!el) return;
    const plan = plannerManaged ? ' — 🧭 V9 Planner' : '';
    el.innerHTML = running ? `<span class="ok">✅ Actief${plan}</span>` : '<span class="bad">⛔</span>';
  }

  let infoCountdownTimer = null;
  let infoCountdownTarget = 0;
  let infoCountdownBuilder = null;

  function stopInfoCountdown(){
    if (infoCountdownTimer){
      mrbClearInterval(infoCountdownTimer);
      infoCountdownTimer = null;
    }
    infoCountdownTarget = 0;
    infoCountdownBuilder = null;
  }

  function setInfo(html, keepCountdown=false){
    if (!keepCountdown) stopInfoCountdown();
    const el = q1('#buInfo', block);
    if (el) el.innerHTML = html ?? '';
  }

  function setInfoCountdown(targetAt, builder){
    stopInfoCountdown();
    infoCountdownTarget = Number(targetAt) || 0;
    infoCountdownBuilder = typeof builder === 'function' ? builder : null;

    const render = ()=>{
      if (!running || !infoCountdownTarget || !infoCountdownBuilder){
        stopInfoCountdown();
        return;
      }
      const remaining = Math.max(0, infoCountdownTarget - Date.now());
      const el = q1('#buInfo', block);
      if (el) el.innerHTML = infoCountdownBuilder(remaining);
      if (remaining <= 0) stopInfoCountdown();
    };

    render();
    infoCountdownTimer = mrbSetInterval(render, 1000);
  }

  function ui(){
    const btn = q1('#buToggle', block);
    if (btn) btn.textContent = running ? 'Stop' : 'Start';
    setStatus();
    if (!running) setInfo('-');
  }

  // --- settings handlers ---
  q1('#buMaxPrice', block).addEventListener('change', (e)=>{
    let v = String(e.target.value||'').replace(/[^\d]/g,'').slice(0,4);
    let n = parseInt(v||'0',10);
    if (!Number.isFinite(n)) n = 0;
    if (n > 9999) n = 9999;
    maxPrice = n;
    e.target.value = String(n);
    GM_Set(K_MAXPRICE, maxPrice);
  });

  q1('#buSluggs', block).addEventListener('change', (e)=>{
    useSluggs = !!e.target.checked;
    GM_Set(K_SLUGGS, useSluggs);
  });

  q1('#buToggle', block).addEventListener('click', ()=>{
    running = !running;
    GM_Set(K_RUN, running);
    stopFlag = !running;

    ui();

    if (running){
      stopFlag = false;
      GM_Set(K_PLANNER_NEXT, Date.now());
      setPlannerManaged(false);
      if (!loopPromise) loopPromise = mainLoop().finally(()=>{ loopPromise=null; });
    }
  });

  ui();

  // ---------- Navigatie helper ----------
  function loadPage(target){
    if (unsafeWindow.mrbNavigate?.(target,{source:'bullets'})) return;
    try { const gui=unsafeWindow?.omerta?.GUI?.container; if (gui&&typeof gui.loadPage==='function'){ gui.loadPage(target); return; } } catch(e) {}
    location.href=target;
  }

  // =====================================================================
  // FAILSAFES (gate + captcha)
  // =====================================================================

  function captchaActief(){
    const popup = document.getElementById('recaptcha-popup');
    if (popup && isVisible(popup)) return true;

    const candidates = document.querySelectorAll([
      'iframe[src*="recaptcha" i]',
      '.g-recaptcha',
      'img[src*="captcha" i]',
      'input[name*="captcha" i]'
    ].join(','));

    for (const el of candidates){
      if (isVisible(el)) return true;
    }

    return false;
  }

  async function waitCaptchaSolved(){
    while(running && captchaActief()){
      setStatus();
      setInfo('🧩 Captcha zichtbaar — retry over 60s…');
      await sleep(CAPTCHA_RETRY_MS);
    }
    if(!running) throw new Error('ABORT');
    await sleep(800);
  }

  function normalizeFixedDue(){
    if(!fixedRefreshOn){ fixedRefreshDue=0; fixedRefreshPendingSince=0; GM_Set(K_FIXED_DUE,0); return; }
    if(!fixedRefreshDue) fixedRefreshDue=Date.now()+fixedRefreshMinutes*60_000;
    GM_Set(K_FIXED_DUE,fixedRefreshDue);
  }
  function gateVisible(){
    try{ return typeof gm_isGateVisible === 'function' && gm_isGateVisible(); }
    catch{ return false; }
  }

  function gateReason(){
    try{ return (typeof gm_gateReason === 'function' && gm_gateReason()) || 'Gate'; }
    catch{ return 'Gate'; }
  }

  function clickLimitState(){
    try{ return (typeof gm_getClickLimitState === 'function') ? gm_getClickLimitState() : 0; }
    catch{ return 0; }
  }

  function clickLimitMsg(){
    try{ return (typeof gm_isClickLimitMessageVisible === 'function') ? gm_isClickLimitMessageVisible() : false; }
    catch{ return false; }
  }

  async function waitGateClear(){
    while(running && gateVisible()){
      setStatus();
      setInfo(`⏸ ${gateReason()} — wachten…`);
      await sleep(5000);
    }
    if(!running) throw new Error('ABORT');

    if (running && clickLimitState() === -1 && clickLimitMsg()){
      setStatus();
      setInfo('↩ Click limit klaar → terug naar info…');
      loadPage(URL_INFO);
      await sleep(1200);
    }
  }

  async function gateAndCaptchaSafe(){
    if (gateVisible()) await waitGateClear();
    if (captchaActief()) await waitCaptchaSolved();
    if(!running) throw new Error('ABORT');
  }

  async function waitWithGuards(ms){
    let left = Math.max(0, ms|0);
    while (running && left > 0){
      await gateAndCaptchaSafe();
      const step = Math.min(1000, left);
      await sleep(step);
      left -= step;
    }
    if(!running) throw new Error('ABORT');
  }

  function safeClick(el){
    if(!el) return false;
    try{ el.scrollIntoView({block:'center', inline:'center'}); }catch{}
    try{ el.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window})); }catch{}
    try{ el.dispatchEvent(new MouseEvent('mouseup',  {bubbles:true,cancelable:true,view:window})); }catch{}
    try{ el.click(); }catch{}
    return true;
  }

  async function waitForAny(selectors, timeout=20000){
    const step = 200;
    const t0 = Date.now();

    while (running && (Date.now()-t0) < timeout){
      await gateAndCaptchaSafe();

      for (const s of selectors){
        const el = document.querySelector(s);
        if (el) return el;
      }

      await sleep(step);
    }

    throw new Error('Element niet gevonden (any): ' + selectors.join(' | '));
  }

  // =====================================================================
  // INFO: Waiting times timer (Next bullet deal)
  // =====================================================================

  function getNextBulletDealCell(){
    const rows = Array.from(document.querySelectorAll('table.thinline tr'));
    for (const tr of rows){
      const a = tr.querySelector('td:first-child a[href="/bullets2.php"]');
      if (a){
        const tds = tr.querySelectorAll('td');
        return tds.length >= 2 ? tds[1] : null;
      }
    }
    return null;
  }

  function getNextBulletDealWaitMs(){
    const td = getNextBulletDealCell();
    if (!td) return null;

    const raw = (td.textContent || '').trim();
    if (/^now$/i.test(raw)) return 0;

    const span = td.querySelector('span[data-time-end]');
    if (span){
      const endSec = parseInt(span.getAttribute('data-time-end') || '', 10);
      if (Number.isFinite(endSec) && endSec > 0){
        const nowSec = Math.floor(Date.now() / 1000);
        const diffSec = Math.max(0, endSec - nowSec);
        return diffSec * 1000;
      }
    }

    let mins = 0, secs = 0;
    const m = raw.match(/(\d+)\s*M/i);
    const s = raw.match(/(\d+)\s*S/i);
    if (m) mins = parseInt(m[1], 10) || 0;
    if (s) secs = parseInt(s[1], 10) || 0;

    if (mins || secs) return (mins * 60 + secs) * 1000;
    return null;
  }

  function fmtMs(ms){
    ms = Math.max(0, ms|0);
    const sec = Math.ceil(ms/1000);
    const m = Math.floor(sec/60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  // =====================================================================
  // Activity tabel: reset-check (Bullets bought in Local Bulletfactory)
  // =====================================================================

  function infoBulletsBoughtToday(){
    const tds = qa('td');
    for (let i=0;i<tds.length;i++){
      const a = (tds[i].textContent||'').trim().toLowerCase();
      if (a.includes('bullets bought in local bulletfactory')){
        const td2 = tds[i+1];
        const firstGreen = td2?.querySelector('span.text-green');
        if (!firstGreen) return null;
        return toInt(firstGreen.textContent);
      }
    }
    return null;
  }

  function clockHour(){
    const t = (document.getElementById('omerta_clock')?.textContent || '').trim();
    const m = t.match(/^(\d{2}):\d{2}:\d{2}$/);
    if(!m) return null;
    const hh = parseInt(m[1],10);
    return Number.isFinite(hh) ? hh : null;
  }

  // Wacht tot MIDNIGHT window (uur == 00)
  async function waitUntilMidnightForFire(){
    while(running){
      await gateAndCaptchaSafe();
      loadPage(URL_INFO);
      await sleep(LOOP_TICK_IDLE);
      await gateAndCaptchaSafe();

      const hh = clockHour();
      const today = infoBulletsBoughtToday();

      if (hh === 0){
        setStatus();
        setInfo(`✅ 00:xx bereikt (today=${today ?? '—'}) → Fire Sluggs…`);
        return true;
      }

      setStatus();
      setInfo(`⏳ Sluggs actief — wachten tot 00:00 om te fire (now=${hh ?? '—'}h, today=${today ?? '—'})…`);
      await waitWithGuards(CHECK_MS_RESET_WAIT);
    }
    return false;
  }

  // =====================================================================
  // BULLETS page: detectie / max-detectie / buy
  // =====================================================================

  function isSluggsBulletsPage(){
    const header = Array.from(document.querySelectorAll('.otable .oheader')).some(h => /sluggs/i.test(h.textContent||''));
    const status = document.querySelector('[data-lackey="6"][data-info="status"]');
    const hiredTxt = (status?.textContent || '').trim().toLowerCase();
    const fireBtn = document.querySelector('input[type="button"][value="Fire"][data-lackey="6"][data-action="fire"]');
    return !!(header && status && hiredTxt.includes('hired') && fireBtn);
  }

  function looksLikeBulletsPage(){
    if (document.querySelector('#lbfAmount')) return true;
    if (document.querySelector('input[type="submit"][name="buy_sys"]')) return true;
    if (document.querySelector('[data-lackey="6"][data-info="status"]')) return true;

    const txt = bodyText().toLowerCase();
    if (txt.includes('your bullets limit')) return true;
    if (txt.includes('left to buy today')) return true;
    if (txt.includes('can buy in single purchase')) return true;
    if (txt.includes('you can buy bullets for $')) return true;
    if (txt.includes('kogels') && (txt.includes('koop') || txt.includes('kopen'))) return true;
    if (txt.includes('local bulletfactory')) return true;
    if (txt.includes('sluggs')) return true;

    return false;
  }

  async function waitBulletsPageReady(){
    const timeout = 30_000;
    const step = 250;
    const t0 = Date.now();
    let navRetries = 0;
    let lastNavRetry = 0;

    while (running && (Date.now() - t0) < timeout){
      await gateAndCaptchaSafe();

      if (
        document.querySelector('#lbfAmount') ||
        document.querySelector('[data-lackey="6"][data-info="status"]') ||
        document.querySelector('.otable .oheader') ||
        looksLikeBulletsPage()
      ){
        await sleep(150);
        return true;
      }

      if ((Date.now() - t0) > 5000 && navRetries < 2 && (Date.now() - lastNavRetry) > 4000){
        navRetries++;
        lastNavRetry = Date.now();
        setInfo(`↻ bullets2 laadt niet goed — retry ${navRetries}/2…`);
        loadPage(URL_BULLETS);
        await sleep(LOOP_TICK_IDLE);
        continue;
      }

      await sleep(step);
    }

    throw new Error('Bullets pagina niet herkend (#lbfAmount / Sluggs-status / bullets-tekst ontbreekt)');
  }

  function valueNextToLabel(patterns){
    const cells = qa('td, th');
    for (let i=0;i<cells.length;i++){
      const label = (cells[i].textContent||'').replace(/\s+/g,' ').trim();
      if (!patterns.some(re => re.test(label))) continue;

      const row = cells[i].closest('tr');
      if (row){
        const rowCells = Array.from(row.querySelectorAll('td, th'));
        const idx = rowCells.indexOf(cells[i]);
        for (let j=idx+1;j<rowCells.length;j++){
          const n = toInt(rowCells[j].textContent);
          if (n != null) return n;
        }
      }

      const next = cells[i+1];
      const n = toInt(next?.textContent);
      if (n != null) return n;
    }
    return null;
  }

  function bulletsCanBuySingle(){
    return valueNextToLabel([
      /can buy in single purchase/i,
      /per aankoop/i,
      /in een keer/i,
      /per keer/i,
      /max(?:imaal)?(?: aantal)? kogels/i
    ]);
  }

  function bulletsLeftToBuyToday(){
    return valueNextToLabel([
      /left to buy today/i,
      /vandaag nog te kopen/i,
      /resterend(?:e)? kogels/i,
      /nog te koop vandaag/i,
      /daglimiet/i
    ]);
  }

  function bulletsAmountInputValue(){
    const v = q1('#lbfAmount')?.value;
    return toInt(v ?? '');
  }

  function bulletsPageSaysCanBuyZero(){
    const txt = bodyText();
    return /you can buy\s+0\s+bullets/i.test(txt);
  }

  function isDailyMaxReached(){
    const canSingle = bulletsCanBuySingle();
    const leftToday = bulletsLeftToBuyToday();
    const amountVal = bulletsAmountInputValue();

    if (canSingle != null && canSingle <= 0) return true;
    if (leftToday != null && leftToday <= 0) return true;
    if (amountVal != null && amountVal <= 0 && bulletsPageSaysCanBuyZero()) return true;

    return false;
  }

  function bulletsPrice(){
    const txt = bodyText();
    const patterns = [
      /(?:You can buy bullets for|kogels kosten|prijs per kogel|koop kogels voor)\s*[$€]?\s*([\d.,]+)/i,
      /[$€]\s*([\d.,]+)\s*(?:a bullet|per kogel|per bullet)/i
    ];
    for (const re of patterns){
      const m = txt.match(re);
      if (m && m[1]) return toInt(m[1]);
    }
    return null;
  }

  function findBulletAmountInput(){
    return document.querySelector('#lbfAmount') ||
           document.querySelector('input[name="amount"], input[name="bullets"], input[name="bulletz"], input[name*="amount" i]') ||
           Array.from(document.querySelectorAll('input[type="number"], input[type="text"]')).find(el => {
             const row = el.closest('tr, div, form, p, td');
             const hay = ((el.name||'')+' '+(el.id||'')+' '+(el.placeholder||'')+' '+(row?.textContent||'')).toLowerCase();
             return /kogel|bullet|amount|aantal/.test(hay) && isVisible(el);
           }) || null;
  }

  function findBulletBuyButton(){
    const all = Array.from(document.querySelectorAll('input[type="submit"], input[type="button"], button'))
      .filter(el => !el.disabled && isVisible(el));
    return document.querySelector('input[type="submit"][name="buy_sys"]') ||
           all.find(el => /^(buy|koop|kopen)$/i.test(String(el.value || el.textContent || '').trim())) ||
           all.find(el => /buy.*bullet|koop.*kogel|kogels kopen/i.test(String(el.value || el.textContent || '').trim())) ||
           null;
  }

  function setNativeValue(el, value){
    if (!el) return false;
    const v = String(value);
    try { el.focus(); } catch(e) {}
    try {
      const proto = Object.getPrototypeOf(el);
      const desc = Object.getOwnPropertyDescriptor(proto, 'value');
      if (desc && desc.set) desc.set.call(el, v); else el.value = v;
    } catch(e) { el.value = v; }
    ['input','change','keyup','blur'].forEach(type => {
      try { el.dispatchEvent(new Event(type, {bubbles:true})); } catch(e) {}
    });
    return true;
  }

  async function submitBuy(){
    const amount = findBulletAmountInput();
    const buyBtn = findBulletBuyButton();
    if (!amount || !buyBtn) throw new Error('Koopformulier niet gevonden (bedragveld of Koop-knop ontbreekt).');

    await gateAndCaptchaSafe();

    // De website kan per aankoop een wisselend maximum toestaan. Het dagmaximum
    // blijft 24.000, maar per refill kan bijvoorbeeld slechts 2.000 beschikbaar
    // zijn. Kies daarom altijd de LAAGSTE positieve limiet die op de pagina staat.
    const DAILY_MAX = 24_000;
    const candidates = [];
    const addLimit = value => {
      const n = toInt(value);
      if (Number.isFinite(n) && n > 0) candidates.push(n);
    };

    addLimit(bulletsCanBuySingle());
    addLimit(bulletsLeftToBuyToday());
    addLimit(amount.value);
    addLimit(amount.getAttribute('max'));
    addLimit(amount.dataset?.max);
    addLimit(amount.dataset?.limit);

    // Wanneer de activiteitentabel op deze layout beschikbaar is, begrens ook
    // op wat er vandaag nog van de 24.000 over is.
    const boughtToday = infoBulletsBoughtToday();
    if (boughtToday != null && boughtToday >= 0){
      addLimit(Math.max(0, DAILY_MAX - boughtToday));
    }

    addLimit(DAILY_MAX);

    const can = candidates.length ? Math.min(...candidates) : 0;
    if (!can || can <= 0) throw new Error('Geen geldig aantal kogels beschikbaar om te kopen.');

    setInfo(`🛒 Beschikbaar voor deze aankoop: ${can.toLocaleString('nl-NL')} kogels.`);
    setNativeValue(amount, can);
    await sleep(300);

    const before = bodyText();
    safeClick(buyBtn);
    await sleep(1200);

    // Bij sommige layouts wordt via een normale form-submit geluisterd.
    if (bodyText() === before && buyBtn.form){
      try { buyBtn.form.requestSubmit ? buyBtn.form.requestSubmit(buyBtn) : buyBtn.form.submit(); } catch(e) {}
      await sleep(1000);
    }

    return true;
  }

  // =====================================================================
  // SLUGGS FLOW (Hire + Fire)
  // =====================================================================

  async function sluggsHire(){
    setStatus();
    setInfo('🧪 Sluggs: Hire…');
    loadPage(URL_SLUGGS);
    await sleep(LOOP_TICK_IDLE);
    await gateAndCaptchaSafe();

    const hireBtn = await waitForAny([
      'input.btn.btn-medium.btn-red[type="button"][value="Hire"][data-lackey="6"][data-action="hire"]',
      'input[type="button"][value="Fire"][data-lackey="6"][data-action="fire"]'
    ], 20000);

    if (hireBtn.matches('input[type="button"][value="Fire"]')){
      sluggsHiredFlag = true;
      GM_Set(K_SLUGGS_ON, true);
      setInfo('✅ Sluggs was al hired.');
      return true;
    }

    safeClick(hireBtn);

    await sleep(SLEEP_SMALL);
    await gateAndCaptchaSafe();

    const offerBtn = document.querySelector('button[name="jqi_hello_buttonOffer"][value="1"]');
    if (offerBtn) safeClick(offerBtn);

    await sleep(SLEEP_SMALL);
    await gateAndCaptchaSafe();

    const credits = document.querySelector('input[name="l_credits"][data-number="true"]');
    if (credits) credits.value = '250';

    const hireConfirm = document.querySelector('button[name="jqi_form_buttonHire"][value="1"]');
    if (hireConfirm) safeClick(hireConfirm);

    const okBtn = document.querySelector('button[name="jqi_formSuccess_buttonOK"][value="0"]');
    if (okBtn) safeClick(okBtn);

    sluggsHiredFlag = true;
    GM_Set(K_SLUGGS_ON, true);

    setStatus();
    setInfo('✅ Sluggs hired (250 credits). Nu pauzeren tot 00:00…');
    await sleep(800);
    return true;
  }

  async function sluggsFire(){
    setStatus();
    setInfo('🧪 Sluggs: Fire…');
    loadPage(URL_SLUGGS);
    await sleep(LOOP_TICK_IDLE);
    await gateAndCaptchaSafe();

    const fireBtn = await waitForAny([
      'input[type="button"][value="Fire"][data-lackey="6"][data-action="fire"]'
    ], 20000);
    safeClick(fireBtn);

    await sleep(SLEEP_SMALL);
    await gateAndCaptchaSafe();

    const yesBtn = document.querySelector('button[name="jqi_form_buttonYes"][value="1"]');
    if (yesBtn) safeClick(yesBtn);

    sluggsHiredFlag = false;
    GM_Set(K_SLUGGS_ON, false);

    setStatus();
    setInfo('✅ Sluggs fired. Hervat normale bullets…');
    await sleep(800);
    return true;
  }

  // =====================================================================
  // Sluggs-pauze modus
  // =====================================================================

  async function pauseIfSluggsHiredThenFireAtMidnight(){
    if (!useSluggs) return false;

    if (isSluggsBulletsPage()){
      sluggsHiredFlag = true;
      GM_Set(K_SLUGGS_ON, true);
    }

    if (!sluggsHiredFlag) return false;

    setStatus();
    setInfo('⏳ Sluggs is hired — eigen bullets kopen pauzeert tot 00:00…');

    const ok = await waitUntilMidnightForFire();
    if (!ok) return true;

    await sluggsFire();
    return true;
  }

  // =====================================================================
  // V9 PLANNER — eenmalige Bullet-cyclus
  // Normale Bullets worden alleen rond :00 en :30 gecontroleerd.
  // Sluggs blijft voorlopig op de bewezen legacy-flow draaien.
  // =====================================================================

  function nextHalfHourAt(from=Date.now(), marginMs=5000){
    const d = new Date(from);
    d.setSeconds(0, 0);
    if (d.getMinutes() < 30) d.setMinutes(30);
    else { d.setHours(d.getHours()+1); d.setMinutes(0); }
    return d.getTime() + Math.max(0, marginMs);
  }

  function nextMidnightAt(from=Date.now()){
    const d = new Date(from);
    d.setHours(24, 0, 8, 0);
    return d.getTime();
  }

  async function plannerStep(){
    if (!running) return { delayMs:15_000, status:'module staat uit' };
    if (plannerBusy) return { delayMs:2000, status:'vorige Bullet-actie loopt nog' };

    // Sluggs heeft een eigen hire/fire-flow met middernacht-wachtlogica.
    // Laat die voorlopig in de stabiele legacy-loop zodat fase 4 klein blijft.
    if (useSluggs){
      plannerManaged = false;
      stopFlag = false;
      if (!loopPromise) loopPromise = mainLoop().finally(()=>{ loopPromise=null; });
      setStatus();
      return { delayMs:60_000, status:'Sluggs gebruikt legacy-flow' };
    }

    plannerBusy = true;
    stopFlag = false;
    try{
      if (typeof gm_isGateVisible === 'function' && gm_isGateVisible()) {
        setInfo('⏸ Gate/captcha — planner wacht…');
        return { delayMs:10_000, status:'wacht op gate/captcha' };
      }

      setInfo('➡️ Centrale planner: Bullet-prijs controleren…');
      loadPage(URL_BULLETS);
      await sleep(LOOP_TICK_IDLE);
      await gateAndCaptchaSafe();

      try{
        await waitBulletsPageReady();
      }catch(err){
        const retryAt = Date.now() + 30_000;
        GM_Set(K_PLANNER_NEXT, retryAt);
        setInfo('⚠️ Bullets-pagina niet klaar — retry over 30s…');
        return { nextAt:retryAt, status:'pagina niet geladen' };
      }

      if (isDailyMaxReached()){
        const nextAt = nextMidnightAt();
        GM_Set(K_PLANNER_NEXT, nextAt);
        setInfo('🚫 Daglimiet bereikt — wacht tot na middernacht.');
        loadPage(URL_INFO);
        return { nextAt, status:'daglimiet bereikt' };
      }

      const price = bulletsPrice();
      if (price == null){
        const retryAt = Date.now() + 30_000;
        GM_Set(K_PLANNER_NEXT, retryAt);
        setInfo('⚠️ Prijs niet gevonden — retry over 30s…');
        loadPage(URL_INFO);
        return { nextAt:retryAt, status:'prijs niet gevonden' };
      }

      if (price > maxPrice){
        const nextAt = nextHalfHourAt();
        GM_Set(K_PLANNER_NEXT, nextAt);
        const refillTime = new Date(nextAt).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
        setInfoCountdown(nextAt, remaining => `💸 Prijs $${price} > max $${maxPrice} — refill om ${refillTime} (nog ${fmtMs(remaining)}).`);
        loadPage(URL_INFO);
        return { nextAt, status:`prijs te hoog ($${price})` };
      }

      setInfo(`🛒 Prijs OK: $${price} — maximaal aantal kopen…`);
      await submitBuy();
      await sleep(1500);

      // Na een aankoop niet blind tot :00/:30 wachten. De fabriek kan direct
      // nog een volgende aankoop toestaan. Laat de centrale planner daarom
      // na vijf seconden opnieuw de echte Bullets-pagina controleren.
      const nextAt = Date.now() + 5000;
      GM_Set(K_PLANNER_NEXT, nextAt);
      loadPage(URL_INFO);
      setInfoCountdown(nextAt, remaining => `✅ Gekocht — directe hercontrole over ${fmtMs(remaining)}.`);
      return { nextAt, status:'gekocht; directe hercontrole' };
    }catch(e){
      const retryAt = Date.now() + 30_000;
      GM_Set(K_PLANNER_NEXT, retryAt);
      setInfo(`⚠️ Planner-fout: ${String(e?.message || e)} — retry over 30s…`);
      try { loadPage(URL_INFO); } catch(_) {}
      return { nextAt:retryAt, status:'fout; retry' };
    }finally{
      plannerBusy = false;
      setStatus();
    }
  }

  function setPlannerManaged(on){
    plannerManaged = !!on;
    if (plannerManaged){
      // Stop alleen de interne while-loop; de module blijft logisch ingeschakeld.
      stopFlag = true;
      const nextAt = Number(GM_Get(K_PLANNER_NEXT, Date.now())) || Date.now();
      const when = new Date(nextAt).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
      if (running) setInfoCountdown(nextAt, remaining => `🧭 Centrale planner actief — volgende controle om ${when} (nog ${fmtMs(remaining)}).`);
    }else if (running && !useSluggs){
      stopFlag = false;
      if (!loopPromise) loopPromise = mainLoop().finally(()=>{ loopPromise=null; });
    }
    setStatus();
  }

  unsafeWindow.mrbV9Bullets = {
    setPlannerManaged,
    runStep:plannerStep,
    isRunning:()=>!!running,
    nextAt:()=>Number(GM_Get(K_PLANNER_NEXT, Date.now())) || Date.now(),
    state:()=>({running, plannerManaged, plannerBusy, useSluggs, maxPrice})
  };


  // =====================================================================
  // MAIN LOOP
  // =====================================================================

  async function mainLoop(){
    try{
      while(running && !stopFlag){
        await gateAndCaptchaSafe();
        setStatus();

        if (await pauseIfSluggsHiredThenFireAtMidnight()){
          continue;
        }

        // 1) Interne planning: niet meer afhankelijk van de tekst
        // "Next bullet deal" / "Volgende kogeltransactie" op Information.
        // De prijs verandert op :00 en :30, dus we bewaren zelf het
        // eerstvolgende controlemoment.
        let plannedAt = Number(GM_Get(K_PLANNER_NEXT, 0)) || 0;
        if (!plannedAt) {
          plannedAt = Date.now();
          GM_Set(K_PLANNER_NEXT, plannedAt);
        }

        const waitMs = plannedAt - Date.now();
        if (waitMs > 0){
          const refillTime = new Date(plannedAt).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
          setInfoCountdown(plannedAt, remaining => `⏳ Wachten op fabriek-refill om ${refillTime} (nog ${fmtMs(remaining)})…`);
          await waitWithGuards(Math.min(waitMs, 60_000));
          continue;
        }

        // 2) BULLETS: open bullets2 + wacht tot geladen
        setInfo('➡️ Bullet-controle gestart — naar kogelfabriek…');
        loadPage(URL_BULLETS);
        await sleep(LOOP_TICK_IDLE);
        await gateAndCaptchaSafe();
        setStatus();

        try{
          await waitBulletsPageReady();
        }catch(err){
          console.warn('[Bullets] waitBulletsPageReady failed:', err);
          setInfo('⚠️ Bullets pagina laadde niet goed — terug naar info, retry over 60s…');
          loadPage(URL_INFO);
          await waitWithGuards(FALLBACK_WAIT_MS);
          continue;
        }

        await gateAndCaptchaSafe();
        setStatus();

        // 2b) Als bullets2 eigenlijk Sluggs pagina is → pause mode
        if (useSluggs && isSluggsBulletsPage()){
          sluggsHiredFlag = true;
          GM_Set(K_SLUGGS_ON, true);
          setInfo('✅ Sluggs pagina gedetecteerd (hired). Pauze tot 00:00…');
          await pauseIfSluggsHiredThenFireAtMidnight();
          continue;
        }

        // 3) Daglimiet?
        if (isDailyMaxReached()){
          setInfo('🚫 Daglimiet bereikt (kan niet meer kopen).');

          if (useSluggs){
            await sluggsHire();
            await pauseIfSluggsHiredThenFireAtMidnight();
            continue;
          }

          setInfo('⏳ Wachten op reset (geen Sluggs)…');
          await waitWithGuards(CHECK_MS_RESET_WAIT);
          continue;
        }

        // 4) Price check
        const price = bulletsPrice();
        if (price == null){
          setInfo('⚠️ Prijs niet gevonden — retry over 60s…');
          loadPage(URL_INFO);
          await waitWithGuards(CHECK_MS_PRICE_HIGH);
          continue;
        }

        if (price > maxPrice){
          const nextAt = nextHalfHourAt();
          GM_Set(K_PLANNER_NEXT, nextAt);
          const refillTime = new Date(nextAt).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
          setInfoCountdown(nextAt, remaining => `💸 Prijs $${price} > max $${maxPrice} — fabriek-refill om ${refillTime} (nog ${fmtMs(remaining)}).`);
          loadPage(URL_INFO);
          await waitWithGuards(Math.min(Math.max(nextAt - Date.now(), 1000), 60_000));
          continue;
        }

        // 5) BUY
        setInfo(`🛒 Prijs OK: $${price} (≤ $${maxPrice}) — buy…`);
        await submitBuy();

        // 6) Na aankoop snel opnieuw controleren. De site kan direct nog
        // een volgende aankoop toestaan; pas bij een gesloten transactie of
        // te hoge prijs wordt weer naar het normale controlemoment gepland.
        const nextAt = Date.now() + 5000;
        GM_Set(K_PLANNER_NEXT, nextAt);
        await waitWithGuards(5000);
        loadPage(URL_INFO);
        setInfo(`✅ Gekocht — volgende controle om ${new Date(nextAt).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}.`);
        await sleep(LOOP_TICK_IDLE);
      }
    } catch(e){
      if (String(e?.message||'') === 'ABORT') return;
      console.warn('[Bullets] Error:', e);
      setStatus();
      setInfo(`⚠️ Error: ${String(e?.message||e)}`);
    } finally {
      ui();
    }
  }

  // ---------- Auto-start na refresh ----------
  if (running){
    stopFlag = false;
    setPlannerManaged(false);
    if (!loopPromise) loopPromise = mainLoop().finally(()=>{ loopPromise=null; });
    ui();
  }

  unsafeWindow.cc_api = unsafeWindow.cc_api || {};
  unsafeWindow.cc_api.bulletsSet = function(on, why='master'){
    on = !!on;

    if (on){
      if (running) return;
      running = true;
      stopFlag = false;
      GM_Set(K_RUN, true);
      ui();
      GM_Set(K_PLANNER_NEXT, Date.now());
      setPlannerManaged(false);
      if (!loopPromise) loopPromise = mainLoop().finally(()=>{ loopPromise=null; });
    } else {
      if (!running) return;
      running = false;
      stopFlag = true;
      GM_Set(K_RUN, false);
      ui();
    }
  };

})();
// =====================================================================
// 4) TRAVEL — CLEAN ROUNDTRIP + HEIST PRIORITY
// Sprint 5.5.0
// - Oude NyBalPhi- en 48-route volledig verwijderd.
// - Een duidelijke rondreis door alleen aangevinkte steden.
// - Routepositie wordt onthouden en na een Heist-onderbreking hervat.
// - Heist-prioriteit pauzeert gewone Travel wanneer Heist binnen de ingestelde buffer valt.
// - Heist kiest en uitvoert daarna zelf de geldige Heiststad; Travel kiest nooit blind een Heiststad.
// =====================================================================
;(function TravelCleanRoundtrip(){
  'use strict';

  const K_ON='mrb_travel_roundtrip_on_v1';
  const K_INDEX='mrb_travel_roundtrip_index_v1';
  const K_CITIES='mrb_travel_roundtrip_cities_v1';
  const K_HEIST_PRIORITY='mrb_travel_heist_priority_v1';
  const K_HEIST_BUFFER='mrb_travel_heist_buffer_minutes_v1';
  const K_NEXT_CHECK='mrb_travel_roundtrip_next_check_v1';

  const INFO='/information.php';
  const TRAVEL='/?module=Travel';
  const CITIES=['Detroit','Chicago','Palermo','New York','Las Vegas','Philadelphia','Baltimore','Corleone'];
  const CITY_TO_ID={Detroit:0,Chicago:1,Palermo:2,'New York':3,'Las Vegas':4,Philadelphia:5,Baltimore:6,Corleone:7};
  const DEFAULT_CITIES=Object.fromEntries(CITIES.map(city=>[city,true]));

  let enabled=!!GM_Get(K_ON,false);
  let routeIndex=Math.max(0,Number(GM_Get(K_INDEX,0))||0);
  let heistPriority=GM_Get(K_HEIST_PRIORITY,true)!==false;
  let heistBuffer=Math.max(0,Math.min(180,Number(GM_Get(K_HEIST_BUFFER,60))||60));
  let nextCheck=Math.max(0,Number(GM_Get(K_NEXT_CHECK,0))||0);
  let busy=false;

  function clean(value){return String(value||'').replace(/\s+/g,' ').trim();}
  function loadCities(){
    try{
      const raw=GM_Get(K_CITIES,'');
      const parsed=raw?(typeof raw==='string'?JSON.parse(raw):raw):{};
      return Object.fromEntries(CITIES.map(city=>[city,parsed?.[city]!==false]));
    }catch(_){return {...DEFAULT_CITIES};}
  }
  let allowed=loadCities();
  function saveCities(){GM_Set(K_CITIES,JSON.stringify(allowed));}
  function allowedCities(){return CITIES.filter(city=>allowed[city]!==false);}

  function loadPage(path){
    try{if(unsafeWindow.mrbNavigate)return unsafeWindow.mrbNavigate(path,{source:'travel-roundtrip'});}catch(_){}
    try{if(unsafeWindow?.omerta?.GUI?.container?.loadPage){unsafeWindow.omerta.GUI.container.loadPage(path);return true;}}catch(_){}
    location.href=/^\/\?module=/i.test(path)?'/index.php#'+path:path;
    return true;
  }
  function onInfo(){return /information\.php/i.test(String(location.pathname||location.href));}
  function onTravel(){return /module=Travel/i.test(String(location.href||''));}
  function visible(el){return !!(el&&!el.disabled&&(el.offsetParent!==null||el.getClientRects?.().length));}

  function parseDuration(raw){
    const value=clean(raw);
    if(/^(nu|now|ready)$/i.test(value))return 0;
    let ms=0;
    for(const m of value.matchAll(/(\d+)\s*([HMS])/ig)){
      const n=Number(m[1]); const u=m[2].toUpperCase();
      ms+=n*(u==='H'?3600000:u==='M'?60000:1000);
    }
    return ms;
  }
  function readTimer(labelRx){
    for(const row of document.querySelectorAll('#game_container tr, tr')){
      const cells=[...row.querySelectorAll('th,td')];
      if(cells.length<2)continue;
      if(labelRx.test(clean(cells[0].textContent)))return clean(cells[cells.length-1].textContent);
    }
    return '';
  }
  function readTravelTimer(){return readTimer(/^(?:reis|travel|volgende reis|next travel)$/i);}
  function readHeistTimer(){return readTimer(/volgende\s+heist|next\s+heist/i);}
  function currentCity(){
    const root=document.querySelector('#game_container')||document.body;
    for(const row of root.querySelectorAll('tr')){
      const cells=[...row.querySelectorAll('th,td')];
      if(cells.length>1&&/^(?:stad|city|huidige stad|current city)$/i.test(clean(cells[0].textContent))){
        const value=clean(cells[cells.length-1].textContent);
        const city=CITIES.find(c=>new RegExp('^'+c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$','i').test(value));
        if(city)return city;
      }
    }
    const text=clean(root.innerText);
    return CITIES.find(city=>new RegExp('(?:stad|city)\\s*[:\\-]?\\s*'+city.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(text))||'';
  }

  function heistBlocksTravel(){
    if(!heistPriority)return {blocked:false,reason:''};
    const raw=readHeistTimer();
    if(!raw)return {blocked:false,reason:'Heisttimer nog niet zichtbaar'};
    const wait=parseDuration(raw);
    if(wait===0)return {blocked:true,reason:'Heist is Nu; Heist-module krijgt voorrang'};
    if(wait<=heistBuffer*60000)return {blocked:true,reason:`Heist over ${raw}; gewone rondreis gepauzeerd`};
    return {blocked:false,reason:`Heist over ${raw}`};
  }

  function nextDestination(){
    const list=allowedCities();
    if(!list.length)return {city:'',nextIndex:routeIndex,reason:'Geen steden aangevinkt'};
    const here=currentCity();
    for(let step=0;step<list.length;step++){
      const index=(routeIndex+step)%list.length;
      const city=list[index];
      if(city!==here)return {city,nextIndex:(index+1)%list.length,reason:here?`vanaf ${here}`:'huidige stad onbekend'};
    }
    return {city:'',nextIndex:routeIndex,reason:'Alleen huidige stad is toegestaan'};
  }

  const cityHtml=CITIES.map(city=>`<label style="display:inline-flex;align-items:center;gap:4px;width:108px;margin:2px 0"><input type="checkbox" data-travel-city="${city}" ${allowed[city]!==false?'checked':''}>${city}</label>`).join('');
  const block=addBlock(`
    <h4>Travel</h4>
    <div class="gm-row" style="align-items:center;gap:8px">
      <button id="trRoundToggle" class="gm-btn">${enabled?'Stop':'Start'}</button>
      <div id="trRoundStatus" class="gm-status"></div>
    </div>
    <div style="font-size:11px;margin-top:6px"><b>Rondreis door toegestane steden</b></div>
    <div style="margin-top:4px">${cityHtml}</div>
    <label style="display:flex;align-items:center;gap:6px;margin-top:7px"><input id="trHeistPriority" type="checkbox" ${heistPriority?'checked':''}> Heist heeft voorrang</label>
    <div class="gm-row" style="margin-top:5px;align-items:center;gap:6px"><label>Travel pauzeren als Heist binnen</label><input id="trHeistBuffer" type="number" min="0" max="180" step="5" value="${heistBuffer}" style="width:54px"><span>min</span></div>
    <div id="trRoundInfo" style="font-size:11px;line-height:1.35;margin-top:6px"></div>
  `,'04-travel');

  function paint(message=''){
    const status=block.querySelector('#trRoundStatus');
    const button=block.querySelector('#trRoundToggle');
    if(button)button.textContent=enabled?'Stop':'Start';
    if(status)status.innerHTML=enabled?'<span class="ok">Actief</span>':'<span class="bad">Uit</span>';
    const destination=nextDestination();
    const heist=onInfo()?heistBlocksTravel():{blocked:false,reason:'Heiststatus wordt op Mijn Account gecontroleerd'};
    const info=block.querySelector('#trRoundInfo');
    if(info)info.innerHTML=[
      message||heist.reason,
      `Volgende routestad: <b>${destination.city||'-'}</b>`,
      `Toegestaan: ${allowedCities().join(', ')||'geen'}`
    ].join('<br>');
  }

  function findCityControl(city){
    const id=CITY_TO_ID[city];
    return document.querySelector(`a[onclick="onTravelData(${id});"]`)||document.querySelector(`a[onclick^="onTravelData(${id})"]`)||[...document.querySelectorAll('#game_container a,a')].find(a=>visible(a)&&new RegExp('^'+city.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$','i').test(clean(a.textContent)));
  }
  function travelButton(){return document.querySelector('button[name="jqi_state0_buttonTravel"][value="true"]')||document.querySelector('.jqi .jqibuttons button[name="jqi_state0_buttonTravel"]')||[...document.querySelectorAll('button')].find(b=>visible(b)&&/^travel|reizen?$/i.test(clean(b.textContent)));}
  async function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}

  async function executeTravel(city,nextIndex){
    if(!onTravel()){loadPage(TRAVEL);nextCheck=Date.now()+1800;GM_Set(K_NEXT_CHECK,nextCheck);paint(`Travelpagina openen voor ${city}`);return;}
    const control=findCityControl(city);
    if(!control){nextCheck=Date.now()+5000;GM_Set(K_NEXT_CHECK,nextCheck);paint(`${city} is niet klikbaar; later opnieuw`);return;}
    try{
      if(typeof unsafeWindow.onTravelData==='function')unsafeWindow.onTravelData(CITY_TO_ID[city]);
      else control.click();
    }catch(_){control.click();}
    await sleep(800);
    const button=travelButton();
    if(!button){nextCheck=Date.now()+2500;GM_Set(K_NEXT_CHECK,nextCheck);paint(`Bevestiging voor ${city} afwachten`);return;}
    button.click();
    routeIndex=nextIndex;GM_Set(K_INDEX,routeIndex);
    nextCheck=Date.now()+3000;GM_Set(K_NEXT_CHECK,nextCheck);
    paint(`Reis naar ${city} bevestigd; routepositie opgeslagen`);
    setTimeout(()=>{if(enabled)loadPage(INFO);},1500);
  }

  async function tick(){
    if(!enabled||busy||Date.now()<nextCheck)return;
    try{if(typeof gm_isGateVisible==='function'&&gm_isGateVisible())return;}catch(_){}
    busy=true;
    try{
      if(!onInfo()&&!onTravel()){
        loadPage(INFO);nextCheck=Date.now()+2000;GM_Set(K_NEXT_CHECK,nextCheck);paint('Mijn Account openen voor timers');return;
      }
      if(onTravel()){
        const destination=nextDestination();
        if(!destination.city){nextCheck=Date.now()+30000;GM_Set(K_NEXT_CHECK,nextCheck);paint(destination.reason);return;}
        await executeTravel(destination.city,destination.nextIndex);return;
      }
      const heist=heistBlocksTravel();
      if(heist.blocked){nextCheck=Date.now()+10000;GM_Set(K_NEXT_CHECK,nextCheck);paint(heist.reason);return;}
      const raw=readTravelTimer();
      if(!raw){nextCheck=Date.now()+5000;GM_Set(K_NEXT_CHECK,nextCheck);paint('Reistimer niet gevonden');return;}
      const wait=parseDuration(raw);
      if(wait>0){nextCheck=Date.now()+wait+1000;GM_Set(K_NEXT_CHECK,nextCheck);paint(`Reistimer: ${raw}`);return;}
      const destination=nextDestination();
      if(!destination.city){nextCheck=Date.now()+30000;GM_Set(K_NEXT_CHECK,nextCheck);paint(destination.reason);return;}
      await executeTravel(destination.city,destination.nextIndex);
    }finally{busy=false;}
  }

  block.querySelector('#trRoundToggle')?.addEventListener('click',()=>{
    enabled=!enabled;GM_Set(K_ON,enabled);nextCheck=0;GM_Set(K_NEXT_CHECK,0);paint(enabled?'Rondreis gestart':'Rondreis gestopt');
  });
  block.querySelectorAll('[data-travel-city]').forEach(input=>input.addEventListener('change',()=>{
    allowed[input.dataset.travelCity]=!!input.checked;saveCities();routeIndex=0;GM_Set(K_INDEX,0);nextCheck=0;GM_Set(K_NEXT_CHECK,0);paint('Stedenlijst opgeslagen');
  }));
  block.querySelector('#trHeistPriority')?.addEventListener('change',event=>{
    heistPriority=!!event.target.checked;GM_Set(K_HEIST_PRIORITY,heistPriority);nextCheck=0;GM_Set(K_NEXT_CHECK,0);paint('Heist-voorrang opgeslagen');
  });
  block.querySelector('#trHeistBuffer')?.addEventListener('change',event=>{
    heistBuffer=Math.max(0,Math.min(180,Number(event.target.value)||0));event.target.value=heistBuffer;GM_Set(K_HEIST_BUFFER,heistBuffer);nextCheck=0;GM_Set(K_NEXT_CHECK,0);paint('Heistbuffer opgeslagen');
  });

  paint('Schone Travel-module geladen');
  mrbSetInterval(tick,1000);
  if(enabled){nextCheck=0;GM_Set(K_NEXT_CHECK,0);}
})();


// [VERWIJDERD] BG Trainer module verwijderd op verzoek.

// [VERWIJDERD] Car Repair module verwijderd op verzoek.
// =====================================================================
// 7) SLOTS
// =====================================================================
;(function Slots(){
  const K_ON = 'slots_auto_on';
  const K_LAST_CLICK = 'slots_last_click_ts_v3';
  let on = GM_Get(K_ON, false);
  let timer = null;

  const block = addBlock(`
    <h4>Slots</h4>
    <div class="gm-row">
      <button id="slToggle" class="gm-btn">${on?'Stop':'Start'}</button>
      <div id="slStatus" class="gm-status" style="margin:0;">
        ${on?'<span class="ok">✅ Actief</span>':'<span class="bad">⛔</span>'}
      </div>
    </div>
    <div class="gm-row" style="margin-top:6px;">
      <div id="slHint" style="font-size:12px;opacity:.9;"></div>
    </div>
  `,'07-slots');

  function ui(msg=''){
    q('#slToggle',block).textContent = on ? 'Stop' : 'Start';
    q('#slStatus',block).innerHTML  = on
      ? '<span class="ok">✅ Actief</span>'
      : '<span class="bad">⛔</span>';
    const hint = q('#slHint', block);
    if (hint) hint.textContent = msg || (on ? 'Zoekt naar de Slots-knop en blijft actief na refresh/navigation.' : '');
  }

  function actionDelay(){
    return 1500 + Math.floor(Math.random() * 401);
  }

  function remainingClickDelay(){
    const last = Number(GM_Get(K_LAST_CLICK, 0)) || 0;
    const minDelay = 1500;
    return Math.max(0, minDelay - (Date.now() - last));
  }

  function clear(){
    if (timer) clearTimeout(timer);
    timer = null;
  }

  function btnText(el){
    return String(el?.value || el?.textContent || el?.getAttribute?.('title') || '').replace(/\s+/g,' ').trim();
  }

  function findSlotButton(){
    const candidates = Array.from(document.querySelectorAll('input[type="submit"], input[type="button"], button, a'))
      .filter(el => !el.disabled && el.offsetParent !== null);

    return candidates.find(el => /^(Pull Handle|Spin|Draai|Draaien|Trek|Trek hendel|Speel)$/i.test(btnText(el)))
        || candidates.find(el => /pull\s*handle|spin|slot|draai|trek|speel/i.test(btnText(el)))
        || null;
  }

  function safeClick(el){
    if (!el) return false;
    try{ el.focus(); }catch{}
    try{ el.click(); return true; }catch{}
    try{
      el.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
      el.dispatchEvent(new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window}));
      el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
      return true;
    }catch{}
    return false;
  }

  function schedule(ms){
    clear();
    if (!on) return;
    timer = setTimeout(tick, Math.max(500, ms || actionDelay()));
  }

  function tick(){
    if (!on) return;

    if (typeof gm_isGateVisible === 'function' && gm_isGateVisible()){
      ui('Gepauzeerd door login/Cloudflare/click-limit.');
      schedule(5000);
      return;
    }

    const btn = findSlotButton();
    if (btn){
      const wait = remainingClickDelay();
      if (wait > 0){
        ui('Wacht op veilige klikpauze…');
        schedule(wait + 50);
        return;
      }
      ui('Slots actief: knop gevonden, klik gepland.');
      GM_Set(K_LAST_CLICK, Date.now());
      safeClick(btn);
      schedule(actionDelay());
    } else {
      ui('Slots actief: open de Slots-pagina, dan klikt hij automatisch.');
      schedule(3000);
    }
  }

  function start(){
    on = true;
    GM_Set(K_ON, true);
    ui();
    schedule(Math.max(250, remainingClickDelay() + 50));
  }

  function stop(){
    on = false;
    GM_Set(K_ON, false);
    clear();
    ui();
  }

  q('#slToggle',block).addEventListener('click', ()=>{
    if (on) stop(); else start();
  });

  ui();
  if (on) schedule(Math.max(500, remainingClickDelay() + 50));
})();

// =====================================================================
// 8) SESSION MANAGER
// Vervangt de oude zichtbare pagina-refresh. Controleert alleen sessie/gate
// en triggert bestaande timer-sync zonder location.reload().
// =====================================================================
;(function SessionManager(){
  const K_ACTIVE='rf_active', K_NEXTTS='rf_next_ts';
  const K_IDLE_ON='rf_smart_idle_on_v111213';
  const K_IDLE_MIN='rf_smart_idle_minutes_v111213';
  const K_FREEZE_ON='rf_freeze_recovery_on_v111213';
  const K_LAST_REFRESH='rf_last_safe_refresh_v111213';
  const K_FIXED_ON='rf_fixed_refresh_on_v515';
  const K_FIXED_MIN='rf_fixed_refresh_minutes_v515';
  const K_FIXED_DUE='rf_fixed_refresh_due_v515';
  const PERIOD_MS=30*1000;
  const FREEZE_CONFIRM_MS=15*1000;
  const REFRESH_GUARD_MS=90*1000;
  const FIXED_MAX_DEFER_MS=20*1000;

  let active=GM_Get(K_ACTIVE,true)!==false;
  let idleRefreshOn=GM_Get(K_IDLE_ON,true)!==false;
  let idleMinutes=Math.max(3,Math.min(120,Number(GM_Get(K_IDLE_MIN,10))||10));
  let freezeRecoveryOn=GM_Get(K_FREEZE_ON,true)!==false;
  let fixedRefreshOn=GM_Get(K_FIXED_ON,true)!==false;
  let fixedRefreshMinutes=Math.max(5,Math.min(120,Number(GM_Get(K_FIXED_MIN,10))||10));
  let fixedRefreshDue=Number(GM_Get(K_FIXED_DUE,0))||0;
  let fixedRefreshPendingSince=0;
  let nextTs=Number(GM_Get(K_NEXTTS,0))||0;
  let plannerManaged=false;
  let legacyTimer=null;
  let lastActivity=Date.now();
  let overlaySince=0;
  let lastOverlaySignature='';

  const block = addBlock(`
    <h4>Session Manager</h4>
    <div class="gm-row">
      <button id="rfToggle" class="gm-btn">${active ? 'Stop' : 'Start'}</button>
      <div id="rfStatus" class="gm-status" style="margin:0;"></div>
    </div>
    <label style="display:block;margin-top:6px;"><input id="rfIdleOn" type="checkbox" ${idleRefreshOn?'checked':''}> Smart Idle Refresh</label>
    <div class="gm-row" style="margin-top:4px;gap:5px;">
      <span>na</span><input id="rfIdleMin" type="number" min="3" max="120" step="1" value="${idleMinutes}" style="width:54px;"><span>min idle</span>
    </div>
    <label style="display:block;margin-top:5px;"><input id="rfFreezeOn" type="checkbox" ${freezeRecoveryOn?'checked':''}> Freeze Recovery</label>
    <label style="display:block;margin-top:5px;"><input id="rfFixedOn" type="checkbox" ${fixedRefreshOn?'checked':''}> Vaste periodieke refresh</label>
    <div class="gm-row" style="margin-top:4px;gap:5px;"><span>elke</span><input id="rfFixedMin" type="number" min="5" max="120" step="1" value="${fixedRefreshMinutes}" style="width:54px;"><span>min</span></div>
    <button id="rfSave" class="gm-btn" style="margin-top:6px;">Save</button>
    <div id="rfInfo" style="font-size:11px;opacity:.85;margin-top:5px;">-</div>
  `,'08-refresh');

  function fmt(ms){
    const sec=Math.max(0,Math.ceil(ms/1000));
    const m=Math.floor(sec/60), s=sec%60;
    return m?`${m}m ${s}s`:`${s}s`;
  }
  function normalizeNext(){
    if(!active){ nextTs=0; return; }
    if(!nextTs || nextTs<Date.now()-5000) nextTs=Date.now()+PERIOD_MS;
    GM_Set(K_NEXTTS,nextTs);
  }
  function normalizeFixedDue(){
    if(!fixedRefreshOn){ fixedRefreshDue=0; fixedRefreshPendingSince=0; GM_Set(K_FIXED_DUE,0); return; }
    if(!fixedRefreshDue) fixedRefreshDue=Date.now()+fixedRefreshMinutes*60_000;
    GM_Set(K_FIXED_DUE,fixedRefreshDue);
  }
  function gateVisible(){
    try { return typeof gm_isGateVisible==='function' && gm_isGateVisible(); } catch(e){ return false; }
  }
  function visible(el){ return !!(el && (el.offsetParent!==null || el.getClientRects?.().length)); }
  function realPopupVisible(){
    const sels=['.jqi .jqistate:visible','.jqi .jqiform','.ui-dialog:visible','.modal.show','.modal[style*="display: block"]','[role="dialog"]'];
    for(const sel of sels){
      try{ if([...document.querySelectorAll(sel.replace(':visible',''))].some(visible)) return true; }catch(e){}
    }
    return false;
  }
  const SAFE_MODULE_STATES=new Set([
    '','IDLE','OFF','UIT','STOPPED','DONE','COMPLETE','COMPLETED','COOLDOWN','WAIT_TIMER',
    'CHECK_TIMER','PAUSED_GATE','PREP_WAIT_HTML','DISABLED','READY','PLANNER_READY','LOCAL_MODE'
  ]);
  function plannerBusy(){
    const p=unsafeWindow.mrbV9Planner;
    try{
      // In deze clean/plannerless basis telt alleen een werkelijk actieve owner.
      // Oude taak-nextAt waarden mogen de refresh niet meer op 0 seconden houden.
      return !!(p?.currentTask?.()||p?.actionOwner?.()||p?.navigationOwner?.()||p?.continuationOwner?.());
    }catch(e){return false;}
  }
  function moduleFlowBusy(){
    try{
      const list=unsafeWindow.mrbModuleStateRegistry?.list?.()||[];
      const now=Date.now();
      return list.some(item=>{
        const enabled=item?.enabled===true || item?.running===true || item?.requestedEnabled===true;
        if(!enabled) return false;
        const updated=Number(item.lastUpdate||item.updatedAt||0);
        // Oude, niet meer bijgewerkte registry-state mag een refresh niet eeuwig blokkeren.
        if(updated && now-updated>5*60_000) return false;
        const state=String(item.state||item.phase||'').trim().toUpperCase();
        return !SAFE_MODULE_STATES.has(state);
      });
    }catch(e){return false;}
  }
  function inputBusy(){
    const el=document.activeElement;
    return !!(el && (el.matches?.('input,textarea,select,[contenteditable="true"]')) && !el.closest?.('#mrbGoldMenu'));
  }
  function safeToRefresh(){
    if(gateVisible()||plannerBusy()||moduleFlowBusy()||realPopupVisible()||inputBusy()) return false;
    if(document.hidden) return false;
    return true;
  }
  function knownCooldownPopupVisible(){
    const t=String(document.body?.innerText||'').replace(/\s+/g,' ').trim();
    const visible=el=>!!(el&&!el.disabled&&(el.offsetParent!==null||el.getClientRects?.().length));
    const label=el=>String(el?.value||el?.textContent||'').replace(/\s+/g,' ').trim();
    const nowLabel=/^(?:Now|Nu|Ga\s+ervoor)\s*[.!…]?$/i;
    const nowBtn=[...document.querySelectorAll('#popupButtonNow,[data-timecb="popupButtonNow"],button,a,input[type="button"],input[type="submit"]')]
      .find(el=>visible(el)&&nowLabel.test(label(el)));
    const cooldownText=/\bTe moe\b|\bToo tired\b|Je bent te moe op het moment|You are too tired/i.test(t);
    return !!(cooldownText || nowBtn);
  }
  function safeForForcedPeriodicRefresh(){
    if(gateVisible()||inputBusy()||document.hidden) return false;
    // Een bekende Crimes/Cars-cooldownpopup mag een vaste herstelrefresh niet
    // onbeperkt blokkeren. Onbekende formulieren/dialogen blijven beschermd.
    if(realPopupVisible() && !knownCooldownPopupVisible()) return false;
    if(Date.now()-lastActivity<10_000) return false;
    return true;
  }
  function overlayCandidates(){
    const direct=[...document.querySelectorAll('.jqifade,.ui-widget-overlay,.modal-backdrop,.blockUI.blockOverlay,.popup-overlay,.overlay')];
    const large=[...document.querySelectorAll('body > div, #game_wrapper > div, #wrapper > div')].filter(el=>{
      if(!visible(el)||el.id==='mrbGoldMenu'||el.closest?.('#mrbGoldMenu')) return false;
      const cs=getComputedStyle(el),r=el.getBoundingClientRect();
      const z=Number.parseInt(cs.zIndex,10)||0;
      const alpha=Number.parseFloat(cs.opacity||'1');
      return (cs.position==='fixed'||cs.position==='absolute') && z>=100 && r.width>=innerWidth*.7 && r.height>=innerHeight*.7 && alpha<1;
    });
    return [...new Set([...direct,...large])].filter(visible);
  }
  function orphanOverlayState(){
    if(realPopupVisible()) return {orphan:false,signature:''};
    const list=overlayCandidates();
    if(!list.length) return {orphan:false,signature:''};
    const signature=list.map(el=>`${el.tagName}#${el.id}.${String(el.className)}`).sort().join('|');
    return {orphan:true,signature};
  }
  function markActivity(){ lastActivity=Date.now(); }
  ['click','keydown','pointerdown','touchstart'].forEach(type=>document.addEventListener(type,e=>{
    if(e.target?.closest?.('#mrbGoldMenu')) return;
    markActivity();
  },true));
  window.addEventListener('focus',markActivity,true);
  window.addEventListener('hashchange',markActivity,true);
  window.addEventListener('popstate',markActivity,true);

  function doSafeRefresh(reason, force=false){
    const last=Number(GM_Get(K_LAST_REFRESH,0))||0;
    if(Date.now()-last<REFRESH_GUARD_MS) return false;
    if(force ? !safeForForcedPeriodicRefresh() : !safeToRefresh()) return false;
    GM_Set(K_LAST_REFRESH,Date.now());
    try{sessionStorage.setItem('mrb_session_refresh_reason',String(reason||'veilig herstel'));}catch(e){}
    ui(`Veilige refresh: ${reason}`);
    setTimeout(()=>{ try{location.reload();}catch(e){} },250);
    return true;
  }
  function ui(message=''){
    block.querySelector('#rfToggle').textContent=active?'Stop':'Start';
    const gated=gateVisible();
    block.querySelector('#rfStatus').innerHTML=active
      ? (gated ? '<span class="bad">⏸ Sessie/gate</span>' : `<span class="ok">✅ Actief${plannerManaged?' — 🧭 Core':''}</span>`)
      : '<span class="bad">⛔</span>';
    const info=block.querySelector('#rfInfo');
    if(info){
      const idleLeft=Math.max(0,idleMinutes*60000-(Date.now()-lastActivity));
      normalizeFixedDue();
      const fixedLeft=fixedRefreshOn?Math.max(0,fixedRefreshDue-Date.now()):0;
      info.textContent=message || (active
        ? `${idleRefreshOn?`Idle over ${fmt(idleLeft)}`:'Idle uit'} • ${fixedRefreshOn?`Vaste refresh over ${fmt(fixedLeft)}`:'Vaste refresh uit'} • ${freezeRecoveryOn?'Freeze aan':'Freeze uit'}`
        : '-');
    }
  }
  function syncPlanner(status='gepland'){
    try{unsafeWindow.mrbV9Planner?.updateTask?.('v11-refresh',{enabled:!!active,nextAt:active?nextTs:Date.now()+PERIOD_MS,status});}catch(e){}
  }
  function clearLegacy(){ if(legacyTimer){ clearTimeout(legacyTimer); legacyTimer=null; } }
  function armLegacy(){
    clearLegacy(); if(!active||plannerManaged)return; normalizeNext();
    legacyTimer=setTimeout(async()=>{ await wake(); armLegacy(); },Math.max(250,nextTs-Date.now()));
  }
  function start(){ active=true; nextTs=Date.now()+1000; markActivity(); GM_Set(K_ACTIVE,true); GM_Set(K_NEXTTS,nextTs); syncPlanner('sessiecontrole gepland'); armLegacy(); ui(); }
  function stop(){ active=false; nextTs=0; GM_Set(K_ACTIVE,false); GM_Set(K_NEXTTS,0); clearLegacy(); syncPlanner('module staat uit'); ui(); }
  function save(){
    idleRefreshOn=!!block.querySelector('#rfIdleOn').checked;
    freezeRecoveryOn=!!block.querySelector('#rfFreezeOn').checked;
    fixedRefreshOn=!!block.querySelector('#rfFixedOn').checked;
    fixedRefreshMinutes=Math.max(5,Math.min(120,Number(block.querySelector('#rfFixedMin').value)||10));
    block.querySelector('#rfFixedMin').value=fixedRefreshMinutes;
    fixedRefreshDue=Date.now()+fixedRefreshMinutes*60_000; fixedRefreshPendingSince=0;
    idleMinutes=Math.max(3,Math.min(120,Number(block.querySelector('#rfIdleMin').value)||10));
    block.querySelector('#rfIdleMin').value=idleMinutes;
    GM_Set(K_IDLE_ON,idleRefreshOn); GM_Set(K_FREEZE_ON,freezeRecoveryOn); GM_Set(K_IDLE_MIN,idleMinutes);
    GM_Set(K_FIXED_ON,fixedRefreshOn); GM_Set(K_FIXED_MIN,fixedRefreshMinutes); GM_Set(K_FIXED_DUE,fixedRefreshDue);
    markActivity(); ui('Instellingen opgeslagen');
  }
  async function wake(){
    if(!active) return {enabled:false,delayMs:PERIOD_MS,status:'module staat uit'};
    normalizeNext();
    if(Date.now()<nextTs) return {nextAt:nextTs,status:'wacht op sessiecontrole'};
    if(gateVisible()){
      overlaySince=0; lastOverlaySignature=''; nextTs=Date.now()+15_000; GM_Set(K_NEXTTS,nextTs);
      ui('Planner gepauzeerd zolang login/captcha zichtbaar is');
      return {nextAt:nextTs,status:'sessie/gate zichtbaar'};
    }

    try { unsafeWindow.mrbBackgroundTimerSync?.request?.('session-manager'); } catch(e){}
    try { unsafeWindow.mrbBackgroundTimerSync?.syncNow?.('session-manager'); } catch(e){}

    normalizeFixedDue();
    if(fixedRefreshOn && Date.now()>=fixedRefreshDue){
      if(!fixedRefreshPendingSince) fixedRefreshPendingSince=Date.now();
      const forced=Date.now()-fixedRefreshPendingSince>=FIXED_MAX_DEFER_MS;
      if((!forced && safeToRefresh()) || (forced && safeForForcedPeriodicRefresh())){
        const reason=forced?'vaste refresh na maximale uitstel':'vaste periodieke refresh';
        if(doSafeRefresh(reason, forced)){
          fixedRefreshDue=Date.now()+fixedRefreshMinutes*60_000; fixedRefreshPendingSince=0; GM_Set(K_FIXED_DUE,fixedRefreshDue);
          return {delayMs:PERIOD_MS,status:'vaste refresh'};
        }
      }
      nextTs=Date.now()+5000; GM_Set(K_NEXTTS,nextTs);
      ui(forced?'Vaste refresh wacht alleen nog op popup/invoer':'Vaste refresh pending: actieve stap eerst afronden');
      return {nextAt:nextTs,status:'vaste refresh pending'};
    }

    if(freezeRecoveryOn){
      const state=orphanOverlayState();
      if(state.orphan){
        if(state.signature!==lastOverlaySignature){ lastOverlaySignature=state.signature; overlaySince=Date.now(); }
        if(!overlaySince) overlaySince=Date.now();
        if(Date.now()-overlaySince>=FREEZE_CONFIRM_MS && safeToRefresh()){
          if(doSafeRefresh('verweesde schermoverlay')) return {delayMs:PERIOD_MS,status:'freeze recovery refresh'};
        }
        nextTs=Date.now()+3000; GM_Set(K_NEXTTS,nextTs);
        ui(`Mogelijke freeze controleren (${fmt(FREEZE_CONFIRM_MS-(Date.now()-overlaySince))})`);
        return {nextAt:nextTs,status:'overlay wordt geverifieerd'};
      }
      overlaySince=0; lastOverlaySignature='';
    }

    const idleFor=Date.now()-lastActivity;
    if(idleRefreshOn && idleFor>=idleMinutes*60000){
      if(safeToRefresh() && doSafeRefresh(`${idleMinutes} minuten idle`)) return {delayMs:PERIOD_MS,status:'smart idle refresh'};
      // Niet veilig: stel uit en begin niet opnieuw vanaf nul; zodra vrij wordt alsnog vernieuwd.
      nextTs=Date.now()+15_000; GM_Set(K_NEXTTS,nextTs);
      ui('Idle refresh pending: planner/module/popup eerst afronden');
      return {nextAt:nextTs,status:'idle refresh wacht op veilige planner-idle'};
    }

    nextTs=Date.now()+PERIOD_MS; GM_Set(K_NEXTTS,nextTs);
    ui('Sessie geldig; timers bijgewerkt');
    return {nextAt:nextTs,status:'sessie geldig'};
  }

  block.querySelector('#rfToggle').addEventListener('click',()=>active?stop():start());
  block.querySelector('#rfSave').addEventListener('click',save);
  unsafeWindow.mrbV11Refresh={
    setPlannerManaged(v){ plannerManaged=!!v; if(plannerManaged)clearLegacy(); else armLegacy(); ui(); },
    isRunning(){ return !!active; }, nextAt(){ normalizeNext(); return active?nextTs:Date.now()+PERIOD_MS; }, wake,
    safeToRefresh, markActivity
  };
  normalizeNext(); normalizeFixedDue(); ui(); armLegacy(); mrbSetInterval(ui,1000);
})();
// =====================================================================
// =====================================================================
// XX) FILL LACKEY (6 uur) — LEAN
// Empty Cars en Ship Cars zijn volledig verwijderd.
// =====================================================================
;(function FillLackeyLean(){
  const K_ON='fl_running', K_NEXT='fl_nextAt';
  const PERIOD_MS=6*60*60*1000;
  let running=!!GM_Get(K_ON,false);
  let nextAt=Number(GM_Get(K_NEXT,0))||0;
  let timer=null, busy=false;

  const block=addBlock(`
    <h4>Fill lackey</h4>
    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="flToggle" class="gm-btn">${running?'Stop':'Start'}</button>
      <div id="flStatus" class="gm-status" style="margin:0;"></div>
    </div>
    <div class="gm-row" style="margin-top:6px;"><div id="flNext" style="font-size:12px;opacity:.9;"></div></div>
  `,'xx-fill-lackey');

  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const fmt=ts=>ts?new Date(ts).toLocaleString():'-';
  function paint(msg=''){
    const btn=block.querySelector('#flToggle'), st=block.querySelector('#flStatus'), nx=block.querySelector('#flNext');
    if(btn) btn.textContent=running?'Stop':'Start';
    if(st) st.innerHTML=msg || (running?'<span class="ok">✅ Actief</span>':'<span class="bad">⛔</span>');
    if(nx) nx.textContent=`Volgende run: ${running?fmt(nextAt):'-'}`;
  }
  function clear(){ if(timer) clearTimeout(timer); timer=null; }
  function plan(ts){ clear(); nextAt=ts; GM_Set(K_NEXT,nextAt); if(running) timer=setTimeout(runOnce,Math.max(250,nextAt-Date.now())); paint(); }
  function loadLackeys(){
    try{ const gui=unsafeWindow?.omerta?.GUI?.container; if(gui?.loadPage){ gui.loadPage('/?module=Lackeys'); return; } }catch(e){}
    location.href='/?module=Lackeys';
  }
  async function waitForFillButton(timeout=20000){
    const start=Date.now();
    while(Date.now()-start<timeout){
      const el=document.querySelector('#btnFillAllLackeysInline');
      if(el) return el;
      await sleep(150);
    }
    return null;
  }
  async function runOnce(){
    if(!running||busy) return;
    busy=true; paint('<span class="ok">▶ Lackeys…</span>');
    try{
      if(!/[?&]module=Lackeys\b/i.test(location.href)){
        loadLackeys();
        await sleep(1200);
      }
      const btn=await waitForFillButton();
      if(!btn) throw new Error('Fill all lackeys knop niet gevonden.');
      btn.click();
      await sleep(9000);
      plan(Date.now()+PERIOD_MS);
    }catch(e){
      console.warn('[FillLackeyLean]',e);
      plan(Date.now()+PERIOD_MS);
      paint('<span class="bad">⛔ Error</span>');
    }finally{ busy=false; }
  }
  block.querySelector('#flToggle')?.addEventListener('click',()=>{
    running=!running; GM_Set(K_ON,running); clear();
    if(running){ nextAt=Date.now(); GM_Set(K_NEXT,nextAt); paint(); runOnce(); }
    else paint();
  });
  paint();
  if(running) plan(nextAt>Date.now()?nextAt:Date.now()+500);
})();

// Lackeys knoppen "Fill all lackeys" + "Start lackeys"
// =====================================================================
// [SPRINT 3.1 HOTFIX] War modules en Milestones hersteld na te brede opschoning.
;(function PrefillCombined(){
  // Detectives keys
  const K_NAME     = 'ta_detectives_name';
  const K_BULLETS  = 'ta_detectives_bullets';
  const K_MINUTES  = 'ta_detectives_minutes'; // ✅ SH timer

  // Blood buy key
  const K_BBMODE   = 'bloedbankPrefillMode'; // '16' | 'Free'

  const getV = (k,d)=> (typeof GM_getValue === 'function') ? GM_getValue(k,d) : GM_Get(k,d);
  const setV = (k,v)=> (typeof GM_setValue === 'function') ? GM_setValue(k,v) : GM_Set(k,v);

  let targetName = String(getV(K_NAME, '') || '');
  let bulletsAmt = String(getV(K_BULLETS, '') || '');
  let shMinutes  = String(getV(K_MINUTES, '') || ''); // ✅ SH timer value
  let bbMode     = String(getV(K_BBMODE, 'Free') || 'Free'); // '16' | 'Free'

  const block = addBlock(`
    <h4>Prefill</h4>

    <div class="gm-row" style="gap:8px;align-items:center;flex-wrap:wrap;">
      <label style="display:flex;align-items:center;gap:6px;">
        Target
        <input id="taName" type="text" class="gm-input" placeholder="naam..." value="${escapeHtml(targetName)}" style="width:160px;">
      </label>

      <label style="display:flex;align-items:center;gap:6px;">
        Amount
        <input id="taBullets" type="text" class="gm-input" placeholder="kogels..." value="${escapeHtml(bulletsAmt)}" style="width:110px;">
      </label>
    </div>

    <!-- ✅ SH timer onder bullets -->
    <div class="gm-row" style="gap:8px;align-items:center;flex-wrap:wrap;margin-top:6px;">
      <label style="display:flex;align-items:center;gap:6px;">
        SH timer
        <input id="taMinutes" type="text" class="gm-input" placeholder="min..." value="${escapeHtml(shMinutes)}" style="width:110px;">
      </label>
    </div>

    <div style="margin:10px 0;border-top:1px solid rgba(255,255,255,0.12)"></div>

    <div style="font-weight:bold;margin-bottom:6px;">Blood buy</div>
    <div class="gm-row" style="gap:14px;flex-wrap:wrap;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="radio" name="bbmode" value="16" ${bbMode==='16'?'checked':''}> <span>16</span>
      </label>
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="radio" name="bbmode" value="Free" ${bbMode!=='16'?'checked':''}> <span>Free</span>
      </label>
    </div>
  `,'14-prefill');

  function escapeHtml(s){
    return String(s ?? '').replace(/[&<>"']/g, m => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[m]));
  }

  function pickVisible(nodeList){
    const arr = [...nodeList];
    return arr.find(el =>
      el &&
      el.type !== 'hidden' &&
      el.offsetParent !== null &&
      getComputedStyle(el).visibility !== 'hidden'
    ) || arr[0] || null;
  }

  // ---------------------------
  // Detectives: find inputs
  // ---------------------------
  function findNameInput(){
    return pickVisible(document.querySelectorAll('input[name="name"][autocomplete="off"], input[name="name"]'));
  }
  function findBulletsInput(){
    return pickVisible(document.querySelectorAll('input[name="bullets"][autocomplete="off"], input[name="bullets"]'));
  }
  function findMinutesInput(){
    // ✅ jouw input + fallback
    return pickVisible(document.querySelectorAll(
      '#detectives-minutes-input, input[name="minutes"], input#detectives-minutes-input[name="minutes"]'
    ));
  }

  function setInputValue(el, val){
    if (!el) return;
    if (String(el.value ?? '') === String(val ?? '')) return; // extra guard
    el.value = val;
    el.setAttribute('value', val);
    el.dispatchEvent(new Event('input',  { bubbles:true }));
    el.dispatchEvent(new Event('change', { bubbles:true }));
  }

  // ---------------------------
  // Blood buy: find input
  // ---------------------------
  function getUnits(){
    return document.querySelector('#UnitsToBuy') || document.querySelector('input[name="UnitsToBuy"]');
  }

  // ---------------------------
  // Apply (both) with guards
  // ---------------------------
  function applyDetectives(){
    const nameEl    = findNameInput();
    const bulletsEl = findBulletsInput();
    const minutesEl = findMinutesInput();

    // Alleen als er iets van Detectives te vinden is
    if (!nameEl && !bulletsEl && !minutesEl) return;

    // Prefill alleen als opgeslagen waarde NIET leeg is
    if (nameEl && String(targetName).trim()){
      if (String(nameEl.value || '').trim() !== String(targetName).trim()){
        setInputValue(nameEl, targetName);
      }
    }
    if (bulletsEl && String(bulletsAmt).trim()){
      if (String(bulletsEl.value || '').trim() !== String(bulletsAmt).trim()){
        setInputValue(bulletsEl, bulletsAmt);
      }
    }
    // ✅ SH timer
    if (minutesEl && String(shMinutes).trim()){
      if (String(minutesEl.value || '').trim() !== String(shMinutes).trim()){
        setInputValue(minutesEl, shMinutes);
      }
    }
  }

  function applyBloodBuy(){
    const el = getUnits();
    if (!el) return;

    if (bbMode === '16'){
      if (String(el.value || '').trim() !== '16'){
        setInputValue(el, '16');
      }
    }
    // bbMode === 'Free' => niets overrulen
  }

  function applyAll(){
    applyDetectives();
    applyBloodBuy();
  }

  // ---------------------------
  // UI events
  // ---------------------------
  const nameInp = block.querySelector('#taName');
  const bulInp  = block.querySelector('#taBullets');
  const minInp  = block.querySelector('#taMinutes'); // ✅

  if (nameInp){
    nameInp.addEventListener('input', (e)=>{
      targetName = String(e.target.value || '');
      setV(K_NAME, targetName);
      applyAll();
    });
  }

  if (bulInp){
    bulInp.addEventListener('input', (e)=>{
      bulletsAmt = String(e.target.value || '');
      setV(K_BULLETS, bulletsAmt);
      applyAll();
    });
  }

  if (minInp){
    minInp.addEventListener('input', (e)=>{
      shMinutes = String(e.target.value || '');
      setV(K_MINUTES, shMinutes);
      applyAll();
    });
  }

  block.querySelectorAll('input[name="bbmode"]').forEach(inp=>{
    inp.addEventListener('change', (e)=>{
      bbMode = (e.target.value === '16') ? '16' : 'Free';
      setV(K_BBMODE, bbMode);
      applyAll();
    });
  });

  // ---------------------------
  // Observer (SPA/partial reloads) - debounced
  // ---------------------------
  let tObs = null;
  const mo = new MutationObserver(()=>{
    if (tObs) return;
    tObs = setTimeout(()=>{
      tObs = null;
      applyAll();
    }, 200);
  });

  mo.observe(document.documentElement, { childList:true, subtree:true });

  applyAll();
})();

// =====================================================================
// 15) SNIPER
// =====================================================================
;(function Sniper(){
  const K_RUN             = 'sniper_running';
  const K_PREFILL_BULLETS = 'ta_detectives_bullets';
  const K_CHECK_MS        = 'sniper_check_ms'; // ✅ 5s / 10s keuze

  const LOOP_MS        = 400;    // lichtgewicht tick (geen DOM-scan spam)
  const AFTER_SET_MS   = 80;
  const AFTER_KILL_MS  = 150;

  const getV = (k,d)=> (typeof GM_getValue === 'function') ? GM_getValue(k,d) : GM_Get(k,d);
  const setV = (k,v)=> (typeof GM_setValue === 'function') ? GM_setValue(k,v) : GM_Set(k,v);

  let running = !!getV(K_RUN, false);
  let busy = false;
  let timerId = null;

  // ✅ instelbaar via radio (default 10s)
  const normCheckMs = (v)=>{
    const n = Number(v);
    return (n === 5000 || n === 10000) ? n : 10000;
  };
  let checkEveryMs = normCheckMs(getV(K_CHECK_MS, 10000));

  let nextCheckTs = 0;
  let flipRoute = false;     // option B toggle
  let lastShotName = '';
  let lastShotTs = 0;

  // ---- UI ----
  const block = addBlock(`
    <h4>Sniper</h4>
    <div class="gm-row" style="gap:8px;align-items:center;">
      <button id="snToggle" class="gm-btn">${running?'Stop':'Start'}</button>
      <div id="snStatus" class="gm-status" style="margin:0;">
        ${running?'<span class="ok">✅ Actief</span>':'<span class="bad">⛔</span>'}
      </div>
    </div>

    <div class="gm-row" style="margin-top:6px; gap:10px; align-items:center; flex-wrap:wrap;">
      <div style="font-size:12px;opacity:.9;">Check:</div>
      <label style="display:flex;gap:6px;align-items:center;">
        <input type="radio" name="snCheck" value="5000"> 5s
      </label>
      <label style="display:flex;gap:6px;align-items:center;">
        <input type="radio" name="snCheck" value="10000"> 10s
      </label>
      <div id="snCheckLabel" style="font-size:12px;opacity:.85;margin-left:auto;"></div>
    </div>

    <div class="gm-row" style="margin-top:6px;">
      <div id="snInfo" style="opacity:.9;font-size:12px;">Laatste target: <b>-</b></div>
    </div>
  `,'15-sniper');

  const q1=(s,r=document)=>r.querySelector(s);
  const qAll=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));

  function setStatus(html){
    const st=q1('#snStatus',block);
    if(!st) return;
    st.innerHTML = html;
  }
  function setCheckLabel(){
    const el = q1('#snCheckLabel', block);
    if(!el) return;
    el.textContent = `Elke ${Math.round(checkEveryMs/1000)}s`;
  }
  function ui(){
    const btn=q1('#snToggle',block);
    if(btn) btn.textContent = running ? 'Stop' : 'Start';
    if(!running){
      setStatus('<span class="bad">⛔</span>');
    } else {
      setStatus('<span class="ok">✅ Actief</span>');
    }
    setCheckLabel();
  }
  function info(html){
    const el=q1('#snInfo',block);
    if(el) el.innerHTML = html;
  }

  // ---- Captcha ----
  function captchaActief(){
    return document.getElementById('recaptcha-popup') !== null;
  }

  // ---- Error dialog detectie ----
  function isShown(el){
    if(!el) return false;
    try{
      const cs=getComputedStyle(el);
      if(cs.display==='none' || cs.visibility==='hidden' || Number(cs.opacity)===0) return false;
    }catch{}
    const r=el.getBoundingClientRect();
    return !!(r.width && r.height);
  }

  function hasErrorDialog(){
    const candidates = [
      ...qAll('.jqi, .jqibox, .jqiwrapper, .modal, .ui-dialog, .swal2-container, .sweet-alert'),
      ...qAll('[role="dialog"], [aria-modal="true"]')
    ];
    for(const root of candidates){
      if(!isShown(root)) continue;
      const txt=(root.textContent||'').toLowerCase();
      if(!txt.trim()) continue;
      if(txt.includes('error') || txt.includes('failed')) return true;
    }
    return false;
  }

  function stopShotFailed(){
    running = false;
    setV(K_RUN,false);
    if(timerId){ mrbClearInterval(timerId); timerId=null; }

    const btn=q1('#snToggle',block);
    if(btn) btn.textContent = 'Start';
    setStatus('<span class="bad" style="font-weight:700;">Shot failed</span>');
    info(`Laatste target: <b>${lastShotName||'-'}</b> — <b style="color:#ffb3b3;">Shot failed</b>`);
  }

  // ---- Hash routing (Option B) ----
  function onDetectives(){
    const s = (location.hash||'') + ' ' + (location.href||'');
    return /module=Detectives\b/i.test(s);
  }

  function goHashRoute(route){
    const wants = `#${route}`;
    const full = `${location.origin}/index.php${wants}`;
    const onIndex = (location.pathname || '').toLowerCase().endsWith('/index.php');

    try{
      if(onIndex){
        (unsafeWindow || window).location.hash = route;
      }else{
        (unsafeWindow || window).location.href = full;
      }
    }catch{
      if(onIndex) location.hash = route;
      else location.href = full;
    }
  }

  function goDetectivesForce(){
    const route = flipRoute ? '/?module=Detectives&action=display' : '/?module=Detectives';
    flipRoute = !flipRoute;
    goHashRoute(route);
  }

  // ---- FOUND parsing ----
  function findFoundName(){
    const rows = qAll('#detectives-hired-div table tr, #detectives-hired-div tr');
    for(const tr of rows){
      const td = tr.querySelector('td');
      if(!td) continue;
      const t = (td.textContent||'').toLowerCase();
      if(!t.includes('detectives found')) continue;

      const bs = td.querySelectorAll('b');
      if(bs && bs.length >= 2){
        const name = (bs[1].textContent||'').trim();
        if(name) return name;
      }

      const m = td.textContent.match(/detectives\s+found\s+([A-Za-z0-9_\-]+)\s+in/i);
      if(m && m[1]) return m[1].trim();
    }
    return '';
  }

  function pickVisible(els){
    return els.find(el =>
      el &&
      el.type !== 'hidden' &&
      el.offsetParent !== null &&
      getComputedStyle(el).visibility !== 'hidden'
    ) || els[0] || null;
  }

  function setInputValue(el, val){
    if(!el) return;
    el.value = val;
    el.setAttribute('value', val);
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
  }

  function clickKillIfPresent(){
    const kill = pickVisible(qAll('input[type="submit"]').filter(el => (el.value||'').trim()==='Kill'));
    if(kill){
      try{ kill.click(); return true; }catch{}
    }
    return false;
  }

  async function doKill(name){
    const nameEl    = pickVisible(qAll('input[name="name"][type="text"], input[name="name"]'));
    const bulletsEl = pickVisible(qAll('input[name="bullets"][type="text"], input[name="bullets"]'));

    if(nameEl) setInputValue(nameEl, name);

    const storedBullets = String(getV(K_PREFILL_BULLETS, '') || '').trim();
    if(bulletsEl && storedBullets){
      setInputValue(bulletsEl, storedBullets);
    }

    await sleep(AFTER_SET_MS);

    const didKill = clickKillIfPresent();
    if(didKill){
      lastShotName = name;
      lastShotTs = Date.now();
      info(`Laatste target: <b>${name}</b> — kill geklikt ✅`);
      await sleep(AFTER_KILL_MS);
    }
  }

  async function tick(){
    if(!running || busy) return;
    busy = true;
    try{
      // Captcha -> pauze
      if(captchaActief()){
        setStatus('<span class="bad" style="font-weight:600;">⏸ Captcha</span>');
        return;
      } else {
        setStatus('<span class="ok">✅ Actief</span>');
      }

      // Error -> stoppen
      if(hasErrorDialog()){
        stopShotFailed();
        return;
      }

      const now = Date.now();

      // ✅ elke (5/10)s: force refresh/check (option B)
      if(now >= nextCheckTs){
        nextCheckTs = now + checkEveryMs;
        info(`Laatste target: <b>${lastShotName||'-'}</b> — check…`);
        goDetectivesForce();
        return;
      }

      // Tussen checks door: als we op Detectives zijn, kijk of er FOUND is
      if(onDetectives()){
        const found = findFoundName();
        if(found){
          // anti-spam: dezelfde naam niet binnen 15s opnieuw proberen
          if(found === lastShotName && (Date.now()-lastShotTs) < 15000) return;

          info(`FOUND: <b>${found}</b> — kill…`);
          await doKill(found);
        }
      }
    } finally {
      busy = false;
    }
  }

  function start(){
    if(running) return;
    running=true;
    setV(K_RUN,true);
    ui();

    nextCheckTs = 0; // meteen checken bij start
    if(timerId) mrbClearInterval(timerId);
    timerId = mrbSetInterval(tick, LOOP_MS);
    setTimeout(tick, 50);
  }

  function stop(){
    running=false;
    setV(K_RUN,false);
    if(timerId){ mrbClearInterval(timerId); timerId=null; }
    ui();
  }

  // ✅ radio init + listeners
  function initRadio(){
    const radios = qAll('input[name="snCheck"]', block);
    for(const r of radios){
      if(Number(r.value) === checkEveryMs) r.checked = true;

      r.addEventListener('change', ()=>{
        if(!r.checked) return;
        checkEveryMs = normCheckMs(r.value);
        setV(K_CHECK_MS, checkEveryMs);

        // direct effect: volgende cyclus meteen opnieuw plannen
        nextCheckTs = 0;
        setCheckLabel();
        info(`Laatste target: <b>${lastShotName||'-'}</b> — check interval: <b>${Math.round(checkEveryMs/1000)}s</b>`);
      });
    }
    setCheckLabel();
  }

  q1('#snToggle',block).addEventListener('click', ()=> running ? stop() : start());
  initRadio();
  ui();
  if(running) start();
})();

// =====================================================================
// 9) ENTEREN
// =====================================================================
;(function Enteren(){
  const K_ON='enteren_on';
  const LOOP_MS = 2000;
  const AFTER_OK_MS = 120;    // kleine wacht om DOM te verversen na OK
  const AFTER_KILL_MS = 200;  // kleine wacht om popup te laten verschijnen

  let on = typeof GM_getValue==='function' ? GM_getValue(K_ON,false) : false;

  let it = null, mo = null;

  // --- Outcome alarm (1x) ---
  let outcomeAlerted = false;
  let audioCtx = null;

  function unlockAudio(){
    try{
      const AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return;
      if(!audioCtx) audioCtx = new AC();
      if(audioCtx.state === 'suspended') audioCtx.resume();

      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      g.gain.value = 0;
      o.connect(g); g.connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + 0.01);
    }catch{}
  }

  function beepOnce(){
    try{
      unlockAudio();
      if(!audioCtx) return;
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type='square';
      o.frequency.setValueAtTime(880, audioCtx.currentTime);
      g.gain.setValueAtTime(0.2, audioCtx.currentTime);
      o.connect(g); g.connect(audioCtx.destination);
      o.start();
      setTimeout(()=>{ try{o.stop();}catch{}; try{g.disconnect();}catch{} }, 300);
    }catch{}
  }

  function speakShotDone(){
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance("Shot is done.");
      u.rate=1; u.pitch=1; u.volume=1;
      speechSynthesis.speak(u);
    }catch{}
  }

  function fireOutcomeAlertOnce(){
    if (outcomeAlerted) return;
    outcomeAlerted = true;
    beepOnce();
    speakShotDone();
  }

  // UI block (Reset-knop verwijderd)
  const block = addBlock(`
    <h4>Enteren</h4>
    <div class="gm-row" style="gap:8px;align-items:center;">
      <button id="enToggle" class="gm-btn">${on?'Stop':'Start'}</button>
      <div id="enStatus" class="gm-status" style="margin:0;">
        ${on?'<span class="ok">✅ Actief</span>':'<span class="bad">⛔</span>'}
      </div>
    </div>
  `,'09-enteren');

  function setPersist(v){ try{ if(typeof GM_setValue==='function') GM_setValue(K_ON,v);}catch{} }

  const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
  const q1=(s,r=document)=>r.querySelector(s);
  const qAll=(s,r=document)=>Array.from(r.querySelectorAll(s));

  function isShown(el){
    if(!el) return false;
    try{
      const cs = getComputedStyle(el);
      if(cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
    }catch{}
    const r = el.getBoundingClientRect();
    return !!(r.width && r.height);
  }

  function ui(reason=''){
    const btn=q1('#enToggle',block), st=q1('#enStatus',block);
    if(btn) btn.textContent=on?'Stop':'Start';
    if(st)  st.innerHTML  = on
      ? '<span class="ok">✅ Actief</span>'
      : `<span class="bad">⛔</span>${reason}`;
  }

  // -------- Outcome detectie (FIX) --------
  function findVisibleOutcomeDialog(){
    const needles = ['outcome']; // indien nodig kun je hier extra woorden toevoegen
    const candidates = [
      ...qAll('.jqi, .jqibox, .jqiwrapper, .modal, .ui-dialog, .swal2-container, .sweet-alert'),
      ...qAll('[role="dialog"], [aria-modal="true"]')
    ];

    for(const root of candidates){
      if(!isShown(root)) continue;
      const txt = (root.textContent || '').toLowerCase();
      if(needles.some(n => txt.includes(n))) return root;
    }
    return null;
  }

  function hasOutcome(){
    return !!findVisibleOutcomeDialog();
  }

  // Deze gebruiken we om NOOIT “OK” te klikken als er echt een zichtbare outcome popup staat
  function hasVisibleOutcomeEvenIfIgnored(){
    return !!findVisibleOutcomeDialog();
  }

  function clickOkIfPresent(){
    if (hasVisibleOutcomeEvenIfIgnored()) return false; // nooit OK bij zichtbare Outcome
    const jqOK = q1('button.jqidefaultbutton');
    if (jqOK && /^(ok|oke|okay)$/i.test((jqOK.textContent||'').trim())) { jqOK.click(); return true; }
    const btn = qAll('button, input[type="button"], input[type="submit"]')
      .find(b=>{
        const t=(b.value||b.textContent||'').trim().toLowerCase();
        return isShown(b) && /^(ok|oke|okay|close|sluiten)$/i.test(t);
      });
    if(btn){ btn.click(); return true; }
    return false;
  }

  function clickKillIfPresent(){
    const kill = qAll('input[type="submit"]').find(el => (el.value||'').trim()==='Kill' && isShown(el));
    if (kill){ try{ kill.click(); return true; }catch{} }
    return false;
  }

  async function tick(){
    if (!on) return;

    // 1) Stop direct bij Outcome + alarm 1x
    if (hasOutcome()){
      fireOutcomeAlertOnce();
      stop(' (Outcome)');
      return;
    }

    // 2) Sluit bestaande Error-popup
    if (clickOkIfPresent()){ await sleep(AFTER_OK_MS); }

    if (!on) return;
    if (hasOutcome()){
      fireOutcomeAlertOnce();
      stop(' (Outcome)');
      return;
    }

    // 3) Klik Kill
    const didKill = clickKillIfPresent();

    if (didKill){
      await sleep(AFTER_KILL_MS);
      if (hasOutcome()){
        fireOutcomeAlertOnce();
        stop(' (Outcome)');
        return;
      }
      // 4) Sluit de zojuist ontstane Error-popup meteen
      clickOkIfPresent();
    }
  }

  function start(){
    if (on) return;
    on = true; setPersist(true);

    // reset 1x alarm op start
    outcomeAlerted = false;

    unlockAudio();
    try{ document.addEventListener('click', unlockAudio, { once:true, capture:true }); }catch{}

    ui();
    it = mrbSetInterval(tick, LOOP_MS);

    // Snelle detectie van Outcome zonder op volgende tick te wachten
    try{
      mo = new MutationObserver(()=>{
        if(on && hasOutcome()){
          fireOutcomeAlertOnce();
          stop(' (Outcome)');
        }
      });
      mo.observe(document.body, {childList:true, subtree:true, characterData:true});
    }catch{}

    setTimeout(tick, 50);
  }

  function stop(reason=''){
    if (!on) return;
    on=false; setPersist(false);
    if (it){ mrbClearInterval(it); it=null; }
    if (mo){ try{ mo.disconnect(); }catch{} mo=null; }
    ui(reason);
  }

  // Knop
  q1('#enToggle',block).addEventListener('click', ()=>{ on ? stop() : start(); });

  ui();
  if (on) start();
})();

// =====================================================================
// 10) MILESTONES — V10.0.1 ROBUUSTE POPUP/PLANNER FLOW
// =====================================================================
;(function MilestonesV1001(){
  'use strict';

  const K_ACTIVE='mc_active', K_COUNTERS='mc_counters';
  const OWNER='v10-milestones';
  const saved=GM_Get(K_COUNTERS,{Bullets:0,RP:0,BO:0,'Rank Progress':0,Bustouts:0});
  let counts={
    Bullets:Number(saved.Bullets||0),
    RP:Number((saved.RP ?? saved['Rank Progress'])||0),
    BO:Number((saved.BO ?? saved.Bustouts)||0)
  };
  let active=!!GM_Get(K_ACTIVE,false);
  let busy=false;
  let lastAction=0;
  let plannerRegistered=false;
  let localNextAt=Number(GM_Get('mrb_milestones_local_next_at',0))||0;

  const block=addBlock(`
    <h4>Milestones</h4>
    <div class="gm-row">
      <button id="mcToggle" class="gm-btn">${active?'Stop':'Start'}</button>
      <div id="mcStatus" class="gm-status" style="margin:0;"></div>
    </div>
    <div class="gm-row" style="gap:12px;margin-top:6px;">
      <div>Bullets: <b id="mcB">${counts.Bullets}</b></div>
      <div>RP: <b id="mcR">${counts.RP}</b></div>
      <div>BO: <b id="mcU">${counts.BO}</b></div>
    </div>
    <div id="mcInfo" style="font-size:11px;margin-top:5px;opacity:.9;">-</div>
  `,'10-milestones');

  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  const visible=el=>!!(el && el.offsetParent !== null && !el.disabled);
  function q(sel,root=document){ return root?.querySelector?.(sel)||null; }
  function setInfo(s){ const el=q('#mcInfo',block); if(el) el.textContent=s||'-'; }
  function ui(){
    const btn=q('#mcToggle',block), st=q('#mcStatus',block);
    if(btn) btn.textContent=active?'Stop':'Start';
    if(st) st.innerHTML=active?'<span class="ok">✅ Actief — V10</span>':'<span class="bad">⛔ Uit</span>';
  }
  function saveCounters(){
    GM_Set(K_COUNTERS,counts);
    const a=q('#mcB',block),b=q('#mcR',block),c=q('#mcU',block);
    if(a)a.textContent=counts.Bullets;if(b)b.textContent=counts.RP;if(c)c.textContent=counts.BO;
  }
  function keyFor(name){
    const s=clean(name).toLowerCase();
    if(s.includes('rank'))return 'RP';
    if(s.includes('bust'))return 'BO';
    if(s.includes('bullet')||s.includes('kogel'))return 'Bullets';
    return null;
  }
  function planner(){ return unsafeWindow.mrbV9Planner||null; }
  function acquire(){ const p=planner(); return !p || p.acquireNavigation(OWNER,45000); }
  function touch(){ try{ planner()?.touchNavigation?.(OWNER,45000); }catch(e){} }
  function release(){ try{ planner()?.releaseNavigation?.(OWNER); }catch(e){} }
  function loadPage(path){
    touch();
    if (unsafeWindow.mrbNavigate?.(path,{owner:OWNER,source:'milestones',ttl:45000})) return;
    try{ unsafeWindow.omerta?.GUI?.container?.loadPage?.(path); return; }catch(e){}
    location.href=path;
  }
  function onMilestones(){
    return /(?:[?&#]|\/)(?:module=)?Milestone\b/i.test(String(location.href)) ||
      !!document.querySelector('.module_Milestones_box, a[href*="module=Milestone"][href*="action=Redeem"]');
  }
  function popupRoot(){
    const candidates=[...document.querySelectorAll('.Milestones_popup_top, .jqi, [role="dialog"], .modal, div')];
    return candidates.find(el=>{
      if(!visible(el))return false;
      const t=clean(el.innerText||el.textContent||'');
      return /COLLECT MILESTONE|milestone to collect|mijlpaal.*(?:ophalen|verzamelen)|mijlpaal beschikbaar/i.test(t) &&
             /VIEW MILESTONES|BEKIJK.*MIJLPALEN|MIJLPALEN|MILESTONES/i.test(t);
    })||null;
  }
  function findViewButton(root=popupRoot()||document){
    return [...root.querySelectorAll('button,a,input[type="button"],input[type="submit"]')]
      .find(el=>visible(el) && /VIEW\s*MILESTONES|BEKIJK\s*MIJLPALEN|MIJLPALEN\s*BEKIJKEN/i.test(clean(el.value||el.textContent||el.getAttribute('title')||'')))||null;
  }
  function robustClick(el){
    if(!el)return false;
    try{ el.focus(); }catch(e){}
    try{ el.click(); return true; }catch(e){}
    try{
      ['mousedown','mouseup','click'].forEach(type=>el.dispatchEvent(new MouseEvent(type,{bubbles:true,cancelable:true,view:window})));
      return true;
    }catch(e){}
    return false;
  }
  async function waitUntil(test,timeout=12000,step=150){
    const end=Date.now()+timeout;
    while(Date.now()<end){ const v=test(); if(v)return v; await sleep(step); }
    return null;
  }
  function redeemLinks(){
    return [...document.querySelectorAll('a,button,input[type="button"],input[type="submit"]')]
      .filter(el=>visible(el))
      .map(el=>({
        el,
        href:el.getAttribute?.('href')||'',
        txt:clean(el.value||el.textContent||''),
        box:el.closest?.('.module_Milestones_box, .milestone, .box, article, tr, div')
      }))
      .filter(x=>/OPHALEN|COLLECT|REDEEM/i.test(x.txt) && (/action=Redeem/i.test(x.href)||/OPHALEN|COLLECT|REDEEM/i.test(x.txt)));
  }
  async function redeemAll(){
    const links=redeemLinks();
    if(!links.length){ setInfo('Geen mijlpalen om op te halen.'); return 0; }
    let done=0;
    for(const item of links){
      touch();
      const name=clean(item.box?.querySelector?.('h4,h3,.title')?.textContent||item.box?.textContent||'');
      const key=keyFor(name);
      if(item.href && /action=Redeem/i.test(item.href)){
        try{
          const url=new URL(item.href,location.href).href;
          const res=await fetch(url,{method:'POST',credentials:'include'});
          if(!res.ok) throw new Error('HTTP '+res.status);
          done++;
          if(key)counts[key]=(counts[key]||0)+1;
        }catch(e){
          if(robustClick(item.el)){ done++; if(key)counts[key]=(counts[key]||0)+1; await sleep(500); }
        }
      }else if(robustClick(item.el)){
        done++; if(key)counts[key]=(counts[key]||0)+1; await sleep(500);
      }
    }
    saveCounters();
    setInfo(`${done} mijlpaal/mijlpalen opgehaald.`);
    return done;
  }
  async function processPopup(){
    if(!active||busy||Date.now()-lastAction<1200)return false;
    const root=popupRoot();
    if(!root)return false;
    if(!acquire()){ setInfo('Wacht op vrije navigatie…'); return false; }
    busy=true;lastAction=Date.now();
    try{
      setInfo('Milestone-popup gevonden — openen…');
      const btn=findViewButton(root);
      if(!btn)throw new Error('VIEW MILESTONES-knop niet gevonden');
      if(!robustClick(btn))throw new Error('VIEW MILESTONES kon niet worden aangeklikt');
      touch();
      await waitUntil(()=>onMilestones(),12000,200);
      await sleep(800);
      await redeemAll();
      await sleep(1200);
      loadPage('/information.php');
      return true;
    }catch(e){
      setInfo('Fout: '+clean(e?.message||e));
      try{ unsafeWindow.mrbV9Diagnostics?.add?.('Milestones',clean(e?.stack||e),'v10.0.1'); }catch(_){}
      return false;
    }finally{
      busy=false;
      setTimeout(release,1500);
    }
  }
  async function hardCheck(){
    if(!active)return {delayMs:30000,status:'module staat uit'};
    if(busy)return {delayMs:5000,status:'al bezig'};
    if(typeof gm_isGateVisible==='function' && gm_isGateVisible())return {delayMs:15000,status:'gate actief'};
    if(popupRoot()){ await processPopup(); return {delayMs:5000,status:'popup verwerkt'}; }
    if(!acquire())return {delayMs:5000,status:'wacht op navigatie'};
    busy=true;
    try{
      setInfo('Periodieke Milestones-controle…');
      if(!onMilestones())loadPage('/?module=Milestone');
      await waitUntil(()=>onMilestones(),12000,200);
      await sleep(700);
      const n=await redeemAll();
      if(n===0||onMilestones()){ await sleep(500); loadPage('/information.php'); }
      return {delayMs:50*60*1000,status:n?`${n} opgehaald`:'niets beschikbaar'};
    }finally{
      busy=false;setTimeout(release,1200);
    }
  }

  const observer=new MutationObserver(()=>{
    if(!active||busy)return;
    clearTimeout(unsafeWindow.__mrbMilestonePopupDebounce);
    unsafeWindow.__mrbMilestonePopupDebounce=setTimeout(processPopup,350);
  });
  const milestoneRoot=document.querySelector('#game_container');
  if(milestoneRoot) observer.observe(milestoneRoot,{childList:true,subtree:true});
  mrbSetInterval(()=>{ if(active&&!busy&&popupRoot())processPopup(); },1000);


  // V10.0.4.24: zelfstandige Milestones-fallback.
  // De module blijft hierdoor werken als de centrale planner ontbreekt,
  // wel gekoppeld lijkt maar geen taken uitvoert, of na handmatige navigatie hapert.
  async function localMilestoneTick(){
    if(!active || busy) return;
    if(Date.now() < localNextAt) return;
    localNextAt = Date.now() + 15000;
    GM_Set('mrb_milestones_local_next_at', localNextAt);
    try{
      const result = await hardCheck();
      const delay = Math.max(5000, Number(result?.delayMs || 50*60*1000));
      localNextAt = Date.now() + delay;
      GM_Set('mrb_milestones_local_next_at', localNextAt);
    }catch(e){
      setInfo('Lokale controlefout: '+clean(e?.message||e));
      localNextAt = Date.now() + 30000;
      GM_Set('mrb_milestones_local_next_at', localNextAt);
    }
  }
  mrbSetInterval(localMilestoneTick,5000);

  q('#mcToggle',block)?.addEventListener('click',()=>{
    active=!active;GM_Set(K_ACTIVE,active);ui();
    if(active){ localNextAt=Date.now()+250; GM_Set('mrb_milestones_local_next_at',localNextAt); setTimeout(processPopup,50); setTimeout(localMilestoneTick,300); }
  });

  ui();saveCounters();
  if(active){ if(!localNextAt || localNextAt<Date.now()) localNextAt=Date.now()+1000; setTimeout(processPopup,300); setTimeout(localMilestoneTick,1200); }
})();


// =====================================================================
// 11) MOLOTOV BUYER
// =====================================================================
;(function MolotovBuyer(){
  const URL8='?module=Shop&action=display_section&id=8', URL0='?module=Shop&action=display_section&id=0';
  const WAIT_TO_0=610000, BACK_TO_8=5000, RENDER_PAUSE=400;

  let running=GM_Get('shop_running',false);
  let tA=null,tB=null;
  let gateTimer=null;

  // interne counters (blijven bestaan, maar NIET zichtbaar in menu)
  let qtyGrenade = null; // item 5
  let qtyMolotov = null; // item 6

  const block = addBlock(`
    <h4>Molotov</h4>
    <div class="gm-row">
      <button id="mbToggle" class="gm-btn">${running?'Stop':'Start'}</button>
      <div id="mbStatus" class="gm-status" style="margin:0;">
        ${running?'<span class="ok">✅ Actief</span>':'<span class="bad">⛔</span>'}
      </div>
    </div>
  `,'11-molotov');

  // lokale helpers
  const $  = (sel,root=block)=> (root||document).querySelector(sel);

  function ui(){
    const btn = $('#mbToggle');
    if(btn) btn.textContent = running ? 'Stop' : 'Start';
    const st = $('#mbStatus');
    if (st)  st.innerHTML   = running ? '<span class="ok">✅ Actief</span>' : '<span class="bad">⛔</span>';
  }

  function loadPage(t){
    if (unsafeWindow.mrbNavigate?.(t,{source:'module'})) return;
    try { const gui=unsafeWindow?.omerta?.GUI?.container; if(gui&&typeof gui.loadPage==='function'){ gui.loadPage(t); return; } } catch(e) {}
    if (t.startsWith('?')) location.search=t; else location.href=t;
  }

  // ---------- UITLOG-GUARD ----------
  function isLoggedOut(){ return gm_isGateVisible(); }

  function findKoop(id){
    return document.querySelector(`a[href*="module=Shop"][href*="action=buy_item"][href*="item=${id}"]`);
  }

  function readCnt(a){
    if(!a) return null;
    let n=a;
    for(let i=0;i<5 && n;i++){
      const m=(n.textContent||'').match(/Quantity:\s*(\d+)/i);
      if(m) return +m[1];
      n=n.parentElement;
    }
    const fr=a.closest('div')?.querySelector('div[style*="float: right"]');
    if(fr){
      const m=(fr.textContent||'').match(/Quantity:\s*(\d+)/i);
      if(m) return +m[1];
    }
    return null;
  }

  function updCounts(){
    const a5=findKoop(5), a6=findKoop(6);
    const n5=readCnt(a5), n6=readCnt(a6);

    if(n5!==null) qtyGrenade = n5;
    if(n6!==null) qtyMolotov = n6;

    // ✅ Auto-stop zodra Molotov 3/3 is
    if(qtyMolotov!==null && qtyMolotov>=3) stop('Molotov 3/3 bereikt');
  }

  function clickKoop(){
    // eerst echte aantallen lezen (kan meteen al stop triggeren)
    updCounts();
    if(!running) return false;

    // koop voorkeur: item 5, anders item 6
    let link=findKoop(5);
    if(!link) link=findKoop(6);

    if(link){
      link.click();

      // na klik: niet optellen in UI, maar later opnieuw lezen
      setTimeout(()=>{ if(running) updCounts(); }, 650);
      return true;
    }
    return false;
  }

  function cycle(){
    if(!running) return;

    // ✅ stop direct als login gedetecteerd is
    if (isLoggedOut()) return pauseForGate('Uitgelogd/Cloudflare gedetecteerd');

    loadPage(URL8);

    setTimeout(()=>{
      if(!running) return;
      if (isLoggedOut()) return pauseForGate('Uitgelogd/Cloudflare gedetecteerd');
      clickKoop();
    }, RENDER_PAUSE);

    clearTimeout(tA); clearTimeout(tB);
    tA=setTimeout(()=>{
      if(!running) return;
      if (isLoggedOut()) return pauseForGate('Uitgelogd/Cloudflare gedetecteerd');

      loadPage(URL0);

      tB=setTimeout(()=>{
        if(!running) return;
        if (isLoggedOut()) return pauseForGate('Uitgelogd/Cloudflare gedetecteerd');
        cycle();
      }, BACK_TO_8);

    }, WAIT_TO_0);
  }

  function start(){
    // ✅ Start weigeren als je uitgelogd bent
    if (!running && isLoggedOut()){
      running = false;
      GM_Set('shop_running', false);
      ui();
      console.warn('[Molotov-Buyer] Start geweigerd: je bent uitgelogd.');
      return;
    }

    if(running) return;
    running=true;
    GM_Set('shop_running',true);
    ui();
    cycle();
  }

  function pauseForGate(reason=''){
    if(!running) return;
    // pauze: stop huidige timers, maar laat running=true staan zodat hij vanzelf hervat
    clearTimeout(tA); clearTimeout(tB);
    if (gateTimer) clearTimeout(gateTimer);
    ui();
    try{ console.warn('[Molotov-Buyer] Pauze (gate):', reason || gm_gateReason()); }catch{}
    gateTimer = setTimeout(()=>{
      if(!running) return;
      if (isLoggedOut()) return pauseForGate(reason);
      gateTimer = null;
      cycle();
    }, 5000);
  }

  function stop(reason=''){
    if(!running) return;
    running=false;
    GM_Set('shop_running',false);
    ui();
    clearTimeout(tA); clearTimeout(tB);
    try{ console.log('[Molotov-Buyer] Gestopt:', reason, { qtyGrenade, qtyMolotov }); }catch{}
  }

  const btn = $('#mbToggle');
  if(btn) btn.addEventListener('click', ()=>{ running ? stop('Handmatig') : start(); });

  ui();

  // ✅ init: als running=true maar je bent uitgelogd → uitzetten
  if (running){
    if (isLoggedOut()){
      pauseForGate('Uitgelogd/Cloudflare bij init');
    } else {
      cycle();
    }
  }
})();


// [VERWIJDERD] Spot Repair module verwijderd op verzoek.
// =====================================================================
// Lackeys knoppen "Fill all lackeys" + "Start lackeys"
// =====================================================================

(function LackeysInlineFillButton_persist(){
  if (unsafeWindow.__LF_BOUND__) return; // voorkom dubbel binden
  unsafeWindow.__LF_BOUND__ = true;

  const MAX_CREDITS = 999;

  // ---- Transfer Mercedes target cars
  const MERCEDES_TARGETS = new Set([
    'Mercedes-Benz W25',
    'Mercedes-Benz W25 Avus Streamliner',
    'Mercedes-Benz W125',
  ]);

  const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
  function onLackeys(){ return /[?&]module=Lackeys\b/i.test(location.href); }
  function readInt(el){
    if(!el) return 0;
    const s = (el.textContent ?? el.value ?? '').replace(/[.,\s]/g,'');
    const n = parseInt(s,10);
    return Number.isFinite(n) ? n : 0;
  }
  async function waitFor(sel, timeout=5000){
    const t0 = Date.now();
    while (Date.now()-t0 < timeout){
      const el = document.querySelector(sel);
      if (el) return el;
      await sleep(50);
    }
    return null;
  }

  function norm(s){ return String(s ?? '').trim(); }

  // --------- Guards om gelijktijdige runs te voorkomen ---------
  let busy = false;
  function isBusy(){ return busy; }
  function setBusy(v){ busy = v; }

  // --------- Credits vullen naar 999 voor bestaande lackeys ---------
  function lackeyIsWorking(lid){
    const statusEl = document.querySelector(`[data-lackey="${lid}"][data-info="status"]`);
    const text = String(statusEl?.textContent || statusEl?.value || '').replace(/\s+/g,' ').trim();
    if (!text) return false;

    // NL + EN statussen die aangeven dat de lackey echt actief aan het werk is.
    return /\b(working|work|werkt|werkend|aan het werk|active|actief|busy|bezig)\b/i.test(text) &&
           !/\b(not working|inactive|inactief|idle|vrij|gestopt|stopped|fired|ontslagen)\b/i.test(text);
  }

  async function fillOne(lid, onlyWorking=false){
    // ALS "Hire" zichtbaar is => lackey niet gehuurd => skip vullen.
    const hireBtn = document.querySelector(`input[type="button"][data-action="hire"][data-lackey="${lid}"]`);
    const hireVisible = !!(hireBtn && hireBtn.getClientRects().length > 0);
    if (hireVisible) return false;

    // Automatische startvulling: uitsluitend lackeys die op dit moment werken.
    if (onlyWorking && !lackeyIsWorking(lid)) return false;

    const td = document.querySelector(`td[data-lackey="${lid}"][data-info="credits"]`);
    if (!td) return false;

    const cur = readInt(td);
    if (cur >= MAX_CREDITS) return true;

    let need = MAX_CREDITS - cur;
    const poolEl = document.getElementById('lackey_credits_available');
    if (poolEl){
      const avail = readInt(poolEl);
      if (avail <= 0) return false;
      if (need > avail) need = avail;
    }
    if (need <= 0) return true;

    const openBtn = document.querySelector(`input.btn.btn-blue.btn-small[data-action="send"][data-lackey="${lid}"]`);
    if (!openBtn) return false; // Send credits niet beschikbaar => skip

    openBtn.click();

    const input = await waitFor(`input[name="l_credits"][data-number="true"]`, 3000);
    if (!input) return;

    input.value = String(need);
    input.dispatchEvent(new Event('input', {bubbles:true}));

    const sendBtn = document.querySelector('button[name="jqi_form_buttonSend"], input[name="jqi_form_buttonSend"], button[value="Send"], input[type="submit"][value="Send"]')
      || Array.from(document.querySelectorAll('.jqi button, .jqi input[type="button"], .jqi input[type="submit"], button, input[type="submit"]')).find(el => /^(send|verstuur|stuur)$/i.test(String(el.value || el.textContent || '').trim()) && el.offsetParent !== null);
    if (sendBtn) { sendBtn.click(); await sleep(600); return true; }
    return false;
  }

  async function fillAll(btn, onlyWorking=false){
    if (isBusy()) return;
    setBusy(true);
    if (btn){ btn.disabled = true; btn.value = 'Filling…'; }
    try{
      for (const lid of [1,2,3,4]){
        try{
          await fillOne(lid, onlyWorking);
        } catch(e){
          // als er tóch iets misgaat bij 1 lackey: sla over en ga door met de volgende
          console.warn('[Lackeys] fillOne error for lackey', lid, e);
        }
        await sleep(800);
      }
    } finally {
      if (btn){ btn.disabled = false; btn.value = 'Fill all lackeys'; }
      setBusy(false);
    }
  }

  // --------- Huren + direct 999 credits geven (Start lackeys) ---------
  async function hireOne(lid){
    // 1) Huur-knop
    const hireBtn = document.querySelector(`input[type="button"][data-action="hire"][data-lackey="${lid}"]`);
    if (!hireBtn) return; // niet zichtbaar / al gehuurd
    hireBtn.click();

    // 2) Offer
    const offerBtn = await waitFor(`button[name="jqi_hello_buttonOffer"], input[name="jqi_hello_buttonOffer"]`, 4000);
    if (!offerBtn) return;
    offerBtn.click();

    // 3) Credits -> 999
    const input = await waitFor(`input[name="l_credits"][data-number="true"]`, 4000);
    if (!input) return;
    input.value = String(MAX_CREDITS);
    input.dispatchEvent(new Event('input', {bubbles:true}));

    // 4) Hire
    const hireConfirm = await waitFor(`button[name="jqi_form_buttonHire"], input[name="jqi_form_buttonHire"]`, 4000);
    if (hireConfirm) hireConfirm.click();

    // 5) OK (succes)
    const okBtn = await waitFor(`button[name="jqi_formSuccess_buttonOK"], input[name="jqi_formSuccess_buttonOK"]`, 6000);
    if (okBtn) okBtn.click();

    await sleep(300);
  }

  async function startAll(btn){
    if (isBusy()) return;
    setBusy(true);
    if (btn){ btn.disabled = true; btn.value = 'Starting…'; }
    try{
      for (const lid of [1,2,3,4]){
        await hireOne(lid);
        await sleep(700);
      }
    } finally {
      if (btn){ btn.disabled = false; btn.value = 'Start lackeys'; }
      setBusy(false);
    }
  }

  // --------- Transfer Mercedes (selecteer specifieke auto's en submit) ---------
  function insertAfter(newNode, referenceNode){
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  async function transferMercedes(form, submitBtn, btn){
    if (isBusy()) return;
    setBusy(true);
    if (btn){ btn.disabled = true; btn.value = 'Transferring…'; }
    try{
      const table = form.querySelector('table[data-info="items"]') || form.querySelector('table');
      if (!table) return;

      let picked = 0;

      const itemCbs = table.querySelectorAll(`input[type="checkbox"][name="items_selected"][data-lackeyitem="true"]`);
      itemCbs.forEach(cb=>{
        const tr = cb.closest('tr');
        const tds = tr ? tr.querySelectorAll('td') : [];
        const carName = norm(tds[1]?.textContent);
        const match = MERCEDES_TARGETS.has(carName);

        cb.checked = match;
        cb.dispatchEvent(new Event('change', {bubbles:true}));

        if (match) picked++;
      });

      if (picked <= 0){
        console.warn('[Lackeys] Transfer Mercedes: geen target Mercedes gevonden.');
        // Geen submit, zodat je niet per ongeluk niks wegstuurt
        return;
      }

      // submit zoals normaal
      submitBtn.click();
    } finally {
      // meestal navigatie/reload, maar voor de zekerheid:
      if (btn){ btn.disabled = false; btn.value = 'Transfer Mercedes'; }
      setBusy(false);
    }
  }

  function ensureTransferMercedesButtons(){
    if (!onLackeys()) return;

    // Voor elke lackey transferCars-form: voeg knop naast "Transfer to garage"
    const submits = document.querySelectorAll(
      `form[data-action="transferCars"] input[type="submit"][value="Transfer to garage"]`
    );

    submits.forEach(submitBtn=>{
      const form = submitBtn.closest('form');
      if (!form) return;

      const lid = form.getAttribute('data-lackey') || 'x';
      const btnId = `btnTransferMercedes_${lid}`;

      // al aanwezig?
      if (form.querySelector(`#${CSS.escape(btnId)}`)) return;

      const b = document.createElement('input');
      b.type = 'button';
      b.id = btnId;
      b.className = 'btn btn-blue btn-small';
      b.value = 'Transfer Mercedes';
      b.style.marginLeft = '8px';

      b.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        transferMercedes(form, submitBtn, b);
      });

      insertAfter(b, submitBtn);
    });
  }

  // --------- UI inprikken (inline) ---------
  function ensureButtons(){
    if (!onLackeys()) return;

    // Zoek de rij met de credits-knoppen/“lackey_credits_available”
    const row = [...document.querySelectorAll('.otable table tbody tr')].find(tr =>
      tr.querySelector('#lackey_credits_available') ||
      tr.querySelector('input[data-lackey="user"][data-action="addCredits"]') ||
      tr.querySelector('input[value="Add extra credits"]') ||
      tr.querySelector('input[value="Fire All"]')
    );
    if (!row) {
      // ook al is die rij er niet: Mercedes-knoppen kunnen wél al zichtbaar zijn
      ensureTransferMercedesButtons();
      return;
    }

    const tds = [...row.children].filter(n=>n.tagName==='TD');
    let host = null;
    if (tds.length >= 3) host = tds[1];                // middenkolom
    else if (tds.length === 2){                         // maak middenkolom
      host = document.createElement('td');
      host.style.textAlign = 'center';
      row.insertBefore(host, tds[1]);
    } else host = tds[0];
    if (!host) {
      ensureTransferMercedesButtons();
      return;
    }

    // Zorg dat we één container hebben om beide knoppen netjes naast elkaar te zetten
    let box = host.querySelector('#lackeyInlineBtnBox');
    if (!box){
      box = document.createElement('div');
      box.id = 'lackeyInlineBtnBox';
      box.style.display = 'inline-flex';
      box.style.gap = '8px';
      box.style.marginLeft = '8px';
      host.appendChild(box);
    }

    // Fill all lackeys
    if (!box.querySelector('#btnFillAllLackeysInline')){
      const b1 = document.createElement('input');
      b1.type = 'button';
      b1.id = 'btnFillAllLackeysInline';
      b1.className = 'btn btn-blue btn-small';
      b1.value = 'Fill all lackeys';
      b1.addEventListener('click', ()=>fillAll(b1));
      box.appendChild(b1);
    }

    // Start lackeys
    if (!box.querySelector('#btnStartLackeysInline')){
      const b2 = document.createElement('input');
      b2.type = 'button';
      b2.id = 'btnStartLackeysInline';
      b2.className = 'btn btn-blue btn-small';
      b2.value = 'Start lackeys';
      b2.addEventListener('click', ()=>startAll(b2));
      box.appendChild(b2);
    }

    // Daarnaast: per lackey-items tabel een "Transfer Mercedes" knop
    ensureTransferMercedesButtons();
  }

  // Publieke API voor de V9-starttaak. Deze vult uitsluitend lackeys die werken.
  unsafeWindow.mrbFillWorkingLackeys = async function(){
    if (!onLackeys()) return { ok:false, reason:'niet op Lackeys-pagina' };
    await fillAll(null, true);
    return { ok:true };
  };

  // Initial try + persistente watchers (AJAX/tabs)
  ensureButtons();
  const target = document.getElementById('game_container') || document.body;
  const mo = new MutationObserver(()=>ensureButtons());
  mo.observe(target, {childList:true, subtree:true});

  window.addEventListener('hashchange', ensureButtons, true);
  window.addEventListener('popstate',  ensureButtons, true);
})();


// =====================================================================
// LACKEY TIMER — Spats + Noodles starten na X minuten en daarna uitloggen
// =====================================================================
// LACKEY TIMER + LOGOUT v8.3.3
// Fix: gebruikt directe lackey-knoppen data-lackey=1/2 + data-action=hire.
// Flow: Huur -> Offer -> l_credits invullen -> Hire. Daarna pas logout.
// =====================================================================
(function MRBLackeyTimerLogout(){
  'use strict';

  const K_ON = 'mrb_lackey_timer_on';
  const K_MINUTES = 'mrb_lackey_timer_minutes';
  const K_CREDITS = 'mrb_lackey_timer_credits';
  const K_TARGET_TS = 'mrb_lackey_timer_target_ts';

  let running = !!GM_Get(K_ON, false);
  let minutes = Math.max(1, Math.min(1440, Number(GM_Get(K_MINUTES, 30)) || 30));
  let credits = Math.max(1, Math.min(9999, Number(GM_Get(K_CREDITS, 1000)) || 1000));
  let targetTs = Number(GM_Get(K_TARGET_TS, 0)) || 0;
  let timer = null;
  let busy = false;
  let plannerManaged = false;

  const block = addBlock(`
    <h4>Lackey Timer</h4>
    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="ltToggle" class="gm-btn">${running ? 'Stop' : 'Start'}</button>
      <div id="ltStatus" class="gm-status" style="margin:0;"></div>
    </div>
    <div class="gm-row" style="align-items:center;gap:7px;margin-top:7px;">
      <label>Na</label>
      <input id="ltMinutes" type="number" min="1" max="1440" step="1" value="${minutes}" style="width:64px;">
      <span>min</span>
    </div>
    <div class="gm-row" style="align-items:center;gap:7px;margin-top:5px;">
      <label>Credits</label>
      <input id="ltCredits" type="number" min="1" max="9999" step="1" value="${credits}" style="width:78px;">
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;margin-top:7px;">
      <button id="ltSave" class="gm-btn">Save</button>
      <button id="ltRunNow" class="gm-btn">Nu starten</button>
    </div>
    <div id="ltInfo" style="font-size:12px;opacity:.9;margin-top:6px;line-height:1.35;">-</div>
  `, '00d-lackey-timer');

  const sleep = (ms)=>new Promise(r=>setTimeout(r, ms));
  const clean = (s)=>String(s || '').replace(/\s+/g, ' ').trim();
  const qs = (sel, root=document)=>root.querySelector(sel);
  const qsa = (sel, root=document)=>Array.from(root.querySelectorAll(sel));
  const labelText = (el)=>clean(el?.value || el?.textContent || el?.innerText || el?.getAttribute?.('title') || el?.getAttribute?.('data-action') || '');

  function loadPage(path){
    if (unsafeWindow.mrbNavigate?.(path,{source:'fill-lackey'})) return;
    try { const gui=unsafeWindow?.omerta?.GUI?.container; if (gui&&typeof gui.loadPage==='function'){ gui.loadPage(path); return; } } catch(e) {}
    try { location.href=path; } catch(e) {}
  }

  function safeClick(el){
    if (!el) return false;
    try { el.scrollIntoView({block:'center', inline:'center'}); } catch(e) {}
    try { el.focus(); } catch(e) {}

    // Eerst jQuery, omdat Barafranca/jQi-popup knoppen daar vaak hun handler op hebben.
    try {
      const $ = unsafeWindow.$ || unsafeWindow.jQuery;
      if ($) {
        $(el).trigger('mousedown').trigger('mouseup').trigger('click');
      }
    } catch(e) {}

    try { el.dispatchEvent(new PointerEvent('pointerdown', {bubbles:true,cancelable:true,view:window})); } catch(e) {}
    try { el.dispatchEvent(new MouseEvent('mousedown', {bubbles:true,cancelable:true,view:window})); } catch(e) {}
    try { el.dispatchEvent(new PointerEvent('pointerup', {bubbles:true,cancelable:true,view:window})); } catch(e) {}
    try { el.dispatchEvent(new MouseEvent('mouseup',   {bubbles:true,cancelable:true,view:window})); } catch(e) {}
    try { el.click(); return true; } catch(e) {}
    try { el.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true,view:window})); return true; } catch(e) {}
    return false;
  }

  function visibleJqiState(name){
    const st = qs(`.jqi .jqistate[data-jqi-name="${name}"]`);
    if (!st) return false;
    const style = String(st.getAttribute('style') || '');
    return !/display\s*:\s*none/i.test(style) && (st.offsetParent !== null || st.getClientRects().length);
  }

  function findNamedDialogButton(name){
    return qsa(`.jqi button[name="${name}"], .jqi input[name="${name}"]`).find(visible) || null;
  }

  async function clickNamedDialogButton(name, fallbackRegex, label){
    const btn = await waitFor(() => findNamedDialogButton(name) || (fallbackRegex ? findDialogButton(fallbackRegex) : null), 10000, 150);
    if (!btn) { if (label) setInfo(`${label}: popupknop ${name} niet gevonden.`); return false; }
    safeClick(btn);
    return true;
  }

  function setInputValue(el, value){
    if (!el) return false;
    const v = String(Math.max(1, Math.floor(Number(value) || 0)));
    try { el.focus(); } catch(e) {}
    try { el.value = ''; } catch(e) {}
    try { el.dispatchEvent(new Event('input', {bubbles:true})); } catch(e) {}
    try { el.value = v; } catch(e) {}
    try { el.setAttribute('value', v); } catch(e) {}
    ['input','change','keyup','blur'].forEach(type=>{ try { el.dispatchEvent(new Event(type, {bubbles:true})); } catch(e) {} });
    try {
      const $ = unsafeWindow.$ || unsafeWindow.jQuery;
      if ($) $(el).val(v).trigger('input').trigger('change').trigger('keyup').trigger('blur');
    } catch(e) {}
    return true;
  }

  function normalizeFixedDue(){
    if(!fixedRefreshOn){ fixedRefreshDue=0; fixedRefreshPendingSince=0; GM_Set(K_FIXED_DUE,0); return; }
    if(!fixedRefreshDue) fixedRefreshDue=Date.now()+fixedRefreshMinutes*60_000;
    GM_Set(K_FIXED_DUE,fixedRefreshDue);
  }
  function gateVisible(){ try { return typeof gm_isGateVisible === 'function' && gm_isGateVisible(); } catch(e) { return false; } }
  function captchaVisible(){
    const t = clean(document.body?.innerText || '');
    return !!(document.getElementById('recaptcha-popup') || document.querySelector('.g-recaptcha, iframe[src*="recaptcha"], iframe[src*="hcaptcha"], iframe[src*="captcha"], iframe[src*="challenges.cloudflare.com"]') || /captcha|recaptcha|hcaptcha|Verifying you are human|Verify you are human|Verifieer dat u een mens bent/i.test(t));
  }
  async function waitGuards(){
    while (running && (gateVisible() || captchaVisible())){ setInfo(gateVisible() ? 'Pauze: login/Cloudflare/click-limit zichtbaar.' : 'Pauze: captcha zichtbaar.'); await sleep(5000); }
    if (!running) throw new Error('STOPPED');
  }
  async function waitFor(fn, timeout=12000, step=200){
    const t0 = Date.now();
    while (Date.now() - t0 < timeout){ await waitGuards(); const out = fn(); if (out) return out; await sleep(step); }
    return null;
  }

  function readSettings(){
    const minEl = qs('#ltMinutes', block), credEl = qs('#ltCredits', block);
    minutes = Math.max(1, Math.min(1440, Math.floor(Number(minEl?.value || minutes) || minutes)));
    credits = Math.max(1, Math.min(9999, Math.floor(Number(credEl?.value || credits) || credits)));
    if (minEl) minEl.value = String(minutes); if (credEl) credEl.value = String(credits);
    GM_Set(K_MINUTES, minutes); GM_Set(K_CREDITS, credits);
  }
  function fmtLeft(ms){
    ms = Math.max(0, ms || 0); const total = Math.ceil(ms / 1000); const h = Math.floor(total / 3600); const m = Math.floor((total % 3600) / 60); const s = total % 60;
    if (h > 0) return `${h}u ${m}m ${s}s`; if (m > 0) return `${m}m ${s}s`; return `${s}s`;
  }
  function setInfo(msg){ const el = qs('#ltInfo', block); if (el) el.textContent = msg || '-'; }
  function paint(){
    const btn = qs('#ltToggle', block), st = qs('#ltStatus', block);
    if (btn) btn.textContent = running ? 'Stop' : 'Start';
    if (st) st.innerHTML = running ? `<span class="ok">✅ Actief${plannerManaged ? ' — 🧭 V9 Planner' : ''}</span>` : '<span class="bad">⛔ Uit</span>';
    if (!running) { setInfo('-'); return; }
    if (busy) { setInfo('Bezig met Spats + Noodles huren/credits vullen…'); return; }
    if (targetTs) setInfo(`Start over ${fmtLeft(targetTs - Date.now())} • ${credits} credits`);
    else setInfo(`Timer actief • ${minutes} min • ${credits} credits`);
  }
  function armTimer(){
    clearTimeout(timer);
    if (!running || !targetTs) { paint(); return; }
    if (plannerManaged) {
      try {
        const planner = unsafeWindow.mrbV9Planner;
        if (planner) planner.updateTask('v9-lackey-timer', { nextAt:Math.max(Date.now()+250, targetTs), status:'wacht op Lackey Timer' });
      } catch(e) {}
      paint();
      return;
    }
    const wait = Math.max(0, targetTs - Date.now());
    timer = setTimeout(() => runFlow(false), Math.min(wait, 30_000));
    paint();
  }
  function startTimer(){ readSettings(); running = true; targetTs = Date.now() + minutes * 60 * 1000; GM_Set(K_ON, true); GM_Set(K_TARGET_TS, targetTs); armTimer(); }
  function stopTimer(){ running = false; busy = false; targetTs = 0; clearTimeout(timer); GM_Set(K_ON, false); GM_Set(K_TARGET_TS, 0); paint(); }

  function onLackeysPage(){ return /[?&]module=Lackeys\b/i.test(location.href) || /module=Lackeys/i.test(location.href) || /\bSpats\b/i.test(document.body?.innerText || '') || /\bNoodles\b/i.test(document.body?.innerText || ''); }

  function ownText(el){
    try {
      return clean(Array.from(el.childNodes || [])
        .filter(n => n.nodeType === 3)
        .map(n => n.nodeValue || '')
        .join(' '));
    } catch(e) { return ''; }
  }

  function visible(el){
    return !!(el && !el.disabled && (el.offsetParent !== null || el.getClientRects().length));
  }

  function findButtons(){
    return qsa('input[type="button"], input[type="submit"], button, a')
      .filter(visible);
  }

  function isLackeyHeading(el){
    const o = ownText(el);
    const t = clean(el?.innerText || el?.textContent || '');

    // Belangrijk: parent-containers bevatten vaak Spats + Noodles samen.
    // Daarom accepteren we vooral eigen tekst, of korte koppen.
    if (/^(Spats|Noodles)$/i.test(o)) return o.match(/Spats/i) ? 'Spats' : 'Noodles';
    if (/^(Spats|Noodles)$/i.test(t) && t.length <= 20) return /Spats/i.test(t) ? 'Spats' : 'Noodles';
    return '';
  }

  function lackeyOwnerByPreviousHeading(el){
    let owner = '';
    const all = Array.from(document.body.querySelectorAll('*'));
    for (const node of all){
      const h = isLackeyHeading(node);
      if (h) owner = h;
      if (node === el || node.contains(el)) return owner;
    }
    return owner;
  }

  function nearestPanelText(el){
    // Fallback wanneer de HTML anders is: zoek een kleine container rondom de knop.
    let n = el;
    for (let i=0; n && i<7; i++, n=n.parentElement){
      const txt = clean(n.innerText || n.textContent || '');
      if (txt.length < 900 && /\b(Spats|Noodles)\b/i.test(txt)) return txt;
    }
    return '';
  }

  function belongsTo(el, name){
    const owner = lackeyOwnerByPreviousHeading(el);
    if (owner) return owner.toLowerCase() === String(name).toLowerCase();

    const txt = nearestPanelText(el);
    if (!txt) return false;
    const other = name === 'Spats' ? 'Noodles' : 'Spats';
    const ni = txt.search(new RegExp(`\\b${name}\\b`, 'i'));
    const oi = txt.search(new RegExp(`\\b${other}\\b`, 'i'));
    return ni !== -1 && (oi === -1 || ni > oi);
  }

  function lackeyId(name){
    return /^spats$/i.test(String(name || '')) ? '1' : /^noodles$/i.test(String(name || '')) ? '2' : '';
  }

  function firstVisible(selectors){
    for (const sel of selectors){
      const el = qsa(sel).find(visible);
      if (el) return el;
    }
    return null;
  }

  function findLackeyButton(name, kind){
    const id = lackeyId(name);
    const dataAction = kind === 'hire' ? 'hire' : kind === 'send' ? 'send' : 'fire';

    // Betrouwbare Barafranca-layout: Spats = data-lackey 1, Noodles = data-lackey 2.
    // Hierdoor klikken we nooit per ongeluk op "Voeg extra credits toe" wanneer we moeten huren.
    if (id) {
      const direct = firstVisible([
        `input[data-lackey="${id}"][data-action="${dataAction}"]`,
        `button[data-lackey="${id}"][data-action="${dataAction}"]`,
        `[data-lackey="${id}"][data-action="${dataAction}"] input`,
        `[data-lackey="${id}"][data-action="${dataAction}"] button`
      ]);
      if (direct) return direct;
    }

    const re = kind === 'hire'
      ? /^(huur|hire)$/i
      : kind === 'send'
        ? /(send|credit|credits|verstuur|stuur|bijvul|vul|voeg\s+extra\s+credits\s+toe)/i
        : /(fire|ontslaan|ontsla)/i;

    const exact = qsa(`[data-action="${dataAction}"]`).filter(visible).find(b => belongsTo(b, name));
    if (exact) return exact;

    const cands = findButtons().filter(b => re.test(labelText(b)));
    return cands.find(b => belongsTo(b, name)) || null;
  }

  function findHireButton(name){ return findLackeyButton(name, 'hire'); }
  function findFireButton(name){ return findLackeyButton(name, 'fire'); }
  function findSendButton(name){ return findLackeyButton(name, 'send'); }

  function findCreditInput(){
    return qsa('.jqi input[name="l_credits"], .jqi input[data-number="true"], input[name="l_credits"], input[data-number="true"]').find(visible) ||
      qsa('.jqi input[type="text"], .jqi input[type="number"], input[type="text"], input[type="number"]')
        .filter(visible)
        .find(i => /credit|credits|l_credits/i.test(clean(i.name || i.id || i.placeholder || i.closest('tr,div,td,label')?.textContent || '')));
  }

  function findDialogButton(regex){
    return qsa('.jqi button, .jqi input[type="button"], .jqi input[type="submit"]')
      .filter(visible)
      .find(b => regex.test(labelText(b))) || null;
  }
  async function closeAnyOk(){
    const okBtn = await waitFor(() => qs('button[name="jqi_formSuccess_buttonOK"], input[name="jqi_formSuccess_buttonOK"], button[name*="buttonOK"], input[name*="buttonOK"]') || findDialogButton(/^(ok|okay|sluiten)$/i), 2500, 150);
    if (okBtn) { safeClick(okBtn); await sleep(400); }
  }

  async function fillCreditsInOpenDialog(label, amount, mode){
    const input = await waitFor(findCreditInput, 10000, 150);
    if (!input) { setInfo(`${label}: creditveld niet gevonden na Huur/Send.`); return false; }
    setInputValue(input, amount);
    await sleep(300);
    const confirm = await waitFor(() =>
      firstVisible([
        'button[name="jqi_form_buttonHire"]',
        'input[name="jqi_form_buttonHire"]',
        'button[name="jqi_form_buttonSend"]',
        'input[name="jqi_form_buttonSend"]',
        'button[name*="buttonHire"]',
        'input[name*="buttonHire"]',
        'button[name*="buttonSend"]',
        'input[name*="buttonSend"]'
      ]) ||
      findDialogButton(mode === 'hire' ? /^(huur|hire|bevestig|confirm|ok)$/i : /^(send|verstuur|stuur|toevoegen|credits|ok|bevestig|confirm)$/i), 7000, 150);
    if (!confirm) { setInfo(`${label}: bevestigknop niet gevonden.`); return false; }
    safeClick(confirm);
    await closeAnyOk();
    await sleep(900);
    return true;
  }

  async function hireWithCredits(label){
    const btn = findHireButton(label);
    if (!btn) {
      // Al actief? probeer dan credits te sturen via send.
      if (findFireButton(label) || findSendButton(label)) return sendCredits(label);
      setInfo(`${label}: Huur-knop niet gevonden.`);
      return false;
    }

    setInfo(`${label}: Huur klikken…`);
    safeClick(btn);

    // Stap 1: eerste jQi-popup. Exacte knopnaam uit jouw HTML:
    // name="jqi_hello_buttonOffer". Pas daarna verschijnt het l_credits veld.
    const offerOk = await clickNamedDialogButton('jqi_hello_buttonOffer', /^offer$/i, label);
    if (!offerOk) return false;

    setInfo(`${label}: Offer geklikt, wacht op creditveld…`);

    // Stap 2: wacht expliciet tot de tweede popup met data-jqi-name="form" actief is.
    const inputReady = await waitFor(() => {
      const input = findCreditInput();
      if (input) return input;
      return null;
    }, 12000, 150);

    if (!inputReady) {
      setInfo(`${label}: creditveld l_credits niet gevonden na Offer.`);
      return false;
    }

    return await fillCreditsInOpenDialog(label, credits, 'hire');
  }

  async function sendCredits(label){
    const sendBtn = findSendButton(label);
    if (!sendBtn) return true; // Geen send-knop maar ook geen huurknop: waarschijnlijk actief zonder bijvuloptie.
    setInfo(`${label}: Send credits openen…`);
    safeClick(sendBtn);
    await sleep(400);
    return await fillCreditsInOpenDialog(label, credits, 'send');
  }

  async function ensureLackey(label){
    setInfo(`${label}: controleren…`);
    const hireBtn = findHireButton(label);
    if (hireBtn) return await hireWithCredits(label);
    return await sendCredits(label);
  }

  function doLogout(){
    setInfo('Uitloggen…');
    const logout = qs('a[href*="logout" i], input[value*="Logout" i], input[value*="Uitloggen" i]') || qsa('a, button, input[type="button"], input[type="submit"]').find(el => /log\s*out|logout|uitloggen/i.test(clean(el.textContent || el.value || el.href || '')));
    if (logout) { safeClick(logout); return; }
    try { location.href = '/logout.php'; } catch(e) {}
  }

  async function runFlow(force){
    if (busy) return;
    if (!force && targetTs && Date.now() < targetTs) return armTimer();
    readSettings(); running = true; busy = true; GM_Set(K_ON, true); paint();
    try {
      await waitGuards();
      if (!onLackeysPage()) { setInfo('Lackeys openen…'); loadPage('/?module=Lackeys'); await sleep(2500); }
      await waitGuards();
      await waitFor(() => onLackeysPage() && (/\bSpats\b/i.test(document.body?.innerText || '') || findHireButton('Spats')), 20000, 250);

      const spatsOk = await ensureLackey('Spats');
      await sleep(1000);
      const noodlesOk = await ensureLackey('Noodles');
      await sleep(1000);

      if (!spatsOk || !noodlesOk) throw new Error(`Lackey niet volledig verwerkt: Spats=${spatsOk}, Noodles=${noodlesOk}`);
      GM_Set(K_ON, false); GM_Set(K_TARGET_TS, 0); running = false; busy = false; paint(); doLogout();
    } catch(e) {
      try { console.warn('[MRB Lackey Timer]', e); } catch(_) {}
      if (running) { busy = false; setInfo('Niet gelukt met vullen. Geen logout; retry over 60s…'); targetTs = Date.now() + 60_000; GM_Set(K_TARGET_TS, targetTs); armTimer(); }
    }
  }

  qs('#ltToggle', block)?.addEventListener('click', () => running ? stopTimer() : startTimer());
  qs('#ltSave', block)?.addEventListener('click', () => { readSettings(); paint(); });
  qs('#ltRunNow', block)?.addEventListener('click', () => { readSettings(); running = true; targetTs = Date.now(); GM_Set(K_ON, true); GM_Set(K_TARGET_TS, targetTs); runFlow(true); });
  ['#ltMinutes', '#ltCredits'].forEach(sel => { const el = qs(sel, block); if (!el) return; el.addEventListener('change', () => { readSettings(); paint(); }); el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); readSettings(); paint(); } }); });

  unsafeWindow.mrbV9LackeyTimer = {
    setPlannerManaged(on){ plannerManaged = !!on; clearTimeout(timer); paint(); if (running) armTimer(); },
    isRunning(){ return !!running; },
    nextAt(){ return running && targetTs ? targetTs : Date.now()+15000; },
    isBusy(){ return !!busy; },
    async wake(){
      if (!running) return { delayMs:15000, status:'module staat uit' };
      if (busy) return { delayMs:3000, status:'Spats/Noodles worden verwerkt' };
      if (targetTs && Date.now() < targetTs) return { nextAt:targetTs, status:'wacht op ingestelde tijd' };
      await runFlow(false);
      if (!running) return { delayMs:60000, status:'afgerond / uitgelogd' };
      return { nextAt:targetTs || Date.now()+60000, status:'retry gepland' };
    }
  };

  mrbSetInterval(paint, 1000);
  if (running) { if (!targetTs) { targetTs = Date.now() + minutes * 60 * 1000; GM_Set(K_TARGET_TS, targetTs); } armTimer(); } else paint();
})();

// =====================================================================
// GARAGE — Quick Action knoppen (legacy-safe) — v3
// =====================================================================
;(function () {
  const MATCH = {
    oc: /(oc|moc)/i,
    raid: /(spotoverval|raid)/i,
    repair: /(repareer|repair)/i,
  };

  function onPage() {
    return document.querySelector('#game_container.moduleLegacyGarage, form#cars');
  }

  function findForm() {
    return (
      document.querySelector('form#cars') ||
      document.querySelector('form[action^="/garage.php"]') ||
      document.querySelector('form[action*="garage.php"]') ||
      document.querySelector('#game_container form')
    );
  }

  function findBottom(which) {
    // 1) exacte name (als die bestaat)
    const byName = document.querySelector(
      `input[type="submit"][name="${which}"], input[type="button"][name="${which}"]`
    );
    if (byName) return byName;

    // 2) op knop-tekst (value) in de game container
    const cands = Array.from(
      document.querySelectorAll(
        '#game_container input[type="submit"], #game_container input[type="button"]'
      )
    );
    return cands.find(el => MATCH[which].test(el.value || ''));
  }

  function clickOrSubmit(which) {
    const btn = findBottom(which);
    const form = (btn && btn.form) || findForm();
    if (!form) return;

    if (btn) {
      btn.click(); // gebruik de originele game-actie (incl. confirm/handlers)
      return;
    }

    // Fallback: hidden + submit (werkt ook zonder onderknoppen)
    if (which === 'repair') {
      const ok = (window.confirmAction
        ? window.confirmAction("Do you want to repair these cars?")
        : window.confirm("Do you want to repair these cars?"));
      if (!ok) return;
    }
    let hidden = form.querySelector(`input[type="hidden"][name="${which}"]`);
    if (!hidden) {
      hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = which; // verwacht: oc | raid | repair
      hidden.value = '1';
      form.appendChild(hidden);
    }
    form.submit();
  }

  function installBar() {
    if (!onPage()) return;
    if (document.getElementById('gmGarageTopBar')) return;

    const form = findForm();
    if (!form) return;

    const bar = document.createElement('div');
    bar.id = 'gmGarageTopBar';
    bar.innerHTML = `
      <div class="gm-inner">
        <input type="button" class="gm-btn" id="gm_oc"     value="OC/MOC Auto">
        <input type="button" class="gm-btn" id="gm_raid"   value="Spotoverval Auto">
        <input type="button" class="gm-btn" id="gm_repair" value="Repareer">
      </div>
    `;

    // Zet ‘m zichtbaar bovenaan, binnen het <center> blok als dat er is.
    const center = form.querySelector('center');
    if (center && center.firstChild) center.insertBefore(bar, center.firstChild);
    else form.insertBefore(bar, form.firstChild);

    bar.querySelector('#gm_oc').onclick     = () => clickOrSubmit('oc');
    bar.querySelector('#gm_raid').onclick   = () => clickOrSubmit('raid');
    bar.querySelector('#gm_repair').onclick = () => clickOrSubmit('repair');

    // Stijltje + hoge z-index zodat niets het verbergt
    const css = `
      #gmGarageTopBar{margin:6px 0 8px; padding:8px 10px; border:1px solid #444;
        border-radius:8px; background:rgba(0,0,0,.6); display:block; position:relative; z-index:9999;}
      #gmGarageTopBar .gm-inner{display:flex; flex-wrap:wrap; gap:8px; align-items:center}
      #gmGarageTopBar .gm-btn{padding:6px 10px; cursor:pointer}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.documentElement.appendChild(style);
  }

  const tick = () => { try { installBar(); } catch(e){ console.warn('[GarageTopBar v3]', e); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick);
  else tick();
  // CPU-hotfix: geen permanente full-body observer. SPA-navigatie en een rustige
  // controle zijn voldoende om de balk te plaatsen.
  window.addEventListener('hashchange', tick, true);
  window.addEventListener('popstate', tick, true);
  mrbSetInterval(() => { if (onPage()) tick(); }, 3000);
})();


// [VERWIJDERD] Sell Bullets module verwijderd op verzoek.
// =====================================================================
// 15) KEYBOARD SHORTCUTS — altijd actief, geen UI
// =====================================================================
(function KeyboardShortcutsAlwaysOn(){
  // voorkom dubbel binden bij herinjecties
  if (unsafeWindow.__KB_SHORTCUTS_BOUND__) return;
  unsafeWindow.__KB_SHORTCUTS_BOUND__ = true;

  const GUI=()=>{
    try{ const g=unsafeWindow?.omerta?.GUI?.container;
      if(unsafeWindow.mrbNavigate) return (p)=>unsafeWindow.mrbNavigate(p,{source:'shortcuts'});
      if(g&&typeof g.loadPage==='function') return (p)=>g.loadPage(p);
    }catch{}
    return (p)=>{ if(unsafeWindow.mrbNavigate) return unsafeWindow.mrbNavigate(p,{source:'fallback'}); if(p.startsWith('?')) location.search=p; else location.href=p; };
  };
  const loadPage = GUI();

  const shortcutKeys = { 74:'J',65:'A',67:'C',78:'N',83:'S',84:'T',71:'G',66:'B' };

  function clickSelector(sel){ const el=document.querySelector(sel); if(el){ try{el.click();}catch{} } }
  function clickInputValue(val){
    const el=[...document.querySelectorAll('input[type="submit"],input[type="button"],button')]
      .find(b=>((b.value||b.textContent||'').trim()===val));
    if(el){ try{el.click();}catch{} }
  }

  function handler(e){
    // geen interferentie met invoervelden of ctrl/meta-combo's
    if (e.target && (e.target.matches('input[type=text], input[type=password], textarea') || e.ctrlKey || e.metaKey)) return;

    // ` of Q → buymeout
    if (e.keyCode===192 || e.keyCode===81){
      clickSelector("input[name='buymeout']");
      try{ e.preventDefault(); }catch{}
    }

    // accesskey map
    if (shortcutKeys[e.keyCode]){
      const k = shortcutKeys[e.keyCode];
      const a = document.querySelector(`a[accesskey="${k}"]`);
      if (a){ try{ a.click(); e.preventDefault(); }catch{} }
    }

    // directe navigatie / acties
    switch(e.keyCode){
      case 82: loadPage('/races.php'); break;                        // R
      case 89: loadPage('/?module=Bodyguards'); break;               // Y
      case 79: loadPage('/?module=Obay&action=auctions'); break;     // O
      case 75: loadPage('/?module=Detectives'); break;               // K
      case 77: loadPage('/?module=Mail'); break;                     // M
      case 87: clickInputValue('Bust out'); clickInputValue(' Try it '); loadPage('/gambling/gambling.php'); break; // W
      case 72: loadPage('/?module=Bloodbank'); break;                // H
      case 85: loadPage('/allusers.php?start=0&order=lastrank&sort=DESC&dead=HIDE'); break; // U
      case 80: loadPage('/?module=RankRequirements'); break;         // P
      case 81: loadPage('/?module=Obay&action=add&type=8'); break;   // Q
      case 86: loadPage('/index.php?module=Spots'); break;           // V
      case 76: loadPage('/index.php?module=Lackeys'); break;         // L
      case 90: loadPage('/?module=Poker'); break;                    // Z
      case 73: loadPage('/?module=Statistics&action=global_stats'); break; // I
      case 69: loadPage('/garage.php'); break;                       // E
      case 70: loadPage('/?module=Shop&action=display_section&id=3'); break; // F
      case 68: loadPage('/?module=Shop&action=display_section&id=8'); break; // D
    }
  }

  const isFF = navigator.userAgent.toLowerCase().includes('firefox');
  (isFF ? window : unsafeWindow).addEventListener('keydown', handler, true);
})();

// =====================================================================
// BREAKOUT HELPER — Instant auto-submit (alleen Jail) • per-waarde guard + focus ver
// =====================================================================
;(function BreakoutHelperInstant(){
  const FIELD_ID = 'ver';
  const BTN_ID   = 'submitAction';

  function onJail(){
    const h=(location.hash||'').toLowerCase();
    const p=(location.pathname||'').toLowerCase();
    const q=(location.search||'').toLowerCase();
    return h.includes('/jail.php') || p.endsWith('/jail.php') || q.includes('module=jail');
  }

  // ✅ Force focus (autofocus werkt vaak niet bij hash/SPA)
  function focusVer(){
    if (!onJail()) return false;
    const el = document.getElementById(FIELD_ID);
    if (!el) return false;

    // alleen focusen als het nog niet actief is
    if (document.activeElement !== el){
      try { el.focus({ preventScroll: true }); } catch { el.focus(); }
      if (typeof el.select === 'function') el.select();
    }
    return true;
  }

  // korte “burst” met meerdere pogingen (voor als de pagina net rendert / AJAX vervangt)
  function focusBurst(durationMs = 1500){
    if (!onJail()) return;
    const start = performance.now();

    const tick = () => {
      if (!onJail()) return;
      focusVer();
      if (performance.now() - start < durationMs) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }

  function trySubmit(el){
    if (!onJail() || !el || el.id !== FIELD_ID) return;

    const val = (el.value || '').trim();

    // Reset guard zodra waarde niet 3 tekens is
    if (val.length !== 3){
      if (el.dataset.mrbGoldLastSubmit) el.dataset.mrbGoldLastSubmit = '';
      return;
    }

    // Per-waarde guard: dezelfde 3 letters niet dubbel klikken
    if (el.dataset.mrbGoldLastSubmit === val) return;

    // Zoek de knop (eerst binnen het form)
    const form = el.form || document;
    const btn = form.querySelector('#' + BTN_ID) || document.getElementById(BTN_ID);
    if (!btn) return;

    // Onthoud laatst verstuurde waarde en klik direct
    el.dataset.mrbGoldLastSubmit = val;
    btn.click();

    // na submit vaak rerender → opnieuw focusen
    focusBurst(1200);
  }

  // Vuur zo vroeg mogelijk (capturing) op input/keyup/change
  document.addEventListener('input',  e => trySubmit(e.target), true);
  document.addEventListener('keyup',  e => trySubmit(e.target), true);
  document.addEventListener('change', e => trySubmit(e.target), true);

  // Bij SPA-navigatie opnieuw “armen” + focusen
  window.addEventListener('hashchange', ()=>{
    const el = document.getElementById(FIELD_ID);
    if (el) el.dataset.mrbGoldLastSubmit = '';
    focusBurst(2000);
  });

  // Eerste opportunistische check + focus
  (function initial(){
    focusBurst(2000);
    const el = document.getElementById(FIELD_ID);
    if (el && (el.value||'').trim().length === 3) trySubmit(el);
  })();

  // Als Jail de input vervangt via AJAX: guard leegmaken + focus burst
  const mo = new MutationObserver(muts=>{
    if (!onJail()) return;
    for (const m of muts){
      if (!m.addedNodes?.length) continue;
      for (const node of m.addedNodes){
        if (node.nodeType !== 1) continue;

        if (node.id === FIELD_ID) {
          node.dataset.mrbGoldLastSubmit = '';
          focusBurst(1500);
        }

        const el = node.querySelector?.('#' + FIELD_ID);
        if (el) {
          el.dataset.mrbGoldLastSubmit = '';
          focusBurst(1500);
        }
      }
    }
  });
  const jailRoot = document.querySelector('#game_container');
  if (jailRoot) mo.observe(jailRoot, {childList:true, subtree:true});
})();

// === GroupCrimes + OrgCrime auto-gedrag (altijd actief) ===
(function () {

    function hrefLower() {
        return window.location.href.toLowerCase();
    }

    // /?module=GroupCrimes (ongeacht index.php of niet, hoofd-/centerframe etc.)
    function isOnGroupCrimes() {
        return hrefLower().indexOf('module=groupcrimes') !== -1;
    }

    function isOrgCrimeUrl() {
        return hrefLower().indexOf('orgcrime2.php') !== -1;
    }

    function ocCoreOwnsFlow() {
        // Lees ook rechtstreeks de opgeslagen OC-toggle. Daardoor werkt de blokkade
        // al voordat de nieuwe OC-core volledig aan unsafeWindow is gekoppeld.
        try {
            if (GM_Get('oc_scriptAan', false)) return true;
            return !!unsafeWindow.mrbOC2Control?.isEnabled?.() && !!unsafeWindow.mrbOC2Control?.isPlannerManaged?.();
        } catch (e) {
            try { return !!GM_Get('oc_scriptAan', false); } catch (_) { return false; }
        }
    }

    function spotCoreOwnsFlow() {
        try {
            if (GM_Get('mrb_spot_raid_on_v2', false)) return true;
            return !!unsafeWindow.mrbSpotOvervalV3?.getState?.().enabled;
        } catch (e) {
            try { return !!GM_Get('mrb_spot_raid_on_v2', false); } catch (_) { return false; }
        }
    }

    // /orgcrime2.php zonder takepart=yes
    function isOrgCrimeMain() {
        const h = hrefLower();
        return isOrgCrimeUrl() && h.indexOf('takepart=yes') === -1;
    }

    function firstLinkMatching(predicate) {
        const links = document.querySelectorAll('a[href]');
        for (let i = 0; i < links.length; i++) {
            if (predicate(links[i])) return links[i];
        }
        return null;
    }

    function hrefHas(a, needle) {
        const href = (a.getAttribute('href') || '').toLowerCase();
        return href.indexOf(needle.toLowerCase()) !== -1;
    }

    function hasText(a, re) {
        const txt = (a.textContent || '').trim();
        return re.test(txt);
    }

    function safeClick(link, flagName) {
        if (!link) return;
        flagName = flagName || 'gcClicked';
        if (link.dataset[flagName] === '1') return;
        link.dataset[flagName] = '1';
        link.click();
    }

    // ------ module=GroupCrimes: Accept/Lead logica ------
    function handleGroupCrimesList() {
        if (!isOnGroupCrimes()) return;

        // Nieuwe OC- en Spot-controllers beheren deze pagina exclusief.
        if (ocCoreOwnsFlow() || spotCoreOwnsFlow()) return;

        let link;

        // 2. OC: legacy auto-accept alleen als OC 2.0 de flow niet beheert
        if (!ocCoreOwnsFlow()) link = firstLinkMatching(function (a) {
            return hrefHas(a, 'orgcrime2.php') &&
                   hasText(a, /(Accept|Accepteer)/i);
        });
        if (!ocCoreOwnsFlow() && link) {
            safeClick(link, 'gcOcAccept');
            return;
        }

        // 4. Focus op: Lead an OC / Leid een OC
        link = firstLinkMatching(function (a) {
            return hrefHas(a, 'orgcrime2.php') &&
                   hasText(a, /(Lead an OC|Leid een OC)/i);
        });
        if (link) {
            link.focus();
            return;
        }
    }

    // ------ /orgcrime2.php: auto-klik Yes/Ja naar ?takepart=yes ------
    function handleOrgCrimeAutoYes() {
        if (ocCoreOwnsFlow() || spotCoreOwnsFlow()) return;
        if (!isOrgCrimeMain()) return;

        const yesLink = firstLinkMatching(function (a) {
            return hrefHas(a, 'orgcrime2.php?takepart=yes') &&
                   hasText(a, /(Yes|Ja)/i);
        });

        if (yesLink) {
            safeClick(yesLink, 'ocTakepartYes');
        }
    }

    // ------ OC Participants autoform (100 bullets, guns=2, exploz checked) ------
    function handleOcParticipantsAutoForm() {
        if (ocCoreOwnsFlow() || spotCoreOwnsFlow()) return;
        // Zo werkt het zowel op module=GroupCrimes (form-frame)
        // als op orgcrime2.php?takepart=yes
        const bullets = document.querySelector('input[name="bulletz"]');
        const guns    = document.querySelector('select[name="guns"]');
        const exploz  = document.querySelector('input[type="radio"][name="exploz"]');
        const submit  = document.querySelector('input[type="submit"], button[type="submit"]');

        // Als geen enkel veld bestaat, gewoon niets doen
        if (!bullets && !guns && !exploz && !submit) return;

        // Flag per formulier-element, zodat nieuwe formulieren weer gevuld worden
        const flagElem = bullets || guns || exploz || submit;
        if (flagElem && flagElem.dataset.ocAutoFilled === '1') {
            return;
        }

        // WE bullets
        if (bullets) bullets.value = '100';
        if (guns) {
            if (guns.querySelector('option[value="2"]')) {
                guns.value = '2';
            }
        }
        // EE
        if (exploz) exploz.checked = true;

        // ALL
        if (submit && typeof submit.focus === 'function') {
            submit.focus();
        }

        if (flagElem) {
            flagElem.dataset.ocAutoFilled = '1';
        }
    }

    // ------ Centrale dispatcher ------
    function handlePages() {
        handleGroupCrimesList();
        handleOrgCrimeAutoYes();
        handleOcParticipantsAutoForm();
    }

    // Meteen één keer draaien
    handlePages();

    // CPU fix: alleen de spelcontainer observeren en wijzigingen bundelen.
    const target = document.querySelector('#game_container');
    if (target) {
        let prefillTimer = 0;
        new MutationObserver(() => {
            const href = String(location.href || '');
            if (!/module=(GroupCrimes|OrgCrime)/i.test(href)) return;
            clearTimeout(prefillTimer);
            prefillTimer = setTimeout(handlePages, 500);
        }).observe(target, { childList:true, subtree:true });
    }

})();


})();


// VERWIJDERD IN v11.12.1 DND BUY FIX: losse Cars hoogste-percentage autoklikker
// Centrale planner/core blijft de enige uitvoerder.
// =====================================================================

// MRB MODERN UI PATCH
// Alleen styling: geen wijzigingen aan functies, knoppen of opslag.
// =====================================================================
(function MRBModernUIPatch(){
  try {
    GM_addStyle(`
      #mrbGoldMenu{
        width:270px !important;
        max-height:88vh !important;
        background:
          radial-gradient(circle at top left, rgba(255,214,102,.16), transparent 38%),
          linear-gradient(180deg, rgba(19,20,24,.96), rgba(7,8,11,.96)) !important;
        color:#f5f1df !important;
        font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif !important;
        font-size:13px !important;
        border:1px solid rgba(255,214,102,.38) !important;
        border-radius:18px !important;
        box-shadow:
          0 20px 55px rgba(0,0,0,.58),
          0 0 0 1px rgba(255,255,255,.045) inset,
          0 0 28px rgba(255,196,54,.10) !important;
        backdrop-filter: blur(12px);
        scrollbar-color: rgba(255,214,102,.55) rgba(255,255,255,.05) !important;
      }

      #mrbGoldMenu .gm-header{
        padding:9px 10px !important;
        gap:8px !important;
        background:
          linear-gradient(180deg, rgba(255,214,102,.16), rgba(255,214,102,.045)) !important;
        border-bottom:1px solid rgba(255,214,102,.25) !important;
        border-top-left-radius:18px !important;
        border-top-right-radius:18px !important;
      }

      #mrbGoldMenu .gm-drag-handle{
        background:rgba(255,255,255,.07) !important;
        border:1px solid rgba(255,214,102,.30) !important;
        color:#ffd86a !important;
        border-radius:10px !important;
        padding:2px 7px !important;
      }

      #mrbGoldMenu .gm-title{
        color:#ffe08a !important;
        font-size:14px !important;
        letter-spacing:.35px !important;
        text-shadow:0 0 14px rgba(255,214,102,.35) !important;
      }

      #mrbGoldMenu .gm-actions .gm-icon,
      #mrbGoldMenu .gm-block-tools .gm-min{
        background:rgba(255,255,255,.07) !important;
        border:1px solid rgba(255,214,102,.26) !important;
        color:#ffe5a1 !important;
        border-radius:10px !important;
        transition:transform .12s ease, background .12s ease, border-color .12s ease !important;
      }

      #mrbGoldMenu .gm-actions .gm-icon:hover,
      #mrbGoldMenu .gm-block-tools .gm-min:hover{
        background:rgba(255,214,102,.14) !important;
        border-color:rgba(255,214,102,.50) !important;
        transform:translateY(-1px);
      }

      #mrbGoldMenu .gm-blocks{
        padding:8px !important;
        gap:8px !important;
      }

      #mrbGoldMenu .gm-block{
        background:
          linear-gradient(180deg, rgba(255,255,255,.065), rgba(255,255,255,.028)) !important;
        border:1px solid rgba(255,255,255,.095) !important;
        border-radius:15px !important;
        box-shadow:
          0 8px 22px rgba(0,0,0,.28),
          0 0 0 1px rgba(255,214,102,.035) inset !important;
      }

      #mrbGoldMenu .gm-block-header{
        padding:7px 8px !important;
        background:
          linear-gradient(180deg, rgba(255,214,102,.12), rgba(255,214,102,.035)) !important;
        border-bottom:1px solid rgba(255,214,102,.12) !important;
      }

      #mrbGoldMenu .gm-block-title{
        color:#ffe08a !important;
        font-weight:800 !important;
        letter-spacing:.2px !important;
        text-shadow:none !important;
      }

      #mrbGoldMenu .gm-block-body{
        padding:8px !important;
        color:#f4edd2 !important;
      }

      #mrbGoldMenu .gm-row{
        gap:7px !important;
      }

      #mrbGoldMenu .gm-btn,
      #mrbGoldMenu .gm-btn-mini{
        background:linear-gradient(180deg, #ffd86a, #b98719) !important;
        color:#15120a !important;
        border:1px solid rgba(255,236,169,.62) !important;
        border-radius:10px !important;
        font-weight:800 !important;
        box-shadow:
          0 1px 0 rgba(255,255,255,.32) inset,
          0 6px 14px rgba(0,0,0,.28) !important;
        transition:transform .12s ease, filter .12s ease, box-shadow .12s ease !important;
      }

      #mrbGoldMenu .gm-btn{
        padding:5px 10px !important;
      }

      #mrbGoldMenu .gm-btn-mini{
        padding:2px 8px !important;
      }

      #mrbGoldMenu .gm-btn:hover,
      #mrbGoldMenu .gm-btn-mini:hover{
        filter:brightness(1.08) !important;
        transform:translateY(-1px);
        box-shadow:
          0 1px 0 rgba(255,255,255,.38) inset,
          0 8px 18px rgba(0,0,0,.32) !important;
      }

      #mrbGoldMenu input,
      #mrbGoldMenu select,
      #mrbGoldMenu textarea{
        background:rgba(255,255,255,.075) !important;
        color:#fff4c8 !important;
        border:1px solid rgba(255,214,102,.24) !important;
        border-radius:10px !important;
        padding:4px 6px !important;
        box-shadow:0 0 0 1px rgba(0,0,0,.08) inset !important;
      }

      #mrbGoldMenu input[type="checkbox"],
      #mrbGoldMenu input[type="radio"]{
        accent-color:#d4af37;
        box-shadow:none !important;
      }

      #mrbGoldMenu input:focus,
      #mrbGoldMenu select:focus,
      #mrbGoldMenu textarea:focus{
        border-color:#ffd86a !important;
        box-shadow:
          0 0 0 2px rgba(255,214,102,.18),
          0 0 16px rgba(255,214,102,.10) !important;
      }

      #mrbGoldMenu label{
        color:#f4edd2 !important;
      }

      #mrbGoldMenu .gm-status,
      #mrbGoldMenu .gm-pill{
        border-radius:999px !important;
      }

      #mrbGoldMenu .gm-pill{
        background:rgba(0,0,0,.30) !important;
        border:1px solid rgba(255,214,102,.22) !important;
        color:#ffe08a !important;
      }

      #mrbGoldMenu .ok{
        color:#86ff9b !important;
        text-shadow:0 0 12px rgba(76,255,120,.22) !important;
      }

      #mrbGoldMenu .bad{
        color:#ff9c9c !important;
        text-shadow:0 0 12px rgba(255,80,80,.20) !important;
      }

      #mrbGoldMenu hr{
        border:0 !important;
        border-top:1px solid rgba(255,214,102,.16) !important;
      }
    `);
  } catch(e) {
    try { console.warn('[MRB Modern UI] styling kon niet geladen worden:', e); } catch(_) {}
  }
})();


// =====================================================================
// MRB V9 DIAGNOSE — veilige foutregistratie zonder modulelogica te wijzigen
// [SPRINT 3] V9 Diagnose volledig verwijderd.

// =====================================================================
// SPRINT 1 - PLANNERLESS TEST
// De V9 Central Planner, het planner-menu, mrbNavigate en alle planner-adapters
// zijn vanaf dit punt fysiek verwijderd. Modules vallen terug op hun eigen
// bestaande lokale loop of blijven bewust stil voor de functionele inventarisatie.
// =====================================================================




// =====================================================================
// SPRINT 5.8.0 - HEIST REPEATING SESSION MANAGER
// Zelfstandige sessielaag. Heist-core blijft inhoudelijk ongemoeid.
// Werkt voor Leider en Driver en herhaalt tot handmatig uitgeschakeld.
// Alleen toegestaan wanneer uitsluitend Heist actief is.
// =====================================================================
(function MRBHeistRepeatingSessionManager(){
  'use strict';

  const K_ON='mrb_session_heist_cycle_on_v1';
  const K_USER='mrb_session_heist_username_v1';
  const K_PASS='mrb_session_heist_password_v1';
  const K_LOGIN_AT='mrb_session_heist_login_at_v1';
  const K_STATE='mrb_session_heist_state_v1';
  const K_LAST_LOGIN='mrb_session_heist_last_login_try_v1';
  const K_LAST_LOGOUT='mrb_session_heist_last_logout_try_v1';
  const K_LEAD_MIN='mrb_session_heist_lead_minutes_v1';
  const HEIST_ON='mrb_heist_integrated_enabled';
  const MIN_LOGOUT_REMAINING=15*60*1000;
  const CHECK_MS=5000;

  const get=(k,d)=>{try{return GM_getValue(k,d);}catch(_){return d;}};
  const set=(k,v)=>{try{GM_setValue(k,v);}catch(_){}};
  const norm=v=>String(v||'').replace(/\s+/g,' ').trim();
  const on=()=>get(K_ON,false)===true;
  const state=(v)=>{
    if(v!==undefined){
      const next=String(v),previous=String(get(K_STATE,'Uit')||'Uit');
      set(K_STATE,next);
      try{unsafeWindow.mrbHeistSessionStatus=next;}catch(_){}
      if(next!==previous)try{console.info(`[MRB Heist Sessie Manager] ${next}`);}catch(_){}
    }
    return String(get(K_STATE,'Uit')||'Uit');
  };
  const loggedOut=()=>{
    const visible=el=>!!el && !el.closest('#geneoSuperMenu,#mrbGoldMenu') &&
      (el.offsetWidth||el.offsetHeight||el.getClientRects().length) &&
      getComputedStyle(el).visibility!=='hidden' && getComputedStyle(el).display!=='none';
    if([...document.querySelectorAll('input[type="password"],form[action*="login" i],#loginModal,a[data-bs-target="#loginModal"]')].some(visible)) return true;
    return /\b(?:login|inloggen|sign in)\b/i.test(norm(document.body?.innerText||'')) && !/Volgende\s+heist|Next\s+heist/i.test(norm(document.body?.innerText||''));
  };
  const gateVisible=()=>{
    const t=norm(document.body?.innerText||'');
    return /Verifying you are human|Verify you are human|Verifieer dat u een mens bent|security of your connection|Dit kan enkele seconden duren|This may take a few seconds/i.test(t)
      || !!document.querySelector('form[action*="cdn-cgi"],script[src*="cdn-cgi/challenge-platform"],#cf-challenge-running,.cf-browser-verification,#recaptcha-popup,.g-recaptcha');
  };
  const onInfo=()=>/information\.php/i.test(location.href);

  function parseTimer(raw){
    const s=norm(raw);
    if(/^(Nu|Now|Ready)$/i.test(s)) return 0;
    let total=0,m;
    const re=/(\d+)\s*(D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)/gi;
    while((m=re.exec(s))){const n=+m[1],u=m[2].toLowerCase();if(u.startsWith('d'))total+=n*864e5;else if(u.startsWith('h')||u.startsWith('u'))total+=n*36e5;else if(u.startsWith('m'))total+=n*6e4;else total+=n*1e3;}
    return total;
  }
  function readHeistTimer(){
    for(const row of document.querySelectorAll('tr')){
      const cells=[...row.querySelectorAll(':scope > th,:scope > td')];
      for(let i=0;i<cells.length;i++){
        if(!/^(Volgende\s+heist|Next\s+heist)$/i.test(norm(cells[i].textContent).replace(/[:?]+$/,''))) continue;
        return norm((cells[i+1]||cells[cells.length-1])?.textContent||'');
      }
    }
    const m=norm(document.body?.innerText||'').match(/(?:Volgende\s+heist|Next\s+heist)\s*[:?\-]?\s*(Nu|Now|Ready|(?:(?:\d+)\s*(?:D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)\s*)+)/i);
    return norm(m?.[1]||'');
  }

  const OTHER_KEYS=[
    'race_scriptAan','oc_scriptAan','mrb_dnd_trade_on','cdBoozenScriptAan','cc_running','bullets_running',
    'mrb_travel_roundtrip_on_v1','slots_auto_on','fl_running','sniper_running','enteren_on','shop_running',
    'mrb_lackey_timer_on','mrb_spot_raid_on_v2','mrb_spot_com_enabled_v570','mrb_bg_trainer_on_v1',
    'mrb_captcha_alert_enabled'
  ];
  function otherModuleActive(){
    for(const k of OTHER_KEYS){if(get(k,false)===true)return k;}
    const blocks=[...document.querySelectorAll('#mrbGoldMenu .gm-block.gm-block-active,#geneoSuperMenu .gm-block.gm-block-active')];
    for(const b of blocks){const title=norm(b.querySelector('.gm-block-title')?.textContent||'');if(title&&!/^(Heist|Heist Sessie Manager|Heist Session Manager|Sessie Manager|Session Manager)$/i.test(title))return title;}
    return '';
  }
  function load(path){
    try{unsafeWindow?.omerta?.GUI?.container?.loadPage(path);}catch(_){location.href=path;}
  }
  function findLogout(){
    return document.querySelector('a[href*="logout" i],button[name*="logout" i],input[value*="Logout" i],input[value*="Uitloggen" i]')
      || [...document.querySelectorAll('a,button,input[type="button"],input[type="submit"]')].find(el=>/^(?:log\s*out|logout|uitloggen)$/i.test(norm(el.textContent||el.value||'')));
  }
  function doLogout(){
    const last=Number(get(K_LAST_LOGOUT,0)||0);if(Date.now()-last<30000)return;
    set(K_LAST_LOGOUT,Date.now());
    const el=findLogout();
    state('Uitloggen tot volgende Heist');
    if(el){el.click();return;}
    location.href='/logout.php';
  }
  function inputSet(el,value){
    if(!el)return false;
    try{const d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');if(d?.set)d.set.call(el,value);else el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return true;}catch(_){return false;}
  }
  function doLogin(){
    if(gateVisible()){state('Gepauzeerd: captcha/Cloudflare');return;}
    const user=norm(get(K_USER,'')),pass=String(get(K_PASS,'')||'');
    if(!user||!pass){state('Login ontbreekt: vul gebruikersnaam en wachtwoord in');return;}
    const last=Number(get(K_LAST_LOGIN,0)||0);if(Date.now()-last<60000){state('Wachten na loginpoging');return;}
    const visible=el=>!!el&&!el.closest('#geneoSuperMenu,#mrbGoldMenu')&&
      (el.offsetWidth||el.offsetHeight||el.getClientRects().length)&&
      getComputedStyle(el).visibility!=='hidden'&&getComputedStyle(el).display!=='none';
    const p=[...document.querySelectorAll('input[type="password"]')].find(visible);
    const form=p?.closest('form')||null;
    const u=[...(form||document).querySelectorAll('input[name="username" i],input[name="user" i],input[name="login" i],input[type="email"],input[type="text"]')].find(visible);
    if(!u||!p){
      const open=[...document.querySelectorAll('a[data-bs-target="#loginModal"],button[data-bs-target="#loginModal"],a,button')]
        .find(el=>visible(el)&&(/#loginModal/i.test(el.getAttribute('data-bs-target')||'')||/^(?:login|inloggen|sign in)$/i.test(norm(el.textContent||el.value||''))));
      if(open){state('Loginvenster openen');open.click();return;}
      state('Loginformulier nog niet zichtbaar');return;
    }
    inputSet(u,user);inputSet(p,pass);
    const loginForm=form||u.closest('form');
    const btn=[...(loginForm||document).querySelectorAll('button[type="submit"],input[type="submit"]')].find(visible)
      ||[...document.querySelectorAll('button,input[type="submit"]')].find(x=>visible(x)&&/login|inloggen|sign in/i.test(norm(x.textContent||x.value||'')));
    set(K_LAST_LOGIN,Date.now());state('Automatisch inloggen');
    if(btn)btn.click();else if(loginForm?.requestSubmit)loginForm.requestSubmit();else loginForm?.submit?.();
  }

  function tickLoggedIn(){
    if(get(HEIST_ON,false)!==true){state('Geblokkeerd: Heist staat niet actief');return;}
    const other=otherModuleActive();
    if(other){state(`Geblokkeerd: andere module actief (${other})`);return;}
    if(!onInfo()){state('Mijn Account openen voor Heisttimer');load('/information.php');return;}
    const raw=readHeistTimer();
    if(!raw){state('Heisttimer niet gevonden');return;}
    const wait=parseTimer(raw);
    if(wait<=0){set(K_LOGIN_AT,0);state('Heist is Nu · ingelogd blijven');return;}
    if(wait<=MIN_LOGOUT_REMAINING){state(`Heist binnen ${raw} · ingelogd blijven`);return;}
    const lead=Math.max(2,Math.min(10,Number(get(K_LEAD_MIN,4)||4)))*60000;
    const loginAt=Date.now()+Math.max(60000,wait-lead);
    set(K_LOGIN_AT,loginAt);
    state(`Cooldown ${raw} · login gepland ${new Date(loginAt).toLocaleTimeString('nl-NL')}`);
    doLogout();
  }
  function tickLoggedOut(){
    if(gateVisible()){state('Gepauzeerd: captcha/Cloudflare');return;}
    const at=Number(get(K_LOGIN_AT,0)||0);
    if(!at){state('Uitgelogd zonder geplande login');return;}
    if(Date.now()<at){state(`Uitgelogd · login om ${new Date(at).toLocaleTimeString('nl-NL')}`);return;}
    doLogin();
  }
  function tick(){
    render();
    if(!on())return;
    if(unsafeWindow.mrbManualControl?.isPaused?.()){
      const seconds=Math.max(1,Math.ceil((unsafeWindow.mrbManualControl.remaining?.()||0)/1000));
      state(`Handmatige pauze · hervat over ${seconds}s`);render();return;
    }
    if(loggedOut())tickLoggedOut();else tickLoggedIn();
    render();
  }

  let block=null;
  function render(){
    if(!block||!document.documentElement.contains(block)){mount();return;}
    const enabled=on();
    block.querySelector('[data-session-toggle]').textContent=enabled?'Stop':'Start';
    block.querySelector('[data-session-state]').textContent=enabled?'Actief':'Uit';
    block.querySelector('[data-session-status]').textContent=enabled?state():'Gestopt';
    block.classList.toggle('gm-block-active',enabled);
    try{gmUpdateStatusBadge(block);}catch(_){}
  }
  function mount(){
    const root=document.querySelector('#mrbGoldMenu .gm-blocks,#geneoSuperMenu .gm-blocks');
    if(!root)return;
    document.getElementById('mrb-heist-session-manager-block')?.remove();
    block=document.createElement('div');block.className='gm-block';block.id='mrb-heist-session-manager-block';block.dataset.id='02b-heist-session-manager';
    block.innerHTML=`<div class="gm-block-header"><div class="gm-block-title">Heist Sessie Manager</div><div class="gm-block-tools"><button class="gm-min">↧</button></div></div><div class="gm-block-body"><div style="display:flex;gap:8px;align-items:center"><button data-session-toggle class="gm-start">Start</button><b data-session-state>Uit</b></div><div data-session-status style="font-size:11px;margin-top:5px;color:#d8c98f">Gestopt</div><label style="display:block;margin-top:7px">Gebruikersnaam<br><input data-session-user type="text" autocomplete="username" style="width:95%"></label><label style="display:block;margin-top:5px">Wachtwoord<br><input data-session-pass type="password" autocomplete="current-password" style="width:95%"></label><label style="display:block;margin-top:5px">Inloggen vóór Heist Nu<br><select data-session-lead><option value="2">2 minuten</option><option value="3">3 minuten</option><option value="4">4 minuten</option><option value="5">5 minuten</option><option value="7">7 minuten</option><option value="10">10 minuten</option></select></label><button data-session-save class="gm-btn" style="margin-top:7px">Opslaan</button><div style="font-size:10px;opacity:.75;margin-top:6px">Werkt wanneer Heist en de Heist Sessie Manager actief zijn en alle overige modules uit staan. Blijft herhalen tot handmatig gestopt. Stopt bij captcha/Cloudflare.</div></div>`;
    root.appendChild(block);
    block.querySelector('[data-session-user]').value=String(get(K_USER,'')||'');
    block.querySelector('[data-session-pass]').value=String(get(K_PASS,'')||'');
    block.querySelector('[data-session-lead]').value=String(get(K_LEAD_MIN,4)||4);
    block.querySelector('.gm-min').onclick=()=>block.classList.toggle('gm-collapsed');
    block.querySelector('[data-session-save]').onclick=()=>{set(K_USER,norm(block.querySelector('[data-session-user]').value));set(K_PASS,String(block.querySelector('[data-session-pass]').value||''));set(K_LEAD_MIN,Number(block.querySelector('[data-session-lead]').value||4));state('Instellingen opgeslagen');render();};
    block.querySelector('[data-session-toggle]').onclick=()=>{const n=!on();set(K_ON,n);if(!n){set(K_LOGIN_AT,0);state('Handmatig gestopt');}else state('Gestart · veiligheid controleren');render();setTimeout(tick,100);};
    render();
    try{window.__mrbAddManualOrderButtons?.(block);window.__mrbRefreshCategories?.();}catch(_){}
  }

  setInterval(tick,CHECK_MS);
  setTimeout(tick,1000);
})();

// =====================================================================
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
  let acceptChecks=0;
  let travelTarget='';
  let lastPageLoad=0;
  const MAX_ACCEPT_CHECKS=30;

  function clearLoop(){ if(loopTimer){clearTimeout(loopTimer);loopTimer=null;} }
  function next(fn,ms){
    clearLoop();
    loopTimer=setTimeout(()=>{
      if(!enabled()) return;
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
  function onInfo(){return /information\.php/i.test(location.href);}
  function onGroup(){return /module=GroupCrimes/i.test(location.href)||!!document.querySelector('#module_GroupCrimes,.moduleGroupCrimes');}
  function onHeist(){return /module=Heist/i.test(location.href)||!!document.querySelector('#module_Heist,.moduleHeist');}
  function onTravel(){return /module=Travel/i.test(location.href)||!!document.querySelector('#module_Travel,.moduleTravel');}
  function visible(el){return !!(el&&!el.disabled&&(el.offsetParent!==null||el.getClientRects?.().length));}

  function parseTimer(raw){
    const s=norm(raw);
    if(/^(Nu|Now|Ready)$/i.test(s)) return 0;
    let total=0;
    const re=/(\d+)\s*(D|H|M|S|dag(?:en)?|uur|uren|min(?:uten)?|sec(?:onden)?)/gi;
    let m; while((m=re.exec(s))){const n=+m[1],u=m[2].toLowerCase();if(u.startsWith('d'))total+=n*864e5;else if(u.startsWith('h')||u.startsWith('u'))total+=n*36e5;else if(u.startsWith('m'))total+=n*6e4;else total+=n*1e3;}
    return total;
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
  function citySettings(){const raw=get(K_CITIES,{});const out={};for(const c of CITIES)out[c]=!(raw&&raw[c]===false);return out;}
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
  function leaderStart(){
    if(heistCrimesCarsOwnPriority()){status('Heist wacht: Crimes/Cars heeft voorrang');next(leaderStart,5000);return;}
    phase='inviting';acceptChecks=0;load('/?module=GroupCrimes');next(()=>inspectLeaderGroup(true),rand(1500,3000));
  }
  function inspectLeaderGroup(initial=false){
    if(!enabled()||role()!=='leader')return;
    if(!onGroup()){load('/?module=GroupCrimes');next(()=>inspectLeaderGroup(initial),rand(1200,2200));return;}
    const transfer=transferLink();
    if(transfer){setInvitePending(false);status(`Heist winst versturen naar ${driverName()}`);transfer.click();next(goInfo,rand(5000,10000));return;}
    const start=finalStart();
    if(start){setInvitePending(false);status('Driver gereed · Heist starten');start.click();phase='started';next(()=>inspectLeaderGroup(false),rand(5000,8000));return;}
    if(/Wanna kick him out for his lazy behaviour|wachten op.*(?:driver|bestuurder)|driver.*(?:accepted|geaccepteerd)|verwijder(?:en|d)?\s+als\s+bestuurder|remove.*driver|huidige\s+bestuurder/i.test(text())){phase='waiting';scheduleLeaderCheck();return;}
    const lead=groupLeadLink();
    if(lead){status('Leid een heist openen');lead.click();next(leaderActionPage,rand(1500,3000));return;}
    const av=availableCities(),cur=currentCity();
    if(av.length&&cur!=='Onbekend'&&!av.includes(cur)){travelTarget=av[0];status(`Huidige stad ongeschikt · reizen naar ${travelTarget}`);load('/?module=Travel');next(travelFlow,rand(900,1600));return;}
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
    if(btn&&driver&&bullets&&gun){status(`Heist uitnodiging versturen aan ${driverName()}`);setInvitePending(true);btn.click();phase='waiting';acceptChecks=0;next(()=>{load('/?module=GroupCrimes');next(()=>inspectLeaderGroup(false),rand(1200,2200));},rand(35000,40000));return;}
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
    next(()=>{load('/?module=GroupCrimes');next(()=>inspectLeaderGroup(false),rand(1200,2200));},delay);
  }

  function driverStart(){
    if(heistCrimesCarsOwnPriority()){status('Heist Driver wacht: Crimes/Cars heeft voorrang');next(driverStart,5000);return;}
    phase='driver';load('/?module=GroupCrimes');next(driverAcceptLoop,rand(1500,3000));
  }
  function driverAcceptLoop(){
    if(!enabled()||role()!=='driver')return;
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
    status('Driver wacht op Heist-uitnodiging');next(()=>{load('/?module=GroupCrimes');next(driverAcceptLoop,rand(1500,3000));},rand(15000,30000));
  }
  function driverFinalize(){
    if(!enabled()||role()!=='driver')return;
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
    if(!onTravel()){load('/?module=Travel');next(travelFlow,1000);return;}
    if(currentCity()===travelTarget){status(`Aangekomen in ${travelTarget}`);if(role()==='leader')leaderStart();else driverStart();return;}
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
    block.querySelector('[data-heist-toggle]').onclick=()=>{const on=!enabled();set(K_ON,on);clearLoop();phase='idle';acceptChecks=0;if(!on)setInvitePending(false);status(on?'Heist gestart':'Gestopt');render();if(on)next(goInfo,300);};
    block.querySelectorAll('input[name="mrb-heist-role"]').forEach(x=>x.onchange=()=>{if(x.checked){set(K_ROLE,x.value);clearLoop();phase='idle';status(`Rol: ${x.value==='leader'?'Leider':'Driver'}`);render();if(enabled())next(goInfo,300);}});
    block.querySelectorAll('input[data-heist-city]').forEach(x=>x.onchange=()=>{const s=citySettings();s[x.dataset.heistCity]=x.checked;set(K_CITIES,s);render();});
    render();setInterval(render,1000);
    try{window.__mrbAddManualOrderButtons?.(block);window.__mrbRefreshCategories?.();setTimeout(()=>window.__mrbRefreshCategories?.(),250);}catch(_){}
  }

  syncMenu();
  if(enabled()) next(goInfo,600);
})();
