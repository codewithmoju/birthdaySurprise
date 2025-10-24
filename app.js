import { createClient } from '@supabase/supabase-js';
import { createBalloons, createCakeAnimation, createWishesMessage, createFloatingElements, createSparkles, createHeartBurst, createFireworks, createRibbon } from './celebration.js';

const TARGET_TIMESTAMP = '2025-10-24T23:25:00+05:00';
const TARGET_DATE = new Date(TARGET_TIMESTAMP);

console.log('=== Countdown Debug Info ===');
console.log('Target Timestamp:', TARGET_TIMESTAMP);
console.log('Target Date:', TARGET_DATE);
console.log('Target Date (ISO):', TARGET_DATE.toISOString());
console.log('Current Date:', new Date());
console.log('Current Date (ISO):', new Date().toISOString());
console.log('Difference (ms):', TARGET_DATE - new Date());
console.log('Is Target Valid?:', !isNaN(TARGET_DATE.getTime()));
console.log('========================');

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables not found!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'exists' : 'missing');
}

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const elements = {
  countdownContainer: document.getElementById('countdown-container'),
  celebrationContainer: document.getElementById('celebration-container'),
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  manualCelebrationBtn: document.getElementById('manual-celebration-btn'),
  muteBtn: document.getElementById('mute-btn'),
  shareBtn: document.getElementById('share-btn'),
  playSongBtn: document.getElementById('play-song-btn'),
  stopSongBtn: document.getElementById('stop-song-btn'),
  birthdayAudio: document.getElementById('birthday-audio'),
  balloonsContainer: document.getElementById('balloons-container'),
  cakeContainer: document.getElementById('cake-container'),
  confettiCanvas: document.getElementById('confetti-canvas'),
  lottieContainer: document.getElementById('lottie-container'),
  herNameCelebration: document.getElementById('her-name-celebration')
};

let countdownInterval = null;
let isMuted = false;
let audioPlayable = false;
let confettiLib = null;
let lottieLib = null;
let lottieAnimation = null;
let celebrationShown = false;
let libsLoaded = false;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 420 || (navigator.deviceMemory && navigator.deviceMemory < 2);

function sanitizeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function padZero(num) {
  return String(num).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  console.log('Update Countdown - Diff:', diff, 'ms');

  if (diff <= 0) {
    console.log('Countdown finished! Showing button.');
    stopCountdown();
    elements.days.textContent = '00';
    elements.hours.textContent = '00';
    elements.minutes.textContent = '00';
    elements.seconds.textContent = '00';
    elements.manualCelebrationBtn.classList.remove('hidden');
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  console.log('Countdown:', { days, hours, minutes, seconds });

  elements.days.textContent = padZero(days);
  elements.hours.textContent = padZero(hours);
  elements.minutes.textContent = padZero(minutes);
  elements.seconds.textContent = padZero(seconds);
}

function startCountdown() {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  const now = new Date();
  const diff = TARGET_DATE - now;
  const thirtySeconds = 30 * 1000;

  if (diff > 0 && diff <= thirtySeconds && !libsLoaded) {
    loadExternalLibraries();
  }
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

async function loadExternalLibraries() {
  if (libsLoaded) return;
  libsLoaded = true;

  try {
    await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.10.1/lottie.min.js'),
      loadBalloonAnimationData().then(data => { lottieBalloonsData = data; })
    ]);

    confettiLib = window.confetti;
    lottieLib = window.lottie;

    console.log('External libraries loaded successfully');
  } catch (error) {
    console.error('Error loading external libraries:', error);
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function showCelebration() {
  if (celebrationShown) return;
  celebrationShown = true;

  elements.countdownContainer.classList.add('hidden');
  elements.celebrationContainer.classList.remove('hidden');

  saveCelebrationState();

  if (!libsLoaded) {
    await loadExternalLibraries();
  }

  if (!prefersReducedMotion) {
    launchConfetti();
    await loadLottieBalloonAnimation();
    createLottieBalloons();
  }

  createCakeAnimation();
  createWishesMessage();

  if (!prefersReducedMotion) {
    createFloatingElements();
    createSparkles();
    createHeartBurst();
    createFireworks();
    createRibbon();
  }

  elements.celebrationContainer.addEventListener('click', (e) => {
    if (!prefersReducedMotion && confettiLib && !e.target.closest('button, a')) {
      launchConfettiSingle();
    }
  });
}

function launchConfetti() {
  if (!confettiLib) return;

  const particleCount = isMobile ? 100 : 200;
  const duration = 3000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 999,
    shapes: ['circle', 'square'],
    scalar: 1.2
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCountNow = particleCount * (timeLeft / duration);

    confettiLib({
      ...defaults,
      particleCount: Math.floor(particleCountNow),
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confettiLib({
      ...defaults,
      particleCount: Math.floor(particleCountNow),
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
}

function launchConfettiSingle() {
  if (!confettiLib || isMobile) return;

  confettiLib({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.6 },
    zIndex: 999,
    scalar: 1
  });
}

async function loadBalloonAnimationData() {
  try {
    const response = await fetch('/assets/redBallon.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading balloon animation:', error);
    return null;
  }
}

function loadLottieAnimation() {
  if (!lottieLib || lottieAnimation) return;

  const animationData = {
    v: '5.7.4',
    fr: 60,
    ip: 0,
    op: 180,
    w: 800,
    h: 600,
    nm: 'Hearts',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Heart',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [400, 600, 0], e: [400, -100, 0] },
              { t: 180, s: [400, -100, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [100, 100, 100] },
              { t: 90, s: [120, 120, 100] },
              { t: 180, s: [100, 100, 100] }
            ]
          }
        },
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sh',
                d: 1,
                ks: {
                  a: 0,
                  k: {
                    c: true,
                    v: [
                      [0, -20],
                      [20, -40],
                      [40, -20],
                      [0, 20],
                      [-40, -20],
                      [-20, -40]
                    ]
                  }
                }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 0.4, 0.6, 1] },
                o: { a: 0, k: 70 }
              }
            ]
          }
        ]
      }
    ]
  };

  try {
    lottieAnimation = lottieLib.loadAnimation({
      container: elements.lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    });
  } catch (error) {
    console.error('Error loading Lottie animation:', error);
  }
}

