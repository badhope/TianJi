// Portal animation system
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
  unlock: 1200,
  transit: 1000,
  arrival: 800,
  reveal: 600
};

const desktopTimings = {
  unlock: 2000,
  transit: 1800,
  arrival: 1200,
  reveal: 800
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
    fadeIn(portalTitleGroup, 300);
    fadeIn(portalCta, 600);
  });
}

function fadeIn(element: Element | null, delay: number = 0) {
  if (!element) return;
  setTimeout(() => {
    (element as HTMLElement).style.opacity = '1';
    (element as HTMLElement).style.transition = 'opacity 0.8s ease';
  }, delay);
}

function fadeOut(element: Element | null, delay: number = 0, duration: number = 800) {
  if (!element) return;
  setTimeout(() => {
    (element as HTMLElement).style.opacity = '0';
    (element as HTMLElement).style.transition = `opacity ${duration}ms ease`;
  }, delay);
}

function animateSequence() {
  const timings = getTimings();

  fadeOut(portalCta, 0, 300);
  fadeOut(portalText, 0, 400);

  fadeIn(sealRings, 200);
  fadeIn(sealSymbols, 500);
  fadeIn(gateCoreInner, 700);

  setTimeout(() => {
    unlockSeal(timings.unlock);
  }, 900);
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
    fadeOut(sealActivateLines, 0, 250);
    fadeOut(sealRings, 0, 350);
    fadeOut(sealSymbols, 0, 350);

    setTimeout(() => {
      startTransit(duration);
    }, 450);
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
  }, 300);
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
    overlay.style.transition = 'opacity 0.8s ease';
    overlay.style.opacity = '0';

    setTimeout(() => {
      overlay!.classList.add('hidden');
      if (homepageWrapper) {
        homepageWrapper.classList.remove('hidden');
        homepageWrapper.querySelector('slot')?.parentElement?.classList.add('visible');
      }
      sessionStorage.setItem('lingxu-visited', 'true');
    }, 800);
  }
}

function skipToHomepage() {
  if (overlay) {
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay!.classList.add('hidden');
      if (homepageWrapper) {
        homepageWrapper.classList.remove('hidden');
      }
    }, 400);
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
  }, 200);
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

initPortal();

// Particle system
const canvas = document.getElementById('portal-particle-canvas') as HTMLCanvasElement;
if (canvas) {
  const ctx = canvas.getContext('2d');

  let pWidth = window.innerWidth;
  let pHeight = window.innerHeight;
  canvas.width = pWidth;
  canvas.height = pHeight;

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
  const particleCount = Math.floor((pWidth * pHeight) / 12000);
  const centerX = pWidth / 2;
  const centerY = pHeight / 2;

  function createParticle(): PortalParticle {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * Math.max(pWidth, pHeight) * 0.4;
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

  function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function animateParticles() {
    if (!ctx || prefersReducedMotion) return;

    ctx.clearRect(0, 0, pWidth, pHeight);

    if (particles.length < particleCount) {
      for (let i = particles.length; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    particles.forEach((p, index) => {
      const dx = centerX - p.x;
      const dy = centerY - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        p.x += (dx / distance) * p.speed;
        p.y += (dy / distance) * p.speed;
        p.z -= 1.5;
      } else {
        particles[index] = createParticle();
      }

      if (p.z <= 0) {
        particles[index] = createParticle();
      }

      const screenSize = p.size * (p.z / 100);
      const alpha = p.opacity * Math.min(1, p.z / 50);

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, screenSize * 3);
      gradient.addColorStop(0, hexToRgba(p.color, alpha));
      gradient.addColorStop(1, hexToRgba(p.color, 0));

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, screenSize * 2), 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    pWidth = window.innerWidth;
    pHeight = window.innerHeight;
    canvas.width = pWidth;
    canvas.height = pHeight;
  });

  animateParticles();
}
