// ===== DATA =====
// ratio: cell shape in the square-grid — 'square' (1 cell) or 'wide' (spans two
// cells, one long horizontal frame). Mostly squares; wide tiles are dropped in
// at varied spots so a horizontal role merges two squares here and there,
// giving an editorial, non-uniform rhythm (not a flat row of identical tiles).
const WORK = [
  {name:"California Realtors | Dear California Dream", img:"assets/work/v-849692144.jpg", vimeo:"849692144", ratio:"square"},
  {name:"Adrenaline Gold | Baroque Bang", img:"assets/work/v-468648611.jpg", vimeo:"468648611", ratio:"square"},
  {name:"Haval H3 | A Brighter Life", img:"assets/work/v-969668366.jpg", vimeo:"969668366", ratio:"wide"},
  {name:"St Regis | Wonder", img:"assets/work/v-394209969.jpg", vimeo:"394209969", ratio:"square"},
  {name:"Kia K5", img:"assets/work/v-1053336088.jpg", vimeo:"1053336088", ratio:"square"},
  {name:"Whole Foods | Food For Our Future", img:"assets/work/v-554243009.jpg", vimeo:"554243009", ratio:"square"},
  {name:"Yango Maps | A Perfect Way", img:"assets/work/v-882659457.jpg", vimeo:"882659457", ratio:"wide"},
  {name:"Toyota | The Boxer", img:"assets/work/v-215650034.jpg", vimeo:"215650034", ratio:"square"},
  {name:"InDrive | People Driven", img:"assets/work/v-848738556.jpg", vimeo:"848738556", ratio:"square"},
  {name:"Asian Games | Colors", img:"assets/work/v-264404893.jpg", vimeo:"264404893", ratio:"square"},
  {name:"Sber Investment", img:"assets/work/v-1158151394.jpg", vimeo:"1158151394", ratio:"wide"},
  {name:"Ostrovok!", img:"assets/work/v-1079291027.jpg", vimeo:"1079291027", ratio:"square"},
  {name:"HBO | Westworld — Car Chase Scene [S03E05]", img:"assets/work/v-425890146.jpg", vimeo:"425890146", ratio:"square"},
  {name:"TBank Premium", img:"assets/work/v-1055504210.jpg", vimeo:"1055504210", ratio:"square"},
  {name:"Yandex Split", img:"assets/work/v-910327781.jpg", vimeo:"910327781", ratio:"wide"},
  {name:"McDonald's | Alpine Taste", img:"assets/work/v-652793889.jpg", vimeo:"652793889", ratio:"square"},
  {name:"Haval | Intellectual Freedom", img:"assets/work/v-453637501.jpg", vimeo:"453637501", ratio:"square"},
  {name:"Danone | Simply Good", img:"assets/work/v-380886455.jpg", vimeo:"380886455", ratio:"square"},
  {name:"KIA | The Flow", img:"assets/work/v-690914061.jpg", vimeo:"690914061", ratio:"wide"},
  {name:"Academy Sports | Further", img:"assets/work/v-568883704.jpg", vimeo:"568883704", ratio:"square"},
  {name:"IKEA | Play And Study", img:"assets/work/v-367822805.jpg", vimeo:"367822805", ratio:"square"},
  {name:"Danone | If", img:"assets/work/v-373855292.jpg", vimeo:"373855292", ratio:"wide"}
];

const CLIENTS = [
  {n:"Google",f:"google"},{n:"Coca-Cola",f:"cocacola"},{n:"Toyota",f:"toyota"},{n:"IKEA",f:"ikea"},
  {n:"Visa",f:"visa"},{n:"McDonald's",f:"mcdonalds"},{n:"Red Bull",f:"redbull"},{n:"Volkswagen",f:"volkswagen"},
  {n:"Danone",f:"danone"},{n:"Yandex",f:"yandex"},{n:"Burger King",f:"burgerking"},{n:"KIA",f:"kia"},
  {n:"Lay's",f:"lays"},{n:"HBO",f:"hbo"},{n:"Kaspersky",f:"kaspersky"},{n:"BBDO",f:"bbdo"},
  {n:"TBWA",f:"tbwa"},{n:"McCann",f:"mccann"},{n:"Leo Burnett",f:"leoburnett"},
  {n:"Saatchi & Saatchi",f:"saatchi"},{n:"Grey",f:"grey"},{n:"Dentsu",f:"dentsu"},{n:"Havas",f:"havas"}
];

