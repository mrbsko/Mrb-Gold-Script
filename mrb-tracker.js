// ==UserScript==
// @name         MRB Tracker Suite
// @namespace    https://barafranca.nl/
// @version      1.9.0
// @description  MRB Tracker Suite core - Moneydrops + Plating, geschikt voor GitHub-loader.
// @match        https://barafranca.nl/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const __mrbTrackerPageWindow = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
  if (__mrbTrackerPageWindow.__MRB_TRACKER_SUITE_STARTED__) {
    console.info('[MRB Tracker Suite] Tweede start geblokkeerd.');
    return;
  }
  __mrbTrackerPageWindow.__MRB_TRACKER_SUITE_STARTED__ = true;

  // ============================================================
  // SHARED
  // ============================================================
  const g = (k,d) => {
    try { return typeof GM_getValue === 'function' ? GM_getValue(k,d) : d; }
    catch { return d; }
  };
  const s = (k,v) => {
    try { if (typeof GM_setValue === 'function') GM_setValue(k,v); } catch {}
  };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const rnd = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[c]));

  function fmtDateTime(ts) {
    if (!ts) return '-';
    const d = new Date(ts);
    return d.toLocaleDateString('nl-NL') + ' ' +
      d.toLocaleTimeString('nl-NL', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }
  function fmtTime(ts) {
    if (!ts) return '-';
    return new Date(ts).toLocaleTimeString('nl-NL', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }
  const money = n => '$' + Number(n || 0).toLocaleString('en-US');

  const UI = {
    K_MIN: 'mrb_tracker_suite_minimized',
    K_HIDDEN: 'mrb_tracker_suite_hidden',
    minimized: !!g('mrb_tracker_suite_minimized', false),
    hidden: !!g('mrb_tracker_suite_hidden', false)
  };


  // ============================================================
  // MONEYDROP TRACKER
  // Bestaande v1.1 keys blijven behouden zodat historie meegaat.
  // ============================================================
  const MD = {
    paths: [
      '/?module=Statistics&action=global_stats',
      '/index.php?module=Statistics&action=global_stats'
    ],
    checkMs: 15000,
    minDrop: 1000000,
    K: {
      enabled: 'mrb_moneydrop_enabled',
      lastTotal: 'mrb_moneydrop_last_total',
      lastPocket: 'mrb_moneydrop_last_pocket',
      lastBank: 'mrb_moneydrop_last_bank',
      history: 'mrb_moneydrop_history'
    },
    enabled: !!g('mrb_moneydrop_enabled', true),
    busy: false,
    timer: null,
    status: 'Wachten op eerste achtergrondmeting…'
  };

  function parseMoney(text) {
    const m = String(text || '').match(/\$\s*([\d,.]+)/);
    if (!m) return null;
    const n = Number(m[1].replace(/[,.]/g, ''));
    return Number.isFinite(n) ? n : null;
  }

  function findStatValue(doc, label) {
    const wanted = label.toLowerCase();
    const nodes = Array.from(doc.querySelectorAll('td,th,div,span'));
    for (const el of nodes) {
      const own = String(el.textContent || '').trim().toLowerCase();
      if (own !== wanted && !own.startsWith(wanted + ':')) continue;

      const row = el.closest('tr');
      if (row) {
        const cells = Array.from(row.querySelectorAll('td,th'));
        const idx = cells.indexOf(el.closest('td,th'));
        if (idx >= 0) {
          for (let i = idx + 1; i < cells.length; i++) {
            const n = parseMoney(cells[i].textContent);
            if (n !== null) return n;
          }
        }
        const n = parseMoney(row.textContent.replace(el.textContent, ''));
        if (n !== null) return n;
      }

      let sib = el.nextElementSibling;
      while (sib) {
        const n = parseMoney(sib.textContent);
        if (n !== null) return n;
        sib = sib.nextElementSibling;
      }
    }
    return null;
  }

  function parseStats(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const pocket = findStatValue(doc, 'Geld op zak');
    const bank = findStatValue(doc, 'Geld op de bank');
    if (pocket === null || bank === null) return null;
    return { pocket, bank, total: pocket + bank };
  }

  async function requestStats() {
    let lastErr = null;
    for (const path of MD.paths) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        const r = await fetch(path, {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
          redirect: 'follow',
          signal: controller.signal,
          headers: {
            'Accept': 'text/html, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        clearTimeout(timeout);
        if (!r.ok) throw new Error('HTTP ' + r.status + ' op ' + path);
        const html = await r.text();
        if (!html || html.length < 100) throw new Error('lege response op ' + path);
        return html;
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('background request mislukt');
  }

  function mdHistory() {
    const h = g(MD.K.history, []);
    return Array.isArray(h) ? h : [];
  }
  function mdSaveHistory(h) { s(MD.K.history, h.slice(-1000)); }

  function mdAddDrop(amount, before, after, pocket, bank) {
    const h = mdHistory();
    h.push({ ts: Date.now(), amount, before, after, pocket, bank });
    mdSaveHistory(h);
  }

  function mdTodayTotal(h) {
    const d = new Date();
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    return h.filter(x => x.ts >= start).reduce((a,x) => a + Number(x.amount || 0), 0);
  }

  async function mdCheck() {
    if (!MD.enabled || MD.busy) return;
    MD.busy = true;
    try {
      const html = await requestStats();
      const stat = parseStats(html);
      if (!stat) {
        MD.status = 'Kon Geld op zak/bank niet lezen.';
        render();
        return;
      }

      const prev = Number(g(MD.K.lastTotal, NaN));
      if (Number.isFinite(prev)) {
        const diff = prev - stat.total;
        if (diff >= MD.minDrop) mdAddDrop(diff, prev, stat.total, stat.pocket, stat.bank);
      }

      s(MD.K.lastTotal, stat.total);
      s(MD.K.lastPocket, stat.pocket);
      s(MD.K.lastBank, stat.bank);
      MD.status = `Zak ${money(stat.pocket)} · Bank ${money(stat.bank)}`;
    } catch (e) {
      MD.status = 'Check mislukt: ' + (e?.message || 'onbekend');
    } finally {
      MD.busy = false;
      render();
    }
  }

  // ============================================================
  // PLATING TRACKER
  // Bestaande v1.0 keys blijven behouden zodat database meegaat.
  // ============================================================
  const PT = {
    K_DB: 'mrb_plating_tracker_db_v1',
    K_RUN: 'mrb_plating_tracker_running_v1',
    K_LAST_SWEEP: 'mrb_plating_tracker_last_sweep_v1',
    K_EVENTS: 'mrb_plating_tracker_events_v1',
    sweepEveryMs: 5 * 60 * 1000,
    pageDelayMin: 1200,
    pageDelayMax: 2200,
    requestTimeoutMs: 15000,
    maxPages: 50,
    startUrl: '/allusers.php?start=0&order=lastrank&sort=DESC&dead=HIDE',
    db: g('mrb_plating_tracker_db_v1', {}) || {},
    running: !!g('mrb_plating_tracker_running_v1', true),
    busy: false,
    stopRequested: false,
    timer: null,
    status: 'Nog geen sweep',
    lastDiagnostic: ''
  };

  function ptSaveDB(){ s(PT.K_DB, PT.db); }

  function absolutePath(href) {
    try {
      const u = new URL(href, location.origin);
      return u.pathname + u.search;
    } catch { return href || ''; }
  }

  function parsePlayerRows(doc) {
    const out = [];
    for (const tr of doc.querySelectorAll('table tr')) {
      const userLink = tr.querySelector('a[href*="user.php?idn="], a[href*="/user.php?idn="], a[href*="user.php?id="], a[href*="/user.php?id="]');
      if (!userLink) continue;
      const name = (userLink.textContent || '').replace(/\s+/g,' ').trim();
      if (!name) continue;
      const hasShield = !!tr.querySelector('i.fa-shield, i.fa.fa-shield, .fa-shield');
      out.push({name, hasShield});
    }
    return out;
  }

  function findNextUrl(doc) {
    const next = [...doc.querySelectorAll('a[href]')]
      .find(a => /volgende\s*>|next\s*>/i.test((a.textContent || '').replace(/\s+/g,' ').trim()));
    return next ? absolutePath(next.getAttribute('href')) : '';
  }

  async function requestPage(path) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PT.requestTimeoutMs);
    try {
      const r = await fetch(path, {
        method:'GET',
        credentials:'same-origin',
        cache:'no-store',
        headers:{
          'X-Requested-With':'XMLHttpRequest',
          'Accept':'text/html, */*; q=0.01'
        },
        signal: controller.signal
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const html = await r.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return {
        doc,
        html,
        responseUrl: r.url || path,
        status: r.status
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  function buildPageDiagnostic(result, requestedPath, pageNo) {
    const doc = result?.doc;
    if (!doc) return 'Geen document ontvangen';

    const trs = doc.querySelectorAll('tr').length;
    const userLinks = [...doc.querySelectorAll('a[href*="user.php?idn="], a[href*="/user.php?idn="], a[href*="user.php?id="], a[href*="/user.php?id="]')];
    const allLinks = [...doc.querySelectorAll('a[href]')];
    const gameContainer = !!doc.querySelector('#game_container');
    const title = (doc.title || '').trim();
    const bodyText = (doc.body?.innerText || doc.body?.textContent || '').replace(/\s+/g,' ').trim();
    const firstLinks = userLinks.slice(0, 5).map(a => {
      const t = (a.textContent || '').replace(/\s+/g,' ').trim();
      return `${t || '(geen tekst)'} -> ${a.getAttribute('href') || ''}`;
    });

    const d = [
      `pagina=${pageNo}`,
      `request=${requestedPath}`,
      `response=${result.responseUrl || '-'}`,
      `HTTP=${result.status}`,
      `title=${title || '-'}`,
      `game_container=${gameContainer}`,
      `tr=${trs}`,
      `user.php-links=${userLinks.length}`,
      `alle-links=${allLinks.length}`,
      `body-start=${bodyText.slice(0, 180) || '-'}`,
      `eerste-userlinks=${firstLinks.length ? firstLinks.join(' | ') : '-'}`
    ].join(' || ');

    PT.lastDiagnostic = d;
    try { console.log('[MRB Tracker Suite][PLATING DIAG]', d); } catch {}
    return d;
  }


  function ptEvents() {
    const e = g(PT.K_EVENTS, []);
    return Array.isArray(e) ? e : [];
  }

  function ptSaveEvents(events) {
    s(PT.K_EVENTS, events.slice(-500));
  }

  function ptAddEvent(name, ts) {
    const events = ptEvents();
    events.push({ name, ts });
    ptSaveEvents(events);
  }

  function updatePlayer(name, hasShield, seenTs) {
    const key = name.toLowerCase();
    const prev = PT.db[key] || {
      name, hasPlating:null, firstSeenAt:seenTs, lastSeenAt:0,
      lastShieldSeenAt:0, platingGoneAt:0
    };

    if (prev.hasPlating === true && hasShield === false && !prev.platingGoneAt) {
      prev.platingGoneAt = seenTs;
      ptAddEvent(name, seenTs);
    }
    if (hasShield === true && prev.hasPlating === false) {
      prev.platingGoneAt = 0;
    }

    prev.name = name;
    prev.hasPlating = hasShield;
    prev.lastSeenAt = seenTs;
    if (hasShield) prev.lastShieldSeenAt = seenTs;
    PT.db[key] = prev;
  }

  function scheduleSweep() {
    if (PT.timer) clearTimeout(PT.timer);
    PT.timer = null;
    if (!PT.running) return;

    const last = Number(g(PT.K_LAST_SWEEP,0) || 0);
    const wait = Math.max(30000, PT.sweepEveryMs - Math.max(0, Date.now() - last));
    PT.timer = setTimeout(ptSweep, wait);
  }

  async function ptSweep() {
    if (!PT.running || PT.busy) return;
    PT.busy = true;
    PT.stopRequested = false;
    PT.status = 'Sweep gestart…';
    render();

    let path = PT.startUrl;
    let page = 0;
    let totalSeen = 0;
    let shields = 0;

    try {
      const visitedUrls = new Set();
      const seenPlayersThisSweep = new Set();

      while (path && !PT.stopRequested) {
        if (page >= PT.maxPages) {
          PT.status = `Sweep veiligheidsstop op ${PT.maxPages} pagina's`;
          break;
        }

        // URL-loop guard
        if (visitedUrls.has(path)) {
          PT.status = 'Sweep gestopt: paginaloop gedetecteerd';
          break;
        }
        visitedUrls.add(path);

        // Bewaak altijd dead=HIDE. Een paginalink die dit verliest mag niet gevolgd worden.
        try {
          const checkUrl = new URL(path, location.origin);
          if (checkUrl.searchParams.get('dead') !== 'HIDE') {
            PT.status = 'Sweep gestopt: volgende pagina verloor dead=HIDE';
            break;
          }
        } catch (_) {}

        const pageResult = await requestPage(path);
        const doc = pageResult.doc;
        buildPageDiagnostic(pageResult, path, page + 1);
        const players = parsePlayerRows(doc);
        const ts = Date.now();

        // Geen spelers betekent einde van de relevante lijst.
        if (!players.length) {
          PT.status = `Sweep klaar · pagina ${page + 1} bevat geen spelers`;
          break;
        }

        let newPlayersOnPage = 0;
        let duplicatesOnPage = 0;

        for (const p of players) {
          const k = p.name.toLowerCase();
          if (seenPlayersThisSweep.has(k)) {
            duplicatesOnPage++;
            continue;
          }

          seenPlayersThisSweep.add(k);
          newPlayersOnPage++;
          updatePlayer(p.name, p.hasShield, ts);
          totalSeen++;
          if (p.hasShield) shields++;
        }

        page++;
        PT.status = `Sweep p.${page} · ${totalSeen} unieke spelers · ${shields} plating`;
        render();

        // Als een hele pagina alleen spelers bevat die al in deze sweep voorkwamen,
        // zijn we buiten de echte paginering geraakt of in een lus terechtgekomen.
        if (newPlayersOnPage === 0 && duplicatesOnPage > 0) {
          PT.status = `Sweep gestopt: pagina ${page} bevat alleen eerder geziene spelers`;
          break;
        }

        const next = findNextUrl(doc);
        if (!next) break;

        // Volgende URL moet dezelfde levende-spelersfilter behouden.
        try {
          const nextUrl = new URL(next, location.origin);
          if (nextUrl.searchParams.get('dead') !== 'HIDE') {
            PT.status = 'Sweep klaar: volgende link hoort niet meer bij levende spelers';
            break;
          }
        } catch (_) {}

        path = next;
        await sleep(rnd(PT.pageDelayMin, PT.pageDelayMax));
      }

      ptSaveDB();
      s(PT.K_LAST_SWEEP, Date.now());

      if (PT.stopRequested) {
        PT.status = 'Sweep gestopt';
      } else if (!/^Sweep (?:gestopt|veiligheidsstop|klaar)/.test(PT.status)) {
        PT.status = `Sweep klaar · ${totalSeen} unieke spelers`;
      }

      decorateCurrentPage();
    } catch (e) {
      console.warn('[MRB Tracker Suite] Plating sweep fout:', e);
      PT.status = 'Sweep mislukt: ' + (e?.message || e);
    } finally {
      PT.busy = false;
      render();
      scheduleSweep();
    }
  }

  function ptStats() {
    const vals = Object.values(PT.db);
    return {
      known: vals.length,
      active: vals.filter(x => x.hasPlating === true).length,
      gone: vals.filter(x => x.hasPlating === false && x.platingGoneAt).length
    };
  }

  function getProfileName() {
    for (const tr of document.querySelectorAll('tr')) {
      const cells = [...tr.querySelectorAll(':scope > th, :scope > td')];
      if (cells.length < 2) continue;
      const label = (cells[0].textContent || '').replace(/\s+/g,' ').trim().replace(/:$/,'');
      if (!/^Speler$/i.test(label)) continue;
      const a = cells[1].querySelector('a') || cells[1];
      let t = (a.textContent || '').replace(/\s+/g,' ').trim();
      t = t.replace(/\(#\d+\)/g,'').trim();
      if (t) return t.split(/\s+/)[0];
    }
    return '';
  }

  function ptStatusText(rec) {
    if (!rec) return 'Nog niet gecontroleerd';
    if (rec.hasPlating === true) return `🛡️ Actief · laatst gezien ${fmtDateTime(rec.lastSeenAt)}`;
    if (rec.platingGoneAt) return `❌ Verdwenen op ${fmtDateTime(rec.platingGoneAt)}`;
    return `Geen plating gezien · controle ${fmtDateTime(rec.lastSeenAt)}`;
  }

  function decorateProfile() {
    if (!/user\.php/i.test(location.href)) return;
    const name = getProfileName();
    if (!name) return;

    const rec = PT.db[name.toLowerCase()];
    const platingRow = [...document.querySelectorAll('tr')].find(tr => {
      const c = tr.querySelector(':scope > th, :scope > td');
      return /^Plating\s*:?\s*$/i.test((c?.textContent || '').replace(/\s+/g,' ').trim());
    });
    if (!platingRow) return;

    // Oude aparte tracker-rij van v1.6-v1.8 verwijderen.
    document.getElementById('mrb-plating-profile-row')?.remove();

    const cells = [...platingRow.querySelectorAll(':scope > th, :scope > td')];
    if (cells.length < 2) return;
    const valueCell = cells[1];

    let inline = valueCell.querySelector('#mrb-plating-profile-inline');
    if (!inline) {
      inline = document.createElement('span');
      inline.id = 'mrb-plating-profile-inline';
      inline.style.cssText = 'margin-left:8px;font-size:11px;opacity:.9;white-space:nowrap';
      valueCell.appendChild(inline);
    }

    if (!rec) {
      inline.textContent = '· tracker: nog niet gecontroleerd';
      inline.title = 'Deze speler staat nog niet in de plating-database';
    } else if (rec.hasPlating === true) {
      inline.textContent = `· 🛡 laatst gezien ${fmtDateTime(rec.lastSeenAt)}`;
      inline.title = 'Plating actief bij de laatste sweep';
    } else if (rec.platingGoneAt) {
      inline.textContent = `· ❌ weg sinds ${fmtDateTime(rec.platingGoneAt)}`;
      inline.title = 'Eerste sweep waarop de plating verdwenen was';
    } else {
      inline.textContent = `· geen plating · controle ${fmtDateTime(rec.lastSeenAt)}`;
      inline.title = 'Geen plating gezien bij de laatste sweep';
    }
  }

  function decorateAllUsers() {
    if (!/allusers\.php/i.test(location.href)) return;

    for (const tr of document.querySelectorAll('tr')) {
      const a = tr.querySelector('a[href*="user.php?idn="], a[href*="/user.php?idn="], a[href*="user.php?id="], a[href*="/user.php?id="]');
      if (!a) continue;

      const name = (a.textContent || '').replace(/\s+/g,' ').trim();
      if (!name) continue;
      const rec = PT.db[name.toLowerCase()];
      if (!rec) continue;

      let tag = tr.querySelector('.mrb-plating-inline');
      if (!tag) {
        tag = document.createElement('span');
        tag.className = 'mrb-plating-inline';
        tag.style.cssText = 'margin-left:8px;font-size:11px;opacity:.9';
        a.insertAdjacentElement('afterend', tag);
      }

      if (rec.hasPlating) {
        tag.textContent = `🛡️ ${fmtTime(rec.lastSeenAt)}`;
        tag.title = 'Plating actief bij laatste trackercontrole';
      } else if (rec.platingGoneAt) {
        tag.textContent = `❌ weg ${fmtDateTime(rec.platingGoneAt)}`;
        tag.title = 'Eerste trackercontrole waarop plating verdwenen was';
      } else {
        tag.textContent = `○ geen plating · ${fmtTime(rec.lastSeenAt)}`;
      }
    }
  }

  function decorateCurrentPage() {
    decorateProfile();
    decorateAllUsers();
  }

  // ============================================================
  // GEZAMENLIJK PANEEL
  // ============================================================
  const K_POS_X = 'mrb_tracker_suite_pos_x';
  const K_POS_Y = 'mrb_tracker_suite_pos_y';
  let box = null;

  function applySavedPosition() {
    const x = Number(g(K_POS_X, NaN));
    const y = Number(g(K_POS_Y, NaN));
    if (!box || !Number.isFinite(x) || !Number.isFinite(y)) return;

    const maxX = Math.max(0, innerWidth - box.offsetWidth);
    const maxY = Math.max(0, innerHeight - box.offsetHeight);
    box.style.left = Math.min(Math.max(0,x),maxX) + 'px';
    box.style.top = Math.min(Math.max(0,y),maxY) + 'px';
    box.style.right = 'auto';
    box.style.bottom = 'auto';
  }

  function makeDraggable() {
    const h = box?.querySelector('#mrb-suite-drag');
    if (!h || h.dataset.ready === '1') return;
    h.dataset.ready = '1';

    h.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      e.preventDefault();
      const r = box.getBoundingClientRect();
      const dx = e.clientX-r.left, dy = e.clientY-r.top;

      box.style.left = r.left+'px';
      box.style.top = r.top+'px';
      box.style.right = 'auto';
      box.style.bottom = 'auto';

      const move = ev => {
        const maxX = Math.max(0, innerWidth-box.offsetWidth);
        const maxY = Math.max(0, innerHeight-box.offsetHeight);
        box.style.left = Math.min(Math.max(0,ev.clientX-dx),maxX)+'px';
        box.style.top = Math.min(Math.max(0,ev.clientY-dy),maxY)+'px';
      };
      const up = () => {
        document.removeEventListener('pointermove',move,true);
        document.removeEventListener('pointerup',up,true);
        const rr = box.getBoundingClientRect();
        s(K_POS_X,Math.round(rr.left));
        s(K_POS_Y,Math.round(rr.top));
      };
      document.addEventListener('pointermove',move,true);
      document.addEventListener('pointerup',up,true);
    });
  }

  function render() {
    if (!document.body) return;

    if (!box) {
      box = document.createElement('div');
      box.id = 'mrb-tracker-suite';
      box.style.cssText = [
        'position:fixed','right:12px','bottom:12px','z-index:2147483646',
        'width:330px','background:rgba(16,16,16,.96)','color:#eee',
        'border:1px solid #8b7428','border-radius:8px',
        'font:12px/1.3 Arial,sans-serif','box-shadow:0 4px 18px rgba(0,0,0,.5)'
      ].join(';');
      document.body.appendChild(box);
      requestAnimationFrame(applySavedPosition);
    }

    const h = mdHistory();
    const mdTotal = h.reduce((a,x)=>a+Number(x.amount||0),0);
    const mdLast = h[h.length-1];
    const recentDrops = h.slice(-4).reverse().map(x => `
      <div style="display:flex;justify-content:space-between;border-top:1px solid #333;padding:3px 0">
        <span>${esc(fmtDateTime(x.ts))}</span><b>${money(x.amount)}</b>
      </div>`).join('') || '<div style="opacity:.65">Nog geen drops.</div>';

    const ps = ptStats();

    box.innerHTML = `
      <div id="mrb-suite-drag" style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-bottom:1px solid #4c3a0a;cursor:move;user-select:none">
        <div>
          <b style="font-size:14px">MRB Tracker Suite</b>
          <span id="mrb-suite-compact-summary" style="margin-left:8px;opacity:.75;font-size:11px;${UI.minimized?'':'display:none'}">
            ${money(mdTodayTotal(h))} vandaag · ${ps.active} plating
          </span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span>v1.7</span>
          <button id="mrb-suite-min" type="button" title="${UI.minimized?'Uitklappen':'Minimaliseren'}"
            style="min-width:24px;padding:1px 5px">${UI.minimized?'＋':'−'}</button>
          <button id="mrb-suite-hide" type="button" title="Verbergen"
            style="min-width:24px;padding:1px 5px">×</button>
        </div>
      </div>

      <div id="mrb-suite-body" style="${UI.minimized?'display:none;':''}">
      <div style="padding:8px 10px;border-bottom:1px solid #333">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <b>Moneydrops</b>
          <span style="color:${MD.enabled?'#8fda83':'#e58a8a'}">${MD.enabled?'ACTIEF':'UIT'}</span>
        </div>
        <div>Vandaag: <b>${money(mdTodayTotal(h))}</b></div>
        <div>Totaal: <b>${money(mdTotal)}</b></div>
        <div>Laatste: <b>${mdLast ? money(mdLast.amount)+' · '+fmtTime(mdLast.ts) : '-'}</b></div>
        <div style="opacity:.75;margin-top:3px">${esc(MD.status)}</div>
        <div style="margin-top:5px">${recentDrops}</div>
        <div style="display:flex;gap:5px;margin-top:6px">
          <button id="mdToggle">${MD.enabled?'Stop':'Start'}</button>
          <button id="mdResetToday">Reset vandaag</button>
          <button id="mdResetAll">Reset alles</button>
        </div>
      </div>

      <div style="padding:8px 10px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <b>Plating</b>
          <span style="color:${PT.running?'#8fda83':'#e58a8a'}">${PT.running?'ACTIEF':'UIT'}</span>
        </div>
        <div>Bekend: <b>${ps.known}</b> · plating: <b>${ps.active}</b> · verdwenen: <b>${ps.gone}</b></div>
        <div>Laatste sweep: <b>${fmtDateTime(Number(g(PT.K_LAST_SWEEP,0)||0))}</b></div>
        <div style="opacity:.75;margin-top:3px">${esc(PT.status)}</div>
        <div style="margin-top:6px">
          <div style="font-weight:bold;margin-bottom:2px">Plating kwijt geraakt:</div>
          ${
            ptEvents().slice(-6).reverse().map(e => `
              <div style="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #333;padding:3px 0">
                <span>${esc(e.name)}</span>
                <span>${esc(fmtDateTime(e.ts))}</span>
              </div>
            `).join('') || '<div style="opacity:.65">Nog geen plating-verlies geregistreerd.</div>'
          }
        </div>
        <div style="display:flex;gap:5px;margin-top:6px">
          <button id="ptToggle">${PT.running?'Stop':'Start'}</button>
          <button id="ptSweep">Sweep nu</button>
          <button id="ptLabels">Ververs labels</button>
          <button id="ptResetEvents">Wis historie</button>
        </div>
      </div>
      </div>`;

    box.style.display = UI.hidden ? 'none' : 'block';
    box.style.width = UI.minimized ? '360px' : '330px';

    makeDraggable();


    box.querySelector('#mrb-suite-min').onclick = (e) => {
      e.stopPropagation();
      UI.minimized = !UI.minimized;
      s(UI.K_MIN, UI.minimized);
      render();
    };
    box.querySelector('#mrb-suite-hide').onclick = (e) => {
      e.stopPropagation();
      UI.hidden = true;
      s(UI.K_HIDDEN, true);
      box.style.display = 'none';
    };

    box.querySelector('#mdToggle').onclick = () => {
      MD.enabled = !MD.enabled;
      s(MD.K.enabled, MD.enabled);
      MD.status = MD.enabled ? 'Tracker gestart.' : 'Tracker gestopt.';
      render();
      if (MD.enabled) mdCheck();
    };
    box.querySelector('#mdResetToday').onclick = () => {
      const d = new Date();
      const start = new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();
      mdSaveHistory(mdHistory().filter(x => x.ts < start));
      MD.status = 'Vandaag gewist.';
      render();
    };
    box.querySelector('#mdResetAll').onclick = () => {
      if (!confirm('Alle opgeslagen moneydrops wissen?')) return;
      mdSaveHistory([]);
      s(MD.K.lastTotal,null);
      s(MD.K.lastPocket,null);
      s(MD.K.lastBank,null);
      MD.status = 'Alles gewist; volgende meting is nulmeting.';
      render();
    };

    box.querySelector('#ptToggle').onclick = () => {
      PT.running = !PT.running;
      s(PT.K_RUN, PT.running);
      if (!PT.running) {
        PT.stopRequested = true;
        if (PT.timer) clearTimeout(PT.timer);
        PT.timer = null;
        PT.status = 'Gestopt';
      } else {
        PT.stopRequested = false;
        PT.status = 'Gestart';
        setTimeout(ptSweep,250);
      }
      render();
    };
    box.querySelector('#ptSweep').onclick = () => {
      if (!PT.running) {
        PT.running = true;
        s(PT.K_RUN,true);
      }
      ptSweep();
    };
    box.querySelector('#ptLabels').onclick = decorateCurrentPage;
    box.querySelector('#ptResetEvents').onclick = () => {
      if (!confirm('Alle geregistreerde plating-verliesmomenten wissen?')) return;
      ptSaveEvents([]);
      render();
    };

    updateMenuEntryState();
  }


  // ============================================================
  // OMERTA LINKERMENU INTEGRATIE
  // ============================================================
  function findExactTextElement(txt) {
    const wanted = String(txt || '').trim().toLowerCase();
    const candidates = [...document.querySelectorAll('a,div,span,td,li')];

    return candidates.find(el => {
      const own = (el.textContent || '').replace(/\s+/g,' ').trim().toLowerCase();
      if (own !== wanted) return false;

      // Kies bij voorkeur het kleinste element dat daadwerkelijk alleen deze menu-entry bevat.
      const children = [...el.children];
      return !children.some(ch =>
        (ch.textContent || '').replace(/\s+/g,' ').trim().toLowerCase() === wanted
      );
    }) || null;
  }

  function findMenuRowFor(el) {
    if (!el) return null;

    // Omerta gebruikt afhankelijk van layout verschillende wrappers.
    // Kies de kleinste wrapper die qua afmetingen op een normale menu-entry lijkt.
    let node = el;
    for (let i = 0; i < 5 && node; i++, node = node.parentElement) {
      const r = node.getBoundingClientRect?.();
      if (r && r.width >= 80 && r.width <= 260 && r.height >= 18 && r.height <= 42) {
        return node;
      }
    }
    return el.closest('li, tr, div') || el;
  }

  function installMenuEntry() {
    if (document.getElementById('mrb-tracker-menu-entry')) return true;

    const accountVerificationText = findExactTextElement('Account Verificatie');
    if (!accountVerificationText) return false;

    const base = findMenuRowFor(accountVerificationText);
    if (!base || !base.parentElement) return false;

    // We maken een neutrale wrapper en nemen de visuele eigenschappen van
    // Account Verificatie over, zodat MRB Tracker eruitziet als een gewone game-entry.
    const row = document.createElement('div');
    row.id = 'mrb-tracker-menu-entry';

    const cs = getComputedStyle(base);
    const rect = base.getBoundingClientRect();

    row.style.cssText = [
      'box-sizing:border-box',
      'cursor:pointer',
      'user-select:none',
      'display:flex',
      'align-items:center',
      'width:100%',
      `min-height:${Math.max(22, Math.round(rect.height || 26))}px`,
      `font-family:${cs.fontFamily}`,
      `font-size:${cs.fontSize}`,
      `font-weight:${cs.fontWeight}`,
      `line-height:${cs.lineHeight}`,
      `color:${cs.color}`,
      `background:${cs.backgroundColor}`,
      `padding:${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      `margin:${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
      `border-top:${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
      `border-right:${cs.borderRightWidth} ${cs.borderRightStyle} ${cs.borderRightColor}`,
      `border-bottom:${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`,
      `border-left:${cs.borderLeftWidth} ${cs.borderLeftStyle} ${cs.borderLeftColor}`
    ].join(';');

    // Zelfde rustige tekststijl als de omringende account-items: geen eigen icoon,
    // geen donkere categorieheader, geen extra blok.
    row.innerHTML = `
      <span style="display:flex;align-items:center;width:100%;min-width:0">
        <span style="white-space:nowrap">MRB Tracker</span>
        <span id="mrb-tracker-menu-state"
          style="margin-left:auto;padding-left:8px;font-size:10px;opacity:.55;white-space:nowrap"></span>
      </span>`;

    // Hover visueel laten aansluiten op het bestaande menu.
    row.addEventListener('mouseenter', () => {
      try {
        const hoverTarget = base.matches(':hover') ? base : null;
        if (!hoverTarget) row.style.filter = 'brightness(1.08)';
      } catch {}
    });
    row.addEventListener('mouseleave', () => {
      row.style.filter = '';
    });

    row.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      UI.hidden = !UI.hidden;
      s(UI.K_HIDDEN, UI.hidden);
      if (box) box.style.display = UI.hidden ? 'none' : 'block';
      if (!UI.hidden) render();
      updateMenuEntryState();
    }, true);

    // Exact onder Account Verificatie.
    base.insertAdjacentElement('afterend', row);
    updateMenuEntryState();
    return true;
  }

  function updateMenuEntryState() {
    const st = document.getElementById('mrb-tracker-menu-state');
    if (!st) return;

    // Klein en subtiel houden zodat het eruit blijft zien als een normale menu-entry.
    st.textContent = UI.hidden ? 'toon' : (UI.minimized ? 'compact' : '');
  }

  function ensureMenuEntry() {
    if (installMenuEntry()) return;
    setTimeout(installMenuEntry, 800);
    setTimeout(installMenuEntry, 1800);
    setTimeout(installMenuEntry, 3500);
  }

  // ============================================================
  // BOOT
  // ============================================================
  function boot() {
    render();
    ensureMenuEntry();
    decorateCurrentPage();

    if (MD.timer) clearInterval(MD.timer);
    MD.timer = setInterval(mdCheck, MD.checkMs);
    if (MD.enabled) setTimeout(mdCheck, 1200);

    const last = Number(g(PT.K_LAST_SWEEP,0)||0);
    if (PT.running) {
      if (!last || Date.now()-last > PT.sweepEveryMs) setTimeout(ptSweep, 1800);
      else scheduleSweep();
    }

    let decoTimer = 0;
    const root = document.querySelector('#game_container') || document.body;
    if (root) {
      new MutationObserver(() => {
        clearTimeout(decoTimer);
        decoTimer = setTimeout(() => {
          decorateCurrentPage();
          installMenuEntry();
        },250);
      }).observe(root,{childList:true,subtree:true});
    }
    addEventListener('hashchange',()=>setTimeout(decorateCurrentPage,300),true);
    addEventListener('popstate',()=>setTimeout(decorateCurrentPage,300),true);
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
