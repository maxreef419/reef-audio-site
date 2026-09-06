(() => {
  'use strict';
  const section = document.querySelector('.capabilities');
  if (!section) return;
  const track = section.querySelector('.capabilities__track');
  const slides = Array.from(section.querySelectorAll('.capability'));
  const controls = section.querySelector('.capabilities__controls');
  const counter = controls.querySelector('.capabilities__counter');
  const previous = controls.querySelector('.capability-arrow--prev');
  const nextButton = controls.querySelector('.capability-arrow--next');
  const status = section.querySelector('.capabilities__status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let frame = null;
  let announcement = null;
  let interacted = false;
  let cueObserver = null;

  function stopCue() {
    interacted = true;
    controls.classList.remove('is-cueing');
    cueObserver?.disconnect();
  }

  function reflect(index, announce = true) {
    const changed = index !== active;
    active = index;
    previous.setAttribute('aria-disabled', String(index === 0));
    nextButton.setAttribute('aria-disabled', String(index === slides.length - 1));
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== index)));
    if (changed && announce) {
      clearTimeout(announcement);
      announcement = setTimeout(() => {
        status.textContent = `${slides[active].querySelector('h3').textContent}, ${active + 1} of ${slides.length}`;
      }, 160);
    }
  }

  function goTo(index) {
    stopCue();
    const next = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({ left: slides[next].offsetLeft, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }

  function onKey(event) {
    const keys = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in keys) || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const next = Math.max(0, Math.min(slides.length - 1, keys[event.key]));
    goTo(next);
  }

  previous.addEventListener('click', () => goTo(active - 1));
  nextButton.addEventListener('click', () => goTo(active + 1));
  track.addEventListener('pointerdown', stopCue, { passive: true });
  track.addEventListener('wheel', stopCue, { passive: true });
  controls.addEventListener('pointerdown', stopCue, { passive: true });
  controls.addEventListener('keydown', onKey);
  track.addEventListener('keydown', onKey);
  track.addEventListener('scroll', () => {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      const closest = slides.reduce((best, slide, index) =>
        Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft) ? index : best, 0);
      reflect(closest);
    });
  }, { passive: true });

  new ResizeObserver(() => {
    track.scrollTo({ left: slides[active].offsetLeft, behavior: 'instant' });
  }).observe(track);
  reflect(0, false);
  controls.hidden = false;
  if (!reducedMotion.matches) {
    cueObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      if (!interacted) controls.classList.add('is-cueing');
      cueObserver.disconnect();
    }, { threshold: .5 });
    cueObserver.observe(controls);
  }
})();
