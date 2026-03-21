// Portal animation system - optimized for 2-3s total duration
const overlay = document.getElementById('portal-overlay');
const homepageWrapper = document.getElementById('homepage-wrapper');
const enterBtn = document.getElementById('enter-btn');
const skipBtn = document.getElementById('skip-btn');
const gateCoreGroup = document.getElementById('gate-core-group');
const gateCoreInner = document.getElementById('gate-core-inner');
const gatePulse = document.getElementById('gate-pulse');
const portalTitleGroup = document.getElementById('portal-title-group');
const portalCta = document.getElementById('portal-cta');
const portalText = document.getElementById('portal-text');
const portalGate = document.getElementById('portal-gate');
const sealRings = document.getElementById('seal-rings');
const sealSymbols = document.getElementById('seal-symbols');
const sealActivateLines = document.getElementById('seal-activate-lines');
const portalTransit = document.getElementById('portal-transit');
const portalArrival = document.getElementById('portal-arrival');

let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let isMobile = window.innerWidth < 640;
let hasVisited = sessionStorage.getItem('lingxu-visited');

const mobileTimings = {
  unlock: 800,
  transit: 600,
  arrival: 500,
  reveal: 400
};

const desktopTimings = {
  unlock: 1000,
  transit: 800,
  arrival: 600,
  reveal: 500
};

function getTimings() {
  return isMobile ? mobileTimings : desktopTimings;
}

function initPortal() {
  if (prefersReducedMotion || hasVisited) {
    skipToHomepage();
    return;
  }

  requestAnimationFrame(() => {
    overlay?.classList.add('portal-ready');
    fadeIn(portalTitleGroup, 200);
    fadeIn(portalCta, 400);
  });
}

function fadeIn(element: Element | null, delay: number = 0) {
  if (!element) return;
  setTimeout(() => {
    (element as HTMLElement).style.opacity = '1';
    (element as HTMLElement).style.transition = 'opacity 0.5s ease-out';
  }, delay);
}

function fadeOut(element: Element | null, delay: number = 0, duration: number = 400) {
  if (!element) return;
  setTimeout(() => {
    (element as HTMLElement).style.opacity = '0';
    (element as HTMLElement).style.transition = `opacity ${duration}ms ease-out`;
  }, delay);
}

function animateSequence() {
  const timings = getTimings();

  fadeOut(portalCta, 0, 200);
  fadeOut(portalText, 0, 200);

  fadeIn(sealRings, 100);
  fadeIn(sealSymbols, 250);
  fadeIn(gateCoreInner, 400);

  setTimeout(() => {
    unlockSeal(timings.unlock);
  }, 600);
}

function unlockSeal(duration: number) {
  sealActivateLines?.classList.add('activate');
  gateCoreInner?.classList.add('pulse-glow');

  setTimeout(() => {
    sealRings?.classList.add('speed-up');
    sealSymbols?.classList.add('speed-up');
  }, duration * 0.3);

  setTimeout(() => {
    sealActivateLines?.classList.add('bright');
  }, duration * 0.5);

  setTimeout(() => {
    fadeOut(sealActivateLines, 0, 200);
    fadeOut(sealRings, 0, 200);
    fadeOut(sealSymbols, 0, 200);

    setTimeout(() => {
      startTransit(duration);
    }, 250);
  }, duration);
}

function startTransit(duration: number) {
  if (portalTransit) {
    portalTransit.style.pointerEvents = 'auto';
    fadeIn(portalTransit, 0);
  }

  const startTransitFn = (window as any).startPortalTransit;
  if (startTransitFn) startTransitFn();

  setTimeout(() => {
    const stopTransitFn = (window as any).stopPortalTransit;
    if (stopTransitFn) stopTransitFn();

    fadeOut(portalTransit, 0, duration);
    setTimeout(() => {
      showArrival();
    }, duration);
  }, 200);
}