// ===== HERO ENTRANCE =====
function startHero(){
  const hero = document.getElementById('hero');
  if(hero) requestAnimationFrame(()=> hero.classList.add('in'));
}
// Wait for fonts so the reveal animates in the final font (no swap reflow / judder)
if(document.fonts && document.fonts.ready){
  let started = false;
  const go = ()=>{ if(started) return; started = true; startHero(); };
  document.fonts.ready.then(go);
  setTimeout(go, 700); // safety fallback if fonts stall
}else{
  startHero();
}

// ===== RENDER WORK =====
const grid = document.getElementById('workGrid');
const workMore = document.getElementById('workMore');
const FIRST_BATCH = 12;   // show a fuller grid up front
const BATCH = 12;         // one "View more" loads the rest
let shown = 0;

function workCard(w){
  const label = w.name.split('|')[0].trim();
  const ratio = w.ratio || 'wide';
  return `
  <button type="button" class="work__item work__item--new work__item--${ratio}" data-vimeo="${w.vimeo}" data-name="${label.replace(/"/g,'&quot;')}" aria-label="Play ${label.replace(/"/g,'&quot;')}">
    <span class="work__reveal">
    <img src="${w.img}" alt="${label} — REEF Audio project still" loading="lazy">
    <video class="work__video" data-prev="assets/work/preview/p-${w.vimeo}.mp4" muted loop playsinline preload="none" aria-hidden="true"></video>
    <div class="work__overlay"><span class="work__name-mask"><span class="work__name">${label}</span></span></div>
    </span>
  </button>`;
}
// reveal work items as they scroll into view (not static)
// Within a row, cards cascade left -> right (a small per-column delay) instead of
// all popping together. Column index = how many tiles share this tile's row top
// but sit to its left. One column (mobile portrait) => delay 0 => unchanged.
function rowIndex(el){
  const top = el.offsetTop;
  let i = 0;
  grid.querySelectorAll('.work__item').forEach(sib=>{
    if(sib===el) return;
    if(Math.abs(sib.offsetTop - top) <= 4 && sib.offsetLeft < el.offsetLeft) i++;
  });
  return i;
}
const workIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){
    e.target.style.setProperty('--rowdelay', (rowIndex(e.target) * 0.11) + 's');
    e.target.classList.add('in');
    workIO.unobserve(e.target);
  }});
},{threshold:.16, rootMargin:'0px 0px -60px 0px'});
function revealNewItems(){
  const fresh = grid.querySelectorAll('.work__item--new');
  fresh.forEach((el)=>{
    el.classList.remove('work__item--new');
    workIO.observe(el);
  });
  if(typeof observePreviews === 'function') observePreviews();
}
function loadMoreWork(){
  const next = WORK.slice(shown, shown + BATCH);
  grid.insertAdjacentHTML('beforeend', next.map(workCard).join(''));
  shown += next.length;
  revealNewItems();
  if(shown >= WORK.length) workMore.classList.add('work__more--hidden');
}
loadMoreWork();
if(workMore) workMore.addEventListener('click', (e)=>{ loadMoreWork(); e.currentTarget.blur(); });

