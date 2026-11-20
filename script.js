// ===== DATA =====
const PAGE = document.body.dataset.clientPage || document.body.dataset.page || 'home';
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
  {name:"Kia K5", img:"assets/work/v-1053336088.jpg", vimeo:"1053336088", ratio:"square"},
  {name:"Yango Maps | A Perfect Way", img:"assets/work/v-882659457.jpg", vimeo:"882659457", ratio:"wide"},
  {name:"Asian Games | Colors", img:"assets/work/v-264404893.jpg", vimeo:"264404893", ratio:"square"},
  {name:"HBO | Westworld — Car Chase Scene [S03E05]", img:"assets/work/v-425890146.jpg", vimeo:"425890146", ratio:"square"},
  {name:"Danone | If", img:"assets/work/v-373855292.jpg", vimeo:"373855292", ratio:"wide"},
  {name:"Haval | Intellectual Freedom", img:"assets/work/v-453637501.jpg", vimeo:"453637501", ratio:"square"},
  {name:"St Regis | Wonder", img:"assets/work/v-394209969.jpg", vimeo:"394209969", ratio:"square"},
  {name:"Whole Foods | Food For Our Future", img:"assets/work/v-554243009.jpg", vimeo:"554243009", ratio:"square"},
  {name:"Toyota | The Boxer", img:"assets/work/v-215650034.jpg", vimeo:"215650034", ratio:"square"},
  {name:"InDrive | People Driven", img:"assets/work/v-848738556.jpg", vimeo:"848738556", ratio:"square"},
  {name:"Sber Investment", img:"assets/work/v-1158151394.jpg", vimeo:"1158151394", ratio:"wide"},
  {name:"Ostrovok!", img:"assets/work/v-1079291027.jpg", vimeo:"1079291027", ratio:"square"},
  {name:"TBank Premium", img:"assets/work/v-1055504210.jpg", vimeo:"1055504210", ratio:"square"},
  {name:"Yandex Split", img:"assets/work/v-910327781.jpg", vimeo:"910327781", ratio:"wide"},
  {name:"McDonald's | Alpine Taste", img:"assets/work/v-652793889.jpg", vimeo:"652793889", ratio:"square"},
  {name:"Danone | Simply Good", img:"assets/work/v-380886455.jpg", vimeo:"380886455", ratio:"square"},
  {name:"KIA | The Flow", img:"assets/work/v-690914061.jpg", vimeo:"690914061", ratio:"wide"},
  {name:"Academy Sports | Further", img:"assets/work/v-568883704.jpg", vimeo:"568883704", ratio:"square"},
  {name:"IKEA | Play And Study", img:"assets/work/v-367822805.jpg", vimeo:"367822805", ratio:"square"},
  {name:"Fonbet", img:"assets/work/v-1211741208.jpg", vimeo:"1211741208", ratio:"square"},
  {name:"Wildberries", img:"assets/work/v-1157265339.jpg", vimeo:"1157265339", ratio:"square"},
  {name:"Nuttis Frutties", img:"assets/work/v-402511421.jpg", vimeo:"402511421", ratio:"wide"},
  {name:"Gazprombank x Visa", img:"assets/work/v-583846533.jpg", vimeo:"583846533", ratio:"square"},
  {name:"Greenfield", img:"assets/work/v-402912100.jpg", vimeo:"402912100", ratio:"square"},
  {name:"Volkswagen", img:"assets/work/v-416039838.jpg", vimeo:"416039838", ratio:"wide"},
  {name:"Megafon", img:"assets/work/v-357381676.jpg", vimeo:"357381676", ratio:"square"},
  {name:"T-bank App", img:"assets/work/v-1216140122.jpg", vimeo:"1216140122", ratio:"square"},
  {name:"Tele2", img:"assets/work/v-1246894477.jpg", vimeo:"1246894477", ratio:"square"}
];


