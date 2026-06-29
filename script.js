// ===== DATA =====
const WORK = [
  {name:"California Realtors | Dear California Dream", img:"assets/work/v-849692144.jpg", vimeo:"849692144"},
  {name:"Yango Maps | A Perfect Way", img:"assets/work/v-882659457.jpg", vimeo:"882659457"},
  {name:"Asian Games | Colors", img:"assets/work/v-264404893.jpg", vimeo:"264404893"},
  {name:"Kia K5", img:"assets/work/v-1053336088.jpg", vimeo:"1053336088"},
  {name:"InDrive | People Driven", img:"assets/work/v-848738556.jpg", vimeo:"848738556"},
  {name:"Haval H3 | A Brighter Life", img:"assets/work/v-969668366.jpg", vimeo:"969668366"},
  {name:"Sber Investment", img:"assets/work/v-1158151394.jpg", vimeo:"1158151394"},
  {name:"Adrenaline Gold | Baroque Bang", img:"assets/work/v-468648611.jpg", vimeo:"468648611"},
  {name:"Whole Foods | Food For Our Future", img:"assets/work/v-554243009.jpg", vimeo:"554243009"},
  {name:"Ostrovok!", img:"assets/work/v-1079291027.jpg", vimeo:"1079291027"},
  {name:"Toyota | The Boxer", img:"assets/work/v-215650034.jpg", vimeo:"215650034"},
  {name:"HBO | Westworld — Car Chase Scene [S03E05]", img:"assets/work/v-425890146.jpg", vimeo:"425890146"},
  {name:"TBank Premium", img:"assets/work/v-1055504210.jpg", vimeo:"1055504210"},
  {name:"Yandex Split", img:"assets/work/v-910327781.jpg", vimeo:"910327781"},
  {name:"McDonald's | Alpine Taste", img:"assets/work/v-652793889.jpg", vimeo:"652793889"},
  {name:"Haval | Intellectual Freedom", img:"assets/work/v-453637501.jpg", vimeo:"453637501"},
  {name:"St Regis | Wonder", img:"assets/work/v-394209969.jpg", vimeo:"394209969"},
  {name:"Danone | Simply Good", img:"assets/work/v-380886455.jpg", vimeo:"380886455"},
  {name:"KIA | The Flow", img:"assets/work/v-690914061.jpg", vimeo:"690914061"},
  {name:"Academy Sports | Further", img:"assets/work/v-568883704.jpg", vimeo:"568883704"},
  {name:"IKEA | Play And Study", img:"assets/work/v-367822805.jpg", vimeo:"367822805"},
  {name:"Danone | If", img:"assets/work/v-373855292.jpg", vimeo:"373855292"}
];

const CLIENTS = ["McDonald's","Sony","Volkswagen","KIA","Coca-Cola","Visa","Burger King","Heinz","Toyota","AliExpress","Google","Lay's","Hyundai","BBC","Samsung","Fanta","Chevrolet","GSK","Lipton","Nokia","Kinder","Red Bull","IKEA","Danone","Xiaomi","Kaspersky","KFC","Bayer","Nivea","Jacobs","HBO","Yango"];

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
  setTimeout(go, 1200); // safety fallback if fonts stall
}else{
  startHero();
}

// ===== RENDER WORK =====
const grid = document.getElementById('workGrid');
const workMore = document.getElementById('workMore');
const BATCH = 6;
let shown = 0;

function workCard(w){
  const label = w.name.split('|')[0].trim();
  return `
  <button type="button" class="work__item work__item--new" data-vimeo="${w.vimeo}" data-name="${label.replace(/"/g,'&quot;')}" aria-label="Play ${label.replace(/"/g,'&quot;')}">
    <img src="${w.img}" alt="${label} — REEF Audio project still" loading="lazy">
    <span class="work__play" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    </span>
    <div class="work__overlay"><span class="work__name">${label}</span></div>
  </button>`;
}
// reveal work items as they scroll into view (not static)
const workIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); workIO.unobserve(e.target); }});
},{threshold:.16, rootMargin:'0px 0px -60px 0px'});
function revealNewItems(){
  const fresh = grid.querySelectorAll('.work__item--new');
  fresh.forEach((el)=>{
    el.classList.remove('work__item--new');
    workIO.observe(el);
  });
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
    lastFocus = document.activeElement;
    titleEl.textContent = name || '';
    const src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&byline=0&title=0&portrait=0&dnt=1`;
    frameWrap.innerHTML = `<iframe src="${src}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${(name||'').replace(/"/g,'&quot;')}"></iframe>`;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.classList.add('lb-open');
    closeBtn.focus();
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.classList.remove('lb-open');
    frameWrap.innerHTML = '';
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

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

// ===== CLIENTS GRID =====
const clientList = document.getElementById('clientList');
if(clientList){ clientList.innerHTML = CLIENTS.map(c=>`<li>${c}</li>`).join(''); }

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
  function update(){
    widget.classList.toggle('show', window.scrollY > window.innerHeight*0.6);
  }
  widget.addEventListener('click', e=>{
    e.preventDefault();
    window.scrollTo({top:0, behavior:'smooth'});
  });
  update(); window.addEventListener('scroll', update, {passive:true});
})();

// ===== CAPABILITIES ACCORDION =====
(function(){
  const heads = document.querySelectorAll('.service__head');
  heads.forEach(h=>{
    h.addEventListener('click', ()=>{
      const open = h.getAttribute('aria-expanded') === 'true';
      heads.forEach(o=>{ if(o!==h) o.setAttribute('aria-expanded','false'); });
      h.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });
})();

// ===== HERO VIDEO BACKGROUND =====
(function(){
  const v = document.getElementById('heroVideo');
  if(!v) return;
  // respect reduced-motion: keep static poster
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  v.muted = true; v.setAttribute('muted','');
  function reveal(){ v.classList.add('is-playing'); }
  // reveal as soon as the first frame is actually rendering
  v.addEventListener('playing', reveal, {once:true});
  v.addEventListener('timeupdate', function once(){ if(v.currentTime>0){ reveal(); v.removeEventListener('timeupdate', once); } });
  function tryPlay(){
    const p = v.play();
    if(p && p.catch){ p.catch(()=>{ /* autoplay blocked; poster stays */ }); }
    if(!v.paused && v.currentTime>0) reveal();
  }
  if(v.readyState >= 2){ tryPlay(); }
  else { v.addEventListener('loadeddata', tryPlay, {once:true}); v.addEventListener('canplay', tryPlay, {once:true}); }
  // resume if tab/scroll pauses it
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden && v.paused) tryPlay(); });
})();

// ===== HERO PARALLAX (subtle depth — background trails ~8% of scroll) =====
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const heroLayer = document.getElementById('heroParallax');
  if(!heroLayer) return;
  const FACTOR = 0.08; // barely perceptible — adds depth without drawing attention
  let ticking = false;
  function update(){
    ticking = false;
    const y = window.scrollY || window.pageYOffset;
    if(y < window.innerHeight){
      heroLayer.style.transform = 'translate3d(0,' + (y * FACTOR).toFixed(1) + 'px,0)';
    }
  }
  window.addEventListener('scroll', function(){
    if(!ticking){ window.requestAnimationFrame(update); ticking = true; }
  }, {passive:true});
  update();
})();