// Make every grid row exactly one column-width tall, so all tiles share one
// uniform height: a single-column tile is a square, a two-column 'wide' tile is
// one long horizontal frame of the same height. Recompute on resize.
(function(){
  if(!grid) return;
  function sizeCells(){
    // On the single-column phone layout the tiles use their own 16:9 aspect.
    if(window.matchMedia('(max-width:560px)').matches){ grid.style.removeProperty('--cell'); return; }
    const cols = window.matchMedia('(min-width:901px)').matches ? 3 : 2;
    const cs = getComputedStyle(grid);
    const gap = parseFloat(cs.columnGap || cs.gap || '0') || 0;
    const inner = grid.clientWidth
      - (parseFloat(cs.paddingLeft)||0)
      - (parseFloat(cs.paddingRight)||0);
    const colW = (inner - gap*(cols-1)) / cols;
    if(colW>0) grid.style.setProperty('--cell', colW + 'px');
  }
  sizeCells();
  window.addEventListener('resize', sizeCells, {passive:true});
  window.addEventListener('load', sizeCells);
})();

// ===== AUTOPLAY PREVIEW LOOPS (play inline whenever a card is on screen) =====
// Inspired by field.io: preview videos start looping as soon as the card scrolls
// into view, with no hover needed. They pause when the card leaves the viewport
// to keep bandwidth/CPU in check.
var observePreviews = function(){};
(function(){
  if(!grid) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;

  // Attach the source (and start decoding) BEFORE the card is fully in frame, so
  // playback can begin the instant the reveal starts — no static-still gap.
  function warm(item){
    const v = item.querySelector('.work__video');
    if(!v) return;
    if(!v.src){ const s = v.getAttribute('data-prev'); if(s){ v.preload='auto'; v.src = s; try{v.load();}catch(e){} } }
  }
  function loadAndPlay(item){
    const v = item.querySelector('.work__video');
    if(!v) return;
    warm(item);
    item.classList.add('is-previewing');
    const p = v.play();
    if(p && p.catch) p.catch(()=>{});
  }
  function stop(item){
    const v = item.querySelector('.work__video');
    if(!v) return;
    item.classList.remove('is-previewing');
    try{ v.pause(); }catch(e){}
  }

  // Autoplay tied to the reveal, not after it. The video is pre-warmed the moment
  // a card starts peeking in, then plays as soon as ~12% is visible — the same
  // point the 'kadr' reveal begins — so motion is already running as the frame
  // opens (no static still). Pauses when the card leaves the viewport.
  const previewIO = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      const item = en.target;
      const r = en.intersectionRatio;
      if(en.isIntersecting && r > 0){ warm(item); }
      if(en.isIntersecting && r >= 0.12){ loadAndPlay(item); }
      else if(!en.isIntersecting){ stop(item); }
    });
  }, {threshold:[0, 0.05, 0.12, 0.35, 0.6], rootMargin:'200px 0px 200px 0px'});

  observePreviews = function(){
    grid.querySelectorAll('.work__item').forEach(el=>{
      if(el.dataset.prevObserved === '1') return;
      el.dataset.prevObserved = '1';
      previewIO.observe(el);
    });
  };
  observePreviews();

  // Pause everything while the tab is hidden; resume the visible ones on return.
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden){
      grid.querySelectorAll('.work__item.is-previewing .work__video').forEach(v=>{ try{v.pause();}catch(e){} });
    } else {
      grid.querySelectorAll('.work__item.is-previewing .work__video').forEach(v=>{ const p=v.play(); if(p&&p.catch)p.catch(()=>{}); });
    }
  });

  // touch lightbox helper no longer gates on preview state
  window.__workTouchCurrent = ()=> null;
})();
// Observe any cards that were rendered before the autoplay observer was ready.
observePreviews();