function showArrival() {
  if (portalArrival) {
    portalArrival.style.pointerEvents = 'auto';
    fadeIn(portalArrival, 0);
  }

  const timings = getTimings();

  setTimeout(() => {
    fadeOut(portalArrival, 0, timings.reveal);
    setTimeout(() => {
      revealHomepage();
    }, timings.reveal);
  }, timings.arrival);
}

function revealHomepage() {
  if (overlay) {
    overlay.style.transition = 'opacity 0.6s ease-out';
    overlay.style.opacity = '0';

    setTimeout(() => {
      overlay!.classList.add('hidden');
      if (homepageWrapper) {
        homepageWrapper.classList.remove('hidden');
        homepageWrapper.querySelector('slot')?.parentElement?.classList.add('visible');
      }
      sessionStorage.setItem('lingxu-visited', 'true');
    }, 600);
  }
}

function skipToHomepage() {
  if (overlay) {
    overlay.style.transition = 'opacity 0.3s ease-out';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay!.classList.add('hidden');
      if (homepageWrapper) {
        homepageWrapper.classList.remove('hidden');
      }
    }, 300);
  }
}

enterBtn?.addEventListener('click', animateSequence);
skipBtn?.addEventListener('click', skipToHomepage);
gateCoreGroup?.addEventListener('click', (e) => {
  e.stopPropagation();
  animateSequence();
});

gateCoreGroup?.addEventListener('touchstart', () => {
  gateCoreGroup.classList.add('touch-active');
}, { passive: true });

gateCoreGroup?.addEventListener('touchend', () => {
  setTimeout(() => {
    gateCoreGroup.classList.remove('touch-active');
  }, 150);
}, { passive: true });

window.addEventListener('resize', () => {
  isMobile = window.innerWidth < 640;
});

window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  prefersReducedMotion = e.matches;
  if (prefersReducedMotion) {
    skipToHomepage();
  }
});

// Canvas particle system with performance optimization
const canvas = document.getElementById('portal-particle-canvas') as HTMLCanvasElement;
if (canvas) {
  const ctx = canvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const isMobilePerf = width < 640;
  const maxParticles = isMobilePerf ? 50 : 100;
  const centerX = width / 2;
  const centerY = height / 2;

  interface PortalParticle {
    x: number;
    y: number;
    z: number;
    size: number;
    speed: number;
    opacity: number;
    color: string;
  }

  const particles: PortalParticle[] = [];

  function createParticle(): PortalParticle {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * Math.max(width, height) * 0.4;
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      z: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.6 ? '#d4af37' : '#c9a227'
    };
  }

  function hexToRgb(hex: string): string {
    const g = parseInt(hex.slice(1, 3), 16);
    const p = parseInt(hex.slice(3, 5), 16);
    const h = parseInt(hex.slice(5, 7), 16);
    return `${g}, ${p}, ${h}`;
  }

  let lastTime = 0;
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  function animate(currentTime: number = 0) {
    requestAnimationFrame(animate);

    const elapsed = currentTime - lastTime;

    if (elapsed < frameInterval) return;

    lastTime = currentTime - (elapsed % frameInterval);

    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    while (particles.length < maxParticles) {
      particles.push(createParticle());
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const dx = centerX - p.x;
      const dy = centerY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        p.x += (dx / dist) * p.speed;
        p.y += (dy / dist) * p.speed;
        p.z -= 1.5;
      } else {
        particles[i] = createParticle();
        continue;
      }

      if (p.z <= 0) {
        particles[i] = createParticle();
        continue;
      }

      const scale = p.size * (p.z / 100);
      const opacity = p.opacity * Math.min(1, p.z / 50);

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, scale * 3);
      gradient.addColorStop(0, `rgba(${hexToRgb(p.color)}, ${opacity})`);
      gradient.addColorStop(1, `rgba(${hexToRgb(p.color)}, 0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, scale * 2), 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  animate();

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
}