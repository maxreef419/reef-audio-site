(() => {
  'use strict';
  const tabs = Array.from(document.querySelectorAll('.work-tab'));
  if (!tabs.length) return;
  let selected = null;

  function fromHash() {
    return tabs.find(tab => `#${tab.dataset.category}` === location.hash) || (location.hash && selected ? selected : tabs[0]);
  }
  function select(tab, updateHistory = false, focus = false) {
    if (focus) tab.focus({preventScroll: true});
    if (tab === selected) return;
    selected = tab;
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (updateHistory) history.pushState(null, '', `#${tab.dataset.category}`);
    document.dispatchEvent(new CustomEvent('reef:work-category-change', {detail: tab.dataset.category}));
    if (tab.dataset.category === 'sonic-branding') {
      document.querySelectorAll('#workGrid video').forEach(video => video.pause());
    }
    window.dispatchEvent(new Event('resize'));
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab, true));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next], true, true);
    });
  });
  window.addEventListener('popstate', () => select(fromHash()));
  window.addEventListener('hashchange', () => select(fromHash()));
  select(fromHash());
})();