// ===== VIDEO LIGHTBOX =====
(function(){
  const lb = document.getElementById('lightbox');
  if(!lb || !grid) return;
  const frameWrap = lb.querySelector('.lightbox__frame');
  const titleEl = lb.querySelector('.lightbox__title');
  const closeBtn = lb.querySelector('.lightbox__close');
  let lastFocus = null;

  function open(vimeoId, name){
    if(!vimeoId) return;
    if(typeof gtag === 'function'){ gtag('event', 'clip_open', {clip_title: name || '', clip_id: vimeoId, page: 'home'}); }
    lastFocus = document.activeElement;
    titleEl.textContent = name || '';
    const src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&byline=0&title=0&portrait=0&dnt=1`;
    frameWrap.innerHTML = `<iframe src="${src}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${(name||'').replace(/"/g,'&quot;')}"></iframe>`;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.classList.add('lb-open');
    // focus for a11y but avoid a stray focus-ring flash on the close button
    closeBtn.focus({preventScroll:true});
    closeBtn.blur();
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.classList.remove('lb-open');
    frameWrap.innerHTML = '';
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Previews already autoplay inline everywhere, so a single click/tap opens the
  // full video on every device.
  grid.addEventListener('click', (e)=>{
    const item = e.target.closest('.work__item');
    if(!item) return;
    e.preventDefault();
    open(item.getAttribute('data-vimeo'), item.getAttribute('data-name'));
  });
  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', (e)=>{ if(e.target === lb || e.target.classList.contains('lightbox__backdrop')) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && lb.classList.contains('open')) close(); });
})();

// ===== CLIENTS MARQUEE =====
const clientTrack = document.getElementById('clientTrack');
if(clientTrack){
  const item = c => `<div class="marquee__item"><img src="assets/clients/${c.f}.png" alt="${c.n}" decoding="async" draggable="false"></div>`;
  const seq = CLIENTS.map(item).join('');
  // duplicate the sequence twice for a seamless -50% loop
  clientTrack.innerHTML = seq + seq;

  // Start the scroll only after every logo has fully loaded, so the track
  // width is final and nothing appears to "disappear" or crawl on first view.
  const imgs = Array.from(clientTrack.querySelectorAll('img'));
  let done = 0;
  const start = () => clientTrack.classList.add('is-ready');
  const tick = () => { if(++done >= imgs.length) start(); };
  imgs.forEach(img => {
    if(img.complete && img.naturalWidth){ tick(); }
    else {
      img.addEventListener('load', tick, {once:true});
      img.addEventListener('error', tick, {once:true});
    }
  });
  // Safety net: never leave it stalled if a request hangs.
  setTimeout(start, 3000);
}

// ===== YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
const onScroll = ()=> nav.classList.toggle('nav--scrolled', window.scrollY > 30);
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

// ===== MENU =====
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('menu');
function setMenu(open){
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.setAttribute('aria-hidden', !open);
}
toggle.addEventListener('click', ()=> setMenu(!document.body.classList.contains('menu-open')));
menu.querySelectorAll('a').forEach(el=>el.addEventListener('click', ()=> setMenu(false)));
document.addEventListener('keydown', e=>{ if(e.key==='Escape') setMenu(false); });

// ===== REVEAL =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
},{threshold:.14, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{
  el.style.transitionDelay = (i % 4 * 0.06) + 's';
  io.observe(el);
});
// Per-group staggered cascade: siblings inside these groups reveal in local order
// (0 / 80 / 160 / 240ms) so About columns and Capabilities rows read 1-2-3 cleanly.
['.about__cols','.services__list'].forEach(sel=>{
  const group = document.querySelector(sel);
  if(!group) return;
  Array.from(group.querySelectorAll('.reveal')).forEach((el,j)=>{
    el.style.transitionDelay = Math.min(j,3) * 0.08 + 's';
  });
});

// ===== MOBILE PANEL ENTRANCE: Capabilities slides up as a sheet over black Work =====
// transform+opacity only (the one thing iOS Safari reliably animates). Fires ONCE when
// the panel nears the viewport, a bit early (rootMargin) so it's already moving as the
// user reaches the seam. CSS (.services.panel-in) does the slide + staggered children.
(function(){
  const services = document.getElementById('services');
  if(!services) return;
  const isTouch = window.matchMedia('(max-width:900px), (hover:none), (pointer:coarse)').matches;
  if(!isTouch) return; // desktop keeps its own sticky overlap
  const panelIO = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ services.classList.add('panel-in'); panelIO.unobserve(e.target); }});
  },{threshold:0, rootMargin:'0px 0px -18% 0px'});
  panelIO.observe(services);
})();

