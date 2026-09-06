(function(){
  const grids = document.querySelectorAll('.subsite--grid .reel');

  function sizeGrid(grid){
    if(window.matchMedia('(max-width:560px)').matches){
      grid.style.removeProperty('--cell');
      return;
    }
    const columns = window.matchMedia('(min-width:901px)').matches ? 3 : 2;
    const styles = getComputedStyle(grid);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const inner = grid.clientWidth - (parseFloat(styles.paddingLeft) || 0) - (parseFloat(styles.paddingRight) || 0);
    const cell = (inner - gap * (columns - 1)) / columns;
    if(cell > 0) grid.style.setProperty('--cell', cell + 'px');
  }

  const resize = () => grids.forEach(sizeGrid);
  resize();
  window.addEventListener('resize', resize, {passive:true});
  window.addEventListener('load', resize, {once:true});

  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('menu');
  const setScrolled = () => nav && nav.classList.toggle('nav--scrolled', window.scrollY > 24);
  setScrolled();
  window.addEventListener('scroll', setScrolled, {passive:true});

  function setMenu(open){
    if(!toggle || !menu) return;
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    [document.querySelector('main'),document.querySelector('footer'),document.querySelector('.nav__links'),document.querySelector('.nav__brief')].filter(Boolean).forEach(el => { el.inert = open; });
    if(open) menu.querySelector('a')?.focus({preventScroll:true});
  }
  if(toggle && menu){
    window.matchMedia('(min-width:901px)').addEventListener('change', event => { if(event.matches) setMenu(false); });
    toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if(event.key === 'Escape' && document.body.classList.contains('menu-open')){
        setMenu(false);
        toggle.focus();
      }
    });
  }

  const reveals = document.querySelectorAll('.reveal:not(.in)');
  if(reveals.length){
    const revealIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          revealIO.unobserve(entry.target);
        }
      });
    }, {threshold:.14, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(el => revealIO.observe(el));
  }

  const footer = document.querySelector('.footer');
  if(footer){
    const footerIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          footer.classList.add('in');
          footerIO.disconnect();
        }
      });
    }, {threshold:.22});
    footerIO.observe(footer);
  }

  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();
})();