const SELECTED_WORK = [
  {name:"Haval H3 / A Brighter Life", img:"assets/work/v-969668366.jpg", vimeo:"969668366", ratio:"wide"},
  {name:"Ararat / Under One Sky", img:"assets/work/v-665946854.jpg", vimeo:"665946854", previewEmbed:"https://player.vimeo.com/video/665946854?autoplay=1&loop=1&muted=1&background=1&dnt=1", crop:"letterbox", ratio:"square"},
  {name:"Danone / If", img:"assets/work/v-373855292.jpg", vimeo:"373855292", ratio:"wide"},
  {name:"Kia K5", img:"assets/work/v-1053336088.jpg", vimeo:"1053336088", ratio:"square"},
  {name:"Greenfield / One Day", img:"assets/work/v-402912100.jpg", vimeo:"402912100", ratio:"wide"},
  {name:"Velikoslavich / Chess", img:"assets/work/v-brest-chess.jpg", local:"assets/work/preview/p-brest-chess.m4v", preview:"assets/work/preview/p-brest-chess-hq.mp4", crop:"letterbox", ratio:"square"},
  {name:"Velikoslavich / Choir", img:"assets/work/v-brest-chor.jpg", local:"assets/work/preview/p-brest-chor.m4v", preview:"assets/work/preview/p-brest-chor-hq.mp4", crop:"letterbox", ratio:"wide"},
  {name:"LSR / Higher", img:"assets/work/v-brest-lsr.jpg", local:"assets/work/preview/p-brest-lsr.m4v", preview:"assets/work/preview/p-brest-lsr-hq.mp4", ratio:"square"}
];

const CLIENTS = [
  {n:"Google",f:"google"},{n:"Coca-Cola",f:"cocacola"},{n:"Toyota",f:"toyota"},{n:"IKEA",f:"ikea"},
  {n:"Visa",f:"visa"},{n:"McDonald's",f:"mcdonalds"},{n:"Red Bull",f:"redbull"},{n:"Volkswagen",f:"volkswagen"},
  {n:"Danone",f:"danone"},{n:"Yandex",f:"yandex"},{n:"Burger King",f:"burgerking"},{n:"KIA",f:"kia"},
  {n:"Lay's",f:"lays"},{n:"HBO",f:"hbo"},{n:"Kaspersky",f:"kaspersky"},{n:"BBDO",f:"bbdo"},
  {n:"TBWA",f:"tbwa"},{n:"McCann",f:"mccann"},{n:"Leo Burnett",f:"leoburnett"},
  {n:"Saatchi & Saatchi",f:"saatchi"},{n:"Grey",f:"grey"},{n:"Dentsu",f:"dentsu"},{n:"Havas",f:"havas"}
];

