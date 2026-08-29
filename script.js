// ===== DATA =====
const PAGE = document.body.dataset.page || 'home';
const ASSET_ROOT = document.body.dataset.assetRoot || '';
const asset = path => ASSET_ROOT + path;

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
const FEATURED_WORK = [WORK[0], WORK[1], WORK[3], WORK[4], WORK[5], WORK[7]];
const LANDSCAPE_WORK = [WORK[0], WORK[1], WORK[2], WORK[3], WORK[4], WORK[5], WORK[7]];

function workCard(w){
  const label = w.name.split('|')[0].trim();
  const ratio = w.ratio || 'wide';
  return `
  <button type="button" class="work__item work__item--new work__item--${ratio}" data-vimeo="${w.vimeo}" data-name="${label.replace(/"/g,'&quot;')}" aria-label="Play ${label.replace(/"/g,'&quot;')}">
    <span class="work__reveal">
    <img src="${asset(w.img)}" alt="${label} — REEF Audio project still" loading="lazy">
    <video class="work__video" data-prev="${asset(`assets/work/preview/p-${w.vimeo}.mp4`)}" muted loop playsinline preload="none" aria-hidden="true"></video>
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
if(grid){
  const isPhone = window.matchMedia('(max-width:560px)').matches;
  const isCompactLandscape = window.matchMedia('(orientation:landscape) and (min-width:561px) and (max-width:900px) and (max-height:560px)').matches;
  const isDesktop = window.matchMedia('(min-width:901px)').matches;
  const homeWork = isPhone
    ? FEATURED_WORK.slice(0, 4)
    : (isCompactLandscape ? LANDSCAPE_WORK : (isDesktop ? WORK.slice(0, 12) : FEATURED_WORK));
  const visibleWork = PAGE === 'work' ? WORK : homeWork;
  grid.insertAdjacentHTML('beforeend', visibleWork.map(workCard).join(''));
  revealNewItems();
}

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

function setInert(elements, inert){
  elements.filter(Boolean).forEach(el=>{ el.inert = inert; });
}

function trapFocus(container, event){
  if(event.key !== 'Tab') return;
  const focusable = Array.from(container.querySelectorAll('a[href],button:not([disabled]),iframe,[tabindex]:not([tabindex="-1"])'))
    .filter(el=>!el.inert && getComputedStyle(el).visibility !== 'hidden');
  if(!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if(event.shiftKey && document.activeElement === first){ event.preventDefault(); last.focus(); }
  else if(!event.shiftKey && document.activeElement === last){ event.preventDefault(); first.focus(); }
}

// ===== VIDEO LIGHTBOX =====
(function(){
  const lb = document.getElementById('lightbox');
  if(!lb || !grid) return;
  const frameWrap = lb.querySelector('.lightbox__frame');
  const titleEl = lb.querySelector('.lightbox__title');
  const closeBtn = lb.querySelector('.lightbox__close');
  const background = [document.querySelector('header'), document.querySelector('main'), document.querySelector('footer'), document.getElementById('menu'), document.querySelector('.skip-link')];
  let lastFocus = null;

  function open(vimeoId, name){
    if(!vimeoId) return;
    if(typeof gtag === 'function'){ gtag('event', 'clip_open', {clip_title: name || '', clip_id: vimeoId, page: PAGE}); }
    lastFocus = document.activeElement;
    titleEl.textContent = name || '';
    const src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&byline=0&title=0&portrait=0&dnt=1`;
    frameWrap.innerHTML = `<iframe src="${src}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${(name||'').replace(/"/g,'&quot;')}"></iframe>`;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.classList.add('lb-open');
    setInert(background, true);
    closeBtn.focus({preventScroll:true});
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.classList.remove('lb-open');
    setInert(background, false);
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
  document.addEventListener('keydown', (e)=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close();
    else trapFocus(lb, e);
  });
})();

// ===== CLIENTS MARQUEE =====
const clientTrack = document.getElementById('clientTrack');
if(clientTrack){
  const item = c => `<div class="marquee__item"><img src="${asset(`assets/clients/${c.f}.png`)}" alt="${c.n}" decoding="async" draggable="false"></div>`;
  const sequence = CLIENTS.map(item).join('');
  clientTrack.innerHTML = sequence + sequence;

  const images = Array.from(clientTrack.querySelectorAll('img'));
  let loaded = 0;
  const start = () => clientTrack.classList.add('is-ready');
  const tick = () => { if(++loaded >= images.length) start(); };
  images.forEach(image => {
    if(image.complete && image.naturalWidth){ tick(); }
    else{
      image.addEventListener('load', tick, {once:true});
      image.addEventListener('error', tick, {once:true});
    }
  });
  setTimeout(start, 3000);
}

// ===== YEAR =====
const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
const onScroll = ()=> nav.classList.toggle('nav--scrolled', window.scrollY > 30);
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

// ===== MENU =====
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('menu');
const menuBackground = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.brand'), document.querySelector('.nav__brief'), document.querySelector('.skip-link')];
function setMenu(open, restoreFocus = true){
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.setAttribute('aria-hidden', !open);
  setInert(menuBackground, open);
  if(open){
    const firstLink = menu.querySelector('a');
    if(firstLink) requestAnimationFrame(()=>firstLink.focus({preventScroll:true}));
  }else if(restoreFocus){
    toggle.focus({preventScroll:true});
  }
}
toggle.addEventListener('click', ()=> setMenu(!document.body.classList.contains('menu-open')));
menu.querySelectorAll('a').forEach(el=>el.addEventListener('click', ()=> setMenu(false, false)));
document.addEventListener('keydown', e=>{
  if(!document.body.classList.contains('menu-open')) return;
  if(e.key==='Escape') setMenu(false);
  else trapFocus(menu, e);
});

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

// ===== SECTION ENTRANCE (hero/contact word choreography) =====
const secIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:.3});
const contactSec = document.getElementById('contact');
if(contactSec) secIO.observe(contactSec);

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
