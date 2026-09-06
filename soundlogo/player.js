(() => {
  'use strict';
  const rows = Array.from(document.querySelectorAll('[data-sonic-src]'));
  if (!rows.length) return;
  let current = null;
  const format = seconds => {
    const value = Math.max(0, Math.floor(seconds || 0));
    return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
  };
  const formatDuration = seconds => format(seconds > 0 ? Math.max(1, seconds) : 0);
  const controllers = rows.map(row => {
    const button = row.querySelector('.sonic-play');
    const seek = row.querySelector('.sonic-seek');
    const time = row.querySelector('.sonic-time');
    const error = row.querySelector('.sonic-error');
    const name = row.dataset.sonicName;
    let duration = Number(row.dataset.duration) || 0;
    let audio = null;
    let frame = null;
    let pendingPosition = null;
    let request = 0;
    let wantsPlay = false;

    function render() {
      const position = audio ? audio.currentTime : 0;
      seek.value = position;
      seek.style.setProperty('--progress', `${duration ? Math.min(100, position / duration * 100) : 0}%`);
      seek.setAttribute('aria-valuetext', `${format(position)} of ${formatDuration(duration)}`);
      time.textContent = formatDuration(audio && !audio.paused ? Math.max(0, duration - position) : duration);
    }
    function cancelFrame() { if (frame !== null) cancelAnimationFrame(frame); frame = null; }
    function animate() { render(); if (audio && !audio.paused) frame = requestAnimationFrame(animate); }
    function setPlaying(playing) {
      row.classList.toggle('is-playing', playing);
      button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${name}`);
      button.setAttribute('aria-pressed', String(playing));
      cancelFrame();
      if (playing) animate(); else render();
    }
    function fail() {
      wantsPlay = false;
      row.classList.remove('is-loading');
      button.removeAttribute('aria-busy');
      setPlaying(false);
      error.hidden = false;
      error.textContent = 'Unable to play. Please try again.';
    }
    function load() {
      if (audio) return audio;
      audio = new Audio();
      audio.preload = 'metadata';
      audio.src = row.dataset.sonicSrc;
      audio.addEventListener('loadedmetadata', () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
          duration = audio.duration;
          seek.max = duration;
          if (pendingPosition !== null) { audio.currentTime = Math.min(pendingPosition, duration); pendingPosition = null; }
          render();
        }
      });
      audio.addEventListener('playing', () => {
        if (!wantsPlay || current !== controller) { audio.pause(); return; }
        row.classList.remove('is-loading');
        button.removeAttribute('aria-busy');
        error.hidden = true;
        setPlaying(true);
      });
      audio.addEventListener('pause', () => setPlaying(false));
      audio.addEventListener('ended', () => {
        wantsPlay = false;
        audio.currentTime = 0;
        setPlaying(false);
        if (current === controller) current = null;
      });
      audio.addEventListener('seeked', render);
      audio.addEventListener('error', fail);
      return audio;
    }
    const controller = {
      pause() {
        request++;
        wantsPlay = false;
        if (audio) audio.pause();
        row.classList.remove('is-loading');
        button.removeAttribute('aria-busy');
        setPlaying(false);
      }
    };
    button.addEventListener('click', async () => {
      if (wantsPlay || (audio && !audio.paused)) { controller.pause(); return; }
      if (current && current !== controller) current.pause();
      current = controller;
      wantsPlay = true;
      const ownRequest = ++request;
      error.hidden = true;
      row.classList.add('is-loading');
      button.setAttribute('aria-busy', 'true');
      const media = load();
      if (media.error) media.load();
      if (media.ended || (duration && media.currentTime >= duration)) media.currentTime = 0;
      try {
        await media.play();
        if (ownRequest !== request && !wantsPlay) media.pause();
      } catch (playError) {
        if (ownRequest === request && playError.name !== 'AbortError') fail();
      }
    });
    seek.addEventListener('input', () => {
      const position = Math.min(duration, Math.max(0, Number(seek.value)));
      const media = load();
      if (media.readyState >= 1) media.currentTime = position;
      else pendingPosition = position;
      seek.style.setProperty('--progress', `${duration ? position / duration * 100 : 0}%`);
      seek.setAttribute('aria-valuetext', `${format(position)} of ${formatDuration(duration)}`);
    });
    seek.max = duration;
    render();
    return controller;
  });
  function pauseAll() { controllers.forEach(controller => controller.pause()); current = null; }
  document.addEventListener('reef:video-open', pauseAll);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseAll(); });
  window.addEventListener('pagehide', pauseAll);
})();
