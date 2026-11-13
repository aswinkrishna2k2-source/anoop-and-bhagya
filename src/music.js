// Background music: "Let the celebration begin".
// One shared <audio> element; it is started from the seal tap (a user gesture,
// which mobile browsers require before any sound can play).
import { useSyncExternalStore } from 'react';

const SRC = '/audio/celebration.m4a';
const audio = typeof Audio !== 'undefined' ? new Audio(SRC) : null;
if (audio) audio.preload = 'auto';

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
if (audio) ['play', 'pause', 'ended'].forEach((ev) => audio.addEventListener(ev, emit));

let fadeTimer = null;
function fadeTo(target, ms) {
  if (!audio) return;
  clearInterval(fadeTimer);
  const steps = Math.max(1, Math.round(ms / 50));
  const start = audio.volume, delta = (target - start) / steps;
  let i = 0;
  fadeTimer = setInterval(() => {
    i += 1;
    // iOS ignores volume changes (hardware volume only) — harmless there.
    audio.volume = Math.min(1, Math.max(0, start + delta * i));
    if (i >= steps) clearInterval(fadeTimer);
  }, 50);
}

/** Call synchronously inside the tap handler. */
export function startMusic() {
  if (!audio) return;
  audio.currentTime = 0;
  audio.volume = 0;
  audio.play().catch(() => {});
  fadeTo(1, 1800);
}

export function toggleMusic() {
  if (!audio) return;
  if (audio.paused) {
    if (audio.ended) audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

// Pause while the page is hidden (app switch, locked screen); resume on return.
let resumeOnShow = false;
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!audio) return;
    if (document.hidden) {
      resumeOnShow = !audio.paused;
      audio.pause();
    } else if (resumeOnShow) {
      resumeOnShow = false;
      audio.play().catch(() => {});
    }
  });
}

const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
export function useMusicPlaying() {
  return useSyncExternalStore(subscribe, () => (audio ? !audio.paused : false), () => false);
}