let lottieBalloonsData = null;
let lottieBalloonAnimations = [];

async function loadLottieBalloonAnimation() {
  if (!lottieLib) return;

  if (!lottieBalloonsData) {
    lottieBalloonsData = await loadBalloonAnimationData();
  }

  if (!lottieBalloonsData) return;

  const container = document.getElementById('lottie-balloons-container');
  if (!container) return;

  try {
    const animation = lottieLib.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieBalloonsData
    });
    lottieBalloonAnimations.push(animation);
  } catch (error) {
    console.error('Error loading balloon animation:', error);
  }
}

function createLottieBalloons() {
  const container = document.getElementById('lottie-balloons-floating');
  if (!container || !lottieLib || !lottieBalloonsData) return;

  const balloonCount = window.innerWidth < 768 ? 5 : 8;
  container.innerHTML = '';

  for (let i = 0; i < balloonCount; i++) {
    const balloonWrapper = document.createElement('div');
    balloonWrapper.className = 'lottie-balloon-float';
    balloonWrapper.style.left = `${Math.random() * 90}%`;
    balloonWrapper.style.animationDelay = `${Math.random() * 5}s`;
    balloonWrapper.style.animationDuration = `${8 + Math.random() * 4}s`;

    const balloonContainer = document.createElement('div');
    balloonContainer.className = 'lottie-balloon-item';
    balloonWrapper.appendChild(balloonContainer);
    container.appendChild(balloonWrapper);

    try {
      const animation = lottieLib.loadAnimation({
        container: balloonContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: lottieBalloonsData
      });
      lottieBalloonAnimations.push(animation);
    } catch (error) {
      console.error('Error creating balloon:', error);
    }
  }
}