// ===== STICKY-OVERLAP: Capabilities slides over the pinned Work section =====
// Work is position:sticky (pinned at top:0). As Capabilities scrolls up over it we
// raise --work-cover 0->1 on <html>, which darkens (.work__dim) and sinks (scale)
// Work so it reads as a layer sliding on top. Progress = how far the top edge of
// Capabilities has travelled from the bottom of the viewport up to the top.
(function(){
  const services = document.getElementById('services');
  const workSec = document.getElementById('work');
  if(!services || !workSec) return;
  // Drives --work-cover 0->1 as Capabilities rises. Both desktop (pins + scales the whole
  // Work) and mobile/touch (pins only a viewport-tall dim veil) consume it via their own
  // CSS; only prefers-reduced-motion disables it entirely.
  const reduce = window.matchMedia('(prefers-reduced-motion:reduce)');
  const root = document.documentElement;
  let ticking = false, active = false;
  function update(){
    ticking = false;
    const vh = window.innerHeight;
    const top = services.getBoundingClientRect().top;
    // --work-cover (desktop): 0 while Capabilities is below, 1 once it reaches the top and
    // stays 1 while Work is pinned behind it. Start covering at ~85% viewport height.
    const startAt = vh * 0.85;
    let p = (startAt - top) / startAt;
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    root.style.setProperty('--work-cover', p.toFixed(3));
    // --work-veil (mobile): a BAND that rises 0->1 as the Work/Capabilities boundary comes
    // up the screen, then falls 1->0 after it passes the top, so the fixed dim veil only
    // darkens Work near the seam and never lingers over About/Clients/footer.
    // 'top' is Capabilities' top edge; peak the veil while that edge is in the upper third.
    let v;
    if(top >= startAt){ v = 0; }                       // Capabilities still well below -> no veil
    else if(top >= 0){ v = (startAt - top) / startAt; } // rising as it comes up
    else { v = 1 - Math.min(1, (-top) / vh); }          // falling once it passes the top
    v = v < 0 ? 0 : v > 1 ? 1 : v;
    root.style.setProperty('--work-veil', v.toFixed(3));
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  function apply(){
    const on = !reduce.matches;
    if(on === active) return;
    active = on;
    if(on){
      window.addEventListener('scroll', onScroll, {passive:true});
      window.addEventListener('resize', onScroll, {passive:true});
      update();
    } else {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.style.setProperty('--work-cover', '0'); // reset when motion is reduced
    }
  }
  apply();
  reduce.addEventListener('change', apply);
})();

// ===== SECTION ENTRANCE (hero/contact word choreography) =====
const secIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:.3});
const contactSec = document.getElementById('contact');
if(contactSec) secIO.observe(contactSec);

// ===== FLOATING WIDGET (back to top) =====
(function(){
  const widget = document.getElementById('widget');
  if(!widget) return;
  const work = document.getElementById('work');
  let up = false;
  function update(){
    // always visible; only its direction changes with scroll
    widget.classList.add('show');
    up = window.scrollY > window.innerHeight*0.6;
    widget.classList.toggle('widget--up', up);
    widget.setAttribute('aria-label', up ? 'Back to top' : 'Scroll down');
  }
  widget.addEventListener('click', e=>{
    e.preventDefault();
    if(up){
      window.scrollTo({top:0, behavior:'smooth'});
    } else if(work){
      work.scrollIntoView({behavior:'smooth'});
    } else {
      window.scrollTo({top:window.innerHeight, behavior:'smooth'});
    }
  });
  update(); window.addEventListener('scroll', update, {passive:true});
})();

