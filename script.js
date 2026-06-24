// ===== DATA =====
const WORK = [
  {name:"Sber Investments", img:"assets/work/sber.png"},
  {name:"Yango Maps", img:"assets/work/yango.jpg"},
  {name:"Haval H9", img:"assets/work/haval.png"},
  {name:"Adrenaline Gold", img:"assets/work/adrenaline.png"},
  {name:"Danone | IF", img:"assets/work/danone.png"},
  {name:"California Dream", img:"assets/work/california.jpg"},
  {name:"Yandex Split", img:"assets/work/yandex-split.png"},
  {name:"Asian Games", img:"assets/work/asian-games.png"},
  {name:"VTB", img:"assets/work/vtb.png"},
  {name:"Aeroflot", img:"assets/work/aeroflot.png"},
  {name:"St. Regis", img:"assets/work/st-regis.png"},
  {name:"IKEA", img:"assets/work/ikea.png"},
  {name:"T-Bank Premium", img:"assets/work/tbank.png"},
  {name:"Ostrovok", img:"assets/work/ostrovok.png"},
  {name:"KIA K5", img:"assets/work/kia-k5.png"},
  {name:"Wildberries", img:"assets/work/wildberries.png"},
  {name:"KIA | The Flow", img:"assets/work/kia-flow.png"},
  {name:"Whole Foods", img:"assets/work/whole-foods.png"}
];

const CLIENTS = ["McDonald's","Sony","Volkswagen","KIA","Coca-Cola","Visa","Burger King","Heinz","Toyota","AliExpress","Google","Lay's","Hyundai","BBC","Samsung","Fanta","Chevrolet","GSK","Lipton","Nokia","Kinder","Red Bull","IKEA","Danone","Xiaomi","Kaspersky","KFC","Bayer","Nivea","Jacobs","HBO","Yango"];

// ===== HERO ENTRANCE =====
function startHero(){
  const hero = document.getElementById('hero');
  if(hero) requestAnimationFrame(()=> hero.classList.add('in'));
}
startHero();

// ===== RENDER WORK =====
const grid = document.getElementById('workGrid');
const workMore = document.getElementById('workMore');
const BATCH = 6;
let shown = 0;

function workCard(w){
  return `
  <a class="work__item work__item--new" href="#" aria-label="${w.name}">
    <img src="${w.img}" alt="${w.name} — REEF Audio project still" loading="lazy">
    <div class="work__overlay"><span class="work__name">${w.name}</span></div>
  </a>`;
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