async function saveCelebrationState() {
  if (!supabase) {
    console.log('Supabase not initialized, skipping state save');
    return;
  }
  try {
    const { error } = await supabase
      .from('celebration_state')
      .upsert([{ id: 1, celebration_triggered: true, triggered_at: new Date().toISOString() }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error saving celebration state:', error);
  }
}

async function checkCelebrationState() {
  if (!supabase) {
    console.log('Supabase not initialized, skipping state check');
    return false;
  }
  try {
    const { data, error } = await supabase
      .from('celebration_state')
      .select('celebration_triggered')
      .eq('id', 1)
      .maybeSingle();

    if (error) throw error;

    return data?.celebration_triggered || false;
  } catch (error) {
    console.error('Error checking celebration state:', error);
    return false;
  }
}

function toggleMute() {
  isMuted = !isMuted;

  if (elements.birthdayAudio) {
    elements.birthdayAudio.muted = isMuted;
  }

  elements.muteBtn.classList.toggle('muted', isMuted);
  elements.muteBtn.setAttribute('aria-label', isMuted ? 'Unmute audio' : 'Mute audio');
  elements.muteBtn.title = isMuted ? 'Unmute' : 'Mute';

  const path = elements.muteBtn.querySelector('path');
  if (path) {
    path.style.display = isMuted ? 'none' : 'block';
  }
}

function shareContent() {
  if (navigator.share) {
    navigator.share({
      title: 'Happy Birthday Surprise!',
      text: 'A special birthday surprise from your brother!',
      url: window.location.href
    }).catch((err) => {
      console.log('Share failed:', err);
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy:', err);
    });
  }
}

function playSong() {
  if (!elements.birthdayAudio) return;

  audioPlayable = true;
  elements.birthdayAudio.muted = isMuted;

  elements.birthdayAudio.play().then(() => {
    elements.playSongBtn.classList.add('hidden');
    elements.stopSongBtn.classList.remove('hidden');
  }).catch((error) => {
    console.error('Error playing audio:', error);
    alert('Unable to play audio. Please check your browser settings.');
  });
}

function stopSong() {
  if (!elements.birthdayAudio) return;

  elements.birthdayAudio.pause();
  elements.birthdayAudio.currentTime = 0;

  elements.playSongBtn.classList.remove('hidden');
  elements.stopSongBtn.classList.add('hidden');
}

async function checkIfEventStarted() {
  const now = new Date();
  const isPastTargetDate = now >= TARGET_DATE;
  const celebrationWasTriggered = await checkCelebrationState();

  if (isPastTargetDate || celebrationWasTriggered) {
    stopCountdown();
    elements.manualCelebrationBtn.classList.remove('hidden');
    return true;
  }
  return false;
}

async function initBackgroundBalloon() {
  const container = document.getElementById('lottie-balloons-bg');
  if (!container || prefersReducedMotion) return;

  try {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.10.1/lottie.min.js');
    const balloonData = await loadBalloonAnimationData();

    if (window.lottie && balloonData) {
      window.lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: balloonData
      });
    }
  } catch (error) {
    console.error('Error loading background balloon:', error);
  }
}

function setRandomNicknames() {
  const siblingTerms = [
    'My Dear Sister',
    'My Amazing Sister',
    'My Wonderful Sister',
    'My Beloved Sister',
    'My Sweet Sister'
  ];

  const randomTerm = siblingTerms[Math.floor(Math.random() * siblingTerms.length)];
  const randomNicknameElement = document.getElementById('random-nickname');
  if (randomNicknameElement) {
    randomNicknameElement.textContent = randomTerm;
  }

  const celebrationTerm = siblingTerms[Math.floor(Math.random() * siblingTerms.length)];
  const celebrationNicknameElement = document.getElementById('celebration-nickname');
  if (celebrationNicknameElement) {
    celebrationNicknameElement.textContent = celebrationTerm;
  }
}

async function init() {
  setRandomNicknames();

  const shouldShowCelebration = await checkIfEventStarted();

  if (shouldShowCelebration) {
    showCelebration();
  } else {
    startCountdown();
    initBackgroundBalloon();
  }

  elements.manualCelebrationBtn?.addEventListener('click', showCelebration);
  elements.muteBtn?.addEventListener('click', toggleMute);
  elements.shareBtn?.addEventListener('click', shareContent);
  elements.playSongBtn?.addEventListener('click', playSong);
  elements.stopSongBtn?.addEventListener('click', stopSong);

  if (elements.birthdayAudio) {
    elements.birthdayAudio.addEventListener('ended', () => {
      elements.playSongBtn.classList.remove('hidden');
      elements.stopSongBtn.classList.add('hidden');
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