// The homepage's early bootstrap owns font loading and its single entrance.
// Keep the legacy fallback only for pages without that bootstrap.
if (!document.documentElement.classList.contains('reef-intro-managed')) {
  const hero = document.getElementById('hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('in'));
}

// ===== RENDER WORK =====
const grid = document.getElementById('workGrid');
const FEATURED_WORK = WORK.slice(0, 24);
const desktopWork = window.matchMedia('(min-width:901px)');
const workBatchSize = () => desktopWork.matches ? 12 : 6;
const featuredLimit = () => Math.min(FEATURED_WORK.length, desktopWork.matches ? 24 : 12);
const workMore = document.getElementById('workMore');
const workArchive = document.getElementById('workArchive');
let shownWork = 0;

function workCard(w){
  const label = PAGE === 'neo' ? w.name : w.name.split('|')[0].trim();
  const ratio = w.ratio || 'wide';
  const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const preview = Object.prototype.hasOwnProperty.call(w, 'preview') ? w.preview : (w.vimeo ? `assets/work/preview/p-${w.vimeo}.mp4` : '');
  const video = w.previewEmbed
    ? `<iframe class="work__video work__video--embed" data-prev="${escape(w.previewEmbed)}" title="${escape(label)} preview" allow="autoplay; fullscreen; picture-in-picture" aria-hidden="true" tabindex="-1"></iframe>`
    : preview ? `<video class="work__video" data-prev="${asset(preview)}" autoplay muted loop playsinline webkit-playsinline preload="none" aria-hidden="true"></video>` : '';
  const localAttr = w.local ? ` data-local-video="${asset(w.local)}"` : '';
  const vimeoAttr = w.vimeo ? ` data-vimeo="${w.vimeo}"` : '';
  const cropAttr = w.crop ? ` data-media-crop="${w.crop}"` : '';
  return `
  <button type="button" class="work__item work__item--new work__item--${ratio}"${vimeoAttr}${localAttr}${cropAttr} data-name="${escape(label)}" aria-label="Play ${escape(label)}">
    <span class="work__reveal">
    <img src="${asset(w.img)}" alt="${escape(label)} — REEF Audio project still" loading="lazy">
    ${video}
    <div class="work__overlay"><span class="work__name-mask"><span class="work__name">${escape(label)}</span></span></div>
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
    // Finish the opening film reveal before introducing its section heading.
    if (document.body.dataset.page === 'home' && e.target === grid.firstElementChild) {
      document.querySelector('.work__head .reveal')?.classList.add('in');
    }
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
function updateWorkActions(){
  const hasMore = PAGE === 'home' && shownWork < featuredLimit();
  if(workMore){
    workMore.hidden = !hasMore;
    workMore.classList.toggle('work__more--hidden', !hasMore);
  }
  if(workArchive){
    workArchive.hidden = hasMore;
    workArchive.classList.toggle('work__more--hidden', hasMore);
  }
}
function appendWork(items){
  if(!grid || !items.length) return;
  grid.insertAdjacentHTML('beforeend', items.map(workCard).join(''));
  shownWork += items.length;
  revealNewItems();
  updateWorkActions();
}
if(grid){
  appendWork(PAGE === 'work' ? WORK : PAGE === 'neo' ? SELECTED_WORK : FEATURED_WORK.slice(0, workBatchSize()));
}
workMore?.addEventListener('click', () => {
  if(!grid || PAGE !== 'home' || shownWork >= featuredLimit()) return;
  const firstNewIndex = shownWork;
  appendWork(FEATURED_WORK.slice(shownWork, Math.min(shownWork + workBatchSize(), featuredLimit())));
  const firstNewCard = grid.children[firstNewIndex];
  if(!firstNewCard) return;
  firstNewCard.focus({preventScroll:true});
  const headerHeight = document.getElementById('nav')?.offsetHeight || 0;
  window.scrollTo({
    top: window.scrollY + firstNewCard.getBoundingClientRect().top - headerHeight - 16,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
});
desktopWork.addEventListener('change', () => {
  if(!grid || PAGE !== 'home') return;
  // Expand the desktop selection without discarding anything already opened.
  if(shownWork < workBatchSize()) appendWork(FEATURED_WORK.slice(shownWork, workBatchSize()));
  else updateWorkActions();
});

// Make every grid row exactly one column-width tall, so all tiles share one
// uniform height: a single-column tile is a square, a two-column 'wide' tile is
// one long horizontal frame of the same height. Recompute on resize.
(function(){
  if(!grid) return;
  function sizeCells(){
    // On the single-column phone layout the tiles use their own 16:9 aspect.
    if(window.matchMedia('(max-width:560px)').matches){ grid.style.removeProperty('--cell'); return; }
    const cs = getComputedStyle(grid);
    const cols = cs.gridTemplateColumns.split(' ').length;
    if (cols === 1) { grid.style.removeProperty('--cell'); return; }
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
  // These are requested portfolio videos. Reduced motion still disables the
  // interface's entrances/parallax, but must not turn every film into a still.
  const visible = new Set();
  const inFlight = new WeakSet();
  let lightboxOpen = false;
  const canPlay = item => visible.has(item) && !document.hidden && !lightboxOpen;

  function blocked(item){
    if(!canPlay(item)) return;
    item.classList.remove('is-previewing');
  }
  function playing(item){
    if(!canPlay(item)){ stop(item); return; }
    item.classList.add('is-previewing');
  }
  function warm(item){
    const v = item.querySelector('.work__video');
    if(!v || v.tagName === 'IFRAME') return;
    // Safari needs the DOM properties set before assigning a dynamic source.
    v.defaultMuted = true;
    v.muted = true;
    v.playsInline = true;
    v.autoplay = true;
    if(!v.src){
      const source = v.getAttribute('data-prev');
      if(source){ v.preload = 'auto'; v.src = source; }
    }
  }
  function loadAndPlay(item){
    const v = item.querySelector('.work__video');
    if(!v || !canPlay(item)) return;
    if(v.tagName === 'IFRAME') {
      if(!v.getAttribute('src')) {
        v.addEventListener('load', () => { if(canPlay(item)) playing(item); }, {once:true});
        v.src = v.getAttribute('data-prev');
      }
      return;
    }
    if(v.error || inFlight.has(v)) return;
    warm(item);
    inFlight.add(v);
    const failed = error => {
      inFlight.delete(v);
      if(error.name === 'NotAllowedError' || error.name === 'AbortError') blocked(item);
    };
    try{
      const request = v.play();
      if(request && typeof request.then === 'function'){
        request.then(() => {
          inFlight.delete(v);
          if(!v.paused) playing(item);
        }, failed);
      }else{ inFlight.delete(v); }
    }catch(error){ failed(error); }
  }
  function stop(item){
    const v = item.querySelector('.work__video');
    if(!v) return;
    item.classList.remove('is-previewing');
    if(v.tagName === 'IFRAME') { v.removeAttribute('src'); return; }
    try{ v.pause(); }catch(e){}
  }

  // Preloading ahead of the viewport is separate from playback. Safari can
  // reject playback outside the actual screen and never retry it on its own.
  const warmIO = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) warm(entry.target); });
  }, {rootMargin:'200px 0px 200px 0px'});
  const previewIO = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      const item = en.target;
      if(en.isIntersecting && en.intersectionRatio >= 0.12){
        visible.add(item);
        loadAndPlay(item);
      }else{
        visible.delete(item);
        stop(item);
      }
    });
  }, {threshold:[0, 0.12, 0.35, 0.6]});

  observePreviews = function(){
    grid.querySelectorAll('.work__item').forEach(el=>{
      if(el.dataset.prevObserved === '1') return;
      el.dataset.prevObserved = '1';
      const video = el.querySelector('.work__video');
      if(video && video.tagName !== 'IFRAME') {
        video.addEventListener('loadeddata', () => loadAndPlay(el));
        video.addEventListener('canplay', () => loadAndPlay(el));
        video.addEventListener('playing', () => playing(el));
        video.addEventListener('pause', () => el.classList.remove('is-previewing'));
        video.addEventListener('error', () => el.classList.remove('is-previewing'));
      }
      el.addEventListener('transitionend', event => {
        if(event.target === el && event.propertyName === 'opacity') loadAndPlay(el);
      });
      warmIO.observe(el);
      previewIO.observe(el);
    });
  };
  observePreviews();

  const retryVisible = () => visible.forEach(loadAndPlay);
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden) visible.forEach(stop);
    else retryVisible();
  });
  window.addEventListener('pageshow', retryVisible);
  document.addEventListener('reef:video-open', () => {
    lightboxOpen = true;
    visible.forEach(stop);
  });
  document.addEventListener('reef:video-close', () => {
    lightboxOpen = false;
    retryVisible();
  });
  // Keep play() synchronous with a trusted gesture when iOS blocks autoplay.
  ['touchend', 'pointerup', 'keyup'].forEach(type => {
    document.addEventListener(type, retryVisible, {passive:true});
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

  function open(vimeoId, name, localSrc){
    if(!vimeoId && !localSrc) return;
    document.dispatchEvent(new CustomEvent('reef:video-open'));
    if(typeof gtag === 'function'){ gtag('event', 'clip_open', {clip_title: name || '', clip_id: vimeoId || 'local', page: PAGE}); }
    lastFocus = document.activeElement;
    titleEl.textContent = name || '';
    if(localSrc){
      frameWrap.innerHTML = `<video class="reef-local-player" src="${localSrc}" controls autoplay playsinline preload="metadata" aria-label="${(name||'').replace(/"/g,'&quot;')}"></video>`;
    } else {
      const src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&byline=0&title=0&portrait=0&dnt=1`;
      frameWrap.innerHTML = `<iframe src="${src}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${(name||'').replace(/"/g,'&quot;')}"></iframe>`;
    }
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
    document.dispatchEvent(new CustomEvent('reef:video-close'));
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // One click/tap always opens the full film.
  grid.addEventListener('click', (e)=>{
    const item = e.target.closest('.work__item');
    if(!item) return;
    e.preventDefault();
    open(item.getAttribute('data-vimeo'), item.getAttribute('data-name'), item.getAttribute('data-local-video'));
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('reef:work-category-change', () => {
    if (!lb.classList.contains('open')) return;
    close();
    document.querySelector('.work-tab[aria-selected="true"]')?.focus({preventScroll:true});
  });
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
  const logoWidths = {google:128,cocacola:132,toyota:144,ikea:118,visa:102,mcdonalds:80,redbull:110,volkswagen:70,danone:94,yandex:120,burgerking:76,kia:120,lays:80,hbo:100,kaspersky:148,bbdo:118,tbwa:122,mccann:140,leoburnett:166,saatchi:158,grey:104,dentsu:128,havas:132};
  const item = (c, duplicate = false) => `<div class="marquee__item" style="--logo-width:${logoWidths[c.f] || 140}px"${duplicate ? ' aria-hidden="true"' : ''}><img src="${asset(`assets/clients/${c.f}.png`)}" alt="${c.n}" decoding="async" draggable="false"></div>`;
  clientTrack.innerHTML = CLIENTS.map(c => item(c)).join('') + CLIENTS.map(c => item(c, true)).join('');

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
const menuBackground = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.brand'), document.querySelector('.nav__brief'), document.querySelector('.nav__links'), document.querySelector('.skip-link')];
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
window.matchMedia('(min-width:901px)').addEventListener('change', event => { if(event.matches) setMenu(false, false); });
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
  if (document.body.dataset.page === 'home' && el.matches('.work__head .reveal')) {
    el.style.transitionDelay = '1.25s';
    return;
  }
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

// ===== CAPABILITIES: WORK-CARD STYLE SCROLL REVEAL =====
(() => {
  const grid = document.querySelector('.capabilities-grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.capability'));
  if (!cards.length) return;

  // Match the work-grid rhythm: cards in the same row cascade left -> right.
  // On the single-column mobile layout every card starts immediately.
  function rowIndex(el) {
    const top = el.offsetTop;
    let i = 0;
    cards.forEach(sib => {
      if (sib === el) return;
      if (Math.abs(sib.offsetTop - top) <= 4 && sib.offsetLeft < el.offsetLeft) i++;
    });
    return i;
  }

  const capabilityIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty('--capdelay', (rowIndex(entry.target) * 0.11) + 's');
      entry.target.classList.add('in');
      capabilityIO.unobserve(entry.target);
    });
  // The initial clip exposes only 12% of a card; observe before that limit.
  }, { threshold: .01, rootMargin: '0px 0px -50px 0px' });

  cards.forEach(card => capabilityIO.observe(card));
})();

