// v11.11.19: Race-driver autokeuze houdt actielock vast, kiest optie 1 en bevestigt via jQuery plus native form-fallback.
// v11.11.18: Race Driver herkent ook de Nederlandse autokeuzepagina, accepteert Willekeurige auto en klikt Ga robuust met formulierfallback.
// v11.8.0: Heist 2.0 — één plannerautoriteit, dubbele lokale navigatielussen uitgeschakeld onder plannerbeheer en centrale state-registratie.
// v11.10.1: OC rolverdeling hersteld: Driver kiest auto, Explosievenexpert kiest C4, Wapenexpert vult 100 kogels en 2 Tommy Guns in.
// v11.10.3: OC wordt bij actieve start direct wakker gemaakt; alle oude Heist GroupCrimes-routes blokkeren op de OC-toggle.
// v11.10.6: OC krijgt een directe, conflictveilige fallback-runner wanneer de centrale planner de actieve CHECK_TIMER niet uitvoert.
// v11.10.2: OC opent eerst GroupCrimes, kiest daar de OC-link en blokkeert legacy Heist-doorklikken zolang OC 2.0 actief is.
// v11.10.0: OC 2.0 gebruikt een centrale planner-state-machine; oude OC-autoklikkers worden uitgeschakeld zodra OC actief is.
// v11.9.0: Race 2.0 publiceert centrale fasen, gebruikt planner-owned wake-ups en blokkeert dubbele lokale raceflows.
// v11.10.5: D&D mag nieuwe reizen uitsluitend starten in minuutvensters .01-.27 en .31-.57; transacties in de huidige stad mogen altijd afronden.
// v11.10.4: D&D volgt prijswissels op .00/.30 en bewaart per klokuur een harde koopverplichting tot een aankoop echt is bevestigd.
// v11.11.6: Spot Overval gaat pas naar WAIT_DRIVER nadat de uitnodiging aantoonbaar is verzonden; debugstappen toegevoegd.
// v11.11.15: Driver-flow accepteert Spot Overval-uitnodigingen, kiest een beschikbare auto en bevestigt Kies auto.
// v11.11.14: Go-resultaat wordt maximaal 15 seconden serverzijdig bevestigd; zonder bewijs keert de Leider veilig terug naar het formulier.
// v11.11.11: Spot Overval activeert de Go-knop robuust via de Local Mob-rij, inclusief image-submit en form.requestSubmit fallback.
// v11.11.13: Spot Overval houdt tijdens de Leider-flow de centrale actielock vast, schakelt dubbele fallback-navigatie uit en vindt de Go-knop robuuster in de Local Mob-rij.
// v11.11.12: Spot Overval wist een oude WAIT_DRIVER-status eenmalig na installatie en herkent de account-timer niet meer als Spot Overval-pagina.
// v11.11.10: Spot Overval zoekt de Go-knop in de gekozen Local Mob-tabelrij in plaats van als algemene uitnodigingsknop.
// v11.11.9: Spot Overval vindt het Driver-veld via label/rij-context en wist een verouderde WAIT_DRIVER-status zodra het uitnodigingsformulier zichtbaar is.
// v11.11.8: D&D verwerkt Rum en Cocaine afzonderlijk; bij een deelmislukking wordt alleen het ontbrekende product opnieuw gekocht of verkocht.
// v11.11.7: D&D rondt na aankomst eerst de openstaande koop/verkoop af; de nieuwe vluchttimer blokkeert alleen een volgende reis.
// v11.11.5: Spot Overval herkent de sectie Overval een zaak en klikt de generieke link binnen dat blok.
// v11.11.4: Legacy GroupCrimes-handler mag Heist alleen openen als Heist actief is en nooit tijdens actieve Spot Overval.
// v11.11.3: Oude Spot Overval-code verwijderd; volledig nieuwe vroege zelfstandige core met Leider/Driver state-machine.
// v11.11.2: Spot Overval-menu wordt direct na de centrale addBlock-functie opgebouwd, zodat fouten in latere modules de knop niet meer kunnen verbergen.
// v11.11.1: Spot Overval zichtbaar geïntegreerd; OC-adapter kan latere module-opbouw niet meer afbreken; self-test controleert Spot Overval.
// v11.7.3: Een openstaande BUY/SELL-route krijgt een apart hervatmoment; tijdens de vluchttimer wordt Travel niet opnieuw geopend.
// v11.7.1: D&D mag Travel alleen openen na een recente expliciete Volgende vlucht = Nu-sync; een verlopen next_ts geeft nooit zelfstandig vrijgave.
// v11.6.8: De zichtbare cooldown op de Travel-pagina is een harde blokkade; na kopen en verkopen wacht D&D altijd op de vluchttimer.
// v11.6.7: Na kopen blijft de geplande wachttijd actief; D&D navigeert niet opnieuw naar Travel tijdens de nieuwe vluchtcooldown.
// v11.6.6: D&D gebruikt de echte formuliergroepen typebooze/typedrugs met buybooze/buydrugs of sellbooze/selldrugs.
// v11.6.5: D&D selecteert Koop/Verkoop afzonderlijk in de Rum- en Cocaïnerij en verstuurt het formulier exact één keer.
// v11.6.4: D&D transactiefix — activeert ook generieke/image-submitknoppen, requestSubmit en Enter-fallback; bevestigt via voorraad of paginareactie.
// v11.6.3: D&D prijsparser en stadselectie robuust gemaakt; geen vaste kolom- of city-ID-aannames meer en reisbevestiging wordt geverifieerd.
// v11.6.2: Zichtbare Volgende vlucht-timer is direct leidend en vernieuwt ready/sync/next atomair; WAIT_TRAVEL_TIMER kan niet blijven hangen op Mijn account.
// v11.6.1: Timerparser herkent Nederlands "Nu" expliciet; zichtbare Volgende vlucht=Nu vernieuwt de D&D-sync direct.
// v11.6.0: D&D volledig fail-closed: alleen een verse expliciete Volgende vlucht=Nu sync kan Travel-navigatie autoriseren.
// v11.5.1: Refresh vervangen door Session Manager; D&D navigeert niet meer naar Travel zolang de vluchttimer loopt.
// v11.4.7: D&D respecteert de gesynchroniseerde vluchttimer en houdt tijdens travel-cooldown geen actielock vast; Cars blijft doorlopen.
// v11.4.5: D&D prijsparser leest uitsluitend de echte Smokkel Prijzen-tabel; doelstad en transactie blijven bewaard over paginawissels.
// v11.4.6: Achtergrond-timersynchronisatie na handmatige navigatie, focus en periodieke controle.
// v11.4.4: D&D directe cyclus — voorraad eerst verkopen, daarna direct opnieuw inkopen; wachttimer blokkeert voorraadcontrole niet.
// v11.4.3: D&D formulierfix — vindt Rum/Cocaine op zichtbare tabelrijen, bedient beide radiogroepen en verifieert voorraadwijziging.
// v11.4.2: D&D voorraadfix — werkelijke Rum/Cocaine-voorraad bepaalt kopen of verkopen en daarmee goedkoopste/duurste stad.
// v11.4.1: D&D transactiefix — wacht na reizen op het echte Smokkelen-formulier en hervat koop/verkoop betrouwbaar.
// v11.4.0: Boozen/Travel Core — centrale actielease, state monitoring en geserialiseerde reis/smokkeltransacties.

// =====================================================================
// MRB GOLD EDITION v11.1.0 - CRIMES/CARS CENTRALE ACTIECONTROLE
// - Crimes en Cars houden één centrale actielease vast tijdens navigatie,
//   wachttijd, klik, resultaatcontrole en cooldown-sync.
// - Andere planner-modules kunnen die cyclus niet meer halverwege onderbreken.
// - De lease verloopt automatisch bij een fout of vastgelopen module.
// - De bestaande Crimes, Cars en D&D-functionaliteit blijft behouden.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v11.3.0 - HEIST CORE
// - Alle userscript-setInterval-processen lopen via één centrale pulsmanager.
// - Bestaande interval-ID's en clearInterval-aanroepen blijven compatibel.
// - Centrale planner en mrbNavigate blijven exclusieve spelactie/navigatielaag.
// - Minder gelijktijdige browser-timers en minder kans op timerstormen.
// - Zware DOM-observers worden in vervolgstappen per module samengevoegd.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v10.3.0 - OPSCHONING GOKMODULES
// - Kras en Win volledig verwijderd, inclusief timers, planner en master hooks.
// - Blackjack Helper volledig verwijderd, inclusief observer en interval.
// - Menu, zelftest, registratiestatus en sneltoetsen opgeschoond.
// - Slots blijft als enige module onder Gokken aanwezig.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v10.2.1 - BODYGUARD BEDIENING
// - De knop "Nu controleren" is volledig verwijderd.
// - De directe tick(true)-route buiten de centrale planner is verwijderd.
// - Bodyguard koop- en trainingsbevestigingen worden automatisch bevestigd.
// - Bodyguard-controles lopen uitsluitend automatisch via de scheduler.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v10.1.5 - CLOUDFLARE HERSTELMODUS
// - Bij Cloudflare wordt de volledige module-opstart overgeslagen.
// - Geen menu-observers, planners of automatische kliks tijdens verificatie.
// - Na voltooiing volgt automatisch een schone herstart.
// - Vastgelopen controle krijgt maximaal eens per 2 minuten een reload.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v10.1.4 - FASE 5: DASHBOARD EN MENU
// - Categorieknoppen gebruiken één betrouwbare click-handler.
// - Statusbadges negeren hun eigen DOM-wijzigingen en veroorzaken geen feedbackloop.
// - Badge-updates worden per frame gebundeld en alleen gewijzigde blokken worden verwerkt.
// - Dashboard schrijft alleen gewijzigde waarden naar de DOM en pauzeert zware metingen
//   wanneer het dashboard uitgeschakeld of ingeklapt is.
// - Dashboard-observer reageert niet meer op iedere tekstwijziging.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v10.1.3 - FASE 4: UNIFORME MODULE-LIFECYCLE
// - Elke planner-taak krijgt automatisch één module-adapter.
// - Uniforme API: start(), stop(), tick(), getStatus() en destroy().
// - Modules worden niet opnieuw geïnitialiseerd; bestaande spelcode blijft intact.
// - Nieuwe modules kunnen voortaan rechtstreeks via registerModule() aansluiten.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v10.1.2 - FASE 3: NAVIGATIE GECENTRALISEERD
// - Eén eenvoudige mrbNavigate()-route toegevoegd aan de centrale planner.
// - Geen wachtrij, willekeurige vertraging of 30-seconden blokkade toegevoegd.
// - Bestaande modulehelpers gebruiken eerst mrbNavigate() en vallen alleen terug
//   op de normale SPA-loader wanneer de planner nog niet beschikbaar is.
// - De planner-navigatielock voorkomt dat twee modules tegelijk van pagina wisselen.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v10.1.1 - FASE 2: TIMERS EN OBSERVERS
// - Geen spelactie-timers inhoudelijk gewijzigd.
// - Dashboard observeert alleen het spelgebied en ververst maximaal elke 3 seconden.
// - Statusbadges observeren alleen het MRB-menu met een langzame fallback.
// - Planner- en registratieself-heals minder agressief gemaakt.
// - Menuherstel teruggebracht naar een rustige veiligheidscontrole.
// =====================================================================

// =====================================================================
// MRB GOLD EDITION v10.1.0 - FASE 1: OPGESCHOONDE STABIELE BASIS
// - Historische changeloglagen en lege uitgeschakelde patches verwijderd.
// - Achtergebleven koppeling naar de verwijderde globale Watchdog verwijderd.
// - Watchdog en oude Navigatie Manager blijven volledig afwezig.
// - Spelmodules, instellingen, plannerregistraties en moduleflows inhoudelijk behouden.
// =====================================================================
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


  // ---------- V11.0 CENTRALE PULSMANAGER ----------
  // Eén echte browser-interval bestuurt alle periodieke taken van dit userscript.
  // De API gedraagt zich als setInterval/clearInterval, zodat bestaande modules
  // zonder functionele herschrijving op de centrale kern kunnen blijven draaien.
  const MRB_NATIVE_SET_INTERVAL = window.setInterval.bind(window);
  const MRB_NATIVE_CLEAR_INTERVAL = window.clearInterval.bind(window);
  const MRB_PULSE_MS = 100;
  const mrbIntervalTasks = new Map();
  let mrbIntervalSequence = 1;
  let mrbPulseHandle = null;
  let mrbPulseBusy = false;

  function mrbNormalizeIntervalDelay(delay){
    const n = Number(delay);
    return Number.isFinite(n) ? Math.max(MRB_PULSE_MS, Math.floor(n)) : MRB_PULSE_MS;
  }

  function mrbSetInterval(callback, delay, ...args){
    if (typeof callback !== 'function') {
      // String callbacks worden bewust niet ondersteund; die komen in MRB niet voor.
      throw new TypeError('mrbSetInterval verwacht een functie.');
    }
    const id = mrbIntervalSequence++;
    const interval = mrbNormalizeIntervalDelay(delay);
    mrbIntervalTasks.set(id, {
      id,
      callback,
      args,
      interval,
      nextAt: Date.now() + interval,
      running: false,
      cancelled: false,
      lastError: ''
    });
    return id;
  }

  function mrbClearInterval(id){
    const numericId = Number(id);
    if (mrbIntervalTasks.has(numericId)) {
      const task = mrbIntervalTasks.get(numericId);
      if (task) task.cancelled = true;
      mrbIntervalTasks.delete(numericId);
      return;
    }
    // Compatibiliteit voor eventuele native interval-ID's van externe code.
    try { MRB_NATIVE_CLEAR_INTERVAL(id); } catch(e) {}
  }

  async function mrbRunIntervalTask(task, tickNow){
    if (!task || task.running || task.cancelled) return;
    task.running = true;
    // Plan vanaf de huidige tijd, zodat een trage callback geen inhaalstorm maakt.
    task.nextAt = tickNow + task.interval;
    try {
      await Promise.resolve(task.callback(...task.args));
      task.lastError = '';
    } catch(e) {
      task.lastError = String(e?.stack || e?.message || e || 'Onbekende intervalfout');
      try { unsafeWindow.mrbV9Diagnostics?.add?.('Interval', task.lastError, 'V11 Pulse'); } catch(_) {}
      try { console.error('[MRB V11 Pulse]', task.lastError); } catch(_) {}
    } finally {
      task.running = false;
    }
  }

  function mrbPulse(){
    if (mrbPulseBusy) return;
    mrbPulseBusy = true;
    try {
      const tickNow = Date.now();
      for (const task of mrbIntervalTasks.values()) {
        if (!task.cancelled && !task.running && task.nextAt <= tickNow) {
          void mrbRunIntervalTask(task, tickNow);
        }
      }
    } finally {
      mrbPulseBusy = false;
    }
  }

  mrbPulseHandle = MRB_NATIVE_SET_INTERVAL(mrbPulse, MRB_PULSE_MS);

  unsafeWindow.mrbV11Pulse = Object.freeze({
    version: '11.1.0',
    setInterval: mrbSetInterval,
    clearInterval: mrbClearInterval,
    list: () => [...mrbIntervalTasks.values()].map(t => ({
      id:t.id, interval:t.interval, nextAt:t.nextAt, running:t.running,
      lastError:t.lastError
    })),
    count: () => mrbIntervalTasks.size,
    pulseMs: MRB_PULSE_MS,
    nativeHandle: () => mrbPulseHandle
  });


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

  // ---------- V10.0.4.20 STABIELE VERSIE-OVERGANG ----------
  // Geen automatische reload en geen vroege return. Het volledige script wordt
  // bij iedere normale paginarefresh altijd volledig geinitialiseerd.
  // GM-instellingen blijven behouden bij overschrijven in dezelfde Tampermonkey-entry.

  // ---------- V10.0.4.6 STABIELE OPSTART ----------
  // Geen automatische reload, build-lock of vroege return.
  // Daardoor kan dezelfde Tampermonkey-entry veilig worden overschreven
  // zonder dat GM-instellingen worden verwijderd of modules worden overgeslagen.
  try {
    sessionStorage.removeItem('mrb_gold_clean_reload_10.0.4.4');
    document.querySelectorAll('.mrb-version-notice').forEach(el => el.remove());
  } catch(e) {}


  // ---------- V10.0.2 MODULE REGISTRATION BROKER ----------
  // Modules mogen zich al aanmelden voordat de centrale planner is geladen.
  // De broker bewaart de registratie en koppelt die zodra de planner gereed is.
  (function initV10RegistrationBroker(){
    if (unsafeWindow.mrbV10Registration) return;
    const pending = new Map();
    const connected = new Map();
    const listeners = new Set();

    function clean(v){ return String(v ?? '').trim(); }
    function notify(){
      const snapshot = api.snapshot();
      listeners.forEach(fn => { try { fn(snapshot); } catch(e) {} });
    }
    function planner(){ return unsafeWindow.mrbV9Planner || null; }
    function connectOne(id){
      const spec = pending.get(id);
      const p = planner();
      if (!spec || !p || typeof p.registerTask !== 'function') return false;
      try {
        p.registerTask(spec.task);
        if (typeof spec.onConnect === 'function') spec.onConnect(p);
        connected.set(id, { ts:Date.now(), module:spec.module || spec.task.module || id });
        pending.delete(id);
        notify();
        return true;
      } catch(e) {
        try { console.warn('[V10 Registration]', id, e); } catch(_) {}
        return false;
      }
    }
    function drain(){
      [...pending.keys()].forEach(connectOne);
      return pending.size === 0;
    }
    const api = {
      register(spec={}){
        const task = spec.task || spec;
        const id = clean(task.id || spec.id);
        if (!id || typeof task.run !== 'function') return false;
        pending.set(id, { task:{...task,id}, module:clean(spec.module || task.module || id), onConnect:spec.onConnect });
        connectOne(id);
        notify();
        return true;
      },
      ensure(id){ return connectOne(clean(id)); },
      drain,
      onChange(fn){ if (typeof fn === 'function') listeners.add(fn); return () => listeners.delete(fn); },
      snapshot(){
        const p = planner();
        const tasks = p?.listTasks?.() || [];
        return {
          plannerReady:!!p,
          pending:[...pending.keys()],
          connected:[...connected.keys()],
          tasks:tasks.map(t=>t.id)
        };
      }
    };
    unsafeWindow.mrbV10Registration = api;
    mrbSetInterval(() => { if (pending.size) drain(); }, 3000);
  })();


  // =====================================================================
  // MRB GOLD EDITION v10.0.4.28 - CLOUDFLARE RUSTPAUZE
  // - Zodra de beveiligingscontrole zichtbaar is, stopt automatische navigatie.
  // - Na verdwijnen blijft een extra afkoelperiode actief om herhaling te voorkomen.
  // - De Heist-afrondingswatcher navigeert minder vaak.
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
    // Jouw login-navbar voorbeeld (SIGNUP / LOGIN knoppen)
    if (document.querySelector('a[data-bs-target="#signupModal"], a[data-bs-target="#loginModal"]')) return true;
    // Vaak aanwezig op login overlay/pagina
    if (document.querySelector('input[type="password"], form[action*="login"], #loginModal, #signupModal')) {
      // voorkomt false positives (password field op andere pagina is zeldzaam in Omerta UI)
      return true;
    }
    // Soms staat er letterlijk LOGIN/SIGNUP in navbar-brand
    const navTxt = (document.querySelector('.navbar-brand')?.innerText || '').toUpperCase();
    if (navTxt.includes('LOGIN') || navTxt.includes('SIGNUP')) return true;
    return false;
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

function _pinMode(title){
  const t = _normTitle(title);

  // helemaal niks in header
  if (
    t === _normTitle('Partner/OC') ||
    t === _normTitle('Partner / OC') ||
    t === _normTitle('Blood buy') ||
    t === _normTitle('Blood Buy')
  ) return 'none';

  // standaard: toggle + status
  return 'full';
}


function pinToggleStatusInHeader(block){
  // v8.2.4 stabiliteit: knoppen/statussen NIET meer naar de header verplaatsen.
  // Het verplaatsen van DOM-elementen veroorzaakte bij sommige modules haperende
  // Start/Stop-knoppen, lastige inklap-pijltjes en focusproblemen in invoervelden.
  return;
  if(!block || block.dataset.pinnedHeader === '1') return;

  const titleEl = block.querySelector('.gm-block-title');
  const title = titleEl ? titleEl.textContent.trim() : '';
  const mode = _pinMode(title);
if(mode === 'none') return;


  const header = block.querySelector('.gm-block-header');
  const tools  = block.querySelector('.gm-block-tools');
  if(!header || !tools) return;

  // Zoek de Start/Stop knop (niet de collapse/min knop)
  const btns = [...block.querySelectorAll('button')].filter(b=>!b.classList.contains('gm-min'));
  const toggle = btns.find(b => /^(start|stop)$/i.test((b.textContent||'').trim()))
              || btns.find(b => /\b(start|stop)\b/i.test((b.textContent||'').trim()))
              || null;

  const status = block.querySelector('.gm-status');

  // Als dit block geen toggle/status heeft: skip
  if(!toggle && !status) return;

  // Host vóór de bestaande tools (collapse blijft dus bestaan)
  let host = tools.querySelector('.gm-head-controls');
  if(!host){
    host = document.createElement('span');
    host.className = 'gm-head-controls';
    tools.insertBefore(host, tools.firstChild);
  }

// Alleen pinnen als er echt iets is om te pinnen
if(mode === 'status'){
  if(!status) return;              // status-only vereist status
} else { // full
  if(!toggle && !status) return;   // full: minstens 1 van de 2
}

// FULL: toggle + status
if(mode === 'full' && toggle){
  toggle.classList.add('gm-btn-mini');
  host.appendChild(toggle);
}

// STATUS of FULL: status pill
if(status){
  status.classList.add('gm-pill');
  host.appendChild(status);
}


  block.dataset.pinnedHeader = '1';
}

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
  const MRB_CATEGORY_ORDER_KEY = 'mrb_category_order_version_v1';

  // Vaste, door gebruiker gekozen indeling.
  // Belangrijk: dit sorteert alleen hele module-kaarten in het menu.
  // Module-inhoud, knoppen en eventlisteners blijven ongemoeid.
  const MRB_CATEGORIES = [
    {
      id:'dashboard',
      title:'Dashboard / Instellingen',
      ids:['00-partner-oc-setting','00-dashboard-rank','08-refresh','00b-mrb-timer'],
      titles:['Settings','Dashboard','Refresh','Timer']
    },
    {
      id:'alerts',
      title:'Alerts / Timers',
      ids:['00d-lackey-timer','00c-captcha-alert'],
      titles:['Lackey Timer','Captcha Alert']
    },
    {
      id:'ranken',
      title:'Ranken',
      ids:['03-crimes-cars','03-dnd-trade','02-heist','03-oc','03-spot-overval','01-race','12-cd-boozen','04-travel','03-bodyguard-trainer'],
      titles:['Crimes','D&D','Heist','OC','Spot Overval','Race','Boozen','Travel','Bodyguard Trainer']
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
    if (/crime|cars|d&d|smokkel|heist|\boc\b|race|booze|travel/.test(hay)) return 'ranken';
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
      list.sort((a,b) => (originalIndex.get(a) || 0) - (originalIndex.get(b) || 0));
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
  // ---------- Duidelijke actief-badges in kopjes ----------
  // Veilig: dit verplaatst geen Start/Stop-knoppen en geen originele statusregels.
  // Het leest alleen de bestaande status/knoptekst en toont een kleine badge in de header.
  function gmStatusStateForBlock(block){
    if (!block) return { state:'unknown', label:'' };

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
    gmUpdateAllStatusBadges();
    const menuRoot = document.getElementById('mrbGoldMenu');
    if (menuRoot && !window.__mrbStatusBadgeObserverStarted) {
      window.__mrbStatusBadgeObserverStarted = true;
      // Alleen het MRB-menu observeren; wijzigingen in het volledige spel hoeven
      // geen complete badge-update meer te veroorzaken.
      gmStatusBadgeObserver.observe(menuRoot, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:['class','disabled','aria-pressed'] });
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
  // v11.11.3 — SPOT OVERVAL NIEUWE ZELFSTANDIGE CORE
  // Oude Spot Overval-code volledig vervangen. De UI en state-machine starten
  // vroeg en blijven werken, ook als een latere module niet initialiseert.
  // =====================================================================
  (function MRBSpotRaidStandaloneCore(){
    'use strict';
    if (unsafeWindow.mrbSpotRaidCoreV3) return;

    const TASK_ID='v9-spot-raid';
    const INFO='/information.php';
    const GROUP='/?module=GroupCrimes';
    const K_ON='mrb_spot_raid_on_v2';
    const K_ROLE='mrb_spot_raid_role_v2';
    const K_STATE='mrb_spot_raid_state_v3';
    const K_NEXT='mrb_spot_raid_next_v3';
    const K_LAST='mrb_spot_raid_last_action_v3';
    const K_INVITED='mrb_spot_raid_invited_v3';
    const K_BUILD='mrb_spot_raid_build_v3';
    const K_DRIVER_META='mrb_spot_raid_driver_meta_v3';
    const K_INVITE_META='mrb_spot_raid_invite_meta_v3';
    const K_START_META='mrb_spot_raid_start_meta_v3';
    const K_STATE_SINCE='mrb_spot_raid_state_since_v3';
    const K_RETRIES='mrb_spot_raid_retries_v3';
    const K_LAST_ERROR='mrb_spot_raid_last_error_v3';
    const K_CYCLE='mrb_spot_raid_cycle_v3';

    let enabled=!!GM_Get(K_ON,false);
    let role=String(GM_Get(K_ROLE,'leader'))==='driver'?'driver':'leader';
    let state=String(GM_Get(K_STATE,enabled?'CHECK_TIMER':'OFF'));
    let nextAt=Math.max(0,Number(GM_Get(K_NEXT,Date.now()))||Date.now());
    let busy=false;
    let plannerConnected=false;
    let lastPlannerHeartbeat=0;
    let inviteConfirmed=!!GM_Get(K_INVITED,false);
    let inviteMeta=(()=>{try{const raw=GM_Get(K_INVITE_META,'');return raw?(typeof raw==='string'?JSON.parse(raw):raw):{};}catch(_){return {};}})();
    let debugState={driver:false,bullets:false,localMob:false,inviteButton:false,inviteClicked:false,inviteConfirmed:false,startButton:false,startClicked:false,startConfirmed:false};
    let driverDebug={invite:false,acceptClicked:false,carControl:false,carSelected:false,confirm:false,confirmClicked:false,ready:false};
    let driverMeta=(()=>{try{const raw=GM_Get(K_DRIVER_META,'');return raw?(typeof raw==='string'?JSON.parse(raw):raw):{};}catch(_){return {};}})();
    let startMeta=(()=>{try{const raw=GM_Get(K_START_META,'');return raw?(typeof raw==='string'?JSON.parse(raw):raw):{};}catch(_){return {};}})();
    let stateSince=Math.max(0,Number(GM_Get(K_STATE_SINCE,Date.now()))||Date.now());
    let retries=Math.max(0,Number(GM_Get(K_RETRIES,0))||0);
    let lastError=String(GM_Get(K_LAST_ERROR,'')||'');
    let cycleId=Math.max(0,Number(GM_Get(K_CYCLE,0))||0);

    // Een opgeslagen WAIT_DRIVER uit een vorige build mag nooit blind worden hervat.
    // Bij de eerste start van deze build beginnen we daarom opnieuw bij de timercontrole.
    if(String(GM_Get(K_BUILD,''))!=='11.11.17'){
      GM_Set(K_BUILD,'11.11.17');
      if(role==='leader'){
        state=enabled?'CHECK_TIMER':'OFF';
        nextAt=Date.now();
        inviteConfirmed=false;
        GM_Set(K_INVITED,false);
        inviteMeta={};GM_Set(K_INVITE_META,'');
        startMeta={};GM_Set(K_START_META,'');
        GM_Set(K_STATE,state);
        GM_Set(K_NEXT,nextAt);
        stateSince=Date.now();GM_Set(K_STATE_SINCE,stateSince);
        retries=0;GM_Set(K_RETRIES,0);
        lastError='';GM_Set(K_LAST_ERROR,'');
      }
    }

    const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
    const text=()=>clean(document.querySelector('#game_container')?.innerText||document.body?.innerText||'');
    const visible=e=>!!(e&&!e.disabled&&(e.offsetParent!==null||e.getClientRects?.().length));
    const gate=()=>{try{return typeof gm_isGateVisible==='function'&&gm_isGateVisible();}catch(_){return false;}};
    const onInfo=()=>/information\.php/i.test(String(location.pathname||location.href));
    const onGroup=()=>/module=GroupCrimes/i.test(String(location.href));
    const onSpotPage=()=>{
      const href=String(location.href||'');
      if(/(?:module=|\/)(?:spot|raid|robbery|overval)(?:[&/?#]|$)/i.test(href)) return true;
      // 'Volgende spot overval' op Mijn account is alleen een timer en geen formulier.
      return !!findDriverInput() || !!findLocalMobRaidRow() || !!findControl(/start\s*\/?\s*update.*overval|start.*(?:spot|raid|overval)/i);
    };

    function publish(detail=''){
      GM_Set(K_STATE,state); GM_Set(K_NEXT,nextAt);
      try{unsafeWindow.mrbModuleStateRegistry?.set?.('spot-raid',{state,detail,enabled,role,nextAt,version:'11.11.17'});}catch(_){}
      paint(detail);
    }
    function setState(st,detail='',delay=2500){
      if(st!==state){ stateSince=Date.now(); GM_Set(K_STATE_SINCE,stateSince); }
      state=st; nextAt=Date.now()+Math.max(0,delay); publish(detail);
      try{unsafeWindow.mrbV9Planner?.updateTask?.(TASK_ID,{enabled:true,nextAt,status:detail||st});}catch(_){}
    }
    function setError(message){
      lastError=clean(message||'onbekende fout'); GM_Set(K_LAST_ERROR,lastError);
    }
    function clearError(){ lastError=''; GM_Set(K_LAST_ERROR,''); }
    function bumpRetry(){ retries+=1; GM_Set(K_RETRIES,retries); return retries; }
    function clearRetries(){ retries=0; GM_Set(K_RETRIES,0); }
    function stateAge(){ return Math.max(0,Date.now()-stateSince); }
    function beginCycle(){ cycleId+=1; GM_Set(K_CYCLE,cycleId); clearRetries(); clearError(); }
    function safeRelease(ctx){ try{ctx?.releaseAction?.();}catch(_){} }
    function recover(reason,ctx=null,delay=3000){
      setError(reason); bumpRetry(); safeRelease(ctx); resetInviteCycle(); saveDriverMeta({});
      setState('RECOVERY',reason,delay); return {delayMs:delay,status:'herstel'};
    }
    function nav(path,ctx=null){
      try{if(ctx?.planner?.navigate) return ctx.planner.navigate(path,{owner:TASK_ID,source:TASK_ID});}catch(_){}
      try{if(unsafeWindow.mrbNavigate) return unsafeWindow.mrbNavigate(path,{source:TASK_ID});}catch(_){}
      try{unsafeWindow.omerta?.GUI?.container?.loadPage?.(path);return true;}catch(_){}
      location.href=path; return true;
    }
    function fire(e){try{e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}catch(_){} }
    function setVal(e,v){if(!e)return false;try{e.focus();e.value=String(v);fire(e);return true;}catch(_){return false;}}
    function click(e){if(!visible(e))return false;try{e.focus();e.click();GM_Set(K_LAST,Date.now());return true;}catch(_){return false;}}
    function controls(){return [...document.querySelectorAll('a,button,input[type="submit"],input[type="button"]')].filter(visible);}
    function findControl(rx){return controls().find(e=>rx.test(clean(e.textContent||e.value||'')+' '+clean(e.getAttribute?.('href')||'')));}
    function findControlInSection(sectionRx, controlRx=null){
      const all=controls();
      let best=null;
      let bestSize=Infinity;
      for(const control of all){
        let node=control;
        for(let depth=0;node&&depth<8;depth++,node=node.parentElement){
          const sectionText=clean(node.textContent||'');
          if(!sectionRx.test(sectionText)) continue;
          const own=clean(control.textContent||control.value||'')+' '+clean(control.getAttribute?.('href')||'');
          if(controlRx&&!controlRx.test(own)) continue;
          // Kies het kleinste passende blok. Zo wordt niet per ongeluk de Heist-link
          // uit de volledige GroupCrimes-container gekozen.
          if(sectionText.length<bestSize){best=control;bestSize=sectionText.length;}
          break;
        }
      }
      return best;
    }
    function parseDuration(raw){
      const v=clean(raw); if(/^(nu|now|ready)$/i.test(v))return 0;
      let ms=0; for(const m of v.matchAll(/(\d+)\s*([HMS])/ig)) ms+=Number(m[1])*(m[2].toUpperCase()==='H'?3600000:m[2].toUpperCase()==='M'?60000:1000);
      return ms;
    }
    function readSpotTimer(){
      for(const row of document.querySelectorAll('tr')){
        const cells=[...row.querySelectorAll('th,td')];
        if(cells.length>1&&/volgende\s+spot\s*overval|next\s+spot\s*(raid|robbery)/i.test(clean(cells[0].textContent))) return clean(cells[cells.length-1].textContent);
      }
      const body=text(); const m=body.match(/volgende\s+spot\s*overval\s*[:\-]?\s*(nu|now|(?:\d+\s*[HMS]\s*)+)/i); return m?clean(m[1]):'';
    }
    function selectFirstRealOption(sel,preferredRx=null){
      if(!sel)return false; const opts=[...sel.options].filter(o=>o.value&&!/^(0|-1|-)$/.test(String(o.value))&&!/kies|choose|geen|none|select/i.test(clean(o.textContent)));
      const opt=(preferredRx&&opts.find(o=>preferredRx.test(clean(o.textContent))))||opts[0];
      if(!opt)return false; sel.value=opt.value; fire(sel); return true;
    }
    function findLocalMobRaidRow(){
      const rows=[...document.querySelectorAll('tr')];
      const candidates=rows.filter(row=>/\(local mob\)|local mob/i.test(clean(row.textContent||'')));
      // De Go-knop kan een afbeelding zonder zichtbare tekst zijn. Daarom hoeft
      // de rij zelf niet letterlijk 'Go' of 'uitnodigen' te bevatten.
      return candidates.find(row=>/\bnow\b|\bnu\b/i.test(clean(row.textContent||''))) || candidates[0] || null;
    }
    function findLocalMobInviteControl(){
      const row=findLocalMobRaidRow();
      if(!row) return null;
      const label=el=>clean([
        el.value,el.textContent,el.getAttribute?.('alt'),el.getAttribute?.('title'),
        el.getAttribute?.('aria-label'),el.getAttribute?.('name'),el.getAttribute?.('src')
      ].filter(Boolean).join(' '));
      const candidates=[...row.querySelectorAll('button,input[type="submit"],input[type="button"],input[type="image"],a,[role="button"]')].filter(visible);
      return candidates.find(el=>/^go(?:\s|$)/i.test(label(el)) || /invite|uitnodig|\bgo\b/i.test(label(el)))
        // Op de huidige pagina kan de knop uitsluitend als afbeelding/submitter
        // aanwezig zijn zonder bruikbare tekst. Neem dan de enige submitactie in de rij.
        || candidates.find(el=>/^(submit|image)$/i.test(clean(el.getAttribute?.('type')||'')))
        || (candidates.length===1?candidates[0]:null);
    }
    function clickLocalMobGo(el){
      if(!visible(el)) return false;
      const now=Date.now();
      const last=Number(GM_Get(K_LAST,0))||0;
      if(now-last<1200) return false;
      try{
        el.focus?.();
        GM_Set(K_LAST,now);
        // Eerst exact dezelfde native klik uitvoeren als een handmatige klik.
        // Dit behoudt naam/waarde en eventuele onclick-logica van de Local Mob-knop.
        el.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
        el.dispatchEvent(new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window}));
        el.click();
        return true;
      }catch(_){
        try{
          const form=el.form||el.closest?.('form');
          if(form){ form.submit(); return true; }
        }catch(__){}
        return false;
      }
    }
    function chooseLocalMob(){
      // Sommige pagina's gebruiken select/radio; de huidige Barafranca-pagina
      // gebruikt echter een tabel waarin iedere Local Mob-rij een eigen Go-knop heeft.
      for(const sel of document.querySelectorAll('select')) if(visible(sel)&&selectFirstRealOption(sel,/\(local mob\)|local mob/i)) return true;
      const r=[...document.querySelectorAll('input[type="radio"]')].find(i=>visible(i)&&/\(local mob\)|local mob/i.test(clean(i.value)+' '+clean(i.closest('label,tr,div')?.textContent)));
      if(r){r.checked=true;fire(r);return true;}
      return !!findLocalMobRaidRow();
    }
    function carControls(){
      const selects=[...document.querySelectorAll('select')].filter(sel=>{
        if(!visible(sel))return false;
        const hay=clean((sel.name||'')+' '+(sel.id||'')+' '+(sel.closest('label,tr,div,fieldset,form')?.textContent||''));
        return /auto|car|wagen|vehicle|voertuig/i.test(hay) || [...sel.options].some(o=>/auto|car|wagen|vehicle|voertuig/i.test(clean(o.textContent||'')));
      });
      const radios=[...document.querySelectorAll('input[type="radio"]')].filter(i=>{
        if(!visible(i))return false;
        const hay=clean((i.name||'')+' '+(i.id||'')+' '+i.value+' '+(i.closest('label,tr,div,fieldset,form')?.textContent||''));
        return /auto|car|wagen|vehicle|voertuig/i.test(hay);
      });
      return {selects,radios};
    }
    function chooseCar(){
      const {selects,radios}=carControls();
      driverDebug.carControl=!!(selects.length||radios.length);
      for(const sel of selects){
        const opts=[...sel.options].filter(o=>!o.disabled&&o.value&&!/^(0|-1|-)$/.test(String(o.value))&&!/kies|choose|geen|none|select/i.test(clean(o.textContent)));
        // Kies de eerste echte beschikbare auto. Dit sluit lege placeholders uit.
        const opt=opts[0];
        if(opt){sel.value=opt.value;fire(sel);driverDebug.carSelected=String(sel.value)===String(opt.value);return driverDebug.carSelected;}
      }
      const r=radios.find(i=>!i.disabled);
      if(r){r.checked=true;fire(r);driverDebug.carSelected=!!r.checked;return driverDebug.carSelected;}
      return false;
    }
    function findDriverAccept(){
      return findControl(/^(?:accepteer|accept)(?:\s+uitnodiging|\s+invitation)?$/i) ||
        findControl(/accepteer.*(?:uitnodiging|spot|overval)|accept.*(?:invitation|spot|raid|robbery)/i);
    }
    function findCarConfirm(){
      return findControl(/^(?:kies|selecteer|choose|select)(?:\s+(?:een|de|a|the))?\s+(?:auto|car|wagen|vehicle)$/i) ||
        findControl(/kies auto|selecteer auto|choose car|select car|auto kiezen|gereed|ready/i);
    }
    function saveDriverMeta(meta){
      driverMeta={...(meta||{})};
      try{GM_Set(K_DRIVER_META,JSON.stringify(driverMeta));}catch(_){GM_Set(K_DRIVER_META,'');}
    }
    function driverReadyEvidence(){
      const t=text();
      const accept=!!findDriverAccept();
      const confirm=!!findCarConfirm();
      const controls=carControls();
      const explicit=/auto\s+(?:is\s+)?(?:gekozen|ingezet|geselecteerd)|car\s+(?:has\s+been\s+)?(?:chosen|selected|assigned)|wacht(?:en)?\s+op\s+(?:de\s+)?leider|leader.*(?:start|gereed|ready)/i.test(t);
      const hrefChanged=!!driverMeta.href&&String(location.href||'')!==String(driverMeta.href);
      return explicit || (!accept&&!confirm&&!controls.selects.length&&!controls.radios.length&&hrefChanged);
    }
    function findInputByNearbyLabel(labelRx){
      const candidates=[...document.querySelectorAll('input[type="text"],input:not([type]),input[type="number"]')].filter(visible);
      for(const input of candidates){
        const direct=clean((input.name||'')+' '+(input.id||'')+' '+(input.placeholder||''));
        if(labelRx.test(direct)) return input;
        let node=input;
        for(let depth=0;node&&depth<5;depth++,node=node.parentElement){
          const nearby=clean(node.textContent||'');
          if(labelRx.test(nearby)) return input;
        }
        const prev=clean(input.previousElementSibling?.textContent||'');
        if(labelRx.test(prev)) return input;
      }
      return null;
    }
    function findDriverInput(){
      return document.querySelector('input[name="driver"],input[name*="driver" i],input[name*="bestuur" i],input[name*="partner" i],input[name*="invite" i],input[id*="driver" i],input[id*="bestuur" i]') ||
        findInputByNearbyLabel(/^(?:driver|bestuurder)\s*:?$/i) ||
        findInputByNearbyLabel(/(?:driver|bestuurder)/i);
    }
    function leaderFormSnapshot(){
      const partner=String(GM_Get('race_partner_name','')).trim();
      const driver=findDriverInput();
      const bullets=document.querySelector('input[name*="bullet" i],input[id*="bullet" i],input[name*="ammo" i],input[id*="ammo" i]') || findInputByNearbyLabel(/(?:bullets|kogels|ammo)/i);
      const localSelected=[...document.querySelectorAll('select')].some(sel=>visible(sel)&&/local mob/i.test(clean(sel.selectedOptions?.[0]?.textContent||''))) ||
        [...document.querySelectorAll('input[type="radio"]')].some(r=>r.checked&&/local mob/i.test(clean(r.value)+' '+clean(r.closest('label,tr,div')?.textContent))) ||
        !!findLocalMobRaidRow();
      // De Go-knop staat in de gekozen Local Mob-tabelrij en bevat geen algemene
      // uitnodigingstekst. Zoek hem daarom binnen die rij.
      const invite=findLocalMobInviteControl() || findControl(/^go$|verstuur.*uitnodiging|uitnodigen|send.*invite|invite/i);
      return {
        partner,driver,bullets,invite,
        driverOk:!!(driver&&partner&&clean(driver.value).toLowerCase()===partner.toLowerCase()),
        bulletsOk:!bullets||Number(String(bullets.value||'').replace(/[^0-9-]/g,''))===0,
        localOk:localSelected
      };
    }
    function fillLeaderForm(){
      const x=leaderFormSnapshot();
      if(x.driver&&!x.driverOk) setVal(x.driver,x.partner);
      if(x.bullets&&!x.bulletsOk) setVal(x.bullets,0);
      if(!x.localOk) chooseLocalMob();
      const y=leaderFormSnapshot();
      debugState.driver=!!y.driverOk;
      debugState.bullets=!!y.bulletsOk;
      debugState.localMob=!!y.localOk;
      debugState.inviteButton=!!y.invite;
      return !!(y.driverOk&&y.bulletsOk&&y.localOk&&y.invite);
    }
    function currentInviteSignature(){
      const form=findDriverInput()?.closest?.('form');
      return {
        href:String(location.href||''),
        formAction:String(form?.getAttribute?.('action')||''),
        body:text().slice(0,1800),
        ts:Date.now()
      };
    }
    function saveInviteMeta(meta){
      inviteMeta={...(meta||{})};
      try{GM_Set(K_INVITE_META,JSON.stringify(inviteMeta));}catch(_){GM_Set(K_INVITE_META,'');}
    }
    function invitationEvidence(){
      const t=text();
      const formStillPresent=!!findDriverInput();
      const startVisible=!!findControl(/start\s*\/?\s*update.*overval|start.*(?:spot|raid|overval)/i);
      const explicit=/uitnodiging\s+(?:is\s+)?(?:verzonden|verstuurd)|invite\s+(?:has\s+been\s+)?sent|wacht(?:en)?\s+op\s+(?:de\s+)?(?:driver|bestuurder)|driver.*(?:accepteren|auto|gereed|ready)/i.test(t);
      const hrefChanged=!!inviteMeta.href&&String(location.href||'')!==String(inviteMeta.href);
      const bodyChanged=!!inviteMeta.body&&t!==String(inviteMeta.body);
      // Bevestig nooit alleen op het woord Driver. Het invoerformulier moet weg zijn
      // en er moet een duidelijke serverreactie, startknop of paginawijziging zijn.
      return !formStillPresent && (explicit || startVisible || (hrefChanged&&bodyChanged));
    }
    function inviteVerifyExpired(){
      const clickedAt=Number(inviteMeta.clickedAt||0);
      return !!clickedAt && Date.now()-clickedAt>15000;
    }
    function findStartControl(){
      return findControl(/^(?:start\s*\/?\s*update\s+overval|start\s+(?:de\s+)?(?:spot\s+)?overval|start\s+(?:spot\s+)?raid)$/i) ||
        findControl(/start\s*\/?\s*update.*overval|start.*(?:spot|raid|overval)/i);
    }
    function saveStartMeta(meta){
      startMeta={...(meta||{})};
      try{GM_Set(K_START_META,JSON.stringify(startMeta));}catch(_){GM_Set(K_START_META,'');}
    }
    function currentStartSignature(){
      const start=findStartControl();
      return {
        href:String(location.href||''),
        body:text().slice(0,2200),
        buttonLabel:clean(start?.textContent||start?.value||''),
        clickedAt:0,
        ts:Date.now()
      };
    }
    function startEvidence(){
      const t=text();
      const startStillVisible=!!findStartControl();
      const explicit=/overval\s+(?:is\s+)?(?:gestart|begonnen|uitgevoerd)|spot\s+(?:raid|overval)\s+(?:is\s+)?(?:started|running)|(?:resultaat|opbrengst|buit|loot).*overval|volgende\s+spot\s+overval/i.test(t);
      const hrefChanged=!!startMeta.href&&String(location.href||'')!==String(startMeta.href);
      const bodyChanged=!!startMeta.body&&t!==String(startMeta.body);
      return explicit || (!startStillVisible && (hrefChanged || bodyChanged));
    }
    function startVerifyExpired(){
      const clickedAt=Number(startMeta.clickedAt||0);
      return !!clickedAt && Date.now()-clickedAt>15000;
    }
    function resetStartCycle(){
      saveStartMeta({});
      debugState.startButton=false;
      debugState.startClicked=false;
      debugState.startConfirmed=false;
    }
    function resetInviteCycle(){
      inviteConfirmed=false;GM_Set(K_INVITED,false);
      saveInviteMeta({});
      resetStartCycle();
      debugState={driver:false,bullets:false,localMob:false,inviteButton:false,inviteClicked:false,inviteConfirmed:false,startButton:false,startClicked:false,startConfirmed:false};
      driverDebug={invite:false,acceptClicked:false,carControl:false,carSelected:false,confirm:false,confirmClicked:false,ready:false};
    }

    const block=addBlock(`
      <h4>Spot Overval</h4>
      <div class="gm-row">
        <label><input type="radio" name="spotRoleV3" value="leader" ${role==='leader'?'checked':''}> Leider</label>
        <label><input type="radio" name="spotRoleV3" value="driver" ${role==='driver'?'checked':''}> Driver</label>
      </div>
      <div class="gm-row" style="align-items:center;gap:8px;margin-top:5px;">
        <button id="spotToggleV3" class="gm-btn">${enabled?'Stop':'Start'}</button>
        <div id="spotStatusV3" class="gm-status"></div>
      </div>
      <div id="spotInfoV3" style="font-size:11px;opacity:.85;margin-top:5px;"></div>
      <div id="spotDebugV3" style="font-size:10px;line-height:1.35;margin-top:5px;padding:5px;border:1px solid rgba(212,175,55,.25);border-radius:6px;background:rgba(0,0,0,.18);"></div>
    `,'03-spot-overval');

    function paint(detail=''){
      const b=block.querySelector('#spotToggleV3'),st=block.querySelector('#spotStatusV3'),inf=block.querySelector('#spotInfoV3'),dbg=block.querySelector('#spotDebugV3');
      if(b)b.textContent=enabled?'Stop':'Start';
      if(st)st.innerHTML=enabled?`<span class="ok">${state}</span>`:'<span class="bad">UIT</span>';
      if(inf)inf.textContent=detail||`${role==='leader'?'Leider':'Driver'} • core 11.11.17${plannerConnected?' • planner gekoppeld':' • zelfstandige modus'}`;
      if(dbg){
        if(role!=='leader'){dbg.innerHTML=[
          `State: <b>${state}</b>`,
          `Cyclus: ${cycleId} • Pogingen: ${retries} • Stap: ${Math.floor(stateAge()/1000)}s`,
          lastError?`Fout: ${lastError}`:'Fout: geen',
          `${driverDebug.invite?'✓':'✗'} Uitnodiging gevonden`,
          `${driverDebug.acceptClicked?'✓':'✗'} Uitnodiging geaccepteerd`,
          `${driverDebug.carControl?'✓':'✗'} Autokeuze gevonden`,
          `${driverDebug.carSelected?'✓':'✗'} Auto geselecteerd`,
          `${driverDebug.confirm?'✓':'✗'} Kies auto gevonden`,
          `${driverDebug.confirmClicked?'✓':'✗'} Kies auto aangeklikt`,
          `${driverDebug.ready?'✓':'✗'} Driver gereed bevestigd`
        ].join('<br>');}
        else dbg.innerHTML=[
          `State: <b>${state}</b>`,
          `Cyclus: ${cycleId} • Pogingen: ${retries} • Stap: ${Math.floor(stateAge()/1000)}s`,
          lastError?`Fout: ${lastError}`:'Fout: geen',
          `${debugState.driver?'✓':'✗'} Driver ingevuld`,
          `${debugState.bullets?'✓':'✗'} 0 kogels`,
          `${debugState.localMob?'✓':'✗'} Local Mob gekozen`,
          `${debugState.inviteButton?'✓':'✗'} Go/uitnodigknop gevonden`,
          `${debugState.inviteClicked?'✓':'✗'} Go aangeklikt`,
          `${debugState.inviteConfirmed?'✓':'✗'} Uitnodiging bevestigd`,
          `${debugState.startButton?'✓':'✗'} Start/Update gevonden`,
          `${debugState.startClicked?'✓':'✗'} Start/Update aangeklikt`,
          `${debugState.startConfirmed?'✓':'✗'} Overval gestart bevestigd`
        ].join('<br>');
      }
    }

    block.querySelector('#spotToggleV3')?.addEventListener('click',()=>{
      enabled=!enabled;GM_Set(K_ON,enabled);if(enabled)resetInviteCycle(); setState(enabled?'CHECK_TIMER':'OFF',enabled?'gestart':'gestopt',0);
    });
    block.querySelectorAll('input[name="spotRoleV3"]').forEach(el=>el.addEventListener('change',()=>{
      if(!el.checked)return; role=el.value==='driver'?'driver':'leader';GM_Set(K_ROLE,role);resetInviteCycle();setState('CHECK_TIMER','rol gewijzigd',0);
    }));

    async function step(ctx=null){
      lastPlannerHeartbeat=ctx?Date.now():lastPlannerHeartbeat;
      if(!enabled){setState('OFF','uit',60000);return{delayMs:60000,status:'uit'};}
      if(gate()){safeRelease(ctx);setState('PAUSED_GATE','beveiliging/login',5000);return{delayMs:5000,status:'gate'};}

      if(state==='RECOVERY'){
        safeRelease(ctx);
        if(retries>=5){ setState('CHECK_TIMER','herstelgrens bereikt; schone timercontrole',5000); clearRetries(); return{delayMs:5000,status:'schone herstart'}; }
        setState('CHECK_TIMER','herstel uitgevoerd',1000); return{delayMs:1000,status:'opnieuw starten'};
      }
      if(state==='ERROR') return recover(lastError||'onbekende modulefout',ctx,3000);
      if(state==='STARTED'){
        safeRelease(ctx); resetInviteCycle(); saveDriverMeta({}); clearRetries(); clearError();
        setState('COMPLETE','Spot Overval-cyclus afgerond',2500); return{delayMs:2500,status:'afgerond'};
      }
      if(state==='COMPLETE'){
        safeRelease(ctx); setState('CHECK_TIMER','volgende Spot Overval-timer controleren',2500); return{delayMs:2500,status:'volgende cyclus'};
      }
      const hardTimeouts={SEND_INVITE_VERIFY:30000,WAIT_START_BUTTON:180000,START_VERIFY:35000,DRIVER_ACCEPT_VERIFY:30000,DRIVER_CAR:90000,DRIVER_CAR_VERIFY:30000,OPEN_GROUP_LEADER:45000,OPEN_GROUP_DRIVER:45000};
      if(hardTimeouts[state]&&stateAge()>hardTimeouts[state]) return recover(`timeout in ${state}`,ctx,3000);

      // Vanaf het openen van Groepsmisdaden tot en met de Go-klik mag geen
      // andere planner-module tussendoor navigeren. Tijdens timer/cooldown en
      // WAIT_DRIVER wordt de lock juist vrijgegeven zodat Cars/D&D door kunnen.
      const activeLeaderFlow=role==='leader' && !['OFF','CHECK_TIMER','COOLDOWN','DONE','WAIT_DRIVER','STARTED'].includes(state);
      const activeDriverFlow=role==='driver' && ['OPEN_GROUP_DRIVER','DRIVER_ACCEPT','DRIVER_ACCEPT_VERIFY','DRIVER_CAR','DRIVER_CAR_VERIFY'].includes(state);
      if((activeLeaderFlow||activeDriverFlow) && ctx){
        if(!ctx.acquireAction?.(120000)) return {delayMs:1000,status:'wacht op centrale actielock'};
        try{ctx.touchAction?.(120000);}catch(_){}
      }

      if(['OFF','CHECK_TIMER','COOLDOWN','DONE'].includes(state)){
        if(!onInfo()){setState('OPEN_INFO','timer openen',1000);nav(INFO,ctx);return{delayMs:1000,status:'informatie openen'};}
        const raw=readSpotTimer();
        if(!raw){setState('CHECK_TIMER','spot-timer niet gevonden',6000);return{delayMs:6000,status:'timer niet gevonden'};}
        const wait=parseDuration(raw);
        if(wait>0){try{ctx?.releaseAction?.();}catch(_){} setState('COOLDOWN',raw,wait+1000);return{delayMs:wait+1000,status:'cooldown'};}
        resetInviteCycle(); beginCycle();
        if(role==='leader'&&ctx&&!ctx.acquireAction?.(120000)){
          setState('CHECK_TIMER','wacht op centrale actielock',1000);
          return{delayMs:1000,status:'wacht op centrale actielock'};
        }
        setState(role==='leader'?'OPEN_GROUP_LEADER':'OPEN_GROUP_DRIVER','timer vrij',0);
      }

      if(!onGroup()&&!onSpotPage()){
        setState(role==='leader'?'OPEN_GROUP_LEADER':'OPEN_GROUP_DRIVER','Groepsmisdaden openen',1000);nav(GROUP,ctx);return{delayMs:1000,status:'Groepsmisdaden openen'};
      }

      if(onGroup()){
        let c=null;
        if(role==='leader'){
          // Op barafranca heet de link zelf alleen 'Klik hier om het te doen!'.
          // Zoek daarom eerst het specifieke kaartje 'Overval een zaak' en klik
          // uitsluitend een link of knop binnen dat kaartje.
          c=findControlInSection(
            /overval een zaak|spot overval/i,
            /klik hier|doen|overval|spot|raid|robbery/i
          ) || findControl(/overval een zaak|leid.*(spot|overval)|start.*spot|spot.*overval/i);
        }else{
          c=findControlInSection(
            /overval een zaak|spot overval|uitnodiging/i,
            /accepteer|accept|klik hier|doen/i
          ) || findControl(/accepteer.*(spot|overval)|accept.*(spot|raid|robbery)/i);
        }
        if(c){click(c);setState(role==='leader'?'LEADER_FORM':'DRIVER_ACCEPT','spotpagina openen',1400);return{delayMs:1400,status:'spotpagina openen'};}
        try{ctx?.releaseAction?.();}catch(_){}
        setState(role==='leader'?'OPEN_GROUP_LEADER':'WAIT_INVITE','spotlink/uitnodiging nog niet zichtbaar',4500);return{delayMs:4500,status:'wachten'};
      }

      if(role==='leader'){
        // Een zichtbaar uitnodigingsformulier bewijst dat er nog geen actieve uitnodiging is.
        // Wis daarom een oude opgeslagen WAIT_DRIVER/invited-status na refresh of mislukte verzending.
        if(findDriverInput() && inviteConfirmed){
          resetInviteCycle();
          state='LEADER_FORM';
          nextAt=Date.now();
          publish('verouderde uitnodigingsstatus gewist; formulier opnieuw invullen');
        }
        const start=findStartControl();
        debugState.startButton=!!start;

        if(state==='START_VERIFY'){
          const confirmed=startEvidence();
          debugState.startConfirmed=confirmed;
          if(confirmed){
            try{ctx?.releaseAction?.();}catch(_){}
            clearRetries();clearError();setState('STARTED','Spot Overval aantoonbaar gestart',5000);
            return{delayMs:5000,status:'overval gestart'};
          }
          if(startVerifyExpired()){
            const stillVisible=!!findStartControl();
            try{ctx?.releaseAction?.();}catch(_){}
            if(stillVisible){
              saveStartMeta({});
              setState('WAIT_START_BUTTON','geen startbevestiging; knop opnieuw beschikbaar',3500);
              return{delayMs:3500,status:'start opnieuw proberen'};
            }
            setState('START_VERIFY','start verwerkt; wacht op duidelijke serverbevestiging',3000);
            return{delayMs:3000,status:'startbevestiging afwachten'};
          }
          setState('START_VERIFY','wacht op serverbevestiging van Start/Update',1200);
          return{delayMs:1200,status:'start controleren'};
        }

        if(start&&inviteConfirmed){
          if(ctx&&!ctx.acquireAction?.(120000)){
            setState('WAIT_START_BUTTON','wacht op centrale actielock voor Start/Update',1000);
            return{delayMs:1000,status:'wacht op actielock'};
          }
          try{ctx?.touchAction?.(120000);}catch(_){}
          const before=currentStartSignature();
          saveStartMeta({...before,clickedAt:Date.now()});
          if(click(start)){
            debugState.startClicked=true;
            setState('START_VERIFY','Start/Update aangeklikt; resultaat controleren',1400);
            return{delayMs:1400,status:'start controleren'};
          }
          try{ctx?.releaseAction?.();}catch(_){}
          saveStartMeta({});
          setState('WAIT_START_BUTTON','Start/Update kon niet worden aangeklikt',1800);
          return{delayMs:1800,status:'start opnieuw proberen'};
        }

        if(state==='SEND_INVITE_VERIFY'){
          const confirmed=invitationEvidence();
          debugState.inviteConfirmed=confirmed;
          if(confirmed){
            inviteConfirmed=true;GM_Set(K_INVITED,true);clearRetries();clearError();
            saveInviteMeta({...inviteMeta,confirmedAt:Date.now(),confirmedHref:String(location.href||'')});
            try{ctx?.releaseAction?.();}catch(_){}
            setState('WAIT_DRIVER','uitnodiging aantoonbaar verzonden',4500);
            return{delayMs:4500,status:'wacht Driver'};
          }
          if(inviteVerifyExpired()){
            bumpRetry();setError('uitnodiging niet door server bevestigd');resetInviteCycle();
            setState('LEADER_FORM','geen serverbevestiging binnen 15 seconden; opnieuw proberen',1800);
            return{delayMs:1800,status:'uitnodiging niet bevestigd'};
          }
          setState('SEND_INVITE_VERIFY','wacht op serverbevestiging',1200);
          return{delayMs:1200,status:'verzending controleren'};
        }

        if(inviteConfirmed||invitationEvidence()){
          inviteConfirmed=true;GM_Set(K_INVITED,true);debugState.inviteConfirmed=true;
          if(start){
            if(ctx&&!ctx.acquireAction?.(120000)){
              setState('WAIT_START_BUTTON','Driver gereed; wacht op actielock',1000);
              return{delayMs:1000,status:'wacht op actielock'};
            }
            try{ctx?.touchAction?.(120000);}catch(_){}
            const before=currentStartSignature();
            saveStartMeta({...before,clickedAt:Date.now()});
            if(click(start)){
              debugState.startClicked=true;
              setState('START_VERIFY','Start/Update aangeklikt; resultaat controleren',1400);
              return{delayMs:1400,status:'start controleren'};
            }
            try{ctx?.releaseAction?.();}catch(_){}
            saveStartMeta({});
            setState('WAIT_START_BUTTON','Start/Update kon niet worden aangeklikt',1800);
            return{delayMs:1800,status:'start opnieuw proberen'};
          }
          try{ctx?.releaseAction?.();}catch(_){}
          setState('WAIT_DRIVER','wacht op Driver-auto',4500);
          return{delayMs:4500,status:'wacht Driver'};
        }

        // Zolang geen bewezen uitnodiging bestaat, altijd in formulier-/verzendfase blijven.
        const complete=fillLeaderForm();
        const snap=leaderFormSnapshot();
        if(!complete){
          setState('LEADER_FORM','formulier nog niet compleet',2200);
          return{delayMs:2200,status:'formulier invullen'};
        }
        setState('SEND_INVITE','formulier compleet; uitnodiging versturen',400);
        if(snap.invite){
          const before=currentInviteSignature();
          if(clickLocalMobGo(snap.invite)){
            saveInviteMeta({...before,clickedAt:Date.now()});
            debugState.inviteClicked=true;paint('Go aangeklikt; wacht op bevestiging');
            setState('SEND_INVITE_VERIFY','Go aangeklikt; paginaresultaat controleren',1200);
            return{delayMs:1200,status:'uitnodiging controleren'};
          }
        }
        setState('SEND_INVITE','Go-knop kon niet worden aangeklikt',1800);
        return{delayMs:1800,status:'Go opnieuw proberen'};
      }

      // Fase 3 Driver-flow; Fase 4 Leider-start wordt hierboven afgehandeld.
      const accept=findDriverAccept();
      driverDebug.invite=!!accept || ['DRIVER_ACCEPT_VERIFY','DRIVER_CAR','DRIVER_CAR_VERIFY','DRIVER_READY'].includes(state);

      if(state==='DRIVER_CAR_VERIFY'){
        const ready=driverReadyEvidence();
        driverDebug.ready=ready;
        if(ready){
          try{ctx?.releaseAction?.();}catch(_){}
          clearRetries();clearError();setState('DRIVER_READY','auto aantoonbaar ingezet; wacht op Leider',7000);
          return{delayMs:7000,status:'Driver gereed'};
        }
        if(Date.now()-Number(driverMeta.clickedAt||0)>12000){
          bumpRetry();setError('autokeuze niet door server bevestigd');saveDriverMeta({});
          setState('DRIVER_CAR','geen bevestiging van Kies auto; opnieuw proberen',1600);
          return{delayMs:1600,status:'auto opnieuw bevestigen'};
        }
        setState('DRIVER_CAR_VERIFY','wacht op serverbevestiging auto',1200);
        return{delayMs:1200,status:'auto controleren'};
      }

      if(accept){
        if(click(accept)){
          driverDebug.acceptClicked=true;
          saveDriverMeta({acceptedAt:Date.now(),href:String(location.href||'')});
          setState('DRIVER_ACCEPT_VERIFY','uitnodiging aangeklikt; autoformulier afwachten',1400);
          return{delayMs:1400,status:'accepteren'};
        }
        setState('DRIVER_ACCEPT','accept opnieuw proberen',1300);
        return{delayMs:1300,status:'accept opnieuw'};
      }

      const confirm=findCarConfirm();
      const controls=carControls();
      if(confirm||controls.selects.length||controls.radios.length){
        driverDebug.carControl=!!(controls.selects.length||controls.radios.length);
        const selected=chooseCar();
        const confirmNow=findCarConfirm();
        driverDebug.confirm=!!confirmNow;
        if(selected&&confirmNow){
          saveDriverMeta({href:String(location.href||''),clickedAt:Date.now()});
          if(click(confirmNow)){
            driverDebug.confirmClicked=true;
            setState('DRIVER_CAR_VERIFY','Kies auto aangeklikt; bevestiging controleren',1400);
            return{delayMs:1400,status:'auto bevestigen'};
          }
        }
        setState('DRIVER_CAR','auto of Kies auto nog niet gereed',1500);
        return{delayMs:1500,status:'auto kiezen'};
      }

      if(driverReadyEvidence()){
        driverDebug.ready=true;
        try{ctx?.releaseAction?.();}catch(_){}
        setState('DRIVER_READY','Driver staat gereed',7000);
        return{delayMs:7000,status:'Driver gereed'};
      }

      driverDebug={invite:false,acceptClicked:false,carControl:false,carSelected:false,confirm:false,confirmClicked:false,ready:false};
      saveDriverMeta({});
      try{ctx?.releaseAction?.();}catch(_){}
      setState('WAIT_INVITE','wacht op Spot Overval-uitnodiging',4500);
      return{delayMs:4500,status:'wachten'};
    }

    function connectPlanner(){
      const p=unsafeWindow.mrbV9Planner;if(!p||plannerConnected)return;
      try{
        p.registerTask({id:TASK_ID,title:'Spot Overval 5.0',module:'Spot Overval',priority:74,nextAt:enabled?Date.now():nextAt,enabled:true,requiresNavigation:true,requiresAction:true,run:async c=>await step(c)});
        plannerConnected=true;paint('Planner gekoppeld');
      }catch(e){try{console.warn('[Spot Overval 11.11.17] planner koppeling',e);}catch(_){} }
    }

    unsafeWindow.mrbSpotRaidCoreV3={version:'11.11.17',step,wake(){setState('CHECK_TIMER','handmatig gewekt',0);},getState:()=>({enabled,role,state,nextAt,plannerConnected,stateSince,retries,lastError,cycleId})};
    unsafeWindow.mrbV9SpotRaid=unsafeWindow.mrbSpotRaidCoreV3;
    publish('Nieuwe zelfstandige core geladen');

    mrbSetInterval(connectPlanner,1000);
    mrbSetInterval(async()=>{
      if(!enabled||busy||gate()||Date.now()<nextAt)return;
      // Zodra de planner gekoppeld is, mag de zelfstandige fallback nooit meer
      // parallel draaien. Twee runners waren de oorzaak van tussentijdse navigatie.
      if(plannerConnected)return;
      busy=true;try{await step(null);}catch(e){setError(String(e?.message||e));setState('RECOVERY',lastError,3000);}finally{busy=false;}
    },1000);
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
  const mo = new MutationObserver(()=>{
    const form   = document.querySelector('#detectives-search-div');
    const parent = document.querySelector('#detectivesMain');
    const hasBox = parent?.querySelector('#bulkDetectivesBox');
    if (form && parent && (!uiInjected || !hasBox)) injectUI();
  });
  mo.observe(document.body,{childList:true,subtree:true});

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
    mo = new MutationObserver(() => {
      const btn = findBtn();
      if (btn) focusBtn(btn);
    });
    if (document.body) {
      mo.observe(document.body, { childList: true, subtree: true });
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
  // true  = deze browser negeert master commands (Race/Heist/OC)
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
  function onPageHeist(){ return location.href.includes('module=Heist'); }
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

    // Heist — vul partnernaam in als driver.
    if (onPageHeist() && nnIsCenter()){
      const input = document.querySelector('input[name="driver"]');
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

  // Observer + retries
  const mo = new MutationObserver(()=>prefillOnce());
  mo.observe(document.documentElement, { childList:true, subtree:true });
  window.addEventListener('hashchange', prefillOnce, true);
  window.addEventListener('popstate', prefillOnce, true);
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
// MRB DASHBOARD METRICS v8.3.8
// Centrale tellers voor Dashboard: money/cars/boozen.
// Raakt module-logica niet; modules melden alleen successen door.
// =====================================================================
(function MRBDashboardMetricsV838(){
  'use strict';

  const K = {
    carsTotal: 'mrb_dash_cars_success_total',
    carsFirst: 'mrb_dash_cars_success_first_ts',
    carsLast: 'mrb_dash_cars_success_last_ts',
    carsLastEvent: 'mrb_dash_cars_last_event_ts',
    boozenProfit: 'mrb_dash_boozen_profit_total',
    boozenFirst: 'mrb_dash_boozen_profit_first_ts',
    boozenLast: 'mrb_dash_boozen_profit_last_ts',
    boozenLastEvent: 'mrb_dash_boozen_last_event_ts'
  };

  function getNum(key, def=0){
    const v = Number(GM_Get(key, def));
    return Number.isFinite(v) ? v : def;
  }

  function setNum(key, val){
    GM_Set(key, Number(val) || 0);
  }

  function now(){ return Date.now(); }

  function recordCarSuccess(){
    const t = now();
    const lastEvent = getNum(K.carsLastEvent, 0);
    // Voorkom dubbeltelling als dezelfde succespagina meerdere keren wordt gelezen.
    if (t - lastEvent < 45_000) return;

    const total = getNum(K.carsTotal, 0) + 1;
    setNum(K.carsTotal, total);
    if (!getNum(K.carsFirst, 0)) setNum(K.carsFirst, t);
    setNum(K.carsLast, t);
    setNum(K.carsLastEvent, t);
  }

  function recordBoozenProfit(diff){
    diff = Number(diff);
    if (!Number.isFinite(diff) || diff <= 0) return;

    const t = now();
    const lastEvent = getNum(K.boozenLastEvent, 0);
    // De smokkelpagina kan dezelfde uitkomst even blijven tonen.
    if (t - lastEvent < 2_500) return;

    const total = getNum(K.boozenProfit, 0) + diff;
    setNum(K.boozenProfit, total);
    if (!getNum(K.boozenFirst, 0)) setNum(K.boozenFirst, t);
    setNum(K.boozenLast, t);
    setNum(K.boozenLastEvent, t);
  }

  function reset(){
    Object.values(K).forEach(k => GM_Set(k, 0));
  }

  unsafeWindow.mrbDashMetrics = unsafeWindow.mrbDashMetrics || {};
  unsafeWindow.mrbDashMetrics.recordCarSuccess = recordCarSuccess;
  unsafeWindow.mrbDashMetrics.recordBoozenProfit = recordBoozenProfit;
  unsafeWindow.mrbDashMetrics.reset = reset;
})();

// =====================================================================
// MRB GOLD DASHBOARD v8.1
// Stabiel professioneel dashboard.
// - Inputvelden zijn type="text", dus normaal typen werkt ook op Mac/Edge.
// - Komma en punt worden geaccepteerd.
// - Live ETA, Reset Dashboard, Geld/uur, Cars/uur en Boozen winst-kaarten.
// =====================================================================
(function MRBGoldDashboardV81(){
  'use strict';

  const K = {
    on: 'mrb_v8_dashboard_on',
    manualRank: 'mrb_v8_dashboard_manual_rank_pct',
    useManual: 'mrb_v8_dashboard_use_manual_rank',
    rate: 'mrb_v8_dashboard_rank_rate_per_hour',
    autoRate: 'mrb_v8_dashboard_auto_rate_per_hour',
    useAutoRate: 'mrb_v8_dashboard_use_auto_rate',
    sample: 'mrb_v8_dashboard_rank_sample',
    moneySample: 'mrb_v81_money_sample',
    carsSample: 'mrb_v81_cars_sample',
    boozenSample: 'mrb_v81_boozen_sample'
  };

  const state = {
    running: !!GM_Get(K.on, true),
    useManual: !!GM_Get(K.useManual, false),
    manualRank: Number(GM_Get(K.manualRank, 0)) || 0,
    rate: Number(GM_Get(K.rate, 0.50)) || 0.50,
    autoRate: Number(GM_Get(K.autoRate, 0)) || 0,
    useAutoRate: !!GM_Get(K.useAutoRate, false),
    lastDetectedRank: null
  };

  const block = addBlock(`
    <h4>Dashboard</h4>
    <div id="mrbV81DashRoot"></div>
  `, '00-dashboard-rank');

  const root = block.querySelector('#mrbV81DashRoot');

  function clean(s){ return String(s || '').replace(/\s+/g, ' ').trim(); }
  function parseNum(v, fallback=0){
    const s = String(v ?? '').trim().replace(',', '.');
    if (s === '') return fallback;
    const n = Number(s);
    return Number.isFinite(n) ? n : fallback;
  }
  function clamp(n, lo, hi){
    n = Number(n);
    if (!Number.isFinite(n)) return lo;
    return Math.max(lo, Math.min(hi, n));
  }
  function fmtNum(n, digits=2){
    return Number(n || 0).toLocaleString('nl-NL', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }
  function fmtMoney(n){
    if (!Number.isFinite(n)) return '-';
    return '$ ' + Math.round(n).toLocaleString('nl-NL');
  }
  function create(tag, attrs={}, children=[]){
    const el = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs || {})){
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'style') el.setAttribute('style', v);
      else el.setAttribute(k, v);
    }
    for (const child of children){
      if (child == null) continue;
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else el.appendChild(child);
    }
    return el;
  }

  function injectStyle(){
    if (document.getElementById('mrbV81DashboardStyle')) return;
    GM_addStyle(`
      #mrbV81DashRoot{display:flex;flex-direction:column;gap:8px;}
      #mrbV81DashRoot .v81-topbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
      #mrbV81DashRoot .v81-panel{padding:8px;border-radius:13px;border:1px solid rgba(255,214,102,.18);background:rgba(0,0,0,.18);}
      #mrbV81DashRoot .v81-field-grid{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:6px 8px;}
      #mrbV81DashRoot .v81-field-grid label{white-space:nowrap;}
      #mrbV81DashRoot .v81-field-grid input[type="text"]{width:86px !important;}
      #mrbV81DashRoot .v81-cards{display:grid;grid-template-columns:1fr;gap:7px;}
      #mrbV81DashRoot .v81-card{padding:9px;border-radius:13px;border:1px solid rgba(255,214,102,.22);background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.025));box-shadow:0 5px 15px rgba(0,0,0,.22);}
      #mrbV81DashRoot .v81-card-title{color:#ffe08a;font-weight:900;font-size:12px;margin-bottom:4px;letter-spacing:.2px;}
      #mrbV81DashRoot .v81-card-big{font-size:18px;font-weight:900;color:#fff1b0;line-height:1.15;min-height:20px;}
      #mrbV81DashRoot .v81-card-sub{font-size:11px;opacity:.82;margin-top:3px;line-height:1.35;min-height:14px;}
      #mrbV81DashRoot .v81-mini-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px;align-items:center;}
      #mrbV81DashRoot input[type="text"]{appearance:textfield !important;-webkit-appearance:none !important;pointer-events:auto !important;user-select:text !important;-webkit-user-select:text !important;cursor:text !important;}
      #mrbV81DashRoot input::-webkit-outer-spin-button,#mrbV81DashRoot input::-webkit-inner-spin-button{-webkit-appearance:none !important;margin:0 !important;}
    `);
  }

  function formatDuration(ms){
    if (!Number.isFinite(ms) || ms < 0) return '-';
    const totalMin = Math.ceil(ms / 60000);
    const days = Math.floor(totalMin / 1440);
    const hours = Math.floor((totalMin % 1440) / 60);
    const mins = totalMin % 60;
    if (days > 0) return `${days}d ${hours}u ${mins}m`;
    if (hours > 0) return `${hours}u ${mins}m`;
    return `${mins}m`;
  }
  function formatEndTime(ms){
    if (!Number.isFinite(ms) || ms < 0) return '-';
    const d = new Date(Date.now() + ms);
    return d.toLocaleString('nl-NL', { weekday:'short', hour:'2-digit', minute:'2-digit', day:'2-digit', month:'2-digit' });
  }

  function parseRankFromText(text){
    text = clean(text);
    const patterns = [
      /rangvordering[^0-9]{0,40}([0-9]{1,3}(?:[.,][0-9]{1,3})?)\s*%/i,
      /([0-9]{1,3}(?:[.,][0-9]{1,3})?)\s*%\s*rangvordering/i
    ];
    for (const re of patterns){
      const m = text.match(re);
      if (!m) continue;
      const v = parseNum(m[1], NaN);
      if (Number.isFinite(v) && v >= 0 && v <= 100) return v;
    }
    return null;
  }
  function findRankPercent(){
    const rootEl = document.querySelector('#game_container') || document.body;
    if (!rootEl) return null;
    const nodes = Array.from(rootEl.querySelectorAll('*'));
    for (const el of nodes){
      const txt = clean(el.innerText || el.textContent || '');
      if (!/rangvordering/i.test(txt)) continue;
      const direct = parseRankFromText(txt);
      if (direct != null) return direct;
      const row = el.closest('tr, .row, div, li, p');
      if (row) {
        const rowVal = parseRankFromText(row.innerText || row.textContent || '');
        if (rowVal != null) return rowVal;
      }
      const next = el.nextElementSibling;
      if (next) {
        const m = clean(next.innerText || next.textContent || '').match(/([0-9]{1,3}(?:[.,][0-9]{1,3})?)\s*%/);
        if (m) {
          const v = parseNum(m[1], NaN);
          if (Number.isFinite(v) && v >= 0 && v <= 100) return v;
        }
      }
    }
    return parseRankFromText(rootEl.innerText || rootEl.textContent || '');
  }

  function readMoney(){
    const root = document.querySelector('#game_container') || document.body;
    const txt = clean(root.innerText || '');

    // Meest betrouwbaar: pak alle geldbedragen op de huidige pagina en neem de hoogste waarde.
    // Dit werkt voor Information, crimes/cars-resultaten en de meeste BF-layouts.
    const matches = Array.from(txt.matchAll(/\$\s*([0-9][0-9.,]*)/g))
      .map(m => parseNum(m[1].replace(/\./g,''), NaN))
      .filter(Number.isFinite);

    return matches.length ? Math.max(...matches) : null;
  }

  function dashNum(key, def=0){
    const v = Number(GM_Get(key, def));
    return Number.isFinite(v) ? v : def;
  }

  function perHourTotal(total, firstTs){
    total = Number(total || 0);
    firstTs = Number(firstTs || 0);
    if (!total || !firstTs) return null;
    const hours = Math.max((Date.now() - firstTs) / 3600000, 1 / 60); // eerste minuut: geen oneindige piek
    return total / hours;
  }

  function moneyPerHourTotal(totalMoney, firstTs){
    totalMoney = Number(totalMoney || 0);
    firstTs = Number(firstTs || 0);
    if (!totalMoney || !firstTs) return null;
    const hours = Math.max((Date.now() - firstTs) / 3600000, 1 / 60);
    return totalMoney / hours;
  }
  function getSample(key){
    try {
      const raw = GM_Get(key, '');
      if (!raw) return null;
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch(e) { return null; }
  }
  function setSample(key, sample){
    try { GM_Set(key, JSON.stringify(sample)); } catch(e) {}
  }
  function resetAllDashboard(){
    state.autoRate = 0;
    state.lastDetectedRank = null;
    GM_Set(K.autoRate, 0);
    GM_Set(K.sample, '');
    GM_Set(K.moneySample, '');
    GM_Set(K.carsSample, '');
    GM_Set(K.boozenSample, '');
    try { unsafeWindow.mrbDashMetrics?.reset?.(); } catch(e) {}
    updateUI();
  }
  function perHourFromSample(key, currentValue){
    if (currentValue == null || !Number.isFinite(currentValue)) return null;
    const now = Date.now();
    const prev = getSample(key);
    if (!prev || !Number.isFinite(prev.value) || !Number.isFinite(prev.ts)) {
      setSample(key, { value: currentValue, ts: now });
      return null;
    }
    const dt = now - prev.ts;
    if (dt < 2 * 60 * 1000) return null;
    const diff = currentValue - prev.value;
    if (diff < 0) {
      setSample(key, { value: currentValue, ts: now });
      return null;
    }
    const rate = diff / (dt / 3600000);
    if (dt >= 15 * 60 * 1000) setSample(key, { value: currentValue, ts: now });
    return rate;
  }
  function updateAutoRate(currentRank){
    if (currentRank == null) return;
    const now = Date.now();
    const prev = getSample(K.sample);
    const windowMs = 15 * 60 * 1000;
    if (!prev || !Number.isFinite(prev.rank) || !Number.isFinite(prev.ts)) {
      setSample(K.sample, { rank: currentRank, ts: now });
      return;
    }
    const dt = now - prev.ts;
    const diff = currentRank - prev.rank;
    if (diff < -1) {
      setSample(K.sample, { rank: currentRank, ts: now });
      return;
    }
    if (dt < windowMs) return;
    if (diff > 0 && diff < 100) {
      const measured = diff / (dt / 3600000);
      if (measured > 0 && measured < 100) {
        state.autoRate = state.autoRate > 0 ? (state.autoRate * 0.60 + measured * 0.40) : measured;
        GM_Set(K.autoRate, state.autoRate);
      }
    }
    setSample(K.sample, { rank: currentRank, ts: now });
  }
  function autoMeasureInfo(){
    const sample = getSample(K.sample);
    if (!sample || !Number.isFinite(sample.rank) || !Number.isFinite(sample.ts)) {
      return { main:'Geen startpunt', sub:'Startpunt wordt gezet zodra Rangvordering wordt gevonden.' };
    }
    const elapsed = Date.now() - sample.ts;
    const windowMs = 15 * 60 * 1000;
    const remaining = Math.max(0, windowMs - elapsed);
    if (remaining > 0) return { main:`Nog ${formatDuration(remaining)}`, sub:`Gemeten: ${formatDuration(elapsed)} • Start: ${Number(sample.rank).toFixed(2)}%` };
    return { main:'15 min gehaald', sub:`Berekening volgt bij update • Start: ${Number(sample.rank).toFixed(2)}%` };
  }

  const ui = {};
  function card(title){
    const big = create('div', { class:'v81-card-big', text:'-' });
    const sub = create('div', { class:'v81-card-sub', text:'-' });
    const el = create('div', { class:'v81-card' }, [create('div', { class:'v81-card-title', text:title }), big, sub]);
    return { el, big, sub };
  }

  function buildUI(){
    injectStyle();
    root.textContent = '';
    ui.toggle = create('button', { class:'gm-btn', type:'button', text: state.running ? 'Stop' : 'Start' });
    ui.status = create('div', { class:'gm-status', style:'margin:0;' });
    const topbar = create('div', { class:'v81-topbar' }, [ui.toggle, ui.status]);

    ui.useManual = create('input', { type:'checkbox' });
    ui.useManual.checked = !!state.useManual;
    ui.manualRank = create('input', { type:'text', inputmode:'decimal', autocomplete:'off', spellcheck:'false', value:String(state.manualRank).replace('.', ',') });
    ui.manualRankEdit = create('button', { class:'gm-btn', type:'button', text:'Wijzig' });
    ui.rate = create('input', { type:'text', inputmode:'decimal', autocomplete:'off', spellcheck:'false', value:String(state.rate).replace('.', ',') });
    ui.rateEdit = create('button', { class:'gm-btn', type:'button', text:'Wijzig' });
    ui.useAutoRate = create('input', { type:'checkbox' });
    ui.useAutoRate.checked = !!state.useAutoRate;

    ui.save = create('button', { class:'gm-btn', type:'button', text:'Save' });
    ui.reset = create('button', { class:'gm-btn', type:'button', text:'Reset meting' });
    ui.resetAll = create('button', { class:'gm-btn', type:'button', text:'Reset Dashboard' });
    ui.measureNow = create('button', { class:'gm-btn', type:'button', text:'Nu opnieuw meten' });

    const fieldGrid = create('div', { class:'v81-field-grid' }, [
      create('label', {}, [ui.useManual, ' handmatig %']), create('div', { class:'v81-mini-row' }, [ui.manualRank, ui.manualRankEdit]),
      create('label', { text:'% / uur' }), create('div', { class:'v81-mini-row' }, [ui.rate, ui.rateEdit]),
      create('label', {}, [ui.useAutoRate, ' auto meten']),
      create('div', { class:'v81-mini-row' }, [ui.save, ui.reset, ui.resetAll, ui.measureNow])
    ]);

    const inputsPanel = create('div', { class:'v81-panel' }, [fieldGrid]);

    ui.rank = card('📈 Rangvordering');
    ui.speed = card('⚡ Snelheid');
    ui.eta = card('⏳ Tijd tot 100%');
    ui.auto = card('🧭 Auto-meting');
    ui.money = card('💰 Geld per uur');
    ui.cars = card('🚗 Cars per uur');
    ui.boozen = card('🥃 Boozen winst');

    const cards = create('div', { class:'v81-cards' }, [ui.rank.el, ui.speed.el, ui.eta.el, ui.auto.el, ui.money.el, ui.cars.el, ui.boozen.el]);

    root.appendChild(topbar);
    root.appendChild(inputsPanel);
    root.appendChild(cards);
    bindEvents();
    updateUI();
  }

  function readInputState(){
    state.useManual = !!ui.useManual.checked;
    state.useAutoRate = !!ui.useAutoRate.checked;
    state.manualRank = clamp(parseNum(ui.manualRank.value, state.manualRank), 0, 100);
    state.rate = clamp(parseNum(ui.rate.value, state.rate), 0, 100);
  }
  function persistSettings(){
    readInputState();
    GM_Set(K.useManual, state.useManual);
    GM_Set(K.useAutoRate, state.useAutoRate);
    GM_Set(K.manualRank, state.manualRank);
    GM_Set(K.rate, state.rate);
    ui.manualRank.value = String(state.manualRank).replace('.', ',');
    ui.rate.value = String(state.rate).replace('.', ',');
    updateUI();
  }
  function protectInput(input){
    if (!input) return false;

    // Voorkomt dat het menu/drag-systeem toetsen of muisklikken onderschept.
    ['mousedown','mouseup','click','dblclick','pointerdown','pointerup','touchstart','touchend','keydown','keypress','keyup','input','paste','copy','cut','wheel'].forEach(type => {
      input.addEventListener(type, e => {
        e.stopPropagation();
      }, true);
    });

    input.addEventListener('focus', () => {
      input.dataset.mrbEditing = '1';
    });

    input.addEventListener('blur', () => {
      input.dataset.mrbEditing = '0';
    });

    // Extra: klik selecteert niet automatisch alles, cursor blijft normaal bruikbaar.
    input.addEventListener('click', e => {
      e.stopPropagation();
      input.focus();
    }, true);
  }

  function askNumber(label, current, min, max){
    const raw = window.prompt(label + '\nJe mag komma of punt gebruiken.', String(current).replace('.', ','));
    if (raw == null) return null;

    const n = clamp(parseNum(raw, NaN), min, max);
    if (!Number.isFinite(n)) {
      alert('Ongeldige waarde.');
      return null;
    }

    return n;
  }

  function editManualRank(){
    const n = askNumber('Vul je handmatige Rangvordering % in:', state.manualRank, 0, 100);
    if (n == null) return;

    state.manualRank = n;
    state.useManual = true;
    ui.useManual.checked = true;
    ui.manualRank.value = String(n).replace('.', ',');

    GM_Set(K.manualRank, state.manualRank);
    GM_Set(K.useManual, state.useManual);

    updateUI();
  }

  function editRate(){
    const n = askNumber('Vul je % per uur in:', state.rate, 0, 100);
    if (n == null) return;

    state.rate = n;
    ui.rate.value = String(n).replace('.', ',');

    GM_Set(K.rate, state.rate);

    updateUI();
  }

  function bindEvents(){
    protectInput(ui.manualRank);
    protectInput(ui.rate);

    ui.toggle.addEventListener('click', () => {
      state.running = !state.running;
      GM_Set(K.on, state.running);
      updateUI();
    });
    ui.save.addEventListener('click', persistSettings);
    ui.manualRankEdit.addEventListener('click', editManualRank);
    ui.rateEdit.addEventListener('click', editRate);
    ui.reset.addEventListener('click', () => {
      state.autoRate = 0;
      GM_Set(K.autoRate, 0);
      GM_Set(K.sample, '');
      updateUI();
    });
    ui.resetAll.addEventListener('click', resetAllDashboard);
    ui.measureNow.addEventListener('click', () => {
      const current = findRankPercent();
      const rank = state.useManual ? state.manualRank : current;
      if (rank != null) {
        setSample(K.sample, { rank, ts: Date.now() });
        state.autoRate = 0;
        GM_Set(K.autoRate, 0);
      }
      updateUI();
    });
    ui.useManual.addEventListener('change', persistSettings);
    ui.useAutoRate.addEventListener('change', persistSettings);
    [ui.manualRank, ui.rate].forEach(input => {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          persistSettings();
          try { input.blur(); } catch(e) {}
        }
      });
      input.addEventListener('blur', persistSettings);
      input.addEventListener('input', () => {});
    });
  }

  function setTextIfChanged(el, value){
    if (!el) return;
    const next = String(value ?? '');
    if (el.textContent !== next) el.textContent = next;
  }

  function setHtmlIfChanged(el, value){
    if (!el) return;
    const next = String(value ?? '');
    if (el.innerHTML !== next) el.innerHTML = next;
  }

  function dashboardVisible(){
    return !!root && root.isConnected && !block.classList.contains('gm-collapsed') && !block.classList.contains('gm-category-hidden');
  }

  function updateUI(){
    if (!ui.toggle) return;
    setTextIfChanged(ui.toggle, state.running ? 'Stop' : 'Start');
    setHtmlIfChanged(ui.status, state.running ? '<span class="ok">✅ Actief</span>' : '<span class="bad">⛔</span>');
    if (!state.running) {
      [ui.rank, ui.speed, ui.eta, ui.auto, ui.money, ui.cars, ui.boozen].forEach(c => { setTextIfChanged(c.big, '-'); setTextIfChanged(c.sub, 'Dashboard staat uit.'); });
      return;
    }
    // Wanneer het dashboard ingeklapt of door een categorie verborgen is,
    // blijft alleen de knopstatus actueel; dure pagina-metingen wachten tot zichtbaar.
    if (!dashboardVisible()) return;

    const detected = findRankPercent();
    if (detected != null) {
      state.lastDetectedRank = detected;
      updateAutoRate(detected);
    }
    const rank = state.useManual ? state.manualRank : state.lastDetectedRank;
    const effectiveRate = state.useAutoRate && state.autoRate > 0 ? state.autoRate : state.rate;

    if (rank == null) {
      setTextIfChanged(ui.rank.big, 'Niet gevonden');
      setTextIfChanged(ui.rank.sub, 'Open info/profiel met Rangvordering of gebruik handmatig %.');
    } else {
      const remaining = Math.max(0, 100 - rank);
      setTextIfChanged(ui.rank.big, `${fmtNum(rank, 2)}%`);
      setTextIfChanged(ui.rank.sub, `${state.useManual ? 'Handmatig' : 'Automatisch gelezen'} • Nog ${fmtNum(remaining, 2)}%`);
    }

    setTextIfChanged(ui.speed.big, effectiveRate > 0 ? `${fmtNum(effectiveRate, 3)}%/u` : '-');
    setTextIfChanged(ui.speed.sub, state.useAutoRate && state.autoRate > 0 ? `Auto gemeten • Laatste ${fmtNum(state.autoRate, 3)}%/u` : 'Handmatige snelheid');

    if (rank != null && effectiveRate > 0) {
      const remaining = Math.max(0, 100 - rank);
      const ms = (remaining / effectiveRate) * 3600000;
      setTextIfChanged(ui.eta.big, formatDuration(ms));
      setTextIfChanged(ui.eta.sub, `Verwacht klaar: ${formatEndTime(ms)}`);
    } else {
      setTextIfChanged(ui.eta.big, '-');
      setTextIfChanged(ui.eta.sub, 'Vul % / uur in.');
    }

    const auto = autoMeasureInfo();
    setTextIfChanged(ui.auto.big, auto.main);
    setTextIfChanged(ui.auto.sub, auto.sub);

    const money = readMoney();
    const mph = perHourFromSample(K.moneySample, money);
    setTextIfChanged(ui.money.big, mph != null ? fmtMoney(mph) + '/u' : '-');
    setTextIfChanged(ui.money.sub, money != null
      ? (mph != null ? `Huidig: ${fmtMoney(money)} • meting vanaf 2 min verschil` : `Huidig: ${fmtMoney(money)} • startpunt gezet, wacht ±2 min`)
      : 'Nog geen geldwaarde gevonden.');

    const carsTotal = dashNum('mrb_dash_cars_success_total', 0);
    const carsFirst = dashNum('mrb_dash_cars_success_first_ts', 0);
    const carsPerHour = perHourTotal(carsTotal, carsFirst);
    setTextIfChanged(ui.cars.big, carsPerHour != null ? `${fmtNum(carsPerHour, 2)}/u` : '-');
    setTextIfChanged(ui.cars.sub, carsTotal > 0
      ? `Succesvol gestolen sinds reset: ${carsTotal}`
      : 'Nog geen succesvolle car-jatpoging gemeten.');

    const boozenProfit = dashNum('mrb_dash_boozen_profit_total', 0);
    const boozenFirst = dashNum('mrb_dash_boozen_profit_first_ts', 0);
    const boozenPerHour = moneyPerHourTotal(boozenProfit, boozenFirst);
    setTextIfChanged(ui.boozen.big, boozenProfit > 0 ? `${fmtMoney(boozenProfit)}` : '-');
    setTextIfChanged(ui.boozen.sub, boozenPerHour != null
      ? `Gemiddeld: ${fmtMoney(boozenPerHour)}/u sinds reset`
      : 'Nog geen Boozen winst gemeten.');
  }

  function start(){
    buildUI();
    let updateTimer = 0;
    const scheduleUpdate = (delay=350) => {
      clearTimeout(updateTimer);
      if (document.activeElement && root.contains(document.activeElement)) return;
      updateTimer = setTimeout(updateUI, delay);
    };
    const observer = new MutationObserver(mutations => {
      // Alleen structurele spelwijzigingen zijn relevant; tekstanimaties en klokjes niet.
      if (mutations.some(m => m.type === 'childList')) scheduleUpdate();
    });
    // Beperk de observer tot het spelgebied. Het MRB-menu zelf hoeft het dashboard
    // niet telkens opnieuw te laten meten en renderen.
    const gameRoot = document.querySelector('#game_container, #content, main') || document.body;
    if (gameRoot) observer.observe(gameRoot, { childList:true, subtree:true });
    mrbSetInterval(updateUI, 5000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();
})();

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
  const K_POPUP = 'mrb_captcha_alert_popup_on';
  const K_SOUND = 'mrb_captcha_alert_sound_on';

  let on = !!GM_Get(K_ON, true);
  let intervalSec = Number(GM_Get(K_INTERVAL_SEC, 10));
  if (!Number.isFinite(intervalSec) || intervalSec < 2) intervalSec = 10;

  let popupOn = !!GM_Get(K_POPUP, true);
  let soundOn = !!GM_Get(K_SOUND, true);

  let audioCtx = null;
  let alarmTimer = null;
  let scanTimer = null;
  let lastBeep = 0;
  let lastPopup = 0;
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

    <div class="gm-row" style="align-items:center;gap:8px;margin-top:6px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input id="mrbCaptchaPopup" type="checkbox" ${popupOn ? 'checked' : ''}>
        Popup melding
      </label>
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
  }

  function sendPopup(force=false){
    if (!popupOn) return;
    if (!force && Date.now() - lastPopup < 60_000) return;
    lastPopup = Date.now();

    const title = 'MRB Gold: Captcha actief';
    const body = 'Er staat een captcha/human-check open op: ' + pageName();

    try {
      if (typeof GM_notification === 'function') {
        GM_notification({
          title,
          text: body,
          timeout: 10000,
          onclick: function(){ try { window.focus(); } catch(e) {} }
        });
        return;
      }
    } catch(e) {}

    if (force) {
      try { alert(title + '\n\n' + body); } catch(e) {}
    }
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
    const p = block.querySelector('#mrbCaptchaPopup');
    const s = block.querySelector('#mrbCaptchaSound');

    intervalSec = Math.max(2, Math.min(120, Math.floor(Number(i?.value || 10))));
    popupOn = !!p?.checked;
    soundOn = !!s?.checked;

    GM_Set(K_INTERVAL_SEC, intervalSec);
    GM_Set(K_POPUP, popupOn);
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
      sendPopup(false);

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
        sendPopup(false);
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

  ['#mrbCaptchaIntervalSec', '#mrbCaptchaPopup', '#mrbCaptchaSound'].forEach(sel => {
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

    if (document.documentElement) {
      mo.observe(document.documentElement, {
        childList:true,
        subtree:true,
        characterData:true,
        attributes:true,
        attributeFilter:['src','style','class','id']
      });
    }

    scanTimer = mrbSetInterval(tick, 1000);
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
// - BG STIPT kan Crimes, Cars, Race, Heist en andere flows niet meer onderbreken.
// - Het vervolgslot vervalt zodra de module op de doelpagina zonder nieuwe navigatie heeft gedraaid.
// - Bodyguard Trainer wacht kort na navigatie van een andere module.
// - Crimes en andere modules krijgen daardoor tijd om hun pagina-actie af te ronden.
// - paint() plant de BG-taak niet meer telkens opnieuw op "nu".
// - STIPT blijft actief zodra de pagina stabiel is en de BG-timer gereed is.
// - BG navigeert alleen wanneer een echte training/aankoop gereedstaat.
// - Zonder openstaande BG-actie blijven Crimes, Cars, Race en Heist ongemoeid.
// =====================================================================
// =====================================================================
// MRB BODYGUARD TRAINER v10.1.6
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
      result[name]={id,att:level(name,'att',ap),def:level(name,'def',dp),weapon,vest};
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
    if(o.att<t.att)return ['train_attack',`aanval ${o.att}/${t.att}`];
    if(o.def<t.def)return ['train_defense',`verdediging ${o.def}/${t.def}`];
    // Bewust niet aftrainen: bestaande hogere niveaus blijven behouden.
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
    // Daardoor kan hij Crimes/Cars/Race/Heist niet meer door alleen navigatie storen.
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

  function registerPlannerTask(){
    const spec={
      module:'Bodyguard Trainer',
      task:{
        id:'v10-bodyguard-trainer', title:'Bodyguard Trainer', module:'Bodyguard Trainer',
        priority:plannerPriority(), nextAt:nextDueAt(), enabled:!!on, requiresNavigation:true, requiresAction:true,
        run:plannerStep
      },
      onConnect(planner){ plannerManaged=true; syncPlanner(); paint(); }
    };
    if(unsafeWindow.mrbV10Registration?.register){ unsafeWindow.mrbV10Registration.register(spec); return true; }
    const p=unsafeWindow.mrbV9Planner;
    if(p?.registerTask){ p.registerTask(spec.task); spec.onConnect(p); return true; }
    return false;
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
  registerPlannerTask();
  mrbSetInterval(()=>{
    paint();
    if(on&&!plannerManaged) tick();
  },3000);
})();

// =====================================================================
// MRB D&D TRADE ROUTE
// Koopt Rum+Cocaine in stad met laagste cocaineprijs,
// reist na travel timer naar stad met hoogste cocaineprijs en verkoopt daar.
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
    nextCheckTs = 0;
    GM_Set(K_NEXT_CHECK, 0);
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

  // Nieuwe reizen zijn alleen toegestaan buiten de prijswissel-/veiligheidsmarges.
  // Toegestaan: minuut 01 t/m 27 en 31 t/m 57.
  // Geblokkeerd: minuut 00, 28 t/m 30 en 58 t/m 59.
  function dndTravelWindowState(ts = Date.now()){
    const d = new Date(ts);
    const minute = d.getMinutes();
    const allowed = (minute >= 1 && minute <= 27) || (minute >= 31 && minute <= 57);
    if (allowed) return { allowed:true, waitMs:0, nextAt:ts, label:'reisvenster open' };

    const next = new Date(d);
    next.setSeconds(0, 0);
    if (minute === 0) {
      next.setMinutes(1);
    } else if (minute >= 28 && minute <= 30) {
      next.setMinutes(31);
    } else {
      next.setHours(next.getHours() + 1);
      next.setMinutes(1);
    }
    const nextAt = next.getTime();
    return { allowed:false, waitMs:Math.max(1000, nextAt - ts), nextAt, label:`reizen toegestaan vanaf ${String(next.getHours()).padStart(2,'0')}:${String(next.getMinutes()).padStart(2,'0')}` };
  }

  function dndTravelWindowOpen(){
    return dndTravelWindowState().allowed;
  }

  function nextHalfHourTs(from = Date.now()){
    const d = new Date(from);
    d.setSeconds(0, 0);

    const m = d.getMinutes();
    if (m < 30) {
      d.setMinutes(30);
    } else {
      d.setHours(d.getHours() + 1);
      d.setMinutes(0);
    }

    // Kleine marge zodat de nieuwe prijzen zeker geladen zijn.
    return d.getTime() + 8000;
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
      const windowState = dndTravelWindowState();
      if (!windowState.allowed) {
        revokeTravelNavigation();
        setCoreStage('WAIT_TRAVEL_WINDOW', coreTargetCity);
        coreLastError = `Travel geblokkeerd: ${windowState.label}`;
        ui(`${windowState.label} (${formatWait(windowState.waitMs)})`);
        return false;
      }
      const flightState = getFlightState();
      const authorized = Date.now() <= travelAuthorizationUntil;
      if (!flightState.ready || !authorized) {
        revokeTravelNavigation();
        if (!flightState.ready) setRetryAfterFlight(flightState.waitMs || syncedFlightWaitMs() || 60_000, flightState.reason);
        setCoreStage(flightState.fresh ? 'WAIT_TRAVEL_TIMER' : 'WAIT_TIMER_SYNC', coreTargetCity);
        coreLastError = !flightState.ready
          ? `Travel geblokkeerd: ${flightState.reason}`
          : 'Travel geblokkeerd: geen actuele D&D-autorisatie';
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

  function readCocainePricesFromTravel(){
    const root = document.querySelector('#game_container') || document.body;
    const tables = Array.from(root.querySelectorAll('table'));

    for (const table of tables){
      const rows = Array.from(table.querySelectorAll('tr'));
      if (!rows.length) continue;

      let cocaineIndex = -1;
      let headerRowIndex = -1;

      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++){
        const cells = Array.from(rows[rowIndex].querySelectorAll('th,td'));
        const normalized = cells.map(cell => normalizeDnDText(cell.textContent));
        const idx = normalized.findIndex(text => text === 'cocaine');
        if (idx >= 0){
          cocaineIndex = idx;
          headerRowIndex = rowIndex;
          break;
        }
      }

      if (cocaineIndex < 0) continue;

      const results = [];
      for (let rowIndex = headerRowIndex + 1; rowIndex < rows.length; rowIndex++){
        const cells = Array.from(rows[rowIndex].querySelectorAll('th,td'));
        if (cells.length <= cocaineIndex) continue;

        const firstCell = clean(cells[0]?.textContent || '');
        const normalizedCity = normalizeDnDText(firstCell);
        const city = CITY_NAMES.find(name => normalizeDnDText(name) === normalizedCity);
        if (!city) continue;

        const price = parseMoney(cells[cocaineIndex]?.textContent || '');
        if (price != null && price > 0) results.push({ city, price });
      }

      if (results.length >= 2) return results;
    }

    // Fallback voor layouts waarin de prijstabel geen normale TH-structuur heeft.
    const allRows = Array.from(root.querySelectorAll('tr'));
    let cocaineIndex = -1;
    for (const row of allRows){
      const cells = Array.from(row.querySelectorAll('th,td'));
      const idx = cells.findIndex(cell => normalizeDnDText(cell.textContent) === 'cocaine');
      if (idx >= 0){ cocaineIndex = idx; break; }
    }
    if (cocaineIndex < 0) return [];

    const fallback = [];
    for (const row of allRows){
      const cells = Array.from(row.querySelectorAll('th,td'));
      if (cells.length <= cocaineIndex) continue;
      const city = CITY_NAMES.find(name => normalizeDnDText(name) === normalizeDnDText(cells[0]?.textContent));
      if (!city) continue;
      const price = parseMoney(cells[cocaineIndex]?.textContent || '');
      if (price != null && price > 0) fallback.push({ city, price });
    }
    return fallback;
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
    const inventory = { rum:null, cocaine:null, total:null };

    for (const tr of rows){
      const cells = Array.from(tr.querySelectorAll('td, th')).map(td => clean(td.textContent));
      if (cells.length < 3) continue;
      const item = String(cells[0] || '').toLowerCase();
      const held = parseMoney(cells[2]);
      if (held == null) continue;
      if (/^rum$/.test(item)) inventory.rum = Math.max(0, held);
      if (/^coca[iï]ne$|^cocaine$/.test(item)) inventory.cocaine = Math.max(0, held);
    }

    if (inventory.rum != null || inventory.cocaine != null){
      inventory.total = Math.max(0, inventory.rum || 0) + Math.max(0, inventory.cocaine || 0);
    }
    return inventory;
  }

  function syncPhaseFromInventory(reason='voorraadcontrole'){
    if (!onSmugglingPage()) return false;
    const inventory = readSmugglingInventory();
    if (inventory.total == null) return false;

    // Verander pas van fase als BEIDE producten de huidige fase hebben voltooid.
    // Zo wordt een geslaagde Rum-aankoop niet verkocht wanneer Cocaine faalde.
    let desired = phase;
    if (phase === 'buy' && inventoryBuyComplete(inventory)) desired = 'sell';
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

  function chooseTarget(prices){
    if (!prices.length) return null;
    const sorted = prices.slice().sort((a,b) => phase === 'buy' ? a.price - b.price : b.price - a.price);
    return sorted[0];
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
    inventory = inventory || {rum:0,cocaine:0,total:0};
    if (phase === 'buy') {
      return {
        rum: Math.max(0, rumAmount - Number(inventory.rum || 0)),
        cocaine: Math.max(0, cokeAmount - Number(inventory.cocaine || 0))
      };
    }
    return {
      rum: Math.max(0, Number(inventory.rum || 0)),
      cocaine: Math.max(0, Number(inventory.cocaine || 0))
    };
  }

  function tradePlanComplete(plan){
    return !plan || (Number(plan.rum || 0) === 0 && Number(plan.cocaine || 0) === 0);
  }

  function fillSmugglingAmounts(plan=null){
    const rum = findTradeInput(/^rum$/i, 'rum');
    const coke = findTradeInput(/^coca[iï]ne$|^cocaine$/i, 'cocaine');
    if (!rum || !coke) return false;

    const actualPlan = plan || buildTradePlan(readSmugglingInventory());
    const modeOk = setBuySellMode(phase);
    const rumOk = setInput(rum, actualPlan.rum);
    const cokeOk = setInput(coke, actualPlan.cocaine);
    return modeOk && rumOk && cokeOk;
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

  function clickSmugglingSubmit(){
    const form = findSmugglingForm();
    const btn = findSmugglingSubmit();
    if (!form || !btn || btn.disabled) return false;

    // De website verwacht één normale gebruikersklik. Meerdere opeenvolgende
    // click/requestSubmit/Enter-acties kunnen dezelfde transactie annuleren
    // of met inmiddels lege velden opnieuw versturen.
    try { btn.scrollIntoView({block:'center', inline:'center'}); } catch(e) {}
    try { btn.focus({preventScroll:true}); } catch(e) { try { btn.focus(); } catch(_) {} }

    try {
      btn.click();
      return true;
    } catch(e) {}

    // Alleen als een gewone klik technisch niet mogelijk was, één fallback.
    try {
      if (form.requestSubmit && /^(submit|image)$/i.test(String(btn.type || ''))){
        form.requestSubmit(btn);
        return true;
      }
    } catch(e) {}

    return false;
  }

  function inventorySignature(inv){
    if (!inv || inv.total == null) return null;
    return `${Number(inv.rum || 0)}:${Number(inv.cocaine || 0)}`;
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
      const plan = buildTradePlan(beforeInventory);

      if (tradePlanComplete(plan)) break;

      setCoreStage(completedPhase === 'buy' ? 'BUY_PARTIAL' : 'SELL_PARTIAL', coreTargetCity,
        `${plan.rum} Rum / ${plan.cocaine} Cocaine resterend`);
      ui(`${completedPhase === 'buy' ? 'kopen' : 'verkopen'}: nog ${plan.rum} Rum / ${plan.cocaine} Cocaine`);

      if (!fillSmugglingAmounts(plan)){
        await sleep(800);
        dndTouchAction();
        if (!fillSmugglingAmounts(plan)) {
          coreLastError = 'Rum/Cocaine invoervelden niet beschikbaar';
          setCoreStage('ERROR', coreTargetCity, coreLastError);
          return false;
        }
      }

      await sleep(500);
      const beforeSig = inventorySignature(beforeInventory);
      if (!clickSmugglingSubmit()) {
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
    const fullyCompleted = completedPhase === 'buy'
      ? inventoryBuyComplete(finalInventory)
      : inventorySellComplete(finalInventory);

    if (!fullyCompleted) {
      const remain = buildTradePlan(finalInventory);
      coreLastError = `deeltransactie open: ${remain.rum} Rum / ${remain.cocaine} Cocaine`;
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
        : 'Rum en Cocaine volledig verkocht; wacht op volgende prijswissel');
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
    if (!onTravelPage()){
      if (!loadPage('/?module=Travel')) return;
      await sleep(2000);
    }

    const prices = readCocainePricesFromTravel();
    if (!prices.length){
      coreLastError = 'cocaineprijzen niet leesbaar';
      setCoreStage('ERROR', null, coreLastError);
      ui('kan cocaine prijzen niet lezen');
      await sleep(5000);
      return;
    }

    const target = chooseTarget(prices);
    if (!target){
      ui('geen targetstad');
      await sleep(5000);
      return;
    }

    setPendingAction(target.city, phase);
    const actionText = phase === 'buy' ? 'koopstad' : 'verkoopstad';
    ui(`${actionText}: ${target.city} ($${target.price})`);

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
      if (!priceCheckDue() && !hourlyBuyPending()){
        if (!onSmugglingPage()) {
          await waitForSmugglingForm(12000);
          syncPhaseFromInventory('voorraad voor wachttijd');
        }
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
    const needsNewTravel = !pendingTravel || !currentCityForWait || currentCityForWait !== pendingTravel.city;
    if (!travelWindow.allowed && needsNewTravel) {
      revokeTravelNavigation();
      setCoreStage('WAIT_TRAVEL_WINDOW', pendingTravel?.city || coreTargetCity);
      dndReleaseAction();
      ui(`${travelWindow.label}; D&D-opdracht blijft openstaan`);
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
    if (!priceCheckDue() && !hourlyBuyPending()) {
      // Een wachttimer mag nooit blind blokkeren. Controleer eerst de echte
      // voorraad op Smokkelen. Met voorraad moet direct verkocht worden;
      // zonder voorraad blijft de bestaande wachttijd geldig.
      if (!dndAcquireAction(context)) {
        return { delayMs:750, status:'wacht op centrale actielock voor voorraadcontrole' };
      }
      busy = true;
      try {
        setCoreStage('CHECK_INVENTORY', coreTargetCity);
        const formReady = await waitForSmugglingForm(12000);
        if (formReady) syncPhaseFromInventory('voorraad voor wachttijd');
      } finally {
        busy = false;
        dndReleaseAction();
      }

      // Voorraad na een koop zet de fase terecht op sell, maar mag de zojuist
      // geplande halfuur-/vluchtwachttijd niet wissen. Alleen zonder geldige
      // wachttijd mag een bestaande voorraad direct worden verkocht.
      if (phase === 'sell' && (!nextCheckTs || nextCheckTs <= Date.now())) {
        nextCheckTs = 0;
        GM_Set(K_NEXT_CHECK, 0);
        setCoreStage('SELL_NOW', coreTargetCity);
        ui('voorraad aanwezig en geen wachttijd: direct verkopen');
      } else {
        setCoreStage('WAIT_PRICE_CHANGE', coreTargetCity);
        ui(phase === 'sell'
          ? 'gekocht: wachten op volgende verkoopmogelijkheid'
          : 'geen voorraad: wachten op volgend verkoopmoment');
        return { nextAt:nextCheckTs, status:phase === 'sell' ? 'gekocht; wacht op verkoopmoment' : 'wacht op volgend verkoopmoment' };
      }
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
    if (hourlyBuyPending()) {
      return { delayMs:5000, status:'uurkoop open; opnieuw controleren' };
    }
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
    heist:   { enabledKey:'heist_scriptAan'   },
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
      if (module === 'heist')   api.heistSet?.(false, 'master OFF');
      if (module === 'oc')      api.ocSet?.(false, 'master OFF');

      return;
    }

    if (action === 'ON'){
      // reset latch zodat ook eerder gestopte browsers weer 1x proberen
      setLatch(module, false, '');
      GM_Set_(MODULES[module].enabledKey, true);

      // DIRECT start zonder refresh
      if (module === 'race')    api.raceSet?.(true, 'master ON');
      if (module === 'heist')   api.heistSet?.(true, 'master ON');
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
// v11.2.0: Race-flow voorzien van centrale actieleasing; lokale watcher uit bij plannerbeheer.
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
  let racePlannerManaged = false;
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
        plannerManaged: !!racePlannerManaged,
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

  // v11.2: de plannercontext blijft gedurende de volledige Race-flow actief.
  // Hierdoor kan geen andere spelmodule tussen uitnodigen, accepteren, auto kiezen
  // en Race starten door navigeren. De lease wordt bij elke vervolgactie vernieuwd.
  let raceActionContext = null;
  const RACE_ACTION_TTL = 120_000;

  function raceAcquireAction(context){
    if (!racePlannerManaged) return true;
    if (context) raceActionContext = context;
    try {
      if (raceActionContext?.touchAction?.(RACE_ACTION_TTL)) return true;
      return !!raceActionContext?.acquireAction?.(RACE_ACTION_TTL);
    } catch(e) { return false; }
  }

  function raceTouchAction(){
    if (!racePlannerManaged) return true;
    try { return !!raceActionContext?.touchAction?.(RACE_ACTION_TTL); }
    catch(e) { return false; }
  }

  function raceReleaseAction(){
    try { raceActionContext?.releaseAction?.(); } catch(e) {}
    raceActionContext = null;
  }

  const next = (fn, ms)=>{
    if(loopTimer) clearTimeout(loopTimer);
    raceTouchAction();
    loopTimer = setTimeout(()=>{
      raceTouchAction();
      fn();
    }, Math.max(0, ms || 0));
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
    if (unsafeWindow.mrbNavigate?.(path,{source:'race'})) return;
    try { unsafeWindow.omerta.GUI.container.loadPage(path); }
    catch { if (path.startsWith('/')) location.href = path; else location.href = '/'+path.replace(/^\//,''); }
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

    if (racePlannerManaged) {
      try {
        const planner = unsafeWindow.mrbV9Planner;
        if (planner) {
          planner.updateTask('v9-race', {
            nextAt: Math.max(Date.now()+250, Number(plan.at)||Date.now()+5000),
            status: plan.type === 'start' ? 'wacht op racestart' : 'wacht op race-timer'
          });
          return true;
        }
      } catch(e) {}
    }

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
    const delay = (raceRole === 'leader')
      ? randomDelay(4000,10000)
      : randomDelay(10000,15000);

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
      ? `<span class="ok">✅ Actief${racePlannerManaged ? ' — 🧭 V9 Planner' : ''}</span>`
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
  // Auto-Travel helpers (zelfde mapping als Heist/Travel)
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

    const a = document.querySelector(`a[onclick="onTravelData(${id});"]`)
           || document.querySelector(`a[onclick^="onTravelData(${id})"]`);
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
      txt = String(txt || '').trim().toLowerCase();
      val = String(val || '').trim().toLowerCase();
      return !val || /^(-|0|select|choose|kies|maak|geen|none)/i.test(val) ||
             /select|choose|kies|maak een keuze|geen auto|no car/i.test(txt);
    };

    const fire = (el) => {
      try{ el.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
      try{ el.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
      try{
        const $ = $jq && $jq();
        if ($) $(el).trigger('input').trigger('change');
      }catch{}
    };

    // Meest voorkomende layout: een <select> met auto's.
    const selects = Array.from(document.querySelectorAll('select'));
    for (const sel of selects){
      if (!sel || sel.disabled || !sel.options || sel.options.length < 2) continue;
      const opts = Array.from(sel.options);
      const opt = opts.find(o => !o.disabled && !isPlaceholder(o.textContent, o.value));
      if (!opt) continue;
      sel.value = opt.value;
      sel.selectedIndex = opts.indexOf(opt);
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

    guiLoad('/races.php');
    next(()=>{
      const body = document.body.innerText || '';

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

    if ($('#game_container:contains("Select our car for the race")').length){
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

    // Houd de centrale actielock actief zolang de driver op dit formulier staat.
    // Hiermee kan Cars/Crimes de pagina niet overnemen voordat de race-auto is bevestigd.
    raceTouchAction();

    const root = document.querySelector('#game_container') || document;
    const body = String(root.innerText || root.textContent || '').replace(/\s+/g, ' ').trim();
    const headingVisible = /Select our car for the race|Selecteer je auto voor de race|Kies je auto voor de race/i.test(body);

    const forms = Array.from(root.querySelectorAll('form'));
    const form = forms.find(f => {
      const txt = String(f.innerText || f.textContent || '').replace(/\s+/g, ' ');
      return /Select our car for the race|Selecteer je auto voor de race|Kies je auto voor de race|Willekeurige auto in deze stad/i.test(txt)
        && !!f.querySelector('select');
    }) || forms.find(f => !!f.querySelector('select') && !!f.querySelector('input[type="submit"], button[type="submit"], button')) || null;

    const select = form?.querySelector('select') || Array.from(root.querySelectorAll('select')).find(sel => {
      const ctx = String(sel.closest('form, table, .box, #game_container')?.innerText || '');
      const hay = `${sel.name || ''} ${sel.id || ''} ${ctx}`.toLowerCase();
      return /auto|car|race|autorace|selecteer je auto|select our car|willekeurige auto/.test(hay);
    }) || null;

    if (headingVisible && select){
      const options = Array.from(select.options || []);
      // De oude, werkende Race-flow koos bewust optie 1. Op deze pagina is dat
      // "Willekeurige auto in deze stad" of de eerste beschikbare concrete auto.
      let chosen = options.find((o, i) => i > 0 && !o.disabled && /willekeurige auto in deze stad|random car in this city/i.test(o.textContent || ''))
        || options.find((o, i) => i > 0 && !o.disabled && String(o.value || '').trim() !== '')
        || options[1]
        || options[0];

      if (chosen){
        select.selectedIndex = Math.max(0, options.indexOf(chosen));
        select.value = chosen.value;
        try { chosen.selected = true; } catch(e) {}
        try { select.dispatchEvent(new Event('input', {bubbles:true})); } catch(e) {}
        try { select.dispatchEvent(new Event('change', {bubbles:true})); } catch(e) {}
        try {
          const $ = $jq && $jq();
          if ($) $(select).val(chosen.value).prop('selectedIndex', select.selectedIndex).trigger('input').trigger('change');
        } catch(e) {}
      }

      const scope = form || select.closest('form') || root;
      const candidates = Array.from(scope.querySelectorAll('input[type="submit"], input[type="button"], button[type="submit"], button'))
        .filter(b => !b.disabled && b.offsetParent !== null);
      const submit = candidates.find(b => /^(ga|go)$/i.test(raceButtonText(b)))
        || candidates.find(b => /select|ready|gereed|bevestig|confirm|submit/i.test(raceButtonText(b)))
        || candidates[0]
        || null;

      if (submit){
        raceRegistryState('DRIVER_CAR_SUBMIT', `auto bevestigen via ${raceButtonText(submit) || 'Ga'}`);
        raceTouchAction();

        // Gebruik eerst exact dezelfde jQuery-click als de oude werkende versie.
        let submitted = false;
        try {
          const $ = $jq && $jq();
          if ($) {
            $(submit).focus().trigger('mousedown').trigger('mouseup').trigger('click');
            submitted = true;
          }
        } catch(e) {}
        if (!submitted){
          try { submit.focus(); submit.click(); submitted = true; } catch(e) {}
        }

        // Controleer langer dan voorheen: de site verwerkt deze actie soms traag.
        let checks = 0;
        const verify = ()=>{
          if(!scriptAan) return;
          if (isLoggedOut()) return pauseForGate('slave_selectCar verify: uitgelogd');
          raceTouchAction();
          checks++;

          const nowRoot = document.querySelector('#game_container') || document;
          const after = String(nowRoot.innerText || nowRoot.textContent || '').replace(/\s+/g, ' ');
          const stillHere = /Select our car for the race|Selecteer je auto voor de race|Kies je auto voor de race/i.test(after);

          if (!stillHere){
            raceRegistryState('DRIVER_READY', 'auto bevestigd');
            clearRacePlan();
            next(()=>{
              guiLoad('/information.php');
              next(()=>checkAvailability(true), randomDelay(10000,20000));
            }, randomDelay(2500,4500));
            return;
          }

          // Na enkele controles één native formulier-submit als tweede route.
          if (checks === 3){
            const activeForm = submit.form || select.closest('form') || form;
            try {
              if (activeForm?.requestSubmit && submit.matches('button[type="submit"], input[type="submit"]')) activeForm.requestSubmit(submit);
              else if (activeForm?.requestSubmit) activeForm.requestSubmit();
              else if (activeForm) HTMLFormElement.prototype.submit.call(activeForm);
            } catch(e) {
              try { raceSafeClick(submit); } catch(_) {}
            }
          }

          // Blijf op de Race-pagina en probeer maximaal ongeveer 20 seconden.
          // Daarna wordt de volledige autokeuze opnieuw opgebouwd, zonder dat Cars overneemt.
          if (checks < 8){
            next(verify, 2200);
          } else {
            raceRegistryState('DRIVER_CAR_RETRY', 'autobevestiging opnieuw uitvoeren');
            next(slave_selectCar, randomDelay(1800,2800));
          }
        };

        next(verify, 2200);
        return;
      }
    }

    raceRegistryState('DRIVER_CAR_WAIT', 'wachten op autokeuzeformulier');
    next(slave_selectCar, randomDelay(1800,2800));
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

  // v10.0.4.23: zelfstandige lokale Race-watcher.
  // Werkt ook wanneer de centrale V9-planner niet aanwezig is.
  let raceLocalWatchBusy = false;
  mrbSetInterval(()=>{
    // Onder de Core Planner mag deze oude lokale watcher niet parallel draaien.
    if (racePlannerManaged) return;
    if (!scriptAan || raceLocalWatchBusy) return;
    if (isLoggedOut()) return;
    if (!/information\.php/i.test(location.href)) return;

    const existing = loadRacePlan();
    if (existing && Number(existing.at) > Date.now() + 250) return;
    try {
      const p = unsafeWindow.mrbV9Planner;
      const current = String(p?.currentTask?.() || '');
      const owner = String(p?.navigationOwner?.() || '');
      if ((current && current !== 'v9-race') || (owner && !/race/i.test(owner))) return;
    } catch(e) {}

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
      raceRegistryState('OFF', 'module gestopt');
      clearAll();
      clearRacePlan();
      raceReleaseAction();
    }
  });

  // init
  paint();
  if (scriptAan){
    if (isLoggedOut()){
      pauseForGate('Uitgelogd/Cloudflare bij init');
    } else {
      // bij reload: bestaand plan hervatten, anders 1x info-sync
      bootstrapRaceIdle();
    }
  }

  // ---- V9 planner adapter API ----
  unsafeWindow.mrbV9Race = {
    setPlannerManaged(on){
      racePlannerManaged = !!on;
      if (racePlannerManaged && loopTimer) { clearTimeout(loopTimer); loopTimer = null; }
      raceRegistryState(racePlannerManaged ? 'PLANNER_READY' : 'LOCAL_MODE', racePlannerManaged ? 'centrale planner gekoppeld' : 'lokale fallback');
      paint();
      if (racePlannerManaged && scriptAan) bootstrapRaceIdle();
    },
    isRunning(){ return !!scriptAan; },
    getState(){ return {phase:raceCorePhase,detail:raceCoreDetail,updatedAt:raceCoreUpdatedAt,plannerManaged:racePlannerManaged,role:raceRole,running:scriptAan}; },
    nextAt(){
      const plan = loadRacePlan();
      return plan && Number(plan.at) ? Number(plan.at) : Date.now()+1500;
    },
    wake(context){
      if (!scriptAan) { raceReleaseAction(); raceRegistryState('OFF', 'module staat uit'); return { delayMs:15000, status:'module staat uit' }; }
      if (!raceAcquireAction(context)) {
        raceRegistryState('WAIT_ACTION_LOCK', 'wacht op centrale actielock');
        return { delayMs:1000, status:'wacht op centrale actielock' };
      }
      raceRegistryState('PLANNER_WAKE', 'planner controleert Race');
      const plan = loadRacePlan();
      if (plan && Number(plan.at) > Date.now()+300) {
        return { nextAt:Number(plan.at), status:plan.type === 'start' ? 'racestart gepland' : 'race-timer gepland' };
      }
      clearRacePlan();
      bootstrapRaceIdle();
      const nextPlan = loadRacePlan();
      return { nextAt:nextPlan && Number(nextPlan.at) ? Number(nextPlan.at) : Date.now()+5000, status:'race gecontroleerd' };
    }
  };


  // OC planner-adapter verwijderd uit Race: deze hoort uitsluitend in de OC-module.


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
  try { console.error("[MRB Race boot] Race kon niet initialiseren; overige modules laden door.", raceBootError); } catch (_) {}
  try {
    GM_Set("race_scriptAan", false);
    const raceBlock = document.querySelector("#mrbGoldMenu .gm-block[data-id=\"01-race\"]");
    const st = raceBlock?.querySelector("#raceStatus");
    if (st) st.innerHTML = "<span class=\"bad\">Fout - Race uitgeschakeld</span>";
  } catch (_) {}
}
;
// =====================================================================
// 2) HEISTBLOK
// =====================================================================
;(function HeistScriptCombined(){

  // ---------- Persistente state ----------
  let scriptAan           = GM_Get("heist_scriptAan", false);
  function normalizeHeistRole(v){ v = String(v || '').toLowerCase(); return (v === 'slave' || v === 'driver') ? 'slave' : 'leader'; }
  let heistRole           = normalizeHeistRole(GM_Get("heist_role", "leader"));      // 'leader' | 'slave' (Driver in UI)
  GM_Set("heist_role", heistRole);
  let heistScam           = GM_Get("heist_scam", false);         // Scam (niet versturen na heist)
  let heistAutoTravel     = GM_Get("heist_autoTravel", null);    // Auto-travel bij Feds / verkeerde stad
  if (heistAutoTravel === null || heistAutoTravel === undefined){ heistAutoTravel = true; GM_Set("heist_autoTravel", true); }
  let heistTravelRP       = GM_Get("heist_travelRP", false);     // Tussendoor reizen voor extra RP
  let heistLastTravelCode = GM_Get("heist_lastTravelCode", null);
  const K_HEIST_ENABLED_CITIES = 'heist_enabled_cities_v1'; // aangevinkt = gebruiken; uitgevinkt = overslaan
  const K_HEIST_PHASE = 'heist_phase_v2';
  const K_HEIST_PENDING_SINCE = 'heist_pending_since_v2';

  // Nieuwe persistente state voor partner-cooldown + dagsteden
  let heistLastSuccessTs      = Number(GM_Get("heist_lastSuccessTs", 0)) || 0;          // ms
  let heistLastSuccessCity    = GM_Get("heist_lastSuccessCity", null);                   // 'Det' | ...
  let heistPartnerReadyAt     = Number(GM_Get("heist_partnerReadyAt", 0)) || 0;          // ms
  let heistUsedCitiesToday    = GM_Get("heist_usedCitiesToday", []);                     // ['Det','Cor',...]
  let heistRestrictedDayMode  = !!GM_Get("heist_restrictedDayMode", false);              // blijft aan tot 00:00 Omerta
  let heistLastOmertaHourSeen = Number(GM_Get("heist_lastOmertaHourSeen", -1));          // midnight edge detect
  let heistDayStateTouchedAt  = Number(GM_Get("heist_dayStateTouchedAt", 0)) || 0;       // stale safety

  // Timers
  let loopTimer = null, failsafeTimer = null;
  let heistHardStopped = false; // harde stop-vlag
  let heistPlannerManaged = false; // centrale planner beheert wake-ups

  function heistRegistryState(state, detail=''){
    try {
      unsafeWindow.mrbModuleStateRegistry?.set?.('heist', {
        enabled: !!scriptAan,
        state: String(state || heistPhase || 'IDLE').toUpperCase(),
        detail: String(detail || ''),
        role: heistRole === 'leader' ? 'LEADER' : 'DRIVER',
        phase: heistPhase || 'idle',
        updatedAt: Date.now()
      });
    } catch(e) {}
  }

  // v11.3: centrale actieleasing voor de volledige actieve Heist-flow.
  // De context blijft beschikbaar voor vertraagde callbacks en pagina-overgangen.
  let heistActionContext = null;
  const HEIST_ACTION_TTL = 150_000;

  function heistAcquireAction(context){
    if (!heistPlannerManaged) return true;
    if (context) heistActionContext = context;
    try {
      if (heistActionContext?.touchAction?.(HEIST_ACTION_TTL)) return true;
      return !!heistActionContext?.acquireAction?.(HEIST_ACTION_TTL);
    } catch(e) { return false; }
  }

  function heistTouchAction(){
    if (!heistPlannerManaged) return true;
    try { return !!heistActionContext?.touchAction?.(HEIST_ACTION_TTL); }
    catch(e) { return false; }
  }

  function heistReleaseAction(){
    try { heistActionContext?.releaseAction?.(); } catch(e) {}
    heistActionContext = null;
  }

  // Runtime guards
  let heistCycleSuccessRecorded = false;

  const $jq = ()=> (unsafeWindow.$ || unsafeWindow.jQuery || null);

  const GUI = ()=> (p)=>{
    if (unsafeWindow.mrbNavigate?.(p,{source:'heist'})) return true;
    try { const g=unsafeWindow?.omerta?.GUI?.container; if (g&&typeof g.loadPage==='function'){ g.loadPage(p); return true; } } catch(e) {}
    if (p.startsWith('?')) location.search=p; else location.href=p;
    return true;
  };
  const loadPage = GUI();

  const randomDelay = (min,max)=> Math.floor(Math.random()*(max-min+1))+min;
  const actionDelay = ()=> (typeof unsafeWindow.mrbVarDelayMs === 'function') ? unsafeWindow.mrbVarDelayMs() : randomDelay(2000,5000);

  const HEIST_PARTNER_COOLDOWN_MS    = 180 * 60 * 1000; // 180 minuten
  const HEIST_PARTNER_JITTER_MIN_MS  = 15_000;          // +15s
  const HEIST_PARTNER_JITTER_MAX_MS  = 30_000;          // +30s
  const HEIST_DAY_STALE_RESET_MS     = 26 * 60 * 60 * 1000; // safety tegen oude state
  const HEIST_RESET_RECHECK_MS       = 60_000;
  const K_HEIST_NEXT_AVAILABLE_AT   = 'heist_next_available_at_v1';

  const next = (fn, ms)=>{
    if (loopTimer) clearTimeout(loopTimer);
    heistTouchAction();
    loopTimer = setTimeout(()=>{
      if (!scriptAan || heistHardStopped){ heistReleaseAction(); return; }
      heistTouchAction();
      try { fn(); } catch(e){ console.warn('[Heist next()]', e); }
    }, Math.max(0, ms || 0));
  };

  const clearAll = ()=>{
    if (loopTimer)     { clearTimeout(loopTimer); loopTimer = null; }
    if (failsafeTimer) { clearTimeout(failsafeTimer); failsafeTimer = null; }
  };

  // ---------- UITLOG-GUARD ----------
  function isLoggedOut(){ return gm_isGateVisible(); }

  function pauseForGate(reason=''){
    if(!scriptAan) return;
    clearAll();
    try{ console.log('[Heist] Pauze (gate):', reason || gm_gateReason()); }catch{}
    next(()=>{
      if(!scriptAan) return;
      if (gm_isGateVisible()) return pauseForGate(reason);
      goInfo();
    }, 5000);
  }

  // ---------- H/M/S parser ----------
  function parseTimer(txt){
    if(!txt) return 0;
    const s = txt.trim();
    if (/^(Nu|NOW|Now)$/i.test(s)) return 0;
    const so = s.match(/^(\d+)S$/i); if (so) return (+so[1])*1000;
    const mo = s.match(/^(\d+)M$/i); if (mo) return (+mo[1])*60*1000;
    const ho = s.match(/^(\d+)H$/i); if (ho) return (+ho[1])*3600*1000;
    let H=0,M=0,S=0;
    for (const part of s.toUpperCase().split(/\s+/)){
      const m=part.match(/^(\d+)([HMS])$/); if(!m) continue;
      const v=+m[1]; if(m[2]==='H') H=v; else if(m[2]==='M') M=v; else S=v;
    }
    return ((H*3600)+(M*60)+S)*1000;
  }

  function isNowText(txt){
    return /^(Nu|NOW|Now)$/i.test((txt || '').trim());
  }

  // ===================================================================
  // Auto-Travel helpers — zelfde ID-mapping als Travel-blok
  // ===================================================================
  const HEIST_NAME_TO_CODE = {
    'philadelphia':'Phi',
    'baltimore'   :'Bal',
    'corleone'    :'Cor',
    'palermo'     :'Pal',
    'new york'    :'NY',
    'detroit'     :'Det',
    'chicago'     :'Chi',
    'las vegas'   :'LV'
  };

  const HEIST_CODE_TO_ID = {
    Det: 0,
    Chi: 1,
    Pal: 2,
    NY : 3,
    LV : 4,
    Phi: 5,
    Bal: 6,
    Cor: 7
  };

  const HEIST_TRAVEL_ROTATION = ['Det', 'Chi', 'Pal', 'NY', 'LV', 'Phi', 'Bal', 'Cor'];

  const HEIST_CODE_TO_NAME = {
    Det: 'Detroit',
    Chi: 'Chicago',
    Pal: 'Palermo',
    NY : 'New York',
    LV : 'Las Vegas',
    Phi: 'Philadelphia',
    Bal: 'Baltimore',
    Cor: 'Corleone'
  };

  // Leider kiest welke steden voor automatische Heist-reizen gebruikt mogen worden.
  // Standaard staan alle steden aan. Uitgevinkt betekent: altijd overslaan.
  function loadHeistEnabledCities(){
    let saved = GM_Get(K_HEIST_ENABLED_CITIES, null);
    if (saved == null || saved === '') return [...HEIST_TRAVEL_ROTATION];
    try {
      if (typeof saved === 'string') saved = JSON.parse(saved);
    } catch(e) {
      saved = [...HEIST_TRAVEL_ROTATION];
    }
    if (!Array.isArray(saved)) saved = [...HEIST_TRAVEL_ROTATION];
    return HEIST_TRAVEL_ROTATION.filter(code => saved.includes(code));
  }

  let heistEnabledCities = loadHeistEnabledCities();

  function saveHeistEnabledCities(){
    heistEnabledCities = HEIST_TRAVEL_ROTATION.filter(code => heistEnabledCities.includes(code));
    GM_Set(K_HEIST_ENABLED_CITIES, JSON.stringify(heistEnabledCities));
  }

  function heistCityEnabled(code){
    return heistEnabledCities.includes(code);
  }

  // ---------- Sanitize persisted data ----------
  if (!Array.isArray(heistUsedCitiesToday)){
    try { heistUsedCitiesToday = JSON.parse(heistUsedCitiesToday); }
    catch { heistUsedCitiesToday = []; }
  }
  heistUsedCitiesToday = Array.from(new Set(
    (heistUsedCitiesToday || []).filter(code => HEIST_TRAVEL_ROTATION.includes(code))
  ));

  if (!HEIST_TRAVEL_ROTATION.includes(heistLastTravelCode)) heistLastTravelCode = null;
  if (!HEIST_TRAVEL_ROTATION.includes(heistLastSuccessCity)) heistLastSuccessCity = null;

  function savePartnerState(){
    GM_Set("heist_lastSuccessTs", heistLastSuccessTs);
    GM_Set("heist_lastSuccessCity", heistLastSuccessCity);
    GM_Set("heist_partnerReadyAt", heistPartnerReadyAt);
  }

  function saveDayState(){
    GM_Set("heist_usedCitiesToday", heistUsedCitiesToday);
    GM_Set("heist_restrictedDayMode", heistRestrictedDayMode);
    GM_Set("heist_dayStateTouchedAt", heistDayStateTouchedAt);
  }

  function touchDayState(){
    heistDayStateTouchedAt = Date.now();
    saveDayState();
  }

  function readOmertaClockHour(){
    const t = (document.getElementById('omerta_clock')?.textContent || '').trim();
    const m = t.match(/^(\d{2}):\d{2}:\d{2}$/);
    if (!m) return null;
    const hh = parseInt(m[1], 10);
    return Number.isFinite(hh) ? hh : null;
  }

  function resetHeistDailyState(reason=''){
    heistUsedCitiesToday = [];
    heistRestrictedDayMode = false;
    heistDayStateTouchedAt = Date.now();
    saveDayState();
    try{ console.log('[Heist] Dagstate reset:', reason || '00:00 Omerta'); }catch{}
  }

  function ensureHeistDailyReset(){
    const now = Date.now();

    if ((heistRestrictedDayMode || heistUsedCitiesToday.length) &&
        heistDayStateTouchedAt > 0 &&
        (now - heistDayStateTouchedAt) > HEIST_DAY_STALE_RESET_MS){
      resetHeistDailyState('stale safety reset (>26h)');
    }

    const hh = readOmertaClockHour();
    if (hh == null) return;

    if (hh === 0 && heistLastOmertaHourSeen !== 0){
      resetHeistDailyState('00:xx Omerta edge');
    }

    if (hh !== heistLastOmertaHourSeen){
      heistLastOmertaHourSeen = hh;
      GM_Set("heist_lastOmertaHourSeen", heistLastOmertaHourSeen);
    }
  }

  function activateRestrictedDayMode(reason=''){
    ensureHeistDailyReset();
    if (!heistRestrictedDayMode){
      heistRestrictedDayMode = true;
      touchDayState();
    } else {
      touchDayState();
    }
    try{ console.log('[Heist][Leider] Restricted day mode actief:', reason); }catch{}
  }

  function addUsedCityToday(code){
    if (!code || !HEIST_TRAVEL_ROTATION.includes(code)) return;
    ensureHeistDailyReset();
    if (!heistUsedCitiesToday.includes(code)){
      heistUsedCitiesToday.push(code);
      heistUsedCitiesToday = HEIST_TRAVEL_ROTATION.filter(c => heistUsedCitiesToday.includes(c));
    }
    touchDayState();
  }

  function extractBlockedHeistCities(text){
    const raw = String(text || '').replace(/\s+/g, ' ').trim();
    if (!raw) return [];

    const patterns = [
      /may not do a heist in the following cities\s*:\s*([^\n.]+)/i,
      /geen heist doen in de volgende steden\s*:\s*([^\n.]+)/i,
      /volgende steden[^:]*:\s*([^\n.]+)/i
    ];

    let area = '';
    for (const re of patterns){
      const m = raw.match(re);
      if (m){ area = m[1]; break; }
    }
    if (!area) return [];

    const found = [];
    for (const [name, code] of Object.entries(HEIST_NAME_TO_CODE)){
      const re = new RegExp('\\b' + escapeRegExp(name) + '\\b', 'i');
      if (re.test(area)) found.push(code);
    }
    return HEIST_TRAVEL_ROTATION.filter(code => found.includes(code));
  }

  function syncBlockedHeistCitiesFromPage(text){
    const blocked = extractBlockedHeistCities(text);
    if (!blocked.length) return blocked;

    activateRestrictedDayMode('Route 66 verboden-stedenlijst');
    for (const code of blocked) addUsedCityToday(code);
    return blocked;
  }

  function extractInvitationCity(text){
    const raw = String(text || '').replace(/\s+/g, ' ').trim();
    if (!raw) return null;

    const patterns = [
      /uitgenodigd voor een heist in\s+([A-Za-z ]+?)\s+door/i,
      /invited (?:to|for) a heist in\s+([A-Za-z ]+?)\s+by/i,
      /heist (?:in|at)\s+([A-Za-z ]+?)(?:\s+door|\s+by|$)/i
    ];
    for (const re of patterns){
      const m = raw.match(re);
      if (!m) continue;
      const code = heistCityNameToCode(m[1].trim());
      if (code) return code;
    }

    const link = document.querySelector('a[href*="module=Travel"][href*="CityId="]');
    if (link){
      const href = String(link.getAttribute('href') || link.href || '');
      const m = href.match(/CityId=(\d+)/i);
      if (m){
        const id = Number(m[1]);
        const entry = Object.entries(HEIST_CODE_TO_ID).find(([,v]) => v === id);
        if (entry) return entry[0];
      }
      const code = heistCityNameToCode((link.textContent || '').trim());
      if (code) return code;
    }
    return null;
  }

  function maybeTravelLeaderAwayFromBlockedCity(text){
    if (heistRole !== 'leader' || !heistAutoTravel) return false;
    const blocked = syncBlockedHeistCitiesFromPage(text);
    if (!blocked.length && !heistRestrictedDayMode) return false;

    const current = getCurrentCityCodeAnywhere();
    const target = getNextRestrictedCode();
    if (!target || current === target) return false;

    try{ console.log('[Heist][Leider] Stad vandaag geblokkeerd; reis naar', HEIST_CODE_TO_NAME[target]); }catch{}
    clearAll();
    loadPage('/?module=Travel');
    next(()=>heistAutoTravelFlow(target), randomDelay(800,1500));
    return true;
  }

  function maybeTravelDriverToInvitationCity(text){
    if (heistRole !== 'slave' || !heistAutoTravel) return false;
    const target = extractInvitationCity(text);
    if (!target) return false;

    const current = getCurrentCityCodeAnywhere();
    if (current === target) return false;

    try{ console.log('[Heist][Driver] Uitnodiging is in', HEIST_CODE_TO_NAME[target], '- automatisch reizen'); }catch{}
    clearAll();
    loadPage('/?module=Travel');
    next(()=>heistAutoTravelFlow(target), randomDelay(800,1500));
    return true;
  }

  function heistCityNameToCode(name){
    if (!name) return null;
    const key = name.trim().toLowerCase();
    return HEIST_NAME_TO_CODE[key] || null;
  }

  function rememberTravelCode(code){
    if (!code) return;
    heistLastTravelCode = code;
    GM_Set("heist_lastTravelCode", code);
  }

  function readTopbarCityName(){
    const a = document.querySelector('.top-city-text a');
    return (a?.textContent || '').trim() || null;
  }

  function detectCurrentCityFromTopbar(){
    const cityName = readTopbarCityName();
    const code = heistCityNameToCode(cityName);
    if (code) rememberTravelCode(code);
    return code || null;
  }

  function readTravelCellText(){
    const $ = $jq();
    if ($){
      const el = $('.thinline:eq(1)>tbody>tr:eq(6)>td:eq(1)');
      return (el && el.text && el.text().trim()) || '';
    }
    const el2 = document.querySelector('.thinline:nth-of-type(2) tbody tr:nth-child(7) td:nth-child(2)');
    return (el2?.textContent || '').trim();
  }

  function detectCurrentCityFromTravelPage(){
    let currentAnchor = document.querySelector('a.no-effect[onclick*="return false"]');

    if (!currentAnchor){
      const overlayImg = document.querySelector('img.nohover');
      if (overlayImg){
        currentAnchor = overlayImg.closest('div')?.querySelector('a');
      }
    }

    if (currentAnchor){
      const cityName = currentAnchor.querySelector('b')?.textContent?.trim();
      if (cityName) return heistCityNameToCode(cityName);
    }

    const hiddenCity = document.querySelector('#travelCity')?.value;
    if (hiddenCity != null && hiddenCity !== ''){
      const id = Number(hiddenCity);
      const entry = Object.entries(HEIST_CODE_TO_ID).find(([, cityId]) => cityId === id);
      if (entry) return entry[0];
    }

    return null;
  }

  function getCurrentTravelCode(){
    const topCode = detectCurrentCityFromTopbar();
    if (topCode) return topCode;

    if (location.href.includes('module=Travel')){
      return detectCurrentCityFromTravelPage() || heistLastTravelCode || null;
    }
    return heistLastTravelCode || null;
  }

  function getCurrentCityCodeAnywhere(){
    return detectCurrentCityFromTopbar()
        || (location.href.includes('module=Travel') ? detectCurrentCityFromTravelPage() : null)
        || heistLastTravelCode
        || null;
  }

  function getNextTravelCode(){
    const current = getCurrentTravelCode();
    if (!current) return HEIST_TRAVEL_ROTATION[0];

    const idx = HEIST_TRAVEL_ROTATION.indexOf(current);
    if (idx === -1) return HEIST_TRAVEL_ROTATION[0];

    return HEIST_TRAVEL_ROTATION[(idx + 1) % HEIST_TRAVEL_ROTATION.length];
  }

  function getRestrictedAllowedCodes(){
    ensureHeistDailyReset();
    return HEIST_TRAVEL_ROTATION.filter(code =>
      heistCityEnabled(code) && !heistUsedCitiesToday.includes(code)
    );
  }

  function getNextRestrictedCode(){
    const allowed = getRestrictedAllowedCodes();
    if (!allowed.length) return null;

    const current = getCurrentCityCodeAnywhere();
    if (current && allowed.includes(current)) return current;

    const idx = current ? HEIST_TRAVEL_ROTATION.indexOf(current) : -1;
    const startIdx = idx >= 0 ? (idx + 1) : 0;

    for (let i = 0; i < HEIST_TRAVEL_ROTATION.length; i++){
      const code = HEIST_TRAVEL_ROTATION[(startIdx + i) % HEIST_TRAVEL_ROTATION.length];
      if (allowed.includes(code)) return code;
    }

    return allowed[0] || null;
  }

  function getPartnerWaitRemainingMs(){
    if (!heistPartnerReadyAt) return 0;
    return Math.max(0, heistPartnerReadyAt - Date.now());
  }

  function recordHeistSuccess(source=''){
    ensureHeistDailyReset();

    if (heistCycleSuccessRecorded){
      try{ console.log('[Heist] Success al geregistreerd in deze cycle, skip:', source); }catch{}
      return false;
    }

    const now = Date.now();
    const cityCode = getCurrentCityCodeAnywhere();

    if (heistLastSuccessTs && (now - heistLastSuccessTs) < 90_000){
      if (!cityCode || cityCode === heistLastSuccessCity){
        try{ console.log('[Heist] Duplicate success guard active, skip:', source); }catch{}
        heistCycleSuccessRecorded = true;
        return false;
      }
    }

    heistLastSuccessTs   = now;
    heistLastSuccessCity = cityCode || heistLastSuccessCity || null;
    heistPartnerReadyAt  = now + HEIST_PARTNER_COOLDOWN_MS + randomDelay(HEIST_PARTNER_JITTER_MIN_MS, HEIST_PARTNER_JITTER_MAX_MS);

    savePartnerState();
    GM_Set("lastHeistTime", Math.floor(now / 1000));

    if (cityCode) addUsedCityToday(cityCode);

    heistCycleSuccessRecorded = true;

    try{
      console.log(
        '[Heist] Success geregistreerd:',
        source,
        '| city=', cityCode,
        '| usedToday=', heistUsedCitiesToday.join(',') || '-',
        '| partnerReadyAt=', new Date(heistPartnerReadyAt).toLocaleTimeString()
      );
    }catch{}

    return true;
  }

  function heistClickCityByCode(code){
    const id = HEIST_CODE_TO_ID[code];
    if (id == null) return false;

    try{
      if (typeof unsafeWindow.onTravelData === 'function'){
        unsafeWindow.onTravelData(id);
        return true;
      }
    }catch{}

    const a = document.querySelector(`a[onclick="onTravelData(${id});"]`)
           || document.querySelector(`a[onclick^="onTravelData(${id})"]`);
    if (!a) return false;

    try {
      a.click();
      a.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
      return true;
    }catch(e){
      console.warn('[Heist] clickCityByCode error', e);
    }
    return false;
  }

  function heistPromptOpen(){
    return document.querySelector('.jqi') !== null;
  }

  function heistFindTravelButton(){
    return document.querySelector('button[name="jqi_state0_buttonTravel"][value="true"]')
      || document.querySelector('.jqi .jqibuttons button[name="jqi_state0_buttonTravel"]')
      || Array.from(document.querySelectorAll('button.jqibutton, .jqibuttons button, button.btn'))
           .find(b => /travel/i.test(b.textContent || ''))
      || null;
  }

  function heistAutoTravelToCityName(cityName){
    const code = heistCityNameToCode(cityName);
    if (!code){
      autoTravelSoftRetry('Auto-Travel: stad niet herkend: ' + cityName);
      return;
    }
    if(!scriptAan || heistHardStopped) return;

    try{ console.log('[Heist] Auto-Travel naar', cityName, '(', code, ')'); }catch{}
    clearAll();
    loadPage('/?module=Travel');
    next(()=>heistAutoTravelFlow(code), randomDelay(800,1500));
  }

  function heistAutoTravelFlow(code){
    if(!scriptAan || heistHardStopped) return;

    const ok = heistClickCityByCode(code);
    if (!ok){
      return next(()=>heistAutoTravelFlow(code), 600);
    }

    next(()=>heistConfirmTravelAndBackToHeist(code), randomDelay(700,1100));
  }

  function heistConfirmTravelAndBackToHeist(code){
    if(!scriptAan || heistHardStopped) return;

    if (!heistPromptOpen()){
      return next(()=>heistConfirmTravelAndBackToHeist(code), 500);
    }

    const btn = heistFindTravelButton();
    if (!btn){
      return next(()=>heistConfirmTravelAndBackToHeist(code), 500);
    }

    try { btn.click(); }catch{}

    let tries = 0;
    (function poll(){
      if(!scriptAan || heistHardStopped) return;

      if (!heistPromptOpen() || tries > 20){
        rememberTravelCode(code);

        next(()=>{
          if(!scriptAan || heistHardStopped) return;
          if (heistRole === 'slave'){
            loadPage('/?module=GroupCrimes');
            next(slave_acceptLoop, randomDelay(1800,3200));
          } else {
            loadPage('/information.php');
            next(checkAvailability, randomDelay(2000,4000));
          }
        }, randomDelay(800,1600));
        return;
      }
      tries++;
      setTimeout(poll, 250);
    })();
  }

  function heistCooldownTravelStart(){
    if(!scriptAan || heistHardStopped) return;

    if (!location.href.includes('module=Travel')){
      loadPage('/?module=Travel');
      return next(heistCooldownTravelStart, randomDelay(800,1400));
    }

    const currentCode = detectCurrentCityFromTravelPage();
    if (currentCode){
      rememberTravelCode(currentCode);
    }

    const nextCode = getNextTravelCode();
    if (!nextCode){
      return next(()=>{
        if(!scriptAan || heistHardStopped) return;
        loadPage('/information.php');
        next(checkAvailability, randomDelay(1500,3000));
      }, randomDelay(600,1200));
    }

    try{
      console.log('[Heist] Travel RP naar', HEIST_CODE_TO_NAME[nextCode], '(', nextCode, ')');
    }catch{}

    next(()=>heistAutoTravelFlow(nextCode), randomDelay(500,1000));
  }

  function maybeDoCooldownTravel(heistWait){
    if (!heistTravelRP) return false;
    if (heistWait <= 35 * 60 * 1000) return false;

    const travelTxt = readTravelCellText();
    if (!travelTxt) return false;

    const travelReady = isNowText(travelTxt) || parseTimer(travelTxt) === 0;
    if (!travelReady) return false;

    clearAll();
    loadPage('/?module=Travel');
    next(heistCooldownTravelStart, randomDelay(800,1500));
    return true;
  }

  function heistPlannerSchedule(at, status='gepland'){
    if (!heistPlannerManaged) return false;
    try {
      const planner = unsafeWindow.mrbV9Planner;
      if (!planner) return false;
      planner.updateTask('v9-heist', {
        nextAt: Math.max(Date.now()+500, Number(at)||Date.now()+5000),
        status
      });
      return true;
    } catch(e) { return false; }
  }

  function scheduleAvailabilityRecheck(heistWait){
    let nextWait = heistWait + randomDelay(5000,15000);

    // Bewaar het echte beschikbaarheidsmoment. Hierdoor blijft de planning
    // intact na een volledige website-refresh of een watchdog-ingreep.
    const availableAt = Date.now() + Math.max(0, heistWait);
    GM_Set(K_HEIST_NEXT_AVAILABLE_AT, availableAt);

    if (heistTravelRP && heistWait > 35 * 60 * 1000){
      const travelTxt = readTravelCellText();
      if (travelTxt){
        const travelWait = parseTimer(travelTxt);

        if (!isNowText(travelTxt) && travelWait > 0){
          nextWait = Math.min(nextWait, travelWait + randomDelay(3000,8000));
        }
      }
    }

    if (heistPlannerManaged){
      heistReleaseAction();
      heistPlannerSchedule(Date.now() + nextWait, 'wacht op Heist-timer');
      updateHeistManagerPanel('🧭 Core Planner wacht');
      return;
    }

    next(()=>{
      if(!scriptAan || heistHardStopped) return;
      goInfo();
    }, nextWait);
  }

  function schedulePartnerReadyWait(reason=''){
    if(!scriptAan || heistHardStopped) return;

    const remaining = getPartnerWaitRemainingMs();
    if (remaining <= 0){
      try{ console.log('[Heist][Leider] Partner ready, geen extra wait nodig:', reason); }catch{}
      return next(()=>{
        if(!scriptAan || heistHardStopped) return;
        goInfo();
      }, randomDelay(1500,3000));
    }

    try{
      console.log('[Heist][Leider] Partner cooldown actief:', reason, '| waitMs=', remaining);
    }catch{}

    clearAll();
    loadPage('/information.php');
    const wait = remaining + randomDelay(1000,2500);
    if (heistPlannerManaged){
      heistReleaseAction();
      heistPlannerSchedule(Date.now()+wait, 'wacht op Driver-cooldown');
      return;
    }
    next(checkAvailability, wait);
  }

  function scheduleUntilDailyReset(reason=''){
    if(!scriptAan || heistHardStopped) return;
    try{ console.log('[Heist][Leider] Wachten op dagreset:', reason); }catch{}
    clearAll();
    loadPage('/information.php');
    const wait = HEIST_RESET_RECHECK_MS + randomDelay(2000,5000);
    if (heistPlannerManaged){
      heistReleaseAction();
      heistPlannerSchedule(Date.now()+wait, 'wacht op dagreset');
      return;
    }
    next(checkAvailability, wait);
  }

  function maybePrepareLeaderStart(){
    if(!scriptAan || heistHardStopped) return;
    ensureHeistDailyReset();

    const partnerWait = getPartnerWaitRemainingMs();
    if (partnerWait > 0){
      return schedulePartnerReadyWait('Leader NOW maar partner nog hot');
    }

    if (!heistRestrictedDayMode){
      return next(leader_start, randomDelay(4000,10000));
    }

    const allowed = getRestrictedAllowedCodes();
    if (!allowed.length){
      return scheduleUntilDailyReset('Geen bruikbare heist-steden meer over vandaag');
    }

    const current = getCurrentCityCodeAnywhere();
    const target  = getNextRestrictedCode();

    if (!target){
      return scheduleUntilDailyReset('Restricted mode maar target city ontbreekt');
    }

    if (current === target){
      try{ console.log('[Heist][Leider] Restricted mode: huidige stad is OK:', target); }catch{}
      return next(leader_start, randomDelay(4000,10000));
    }

    try{
      console.log('[Heist][Leider] Restricted mode: travel naar', target, HEIST_CODE_TO_NAME[target]);
    }catch{}

    clearAll();
    loadPage('/?module=Travel');
    next(()=>heistAutoTravelFlow(target), randomDelay(800,1500));
  }

  function extractCityNameFromNotInCityLink(){
    const link = document.querySelector('a[href*="module=Travel"][href*="CityId="]');
    if (!link) return null;
    const name = (link.textContent || '').trim();
    return name || null;
  }

  function findFirstCityInText(text){
    if (!text) return null;
    const lower = text.toLowerCase();
    let bestName = null;
    let bestIdx  = Infinity;

    for (const name in HEIST_NAME_TO_CODE){
      const idx = lower.indexOf(name);
      if (idx !== -1 && idx < bestIdx){
        bestIdx  = idx;
        bestName = name;
      }
    }
    return bestName;
  }

  function escapeRegExp(s){
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function extractFirstSuggestedCity(text){
    if (!text) return null;

    const lower = String(text).toLowerCase();
    const anchor = 'you might want to try your luck in';
    const aIdx = lower.indexOf(anchor);

    let slice = (aIdx !== -1) ? lower.slice(aIdx + anchor.length) : lower;

    const colon = slice.indexOf(':');
    if (colon !== -1) slice = slice.slice(colon + 1);

    slice = slice.replace(/\s+/g, ' ').trim();

    let bestName = null;
    let bestIdx  = Infinity;

    for (const name of Object.keys(HEIST_NAME_TO_CODE)){
      const re = new RegExp(`\\b${escapeRegExp(name)}\\b`, 'i');
      const m = slice.match(re);
      if (!m) continue;

      const at = slice.indexOf(String(m[0]).toLowerCase());
      if (at !== -1 && at < bestIdx){
        bestIdx  = at;
        bestName = name;
      }
    }

    return bestName;
  }

  // ---------- UI ----------
  const block = addBlock(`
    <h4>Heist</h4>
    <div class="gm-row">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="radio" name="heistRole" value="leader" ${heistRole==='leader'?'checked':''}> Leider
      </label>
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="radio" name="heistRole" value="slave" ${heistRole==='slave'?'checked':''}> Driver
      </label>
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="heistToggle" class="gm-btn">${scriptAan?'Stop':'Start'}</button>
      <div id="heistStatus" class="gm-status" style="margin:0;">
        ${scriptAan?'<span class="ok">✅ Actief</span>':'<span class="bad">⛔</span>'}
      </div>
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;margin-top:6px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="checkbox" id="heistScam" ${heistScam?'checked':''}>
        Scam <span style="opacity:.85">(niet versturen na heist)</span>
      </label>
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;margin-top:4px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="checkbox" id="heistAutoTravel" ${heistAutoTravel?'checked':''}>
        Travel <span style="opacity:.85">(stadsrotatie + Driver automatisch meereizen)</span>
      </label>
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;margin-top:4px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="checkbox" id="heistTravelRP" ${heistTravelRP?'checked':''}>
        Travel RP <span style="opacity:.85">(tussen de heist door reizen voor extra RP)</span>
      </label>
    </div>
    <div id="heistCitySelector" style="margin-top:7px;padding:7px;border:1px solid rgba(212,175,55,.25);border-radius:9px;background:rgba(0,0,0,.14);">
      <div style="font-weight:700;color:#ffe08a;margin-bottom:5px;">Leider: steden gebruiken</div>
      <div style="font-size:11px;opacity:.82;margin-bottom:6px;">Aangevinkt = gebruiken · uitgevinkt = overslaan</div>
      <div id="heistCityChecks" style="display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;">
        ${HEIST_TRAVEL_ROTATION.map(code => `
          <label style="display:flex;align-items:center;gap:5px;white-space:nowrap;">
            <input type="checkbox" class="heist-city-enabled" value="${code}" ${heistCityEnabled(code)?'checked':''}>
            ${HEIST_CODE_TO_NAME[code]}
          </label>`).join('')}
      </div>
      <div class="gm-row" style="gap:6px;margin-top:7px;">
        <button type="button" id="heistCitiesAll" class="gm-btn">Alles gebruiken</button>
        <button type="button" id="heistCitiesNone" class="gm-btn">Alles overslaan</button>
      </div>
    </div>
    <div id="heistManagerPanel" style="margin-top:7px;padding:7px;border:1px solid rgba(212,175,55,.25);border-radius:9px;background:rgba(0,0,0,.18);font-size:11px;line-height:1.45;">
      <b style="color:#ffe08a">Heist Manager</b><br>
      <span id="heistMgrStatus">Status wordt geladen...</span>
    </div>
  `,'02-heist');

  function paint(){
    block.querySelector('#heistToggle').textContent = scriptAan ? 'Stop' : 'Start';
    block.querySelector('#heistStatus').innerHTML   = scriptAan
      ? `<span class="ok">✅ Actief${heistPlannerManaged ? ' — 🧭 V9 Planner' : ''}</span>`
      : '<span class="bad">⛔</span>';

    const scamEl = block.querySelector('#heistScam');
    if (scamEl){
      scamEl.checked  = !!heistScam;
      scamEl.disabled = (heistRole !== 'leader');
      scamEl.title    = (heistRole !== 'leader')
        ? 'Scam is alleen van toepassing voor de Leider'
        : 'Als aangevinkt: niet op "Verstuur" klikken na heist';
    }

    const travelEl = block.querySelector('#heistAutoTravel');
    if (travelEl){
      travelEl.checked = !!heistAutoTravel;
      travelEl.title   = 'Automatisch een beschikbare Heist-stad kiezen; Driver reist naar de uitnodigingsstad';
    }

    const travelRPEl = block.querySelector('#heistTravelRP');
    if (travelRPEl){
      travelRPEl.checked = !!heistTravelRP;
      travelRPEl.title   = 'Als heist nog langer dan 35 minuten duurt en travel open is: automatisch doorreizen voor extra RP';
    }

    const citySelector = block.querySelector('#heistCitySelector');
    if (citySelector){
      citySelector.style.opacity = heistRole === 'leader' ? '1' : '.55';
      citySelector.querySelectorAll('input,button').forEach(el => {
        el.disabled = heistRole !== 'leader';
      });
      citySelector.querySelectorAll('.heist-city-enabled').forEach(cb => {
        cb.checked = heistCityEnabled(cb.value);
      });
    }
  }

  // ===================================================================
  // Counters / limieten
  // ===================================================================
  let heistPhase = String(GM_Get(K_HEIST_PHASE, 'idle') || 'idle');
  if (!['idle','inviting','waiting_accept','started'].includes(heistPhase)) heistPhase = 'idle';
  let heistPendingSince = Number(GM_Get(K_HEIST_PENDING_SINCE, 0)) || 0;
  let heistStartedAt = 0;
  let heistLeaderFinishLastNav = 0;

  function setHeistPhase(phase, pending=false){
    heistPhase = ['idle','inviting','waiting_accept','started'].includes(phase) ? phase : 'idle';
    GM_Set(K_HEIST_PHASE, heistPhase);
    if (pending){
      if (!heistPendingSince) heistPendingSince = Date.now();
      GM_Set(K_HEIST_PENDING_SINCE, heistPendingSince);
    } else if (heistPhase === 'idle'){
      heistPendingSince = 0;
      GM_Set(K_HEIST_PENDING_SINCE, 0);
    }
    heistRegistryState(heistPhase, pending ? 'actieve Heist-flow' : 'gereed');
  }

  function hasPendingLeaderHeist(){
    if (heistRole !== 'leader' || !scriptAan) return false;
    if (['waiting_accept','started'].includes(heistPhase)) return true;
    // Herstel na een volledige pagina-refresh: maximaal 45 minuten actief houden.
    return heistPendingSince > 0 && (Date.now() - heistPendingSince) < 45 * 60 * 1000;
  }

  const MAX_ACCEPT_CHECKS = 30;
  let  acceptChecks = 0;

  const MAX_SLAVE_CHECKS = 30;
  let  slaveChecks  = 0;

  const resetAcceptChecks = ()=>{ acceptChecks = 0; };
  const resetSlaveChecks  = ()=>{ slaveChecks  = 0; };

  const tickSlaveCheck = ()=>{
    slaveChecks++;
    if (slaveChecks >= MAX_SLAVE_CHECKS){
      stopHeistScript('Driver: 30x gecontroleerd zonder invite');
      return true;
    }
    return false;
  };

  // ---------- Stop-helper ----------
  function stopHeistScript(reason=''){
    scriptAan = false;
    heistHardStopped = true;
    setHeistPhase('idle');
    heistStartedAt = 0;
    acceptChecks = 0;
    slaveChecks  = 0;
    heistCycleSuccessRecorded = false;

    GM_Set("heist_scriptAan", false);
    clearAll();
    heistReleaseAction();
    paint();
  mrbSetInterval(()=>{
    if (!scriptAan) { updateHeistManagerPanel('uit'); return; }
    try{
      const pageText = String((document.querySelector('#game_container') || document.body)?.innerText || '');
      syncBlockedHeistCitiesFromPage(pageText);
      const rt = readRoute66HeistWaitText();
      if (rt && !isNowText(rt)){
        const w = parseTimer(rt);
        if (w > 0) GM_Set(K_HEIST_NEXT_AVAILABLE_AT, Date.now() + w);
      }
    }catch(e){}
    updateHeistManagerPanel('actief');
  }, 2000);
    try{ console.log('[Heist] Gestopt:', reason); }catch{}

    try { unsafeWindow.cc_localStop?.('heist', reason || 'stopHeistScript'); } catch {}

    if (!isLoggedOut()){
      loadPage('/information.php');
    }
  }

  function slaveSoftRetry(reason){
    try{ console.log('[Heist][Driver] Soft-retry:', reason); }catch{}
    resetSlaveChecks();

    clearAll();
    loadPage('/information.php');
    next(checkAvailability, randomDelay(12000,20000));
  }

  function leaderSoftRetry(reason){
    try{ console.log('[Heist][Leider] Soft-retry:', reason); }catch{}
    clearAll();
    loadPage('/information.php');
    next(checkAvailability, randomDelay(12000,20000));
  }

  function autoTravelSoftRetry(reason){
    if (heistRole === 'slave') slaveSoftRetry(reason);
    else leaderSoftRetry(reason);
  }

  // ===================================================================
  // Hard-stop + Auto-Travel handler (ROL-AWARE)
  // ===================================================================
  function handleHeistHardStops(text){
    if (!text) return false;
    const t = text.replace(/\s+/g,' ').trim();

    const isHeistPage = /module=Heist/i.test(location.href);

    if (/you're not in the city your heist finds place/i.test(t)){

      if (heistRole === 'slave'){
        if (heistAutoTravel && isHeistPage){
          let cityName = extractCityNameFromNotInCityLink();
          if (!cityName) cityName = findFirstCityInText(text);

          if (cityName){
            heistAutoTravelToCityName(cityName);
          } else {
            slaveSoftRetry('Not-in-city maar stad niet gevonden');
          }
          return true;
        }

        slaveSoftRetry('Not-in-city (wachten op leider)');
        return true;
      }

      if (heistAutoTravel){
        let cityName = extractCityNameFromNotInCityLink();
        if (!cityName){
          cityName = findFirstCityInText(text);
        }

        try{ console.log('[Heist] Not-in-city melding, autoTravel=', heistAutoTravel, 'cityName=', cityName); }catch{}

        if (cityName){
          heistAutoTravelToCityName(cityName);
        } else {
          autoTravelSoftRetry('Auto-Travel (not in city): geen stad gevonden (retry)');
        }
      } else {
        stopHeistScript('Niet in de juiste heist-stad');
      }
      return true;
    }

    if (/The Feds are watching you, you shouldn't plan another heist in this town\.?/i.test(t)){

      if (heistRole === 'slave'){
        slaveSoftRetry('Feds watching town (wachten op leider)');
        return true;
      }

      if (heistAutoTravel){
        let cityName = extractFirstSuggestedCity(text);
        if (!cityName){
          cityName = findFirstCityInText(text);
        }

        try{ console.log('[Heist] Feds-melding, autoTravel=', heistAutoTravel, 'cityName=', cityName); }catch{}

        if (cityName){
          heistAutoTravelToCityName(cityName);
        } else {
          autoTravelSoftRetry('Feds watching town — geen stad gevonden in tekst (retry)');
        }
      } else {
        stopHeistScript('Feds watching town — plannen niet toegestaan');
      }
      return true;
    }

    if (/Your buddy is still tired from his last heist/i.test(t)){
      if (heistRole === 'leader'){
        schedulePartnerReadyWait('Buddy is still tired');
      } else {
        slaveSoftRetry('Buddy is still tired');
      }
      return true;
    }

    if (/The Feds are looking for/i.test(t) && /another town or another partner/i.test(t)){
      if (heistRole === 'slave'){
        slaveSoftRetry('Feds zoeken partner — wachten op leider');
        return true;
      }

      activateRestrictedDayMode('Partner/Feds trigger');
      const partnerWait = getPartnerWaitRemainingMs();

      clearAll();
      loadPage('/information.php');

      if (partnerWait > 0){
        next(checkAvailability, partnerWait + randomDelay(1000,2500));
      } else {
        next(checkAvailability, randomDelay(12000,20000));
      }
      return true;
    }

    return false;
  }

  // ---------- Availability ----------
  function goInfo(){
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()){
      return pauseForGate('Uitgelogd/Cloudflare gedetecteerd');
    }
    clearAll();
    loadPage('/information.php');
    next(checkAvailability, randomDelay(1000,2000));
  }

  function readHeistCellText(){
    // Zoek op het label, niet op een vaste rij-index. De informatiepagina kan
    // per account of update een andere rijvolgorde hebben.
    const rows = Array.from(document.querySelectorAll('table tr'));
    for (const row of rows){
      const cells = Array.from(row.querySelectorAll('td,th'));
      if (cells.length < 2) continue;
      const label = String(cells[0].textContent || '').replace(/\s+/g,' ').trim();
      if (/^(Volgende heist|Next heist)$/i.test(label)){
        return String(cells[1].textContent || '').replace(/\s+/g,' ').trim();
      }
    }

    // jQuery-fallback met tekstfilter.
    const $ = $jq();
    if ($){
      let found = '';
      $('table tr').each(function(){
        const cells = $(this).find('td,th');
        if (cells.length < 2) return;
        const label = String($(cells[0]).text() || '').replace(/\s+/g,' ').trim();
        if (/^(Volgende heist|Next heist)$/i.test(label)){
          found = String($(cells[1]).text() || '').replace(/\s+/g,' ').trim();
          return false;
        }
      });
      if (found) return found;
    }

    return '';
  }

  function readRoute66HeistWaitText(){
    const root = document.querySelector('#game_container') || document.body;
    const text = String(root?.innerText || root?.textContent || '').replace(/\s+/g,' ').trim();
    const patterns = [
      /Je kunt weer een heist doen in\s+((?:\d+H\s*)?(?:\d+M\s*)?(?:\d+S)?)/i,
      /You can do another heist in\s+((?:\d+H\s*)?(?:\d+M\s*)?(?:\d+S)?)/i,
      /Je kunt een heist doen\s*:?\s*(Nu|Now)/i
    ];
    for (const re of patterns){
      const m = text.match(re);
      if (m && m[1]) return String(m[1]).trim();
    }
    return '';
  }

  function formatHeistManagerTime(ms){
    ms = Math.max(0, Number(ms)||0);
    if (ms <= 0) return 'Nu';
    const sec = Math.ceil(ms/1000);
    const h = Math.floor(sec/3600);
    const m = Math.floor((sec%3600)/60);
    const ss = sec%60;
    return [h?`${h}u`:'',m?`${m}m`:'',`${ss}s`].filter(Boolean).join(' ');
  }

  function updateHeistManagerPanel(extra=''){
    const el = block.querySelector('#heistMgrStatus');
    if (!el) return;
    try{
      const wait = savedHeistWaitMs();
      const travelTxt = readTravelCellText();
      const travelWait = travelTxt ? parseTimer(travelTxt) : 0;
      const used = (Array.isArray(heistUsedCitiesToday) ? heistUsedCitiesToday : []).map(c=>HEIST_CODE_TO_NAME[c]||c);
      const skipped = HEIST_TRAVEL_ROTATION.filter(c => !heistCityEnabled(c)).map(c => HEIST_CODE_TO_NAME[c] || c);
      const currentCode = getCurrentCityCodeAnywhere();
      const nextCode = getNextRestrictedCode();
      const lines = [
        `Rol: ${heistRole === 'leader' ? 'Leider' : 'Driver'}`,
        `Volgende heist: ${formatHeistManagerTime(wait)}`,
        `Volgende reis: ${travelTxt ? (isNowText(travelTxt)?'Nu':formatHeistManagerTime(travelWait)) : 'onbekend'}`,
        `Huidige stad: ${currentCode ? (HEIST_CODE_TO_NAME[currentCode]||currentCode) : 'onbekend'}`,
        `Volgende stad: ${nextCode ? (HEIST_CODE_TO_NAME[nextCode]||nextCode) : 'geen beschikbare stad'}`,
        `Vandaag geblokkeerd: ${used.length ? used.join(', ') : 'geen'}`,
        `Handmatig overgeslagen: ${skipped.length ? skipped.join(', ') : 'geen'}`
      ];
      if (extra) lines.push(`Status: ${extra}`);
      el.innerHTML = lines.map(x=>`<div>${x}</div>`).join('');
    }catch(e){
      el.textContent = extra || 'Status tijdelijk niet beschikbaar';
    }
  }

  function savedHeistWaitMs(){
    const at = Number(GM_Get(K_HEIST_NEXT_AVAILABLE_AT, 0)) || 0;
    return at > Date.now() ? at - Date.now() : 0;
  }

  function checkAvailability(){
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()){
      return pauseForGate('Uitgelogd/Cloudflare gedetecteerd');
    }

    ensureHeistDailyReset();

    if (location.pathname==='/information.php' || location.href.includes('/information.php')){
      const txt = readHeistCellText();

      if (/^(Nu|NOW|Now)$/i.test(txt)){
        GM_Set(K_HEIST_NEXT_AVAILABLE_AT, 0);
        if (heistRole === 'leader'){
          maybePrepareLeaderStart();
        } else {
          next(slave_start, randomDelay(10000,15000));
        }
      } else {
        let wait = parseTimer(txt);

        // Als de tabel tijdens laden tijdelijk leeg is, gebruik dan de eerder
        // opgeslagen planning. Zo gaat een refresh niet ten koste van de timer.
        if (wait <= 0 && !txt){
          wait = savedHeistWaitMs();
        }

        if (wait > 0){
          if (maybeDoCooldownTravel(wait)) return;
          scheduleAvailabilityRecheck(wait);
        } else {
          // Onbekende/lege waarde: opnieuw lezen zonder de pagina te bestoken.
          if (heistPlannerManaged) heistPlannerSchedule(Date.now()+10000, 'timer opnieuw lezen');
          else next(checkAvailability, 10000);
        }
      }
    } else {
      goInfo();
    }
  }

  function heistBlockedByOtherGroupCrime(){
    try {
      if (GM_Get('oc_scriptAan', false)) return true;
      if (GM_Get('mrb_spot_raid_on_v2', false)) return true;
      if (unsafeWindow.mrbSpotOvervalV3?.getState?.().enabled) return true;
    } catch(e) {}
    return false;
  }

  // ===================================================================
  // LEIDER FLOW
  // ===================================================================
  function scheduleAcceptCheck(){
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()) return pauseForGate('Uitgelogd tijdens accept-check');
    acceptChecks++;

    if (acceptChecks >= MAX_ACCEPT_CHECKS){
      return stopHeistScript('Driver accepteert niet binnen 30 controles');
    }

    next(()=>{
      if(!scriptAan || heistHardStopped) return;
      if (isLoggedOut()) return pauseForGate('Uitgelogd tijdens accept-check');
      loadPage('/?module=GroupCrimes');
      next(()=>inspectGroupCrimes(false), randomDelay(1000,2000));
    }, randomDelay(10000,15000));
  }

  function leader_start(){
    // OC heeft voorrang op de gedeelde pagina Groepsmisdaden.
    if (heistBlockedByOtherGroupCrime()) return;
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()) return pauseForGate('Uitgelogd bij leader_start');

    ensureHeistDailyReset();

    setHeistPhase('inviting');
    heistCycleSuccessRecorded = false;
    resetAcceptChecks();
    loadPage('/?module=GroupCrimes');

    if (failsafeTimer) clearTimeout(failsafeTimer);
    failsafeTimer = setTimeout(()=>{ if(scriptAan && !heistHardStopped){ goInfo(); } }, 60_000);

    next(()=> inspectGroupCrimes(true), randomDelay(1500,3000));
  }

  function inspectGroupCrimes(isInit=false){
    // Harde v11.10.3-guard: ook oude timers/observers mogen bij actieve OC
    // nooit een Heist-link op de gedeelde GroupCrimes-pagina aanklikken.
    if (heistBlockedByOtherGroupCrime()) return;
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()) return pauseForGate('Uitgelogd op GroupCrimes');

    const bodyText = document.body.innerText || '';

    syncBlockedHeistCitiesFromPage(bodyText);
    if (maybeTravelLeaderAwayFromBlockedCity(bodyText)) return;

    // MRB NL FIX — GroupCrimes kan tegelijk een Feds-tekst EN een geldige "Leid een heist"-link tonen.
    // De oude volgorde stopte al op de Feds-tekst voordat de Route 66-link geklikt werd.
    const earlyHeistLink = Array.from(document.querySelectorAll('a'))
      .find(a => {
        const href = String(a.getAttribute('href') || a.href || '');
        const txt  = String(a.textContent || '').replace(/\s+/g, ' ').trim();

        return /module=Heist/i.test(href) &&
               /action=/i.test(href) &&
               /(Lead a Heist|Leid een heist)/i.test(txt);
      });

    if (earlyHeistLink){
      try{
        earlyHeistLink.focus();
        earlyHeistLink.click();
        earlyHeistLink.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
      }catch{}
      if (failsafeTimer) clearTimeout(failsafeTimer);
      return next(atHeistActionPage, actionDelay());
    }

    if (handleHeistHardStops(bodyText)) return;

    const sendLink = findHeistTransferLink();
    if (sendLink){
      recordHeistSuccess('sendLink');

      if (failsafeTimer) clearTimeout(failsafeTimer);

      if (!heistScam){
        return next(()=>{
          if(!scriptAan || heistHardStopped) return;
          heistSafeClick(sendLink);
          setHeistPhase('idle');
          heistStartedAt = 0;
          next(goInfo, randomDelay(5000,10000));
        }, actionDelay());
      } else {
        try{ console.log('[Heist] Scam actief — Verstuur wordt overgeslagen.'); }catch{}
        return next(goInfo, randomDelay(3000,6000));
      }
    }

    const startBtn = findHeistStartButton();
    if (startBtn){
      setHeistPhase('started', true);
      heistStartedAt = Date.now();
      return next(()=>{
        if(!scriptAan || heistHardStopped) return;
        heistSafeClick(startBtn);
        if (failsafeTimer) clearTimeout(failsafeTimer);
        next(()=>inspectGroupCrimes(false), randomDelay(5000,8000));
      }, actionDelay());
    }

    if (/Wanna kick him out for his lazy behaviour?/i.test(bodyText)){
      setHeistPhase('waiting_accept', true);
      return scheduleAcceptCheck();
    }

    const heistLink = Array.from(document.querySelectorAll('a'))
      .find(a=>{
        const href = String(a.getAttribute('href') || a.href || '');
        const txt  = String(a.textContent || '').replace(/\s+/g,' ').trim();
        return /module=Heist/i.test(href) &&
               /action=/i.test(href) &&
               /(Lead a Heist|Leid een heist)/i.test(txt);
      });
    if (heistLink){
      try{ heistLink.focus(); heistLink.click(); heistLink.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window})); }catch{}
      if (failsafeTimer) clearTimeout(failsafeTimer);
      return next(atHeistActionPage, actionDelay());
    }

    if (isInit && heistPhase==='inviting'){
      if (failsafeTimer) clearTimeout(failsafeTimer);
      return next(checkAvailability, 5*60*1000);
    }

    if (heistPhase==='started'){
      const elapsed = heistStartedAt ? Date.now() - heistStartedAt : 0;
      const noProfit = /geen\s*winst|no\s*profit|niets\s*te\s*verdelen|nothing\s*to\s*transfer/i.test(bodyText);

      if (noProfit){
        recordHeistSuccess('completed-no-profit');
        setHeistPhase('idle');
        heistStartedAt = 0;
        if (failsafeTimer) clearTimeout(failsafeTimer);
        return next(goInfo, randomDelay(3000,6000));
      }

      // Het resultaat en de winstknop worden soms pas enkele seconden na Start
      // zichtbaar. Blijf daarom terugkeren en controleren in plaats van direct
      // naar Information te vertrekken.
      if (!elapsed || elapsed < 120000){
        return next(()=>{
          if(!scriptAan || heistHardStopped) return;
          loadPage('/?module=GroupCrimes');
          next(()=>inspectGroupCrimes(false), randomDelay(1200,2200));
        }, randomDelay(5000,8000));
      }

      // Na twee minuten zonder herkenbaar resultaat: veilig terug naar info.
      recordHeistSuccess('started-timeout');
      setHeistPhase('idle');
      heistStartedAt = 0;
      if (failsafeTimer) clearTimeout(failsafeTimer);
      return next(goInfo, randomDelay(5000,10000));
    }

    if (heistPhase==='waiting_accept'){
      return scheduleAcceptCheck();
    }

    if (failsafeTimer) clearTimeout(failsafeTimer);
    next(()=>{
      if(!scriptAan || heistHardStopped) return;
      if (isLoggedOut()) return pauseForGate('Uitgelogd bij fallback GroupCrimes');
      loadPage('/?module=GroupCrimes');
      next(()=>inspectGroupCrimes(false), randomDelay(1000,2000));
    }, randomDelay(15000,20000));
  }

  function heistSafeClick(el){
    if (!el) return false;
    try{ el.focus(); }catch{}
    try{ el.click(); return true; }catch{}
    try{
      el.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
      el.dispatchEvent(new MouseEvent('mouseup',  {bubbles:true,cancelable:true,view:window}));
      el.dispatchEvent(new MouseEvent('click',    {bubbles:true,cancelable:true,view:window}));
      return true;
    }catch{}
    return false;
  }

  function heistSetValue(el, value){
    if (!el) return false;
    try{ el.focus(); }catch{}
    el.value = String(value ?? '');
    try{ el.setAttribute('value', String(value ?? '')); }catch{}
    try{ el.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
    try{ el.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
    try{
      const $ = $jq();
      if ($) $(el).trigger('input').trigger('change');
    }catch{}
    return true;
  }

  function heistButtonText(el){
    return String(el?.value || el?.textContent || el?.getAttribute?.('title') || el?.getAttribute?.('alt') || '')
      .replace(/\s+/g,' ')
      .trim();
  }

  function heistFindButtonByText(patterns){
    return Array.from(document.querySelectorAll('input[type="submit"], button, input[type="button"], a'))
      .filter(el => !el.disabled && (el.offsetParent !== null || el.tagName === 'A'))
      .find(el => patterns.some(re => re.test(heistButtonText(el)))) || null;
  }

  function heistPartnerName(){
    return String(GM_Get('race_partner_name', 'Invullen') || 'Invullen').trim() || 'Invullen';
  }

  function selectTommyGun(){
    let did = false;

    const selects = Array.from(document.querySelectorAll('select')).filter(s => !s.disabled);
    for (const sel of selects){
      const opts = Array.from(sel.options || []);
      const opt = opts.find(o => /tommy\s*gun/i.test(o.textContent || '') || /tommy\s*gun/i.test(o.value || ''));
      if (!opt) continue;
      sel.value = opt.value;
      sel.selectedIndex = opts.indexOf(opt);
      try{ sel.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
      try{ sel.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
      did = true;
    }

    const radios = Array.from(document.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
      .filter(i => !i.disabled);
    const gunRadio = radios.find(i => {
      const wrap = i.closest('label, tr, div, td, p') || i.parentElement;
      const hay = ((i.name||'') + ' ' + (i.id||'') + ' ' + (i.value||'') + ' ' + (wrap?.textContent||'')).toLowerCase();
      return /tommy\s*gun/.test(hay);
    });
    if (gunRadio){
      gunRadio.checked = true;
      try{ gunRadio.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
      try{ gunRadio.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
      did = true;
    }

    return did;
  }

  function selectCalculatorYes(){
    const txt = document.body?.innerText || '';
    if (!/heist calculator|calculator/i.test(txt)) return false;

    const radios = Array.from(document.querySelectorAll('input[type="radio"]'))
      .filter(r => !r.disabled && (r.offsetParent !== null));
    if (!radios.length) return false;

    // Probeer eerst value/label "ja/yes/1".
    let yes = radios.find(r => /^(ja|yes|1|true)$/i.test(String(r.value || '').trim()));
    if (!yes){
      yes = radios.find(r => {
        const wrap = r.closest('label, td, div, p') || r.parentElement;
        const hay = ((r.id||'') + ' ' + (r.name||'') + ' ' + (wrap?.textContent||'')).replace(/\s+/g,' ');
        return /\b(ja|yes)\b/i.test(hay);
      });
    }

    // Fallback: op het eerste heist-formulier is de eerste radio doorgaans "Ja".
    if (!yes) yes = radios[0];

    if (yes){
      yes.checked = true;
      try{ yes.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
      try{ yes.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
      return true;
    }
    return false;
  }

  function findHeistStartButton(){
    const root = document.querySelector('#game_container') || document.body;
    const body = root?.innerText || '';

    const candidates = Array.from(root.querySelectorAll('input[type="submit"], button, input[type="button"], a'))
      .filter(el => !el.disabled && (el.offsetParent !== null || el.tagName === 'A'));

    // Laat de Route 66-aanmaakknop "Start" met rust; die wordt door atHeistActionPage afgehandeld.
    const onRoute66Create = /Route\s*66\s*overval/i.test(body) &&
                            /Bestuurder\s*:|Driver\s*:/i.test(body) &&
                            /Kogels\s*:|Bullets\s*:/i.test(body);

    let btn = candidates.find(el => /^start\s*heist$/i.test(heistButtonText(el)));
    if (btn) return btn;

    btn = candidates.find(el => /^start\s*overval$/i.test(heistButtonText(el)));
    if (btn) return btn;

    // Vervolgscherm na Driver-ready gebruikt soms alleen "Start".
    if (!onRoute66Create){
      btn = candidates.find(el => /^start$/i.test(heistButtonText(el)) &&
        /heist|overval|ready|klaar|driver|bestuurder/i.test(body));
      if (btn) return btn;
    }

    return null;
  }

  function findHeistInviteStartButton(){
    return heistFindButtonByText([/^start$/i, /^verzenden$/i, /^verstuur$/i]);
  }

  function heistParseSignedMoney(text){
    const raw = String(text || '').replace(/\s+/g, ' ');
    const m = raw.match(/(?:\$|€)?\s*(-?\d[\d.,]*)/);
    if (!m) return null;
    let v = m[1].replace(/\./g, '').replace(',', '.');
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function findHeistTransferLink(){
    const driverName = heistPartnerName();
    const root = document.querySelector('#game_container') || document.body;
    const rows = Array.from(root.querySelectorAll('tr'));

    // Resultaatscherm: kies uitsluitend de rij van de Driver met positieve
    // "Over te schrijven" waarde. Hiermee wordt "Geen winst" nooit geklikt.
    const driverRows = rows.filter(row => {
      const txt = String(row.textContent || '').replace(/\s+/g, ' ').trim();
      if (!txt) return false;
      if (driverName && driverName !== 'Invullen' && txt.toLowerCase().includes(driverName.toLowerCase())) return true;
      return /bestuurder|driver/i.test(txt);
    });

    for (const row of driverRows){
      const cells = Array.from(row.querySelectorAll('td, th'));
      const rowText = String(row.textContent || '').replace(/\s+/g, ' ');
      if (/geen\s*winst|no\s*profit/i.test(rowText)) continue;

      // In de getoonde tabel staat het over te schrijven bedrag doorgaans
      // in de derde kolom. Als de layout verandert, zoek dan naar een
      // positieve geldwaarde vóór de actieknop.
      let amount = null;
      if (cells.length >= 3) amount = heistParseSignedMoney(cells[2].textContent || '');
      if (!(amount > 0)) {
        const values = cells.map(c => heistParseSignedMoney(c.textContent || '')).filter(v => Number.isFinite(v));
        amount = values.find(v => v > 0) ?? null;
      }
      if (!(amount > 0)) continue;

      const action = Array.from(row.querySelectorAll('a, button, input[type="submit"], input[type="button"]'))
        .find(el => {
          if (el.disabled) return false;
          const hay = (heistButtonText(el) + ' ' + String(el.getAttribute?.('href') || '')).replace(/\s+/g, ' ');
          return /verstuur|verzend|uitbetalen|winst\s*versturen|send|transfer|payout/i.test(hay);
        });
      if (action) return action;
    }

    return null;
  }

  function heistInputFromRow(pattern){
    const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"])'))
      .filter(el => !el.disabled && el.offsetParent !== null);
    return inputs.find(el => {
      const row = el.closest('tr, .row, div, td, p, label') || el.parentElement;
      const hay = ((el.name || '') + ' ' + (el.id || '') + ' ' + (el.placeholder || '') + ' ' + (row?.textContent || ''))
        .replace(/\s+/g, ' ');
      return pattern.test(hay);
    }) || null;
  }

  function fillHeistActionForm(){
    let did = false;

    // Route 66: vul uitsluitend het Kogels/Bullets-veld met 50.
    const bullets = document.querySelector('input[name="bulletz"], input[name="bullets"], input[name*="bullet" i]')
      || heistInputFromRow(/\b(kogels|bullets?)\b/i);
    if (bullets){
      heistSetValue(bullets, '50');
      did = true;
    }

    // Route 66: vul uitsluitend Bestuurder/Driver met de opgeslagen partner.
    const driverName = heistPartnerName();
    const driver = document.querySelector('input[name="driver"], input[name="buddy"], input[name="partner"], input[name="player"]')
      || heistInputFromRow(/\b(bestuurder|driver|buddy|partner)\b/i);
    if (driver){
      heistSetValue(driver, driverName);
      did = true;
    }

    if (selectTommyGun()) did = true;
    if (selectCalculatorYes()) did = true;
    return did;
  }

  function atHeistActionPage(){
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()) return pauseForGate('Uitgelogd op Heist action page');

    const preText = document.body.innerText || '';
    if (handleHeistHardStops(preText)) return;

    fillHeistActionForm();

    const startInvite = findHeistInviteStartButton();
    if (startInvite){
      return next(()=>{
        if(!scriptAan || heistHardStopped) return;
        fillHeistActionForm();
        heistSafeClick(startInvite);
        setHeistPhase('waiting_accept', true);
        resetAcceptChecks();

        next(()=>{
          const postText = document.body.innerText || '';
          if (handleHeistHardStops(postText)) return;
          return scheduleAcceptCheck();
        }, randomDelay(800,1600));
      }, actionDelay());
    }

    next(atHeistActionPage, randomDelay(1500,3000));
  }

  // ===================================================================
  // DRIVER FLOW
  // ===================================================================
  function slave_start(){
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()) return pauseForGate('Uitgelogd bij slave_start');
    ensureHeistDailyReset();
    resetSlaveChecks();
    loadPage('/?module=GroupCrimes');
    next(slave_acceptLoop, randomDelay(1500,3000));
  }

  function slave_acceptLoop(){
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()) return pauseForGate('Uitgelogd op GroupCrimes (driver)');

    const txt = document.body.innerText || '';
    syncBlockedHeistCitiesFromPage(txt);
    if (maybeTravelDriverToInvitationCity(txt)) return;
    if (handleHeistHardStops(txt)) return;

    if (window.location.href.indexOf('module=Heist') !== -1 &&
        window.location.href.indexOf('action=') !== -1) {

      const autoReady = document.querySelector('input[type="submit"][value="Ready"][data-oc-auto-filled="1"]');
      if (autoReady) {
        return next(slave_finalize, actionDelay());
      }
    }

    const $ = $jq();
    let acceptEl = null;

    if ($){
      const $acc = $('a[href*="module=Heist"]').filter(function(){
        return /(Accepteer|Accept)/i.test($(this).text());
      });
      if ($acc.length) acceptEl = $acc[0];
    } else {
      acceptEl = Array.from(document.querySelectorAll('a[href*="module=Heist"]'))
                      .find(a=>/(Accepteer|Accept)/i.test(a.textContent||''));
    }

    if (acceptEl){
      resetSlaveChecks();
      try{ acceptEl.click(); }catch{}
      return next(slave_finalize, actionDelay());
    }

    const leadLink = Array.from(document.querySelectorAll('a[href*="module=Heist"]'))
                          .find(a=>/(Lead a Heist|Leid een heist)/i.test(a.textContent||''));
    if (leadLink){
      if (tickSlaveCheck()) return;
      return next(()=>{
        if(!scriptAan || heistHardStopped) return;
        if (isLoggedOut()) return pauseForGate('Uitgelogd tussen driver-checks');
        loadPage('/?module=GroupCrimes');
        next(slave_acceptLoop, randomDelay(15000,30000));
      }, randomDelay(10000,20000));
    }

    if (tickSlaveCheck()) return;

    next(()=>{
      if(!scriptAan || heistHardStopped) return;
      if (isLoggedOut()) return pauseForGate('Uitgelogd tussen driver-overig');
      loadPage('/?module=GroupCrimes');
      next(slave_acceptLoop, randomDelay(15000,30000));
    }, randomDelay(10000,20000));
  }

  function selectHeistDriverCar(){
    let did = false;
    const root = document.querySelector('#game_container') || document.body;

    const isPlaceholder = (txt, val) => {
      txt = String(txt || '').trim().toLowerCase();
      val = String(val || '').trim().toLowerCase();
      return !val || /^(-|0|select|choose|kies|maak|geen|none)/i.test(val) ||
             /select|choose|kies|maak een keuze|geen auto|no car/i.test(txt);
    };

    const fire = (el) => {
      try{ el.dispatchEvent(new Event('input',  { bubbles:true })); }catch{}
      try{ el.dispatchEvent(new Event('change', { bubbles:true })); }catch{}
      try{
        const $ = $jq();
        if ($) $(el).trigger('input').trigger('change');
      }catch{}
    };

    const selects = Array.from(root.querySelectorAll('select')).filter(s => !s.disabled && (s.offsetParent !== null));
    for (const sel of selects){
      const opts = Array.from(sel.options || []);
      const opt = opts.find(o => !o.disabled && !isPlaceholder(o.textContent, o.value));
      if (!opt) continue;
      sel.value = opt.value;
      sel.selectedIndex = opts.indexOf(opt);
      fire(sel);
      did = true;
    }

    const carInputs = Array.from(root.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
      .filter(i => !i.disabled && (i.offsetParent !== null))
      .filter(i => {
        const wrap = i.closest('label, tr, div, td, p') || i.parentElement;
        const hay = ((i.name||'') + ' ' + (i.id||'') + ' ' + (i.value||'') + ' ' + (wrap?.textContent||'')).toLowerCase();
        return /auto|car|wagen|voertuig|packard|sedan|damage|schade/.test(hay);
      });

    if (carInputs.length && !carInputs.some(i => i.checked)){
      const first = carInputs[0];
      first.checked = true;
      fire(first);
      did = true;
    }

    return did;
  }

  function findHeistReadyButton(){
    const root = document.querySelector('#game_container') || document.body;
    const candidates = Array.from(root.querySelectorAll('input[type="submit"], button, input[type="button"], a'))
      .filter(el => !el.disabled && (el.offsetParent !== null || el.tagName === 'A'));

    return candidates.find(el => {
      const txt = heistButtonText(el);
      return /^klaar$/i.test(txt) ||
             /^ready$/i.test(txt) ||
             /^start$/i.test(txt) ||
             /^go$/i.test(txt) ||
             /^kies\s*auto$/i.test(txt) ||
             /^choose\s*car$/i.test(txt) ||
             /selecteer\s*auto|auto\s*kiezen|choose\s*your\s*car|select\s*your\s*car/i.test(txt);
    }) || null;
  }

  function slave_finalize(){
    if(!scriptAan || heistHardStopped) return;
    if (isLoggedOut()) return pauseForGate('Uitgelogd bij driver finalize');

    const txt = document.body.innerText || '';
    if (handleHeistHardStops(txt)) return;

    selectHeistDriverCar();

    const readyBtn = findHeistReadyButton();
    if (readyBtn){
      return next(()=>{
        if(!scriptAan || heistHardStopped) return;
        selectHeistDriverCar();
        heistSafeClick(readyBtn);

        next(()=>{
          if(!scriptAan || heistHardStopped) return;
          if (isLoggedOut()) return pauseForGate('Uitgelogd na "Klaar"');
          loadPage('/information.php');
          next(checkAvailability, randomDelay(10000,20000));
        }, randomDelay(38000,60000));
      }, actionDelay());
    }

    next(slave_finalize, randomDelay(5000,10000));
  }

  // ---------- MRB v8.4.2 Route 66 NL herstel ----------
  // De Nederlandse Route 66-pagina gebruikt Accepteer, Klaar en Start Heist.
  // Deze observer hervat de bestaande flow wanneer de SPA-pagina later laadt.
  let heistNlObserverBusy = false;
  function heistNlRoute66Tick(){
    if (!scriptAan || heistHardStopped || heistNlObserverBusy) return;
    if (heistPlannerManaged) return; // Heist 2.0: planner is enige actiebron
    if (typeof gm_isGateVisible === 'function' && gm_isGateVisible()) return;
    if (typeof mrbCloudflareCoolingDown === 'function' && mrbCloudflareCoolingDown()) return;
    if (!/module=(GroupCrimes|Heist)/i.test(String(location.href || ''))) return;
    if (isLoggedOut()) return;

    const root = document.querySelector('#game_container') || document.body;
    const text = String(root?.innerText || '');
    if (!/Route\s*66\s*overval/i.test(text)) return;

    syncBlockedHeistCitiesFromPage(text);
    if (heistRole === 'leader' && maybeTravelLeaderAwayFromBlockedCity(text)) return;
    if (heistRole === 'slave' && maybeTravelDriverToInvitationCity(text)) return;

    heistNlObserverBusy = true;
    try {
      if (heistRole === 'leader') {
        const transfer = findHeistTransferLink();
        if (transfer && !heistScam) {
          recordHeistSuccess('route66-positive-profit');
          heistSafeClick(transfer);
          setHeistPhase('idle');
          heistStartedAt = 0;
          setTimeout(goInfo, randomDelay(4000,7000));
          return;
        }

        const startHeist = findHeistStartButton();
        if (startHeist) {
          setHeistPhase('started', true);
          heistStartedAt = Date.now();
          heistSafeClick(startHeist);
          return;
        }

        const createScreen = /Bestuurder\s*:|Driver\s*:/i.test(text) && /Kogels\s*:|Bullets\s*:/i.test(text);
        if (createScreen) {
          fillHeistActionForm();
          const start = findHeistInviteStartButton();
          if (start) heistSafeClick(start);
          return;
        }
      } else {
        const accept = Array.from(root.querySelectorAll('a, button, input[type="submit"], input[type="button"]'))
          .find(el => /^(Accepteer|Accept)$/i.test(heistButtonText(el)));
        if (accept) {
          heistSafeClick(accept);
          return;
        }

        if (/zet\s*nu\s*de\s*auto|choose\s*(your\s*)?car|vul\s*het\s*id\s*van\s*jouw\s*auto/i.test(text)) {
          selectHeistDriverCar();
          const ready = findHeistReadyButton();
          if (ready) heistSafeClick(ready);
        }
      }
    } finally {
      setTimeout(() => { heistNlObserverBusy = false; }, 1200);
    }
  }

  const heistNlObserver = new MutationObserver(() => {
    clearTimeout(window.__mrbHeistNlTick);
    window.__mrbHeistNlTick = setTimeout(heistNlRoute66Tick, 350);
  });
  if (document.documentElement) heistNlObserver.observe(document.documentElement, { childList:true, subtree:true, characterData:true });
  window.addEventListener('hashchange', () => setTimeout(heistNlRoute66Tick, 500), true);
  mrbSetInterval(heistNlRoute66Tick, 5000);

  function findActiveLeaderHeistLink(){
    const links = Array.from(document.querySelectorAll('a[href*="module=Heist"], a[href*="module=heist"]'));
    return links.find(a => {
      const href = String(a.getAttribute('href') || a.href || '');
      const txt = String(a.textContent || '').replace(/\s+/g, ' ').trim();
      if (/(Lead a Heist|Leid een heist|Accepteer|Accept)/i.test(txt)) return false;
      return /action=|heistid=|id=/i.test(href) ||
             /route\s*66|bekijk|open|doorgaan|ga naar|huidige heist|current heist|start heist|start overval/i.test(txt);
    }) || null;
  }

  // ---------- V10.0.4.19 LEIDER AFRONDINGSWATCHER ----------
  // Onafhankelijk van de centrale planner en van de algemene `next()` timer.
  // Na uitnodigen blijft de Leider terugkeren totdat Driver klaar is, de Heist
  // gestart is en een eventuele positieve winst is verstuurd.
  function heistLeaderFinishTick(){
    if (heistBlockedByOtherGroupCrime()) return;
    if (!scriptAan || heistHardStopped || heistRole !== 'leader') return;
    if (heistPlannerManaged) return; // geen tweede navigatiewatcher naast planner
    if (isLoggedOut()) return;
    if (typeof gm_isGateVisible === 'function' && gm_isGateVisible()) return;
    if (typeof mrbCloudflareCoolingDown === 'function' && mrbCloudflareCoolingDown()) return;
    if (!hasPendingLeaderHeist()) return;

    const now = Date.now();
    // Rustiger navigeren: maximaal eenmaal per 20 seconden.
    if (now - heistLeaderFinishLastNav < 20000) return;

    const href = String(location.href || '');
    const onGroupCrimes = /module=GroupCrimes/i.test(href);
    const onHeist = /module=Heist/i.test(href);

    if (onHeist){
      heistLeaderFinishLastNav = now;
      try { heistNlRoute66Tick(); } catch(e) {}
      setTimeout(() => {
        try {
          const start = findHeistStartButton();
          if (start){
            setHeistPhase('started', true);
            heistStartedAt = Date.now();
            heistSafeClick(start);
          } else {
            inspectGroupCrimes(false);
          }
        } catch(e) {}
      }, 700);
      return;
    }

    if (onGroupCrimes){
      heistLeaderFinishLastNav = now;
      const activeLink = findActiveLeaderHeistLink();
      if (activeLink){
        try { console.log('[Heist Finish] Actieve Heist geopend voor Start Heist'); } catch(e) {}
        heistSafeClick(activeLink);
        setTimeout(heistNlRoute66Tick, 1000);
        return;
      }
      try { inspectGroupCrimes(false); } catch(e) {}
      return;
    }

    heistLeaderFinishLastNav = now;
    try { console.log('[Heist Finish] Leider keert terug naar GroupCrimes voor Driver-ready/start'); } catch(e) {}
    loadPage('/?module=GroupCrimes');
    setTimeout(() => {
      try {
        const activeLink = findActiveLeaderHeistLink();
        if (activeLink) heistSafeClick(activeLink);
        else inspectGroupCrimes(false);
      } catch(e) {}
    }, 1500);
  }

  mrbSetInterval(heistLeaderFinishTick, 10000);
  window.addEventListener('hashchange', () => setTimeout(heistLeaderFinishTick, 500), true);
  window.addEventListener('popstate', () => setTimeout(heistLeaderFinishTick, 500), true);

  // ---------- UI events ----------
  block.querySelectorAll('input[name="heistRole"]').forEach(r=>{
    r.addEventListener('change', (e)=>{
      heistRole = normalizeHeistRole(e.target.value);
      GM_Set("heist_role", heistRole);
      if (heistRole !== 'leader') setHeistPhase('idle');
      paint();
    });
  });

  const scamBox = block.querySelector('#heistScam');
  if (scamBox){
    scamBox.addEventListener('change', (e)=>{
      heistScam = !!e.target.checked;
      GM_Set('heist_scam', heistScam);
      paint();
    });
  }

  const travelBox = block.querySelector('#heistAutoTravel');
  if (travelBox){
    travelBox.addEventListener('change', (e)=>{
      heistAutoTravel = !!e.target.checked;
      GM_Set('heist_autoTravel', heistAutoTravel);
      paint();
    });
  }

  const travelRPBox = block.querySelector('#heistTravelRP');
  if (travelRPBox){
    travelRPBox.addEventListener('change', (e)=>{
      heistTravelRP = !!e.target.checked;
      GM_Set('heist_travelRP', heistTravelRP);
      paint();
    });
  }

  block.querySelectorAll('.heist-city-enabled').forEach(cb => {
    cb.addEventListener('change', () => {
      heistEnabledCities = Array.from(block.querySelectorAll('.heist-city-enabled:checked'))
        .map(el => el.value)
        .filter(code => HEIST_TRAVEL_ROTATION.includes(code));
      saveHeistEnabledCities();
      updateHeistManagerPanel('stedenkeuze opgeslagen');
      paint();
    });
  });

  block.querySelector('#heistCitiesAll')?.addEventListener('click', () => {
    heistEnabledCities = [...HEIST_TRAVEL_ROTATION];
    saveHeistEnabledCities();
    paint();
    updateHeistManagerPanel('alle steden worden gebruikt');
  });

  block.querySelector('#heistCitiesNone')?.addEventListener('click', () => {
    heistEnabledCities = [];
    saveHeistEnabledCities();
    paint();
    updateHeistManagerPanel('alle steden worden overgeslagen');
  });

  block.querySelector('#heistToggle').addEventListener('click', ()=>{
    if (!scriptAan && isLoggedOut()){
      scriptAan = false;
      GM_Set("heist_scriptAan", false);
      paint();
      console.warn('[Heist] Start geweigerd: je bent uitgelogd.');
      return;
    }

    scriptAan = !scriptAan;
    GM_Set("heist_scriptAan", scriptAan);
    paint();
    heistRegistryState(scriptAan ? heistPhase : 'OFF', scriptAan ? 'handmatig gestart' : 'handmatig gestopt');

    if (scriptAan){
      heistHardStopped = false;
      heistCycleSuccessRecorded = false;
      resetAcceptChecks();
      resetSlaveChecks();
      ensureHeistDailyReset();

      const $ = $jq && $jq();
      if (heistRole==='slave' && $){
        const ready = $('input[type="submit"][value="Ready"], input[type="submit"][value="Klaar"], button:contains("Klaar")');
        if (ready.length){
          try{ ready[0].click(); }catch{}
          next(()=>{ if (!isLoggedOut()) { loadPage('/information.php'); next(checkAvailability, randomDelay(10000,20000)); } }, randomDelay(1500,4000));
          return;
        }
        const acc = $('a[href*="module=Heist"]').filter(function(){ return /(Accepteer|Accept)/i.test($(this).text()); });
        if (acc.length){
          try{ acc[0].click(); }catch{}
          next(slave_finalize, randomDelay(1500,4000));
          return;
        }
      }

      const d = randomDelay(30000,45000);
      if (heistPlannerManaged) {
        heistPlannerSchedule(Date.now() + 500, 'start aangevraagd');
        checkAvailability();
      } else {
        next(checkAvailability, d);
        checkAvailability();
      }
    } else {
      clearAll();
    }
  });

  // ---------- Init ----------
  paint();
  heistRegistryState(scriptAan ? heistPhase : 'OFF', scriptAan ? 'Heist 2.0 gestart' : 'module staat uit');
  if (scriptAan){
    ensureHeistDailyReset();

    if (isLoggedOut()){
      pauseForGate('Uitgelogd/Cloudflare bij init');
    } else {
      const d = randomDelay(30000,45000);
      next(checkAvailability, d);
      checkAvailability();
    }
  }

  // ===================================================================
  // V10.0.4.18 — ZELFSTANDIGE HEIST-NAVIGATIE
  // Werkt naast de planner en gebruikt dezelfde bestaande Leider/Driver-flow.
  // Alleen de eerste navigatiestap wordt hier bewaakt.
  // ===================================================================
  let heistLocalNavTimer = null;
  let heistLocalLastAction = 0;
  let heistLocalLastInfoCheck = 0;
  const HEIST_LOCAL_NAV_COOLDOWN = 12_000;

  function heistLocalOnFlowPage(){
    const href = String(location.href || '');
    return /module=Heist|module=GroupCrimes|module=Travel/i.test(href);
  }

  function heistLocalCanAct(){
    if (!scriptAan || heistHardStopped) return false;
    if (isLoggedOut()) return false;
    if (Date.now() - heistLocalLastAction < HEIST_LOCAL_NAV_COOLDOWN) return false;
    if (heistPhase && heistPhase !== 'idle') return false;
    return true;
  }

  function heistLocalStartNow(){
    if (!heistLocalCanAct()) return false;
    heistLocalLastAction = Date.now();
    GM_Set(K_HEIST_NEXT_AVAILABLE_AT, 0);

    try {
      console.log('[Heist LocalNav] Heist is Nu — start rol:', heistRole);
    } catch(e) {}

    if (heistRole === 'leader') {
      // Bestaande leiderlogica behouden: partner-cooldown, stadrotatie en travel.
      maybePrepareLeaderStart();
    } else {
      // Driver opent zelfstandig Groepsmisdaden en zoekt de uitnodiging.
      slave_start();
    }
    return true;
  }

  function heistLocalNavigationTick(){
    if (!scriptAan || heistHardStopped) return;
    if (heistPlannerManaged) return; // lokale navigatie is alleen fallback
    if (isLoggedOut()) return;

    const now = Date.now();
    const href = String(location.href || '');
    const onInfo = location.pathname === '/information.php' || /\/information\.php/i.test(href);

    // Laat de bestaande Heist/Travel/GroupCrimes-flow met rust zodra die bezig is.
    if (heistLocalOnFlowPage()) return;
    if (heistPhase && heistPhase !== 'idle') return;

    if (onInfo) {
      const txt = readHeistCellText();
      heistLocalLastInfoCheck = now;

      if (isNowText(txt)) {
        heistLocalStartNow();
        return;
      }

      const wait = parseTimer(txt);
      if (wait > 0) {
        GM_Set(K_HEIST_NEXT_AVAILABLE_AT, now + wait);
        return;
      }

      // Lege tabel tijdens laden: niet meteen navigeren, volgende tick opnieuw lezen.
      return;
    }

    const savedAt = Number(GM_Get(K_HEIST_NEXT_AVAILABLE_AT, 0)) || 0;
    const due = savedAt > 0 && savedAt <= now;

    // Zodra de opgeslagen Heist-timer verstreken is, eerst Information openen
    // om Nu/Now betrouwbaar te bevestigen. Dit werkt ook na handmatig navigeren.
    if (due && heistLocalCanAct()) {
      heistLocalLastAction = now;
      try { console.log('[Heist LocalNav] Timer verstreken — Information openen'); } catch(e) {}
      loadPage('/information.php');
      return;
    }

    // Wanneer nog geen geldige planning bekend is, lees Information rustig opnieuw.
    // Maximaal eenmaal per 30 seconden, zodat handmatig gebruik niet continu wordt onderbroken.
    if (!savedAt && now - heistLocalLastInfoCheck >= 30_000 && heistLocalCanAct()) {
      heistLocalLastInfoCheck = now;
      heistLocalLastAction = now;
      try { console.log('[Heist LocalNav] Geen timer bekend — Information controleren'); } catch(e) {}
      loadPage('/information.php');
    }
  }

  heistLocalNavTimer = mrbSetInterval(heistLocalNavigationTick, 2500);
  window.addEventListener('hashchange', () => setTimeout(heistLocalNavigationTick, 350), true);
  window.addEventListener('popstate', () => setTimeout(heistLocalNavigationTick, 350), true);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) setTimeout(heistLocalNavigationTick, 350);
  }, true);

  // ---- V9 fase 5 planner-interface ----
  unsafeWindow.mrbV9Heist = {
    version:'11.8.0',
    isRunning:()=>!!scriptAan,
    role:()=>heistRole,
    setPlannerManaged:(on)=>{
      const nextManaged = !!on;
      const changed = heistPlannerManaged !== nextManaged;
      heistPlannerManaged = nextManaged;

      // Alleen bij de eerste overgang naar plannerbeheer oude lokale timers wissen.
      // De self-heal roept dit periodiek opnieuw aan; opnieuw clearAll() uitvoeren
      // annuleerde anders de geplande leader_start/slave_start navigatie.
      if (changed && heistPlannerManaged){
        clearAll();
        updateHeistManagerPanel('🧭 V9 Planner gekoppeld');
      } else if (!heistPlannerManaged && changed){
        updateHeistManagerPanel('lokale planning');
      }

      paint();
      return heistPlannerManaged;
    },
    nextAt:()=>{
      if (!scriptAan) return Date.now()+15000;
      const saved = Number(GM_Get(K_HEIST_NEXT_AVAILABLE_AT, 0)) || 0;
      const partner = getPartnerWaitRemainingMs();
      if (partner > 0) return Date.now()+partner;
      return saved > Date.now() ? saved + 3000 : Date.now()+750;
    },
    wake:(context)=>{
      if (!scriptAan){ heistReleaseAction(); return { delayMs:15000, status:'module staat uit' }; }
      if (heistHardStopped){ heistReleaseAction(); return { delayMs:60000, status:'hard gestopt' }; }
      if (isLoggedOut()){ heistReleaseAction(); return { delayMs:10000, status:'pauze gate/captcha' }; }

      const activePhase = ['inviting','waiting_accept','started'].includes(heistPhase) || hasPendingLeaderHeist();
      const saved = Number(GM_Get(K_HEIST_NEXT_AVAILABLE_AT, 0)) || 0;
      const partnerWait = getPartnerWaitRemainingMs();
      const longWait = saved > Date.now() + 20_000 || partnerWait > 20_000;

      if (activePhase || !longWait){
        if (!heistAcquireAction(context)) {
          heistRegistryState('WAIT_ACTION_LOCK', 'wacht op centrale actielock');
          return { delayMs:750, status:'wacht op centrale actielock' };
        }
      } else {
        heistReleaseAction();
        heistRegistryState('COOLDOWN', partnerWait > 0 ? 'partner-cooldown' : 'Heist-timer');
      }

      checkAvailability();
      const nextAt = partnerWait > 0 ? Date.now()+partnerWait : (saved > Date.now() ? saved+3000 : Date.now()+5000);
      if (activePhase) {
        heistTouchAction();
        heistRegistryState(heistPhase, heistRole === 'leader' ? 'Leider-flow' : 'Driver-flow');
      }
      return {
        nextAt,
        status: activePhase
          ? `Heist 2.0: ${heistPhase} (${heistRole === 'leader' ? 'Leider' : 'Driver'})`
          : (longWait ? 'Heist 2.0: cooldown zonder actielock' : (heistRole === 'leader' ? 'Leider-flow gereed' : 'Driver-uitnodiging gereed'))
      };
    },
    state:()=>({
      running:!!scriptAan,
      role:heistRole,
      phase:heistPhase,
      hardStopped:!!heistHardStopped,
      nextAt:Number(GM_Get(K_HEIST_NEXT_AVAILABLE_AT,0))||0,
      plannerManaged:!!heistPlannerManaged
    })
  };

  // ---- Master hook (direct start/stop zonder refresh) ----
  unsafeWindow.cc_api = unsafeWindow.cc_api || {};
  unsafeWindow.cc_api.heistSet = function(on, why='master'){
    on = !!on;

    if (on && isLoggedOut()){
      scriptAan = false;
      GM_Set("heist_scriptAan", false);
      paint();
      console.warn('[Heist] Master start geweigerd: uitgelogd.');
      return;
    }

    if (on){
      if (scriptAan) return;
      scriptAan = true;
      GM_Set("heist_scriptAan", true);
      paint();
      heistRegistryState(heistPhase, 'master gestart');

      heistHardStopped = false;
      heistCycleSuccessRecorded = false;
      resetAcceptChecks();
      resetSlaveChecks();
      ensureHeistDailyReset();

      const $ = $jq && $jq();
      if (heistRole==='slave' && $){
        const ready = $('input[type="submit"][value="Ready"], input[type="submit"][value="Klaar"], button:contains("Klaar")');
        if (ready.length){
          try{ ready[0].click(); }catch{}
          next(()=>{ if (!isLoggedOut()) { loadPage('/information.php'); next(checkAvailability, randomDelay(10000,20000)); } }, randomDelay(1500,4000));
          return;
        }
        const acc = $('a[href*="module=Heist"]').filter(function(){ return /(Accepteer|Accept)/i.test($(this).text()); });
        if (acc.length){
          try{ acc[0].click(); }catch{}
          next(slave_finalize, randomDelay(1500,4000));
          return;
        }
      }

      const d = randomDelay(30000,45000);
      next(checkAvailability, d);
      checkAvailability();
    } else {
      if (!scriptAan) return;
      clearAll();
      scriptAan = false;
      GM_Set("heist_scriptAan", false);
      paint();
      heistRegistryState('OFF', 'master gestopt');
    }
  };

})();

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
  ['crimes','cars','dnd','race','heist','oc','boozen','lackey','bodyguard'].forEach(id=>set(id,{state:'IDLE',enabled:false,detail:'registry init'}));
})();

;(function MRBV1110OCCore(){
  'use strict';
  const TASK_ID='v9-oc';
  const INFO='/information.php';
  const GC='/?module=GroupCrimes';
  const OC='/orgcrime2.php';
  const K_ON='oc_scriptAan', K_ROLE='oc_role', K_SCAM='oc_scam';
  const K_STATE='mrb_v117_oc_state', K_NEXT='mrb_v117_oc_next_at';
  let enabled=!!GM_Get(K_ON,false);
  let role=String(GM_Get(K_ROLE,'leader')).toLowerCase();
  role=(role==='slave'||role==='driver')?'driver':'leader';
  let scam=!!GM_Get(K_SCAM,false);
  let state=String(GM_Get(K_STATE,'IDLE'));
  let nextAt=Number(GM_Get(K_NEXT,Date.now()+5000))||Date.now()+5000;
  let acceptChecks=0;
  let plannerManaged=true;
  let lastRunHeartbeat=0;
  let fallbackBusy=false;

  // v11.10.3: een eerder opgeslagen nextAt mag een actieve OC niet uren laten slapen.
  // Bij iedere scriptstart wordt een ingeschakelde OC daarom direct opnieuw beoordeeld.
  if(enabled){
    state='CHECK_TIMER';
    nextAt=Date.now();
    GM_Set(K_STATE,state);
    GM_Set(K_NEXT,nextAt);
  }

  function registry(){ return unsafeWindow.mrbModuleStateRegistry; }
  function setState(next, detail='', when=nextAt){
    state=String(next||'IDLE'); nextAt=Number(when)||Date.now()+5000;
    GM_Set(K_STATE,state); GM_Set(K_NEXT,nextAt);
    registry()?.set?.('oc',{state,detail,enabled,role,nextAt,lastUpdate:Date.now()});
    paint();
  }
  function text(){ return (document.querySelector('#game_container')?.innerText||document.body?.innerText||'').replace(/\s+/g,' ').trim(); }
  function on(path){ return location.pathname===path || location.href.includes(path); }
  function onGroupCrimes(){ return /module=GroupCrimes/i.test(String(location.href||'')); }
  function findOcLink(kind){
    const links=[...document.querySelectorAll('a[href*="orgcrime2.php"]')];
    if(kind==='accept') return links.find(a=>/Accept|Accepteer/i.test(String(a.textContent||'')));
    if(kind==='lead') return links.find(a=>/Lead an OC|Leid een OC/i.test(String(a.textContent||'')));
    return links[0]||null;
  }
  function parseDuration(v){
    v=String(v||'').trim(); if(/^(nu|now)$/i.test(v)) return 0;
    let ms=0; for(const m of v.matchAll(/(\d+)\s*([HMS])/ig)){ const n=+m[1]; ms+=m[2].toUpperCase()==='H'?n*3600000:m[2].toUpperCase()==='M'?n*60000:n*1000; }
    return ms;
  }
  function readOCTimer(){
    const rows=[...document.querySelectorAll('tr')];
    for(const row of rows){
      const cells=[...row.querySelectorAll('th,td')];
      if(cells.length<2) continue;
      const label=(cells[0].textContent||'').replace(/\s+/g,' ').trim();
      if(/volgende\s+georganiseerde\s+misdaad|next\s+organised\s+crime/i.test(label)) return (cells[cells.length-1].textContent||'').trim();
    }
    return '';
  }
  function nav(path,context){
    if(context?.planner?.navigate) return context.planner.navigate(path,{owner:TASK_ID,source:TASK_ID});
    if(unsafeWindow.mrbNavigate) return unsafeWindow.mrbNavigate(path,{source:TASK_ID});
    location.href=path; return true;
  }
  function click(el){ if(!el) return false; try{el.focus();el.click();return true;}catch(e){return false;} }
  function findSubmit(rx){ return [...document.querySelectorAll('input[type="submit"],button[type="submit"],button')].find(el=>rx.test(String(el.value||el.textContent||'').trim())); }
  function calm(){ return /stay calm|rustig blijven|kalm blijven/i.test(text()); }
  function gate(){ return typeof gm_isGateVisible==='function' && gm_isGateVisible(); }
  function dispatchValue(el,value){
    if(!el) return false;
    try{ el.value=String(value); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); return true; }catch(e){ return false; }
  }
  function fireField(el){
    if(!el) return false;
    try{ el.dispatchEvent(new Event('input',{bubbles:true})); }catch(e){}
    try{ el.dispatchEvent(new Event('change',{bubbles:true})); }catch(e){}
    return true;
  }
  function visible(el){ return !!(el && !el.disabled && (el.offsetParent!==null || el.getClientRects?.().length)); }
  function chooseOption(select, matcher){
    if(!visible(select)) return false;
    const opts=[...select.options];
    const opt=opts.find(o=>!o.disabled && matcher(String(o.textContent||''),String(o.value||'')));
    if(!opt) return false;
    if(String(select.value)!==String(opt.value)){ select.value=opt.value; select.selectedIndex=opts.indexOf(opt); fireField(select); }
    return true;
  }
  function fillParticipantForm(){
    const root=document.querySelector('#game_container')||document.body;
    let found=false, changed=false, detail=[];

    // Driver: zet uitsluitend een beschikbare auto in.
    const carSelects=[...root.querySelectorAll('select')].filter(sel=>{
      const row=sel.closest('tr,div,fieldset,label,td,p')||sel.parentElement;
      const hay=((sel.name||'')+' '+(sel.id||'')+' '+(row?.textContent||'')).toLowerCase();
      return visible(sel) && /driver|bestuurder|auto|car|wagen|vehicle|voertuig/.test(hay);
    });
    for(const sel of carSelects){
      found=true;
      const ok=chooseOption(sel,(txt,val)=>{
        const h=(txt+' '+val).toLowerCase();
        return !!val && !/^(0|-)$/.test(val) && !/select|choose|kies|geen|none|maak een keuze/.test(h);
      });
      if(ok){ changed=true; detail.push('Driver: auto'); break; }
    }
    const carRadios=[...root.querySelectorAll('input[type="radio"],input[type="checkbox"]')].filter(i=>{
      const row=i.closest('tr,div,fieldset,label,td,p')||i.parentElement;
      const hay=((i.name||'')+' '+(i.id||'')+' '+(i.value||'')+' '+(row?.textContent||'')).toLowerCase();
      return visible(i) && /driver|bestuurder|auto|car|wagen|vehicle|voertuig/.test(hay);
    });
    if(carRadios.length){
      found=true;
      if(!carRadios.some(i=>i.checked)){ carRadios[0].checked=true; fireField(carRadios[0]); changed=true; }
      detail.push('Driver: auto');
    }

    // Explosievenexpert: kies expliciet C4, niet zomaar het eerste explosief.
    const explosiveSelects=[...root.querySelectorAll('select')].filter(sel=>{
      const row=sel.closest('tr,div,fieldset,label,td,p')||sel.parentElement;
      return visible(sel) && /explos|c4/.test(((sel.name||'')+' '+(sel.id||'')+' '+(row?.textContent||'')).toLowerCase());
    });
    for(const sel of explosiveSelects){ found=true; if(chooseOption(sel,(txt,val)=>/\bc\s*-?\s*4\b/i.test(txt+' '+val))){changed=true;detail.push('Explosievenexpert: C4');break;} }
    const explosiveInputs=[...root.querySelectorAll('input[type="radio"],input[type="checkbox"]')].filter(i=>{
      const row=i.closest('tr,div,fieldset,label,td,p')||i.parentElement;
      return visible(i) && /\bc\s*-?\s*4\b/i.test((i.value||'')+' '+(row?.textContent||''));
    });
    if(explosiveInputs.length){ found=true; const c4=explosiveInputs[0]; if(!c4.checked){c4.checked=true;fireField(c4);changed=true;} detail.push('Explosievenexpert: C4'); }

    // Wapenexpert: 100 kogels en exact 2 Tommy Guns.
    const bullets=root.querySelector('input[name="bulletz"],input[name*="bullet" i],input[id*="bullet" i]');
    if(visible(bullets)){ found=true; if(String(bullets.value||'')!=='100'){changed=dispatchValue(bullets,'100')||changed;} detail.push('Wapenexpert: 100 kogels'); }
    const gunSelects=[...root.querySelectorAll('select')].filter(sel=>{
      const row=sel.closest('tr,div,fieldset,label,td,p')||sel.parentElement;
      return visible(sel) && /gun|weapon|wapen|tommy/.test(((sel.name||'')+' '+(sel.id||'')+' '+(row?.textContent||'')).toLowerCase());
    });
    for(const sel of gunSelects){
      found=true;
      const ok=chooseOption(sel,(txt,val)=>{
        const h=(txt+' '+val).toLowerCase();
        return /tommy/.test(h) && (/(^|\D)2(\D|$)/.test(h) || val==='2');
      }) || chooseOption(sel,(txt,val)=>val==='2' && /tommy|gun|weapon|wapen/.test((txt+' '+val).toLowerCase()));
      if(ok){changed=true;detail.push('Wapenexpert: 2 Tommy Guns');break;}
    }

    fillParticipantForm.lastDetail=[...new Set(detail)].join(' • ');
    return found || changed;
  }
  fillParticipantForm.lastDetail='';
  function release(context){ try{context?.releaseAction?.();}catch(e){} }
  unsafeWindow.mrbOC2Control={version:'11.10.6',isEnabled:()=>enabled,isPlannerManaged:()=>plannerManaged,role:()=>role,state:()=>state};

  const block=addBlock(`
    <h4>OC</h4>
    <div class="gm-row">
      <label><input type="radio" name="ocRoleV117" value="leader" ${role==='leader'?'checked':''}> Leider</label>
      <label><input type="radio" name="ocRoleV117" value="driver" ${role==='driver'?'checked':''}> Driver</label>
    </div>
    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="ocToggleV117" class="gm-btn">${enabled?'Stop':'Start'}</button>
      <div id="ocStatusV117" class="gm-status"></div>
    </div>
    <label style="display:flex;gap:6px;align-items:center;margin-top:5px;"><input id="ocScamV117" type="checkbox" ${scam?'checked':''}> Scam (geen uitbetaling)</label>
  `,'03-oc');
  function paint(){
    block.querySelector('#ocToggleV117').textContent=enabled?'Stop':'Start';
    block.querySelector('#ocStatusV117').innerHTML=enabled?`<span class="ok">${state}</span>`:'<span class="bad">UIT</span>';
    const sc=block.querySelector('#ocScamV117'); if(sc){sc.checked=scam;sc.disabled=role!=='leader';}
  }
  block.querySelector('#ocToggleV117').addEventListener('click',()=>{enabled=!enabled;GM_Set(K_ON,enabled);setState(enabled?'CHECK_TIMER':'OFF',enabled?'gestart':'gestopt',Date.now());unsafeWindow.mrbV9Planner?.updateTask?.(TASK_ID,{enabled,nextAt:Date.now(),status:enabled?'gestart':'uit'});});
  block.querySelectorAll('input[name="ocRoleV117"]').forEach(el=>el.addEventListener('change',e=>{role=e.target.value;GM_Set(K_ROLE,role==='driver'?'slave':'leader');setState('CHECK_TIMER','rol gewijzigd',Date.now());}));
  block.querySelector('#ocScamV117').addEventListener('change',e=>{scam=!!e.target.checked;GM_Set(K_SCAM,scam);paint();});

  async function runStep(context){
    lastRunHeartbeat=Date.now();
    if(!enabled){ setState('OFF','module uit',Date.now()+60000); return {delayMs:60000,status:'uit',enabled:false}; }
    if(gate()){ setState('PAUSED_GATE','login/captcha',Date.now()+5000); return {delayMs:5000,status:'gate'}; }

    if(state==='CHECK_TIMER'||state==='IDLE'||state==='COOLDOWN'||state==='OFF'){
      if(!on(INFO)){ setState('READ_TIMER','informatie openen',Date.now()+900); nav(INFO,context); return {delayMs:900,status:'timerpagina openen'}; }
      const raw=readOCTimer();
      if(!raw){ setState('READ_TIMER','OC timer niet gevonden',Date.now()+10000); return {delayMs:10000,status:'timer niet gevonden'}; }
      const wait=parseDuration(raw);
      if(wait>0){ setState('COOLDOWN',raw,Date.now()+wait+1500); context?.releaseAction?.(); return {nextAt:nextAt,status:`cooldown ${raw}`}; }
      setState(role==='leader'?'LEADER_OPEN':'DRIVER_OPEN','timer vrij',Date.now());
    }

    if(!context?.acquireAction?.(90000)){ return {delayMs:1500,status:'wacht op actielock'}; }
    if(calm()){ context.releaseAction(); setState('CHECK_TIMER','calm/cooldown',Date.now()+5000); return {delayMs:5000,status:'calm'}; }

    if(role==='leader'){
      if(!onGroupCrimes() && !on(OC)){ setState('LEADER_OPEN','Groepsmisdaden openen',Date.now()+900); nav(GC,context); return {delayMs:900,status:'Groepsmisdaden openen'}; }
      if(onGroupCrimes()){
        const leadGc=findOcLink('lead');
        if(leadGc){ click(leadGc); setState('LEADER_FORM','OC-formulier openen',Date.now()+1200); return {delayMs:1200,status:'OC-formulier openen'}; }
        release(context); setState('LEADER_OPEN','wacht op OC-link',Date.now()+4000); return {delayMs:4000,status:'OC-link niet gevonden'};
      }
      const body=text();
      if(/doesn.t exist|still tired|nog moe|bestaat niet/i.test(body)){ context.releaseAction(); enabled=false;GM_Set(K_ON,false);setState('ERROR','ongeldige of niet-beschikbare deelnemer',Date.now()+60000);return {delayMs:60000,status:'fout',enabled:false}; }
      const doBtn=findSubmit(/Do the Organised Crime|Doe de Georganiseerde Misdaad/i);
      if(doBtn){ click(doBtn); setState('PAYOUT','OC uitgevoerd',Date.now()+2500); return {delayMs:2500,status:'OC uitvoeren'}; }
      const startBtn=findSubmit(/^Start$/i);
      if(startBtn){ click(startBtn); acceptChecks=0;release(context);setState('WAITING_PARTICIPANTS','uitnodigingen verzonden',Date.now()+22000);return {delayMs:22000,status:'wacht op deelnemers'}; }
      if(state==='WAIT_ACCEPT'||state==='WAITING_PARTICIPANTS'){
        if(++acceptChecks>=20){release(context);enabled=false;GM_Set(K_ON,false);setState('ERROR','deelnemers accepteerden niet',Date.now()+60000);return {delayMs:60000,status:'accept timeout',enabled:false};}
        release(context);setState('WAITING_PARTICIPANTS',`controle ${acceptChecks}/20`,Date.now()+22000); return {delayMs:22000,status:`accept ${acceptChecks}/20`};
      }
      const lead=[...document.querySelectorAll('a')].find(a=>/Lead an OC|Leid een OC/i.test(a.textContent||''));
      if(lead){click(lead);setState('LEADER_FORM','formulier openen',Date.now()+1200);return {delayMs:1200,status:'formulier openen'};}
      if(findSubmit(/View Calculator Results/i)||findSubmit(/Make .* Transfer/i)){setState('PAYOUT','uitbetaling',Date.now());}
      else { setState('LEADER_OPEN','OC pagina opnieuw beoordelen',Date.now()+5000); return {delayMs:5000,status:'OC controleren'}; }
    }

    if(role==='driver'){
      if(!onGroupCrimes() && !on(OC)){setState('DRIVER_OPEN','Groepsmisdaden openen',Date.now()+900);nav(GC,context);return {delayMs:900,status:'Groepsmisdaden openen'};}
      if(onGroupCrimes()){
        const accGc=findOcLink('accept');
        if(accGc){click(accGc);setState('DRIVER_ACCEPT','OC-uitnodiging accepteren',Date.now()+1200);return {delayMs:1200,status:'OC accepteren'};}
        release(context);setState('DRIVER_WAIT_INVITE','wacht op OC-uitnodiging',Date.now()+8000);return {delayMs:8000,status:'wacht OC-uitnodiging'};
      }
      const acc=[...document.querySelectorAll('a')].find(a=>/Accepteer|Accept/i.test(a.textContent||''));
      if(acc){click(acc);setState('DRIVER_ACCEPT','uitnodiging accepteren',Date.now()+1200);return {delayMs:1200,status:'accepteren'};}
      const yes=[...document.querySelectorAll('a')].find(a=>/takepart=yes/i.test(a.getAttribute('href')||''));
      if(yes){click(yes);setState('DRIVER_CONFIRM','deelname bevestigen',Date.now()+1200);return {delayMs:1200,status:'bevestigen'};}
      if(fillParticipantForm()){
        const put=findSubmit(/^Put in$|Inleggen|Ready|Gereed/i);
        if(put){click(put);release(context);setState('DRIVER_READY',fillParticipantForm.lastDetail||'rolinleg bevestigd',Date.now()+8000);return {delayMs:8000,status:'driver gereed'};}
        setState('DRIVER_FORM',fillParticipantForm.lastDetail||'rolspecifieke inleg ingevuld',Date.now()+1200);return {delayMs:1200,status:'formulier ingevuld'};
      }
      release(context);setState('DRIVER_WAIT_INVITE','wacht op uitnodiging',Date.now()+8000);return {delayMs:8000,status:'wacht uitnodiging'};
    }

    if(state==='PAYOUT'){
      if(scam){GM_Set('lastOCTime',Math.floor(Date.now()/1000));context.releaseAction();setState('CHECK_TIMER','scam: uitbetaling overgeslagen',Date.now()+5000);return {delayMs:5000,status:'afgerond'};}
      const calc=findSubmit(/View Calculator Results/i); if(calc){click(calc);setState('PAYOUT','calculator',Date.now()+1200);return {delayMs:1200,status:'calculator'};}
      const pay=findSubmit(/Make (Explosives Expert|Weapons Expert|Driver) Transfer/i); if(pay){click(pay);setState('PAYOUT','uitbetaling versturen',Date.now()+1200);return {delayMs:1200,status:'uitbetalen'};}
      GM_Set('lastOCTime',Math.floor(Date.now()/1000));context.releaseAction();setState('CHECK_TIMER','OC afgerond',Date.now()+5000);return {delayMs:5000,status:'afgerond'};
    }

    return {delayMs:3000,status:state};
  }

  unsafeWindow.mrbV9OC={
    version:'11.10.6', setPlannerManaged(v=true){plannerManaged=!!v;}, nextAt:()=>nextAt, runStep, wake(){nextAt=Date.now();unsafeWindow.mrbV9Planner?.updateTask?.(TASK_ID,{nextAt,status:'wake'});},
    getState:()=>({enabled,role,scam,state,nextAt})
  };
  paint(); setState(enabled?state:'OFF','init',nextAt);

  // v11.10.6: harde OC fallback. De planner blijft de primaire uitvoerder,
  // maar wanneer een actieve OC langer dan vijf seconden geen runStep-heartbeat
  // krijgt, voert deze lichte runner exact één stap uit. Hierdoor kan CHECK_TIMER
  // niet meer zichtbaar blijven hangen terwijl de OC-timer op Nu staat.
  let lastWakeGuard=0;
  mrbSetInterval(async()=>{
    if(!enabled || fallbackBusy || gate()) return;
    const now=Date.now();
    const planner=unsafeWindow.mrbV9Planner;
    const task=planner?.listTasks?.().find?.(t=>t.id===TASK_ID);

    // Houd de planner-taak altijd actief en direct planbaar zolang OC aanstaat.
    if(now-lastWakeGuard>=3000){
      lastWakeGuard=now;
      nextAt=Math.min(Number(nextAt)||now,now);
      GM_Set(K_NEXT,nextAt);
      planner?.updateTask?.(TASK_ID,{enabled:true,nextAt:now,status:'OC directe wake'});
    }

    // Heeft de echte planner recent gedraaid, dan doet de fallback niets.
    if(lastRunHeartbeat && now-lastRunHeartbeat<5000) return;

    fallbackBusy=true;
    try{
      const fallbackContext={
        acquireAction:()=>true,
        releaseAction:()=>{},
        planner:{
          navigate:(path,opts={})=>{
            if(unsafeWindow.mrbNavigate?.(path,{source:'v9-oc-fallback',...opts})) return true;
            try{ unsafeWindow.omerta?.GUI?.container?.loadPage?.(path); return true; }catch(e){}
            try{ location.href=path; return true; }catch(e){ return false; }
          }
        }
      };
      await runStep(fallbackContext);
    }catch(e){
      try{ console.warn('[OC directe fallback]',e); }catch(_){}
    }finally{
      fallbackBusy=false;
    }
  },1500);
})();

// =====================================================================
// =====================================================================
// MRB GOLD EDITION v9.2.0 — FASE 3
// - Crimes en Cars als eerste modules gekoppeld aan de centrale V9 Planner.
// - De bestaande bewezen uitvoerflow blijft behouden.
// - De losse 1-seconde interval wordt in planner-modus uitgeschakeld.
// - D&D blijft binnen hetzelfde Crimes/Cars-blok werken.
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

  // Variabele vertraging voor Crimes / Cars / D&D acties (instelbaar via Timer-blok)
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
    return /information\.php\b/i.test(path + href) || /[?&]module=Information\b/i.test(href);
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

  // ---- State
  let running    = !!GM_Get(K_RUN, false);
  let gatePaused = false;

  let doCrimes = !!GM_Get(K_DOCR, true);
  let doCars   = !!GM_Get(K_DOCA, true);
  let doDD     = !!GM_Get(K_DODD, false);
  let buyOut   = !!GM_Get(K_BUY,  false);

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
      <label><input type="checkbox" id="ccDoDd"> D&amp;D</label>
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
    const dd = q('#ccDoDd', block);
    const bo = q('#ccBuy',  block);

    if (cr) cr.checked = !!doCrimes;
    if (ca) ca.checked = !!doCars;
    if (dd) dd.checked = !!doDD;
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

    const rows = t1.querySelectorAll('tbody tr');

    const rCr       = rows?.[1]  || null;
    const rCa       = rows?.[2]  || null;
    const rDdBooze  = rows?.[12] || null;
    const rDdDrugs  = rows?.[13] || null;

    const crimesMs = parseRemainingToMs(getInfoRowText(rCr));
    const carsMs   = parseRemainingToMs(getInfoRowText(rCa));

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

    if (ddEligible()) return 'dd';

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

    if (job === 'dd'){
      runDD();
    } else {
      loadPage(kindToPage(job));
      waitAndClick(job);
    }

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
      if (!running || pausedCaptcha || jailPauseActive()) return;
      if (forcedRetryActive()) return;
      if (tryOnce()) return;
      loadPage(kindToPage(kind));
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

    const nowBtn = document.querySelector('#popupButtonNow.btn.btn-bold.btn-big.btn-red');
    if (nowBtn){
      busy = false;
      current = '';
      loadPage(kindToPage(kind));
      return;
    }

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
    if (doDD && ddEligible()) candidates.push(now);
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
    nextAt:plannerNextAt,
    isRunning:()=>running,
    isBusy:()=>busy,
    state:()=>({
      running, plannerMode, busy, current, doCrimes, doCars, doDD,
      crimesNext, carsNext, ddRetryAt, jailUntil, pausedCaptcha, gatePaused,
      confirmPendingKind, forcedRetryKind
    })
  };

  // ===================================================================
  // UI EVENTS
  // ===================================================================
  q('#ccToggle', block).addEventListener('click', ()=>{
    if (!running && isLoggedOut()){
      console.warn('[Crimes/Cars/D&D] Start geweigerd: je bent uitgelogd.');
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

  q('#ccDoDd', block).addEventListener('change', (e)=>{
    doDD = !!e.target.checked;
    GM_Set(K_DODD, doDD);
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
      if (plannerManaged){
        GM_Set(K_PLANNER_NEXT, Date.now());
        try { unsafeWindow.mrbV9Planner?.updateTask?.('v9-bullets', { nextAt:Date.now(), status:'handmatig gestart' }); } catch(e) {}
      } else {
        // Geen legacy-loop: registreer direct in de plannerwachtrij.
        GM_Set(K_PLANNER_NEXT, Date.now());
        setPlannerManaged(true);
        ensureDirectPlannerConnection();
      }
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

    let can = bulletsCanBuySingle();
    const left = bulletsLeftToBuyToday();
    if (can == null || can <= 0) can = toInt(amount.value);
    if (left != null && left > 0 && (can == null || can <= 0 || left < can)) can = left;
    if (can == null || can <= 0) throw new Error('Geen geldig aantal kogels beschikbaar om te kopen.');

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

      setInfo('➡️ V9 Planner: Bullet-prijs controleren…');
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
      const nextAt = nextHalfHourAt();
      GM_Set(K_PLANNER_NEXT, nextAt);
      loadPage(URL_INFO);
      const refillTime = new Date(nextAt).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
      setInfoCountdown(nextAt, remaining => `✅ Gekocht — volgende prijscontrole om ${refillTime} (nog ${fmtMs(remaining)}).`);
      return { nextAt, status:'gekocht; wacht op refill' };
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
      if (running) setInfoCountdown(nextAt, remaining => `🧭 V10 Planner gekoppeld — volgende controle om ${when} (nog ${fmtMs(remaining)}).`);
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
    plannerConnected(){
      setPlannerManaged(true);
      return true;
    },
    state:()=>({running, plannerManaged, plannerBusy, useSluggs, maxPrice})
  };


  // =====================================================================
  // V10.0.4 — BULLETS REGISTRATIE-WACHTRIJ
  // Bullets meldt zich direct bij de registratiebroker aan. Hierdoor is de
  // status niet meer afhankelijk van de laadvolgorde van de planner.
  // =====================================================================
  function bulletPlannerTaskSpec(){
    return {
      module:'Bullets',
      task:{
        id:'v9-bullets',
        title:'Bullets / prijsrefill',
        module:'Bullets',
        priority:70,
        nextAt:Number(GM_Get(K_PLANNER_NEXT, Date.now())) || Date.now(),
        enabled:!!running,
        requiresNavigation:true,
        run:async()=>{
          if (!running) return { delayMs:15_000, status:'module staat uit' };
          return await plannerStep();
        }
      },
      onConnect:(planner)=>{
        setPlannerManaged(true);
        planner.updateTask?.('v9-bullets', {
          enabled:!!running,
          nextAt:Number(GM_Get(K_PLANNER_NEXT, Date.now())) || Date.now(),
          status:running ? 'V10.0.4 gekoppeld' : 'module staat uit'
        });
      }
    };
  }

  function ensureDirectPlannerConnection(){
    // De module is vanaf nu planner-managed, ook wanneer de planner verderop
    // in het bestand nog niet is opgebouwd. De broker bewaart de taak dan.
    setPlannerManaged(true);

    const spec = bulletPlannerTaskSpec();
    const planner = unsafeWindow.mrbV9Planner;

    try {
      if (planner && typeof planner.registerTask === 'function') {
        planner.registerTask(spec.task);
        spec.onConnect(planner);
        return true;
      }

      const broker = unsafeWindow.mrbV10Registration;
      if (broker && typeof broker.register === 'function') {
        broker.register(spec);
        return true;
      }
    } catch(e) {
      try { console.warn('[Bullets planner registration]', e); } catch(_) {}
    }
    return false;
  }

  // Direct proberen en daarna blijven herstellen. De interval navigeert niet;
  // hij controleert uitsluitend of de taak en interne plannerstatus bestaan.
  setTimeout(ensureDirectPlannerConnection, 0);
  mrbSetInterval(ensureDirectPlannerConnection, 3000);

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

        // 6) Na aankoop wachten tot de volgende fabriek-refill.
        const nextAt = nextHalfHourAt();
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
    // Bullets draait uitsluitend via de centrale planner. De taak wordt
    // onmiddellijk in de registratie-wachtrij gezet, ook als de planner
    // pas later in dit bestand wordt opgebouwd.
    stopFlag = true;
    setPlannerManaged(true);
    ensureDirectPlannerConnection();
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
      if (plannerManaged){
        GM_Set(K_PLANNER_NEXT, Date.now());
        try { unsafeWindow.mrbV9Planner?.updateTask?.('v9-bullets', { nextAt:Date.now(), status:'master gestart' }); } catch(e) {}
      } else {
        // Geen legacy-loop: registreer direct in de plannerwachtrij.
        GM_Set(K_PLANNER_NEXT, Date.now());
        setPlannerManaged(true);
        ensureDirectPlannerConnection();
      }
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
// 4) TRAVELBLOK
// =====================================================================
;(function Travel(){
  const K_ON   = 'travel_scriptAan';
  const K_MODE = 'travel_mode';           // 'nbp' | '48'
  const K_IDX  = 'travel_travelIndex';    // 0-based index van volgende vlucht

  let on   = GM_Get(K_ON, false);
  let mode = GM_Get(K_MODE, 'nbp');       // default NyBalPhi
  let idx  = GM_Get(K_IDX, 0);
  let fs   = null;

  // --- Hardcoded city → onTravelData(ID) mapping ---
  const CITY_TO_ID = {
    Det: 0,  // Detroit
    Chi: 1,  // Chicago
    Pal: 2,  // Palermo
    NY : 3,  // New York
    LV : 4,  // Las Vegas
    Phi: 5,  // Philadelphia
    Bal: 6,  // Baltimore
    Cor: 7   // Corleone
  };

  const CITY_LABEL = {NY:'NY', Phi:'Phi', Bal:'Bal', Det:'Det', LV:'LV', Chi:'Chi', Pal:'Pal', Cor:'Cor'};

  // --- Schedules ---
  const SCHED_NBP = ['NY','Bal','Phi']; // NyBalPhi loop
  const SCHED_48 = [
    'NY','Phi','NY','Bal','Phi','Bal','Phi','Bal','Phi','LV','Bal','LV','Bal','LV','Bal','Chi',
    'LV','Chi','LV','Chi','LV','Pal','Chi','Pal','Chi','Pal','Chi','Cor','Pal','Cor','Pal','Cor',
    'Pal','Det','Cor','Det','Cor','Det','Cor','NY','Det','NY','Det','NY','Det','Phi','NY','Phi'
  ];

  function getSchedule(){ return mode==='48' ? SCHED_48 : SCHED_NBP; }
  function schedLen(){ return getSchedule().length; }
  function normalizeIdx(){ const L=schedLen(); if (L>0){ idx = ((idx%L)+L)%L; } }

  // --- Page loader (SPA/fallback) ---
  const loadPage = (function(){
    try {
      const gui = unsafeWindow?.omerta?.GUI?.container;
      if (unsafeWindow.mrbNavigate) return qs=>unsafeWindow.mrbNavigate(qs,{source:'travel'});
      if (gui && typeof gui.loadPage === 'function') return qs => gui.loadPage(qs);
    } catch {}
    return qs => { if (unsafeWindow.mrbNavigate) return unsafeWindow.mrbNavigate(qs,{source:'fallback'}); if (qs.startsWith('?')) location.search = qs; else location.href = qs; };
  })();

  // --- UI Block ---
  const block = addBlock(`
    <h4>Travel</h4>
    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="trToggle" class="gm-btn">${on ? 'Stop' : 'Start'}</button>
      <div id="trStatus" class="gm-status" style="margin:0;">
        ${on ? '<span class="ok">✅ Actief</span>' : '<span class="bad">⛔</span>'}
      </div>
    </div>

    <div class="gm-row" style="gap:12px;margin-top:8px;">
      <label><input type="radio" name="trMode" value="nbp" ${mode==='nbp'?'checked':''}> NyBalPhi</label>
      <label><input type="radio" name="trMode" value="48"  ${mode==='48'?'checked':''}> 48</label>
    </div>

    <div class="gm-row" style="gap:12px;margin-top:8px; align-items:center;">
      <div>Nr.:</div>
      <select id="trIndex" class="gm-input" style="min-width:64px;"></select>
      <div id="trNext" class="gm-status" style="margin:0;"></div>
    </div>
  `,'04-travel');

  // --- Helpers ---
  function q1(sel,root=document){ return root.querySelector(sel); }
  function rdelay(min,max){ return Math.floor(min + Math.random()*(max-min+1)); }

  function ui(){
    normalizeIdx();
    // Toggle + status
    q1('#trToggle', block).textContent = on ? 'Stop' : 'Start';
    q1('#trStatus', block).innerHTML = on
      ? '<span class="ok">✅ Actief</span>'
      : '<span class="bad">⛔</span>';

    // Index dropdown (1..len)
    const sel = q1('#trIndex', block);
    const wantLen = schedLen();
    if (!sel.dataset._builtFor || +sel.dataset._builtFor !== wantLen){
      sel.innerHTML = '';
      for (let i=1;i<=wantLen;i++){
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = String(i);
        sel.appendChild(opt);
      }
      sel.dataset._builtFor = String(wantLen);
    }
    sel.value = String((idx % wantLen) + 1);

    // Volgende stad
    const nextCity = getSchedule()[idx % wantLen];
    q1('#trNext', block).textContent = `Volgende: ${CITY_LABEL[nextCity]||nextCity}`;
  }

  // --- Parsing van "Nu/NOW/Now" / "xM yS" ---
  function parse(t){
    if (!t) return 0;
    const s = t.trim();
    if (/^(Nu|NOW|Now)$/i.test(s)) return 0;
    let m = 0, sec = 0;
    const so = s.match(/^(\d+)S$/i);
    if (so) sec = +so[1];
    const ms = s.match(/^(\d+)M(?:\s+(\d+)S)?$/i);
    if (ms){ m = +ms[1]; if (ms[2]) sec = +ms[2]; }
    return (m*60 + sec) * 1000;
  }

  function goInfo(){
    if (!on) return;
    clearTimeout(fs);
    loadPage('/information.php');
    setTimeout(checkAvail, 1000);
  }

  // --- Exacte city-click via hardcoded ID ---
  function findAnchorById(id){
    return document.querySelector(`a[onclick="onTravelData(${id});"]`)
        || document.querySelector(`a[onclick^="onTravelData(${id})"]`)
        || null;
  }

  function clickCity(code){
    const id = CITY_TO_ID[code];
    if (id==null){
      console.warn('[Travel] Geen ID bekend voor', code);
      return false;
    }
    // 1) Voorkeur: direct via onTravelData(ID)
    if (typeof unsafeWindow.onTravelData === 'function'){
      unsafeWindow.onTravelData(id);
      return true;
    }
    // 2) Fallback: klik exact de anchor met die ID (geen andere!)
    const a = findAnchorById(id);
    if (!a) return false;
    try { a.click(); } catch{}
    try { a.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window})); } catch{}
    return true;
  }

  function promptOpen(){ return document.querySelector('.jqi') !== null; }

  function waitClose(timeout=4000){
    return new Promise(res=>{
      if (!promptOpen()) return res(true);
      let done = false;
      const t = setTimeout(()=>{ if (!done){ done = true; res(false); } }, timeout);
      const mo = new MutationObserver(()=>{
        if (!promptOpen() && !done){ done = true; clearTimeout(t); try{ mo.disconnect(); }catch{} res(true); }
      });
      mo.observe(document.documentElement, {childList:true, subtree:true});
    });
  }

  function btnTravel(){
    return q1('button[name="jqi_state0_buttonTravel"][value="true"]')
      || q1('.jqi .jqibuttons button[name="jqi_state0_buttonTravel"]')
      || Array.from(document.querySelectorAll('button.jqibutton, .jqibuttons button, button.btn'))
           .find(b => /travel/i.test(b.textContent || ''))
      || null;
  }

  async function startTravel(){
    if (!on) return;
    loadPage('/?module=Travel');
    clearTimeout(fs);
    fs = setTimeout(()=>{ if (on) goInfo(); }, 30000); // safety terug naar info
    setTimeout(travelFlow, rdelay(500,900));
  }

  async function travelFlow(){
    if (!on) return;

    const list = getSchedule();
    const cur  = list[idx % list.length]; // gewenste volgende bestemming (afkorting)

    // Click precies de beoogde stad via hardcoded ID
    const ok = clickCity(cur);
    if (!ok){
      console.warn('[Travel] Stad niet klikbaar/gevonden voor', cur, '→ terug naar Info en later opnieuw proberen.');
      return setTimeout(goInfo, 1000);
    }

    // Wacht op prompt en bevestig Travel
    await new Promise(r => setTimeout(r, rdelay(700,1100)));
    let btn = btnTravel();
    if (!btn) return setTimeout(travelFlow, 500);

    try { btn.click(); } catch{}
    const closed = await waitClose(4000);
    if (!closed){
      try { btn.click(); } catch{}
      const closed2 = await waitClose(3000);
      if (!closed2) return setTimeout(travelFlow, 500);
    }

    // Succes → naar volgende in schema (ALTIJD loopend)
    idx = (idx + 1) % list.length;
    GM_Set(K_IDX, idx);
    clearTimeout(fs);
    ui();
    setTimeout(goInfo, rdelay(1200,2000));
  }

  function checkAvail(){
    if (!on) return;
    if (!/information\.php/.test(location.href)) return goInfo();

    const jq = unsafeWindow.jQuery;
    const $cell = jq ? jq('.thinline:eq(1)>tbody>tr:eq(6)>td:eq(1)') : null;
    const status =
      ($cell && ($cell.text() || '').trim())
      || (document.querySelector('.thinline:nth-of-type(2) tbody tr:nth-child(7) td:nth-child(2)')?.textContent || '').trim();

    if (!status) return setTimeout(checkAvail, 800);

    if (/^(Nu|NOW|Now)$/i.test(status)) {
      setTimeout(startTravel, rdelay(800,1200));
    } else {
      const wait = parse(status);
      if (wait > 0) {
        const jitter = rdelay(800,1500);
        setTimeout(()=>{ if(on) goInfo(); }, wait + jitter);
      } else {
        setTimeout(checkAvail, 1000);
      }
    }
  }

  // --- Events ---
  q1('#trToggle', block).addEventListener('click', ()=>{
    on = !on;
    GM_Set(K_ON, on);
    ui();
    if (on) checkAvail(); else clearTimeout(fs);
  });

  block.querySelectorAll('input[name="trMode"]').forEach(r=>{
    r.addEventListener('change', (e)=>{
      mode = e.target.value;
      GM_Set(K_MODE, mode);
      normalizeIdx();
      GM_Set(K_IDX, idx);
      ui();
    });
  });

  q1('#trIndex', block).addEventListener('change', (e)=>{
    const v = Math.max(1, Math.min(+e.target.value||1, schedLen()));
    idx = v - 1;
    GM_Set(K_IDX, idx);
    ui();
  });

  // Init
  normalizeIdx();
  ui();
  if (on) checkAvail();
})();


// [VERWIJDERD] BG Trainer module verwijderd op verzoek.

// [VERWIJDERD] Car Repair module verwijderd op verzoek.
// =====================================================================
// 7) SLOTS
// =====================================================================
;(function Slots(){
  const K_ON = 'slots_auto_on';
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
    return (typeof unsafeWindow.mrbVarDelayMs === 'function')
      ? unsafeWindow.mrbVarDelayMs()
      : (2000 + Math.floor(Math.random() * 3001));
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
      ui('Slots actief: knop gevonden, klik gepland.');
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
    schedule(250);
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
  if (on) schedule(500);
})();

// =====================================================================
// 8) SESSION MANAGER
// Vervangt de oude zichtbare pagina-refresh. Controleert alleen sessie/gate
// en triggert bestaande timer-sync zonder location.reload().
// =====================================================================
;(function SessionManager(){
  const K_ACTIVE='rf_active', K_NEXTTS='rf_next_ts';
  const PERIOD_MS=60*1000;
  let active=GM_Get(K_ACTIVE,true)!==false;
  let nextTs=Number(GM_Get(K_NEXTTS,0))||0;
  let plannerManaged=false;
  let legacyTimer=null;

  const block = addBlock(`
    <h4>Session Manager</h4>
    <div class="gm-row">
      <button id="rfToggle" class="gm-btn">${active ? 'Stop' : 'Start'}</button>
      <div id="rfStatus" class="gm-status" style="margin:0;"></div>
    </div>
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
  function gateVisible(){
    try { return typeof gm_isGateVisible==='function' && gm_isGateVisible(); } catch(e){ return false; }
  }
  function ui(message=''){
    block.querySelector('#rfToggle').textContent=active?'Stop':'Start';
    const gated=gateVisible();
    block.querySelector('#rfStatus').innerHTML=active
      ? (gated ? '<span class="bad">⏸ Sessie/gate</span>' : `<span class="ok">✅ Actief${plannerManaged?' — 🧭 Core':''}</span>`)
      : '<span class="bad">⛔</span>';
    const info=block.querySelector('#rfInfo');
    if(info) info.textContent=message || (active&&nextTs?`Sessiekontrole over ${fmt(nextTs-Date.now())}`:'-');
  }
  function syncPlanner(status='gepland'){
    try{
      unsafeWindow.mrbV9Planner?.updateTask?.('v11-refresh',{
        enabled:!!active,
        nextAt:active?nextTs:Date.now()+PERIOD_MS,
        status
      });
    }catch(e){}
  }
  function clearLegacy(){ if(legacyTimer){ clearTimeout(legacyTimer); legacyTimer=null; } }
  function armLegacy(){
    clearLegacy();
    if(!active||plannerManaged)return;
    normalizeNext();
    legacyTimer=setTimeout(async()=>{ await wake(); armLegacy(); },Math.max(250,nextTs-Date.now()));
  }
  function start(){
    active=true; nextTs=Date.now()+1000;
    GM_Set(K_ACTIVE,true); GM_Set(K_NEXTTS,nextTs);
    syncPlanner('sessiecontrole gepland'); armLegacy(); ui();
  }
  function stop(){
    active=false; nextTs=0;
    GM_Set(K_ACTIVE,false); GM_Set(K_NEXTTS,0);
    clearLegacy(); syncPlanner('module staat uit'); ui();
  }
  async function wake(){
    if(!active) return {enabled:false,delayMs:PERIOD_MS,status:'module staat uit'};
    normalizeNext();
    if(Date.now()<nextTs) return {nextAt:nextTs,status:'wacht op sessiecontrole'};

    const gated=gateVisible();
    if(gated){
      nextTs=Date.now()+15_000;
      GM_Set(K_NEXTTS,nextTs);
      ui('Planner gepauzeerd zolang login/captcha zichtbaar is');
      return {nextAt:nextTs,status:'sessie/gate zichtbaar'};
    }

    // Gebruik de reeds aanwezige achtergrond-timersync indien beschikbaar.
    // Geen zichtbare navigatie en geen volledige page reload.
    try { unsafeWindow.mrbBackgroundTimerSync?.request?.('session-manager'); } catch(e){}
    try { unsafeWindow.mrbBackgroundTimerSync?.syncNow?.('session-manager'); } catch(e){}
    nextTs=Date.now()+PERIOD_MS;
    GM_Set(K_NEXTTS,nextTs);
    ui('Sessie geldig; timers op achtergrond bijgewerkt');
    return {nextAt:nextTs,status:'sessie geldig'};
  }

  block.querySelector('#rfToggle').addEventListener('click',()=>active?stop():start());

  unsafeWindow.mrbV11Refresh={
    setPlannerManaged(v){ plannerManaged=!!v; if(plannerManaged)clearLegacy(); else armLegacy(); ui(); },
    isRunning(){ return !!active; },
    nextAt(){ normalizeNext(); return active?nextTs:Date.now()+PERIOD_MS; },
    wake
  };

  normalizeNext(); ui(); armLegacy();
  mrbSetInterval(ui,1000);
})();
// =====================================================================
// XX) FILL LACKEY (6 uur) + optioneel EMPTY CARS + optioneel SHIP CARS
// - Ship cars zit volledig IN dit blok
// - Ship cars start direct na OC/MOC toewijzing
// - Verdeling: minimaal 1 per stad, oplopend tot max 5 per stad
// - City parsing via zichtbare City-kolom, NIET via hidden carcity
// - SHIPPING / ETA auto’s worden niet opnieuw geselecteerd
// - FIX: pendingInbound + shippedIds + harde shipcity-validatie
// =====================================================================
;(function FillLackey(){
  const K_ON    = 'fl_running';
  const K_EMPTY = 'fl_emptyCars';
  const K_SHIP  = 'fl_shipCars';
  const K_NEXT  = 'fl_nextAt';

  const PERIOD_MS = 6 * 60 * 60 * 1000; // 6 uur

  let running   = !!GM_Get(K_ON, false);
  let emptyCars = !!GM_Get(K_EMPTY, false);
  let shipCars  = !!GM_Get(K_SHIP, false);
  let nextAt    = Number(GM_Get(K_NEXT, 0)) || 0;

  if (shipCars && !emptyCars){
    emptyCars = true;
    GM_Set(K_EMPTY, true);
  }

  let schedTimer = null;
  let busy = false;

  // ---- UI ----
  const block = addBlock(`
    <h4>Fill lackey</h4>

    <div class="gm-row" style="align-items:center;gap:8px;">
      <button id="flToggle" class="gm-btn">${running ? 'Stop' : 'Start'}</button>
      <div id="flStatus" class="gm-status" style="margin:0;">
        ${running ? '<span class="ok">✅ Actief</span>' : '<span class="bad">⛔</span>'}
      </div>
    </div>

    <div class="gm-row" style="margin-top:6px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="checkbox" id="flEmptyCars" ${emptyCars ? 'checked' : ''}>
        Empty cars
      </label>
    </div>

    <div class="gm-row" style="margin-top:6px;">
      <label style="display:flex;align-items:center;gap:6px;">
        <input type="checkbox" id="flShipCars" ${shipCars ? 'checked' : ''}>
        Ship cars
      </label>
    </div>

    <div class="gm-row" style="margin-top:6px;">
      <div id="flNext" style="font-size:12px;opacity:.9;"></div>
    </div>
  `,'xx-fill-lackey');

  const q1 = (s, r=document)=> (r||document).querySelector(s);
  const qa = (s, r=document)=> Array.from((r||document).querySelectorAll(s));
  const sleep = (ms)=>new Promise(r=>setTimeout(r, ms));

  function fmt(ts){
    if(!ts) return '-';
    try{
      const d = new Date(ts);
      return d.toLocaleString();
    }catch{
      return String(ts);
    }
  }

  function setStatus(html){
    const el = q1('#flStatus', block);
    if(el) el.innerHTML = html;
  }

  function paint(){
    const btn = q1('#flToggle', block);
    const cbEmpty = q1('#flEmptyCars', block);
    const cbShip  = q1('#flShipCars', block);
    const nx  = q1('#flNext', block);

    if(btn) btn.textContent = running ? 'Stop' : 'Start';
    if(cbEmpty) cbEmpty.checked = !!emptyCars;
    if(cbShip)  cbShip.checked  = !!shipCars;

    if(!running){
      setStatus('<span class="bad">⛔</span>');
      if(nx) nx.textContent = 'Volgende run: -';
      return;
    }

    if(!busy){
      setStatus('<span class="ok">✅ Actief</span>');
    }

    if(nx) nx.textContent = `Volgende run: ${fmt(nextAt)}`;
  }

  // ---- Navigatie helper ----
  function loadPage(target){
    try{
      const gui = unsafeWindow?.omerta?.GUI?.container;
      if (gui && typeof gui.loadPage === 'function'){
        gui.loadPage(target);
        return;
      }
    }catch{}

    try{
      if (target.startsWith('/?') || target.startsWith('?')){
        location.search = target.replace(/^\//,'');
      } else {
        location.href = target;
      }
    }catch{
      location.href = target;
    }
  }

  // ---- Captcha ----
  function captchaActief(){
    return document.getElementById('recaptcha-popup') !== null;
  }

  async function waitCaptchaSolved(){
    while(running && captchaActief()){
      setStatus('<span class="bad">🧩 Captcha</span>');
      await sleep(1000);
    }
    if(!running) throw new Error('ABORT');
  }

  // ---- Gate helpers ----
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
      const r = gateReason();
      setStatus(`<span class="bad">⏸ ${r}</span>`);
      await sleep(5000);
    }
    if(!running) throw new Error('ABORT');

    if (running && clickLimitState() === -1 && clickLimitMsg()){
      setStatus('<span class="ok">↩ Click limit klaar → Info…</span>');
      loadPage('/information.php');
      await sleep(1200);
    }
  }

  async function waitForElement(selector, timeout=15000){
    const step = 200;
    let t = 0;

    while(running){
      if (gateVisible()) await waitGateClear();

      const el = document.querySelector(selector);
      if(el) return el;

      await sleep(step);
      t += step;
      if(t >= timeout) break;
    }

    throw new Error('Element niet gevonden: ' + selector);
  }

  function safeClick(el){
    if(!el) return false;
    try{ el.scrollIntoView({block:'center', inline:'center'}); }catch{}
    try{ el.dispatchEvent(new MouseEvent('mouseover',{bubbles:true,cancelable:true,view:window})); }catch{}
    try{ el.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window})); }catch{}
    try{ el.dispatchEvent(new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window})); }catch{}
    try{ el.click(); }catch{}
    try{ el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window})); }catch{}
    return true;
  }

  function scopeFrom(el){
    return el?.closest('form') || el?.closest('table') || document;
  }

  async function ensureAllCarItemsSelected(selectAllEl){
    const scope = scopeFrom(selectAllEl);

    safeClick(selectAllEl);
    await sleep(400);

    let items = qa('input[type="checkbox"][name="items_selected"][data-lackeyitem="true"]', scope);
    if(!items.length) items = qa('input[type="checkbox"][name="items_selected"][data-lackeyitem="true"]', document);

    if(!items.length){
      throw new Error('Geen car item checkboxes gevonden (items_selected).');
    }

    const checkedCount = items.filter(x => x.checked).length;
    if(checkedCount === items.length) return { scope, items };

    for(const cb of items){
      if(!cb.checked){
        safeClick(cb);
        await sleep(30);
      }
    }

    await sleep(250);

    const checkedAfter = items.filter(x => x.checked).length;
    if(checkedAfter === 0){
      throw new Error('Selecteren van cars faalt (na fallback nog 0 geselecteerd).');
    }

    return { scope, items };
  }

  function clearSchedule(){
    if(schedTimer){
      clearTimeout(schedTimer);
      schedTimer = null;
    }
  }

  function planNext(ts){
    nextAt = ts;
    GM_Set(K_NEXT, nextAt);
    clearSchedule();

    if(!running) return;

    const wait = Math.max(1000, nextAt - Date.now());
    schedTimer = setTimeout(()=>runOnce('scheduled'), wait);
    paint();
  }

  // =====================================================================
  // SHIP CARS HELPERS (volledig intern in FillLackey)
  // =====================================================================
  const SHIP_CITY_IDS = [0,1,2,3,4,5,6,7];
  const SHIP_CITY_NAME_TO_ID = {
    'detroit': 0,
    'chicago': 1,
    'palermo': 2,
    'new york': 3,
    'newyork': 3,
    'las vegas': 4,
    'lasvegas': 4,
    'philadelphia': 5,
    'baltimore': 6,
    'corleone': 7,
  };
  const SHIP_CITY_ID_TO_NAME = {
    0: 'Detroit',
    1: 'Chicago',
    2: 'Palermo',
    3: 'New York',
    4: 'Las Vegas',
    5: 'Philadelphia',
    6: 'Baltimore',
    7: 'Corleone',
  };

  function normalizeCityName(txt){
    return String(txt || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function cityIdFromVisibleName(txt){
    const norm = normalizeCityName(txt);
    if (norm in SHIP_CITY_NAME_TO_ID) return SHIP_CITY_NAME_TO_ID[norm];

    const compact = norm.replace(/\s+/g, '');
    if (compact in SHIP_CITY_NAME_TO_ID) return SHIP_CITY_NAME_TO_ID[compact];

    return null;
  }

  function parseMoney(txt){
    const n = Number(String(txt || '').replace(/[^0-9.-]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  function cssEsc(v){
    if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(String(v));
    return String(v).replace(/"/g, '\\"');
  }

  function onGaragePage(){
    const href = String(location.href || '');
    const hash = String(location.hash || '');
    const path = String(location.pathname || '');
    return /garage\.php/i.test(path) || /garage\.php/i.test(href) || /garage\.php/i.test(hash);
  }

  function withAutoConfirm(fn){
    const prevConfirm = unsafeWindow.confirm;
    const prevConfirmAction = unsafeWindow.confirmAction;
    try{
      unsafeWindow.confirm = ()=>true;
      unsafeWindow.confirmAction = ()=>true;
    }catch{}

    try{
      return fn();
    } finally {
      try{
        unsafeWindow.confirm = prevConfirm;
        unsafeWindow.confirmAction = prevConfirmAction;
      }catch{}
    }
  }

  async function waitGarageReady(maxMs=15000){
    const t0 = Date.now();

    while (Date.now() - t0 < maxMs){
      await waitGateClear();
      await waitCaptchaSolved();

      const hasCars  = document.querySelector('input[type="checkbox"][name^="carid"]');
      const hasRadio = document.querySelector('input[type="radio"][name="shipcity"]');
      const hasAll   = document.querySelector('input[type="button"][value="All"]');
      const hasShip  = document.querySelector('input[type="submit"][name="ship"]');

      if (hasCars && hasRadio && hasAll && hasShip) return true;
      await sleep(250);
    }

    return false;
  }

  async function ensureGarageReadyForShip(forceReload=false){
    if (forceReload || !onGaragePage()){
      loadPage('/garage.php');
      await sleep(1200);
    }

    await waitGateClear();
    await waitCaptchaSolved();

    let ok = await waitGarageReady(8000);
    if (!ok && !forceReload){
      loadPage('/garage.php');
      await sleep(1200);
      await waitGateClear();
      await waitCaptchaSolved();
      ok = await waitGarageReady(15000);
    }

    if (!ok){
      throw new Error('Garage niet klaar voor ship cars.');
    }
  }

  function parseGarageCars(){
    const rows = Array.from(document.querySelectorAll('input[type="checkbox"][name^="carid"]'))
      .map(cb => cb.closest('tr'))
      .filter(Boolean);

    const seen = new Set();
    const cars = [];

    for (const row of rows){
      const cb = row.querySelector('input[type="checkbox"][name^="carid"]');
      const carId = String(cb?.value || '').trim();
      if (!carId || seen.has(carId)) continue;
      seen.add(carId);

      const tds = row.querySelectorAll('td');
      if (tds.length < 7) continue;

      const cityText  = String(tds[4]?.textContent || '').trim();
      const notesText = String(tds[6]?.textContent || '').replace(/\s+/g, ' ').trim();
      const cityId = cityIdFromVisibleName(cityText);
      if (cityId == null) continue;

      const shipping =
        /shipping/i.test(notesText) ||
        /eta\s*:/i.test(notesText) ||
        !!tds[6]?.querySelector?.('[data-time-end]');

      const value = parseMoney(tds[3]?.textContent || '');
      const selectable = !!cb && !cb.disabled && !shipping;

      cars.push({
        carId,
        cityId,
        cityText,
        notesText,
        value,
        shipping,
        selectable,
      });
    }

    return cars;
  }

  function computeShipTarget(totalEffective){
    if (totalEffective <= 0) return 0;
    return Math.max(1, Math.min(5, Math.floor(totalEffective / 8) || 1));
  }

  function buildShipPlan(cars, pendingInbound, shippedIds){
    const stationary = cars.filter(c => !c.shipping && c.selectable && !shippedIds.has(c.carId));

    const inboundTotal = Object.values(pendingInbound || {}).reduce((a, b) => a + Number(b || 0), 0);
    const totalEffective = stationary.length + inboundTotal;
    const target = computeShipTarget(totalEffective);

    if (!target){
      return { target: 0, totalEffective: 0, plan: [] };
    }

    const byCity = new Map(SHIP_CITY_IDS.map(id => [id, []]));
    for (const c of stationary){
      byCity.get(c.cityId).push(c);
    }

    for (const [cityId, list] of byCity.entries()){
      list.sort((a, b) => {
        const byValue = a.value - b.value;
        if (byValue !== 0) return byValue;
        return Number(a.carId) - Number(b.carId);
      });
    }

    const deficits = new Map();
    const donors = new Map();

    for (const cityId of SHIP_CITY_IDS){
      const list = byCity.get(cityId) || [];
      const haveStationary = list.length;
      const inbound = Number((pendingInbound && pendingInbound[cityId]) || 0);
      const haveEffective = haveStationary + inbound;

      deficits.set(cityId, Math.max(0, target - haveEffective));
      donors.set(cityId, list.slice(0, Math.max(0, haveStationary - target)));
    }

    const plan = [];

    for (const dest of SHIP_CITY_IDS){
      let need = deficits.get(dest) || 0;
      if (need <= 0) continue;

      while (need > 0){
        let bestSrc = null;
        let bestPool = null;

        for (const src of SHIP_CITY_IDS){
          if (src === dest) continue;
          const pool = donors.get(src) || [];
          if (!bestPool || pool.length > bestPool.length){
            bestSrc = src;
            bestPool = pool;
          }
        }

        if (!bestPool || !bestPool.length) break;

        const take = Math.min(need, bestPool.length);
        const batch = bestPool.splice(0, take);
        if (!batch.length) break;

        plan.push({
          src: bestSrc,
          dest,
          carIds: batch.map(x => x.carId),
        });

        need -= batch.length;
      }
    }

    return { target, totalEffective, plan };
  }

  function deselectAllCars(){
    try{
      unsafeWindow.select_all_cars?.(false);
    }catch{}

    const cbs = Array.from(document.querySelectorAll('input[type="checkbox"][name^="carid"]'));
    for (const cb of cbs){
      if (cb.checked) safeClick(cb);
    }
  }

  function selectCarsByIds(carIds){
    for (const id of carIds){
      const cb = document.querySelector(`input[type="checkbox"][name^="carid"][value="${cssEsc(id)}"]`);
      if (cb && !cb.checked) safeClick(cb);
    }
  }

  function verifyCarsSelected(carIds){
    return carIds.every(id => {
      const cb = document.querySelector(`input[type="checkbox"][name^="carid"][value="${cssEsc(id)}"]`);
      return !!cb && cb.checked;
    });
  }

  async function pickShipCity(dest, timeout=2500){
    const wanted = String(dest);
    const t0 = Date.now();

    while (Date.now() - t0 < timeout){
      const radio = document.querySelector(`input[type="radio"][name="shipcity"][value="${wanted}"]`);
      if (!radio) return false;

      const checkedNow = document.querySelector('input[type="radio"][name="shipcity"]:checked');
      if (checkedNow && String(checkedNow.value) === wanted) return true;

      // 1) gewone klik
      safeClick(radio);
      await sleep(80);

      let current = document.querySelector('input[type="radio"][name="shipcity"]:checked');
      if (current && String(current.value) === wanted) return true;

      // 2) klik op label
      const label = radio.closest('label');
      if (label){
        safeClick(label);
        await sleep(80);
        current = document.querySelector('input[type="radio"][name="shipcity"]:checked');
        if (current && String(current.value) === wanted) return true;
      }

      // 3) harde force
      try{
        radio.checked = true;
        radio.dispatchEvent(new Event('input',  { bubbles:true }));
        radio.dispatchEvent(new Event('change', { bubbles:true }));
        radio.dispatchEvent(new MouseEvent('click', { bubbles:true, cancelable:true, view:window }));
      }catch{}
      await sleep(100);

      current = document.querySelector('input[type="radio"][name="shipcity"]:checked');
      if (current && String(current.value) === wanted) return true;
    }

    return false;
  }

  async function waitButtonEnabled(selector, timeout=10000){
    const t0 = Date.now();
    while (running && (Date.now() - t0 < timeout)){
      await waitGateClear();
      await waitCaptchaSolved();

      const el = document.querySelector(selector);
      if (el && el.offsetParent !== null && !el.disabled) return el;

      await sleep(250);
    }
    return null;
  }

  async function submitShipClick(){
    const btn = await waitButtonEnabled('input[type="submit"][name="ship"]', 8000);
    if (!btn) return false;

    return withAutoConfirm(() => {
      safeClick(btn);
      return true;
    });
  }

  function idsStillSelectable(postCars, ids){
    const openSet = new Set(
      postCars
        .filter(c => c.selectable && !c.shipping)
        .map(c => c.carId)
    );
    return ids.filter(id => openSet.has(id));
  }

  async function runShipCarsFlow(){
    setStatus('<span class="ok">🚚 Ship cars…</span>');
    await ensureGarageReadyForShip(false);

    const pendingInbound = {};
    const shippedIds = new Set();

    let safety = 0;

    while (running && safety < 50){
      safety++;

      const cars = parseGarageCars();
      const planObj = buildShipPlan(cars, pendingInbound, shippedIds);

      if (!planObj.plan.length){
        return;
      }

      const step = planObj.plan[0];
      const selectableNow = new Set(
        cars
          .filter(c => c.selectable && !c.shipping && !shippedIds.has(c.carId))
          .map(c => c.carId)
      );
      const usableIds = step.carIds.filter(id => selectableNow.has(id));

      if (!usableIds.length){
        await ensureGarageReadyForShip(true);
        continue;
      }

      const destName = SHIP_CITY_ID_TO_NAME[step.dest] || String(step.dest);
      setStatus(`<span class="ok">🚚 Ship → ${destName} (${usableIds.length})</span>`);

      deselectAllCars();
      await sleep(250);

      selectCarsByIds(usableIds);
      await sleep(350);

      if (!verifyCarsSelected(usableIds)){
        selectCarsByIds(usableIds);
        await sleep(350);
      }

      if (!verifyCarsSelected(usableIds)){
        await ensureGarageReadyForShip(true);
        continue;
      }

      const cityPicked = await pickShipCity(step.dest, 2500);
      if (!cityPicked){
        await ensureGarageReadyForShip(true);
        continue;
      }

      const checkedCity = document.querySelector('input[type="radio"][name="shipcity"]:checked');
      if (!checkedCity || String(checkedCity.value) !== String(step.dest)){
        await ensureGarageReadyForShip(true);
        continue;
      }

      await sleep(300);

      const didSubmit = await submitShipClick();
      if (!didSubmit){
        await ensureGarageReadyForShip(true);
        continue;
      }

      await sleep(1200);
      await waitGateClear();
      await waitCaptchaSolved();
      await ensureGarageReadyForShip(true);

      // Verifieer of de gekozen auto's niet meer "vrij" beschikbaar staan.
      // Alleen dan tellen we de stap als succesvol.
      const postCars = parseGarageCars();
      const stillOpen = idsStillSelectable(postCars, usableIds);

      if (stillOpen.length === 0){
        for (const id of usableIds) shippedIds.add(id);
        pendingInbound[step.dest] = (pendingInbound[step.dest] || 0) + usableIds.length;
      } else {
        // submit leek niet goed gepakt te hebben; niks reserveren
        await sleep(500);
      }
    }
  }

  async function runOnce(reason){
    if(!running || busy) return;

    busy = true;
    paint();

    // Bewaar globale confirm-handlers. De garageflow schakelt deze tijdelijk uit,
    // maar mag andere modules nooit met een permanente auto-confirm achterlaten.
    const originalConfirm = unsafeWindow.confirm;
    const originalConfirmAction = unsafeWindow.confirmAction;
    let confirmOverrideActive = false;
    const restoreConfirmHandlers = ()=>{
      if (!confirmOverrideActive) return;
      try { unsafeWindow.confirm = originalConfirm; } catch(e) {}
      try { unsafeWindow.confirmAction = originalConfirmAction; } catch(e) {}
      confirmOverrideActive = false;
    };

    try{
      if (gateVisible()) await waitGateClear();

      // -------- 1) Lackeys: Fill all lackeys --------
      setStatus('<span class="ok">▶ Lackeys…</span>');
      loadPage('/?module=Lackeys');
      await sleep(900);
      await waitGateClear();
      await waitCaptchaSolved();

      const fillBtn = await waitForElement('#btnFillAllLackeysInline', 20000);
      safeClick(fillBtn);

      setStatus('<span class="ok">⏳ Fill… (8s)</span>');
      await sleep(8000);
      await waitGateClear();

      // -------- 2) Optioneel: Empty cars --------
      if(emptyCars){
        setStatus('<span class="ok">▶ Cars…</span>');
        loadPage('/?module=Cars');
        await sleep(900);
        await waitGateClear();
        await waitCaptchaSolved();

        const selectAll = await waitForElement(
          'input[type="checkbox"][data-lackey="2"][data-action="items_selectAll"]',
          20000
        );

        setStatus('<span class="ok">☑ Select all…</span>');
        const { scope } = await ensureAllCarItemsSelected(selectAll);

        await sleep(250);

        let transferBtn =
          q1('input[type="submit"][value="Transfer to garage"]', scope)
          || q1('input[type="submit"][value="Transfer to garage"]', document);

        if(!transferBtn){
          throw new Error('Transfer to garage knop niet gevonden.');
        }

        setStatus('<span class="ok">🚚 Transfer…</span>');

        const form = transferBtn.closest('form');
        if(form && typeof form.requestSubmit === 'function'){
          try{ form.requestSubmit(transferBtn); }
          catch{ safeClick(transferBtn); }
        } else {
          safeClick(transferBtn);
        }

        await sleep(3000);
        await waitGateClear();

        const okBtn = await waitForElement(
          'button[name="jqi_message_buttonOK"], button.jqibutton[name="jqi_message_buttonOK"]',
          20000
        );
        safeClick(okBtn);

        await sleep(600);
        await waitGateClear();

        // -------- 2b) Garage: All -> Heist -> All -> OC/MOC --------
        setStatus('<span class="ok">▶ Garage…</span>');
        try{ unsafeWindow.confirm = ()=>true; confirmOverrideActive = true; }catch{}
        try{ unsafeWindow.confirmAction = ()=>true; confirmOverrideActive = true; }catch{}

        loadPage('/garage.php');
        await sleep(1200);
        await waitGateClear();
        await waitCaptchaSolved();

        const allSel   = 'input.btn.btn-small.btn-grey[type="button"][value="All"], input[type="button"][value="All"]';
        const heistSel = 'input.btn.btn-small.btn-blue.btn-toggle[type="submit"][value="Heist Car"], input[type="submit"][value="Heist Car"], input[type="submit"][name="heist"]';
        const ocSel    = 'input.btn.btn-small.btn-blue.btn-toggle[type="submit"][value="OC/MOC Car"], input[type="submit"][value="OC/MOC Car"], input[type="submit"][name="oc"]';

        setStatus('<span class="ok">☑ All…</span>');
        const allBtn = await waitForElement(allSel, 8000);
        safeClick(allBtn);
        await sleep(600);
        await waitGateClear();

        setStatus('<span class="ok">🚗 Heist Car…</span>');
        const heistBtn = await waitForElement(heistSel, 8000);
        safeClick(heistBtn);

        setStatus('<span class="ok">⏳ Terug…</span>');
        await sleep(900);
        await waitGateClear();
        await waitForElement(allSel, 8000);

        setStatus('<span class="ok">☑ All (opnieuw)…</span>');
        const allBtn2 = await waitForElement(allSel, 8000);
        safeClick(allBtn2);

        setStatus('<span class="ok">⏳ OC/MOC klaarzetten…</span>');
        await sleep(600);
        await waitGateClear();

        const ocBtn = await waitForElement(ocSel, 8000);

        setStatus('<span class="ok">🚙 OC/MOC Car…</span>');
        safeClick(ocBtn);

        await sleep(1200);
        await waitGateClear();

        // -------- 2c) Optioneel: Ship cars --------
        if (shipCars){
          await runShipCarsFlow();
        }
      }

      // De garage-acties zijn afgerond: herstel bevestigingsgedrag voordat
      // een andere module of pagina verdergaat.
      restoreConfirmHandlers();

      // -------- 3) Terug naar info --------
      setStatus('<span class="ok">↩ Info…</span>');
      loadPage('/information.php');

      // -------- 4) Plan volgende run --------
      const due = Date.now() + PERIOD_MS;
      planNext(due);

      busy = false;
      paint();
    } catch(e){
      restoreConfirmHandlers();
      busy = false;
      if(!running){
        paint();
        return;
      }
      console.warn('[FillLackey] Fout:', e);
      setStatus('<span class="bad">⛔ Error</span>');
      planNext(Date.now() + PERIOD_MS);
      paint();
    }
  }

  // ---- Toggle handlers ----
  q1('#flEmptyCars', block)?.addEventListener('change', (e)=>{
    emptyCars = !!e.target.checked;

    if (!emptyCars && shipCars){
      shipCars = false;
      GM_Set(K_SHIP, false);
    }

    GM_Set(K_EMPTY, emptyCars);
    paint();
  });

  q1('#flShipCars', block)?.addEventListener('change', (e)=>{
    shipCars = !!e.target.checked;

    if (shipCars && !emptyCars){
      emptyCars = true;
      GM_Set(K_EMPTY, true);
    }

    GM_Set(K_SHIP, shipCars);
    paint();
  });

  q1('#flToggle', block)?.addEventListener('click', ()=>{
    running = !running;
    GM_Set(K_ON, running);

    busy = false;
    clearSchedule();

    if(running){
      nextAt = Date.now();
      GM_Set(K_NEXT, nextAt);
      paint();
      runOnce('manual');
    } else {
      setStatus('<span class="bad">⛔</span>');
      paint();
    }
  });

  // ---- Init ----
  paint();

  if(running){
    const now = Date.now();
    if(!nextAt || nextAt <= 0){
      nextAt = now;
      GM_Set(K_NEXT, nextAt);
      runOnce('init');
    } else if(nextAt <= now){
      runOnce('catchup');
    } else {
      planNext(nextAt);
    }
  }
})();


// [VERWIJDERD] Bank module verwijderd op verzoek.
// =====================================================================
// 14) PREFILL (Detectives + Blood buy)
// =====================================================================
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
    unsafeWindow.__mrbMilestonePopupDebounce=setTimeout(processPopup,100);
  });
  observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
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

  function connectPlanner(){
    if(plannerRegistered)return;
    const p=planner();
    if(!p?.registerTask)return setTimeout(connectPlanner,500);
    plannerRegistered=true;
    p.registerTask({
      id:'v10-milestones',title:'Milestones controle',module:'Milestones',priority:95,
      nextAt:Date.now()+3000,enabled:active,requiresNavigation:true,
      run:hardCheck
    });
  }
  connectPlanner();

  q('#mcToggle',block)?.addEventListener('click',()=>{
    active=!active;GM_Set(K_ACTIVE,active);ui();
    try{ planner()?.updateTask?.('v10-milestones',{enabled:active,nextAt:Date.now()+250,status:active?'start aangevraagd':'module uit'}); }catch(e){}
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

  // ---------- UITLOG-GUARD (zelfde stijl als Heist) ----------
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

    // ✅ stop direct als login gedetecteerd is (zelfde patroon als Heist)
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
    // ✅ Start weigeren als je uitgelogd bent (zelfde als Heist)
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

  // ✅ init: als running=true maar je bent uitgelogd → uitzetten (zelfde als Heist)
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

    const sendBtn = document.querySelector(`button[name="jqi_form_buttonSend"], input[name="jqi_form_buttonSend"]`);
    if (sendBtn) { sendBtn.click(); await sleep(300); return true; }
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
    heist: /heist/i,
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
      hidden.name = which; // verwacht: heist | oc | raid | repair
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
        <input type="button" class="gm-btn" id="gm_heist"  value="Heist Auto">
        <input type="button" class="gm-btn" id="gm_oc"     value="OC/MOC Auto">
        <input type="button" class="gm-btn" id="gm_raid"   value="Spotoverval Auto">
        <input type="button" class="gm-btn" id="gm_repair" value="Repareer">
      </div>
    `;

    // Zet ‘m zichtbaar bovenaan, binnen het <center> blok als dat er is.
    const center = form.querySelector('center');
    if (center && center.firstChild) center.insertBefore(bar, center.firstChild);
    else form.insertBefore(bar, form.firstChild);

    bar.querySelector('#gm_heist').onclick  = () => clickOrSubmit('heist');
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
  new MutationObserver(tick).observe(document.body, {childList:true, subtree:true});
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
  mo.observe(document.documentElement || document.body, {childList:true, subtree:true});
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

    function legacyHeistEnabled() {
        try { return !!GM_Get('heist_scriptAan', false); }
        catch (e) { return false; }
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

        // OC 2.0 beheert deze pagina exclusief. De legacy handler mag dan
        // geen Heist-link meer aanklikken.
        if (ocCoreOwnsFlow() || spotCoreOwnsFlow()) return;

        let link;

        // 1. Heist: auto-klik Accept / Accepteer
        if (legacyHeistEnabled()) link = firstLinkMatching(function (a) {
            return hrefHas(a, 'module=heist') &&
                   hasText(a, /(Accept|Accepteer)/i);
        });
        if (legacyHeistEnabled() && link) {
            safeClick(link, 'gcHeistAccept');
            return;
        }

        // 2. OC: legacy auto-accept alleen als OC 2.0 de flow niet beheert
        if (!ocCoreOwnsFlow()) link = firstLinkMatching(function (a) {
            return hrefHas(a, 'orgcrime2.php') &&
                   hasText(a, /(Accept|Accepteer)/i);
        });
        if (!ocCoreOwnsFlow() && link) {
            safeClick(link, 'gcOcAccept');
            return;
        }

        // 3. Heist: auto-klik Lead a Heist / Leid een heist
        link = null;
        if (legacyHeistEnabled()) link = firstLinkMatching(function (a) {
            return hrefHas(a, 'module=heist') &&
                   hasText(a, /(Lead a Heist|Leid een heist)/i);
        });
        if (legacyHeistEnabled() && link) {
            safeClick(link, 'gcHeistLead');
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

        // WE / Heist bullets
        const isHeistForm = /module=heist/i.test(location.href) || /Start Heist|Lead a Heist|Leid een heist/i.test(document.body?.innerText || '');
        if (bullets) bullets.value = isHeistForm ? '50' : '100';
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

    // En opnieuw bij DOM-veranderingen (AJAX/SPA/frames die later vullen)
    const target = document.documentElement || document.body;
    if (target) {
        new MutationObserver(handlePages).observe(target, {
            childList: true,
            subtree: true
        });
    }

})();


})();


// =====================================================================
// HEIST AUTO START PATCH
// Route 66 scherm -> automatisch op Start klikken
// =====================================================================
(function(){

    const LAST_CLICK_KEY = 'mrb_heist_start_last';
    const CLICK_COOLDOWN = 15000;

    function gmGet(k,d){
        try { return GM_Get(k,d); }
        catch(e){
            try { return GM_getValue(k,d); }
            catch(e2){ return d; }
        }
    }

    function gmSet(k,v){
        try { GM_Set(k,v); }
        catch(e){
            try { GM_setValue(k,v); }
            catch(e2){}
        }
    }

    function visible(el){
        return !!(
            el &&
            (el.offsetWidth ||
             el.offsetHeight ||
             el.getClientRects().length)
        );
    }

    function findStartButton(){

        const buttons = document.querySelectorAll(
            'button,input[type="submit"],input[type="button"],a'
        );

        for(const btn of buttons){

            const txt = (
                btn.value ||
                btn.textContent ||
                ''
            ).trim();

            if(/^start$/i.test(txt) && visible(btn)){
                return btn;
            }
        }

        return null;
    }

    function isRoute66Page(){

        const txt = document.body?.innerText || '';

        return (
            /Route\s*66\s*overval/i.test(txt) &&
            /Leider:/i.test(txt) &&
            /Bestuurder:/i.test(txt)
        );
    }

    function heistLeaderRunning(){

        return (
            gmGet('heist_scriptAan', false) &&
            String(gmGet('heist_role','leader')) === 'leader'
        );
    }

    function autoStart(){

        if(!heistLeaderRunning()) return;
        if(!isRoute66Page()) return;

        const last = Number(gmGet(LAST_CLICK_KEY,0));

        if(Date.now() - last < CLICK_COOLDOWN){
            return;
        }

        const btn = findStartButton();

        if(!btn) return;

        gmSet(LAST_CLICK_KEY, Date.now());

        setTimeout(()=>{
            const b = findStartButton();
            if(b) b.click();
        }, 1000);
    }

    mrbSetInterval(autoStart, 2000);

    new MutationObserver(autoStart).observe(
        document.documentElement,
        {
            childList:true,
            subtree:true
        }
    );

    autoStart();


// =====================================================================
// 12) BOOZEN

})();


// =====================================================================
// MRB AUTOJAT HOOGSTE PERCENTAGE PATCH
// Op "Steel een auto" kiest hij automatisch de hoogste percentage kaart.
// =====================================================================
(function(){
  'use strict';

  const K_LAST_CLICK = 'mrb_cars_highest_pct_last_click';
  const CLICK_COOLDOWN_MS = 10000;

  function gmGet(k,d){
    try { return GM_Get(k,d); }
    catch(e){
      try { return GM_getValue(k,d); }
      catch(e2){ return d; }
    }
  }

  function gmSet(k,v){
    try { GM_Set(k,v); }
    catch(e){
      try { GM_setValue(k,v); }
      catch(e2){}
    }
  }

  function clean(s){
    return String(s || '').replace(/\s+/g, ' ').trim();
  }

  function visible(el){
    return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  }

  function onCarsPage(){
    const h = String(location.href || '');
    const t = clean(document.querySelector('#game_container')?.innerText || document.body?.innerText || '');

    return /module=Cars/i.test(h) ||
           /#\/\?module=Cars/i.test(h) ||
           /Steel\s+een\s+auto/i.test(t) ||
           /Steal\s+a\s+car/i.test(t);
  }

  function findGoButton(card){
    return Array.from(card.querySelectorAll('button, input[type="button"], input[type="submit"], a'))
      .filter(el => !el.disabled && visible(el))
      .find(el => /GA\s+ERVOOR|Go\s+for\s+it|Do\s+it/i.test(clean(el.value || el.textContent || el.getAttribute('title') || ''))) || null;
  }

  function getCardPercent(card){
    const txt = clean(card.innerText || card.textContent || '');
    const m = txt.match(/(\d{1,3})\s*%/);
    if (!m) return -1;
    const n = Number(m[1]);
    if (!Number.isFinite(n)) return -1;
    return Math.max(0, Math.min(100, n));
  }

  function findBestCarsButton(){
    const root = document.querySelector('#game_container') || document.body;

    const cards = Array.from(root.querySelectorAll('div, li, article, section'))
      .filter(visible)
      .map(card => ({ card, pct: getCardPercent(card), btn: findGoButton(card) }))
      .filter(x => x.pct >= 0 && x.btn);

    if (cards.length){
      cards.sort((a,b) => b.pct - a.pct);
      return cards[0];
    }

    const buttons = Array.from(root.querySelectorAll('button, input[type="button"], input[type="submit"], a'))
      .filter(el => !el.disabled && visible(el))
      .filter(el => /GA\s+ERVOOR|Go\s+for\s+it|Do\s+it/i.test(clean(el.value || el.textContent || '')));

    const mapped = buttons.map(btn => {
      let node = btn;
      let bestPct = -1;
      for (let i=0; i<6 && node; i++, node=node.parentElement){
        const pct = getCardPercent(node);
        if (pct > bestPct) bestPct = pct;
      }
      return { btn, pct: bestPct };
    }).filter(x => x.pct >= 0);

    if (!mapped.length) return null;
    mapped.sort((a,b) => b.pct - a.pct);
    return mapped[0];
  }

  function safeClick(el){
    try { el.focus(); } catch {}
    try { el.click(); return true; } catch {}
    try {
      el.dispatchEvent(new MouseEvent('mousedown', { bubbles:true, cancelable:true, view:window }));
      el.dispatchEvent(new MouseEvent('mouseup',   { bubbles:true, cancelable:true, view:window }));
      el.dispatchEvent(new MouseEvent('click',     { bubbles:true, cancelable:true, view:window }));
      return true;
    } catch {}
    return false;
  }

  function run(){
    const carsOn = (!!gmGet('cc_running', false) && !!gmGet('cc_doCars', true)) ||
                   !!gmGet('cars_scriptAan', false) ||
                   !!gmGet('crime_carsAan', false) ||
                   !!gmGet('crimes_scriptAan', false) ||
                   !!gmGet('dd_cars', false);

    if (!carsOn) return;
    if (!onCarsPage()) return;

    const last = Number(gmGet(K_LAST_CLICK, 0)) || 0;
    if (Date.now() - last < CLICK_COOLDOWN_MS) return;

    const best = findBestCarsButton();
    if (!best || !best.btn) return;

    gmSet(K_LAST_CLICK, Date.now());

    setTimeout(() => {
      if (!onCarsPage()) return;
      const again = findBestCarsButton();
      if (!again || !again.btn) return;
      try { console.log('[MRB Cars] Hoogste percentage gekozen:', again.pct + '%'); } catch {}
      safeClick(again.btn);
    }, 500 + Math.floor(Math.random() * 600));
  }

  const mo = new MutationObserver(run);

  function start(){
    run();
    if (document.documentElement) {
      mo.observe(document.documentElement, { childList:true, subtree:true, characterData:true });
    }
    mrbSetInterval(run, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once:true });
  } else {
    start();
  }
})();

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
// =====================================================================
(function MRBV9Diagnostics(){
  'use strict';

  const K_LOG = 'mrb_v9_diagnostics_log';
  const MAX = 20;

  function loadLog(){
    try {
      const raw = GM_Get(K_LOG, '[]');
      const value = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return Array.isArray(value) ? value : [];
    } catch(e) { return []; }
  }

  function saveLog(items){
    try { GM_Set(K_LOG, JSON.stringify(items.slice(-MAX))); } catch(e) {}
  }

  function add(kind, message, source=''){
    const items = loadLog();
    const text = String(message || 'Onbekende fout').slice(0, 500);
    const duplicate = items[items.length - 1];
    const now = Date.now();
    if (duplicate && duplicate.kind === kind && duplicate.message === text && now - duplicate.ts < 5000) return;
    items.push({ ts: now, kind, message: text, source: String(source || '').slice(0, 240), page: location.href });
    saveLog(items);
    render();
  }

  window.addEventListener('error', e => {
    add('JavaScript', e?.message || e?.error?.message || 'Onbekende JavaScript-fout', e?.filename || '');
  }, true);

  window.addEventListener('unhandledrejection', e => {
    const reason = e?.reason;
    add('Promise', reason?.stack || reason?.message || String(reason || 'Onbekende Promise-fout'));
  });

  const block = addBlock(`
    <h4>V9 Diagnose</h4>
    <div class="gm-row" style="gap:7px;align-items:center;">
      <div id="mrbV9DiagStatus" class="gm-status" style="margin:0;"></div>
      <button id="mrbV9DiagClear" class="gm-btn">Wis fouten</button>
    </div>
    <details style="margin-top:6px;">
      <summary>Laatste fouten bekijken</summary>
      <div id="mrbV9DiagLog" style="font-size:11px;line-height:1.4;margin-top:5px;max-height:180px;overflow:auto;"></div>
    </details>
  `, '00-v9-diagnostics');

  function formatTime(ts){
    try { return new Date(ts).toLocaleTimeString('nl-NL', {hour:'2-digit', minute:'2-digit', second:'2-digit'}); }
    catch(e) { return '-'; }
  }

  function escapeHtml(value){
    return String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function render(){
    const items = loadLog();
    const status = block.querySelector('#mrbV9DiagStatus');
    const log = block.querySelector('#mrbV9DiagLog');
    if (status) status.innerHTML = items.length
      ? `<span class="bad">⚠ ${items.length} fout${items.length === 1 ? '' : 'en'}</span>`
      : '<span class="ok">✅ Geen fouten geregistreerd</span>';
    if (log) log.innerHTML = items.length
      ? items.slice().reverse().map(x => `<div style="margin-bottom:5px;"><b>${formatTime(x.ts)} · ${escapeHtml(x.kind)}</b><br>${escapeHtml(x.message)}</div>`).join('')
      : '<span style="opacity:.75;">Nog geen JavaScript-fouten geregistreerd.</span>';
  }

  block.querySelector('#mrbV9DiagClear')?.addEventListener('click', () => {
    saveLog([]);
    render();
  });

  unsafeWindow.mrbV9Diagnostics = { add, getLog: loadLog, clear: () => { saveLog([]); render(); } };
  render();
})();


// =====================================================================
// MRB V9 FASE 2 — CENTRALE TAAK- EN NAVIGATIEPLANNER
// Niet-invasieve basislaag: bestaande modules blijven zelfstandig werken.
// Nieuwe/omgebouwde modules kunnen via mrbV9Planner taken registreren en
// exclusieve navigatie aanvragen, zodat zij elkaar later niet meer onderbreken.
// =====================================================================
(function MRBV9CentralPlanner(){
  'use strict';

  if (unsafeWindow.mrbV9Planner?.version) return;

  const K_ENABLED = 'mrb_v9_planner_enabled';
  const K_LOG = 'mrb_v9_planner_log';
  const MAX_LOG = 30;
  const NAV_TTL = 20_000;
  const ACTION_TTL = 45_000;
  const CONTINUATION_TTL = 30_000;

  let enabled = !!GM_Get(K_ENABLED, true);
  let currentTask = null;
  let navigationLock = null;
  let actionLock = null;
  let runnerTimer = null;
  let navigationContinuation = null;
  let navigationSequence = 0;
  const tasks = new Map();

  function now(){ return Date.now(); }
  function clean(v){ return String(v ?? '').replace(/\s+/g, ' ').trim(); }
  function safeJson(raw, fallback){
    try { return typeof raw === 'string' ? JSON.parse(raw) : raw; }
    catch(e) { return fallback; }
  }
  function loadLog(){
    const value = safeJson(GM_Get(K_LOG, '[]'), []);
    return Array.isArray(value) ? value : [];
  }
  function saveLog(items){
    try { GM_Set(K_LOG, JSON.stringify(items.slice(-MAX_LOG))); } catch(e) {}
  }
  function log(type, text, taskId=''){
    const items = loadLog();
    items.push({ ts:now(), type:clean(type), text:clean(text).slice(0,300), taskId:clean(taskId) });
    saveLog(items);
    render();
  }
  function reportError(message, source='V9 Planner'){
    try { unsafeWindow.mrbV9Diagnostics?.add?.('Planner', message, source); } catch(e) {}
  }
  function normalizeAt(value){
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(0, n) : now();
  }
  function releaseExpiredNavigationLock(){
    if (navigationLock && navigationLock.until <= now()) navigationLock = null;
    if (actionLock && actionLock.until <= now()) actionLock = null;
    if (navigationContinuation && navigationContinuation.until <= now()) navigationContinuation = null;
  }
  function acquireAction(owner, ttl=ACTION_TTL){
    owner = clean(owner) || 'onbekend';
    releaseExpiredNavigationLock();
    if (actionLock && actionLock.owner !== owner) return false;
    actionLock = { owner, until:now() + Math.max(1000, Number(ttl) || ACTION_TTL) };
    render();
    return true;
  }
  function touchAction(owner, ttl=ACTION_TTL){
    owner = clean(owner);
    releaseExpiredNavigationLock();
    if (!owner || !actionLock || actionLock.owner !== owner) return false;
    actionLock.until = now() + Math.max(1000, Number(ttl) || ACTION_TTL);
    render();
    return true;
  }
  function releaseAction(owner=''){
    owner = clean(owner);
    if (!actionLock) return true;
    if (owner && actionLock.owner !== owner) return false;
    actionLock = null;
    render();
    scheduleRunner();
    return true;
  }
  function canAct(owner=''){
    releaseExpiredNavigationLock();
    return !actionLock || actionLock.owner === clean(owner);
  }
  function markNavigationContinuation(taskId){
    taskId = clean(taskId);
    if (!taskId) return;
    navigationContinuation = { owner:taskId, until:now() + CONTINUATION_TTL, sequence:navigationSequence };
  }
  function clearNavigationContinuation(taskId=''){
    taskId = clean(taskId);
    if (!navigationContinuation) return true;
    if (taskId && navigationContinuation.owner !== taskId) return false;
    navigationContinuation = null;
    return true;
  }
  function acquireNavigation(owner, ttl=NAV_TTL){
    owner = clean(owner) || 'onbekend';
    releaseExpiredNavigationLock();
    if (navigationLock && navigationLock.owner !== owner) return false;
    navigationLock = { owner, until:now() + Math.max(1000, Number(ttl) || NAV_TTL) };
    render();
    return true;
  }
  function touchNavigation(owner, ttl=NAV_TTL){
    owner = clean(owner);
    if (!owner) return false;
    releaseExpiredNavigationLock();
    if (!navigationLock || navigationLock.owner !== owner) return false;
    navigationLock.until = now() + Math.max(1000, Number(ttl) || NAV_TTL);
    render();
    return true;
  }
  function releaseNavigation(owner=''){
    owner = clean(owner);
    if (!navigationLock) return true;
    if (owner && navigationLock.owner !== owner) return false;
    navigationLock = null;
    render();
    return true;
  }
  function canNavigate(owner=''){
    releaseExpiredNavigationLock();
    return !navigationLock || navigationLock.owner === clean(owner);
  }

  function normalizeNavigationTarget(target){
    const value = String(target ?? '').trim();
    if (!value) return '';
    if (value.startsWith('/?module=')) return value;
    if (value.startsWith('?module=')) return '/' + value;
    return value;
  }

  function navigate(target, options={}){
    const normalized = normalizeNavigationTarget(target);
    if (!normalized) return false;

    const owner = clean(options.owner || options.source || currentTask?.id || 'mrb-direct');
    releaseExpiredNavigationLock();
    const alreadyOwned = !!navigationLock && navigationLock.owner === owner;
    if (!canNavigate(owner)) {
      log('nav-wacht', `${owner} wacht: ${normalized}`, owner);
      return false;
    }
    if (!alreadyOwned && !acquireNavigation(owner, Number(options.ttl) || NAV_TTL)) return false;

    try {
      const gui = unsafeWindow?.omerta?.GUI?.container;
      if (gui && typeof gui.loadPage === 'function') {
        gui.loadPage(normalized);
      } else if (normalized.startsWith('#')) {
        location.hash = normalized.slice(1);
      } else if (normalized.startsWith('/?module=')) {
        location.href = '/index.php#' + normalized;
      } else if (normalized.startsWith('?')) {
        location.search = normalized;
      } else {
        location.href = normalized;
      }
      navigationSequence += 1;
      // Een planner-module die navigeert krijgt altijd zelf eerst de kans om op
      // de nieuwe pagina zijn vervolgactie uit te voeren. Dit voorkomt dat de
      // Bodyguard Trainer de zojuist geopende Crimes/Race/Heist-pagina overneemt.
      if (currentTask?.id) markNavigationContinuation(currentTask.id);
      log('nav', `${owner}: ${normalized}`, owner);
      return true;
    } catch(e) {
      reportError(clean(e?.message || e), `navigatie:${owner}`);
      if (!alreadyOwned) releaseNavigation(owner);
      return false;
    } finally {
      // Een planner-taak houdt zijn eigen lock vast tot runTask() klaar is.
      // Losse navigatie krijgt slechts een korte bescherming tegen gelijktijdige modules.
      if (!alreadyOwned && currentTask?.id !== owner) {
        setTimeout(() => releaseNavigation(owner), Math.max(1000, Number(options.releaseAfterMs) || 2500));
      }
    }
  }

  // Fase 4: uniforme lifecycle bovenop de bestaande planner-taken.
  // Dit is bewust een adapterlaag: bestaande modules behouden hun interne flow,
  // maar worden centraal startbaar, stopbaar, planbaar en uitleesbaar.
  const modules = new Map();

  function ensureModuleForTask(task){
    if (!task?.id) return null;
    const existing = modules.get(task.id);
    if (existing) return existing;

    const moduleApi = Object.freeze({
      id: task.id,
      title: task.title || task.id,
      start(){
        const current = tasks.get(task.id);
        if (!current) return false;
        current.enabled = true;
        current.nextAt = Math.min(current.nextAt || now(), now());
        current.status = current.status === 'uit' ? 'gepland' : current.status;
        scheduleRunner();
        render();
        return true;
      },
      stop(){
        const current = tasks.get(task.id);
        if (!current) return false;
        current.enabled = false;
        current.status = 'uit';
        if (navigationLock?.owner === task.id) releaseNavigation(task.id);
        scheduleRunner();
        render();
        return true;
      },
      tick(){
        const current = tasks.get(task.id);
        if (!current || !current.enabled) return false;
        current.nextAt = now();
        current.status = 'handmatig gepland';
        scheduleRunner();
        render();
        return true;
      },
      getStatus(){
        const current = tasks.get(task.id);
        if (!current) return { id:task.id, exists:false, enabled:false, status:'verwijderd' };
        return {
          id:current.id,
          title:current.title,
          module:current.module,
          exists:true,
          enabled:!!current.enabled,
          running:currentTask?.id === current.id,
          status:current.status,
          nextAt:current.nextAt,
          lastRun:current.lastRun,
          lastError:current.lastError || ''
        };
      },
      destroy(){ return unregisterTask(task.id); }
    });
    modules.set(task.id, moduleApi);
    return moduleApi;
  }

  function registerModule(spec={}){
    const id = clean(spec.id);
    if (!id) throw new Error('Module vereist een id.');
    if (typeof spec.tick !== 'function') throw new Error(`Module ${id} mist tick().`);

    registerTask({
      id,
      title:spec.title || id,
      module:spec.module || id,
      priority:spec.priority,
      nextAt:spec.nextAt,
      enabled:spec.enabled,
      requiresNavigation:spec.requiresNavigation,
      status:spec.status || 'gepland',
      meta:spec.meta,
      run:async context => {
        const result = await Promise.resolve(spec.tick(context));
        return result && typeof result === 'object' ? result : { delayMs:60_000, status:'gepland' };
      }
    });

    const api = ensureModuleForTask(tasks.get(id));
    try { spec.onRegister?.(api); } catch(e) { reportError(clean(e?.message || e), `module:${id}:onRegister`); }
    return api;
  }

  function getModule(id){ return modules.get(clean(id)) || null; }
  function listModules(){
    return [...modules.values()].map(moduleApi => moduleApi.getStatus())
      .sort((a,b) => String(a.title).localeCompare(String(b.title), 'nl'));
  }
  function startModule(id){ return getModule(id)?.start() || false; }
  function stopModule(id){ return getModule(id)?.stop() || false; }
  function tickModule(id){ return getModule(id)?.tick() || false; }

  function registerTask(spec={}){
    const id = clean(spec.id);
    if (!id) throw new Error('Planner-taak vereist een id.');
    const previous = tasks.get(id) || {};
    const task = {
      id,
      title: clean(spec.title || previous.title || id),
      module: clean(spec.module || previous.module || ''),
      priority: Number.isFinite(Number(spec.priority)) ? Number(spec.priority) : (previous.priority ?? 50),
      nextAt: normalizeAt(spec.nextAt ?? previous.nextAt ?? now()),
      enabled: ('enabled' in spec) ? spec.enabled !== false : previous.enabled !== false,
      requiresNavigation: !!spec.requiresNavigation,
      requiresAction: !!spec.requiresAction,
      run: typeof spec.run === 'function' ? spec.run : previous.run,
      status: clean(spec.status || previous.status || 'gepland'),
      lastRun: previous.lastRun || 0,
      lastError: previous.lastError || '',
      meta: spec.meta ?? previous.meta ?? null
    };
    if (typeof task.run !== 'function') throw new Error(`Planner-taak ${id} mist run().`);
    tasks.set(id, task);
    ensureModuleForTask(task);
    scheduleRunner();
    render();
    return id;
  }
  function unregisterTask(id){
    id = clean(id);
    const ok = tasks.delete(id);
    modules.delete(id);
    scheduleRunner();
    render();
    return ok;
  }
  function updateTask(id, patch={}){
    id = clean(id);
    const task = tasks.get(id);
    if (!task) return false;
    if ('nextAt' in patch) task.nextAt = normalizeAt(patch.nextAt);
    if ('enabled' in patch) task.enabled = !!patch.enabled;
    if ('priority' in patch && Number.isFinite(Number(patch.priority))) task.priority = Number(patch.priority);
    if ('status' in patch) task.status = clean(patch.status);
    if ('title' in patch) task.title = clean(patch.title) || task.title;
    if ('meta' in patch) task.meta = patch.meta;
    scheduleRunner();
    render();
    return true;
  }
  function listTasks(){
    return [...tasks.values()].map(t => ({...t, run:undefined})).sort((a,b) => a.nextAt-b.nextAt || b.priority-a.priority);
  }
  function dueTasks(){
    const t = now();
    releaseExpiredNavigationLock();
    const due = [...tasks.values()]
      .filter(x => x.enabled && x.nextAt <= t && typeof x.run === 'function');

    // Een langlopende pagina-actie houdt de planner exclusief bij dezelfde module.
    // Dit blijft gelden tussen de asynchrone navigatie-, klik- en resultaatcallbacks.
    if (actionLock) {
      const ownerTask = tasks.get(actionLock.owner);
      if (ownerTask?.enabled && typeof ownerTask.run === 'function') {
        return ownerTask.nextAt <= t ? [ownerTask] : [];
      }
      actionLock = null;
    }

    // Na navigatie moet dezelfde module eerst haar pagina-actie afronden.
    // De BG-taak mag die overgang niet meer onderbreken, ook niet met STIPT.
    if (navigationContinuation) {
      const ownerTask = tasks.get(navigationContinuation.owner);
      if (ownerTask?.enabled && typeof ownerTask.run === 'function') {
        if (ownerTask.nextAt <= t) return [ownerTask];
        return due.filter(x => x.id !== 'v10-bodyguard-trainer' && !x.requiresNavigation)
          .sort((a,b) => b.priority-a.priority || a.nextAt-b.nextAt);
      }
      navigationContinuation = null;
    }
    return due.sort((a,b) => b.priority-a.priority || a.nextAt-b.nextAt);
  }
  function nextTask(){
    return [...tasks.values()]
      .filter(x => x.enabled && typeof x.run === 'function')
      .sort((a,b) => a.nextAt-b.nextAt || b.priority-a.priority)[0] || null;
  }
  function formatWait(ms){
    if (!Number.isFinite(ms)) return '-';
    if (ms <= 0) return 'Nu';
    const sec = Math.ceil(ms/1000);
    const h = Math.floor(sec/3600);
    const m = Math.floor((sec%3600)/60);
    const s = sec%60;
    if (h) return `${h}u ${m}m`;
    if (m) return `${m}m ${s}s`;
    return `${s}s`;
  }

  async function runTask(task){
    if (!enabled || currentTask || !task?.enabled) return;
    releaseExpiredNavigationLock();
    if (!canAct(task.id)) {
      task.nextAt = now() + 750;
      task.status = `wacht op actie: ${actionLock?.owner || 'onbekend'}`;
      return;
    }
    if (task.requiresNavigation && !acquireNavigation(task.id)) {
      task.nextAt = now() + 1500;
      task.status = 'wacht op navigatie';
      return;
    }
    currentTask = task;
    const navSequenceBeforeRun = navigationSequence;
    task.status = 'bezig';
    task.lastRun = now();
    render();
    log('start', task.title, task.id);
    try {
      const result = await Promise.resolve(task.run({
        task:{...task},
        now:now(),
        planner:unsafeWindow.mrbV9Planner,
        touchNavigation:() => touchNavigation(task.id),
        releaseNavigation:() => releaseNavigation(task.id),
        acquireAction:(ttl=ACTION_TTL) => acquireAction(task.id, ttl),
        touchAction:(ttl=ACTION_TTL) => touchAction(task.id, ttl),
        releaseAction:() => releaseAction(task.id)
      }));
      if (result && typeof result === 'object') {
        if (Number.isFinite(Number(result.nextAt))) task.nextAt = normalizeAt(result.nextAt);
        else if (Number.isFinite(Number(result.delayMs))) task.nextAt = now() + Math.max(250, Number(result.delayMs));
        else task.nextAt = now() + 60_000;
        if ('enabled' in result) task.enabled = !!result.enabled;
        task.status = clean(result.status || 'gepland');
      } else {
        task.nextAt = now() + 60_000;
        task.status = 'gepland';
      }
      task.lastError = '';

      if (navigationContinuation?.owner === task.id) {
        if (navigationSequence === navSequenceBeforeRun) {
          // Dezelfde module heeft op de bestemmingspagina gedraaid zonder opnieuw
          // te navigeren: de vervolgactie heeft dus haar kans gekregen.
          clearNavigationContinuation(task.id);
        } else {
          // De module navigeerde opnieuw binnen haar flow. Plan haar snel opnieuw
          // en behoud het vervolgslot totdat een run zonder nieuwe navigatie volgt.
          task.nextAt = Math.min(task.nextAt, now() + 900);
          navigationContinuation.until = now() + CONTINUATION_TTL;
          navigationContinuation.sequence = navigationSequence;
        }
      }
      log('klaar', `${task.title}: ${task.status}`, task.id);
    } catch(e) {
      task.lastError = clean(e?.stack || e?.message || e);
      task.status = 'fout, retry';
      task.nextAt = now() + 15_000;
      reportError(task.lastError, task.id);
      log('fout', task.lastError, task.id);
    } finally {
      if (task.requiresNavigation) releaseNavigation(task.id);
      currentTask = null;
      scheduleRunner();
      render();
    }
  }

  function tick(){
    runnerTimer = null;
    releaseExpiredNavigationLock();
    if (!enabled || currentTask) return scheduleRunner();
    const due = dueTasks();
    if (due.length) runTask(due[0]);
    else scheduleRunner();
    render();
  }
  function scheduleRunner(){
    if (runnerTimer) clearTimeout(runnerTimer);
    const next = nextTask();
    const delay = !enabled ? 5000 : next ? Math.min(Math.max(next.nextAt-now(), 100), 5000) : 5000;
    runnerTimer = setTimeout(tick, delay);
  }

  const block = addBlock(`
    <h4>Core Planner</h4>
    <div class="gm-row" style="gap:7px;align-items:center;">
      <button id="mrbV9PlannerToggle" class="gm-btn">${enabled ? 'Stop' : 'Start'}</button>
      <div id="mrbV9PlannerStatus" class="gm-status" style="margin:0;"></div>
    </div>
    <div id="mrbV9PlannerCurrent" style="font-size:12px;margin-top:6px;line-height:1.4;"></div>
    <details style="margin-top:6px;">
      <summary>Planning en log</summary>
      <div id="mrbV9PlannerTasks" style="font-size:11px;line-height:1.4;margin-top:5px;max-height:165px;overflow:auto;"></div>
      <div class="gm-row" style="margin-top:6px;gap:6px;">
        <button id="mrbV9PlannerClearLog" class="gm-btn">Wis log</button>
        <button id="mrbV9PlannerReleaseNav" class="gm-btn">Geef navigatie vrij</button>
      </div>
    </details>
  `, '00-v9-planner');

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function render(){
    if (!block) return;
    releaseExpiredNavigationLock();
    const status = block.querySelector('#mrbV9PlannerStatus');
    const current = block.querySelector('#mrbV9PlannerCurrent');
    const tasksEl = block.querySelector('#mrbV9PlannerTasks');
    const toggle = block.querySelector('#mrbV9PlannerToggle');
    if (toggle) toggle.textContent = enabled ? 'Stop' : 'Start';
    if (status) status.innerHTML = enabled
      ? '<span class="ok">✅ Gereed</span>'
      : '<span class="bad">⛔ Uit</span>';
    const next = nextTask();
    if (current) {
      const busy = currentTask ? `<b>Bezig:</b> ${escapeHtml(currentTask.title)}` : '<b>Bezig:</b> niets';
      const upcoming = next ? `<b>Volgende:</b> ${escapeHtml(next.title)} over ${formatWait(next.nextAt-now())}` : '<b>Volgende:</b> nog geen v9-taken';
      const nav = navigationLock ? `<b>Navigatie:</b> ${escapeHtml(navigationLock.owner)} (${formatWait(navigationLock.until-now())})` : '<b>Navigatie:</b> vrij';
      const continuation = navigationContinuation ? `<b>Vervolgactie:</b> ${escapeHtml(navigationContinuation.owner)} (${formatWait(navigationContinuation.until-now())})` : '<b>Vervolgactie:</b> geen';
      const action = actionLock ? `<b>Actielock:</b> ${escapeHtml(actionLock.owner)} (${formatWait(actionLock.until-now())})` : '<b>Actielock:</b> vrij';
      const lifecycle = `<b>Modules:</b> ${modules.size} lifecycle-adapters`;
      current.innerHTML = `${busy}<br>${upcoming}<br>${nav}<br>${action}<br>${continuation}<br>${lifecycle}`;
    }
    if (tasksEl) {
      const planned = listTasks().slice(0,10);
      const logs = loadLog().slice(-8).reverse();
      const taskHtml = planned.length
        ? planned.map(t => `<div><b>${escapeHtml(t.title)}</b> — ${t.enabled ? formatWait(t.nextAt-now()) : 'uit'} · ${escapeHtml(t.status)}</div>`).join('')
        : '<div style="opacity:.75;">Nog geen modules aan de v9-planner gekoppeld.</div>';
      const logHtml = logs.length
        ? '<hr>' + logs.map(x => `<div>${new Date(x.ts).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',second:'2-digit'})} · ${escapeHtml(x.type)} · ${escapeHtml(x.text)}</div>`).join('')
        : '';
      tasksEl.innerHTML = taskHtml + logHtml;
    }
  }

  block.querySelector('#mrbV9PlannerToggle')?.addEventListener('click', () => {
    enabled = !enabled;
    GM_Set(K_ENABLED, enabled);
    if (!enabled) { releaseNavigation(); releaseAction(); }
    scheduleRunner();
    render();
  });
  block.querySelector('#mrbV9PlannerClearLog')?.addEventListener('click', () => {
    saveLog([]);
    render();
  });
  block.querySelector('#mrbV9PlannerReleaseNav')?.addEventListener('click', () => {
    releaseNavigation();
    releaseAction();
    render();
  });

  // Bewaar één vaste API-instantie. Bij handmatige SPA-navigatie kan de website
  // eigenschappen op unsafeWindow verwijderen of overschrijven. De closure met taken,
  // runner en navigatielock blijft echter actief. Daarom herstellen we alleen de
  // publieke koppeling, zonder een tweede planner of dubbele timers te starten.
  const plannerApi = {
    version:'11.1.0',
    registerTask,
    unregisterTask,
    updateTask,
    listTasks,
    registerModule,
    getModule,
    listModules,
    startModule,
    stopModule,
    tickModule,
    hasTask:(id)=>tasks.has(clean(id)),
    registrationSummary:()=>({count:tasks.size, ids:[...tasks.keys()]}),
    acquireNavigation,
    touchNavigation,
    releaseNavigation,
    canNavigate,
    navigate,
    acquireAction,
    touchAction,
    releaseAction,
    canAct,
    isEnabled:() => enabled,
    currentTask:() => currentTask ? currentTask.id : null,
    navigationOwner:() => { releaseExpiredNavigationLock(); return navigationLock?.owner || null; },
    actionOwner:() => { releaseExpiredNavigationLock(); return actionLock?.owner || null; },
    continuationOwner:() => { releaseExpiredNavigationLock(); return navigationContinuation?.owner || null; },
    log
  };

  function publishPlannerApi(reason='init'){
    if (unsafeWindow.mrbV9Planner === plannerApi) return false;
    unsafeWindow.mrbV9Planner = plannerApi;
    try { console.info('[MRB Planner] Koppeling hersteld:', reason); } catch(e) {}
    try { unsafeWindow.mrbV10Registration?.drain?.(); } catch(e) {}
    return true;
  }

  publishPlannerApi('init');

  // Centrale, lichte navigatie-API voor alle modules. Dit overschrijft de
  // website-loader niet; modules roepen hem alleen bewust aan.
  unsafeWindow.mrbNavigate = (target, options={}) => navigate(target, options);

  // Zelfherstel na handmatige clicks/hash-navigatie. Dit hergebruikt exact dezelfde
  // plannerinstantie en behoudt dus alle geregistreerde taken en interne planning.
  const plannerPublishTimer = mrbSetInterval(() => {
    if (unsafeWindow.mrbV9Planner !== plannerApi) publishPlannerApi('periodieke controle');
  }, 3000);

  window.addEventListener('hashchange', () => setTimeout(() => publishPlannerApi('hashchange'), 0), true);
  window.addEventListener('popstate',  () => setTimeout(() => publishPlannerApi('popstate'), 0), true);
  document.addEventListener('click', e => {
    if (!e.isTrusted) return;
    const target = e.target?.closest?.('a[href],button,input[type="submit"],input[type="button"]');
    if (!target || target.closest?.('#mrbGoldMenu')) return;
    setTimeout(() => publishPlannerApi('handmatige klik'), 0);
    setTimeout(() => publishPlannerApi('handmatige klik + 1s'), 1000);
  }, true);

  // Verwerk modules die zich vóór de planner hebben aangemeld.
  try { unsafeWindow.mrbV10Registration?.drain?.(); } catch(e) {}

  // Alleen een interne heartbeat om de plannerlaag te testen.
  // Deze navigeert niet en raakt geen bestaande module aan.
  registerTask({
    id:'v9-heartbeat',
    title:'Core heartbeat',
    module:'systeem',
    priority:1,
    nextAt:now()+30_000,
    requiresNavigation:false,
    run:() => ({ delayMs:60_000, status:'planner actief' })
  });

  scheduleRunner();
  mrbSetInterval(render, 2000);
  render();
})();


// =====================================================================
// MRB V9 FASE 3 — CRIMES/CARS PLANNER-ADAPTER
// Activeert pas nadat zowel de centrale planner als het bestaande
// Crimes/Cars-blok beschikbaar zijn. Andere modules blijven onaangeraakt.
// =====================================================================
(function MRBV9CrimesCarsPlannerAdapter(){
  'use strict';

  let attempts = 0;
  function connect(){
    const planner = unsafeWindow.mrbV9Planner;
    const cc = unsafeWindow.mrbV9CrimesCars;
    if (!planner || !cc){
      if (++attempts < 120) setTimeout(connect, 250);
      return;
    }

    cc.setPlannerMode(true);

    planner.registerTask({
      id:'v9-crimes-cars',
      title:'Crimes / Cars',
      module:'Crimes',
      priority:90,
      nextAt:cc.nextAt(),
      requiresNavigation:true,
      requiresAction:true,
      run:(context)=>{
        if (!cc.isRunning()) {
          context.releaseAction();
          return { delayMs:15_000, status:'module staat uit' };
        }

        // Houd de centrale beurt vast zolang de interne Crimes/Cars-flow bezig is.
        // De lease wordt bij iedere planner-wake verlengd en verloopt automatisch
        // wanneer de module onverwacht niet meer terugkomt.
        if (!context.acquireAction(45_000)) {
          return { delayMs:750, status:'wacht op centrale actielock' };
        }

        const nextAt = cc.wake();
        const state = cc.state();
        if (state.busy || state.current || state.confirmPendingKind || state.forcedRetryKind) {
          context.touchAction(45_000);
        } else {
          context.releaseAction();
        }
        return {
          nextAt: Math.min(Number(nextAt || Date.now()+5000), Date.now()+1000),
          status: state.busy ? `exclusief bezig: ${state.current || 'actie'}` : 'timers bewaakt'
        };
      }
    });

    try { planner.log('koppeling', 'Crimes/Cars gekoppeld aan V9 Planner', 'v9-crimes-cars'); } catch(e) {}
  }

  connect();
})();

// =====================================================================
// MRB V9 FASE 4 — BULLETS PLANNER-ADAPTER
// Normale Bullet-aankopen worden via de centrale planner rond de
// halfuur-refills uitgevoerd. Heist, Race en overige modules blijven
// in deze fase onaangeraakt.
// =====================================================================
(function MRBV9BulletsPlannerAdapter(){
  'use strict';

  let attempts = 0;
  function connect(){
    const planner = unsafeWindow.mrbV9Planner;
    const bullets = unsafeWindow.mrbV9Bullets;
    if (!planner || !bullets){
      if (++attempts < 160) setTimeout(connect, 250);
      return;
    }

    bullets.setPlannerManaged(true);
    const initialAt = bullets.isRunning()
      ? Math.min(Number(bullets.nextAt() || Date.now()), Date.now()+1500)
      : Date.now()+15_000;

    planner.registerTask({
      id:'v9-bullets',
      title:'Bullets / prijsrefill',
      module:'Bullets',
      priority:70,
      nextAt:initialAt,
      requiresNavigation:true,
      run:async()=>{
        if (!bullets.isRunning()) return { delayMs:15_000, status:'module staat uit' };
        return await bullets.runStep();
      }
    });

    try { planner.log('koppeling', 'Bullets gekoppeld aan halfuur-planner', 'v9-bullets'); } catch(e) {}
  }

  connect();
})();


// =====================================================================
// V10.0.1 — BULLETS PLANNER ENFORCER
// Voorkomt dat een achtergebleven legacy-loop opnieuw kan starten.
// =====================================================================
(function MRBV1002BulletsRegistration(){
  'use strict';

  function makeSpec(){
    const b = unsafeWindow.mrbV9Bullets;
    if (!b) return null;
    return {
      module:'Bullets',
      task:{
        id:'v9-bullets',
        title:'Bullets / prijsrefill',
        module:'Bullets',
        priority:70,
        nextAt:Number(b.nextAt?.() || Date.now()+500),
        enabled:true,
        requiresNavigation:true,
        run:()=>b.runStep()
      },
      onConnect:(p)=>{
        try { b.plannerConnected?.(); } catch(e) { try { b.setPlannerManaged(true); } catch(_) {} }
        try { p.updateTask?.('v9-bullets', { enabled:b.isRunning?.() !== false, nextAt:Number(b.nextAt?.() || Date.now()+500), status:'V10 geregistreerd' }); } catch(e) {}
        try { p.log?.('koppeling','Bullets bevestigd via V10 registratiesysteem','v9-bullets'); } catch(e) {}
      }
    };
  }

  function ensure(){
    const spec = makeSpec();
    if (!spec) return;
    const reg = unsafeWindow.mrbV10Registration;
    if (reg?.register) reg.register(spec);
    else {
      const p = unsafeWindow.mrbV9Planner;
      if (p?.registerTask) {
        try { p.registerTask(spec.task); spec.onConnect?.(p); } catch(e) {}
      }
    }
  }

  ensure();
  // Blijvende zelfreparatie: een verwijderde/te vroeg geladen taak wordt teruggezet.
  mrbSetInterval(()=>{
    const b=unsafeWindow.mrbV9Bullets;
    const p=unsafeWindow.mrbV9Planner;
    if (!b) return;
    try { b.setPlannerManaged(true); } catch(e) {}
    if (!p?.hasTask?.('v9-bullets') && !p?.listTasks?.().some(t=>t.id==='v9-bullets')) ensure();
  }, 5000);
})();

// =====================================================================
// MRB v11.3 — HEIST CORE PLANNER-ADAPTER
// De volledige actieve Leider-, Driver-, reis-, auto-, start- en winstflow
// gebruikt een centrale actieleasing. Lange cooldowns geven de planner vrij.
// =====================================================================
(function MRBV9HeistPlannerAdapter(){
  'use strict';

  let attempts = 0;
  function connect(){
    const planner = unsafeWindow.mrbV9Planner;
    const heist = unsafeWindow.mrbV9Heist;
    if (!planner || !heist){
      if (++attempts < 200) setTimeout(connect, 250);
      return;
    }

    heist.setPlannerManaged(true);
    planner.registerTask({
      id:'v9-heist',
      title:'Heist / Route 66',
      module:'Heist',
      priority:80,
      nextAt:heist.nextAt(),
      requiresNavigation:false,
      requiresAction:true,
      run:(context)=>heist.wake(context)
    });

    try { planner.log('koppeling', 'Heist wake-up gekoppeld aan V9 Planner', 'v9-heist'); } catch(e) {}
  }

  connect();
})();

// =====================================================================
// MRB V9 FASE 6 — LACKEY TIMER PLANNER-ADAPTER
// De ingestelde uitvoertijd en retries lopen via de centrale planner.
// De bewezen popup-flow Huur -> Offer -> credits -> Hire blijft intact.
// =====================================================================
(function MRBV9LackeyTimerPlannerAdapter(){
  'use strict';
  let attempts = 0;
  function connect(){
    const planner = unsafeWindow.mrbV9Planner;
    const lackey = unsafeWindow.mrbV9LackeyTimer;
    if (!planner || !lackey){
      if (++attempts < 240) setTimeout(connect, 250);
      return;
    }
    lackey.setPlannerManaged(true);
    planner.registerTask({
      id:'v9-lackey-timer',
      title:'Lackey Timer / Logout',
      module:'Lackey Timer',
      priority:95,
      nextAt:lackey.nextAt(),
      requiresNavigation:true,
      requiresAction:true,
      run:async(context)=>{
        if(!lackey.isRunning?.()){ context.releaseAction(); return {delayMs:15000,status:'module staat uit'}; }
        const due=Number(lackey.nextAt?.()||0);
        if(due>Date.now()+250){ context.releaseAction(); return {nextAt:due,status:'wacht op ingestelde tijd'}; }
        if(!context.acquireAction(120_000)) return {delayMs:1000,status:'wacht op centrale actielock'};
        context.touchAction(120_000);
        const result=await lackey.wake();
        if(!lackey.isBusy?.()) context.releaseAction();
        else context.touchAction(120_000);
        return result;
      }
    });
    try { planner.log('koppeling', 'Lackey Timer gekoppeld aan V9 Planner', 'v9-lackey-timer'); } catch(e) {}
  }
  connect();
})();

// =====================================================================
// MRB v11.5.1 — SESSION MANAGER CORE PLANNER-ADAPTER
// Geen page reload; alleen sessie/gatecontrole en achtergrond-timersync.
// =====================================================================
(function MRBV11RefreshPlannerAdapter(){
  'use strict';
  let attempts=0;
  function connect(){
    const planner=unsafeWindow.mrbV9Planner;
    const refresh=unsafeWindow.mrbV11Refresh;
    if(!planner||!refresh){ if(++attempts<240)setTimeout(connect,250); return; }
    refresh.setPlannerManaged(true);
    planner.registerTask({
      id:'v11-refresh',
      title:'Session Manager',
      module:'Session Manager',
      priority:5,
      nextAt:refresh.nextAt(),
      enabled:refresh.isRunning(),
      requiresNavigation:false,
      requiresAction:false,
      run:()=>refresh.wake()
    });
    try{ planner.log('koppeling','Session Manager gekoppeld aan Core Planner','v11-refresh'); }catch(e){}
  }
  connect();
})();

// =====================================================================
// MRB V9 FASE 6 — RACE PLANNER-ADAPTER
// Alleen de idle/cooldown wake-up verhuist naar de centrale planner.
// De bestaande Leider-, Driver-, invite-, auto- en travel-flow blijft intact.
// =====================================================================
(function MRBV9RacePlannerAdapter(){
  'use strict';
  let attempts = 0;
  function connect(){
    const planner = unsafeWindow.mrbV9Planner;
    const race = unsafeWindow.mrbV9Race;
    if (!planner || !race){
      if (++attempts < 200) setTimeout(connect, 250);
      return;
    }
    race.setPlannerManaged(true);
    planner.registerTask({
      id:'v9-race',
      title:'Race',
      module:'Race',
      priority:75,
      nextAt:race.nextAt(),
      requiresNavigation:true,
      requiresAction:true,
      run:(context)=>race.wake(context)
    });
    try { planner.log('koppeling', 'Race wake-up gekoppeld aan V9 Planner', 'v9-race'); } catch(e) {}
  }
  connect();

// =====================================================================
// MRB V9.5.1 — START AUTOFILL WERKENDE LACKEYS
// Eén keer per browsertab/sessie. Gebruikt de centrale planner en vult
// alleen gehuurde lackeys waarvan de status Working/Werkt/Actief/Bezig is.
// =====================================================================
(function MRBV9StartupWorkingLackeys(){
  'use strict';

  const SESSION_KEY = 'mrb_v951_working_lackeys_autofill';
  const TASK_ID = 'v9-start-fill-working-lackeys';

  function sessionGet(){
    try { return sessionStorage.getItem(SESSION_KEY) || ''; } catch(e) { return ''; }
  }
  function sessionSet(value){
    try { sessionStorage.setItem(SESSION_KEY, value); } catch(e) {}
  }
  function onLackeys(){ return /[?&]module=Lackeys\b/i.test(location.href); }
  function loadLackeys(){
    try {
      const gui = unsafeWindow?.omerta?.GUI?.container;
      if (gui && typeof gui.loadPage === 'function') {
        gui.loadPage('/?module=Lackeys');
        return;
      }
    } catch(e) {}
    location.href = '/?module=Lackeys';
  }
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function register(){
    const planner = unsafeWindow.mrbV9Planner;
    if (!planner || typeof planner.registerTask !== 'function') {
      return setTimeout(register, 500);
    }

    if (sessionGet() === 'done') return;

    planner.registerTask({
      id:TASK_ID,
      title:'Start: werkende lackeys vullen',
      module:'Fill lackey',
      priority:92,
      nextAt:Date.now() + 5000,
      requiresNavigation:true,
      status:'wacht op veilige start',
      run:async () => {
        if (!onLackeys()) {
          sessionSet('pending');
          loadLackeys();
          return { delayMs:5000, status:'Lackeys openen' };
        }

        // Wacht tot de pagina en inline Lackey-API volledig zijn geladen.
        for (let i=0; i<40; i++) {
          if (typeof unsafeWindow.mrbFillWorkingLackeys === 'function') break;
          await sleep(250);
        }

        if (typeof unsafeWindow.mrbFillWorkingLackeys !== 'function') {
          return { delayMs:10000, status:'wacht op Lackey-formulieren' };
        }

        await unsafeWindow.mrbFillWorkingLackeys();
        sessionSet('done');
        return { enabled:false, delayMs:24*60*60*1000, status:'werkende lackeys gevuld' };
      }
    });
  }

  setTimeout(register, 1200);
})();


// =====================================================================
// MRB V9 FASE 7 — D&D PLANNER-ADAPTER
// Prijswissel, reis en smokkelactie worden geserialiseerd door de planner.
// =====================================================================
(function MRBV9DnDPlannerAdapter(){
  'use strict';
  let attempts = 0;
  function connect(){
    const planner = unsafeWindow.mrbV9Planner;
    const dnd = unsafeWindow.mrbV9DnD;
    if (!planner || !dnd){
      if (++attempts < 240) setTimeout(connect, 250);
      return;
    }
    dnd.setPlannerManaged(true);
    planner.registerTask({
      id:'v9-dnd',
      title:'D&D / prijsroute',
      module:'D&D',
      priority:68,
      nextAt:dnd.nextAt(),
      requiresNavigation:true,
      requiresAction:true,
      run:async(context)=>await dnd.runStep(context)
    });
    try { planner.log('koppeling', 'D&D gekoppeld aan V9 Planner', 'v9-dnd'); } catch(e) {}
  }
  connect();
})();

// =====================================================================
// MRB V9 FASE 7 — BOOZEN PLANNER-ADAPTER
// De agressieve eigen lus wordt vervangen door rustige planner-stappen.
// =====================================================================
(function MRBV9BoozenPlannerAdapter(){
  'use strict';
  let attempts = 0;
  function connect(){
    const planner = unsafeWindow.mrbV9Planner;
    const boozen = unsafeWindow.mrbV9Boozen;
    if (!planner || !boozen){
      if (++attempts < 240) setTimeout(connect, 250);
      return;
    }
    boozen.setPlannerManaged(true);
    planner.registerTask({
      id:'v9-boozen',
      title:'Boozen / Smokkelen',
      module:'Boozen',
      priority:55,
      nextAt:boozen.nextAt(),
      requiresNavigation:true,
      requiresAction:true,
      run:async(context)=>await boozen.runStep(context)
    });
    try { planner.log('koppeling', 'Boozen gekoppeld aan V9 Planner', 'v9-boozen'); } catch(e) {}
  }
  connect();
})();

// =====================================================================
// MRB V9 FASE 8 — OC PLANNER-ADAPTER
// Alleen de idle/cooldown-wake-up wordt door de planner beheerd.
// =====================================================================
(function MRBV9OCPlannerAdapter(){
  'use strict';
  let attempts = 0;
  function connect(){
    const planner = unsafeWindow.mrbV9Planner;
    const oc = unsafeWindow.mrbV9OC;
    if (!planner || !oc){
      if (++attempts < 240) setTimeout(connect, 250);
      return;
    }
    try { oc.setPlannerManaged?.(true); } catch(e) {
      try { console.warn('[MRB OC Adapter] setPlannerManaged overgeslagen', e); } catch(_) {}
    }
    planner.registerTask({
      id:'v9-oc',
      title:'OC / Georganiseerde misdaad',
      module:'OC',
      priority:72,
      nextAt:oc.getState?.().enabled ? Date.now() : oc.nextAt(),
      enabled:true,
      requiresNavigation:true,
      requiresAction:true,
      run:async(context)=>await oc.runStep(context)
    });
    try { planner.log('koppeling', 'OC wake-up gekoppeld aan V9 Planner', 'v9-oc'); } catch(e) {}
  }
  connect();
})();


// =====================================================================
// MRB GOLD EDITION v10 FINAL — HEALTH, SELF-TEST & DEADLOCK RECOVERY
// Deze laag verandert geen moduleflow. Hij controleert de centrale planner,
// toont live aftellingen, signaleert ontbrekende koppelingen en herstelt een
// planner-taak die uitzonderlijk lang blijft hangen.
// =====================================================================
(function MRBV10FinalSupervisor(){
  'use strict';

  if (unsafeWindow.mrbV10Final?.version) return;

  const VERSION = '10.0.0';
  const K_EVENTS = 'mrb_v10_final_events';
  const K_RELOAD = 'mrb_v10_final_last_recovery_reload';
  const MAX_EVENTS = 20;
  const TASK_STUCK_MS = 120_000;
  const RELOAD_COOLDOWN_MS = 10 * 60_000;

  const REQUIRED_TASKS = [
    'v9-heartbeat',
    'v9-crimes-cars',
    'v9-bullets',
    'v9-heist',
    'v9-lackey-timer',
    'v9-race',
    'v9-lackey-autofill',
    'v9-dnd',
    'v9-boozen',
    'v9-oc',
    'v9-spot-raid'
  ];

  let watchedTaskId = '';
  let watchedSince = 0;
  let lastRecoveryTask = '';
  let lastRecoveryAt = 0;
  let health = { ok:false, missing:[], taskCount:0, planner:false, diagnostics:0 };

  function clean(v){ return String(v ?? '').replace(/\s+/g,' ').trim(); }
  function parseJson(raw, fallback){ try { return typeof raw === 'string' ? JSON.parse(raw) : raw; } catch(e){ return fallback; } }
  function events(){ const v=parseJson(GM_Get(K_EVENTS,'[]'),[]); return Array.isArray(v)?v:[]; }
  function saveEvents(list){ try { GM_Set(K_EVENTS, JSON.stringify(list.slice(-MAX_EVENTS))); } catch(e){} }
  function addEvent(type, text){
    const list=events();
    list.push({ts:Date.now(),type:clean(type),text:clean(text).slice(0,320)});
    saveEvents(list);
    try { unsafeWindow.mrbV9Planner?.log?.('v10 '+type, text, 'v10-final'); } catch(e){}
    render();
  }
  function fmt(ms){
    if (!Number.isFinite(ms)) return '-';
    if (ms <= 0) return 'Nu';
    const sec=Math.ceil(ms/1000), h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=sec%60;
    if (h) return `${h}u ${m}m ${s}s`;
    if (m) return `${m}m ${s}s`;
    return `${s}s`;
  }
  function esc(v){ return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function gateVisible(){
    try { return typeof gm_isGateVisible === 'function' && gm_isGateVisible(); } catch(e) { return false; }
  }

  const block = addBlock(`
    <h4>V10 Systeem</h4>
    <div class="gm-row" style="gap:7px;align-items:center;">
      <div id="mrbV10Status" class="gm-status" style="margin:0;"></div>
      <button id="mrbV10Test" class="gm-btn">Zelftest</button>
      <button id="mrbV10Clear" class="gm-btn">Wis log</button>
    </div>
    <div id="mrbV10Summary" style="font-size:12px;line-height:1.45;margin-top:6px;"></div>
    <details style="margin-top:6px;">
      <summary>Live planning en systeemlog</summary>
      <div id="mrbV10Tasks" style="font-size:11px;line-height:1.45;margin-top:5px;max-height:190px;overflow:auto;"></div>
    </details>
  `, '00-v10-final-system');

  function inspect(){
    const planner=unsafeWindow.mrbV9Planner;
    const tasks=planner?.listTasks?.() || [];
    const ids=new Set(tasks.map(t=>t.id));
    const missing=REQUIRED_TASKS.filter(id=>!ids.has(id));
    const diagnostics=(unsafeWindow.mrbV9Diagnostics?.getLog?.() || []).length;
    health={
      ok:!!planner && planner.isEnabled?.() && missing.length===0,
      missing,
      taskCount:tasks.length,
      planner:!!planner && !!planner.isEnabled?.(),
      diagnostics
    };
    return {planner,tasks};
  }

  function runSelfTest(manual=false){
    const {planner,tasks}=inspect();
    const issues=[];
    if (!planner) issues.push('centrale planner ontbreekt');
    else if (!planner.isEnabled?.()) issues.push('centrale planner staat uit');
    if (health.missing.length) issues.push('ontbrekende taken: '+health.missing.join(', '));
    const duplicateIds=tasks.map(t=>t.id).filter((id,i,a)=>a.indexOf(id)!==i);
    if (duplicateIds.length) issues.push('dubbele taken: '+[...new Set(duplicateIds)].join(', '));
    if (issues.length){
      try { unsafeWindow.mrbV9Diagnostics?.add?.('V10 zelftest', issues.join(' | '), 'v10-final'); } catch(e){}
      if (manual) addEvent('waarschuwing', issues.join(' | '));
    } else if (manual) addEvent('zelftest', `${tasks.length} planner-taken gecontroleerd; alles in orde`);
    render();
    return issues;
  }

  function recoverStuckTask(){
    const planner=unsafeWindow.mrbV9Planner;
    if (!planner) return;
    const current=clean(planner.currentTask?.());
    const now=Date.now();
    if (!current){ watchedTaskId=''; watchedSince=0; return; }
    if (current!==watchedTaskId){ watchedTaskId=current; watchedSince=now; return; }
    if (!watchedSince || now-watchedSince<TASK_STUCK_MS) return;

    // Maximaal één herstelactie per taak per vijf minuten.
    if (lastRecoveryTask===current && now-lastRecoveryAt<5*60_000) return;
    lastRecoveryTask=current;
    lastRecoveryAt=now;

    try { planner.releaseNavigation?.(current); } catch(e){}
    try { planner.updateTask?.(current,{nextAt:now+30_000,status:'v10 herstel na vastloper'}); } catch(e){}
    try { unsafeWindow.mrbV9Diagnostics?.add?.('V10 deadlock', `Taak ${current} bleef langer dan 120 seconden bezig. Navigatie is vrijgegeven en retry gepland.`, 'v10-final'); } catch(e){}
    addEvent('herstel', `${current}: navigatie vrijgegeven; retry over 30 seconden`);

    watchedTaskId=''; watchedSince=0;

    // Alleen na een herhaalde ernstige vastloper en nooit tijdens captcha/login.
    const lastReload=Number(GM_Get(K_RELOAD,0))||0;
    if (!gateVisible() && now-lastReload>RELOAD_COOLDOWN_MS && current===lastRecoveryTask && now-lastRecoveryAt<1000){
      // Geen directe reload bij de eerste recovery; planner krijgt eerst de retry.
    }
  }

  function render(){
    const {planner,tasks}=inspect();
    const st=block.querySelector('#mrbV10Status');
    const sum=block.querySelector('#mrbV10Summary');
    const list=block.querySelector('#mrbV10Tasks');
    if (st) st.innerHTML=health.ok
      ? '<span class="ok">✅ V10 gezond</span>'
      : '<span class="bad">⚠ Controle nodig</span>';
    if (sum){
      const current=planner?.currentTask?.() || 'geen';
      const nav=planner?.navigationOwner?.() || 'vrij';
      sum.innerHTML=`<b>Versie:</b> ${VERSION}<br><b>Planner:</b> ${health.planner?'actief':'uit/ontbreekt'} · ${health.taskCount} taken<br><b>Bezig:</b> ${esc(current)}<br><b>Navigatie:</b> ${esc(nav)}<br><b>Diagnosefouten:</b> ${health.diagnostics}${health.missing.length?`<br><b>Ontbreekt:</b> ${esc(health.missing.join(', '))}`:''}`;
    }
    if (list){
      const planned=tasks.filter(t=>t.id!=='v9-heartbeat').sort((a,b)=>a.nextAt-b.nextAt).slice(0,12);
      const taskHtml=planned.length?planned.map(t=>`<div><b>${esc(t.title)}</b> — ${t.enabled?fmt(Number(t.nextAt)-Date.now()):'uit'} · ${esc(t.status||'')}</div>`).join(''):'<div style="opacity:.75;">Geen geplande taken gevonden.</div>';
      const ev=events().slice(-8).reverse();
      const evHtml=ev.length?'<hr>'+ev.map(x=>`<div>${new Date(x.ts).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',second:'2-digit'})} · <b>${esc(x.type)}</b> · ${esc(x.text)}</div>`).join(''):'';
      list.innerHTML=taskHtml+evHtml;
    }
  }

  block.querySelector('#mrbV10Test')?.addEventListener('click',()=>runSelfTest(true));
  block.querySelector('#mrbV10Clear')?.addEventListener('click',()=>{saveEvents([]);render();});

  unsafeWindow.mrbV10Final={
    version:VERSION,
    selfTest:()=>runSelfTest(false),
    health:()=>({...health}),
    events
  };

  // Geef adapters maximaal 45 seconden om zich te registreren voordat de
  // automatische opstarttest een waarschuwing schrijft.
  setTimeout(()=>{
    const issues=runSelfTest(false);
    if (!issues.length) addEvent('opstart','V10 Final geladen; alle centrale taken geregistreerd');
  },45_000);

  mrbSetInterval(recoverStuckTask,5_000);
  mrbSetInterval(render,2_000);
  render();
})();


// =====================================================================
// MRB V10.0.2 — PLANNER REGISTRATIESTATUS
// =====================================================================
(function MRBV1002RegistrationStatus(){
  'use strict';
  const EXPECTED = ['v9-crimes-cars','v9-bullets','v9-heist','v9-race','v9-lackey-timer','v9-dnd','v9-boozen','v9-oc'];
  const block = addBlock(`
    <h4>V10 Registratie</h4>
    <div id="mrbV10RegSummary" class="gm-status"></div>
    <div id="mrbV10RegList" style="font-size:11px;line-height:1.45;margin-top:5px;"></div>
    <div class="gm-row" style="margin-top:6px;"><button id="mrbV10RegRetry" class="gm-btn">Opnieuw koppelen</button></div>
  `,'00-v10-registration');

  function render(){
    const p=unsafeWindow.mrbV9Planner;
    const reg=unsafeWindow.mrbV10Registration;
    const ids=new Set((p?.listTasks?.()||[]).map(t=>t.id));
    const ok=EXPECTED.filter(id=>ids.has(id));
    const missing=EXPECTED.filter(id=>!ids.has(id));
    const summary=block.querySelector('#mrbV10RegSummary');
    const list=block.querySelector('#mrbV10RegList');
    if(summary) summary.innerHTML = missing.length
      ? `<span class="bad">⚠ ${ok.length}/${EXPECTED.length} gekoppeld</span>`
      : `<span class="ok">✅ ${ok.length}/${EXPECTED.length} gekoppeld</span>`;
    if(list) list.innerHTML = EXPECTED.map(id=>`${ids.has(id)?'✅':'❌'} ${id.replace(/^v9-/,'')}`).join('<br>') +
      ((reg?.snapshot?.().pending||[]).length ? `<br><br><b>Wachtend:</b> ${(reg.snapshot().pending||[]).join(', ')}` : '');
  }
  block.querySelector('#mrbV10RegRetry')?.addEventListener('click',()=>{
    try { unsafeWindow.mrbV10Registration?.drain?.(); } catch(e) {}
    try {
      const b=unsafeWindow.mrbV9Bullets;
      if(b){
        unsafeWindow.mrbV10Registration?.register?.({module:'Bullets',task:{id:'v9-bullets',title:'Bullets / prijsrefill',module:'Bullets',priority:70,nextAt:Number(b.nextAt?.()||Date.now()),enabled:true,requiresNavigation:true,run:()=>b.runStep()},onConnect:()=>b.plannerConnected?.()});
      }
    }catch(e){}
    setTimeout(render,200);
  });
  mrbSetInterval(render,3000);
  setTimeout(render,500);
})();


// =====================================================================
// MRB GOLD EDITION v10.0.4.3 — HEIST PLANNER SELF-HEAL
// - Koppelt Heist blijvend aan de centrale planner.
// - Herstelt een ontbrekende v9-heist taak automatisch.
// - Corrigeert een verouderde planning wanneer Heist intern al beschikbaar is.
// =====================================================================
(function MRBHeistPlannerSelfHealV10043(){
  'use strict';

  function desiredNextAt(heist){
    try {
      const at = Number(heist?.nextAt?.());
      return Number.isFinite(at) ? Math.max(Date.now() + 250, at) : Date.now() + 1000;
    } catch(e) {
      return Date.now() + 1000;
    }
  }

  function makeTask(heist){
    return {
      id:'v9-heist',
      title:'Heist / Route 66',
      module:'Heist',
      priority:80,
      nextAt:desiredNextAt(heist),
      requiresNavigation:false,
      status:'Heist planner gekoppeld',
      run:()=>heist.wake()
    };
  }

  function ensure(){
    const planner = unsafeWindow.mrbV9Planner;
    const heist = unsafeWindow.mrbV9Heist;
    if (!planner || !heist) return false;

    try { heist.setPlannerManaged(true); } catch(e) {}

    const wanted = desiredNextAt(heist);
    const existing = (planner.listTasks?.() || []).find(t => t.id === 'v9-heist');

    try {
      if (!existing) {
        planner.registerTask(makeTask(heist));
        planner.log?.('koppeling', 'Heist self-heal heeft planner-taak geregistreerd', 'v9-heist');
      } else {
        // Als Heist beschikbaar is maar de planner nog ver in de toekomst staat,
        // maak de taak direct wakker. Anders alleen een ontbrekende/uitgeschakelde
        // planning herstellen zonder een actieve flow te verstoren.
        const stale = !Number.isFinite(Number(existing.nextAt)) || Number(existing.nextAt) > wanted + 5000;
        if (stale || existing.enabled === false) {
          planner.updateTask('v9-heist', {
            nextAt:wanted,
            enabled:true,
            status:'Heist planning hersteld'
          });
        }
      }
      return true;
    } catch(e) {
      try { console.warn('[Heist self-heal]', e); } catch(_) {}
      return false;
    }
  }

  // Meteen na volledige scriptinitialisatie en daarna blijvend controleren.
  setTimeout(ensure, 250);
  setTimeout(ensure, 1500);
  mrbSetInterval(ensure, 5000);
})();


// =====================================================================
// MRB GOLD EDITION v10.0.4.8 - GEISOLEERDE HEIST EERSTE NAVIGATIE
// - Volledig gebaseerd op de werkende v10.0.4.6 Crimes/Cars-basis.
// - Opent alleen GroupCrimes voor Heist als de centrale planner rustig is.
// - Laat de bestaande Heist-flow daarna alles afhandelen.
// =====================================================================
(function MRBHeistFirstNavigationIsolated(){
  'use strict';

  const K_LAST_NAV = 'mrb_heist_first_nav_last_ts_v1048';
  const CHECK_MS = 2500;
  const NAV_COOLDOWN_MS = 45_000;
  let localBusy = false;

  function clean(v){ return String(v || '').replace(/\s+/g, ' ').trim(); }
  function isInformationPage(){
    return /information\.php/i.test(String(location.href || ''));
  }
  function isGroupOrHeistPage(){
    return /module=(?:GroupCrimes|Heist)/i.test(String(location.href || ''));
  }
  function heistAvailableNow(){
    const root = document.querySelector('#game_container') || document.body;
    if (!root) return false;

    for (const row of root.querySelectorAll('tr, .row, li, p, div')) {
      const text = clean(row.textContent || '');
      if (!/volgende\s+heist|next\s+heist/i.test(text)) continue;
      if (/\b(?:nu|now)\b/i.test(text)) return true;
    }

    const text = clean(root.textContent || '');
    return /(?:volgende\s+heist|next\s+heist)[^\n]{0,80}\b(?:nu|now)\b/i.test(text);
  }
  function plannerIsQuiet(){
    const planner = unsafeWindow.mrbV9Planner;
    if (!planner) return false;
    if (planner.currentTask?.()) return false;
    if (planner.navigationOwner?.()) return false;

    const now = Date.now();
    const tasks = planner.listTasks?.() || [];
    // Crimes/Cars en andere hoge prioriteitstaken krijgen altijd voorrang.
    return !tasks.some(t =>
      t && t.enabled !== false &&
      t.id !== 'v9-heist' &&
      Number(t.priority || 0) >= 80 &&
      Number(t.nextAt || 0) <= now + 10_000
    );
  }
  function crimesCarsAreQuiet(){
    const cc = unsafeWindow.mrbV9CrimesCars;
    if (!cc) return true;
    try {
      const state = cc.state?.() || {};
      if (state.busy) return false;
      const nextAt = Number(cc.nextAt?.() || 0);
      if (nextAt && nextAt <= Date.now() + 10_000) return false;
    } catch(e) {}
    return true;
  }
  function loadGroupCrimes(){
    try {
      if (unsafeWindow?.omerta?.GUI?.container?.loadPage) {
        unsafeWindow.mrbNavigate?.('/?module=GroupCrimes',{source:'heist-wake'}) || unsafeWindow.omerta.GUI.container.loadPage('/?module=GroupCrimes');
        return true;
      }
    } catch(e) {}
    try {
      location.href = '/index.php#/?module=GroupCrimes';
      return true;
    } catch(e) {}
    return false;
  }
  function tick(){
    if (localBusy || isGroupOrHeistPage() || !isInformationPage()) return;

    const heist = unsafeWindow.mrbV9Heist;
    if (!heist?.isRunning?.()) return;
    try { if (unsafeWindow.mrbOC2Control?.isEnabled?.()) return; } catch(e) {}
    if (typeof gm_isGateVisible === 'function' && gm_isGateVisible()) return;
    if (!plannerIsQuiet() || !crimesCarsAreQuiet()) return;

    const role = String(heist.role?.() || 'leader').toLowerCase();
    // Leider alleen als de timer werkelijk op Nu staat.
    // Driver controleert periodiek op een uitnodiging, ook zonder eigen timerlabel.
    if (role !== 'slave' && role !== 'driver' && !heistAvailableNow()) return;

    const last = Number(GM_Get(K_LAST_NAV, 0)) || 0;
    if (Date.now() - last < NAV_COOLDOWN_MS) return;

    localBusy = true;
    GM_Set(K_LAST_NAV, Date.now());
    try { unsafeWindow.mrbV9Planner?.log?.('wake', `Heist eerste navigatie (${role})`, 'v9-heist'); } catch(e) {}
    loadGroupCrimes();
    setTimeout(() => { localBusy = false; }, 12_000);
  }

  mrbSetInterval(tick, CHECK_MS);
  setTimeout(tick, 3000);
})();


// =====================================================================
// V10.0.4.22 — HEIST TOGGLE MODULEFIX
// - Heist-status gebruikt heistPlannerManaged binnen de eigen module-scope.
// - Geen module-integriteitsreload meer; activeren van Heist kan het menu niet herladen.
// =====================================================================


})();