// ===== CAPABILITIES ACCORDION =====
(function(){
  const heads = document.querySelectorAll('.service__head');
  const toggleHead = (h)=>{
    const open = h.getAttribute('aria-expanded') === 'true';
    heads.forEach(o=>{ if(o!==h) o.setAttribute('aria-expanded','false'); });
    h.setAttribute('aria-expanded', open ? 'false' : 'true');
  };
  heads.forEach(h=>{
    let handled = false;
    // pointerup fires on first tap (no 300ms hover delay on touch); guard against the synthetic click that follows
    h.addEventListener('pointerup', (e)=>{ if(e.pointerType==='touch'){ handled = true; toggleHead(h); } });
    h.addEventListener('click', ()=>{ if(handled){ handled = false; return; } toggleHead(h); });
  });
})();

/* ===== GENTLE PARALLAX ON THE STATIC PHOTO LAYERS =====
   Transform-based, so it behaves the same on desktop and on mobile Safari
   (background-attachment:fixed is unreliable on iOS). Each layer is scaled a
   hair so the small vertical shift never exposes an edge. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const layers = [
    { el: document.querySelector('.hero__media'),   amp: 60, scale: 1.08 },
    { el: document.querySelector('.about__bg'),     amp: 46, scale: 1.08 },
    // the footer band is short, so it needs a bit more headroom to move in
    { el: document.querySelector('.footer__wall'), amp: 70, scale: 1.14 }
  ].filter(l => l.el);
  if (!layers.length) return;

  layers.forEach(l => { l.el.style.transform = `translate3d(0,0,0) scale(${l.scale})`; });

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const l of layers) {
      const r = l.el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      // -0.5 when the layer sits below the fold, +0.5 once it has scrolled past
      const p = Math.max(-0.5, Math.min(0.5, (vh / 2 - (r.top + r.height / 2)) / (vh + r.height)));
      const cap = (r.height * (l.scale - 1)) / 2 - 6;
      const y = Math.max(-cap, Math.min(cap, p * l.amp)).toFixed(2);
      l.el.style.transform = `translate3d(0,${y}px,0) scale(${l.scale})`;
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('orientationchange', onScroll, { passive: true });
  update();
})();

// ===== WORK GRID: INNER-MEDIA SCROLL PARALLAX =====
// A refined, artifact-free take on poison.studio's settle: the tile frame stays
// perfectly still (no scaling of the box => no edge-bleed, no neighbour overlap),
// and ONLY the media INSIDE the fixed overflow:hidden frame drifts a few px as the
// tile travels through the viewport. Reads as a calm, premium parallax rather than
// a glitchy scale. rAF-throttled; disabled for reduced-motion.
(() => {
  const g = document.getElementById('workGrid');
  if (!g) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let on = !reduce.matches;
  const AMP = 14; // max inner drift in px (media is over-scanned, so it never gaps)

  let ticking = false;
  function clear(){
    g.querySelectorAll('.work__item .work__media, .work__item img, .work__item .work__video')
     .forEach(el => { el.style.removeProperty('--pz'); });
  }
  function update(){
    ticking = false;
    if (!on) return;
    const vh = window.innerHeight;
    const items = g.querySelectorAll('.work__item.in');
    for (const el of items){
      const r = el.getBoundingClientRect();
      if (r.bottom < -60 || r.top > vh + 60) continue;
      // progress: 0 when tile centre is at viewport bottom, 1 at the top
      const c = r.top + r.height / 2;
      let p = 1 - (c / vh);            // 0..1 as it rises
      p = Math.max(0, Math.min(1, p));
      const shift = ((p - 0.5) * 2 * AMP).toFixed(2); // -AMP..+AMP
      el.style.setProperty('--pz', shift + 'px');
    }
  }
  const onScroll = () => { if (!ticking){ ticking = true; requestAnimationFrame(update); } };
  function setState(){ on = !reduce.matches; if (!on) clear(); else onScroll(); }
  (reduce.addEventListener ? reduce.addEventListener('change', setState) : reduce.addListener(setState));
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('orientationchange', onScroll, { passive: true });
  update();
})();