// ===== SECTION ENTRANCE (hero/contact word choreography) =====
const secIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:.3});
const contactSec = document.getElementById('contact');
if(contactSec) secIO.observe(contactSec);

// ===== CAPABILITIES ACCORDION =====
(function(){
  const heads = Array.from(document.querySelectorAll('.service__head'));
  const setExpanded = (head, expanded) => {
    head.setAttribute('aria-expanded', String(expanded));
    const panel = document.getElementById(head.getAttribute('aria-controls'));
    if (!panel) return;
    panel.setAttribute('aria-hidden', String(!expanded));
    panel.inert = !expanded;
  };
  heads.forEach(head => {
    head.addEventListener('click', () => {
      const expanded = head.getAttribute('aria-expanded') !== 'true';
      heads.forEach(other => setExpanded(other, other === head && expanded));
    });
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


// Reveal Contact behind the main page. Natural flow is the fallback for
// short viewports, enlarged text, reduced motion, or unavailable observers.
(() => {
  if (PAGE !== 'home') return;
  const footer = document.getElementById('contact');
  const main = document.querySelector('main');
  const header = document.getElementById('nav');
  if (!footer || !main || !header || !window.ResizeObserver) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    const viewportHeight = Math.min(document.documentElement.clientHeight,
      window.visualViewport?.height || window.innerHeight);
    const height = Math.ceil(footer.getBoundingClientRect().height);
    const available = viewportHeight - header.offsetHeight - 16;
    const enabled = !reduce.matches && height > 0 && height <= available;
    document.body.style.setProperty('--contact-height', height + 'px');
    document.body.classList.toggle('contact-reveal', enabled);
    document.body.classList.toggle('contact-flow', !enabled);
  };
  const observer = new ResizeObserver(update);
  observer.observe(footer);
  observer.observe(header);
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('orientationchange', update, { passive: true });
  window.visualViewport?.addEventListener('resize', update, { passive: true });
  reduce.addEventListener('change', update);
  const revealContact = (behavior = 'smooth') => {
    if (!document.body.classList.contains('contact-reveal')) return;
    window.scrollTo({ top: document.documentElement.scrollHeight,
      behavior: reduce.matches ? 'instant' : behavior });
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin ||
        target.pathname !== window.location.pathname || target.hash !== '#contact' ||
        !document.body.classList.contains('contact-reveal')) return;
    event.preventDefault();
    if (window.location.hash !== '#contact') history.pushState(null, '', '#contact');
    revealContact();
  });
  const followContactHash = () => {
    if (window.location.hash === '#contact') revealContact('instant');
  };
  window.addEventListener('hashchange', followContactHash);
  window.addEventListener('load', () => { update(); followContactHash(); });
  document.fonts?.ready.then(() => { update(); followContactHash(); });
  // Keyboard navigation must bring covered links into view.
  footer.addEventListener('focusin', () => {
    if (document.body.classList.contains('contact-reveal') &&
        main.getBoundingClientRect().bottom > footer.getBoundingClientRect().top) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
    }
  });
  update();
  requestAnimationFrame(followContactHash);
})();
