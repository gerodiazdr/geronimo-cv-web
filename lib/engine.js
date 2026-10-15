// Animation engine for the site. Vanilla JS on purpose: every continuous value (scroll progress,
// pointer, velocity) is written straight to the DOM / CSS variables, so scrolling never re-renders React.
// Sections: immersive hero portal, actors that travel to the system, pinned system, funnel, AI flow,
// experience timeline, exit portal, case overlays, smooth wheel scrolling, pointer + tilt reactions.

/**
 * Starts all scroll and pointer animations inside `root`.
 * @param {HTMLElement} root element with class "g-root"
 * @returns {() => void} cleanup
 */
export function startEngine(root) {
  const win = window, doc = document;
  const q = (s, el) => (el || root).querySelector(s);
  const qa = (s, el) => Array.from((el || root).querySelectorAll(s));
  const clamp = (v, a, b) => Math.max(a === undefined ? 0 : a, Math.min(b === undefined ? 1 : b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const reduce = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = win.matchMedia('(pointer: fine)').matches;

  const hero = q('.g-hero'), heroStage = q('.g-hero__stage'), orbits = q('.g-orbits');
  const orbShapes = qa('.g-orb-shape'), orbPush = qa('.g-orb-push');
  const actors = qa('.g-actor'), slots = qa('.g-slot'), dot = q('.g-dot'), actorsLayer = q('.g-actors');
  const stmt = q('.g-statement');
  const story = q('.g-story'), panels = qa('.g-panel'), stagesEl = qa('.g-stage'), track = q('.g-track');
  const funnel = q('.g-funnel'), fbox = q('.g-funnel__box'), drops = qa('.g-drop'), metricEls = qa('.g-metric');
  const ai = q('.g-ai'), abox = q('.g-ai__flow'), nodes = qa('.g-node'), linkEls = qa('.g-link'), packet = q('.g-packet'), logs = qa('.g-log');
  const exp = q('.g-exp'), ebody = q('.g-exp__body'), laneA = q('.g-lane-a'), laneB = q('.g-lane-b'), laneM = q('.g-lane-main'), expSvg = q('.g-exp__svg'), expItems = qa('.g-exp-item'), expDots = qa('.g-exp-dot');
  const exitSec = q('.g-exit'), overlay = q('.g-case-overlay');

  let vw = win.innerWidth, vh = win.innerHeight, pin = Math.min(vh, 900), mobile = vw < 760;
  const docTop = (el) => el.getBoundingClientRect().top + win.scrollY;
  const pinnedP = (el) => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - pin)); };

  /* ---------- smooth scroll with inertia (desktop, mouse wheel) ---------- */
  const useSmooth = fine && !reduce;
  let current = win.scrollY, target = win.scrollY, lastY = win.scrollY, velS = 0, smoothing = false, overlayOpen = false;
  function onWheel(e) {
    if (!useSmooth || e.ctrlKey || overlayOpen) return;
    e.preventDefault();
    const max = doc.documentElement.scrollHeight - win.innerHeight;
    if (!smoothing) current = target = win.scrollY;
    target = clamp(target + e.deltaY * (e.deltaMode === 1 ? 32 : 1), 0, max);
    smoothing = true;
  }
  function onScroll() { if (!smoothing) { current = target = win.scrollY; } }

  /* ---------- pointer + tilt ---------- */
  let mx = -9999, my = -9999, tiltX = 0, tiltY = 0, tiltS = { x: 0, y: 0 };
  function onMove(e) { mx = e.clientX; my = e.clientY; }
  function onLeave() { mx = my = -9999; }
  function onOrient(e) { if (e.gamma == null) return; tiltX = clamp(e.gamma / 25, -1, 1); tiltY = clamp((e.beta - 45) / 25, -1, 1); }
  function askTilt() {
    try { DeviceOrientationEvent.requestPermission().then((s) => { if (s === 'granted') win.addEventListener('deviceorientation', onOrient); }).catch(() => {}); } catch (err) {}
  }
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') root.addEventListener('touchend', askTilt, { once: true });
  else win.addEventListener('deviceorientation', onOrient);

  /* ---------- layout-dependent geometry ---------- */
  let lanePaths = null;
  function layoutExperience() {
    if (!ebody) return;
    const H = ebody.offsetHeight, group = q('.g-exp-group');
    const ym = group.offsetTop + group.offsetHeight;
    const xA = mobile ? 10 : 14, xB = mobile ? 26 : 42, xM = mobile ? 18 : 28;
    expSvg.setAttribute('viewBox', `0 0 60 ${H}`);
    expSvg.style.height = H + 'px';
    laneA.setAttribute('d', `M${xA} 0 L${xA} ${ym - 30} C${xA} ${ym}, ${xM} ${ym - 10}, ${xM} ${ym + 18}`);
    laneB.setAttribute('d', `M${xB} 0 L${xB} ${ym - 30} C${xB} ${ym}, ${xM} ${ym - 10}, ${xM} ${ym + 18}`);
    laneM.setAttribute('d', `M${xM} ${ym + 18} L${xM} ${H}`);
    lanePaths = { H, split: (ym + 18) / H };
    expItems.forEach((it, i) => {
      const d = expDots[i]; if (!d) return;
      const lane = it.dataset.lane;
      d.setAttribute('cx', lane === 'a' ? xA : lane === 'b' ? xB : xM);
      d.setAttribute('cy', it.offsetTop + (it.offsetParent === ebody ? 0 : it.offsetParent.offsetTop) + 26);
    });
  }
  let aiGeo = null;
  function layoutAI() {
    if (!abox) return;
    const b = abox.getBoundingClientRect();
    const svg = q('.g-ai__svg');
    svg.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`);
    const pts = nodes.map((n) => { const r = n.getBoundingClientRect(); return { x: r.left - b.left, y: r.top - b.top, w: r.width, h: r.height }; });
    linkEls.forEach((l, k) => {
      const a = pts[k], c = pts[k + 1]; if (!a || !c) return;
      let d;
      if (!mobile) {
        const x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = c.x, y2 = c.y + c.h / 2, dx = (x2 - x1) / 2;
        d = `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
      } else {
        const x1 = a.x + a.w / 2, y1 = a.y + a.h, x2 = c.x + c.w / 2, y2 = c.y, dy = (y2 - y1) / 2;
        d = `M${x1} ${y1} C${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
      }
      l.setAttribute('d', d);
    });
    aiGeo = { w: b.width, h: b.height };
  }
  function layout() {
    vw = win.innerWidth; vh = win.innerHeight; pin = Math.min(vh, 900); mobile = vw < 760;
    layoutExperience(); layoutAI();
  }

  /* ---------- funnel drop data ---------- */
  const exitsPlan = [0, 1, 0, 2, 1, 0, 3, 2, 4, 1, 0, 2, 3, 4, 1, 2, 3, 4];
  const dropData = drops.map((el, i) => ({ el, x0: 0.1 + 0.8 * ((i * 0.618034) % 1), exit: exitsPlan[i % exitsPlan.length], s: i * 0.028, dir: i % 2 ? 1 : -1, jit: ((i * 0.37) % 1) - 0.5 }));
  let bottomIdx = 0; dropData.forEach((d) => { if (d.exit === 4) d.pile = bottomIdx++; });

  /* ---------- pushes for the orbiting shapes ---------- */
  const pushes = orbPush.map(() => ({ x: 0, y: 0 }));
  const actorState = actors.map(() => ({ px: 0, py: 0 }));

  /* ---------- main frame ---------- */
  let raf = 0;
  function frame(now) {
    raf = win.requestAnimationFrame(frame);
    const t = now / 1000;
    // smooth scroll
    if (smoothing) {
      current = lerp(current, target, 0.11);
      if (Math.abs(target - current) < 0.4) { current = target; smoothing = false; }
      win.scrollTo({ top: current, behavior: 'instant' });
    }
    const y = win.scrollY;
    const vel = y - lastY; lastY = y;
    velS = lerp(velS, clamp(vel, -80, 80), 0.18);
    root.style.setProperty('--vel', velS.toFixed(2));
    tiltS.x = lerp(tiltS.x, tiltX, 0.08); tiltS.y = lerp(tiltS.y, tiltY, 0.08);

    /* hero */
    const hr = hero.getBoundingClientRect();
    const p = clamp(-hr.top / Math.max(1, hr.height - pin));
    const R0 = mobile ? Math.max(240, vw * 0.64) : Math.min(400, vw * 0.3, pin * 0.46);
    const Rmax = Math.hypot(vw, pin) * 0.62 + 40;
    const open = reduce ? (p > 0.3 ? 1 : 0) : ease(clamp((p - 0.1) / 0.5));
    const close = reduce ? (p > 0.9 ? 1 : 0) : ease(clamp((p - 0.8) / 0.2));
    const R = close > 0 ? lerp(Rmax, 12, close) : lerp(R0, Rmax, open);
    const fly = reduce ? 0 : ease(clamp(p / 0.6));
    const hs = hero.style;
    hs.setProperty('--R0', R0.toFixed(1));
    hs.setProperty('--R', R.toFixed(1));
    hs.setProperty('--fly', fly.toFixed(4));
    hs.setProperty('--fly-o', (1 - clamp((p - 0.35) / 0.25)).toFixed(3));
    hs.setProperty('--ring-o', ((1 - clamp((open - 0.45) / 0.35)) * (1 - close)).toFixed(3));
    hs.setProperty('--copy-o', (1 - clamp(p / 0.24)).toFixed(3));
    hs.setProperty('--copy-y', reduce ? '0' : (-90 * clamp(p / 0.4)).toFixed(1));
    hs.setProperty('--inner-o', (clamp((p - 0.5) / 0.1) * (1 - clamp((p - 0.8) / 0.07))).toFixed(3));
    hs.setProperty('--inner-y', reduce ? '0' : (24 * (1 - clamp((p - 0.5) / 0.1))).toFixed(1));
    hs.setProperty('--cue-o', (1 - clamp(p / 0.06)).toFixed(3));
    hs.setProperty('--world-o', p > 0.997 ? '0' : '1');
    hs.setProperty('--tx', (tiltS.x * 26).toFixed(1));
    hs.setProperty('--ty', (tiltS.y * 20).toFixed(1));
    hero.dataset.phase = p > 0.3 ? 'inside' : 'outside';

    const stageTop = heroStage.getBoundingClientRect().top;
    const cx = vw / 2, cy = stageTop + pin * 0.52;

    // cursor repulsion on the orbiting shapes (desktop only, while the hero is on screen)
    if (fine && hr.bottom > 0 && p < 0.4) {
      orbShapes.forEach((s, i) => {
        const r = s.getBoundingClientRect(), pu = pushes[i];
        const sx = r.left + r.width / 2 - pu.x, sy = r.top + r.height / 2 - pu.y;
        const dx = sx - mx, dy = sy - my, dist = Math.hypot(dx, dy) || 1, rad = 240 + r.width * 0.4;
        let tx = 0, ty = 0;
        if (dist < rad) { const f = (rad - dist) / rad; tx = (dx / dist) * f * 110; ty = (dy / dist) * f * 110; }
        pu.x = lerp(pu.x, tx, 0.09); pu.y = lerp(pu.y, ty, 0.09);
        orbPush[i].style.transform = `translate(${pu.x.toFixed(1)}px, ${pu.y.toFixed(1)}px)`;
      });
    }

    /* actors: orbit → row inside the portal → travel to the system list */
    const sr = story.getBoundingClientRect();
    const heroEndY = docTop(hero) + hero.offsetHeight - pin;
    const storyPinY = docTop(story);
    const tb = clamp((y - heroEndY) / Math.max(1, storyPinY - heroEndY));
    const tbE = ease(tb);
    const n = panels.length;
    const ps = mobile ? 0 : pinnedP(story);
    const idx = Math.min(n - 1, Math.floor(ps * n));
    const gather = reduce ? (p > 0.4 ? 1 : 0) : ease(clamp((p - 0.3) / 0.3));
    const spacing = mobile ? 62 : 104;
    const rowY = pin * 0.52 + pin * 0.24;
    const sizeA = mobile ? 54 : 84;
    const bases = [-2.45, -1.15, -0.1, 0.95, 2.2];
    actors.forEach((a, i) => {
      const st = actorState[i];
      const ang = bases[i] + (reduce ? 0 : t * 0.09 * (i % 2 ? 1 : -1));
      const rr = R0 * (1.22 + 0.07 * (i % 3));
      let ix = cx + Math.cos(ang) * rr * (mobile ? 0.62 : 1.1), iy = cy + Math.sin(ang) * rr * 0.95 + Math.sin(t * 1.3 + i) * 6;
      if (fine) {
        const dx = ix - mx, dy = iy - my, dist = Math.hypot(dx, dy) || 1, rad = 260;
        let tx = 0, ty = 0; if (dist < rad && p < 0.3) { const f = (rad - dist) / rad; tx = (dx / dist) * f * 130; ty = (dy / dist) * f * 130; }
        st.px = lerp(st.px, tx, 0.08); st.py = lerp(st.py, ty, 0.08); ix += st.px; iy += st.py;
      }
      ix += tiltS.x * 30; iy += tiltS.y * 24;
      const rowX = vw / 2 + (i - 2) * spacing;
      const hx = lerp(ix, rowX, gather), hy = lerp(iy, p >= 1 ? rowY : cy + pin * 0.24, gather);
      let x = hx, yy = hy, sc = lerp(1, 0.78, gather), rot = (reduce ? 0 : t * 22 * (i % 2 ? 1 : -1)) * (1 - gather), op = 1;
      if (y > heroEndY - 1) {
        if (!mobile && slots[i]) {
          const s = slots[i].getBoundingClientRect();
          const txx = s.left + s.width / 2, tyy = s.top + s.height / 2;
          const target = (s.width / sizeA) * (i === idx && ps > 0 ? 1.25 : 1);
          x = lerp(rowX, txx, tbE); yy = lerp(rowY, tyy, tbE); sc = lerp(0.78, target, tbE);
          rot = Math.sin(tb * Math.PI) * 40 * (i % 2 ? 1 : -1);
          op = sr.bottom < -60 ? 0 : (i === idx || tb < 1 || ps === 0 ? 1 : 0.55);
        } else { x = rowX; yy = rowY - tb * 80; op = 1 - clamp(tb * 2.2); }
      }
      const stretch = 1 + clamp(Math.abs(velS) * 0.004, 0, 0.22);
      a.style.opacity = op.toFixed(3);
      a.style.transform = `translate(${(x - sizeA / 2).toFixed(1)}px, ${(yy - sizeA / 2).toFixed(1)}px) rotate(${rot.toFixed(1)}deg) scale(${(sc).toFixed(3)}, ${(sc * stretch).toFixed(3)})`;
    });

    actorsLayer.classList.toggle('is-color', p > 0.9 || y > heroEndY - 1);
    /* the portal closes into a dot that becomes the system's progress head */
    if (dot) {
      if (y > heroEndY - 1 && sr.bottom > -40) {
        let x = vw / 2, yy = pin * 0.52, size = 24, op = 1;
        if (!mobile && track) {
          const tr = track.getBoundingClientRect();
          const hx = tr.left + tr.width / 2, hy = tr.top + ps * tr.height;
          x = lerp(x, hx, tbE); yy = lerp(yy, hy, tbE); size = lerp(24, 16, tbE);
        } else { op = 1 - clamp(tb * 2.2); }
        dot.style.opacity = op.toFixed(3);
        dot.style.transform = `translate(${(x - size / 2).toFixed(1)}px, ${(yy - size / 2).toFixed(1)}px)`;
        dot.style.width = dot.style.height = size.toFixed(1) + 'px';
      } else dot.style.opacity = '0';
    }

    /* statement words */
    if (stmt) {
      const r = stmt.getBoundingClientRect();
      const pw = reduce ? 1 : clamp((vh * 0.85 - r.top) / (vh * 0.7));
      stmt.style.setProperty('--pw', pw.toFixed(4));
    }

    /* system story (pinned) */
    if (!mobile) {
      story.style.setProperty('--ps', ps.toFixed(4));
      stagesEl.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      panels.forEach((panel, i) => {
        const x = ps * n - (i + 0.5);
        let o = clamp((0.62 - Math.abs(x)) / 0.24);
        if (i === 0 && x < 0) o = 1; if (i === n - 1 && x > 0) o = 1;
        panel.style.opacity = o.toFixed(3);
        panel.style.transform = reduce ? 'none' : `translateY(${(-x * 36).toFixed(1)}px) scale(${(0.97 + 0.03 * o).toFixed(4)})`;
        panel.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
        const sh = panel.querySelector('.g-panel__shape'); if (sh) sh.style.transform = `rotate(${(ps * 360).toFixed(1)}deg)`;
      });
    } else {
      // phones: cards stack (CSS sticky); the covered card shrinks and fades, shapes turn with scroll
      const rects = panels.map((pl) => pl.getBoundingClientRect());
      panels.forEach((panel, i) => {
        const r = rects[i], nx = rects[i + 1];
        const enter = clamp((vh - r.top) / (vh * 0.75));
        const cover = nx ? clamp((r.bottom - nx.top) / r.height) : 0;
        panel.style.pointerEvents = '';
        panel.style.opacity = reduce ? '' : clamp(1 - 1.35 * cover).toFixed(3);
        panel.style.transform = reduce ? '' : `translateY(${(-20 * cover).toFixed(1)}px) scale(${(1 - 0.08 * cover).toFixed(4)})`;
        const sh = panel.querySelector('.g-panel__shape');
        if (sh) sh.style.transform = reduce ? '' : `rotate(${((enter + cover) * 180 - 180).toFixed(1)}deg) scale(${(0.55 + 0.45 * enter).toFixed(3)})`;
      });
    }

    /* funnel */
    if (funnel && fbox) {
      const fr = funnel.getBoundingClientRect();
      const pf = reduce ? 1 : (mobile ? clamp((vh * 0.85 - fr.top) / (fr.height * 0.7)) : pinnedP(funnel));
      const W = fbox.clientWidth, H = fbox.clientHeight;
      const widthAt = (f) => lerp(1, 0.3, f) * W;
      dropData.forEach((d) => {
        const u = clamp((pf - d.s) / 0.42);
        const depth = d.exit === 4 ? 0.9 : (d.exit + 1) / 5 - 0.06;
        let fx, fy, op = u > 0 ? 1 : 0, rot = u * 300 * d.dir;
        fy = easeOut(u) * depth * H;
        fx = lerp(d.x0 * W, W / 2 + d.jit * widthAt(fy / H) * 0.55, ease(u));
        if (u >= 1) {
          if (d.exit < 4) { const out = clamp((pf - d.s - 0.42) / 0.1); fx += d.dir * out * W * 0.5; op = 1 - out; }
          else { fx = W / 2 + (d.pile - 1) * 30; fy = H * 0.9; rot = 0; }
        }
        d.el.style.opacity = op.toFixed(3);
        d.el.style.transform = `translate(${(fx - 13).toFixed(1)}px, ${(fy - 13).toFixed(1)}px) rotate(${rot.toFixed(0)}deg)`;
      });
      metricEls.forEach((m, k) => {
        const e = ease(clamp((pf - (0.1 + k * 0.11)) / 0.2));
        m.style.opacity = (reduce ? 1 : e).toFixed(3);
        m.style.transform = `translateY(${((1 - e) * 24).toFixed(1)}px)`;
        const c = m.querySelector('[data-count]');
        if (c) { const to = +c.dataset.count, from = +(c.dataset.from || 0); c.textContent = (c.dataset.prefix || '') + Math.round(from + (to - from) * e) + (c.dataset.suffix || ''); }
      });
      qa('.g-funnel__layer').forEach((l, k) => l.classList.toggle('is-lit', pf > 0.08 + k * 0.12));
    }

    /* AI workflow */
    if (ai && aiGeo) {
      const ar = ai.getBoundingClientRect();
      const pa = reduce ? 1 : (mobile ? clamp((vh * 0.8 - ar.top) / (ar.height * 0.8)) : pinnedP(ai));
      const steps = nodes.length;
      let active = -1;
      nodes.forEach((nd, k) => { const on = pa >= k / steps + 0.02; nd.classList.toggle('is-on', on); if (on) active = k; });
      let pk = null;
      linkEls.forEach((l, k) => {
        const d = clamp((pa - (k / steps + 0.04)) * steps * 1.1);
        l.style.strokeDashoffset = (1 - d).toFixed(4);
        if (d > 0 && d < 1) pk = { l, d };
      });
      if (packet) {
        if (pk) { const len = pk.l.getTotalLength(); const pt = pk.l.getPointAtLength(len * pk.d); packet.style.opacity = '1'; packet.style.transform = `translate(${(pt.x - 7).toFixed(1)}px, ${(pt.y - 7).toFixed(1)}px)`; }
        else packet.style.opacity = '0';
      }
      logs.forEach((lg, k) => lg.classList.toggle('is-on', pa >= (k + 1.2) / steps));
    }

    /* experience timeline */
    if (exp && lanePaths) {
      const r = ebody.getBoundingClientRect();
      const pe = reduce ? 1 : clamp((vh * 0.7 - r.top) / r.height);
      const s = lanePaths.split;
      const a = clamp(pe / s), m = clamp((pe - s) / (1 - s));
      laneA.style.strokeDashoffset = (1 - a).toFixed(4); laneB.style.strokeDashoffset = (1 - a).toFixed(4); laneM.style.strokeDashoffset = (1 - m).toFixed(4);
      const reach = pe * r.height;
      expItems.forEach((it, i) => {
        const top = it.getBoundingClientRect().top - r.top;
        const on = reduce || reach >= top + 10;
        it.classList.toggle('is-in', on);
        if (expDots[i]) expDots[i].classList.toggle('is-in', on);
      });
    }

    /* exit through the portal */
    if (exitSec) {
      const pe2 = reduce ? 1 : pinnedP(exitSec);
      exitSec.style.setProperty('--sun', (lerp(0.32, 1, ease(clamp(pe2 / 0.65)))).toFixed(4));
      exitSec.style.setProperty('--cta-o', clamp((pe2 - 0.3) / 0.25).toFixed(3));
      exitSec.style.setProperty('--cta-y', ((1 - clamp((pe2 - 0.3) / 0.25)) * 30).toFixed(1));
    }
  }

  /* ---------- clicks: copy email, cases ---------- */
  function setOverlay(open, i, btn) {
    const run = () => {
      overlayOpen = open;
      overlay.classList.toggle('is-open', open);
      doc.documentElement.classList.toggle('g-lock', open);
      if (open) qa('[data-case]', overlay).forEach((a) => { a.hidden = a.dataset.case !== String(i); });
    };
    const cardMedia = btn && btn.closest('.g-case') ? btn.closest('.g-case').querySelector('.g-case__media') : null;
    const art = open ? q(`[data-case="${i}"]`, overlay) : q('[data-case]:not([hidden])', overlay);
    const ovMedia = art ? art.querySelector('.g-case__media') : null;
    let vtOk = false;
    if (doc.startViewTransition && !reduce) { try {
      if (open && cardMedia) cardMedia.style.viewTransitionName = 'g-case-media';
      if (!open && ovMedia) ovMedia.style.viewTransitionName = 'g-case-media';
      const vt = doc.startViewTransition(() => {
        run();
        if (open) { if (cardMedia) cardMedia.style.viewTransitionName = ''; if (ovMedia) ovMedia.style.viewTransitionName = 'g-case-media'; }
        else { if (ovMedia) ovMedia.style.viewTransitionName = ''; const back = q(`.g-case[data-index="${lastCase}"] .g-case__media`); if (back) back.style.viewTransitionName = 'g-case-media'; }
      });
      vt.finished.then(() => { qa('.g-case__media').forEach((m) => { m.style.viewTransitionName = ''; }); }).catch(() => {});
      vtOk = true;
    } catch (err) { vtOk = false; } }
    if (!vtOk) { qa('.g-case__media').forEach((m) => { m.style.viewTransitionName = ''; }); run(); }
  }
  let lastCase = 0;
  function onClick(e) {
    const b = e.target.closest('[data-action]');
    if (!b || !root.contains(b)) return;
    const act = b.dataset.action;
    if (act === 'copy') {
      const label = b.querySelector('.g-copy-label') || b;
      const done = (txt) => { const old = b.dataset.label || label.textContent; b.dataset.label = old; label.textContent = txt; setTimeout(() => { label.textContent = old; }, 1800); };
      const okTxt = root.dataset.copied || 'Copied', failTxt = root.dataset.copyFail || 'Select to copy';
      try { navigator.clipboard.writeText(root.dataset.email || '').then(() => done(okTxt), () => done(failTxt)); } catch (err) { done(failTxt); }
    } else if (act === 'open-case') { lastCase = +b.dataset.index; setOverlay(true, lastCase, b); }
    else if (act === 'close-case') { setOverlay(false, lastCase, null); }
  }

  /* ---------- pause the orbiting shapes when the hero is off screen ---------- */
  let io = null;
  if ('IntersectionObserver' in win) {
    io = new IntersectionObserver((ents) => ents.forEach((en) => { orbits.classList.toggle('is-paused', !en.isIntersecting); }), { threshold: 0 });
    io.observe(heroStage);
  }

  win.addEventListener('wheel', onWheel, { passive: false });
  win.addEventListener('scroll', onScroll, { passive: true });
  win.addEventListener('pointermove', onMove, { passive: true });
  doc.addEventListener('pointerleave', onLeave);
  win.addEventListener('resize', layout);
  root.addEventListener('click', onClick);
  layout();
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(layout);
  setTimeout(layout, 600);
  raf = win.requestAnimationFrame(frame);

  return () => {
    win.cancelAnimationFrame(raf);
    win.removeEventListener('wheel', onWheel);
    win.removeEventListener('scroll', onScroll);
    win.removeEventListener('pointermove', onMove);
    doc.removeEventListener('pointerleave', onLeave);
    win.removeEventListener('resize', layout);
    win.removeEventListener('deviceorientation', onOrient);
    root.removeEventListener('click', onClick);
    if (io) io.disconnect();
  };

}
