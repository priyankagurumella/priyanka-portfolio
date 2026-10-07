/**
 * GURUMELLA DURGA LALITHA PRIYANKA - PORTFOLIO INTERACTION SCRIPT
 * High-performance animations using GSAP & ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize interactive modules
  initScrollProgressBar();
  initCustomCursor();
  initPreloaderAndHero(prefersReducedMotion);
  initHeroLiquidEffect();
  initCurrentlyLearningTicker();
  initInteractiveAboutPhoto(prefersReducedMotion);
  initMagneticButtons();
  initExpertiseAccordion();
  initProjectCardGlowAndTilt(prefersReducedMotion);
  initCertificationsSearchAndFilter();
  initClipboardCopy();
  initNavigation();
  initFloatingBackToTop();
  initScrollAnimations(prefersReducedMotion);
});

/* ==========================================================================
   1. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  function updateProgress() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   2. CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  // Disable on touch devices
  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  const dot = cursor.querySelector('.cursor-dot');
  const circle = cursor.querySelector('.cursor-circle');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let circleX = mouseX;
  let circleY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (dot) {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
  }, { passive: true });

  function renderCursor() {
    circleX += (mouseX - circleX) * 0.18;
    circleY += (mouseY - circleY) * 0.18;

    if (circle) {
      circle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Dynamic hover target scaling
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, input, textarea, .btn, .accordion-header, .project-row, .profile-card, .photo-frame-wrapper')) {
      cursor.classList.add('is-hovering');
    } else {
      cursor.classList.remove('is-hovering');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. PRELOADER & HERO REVEAL
   ========================================================================== */
function initPreloaderAndHero(reducedMotion) {
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('loaderCounter');
  const barFill = document.getElementById('loaderBarFill');
  const greetingEl = document.getElementById('loaderGreeting');
  const heroChars = document.querySelectorAll('.hero-char');

  if (!preloader || !counterEl) return;

  if (reducedMotion || typeof gsap === 'undefined') {
    if (preloader) preloader.style.display = 'none';
    heroChars.forEach(ch => {
      ch.style.opacity = '1';
      ch.style.transform = 'translateY(0)';
    });
    return;
  }

  document.body.style.overflow = 'hidden';

  const loaderObj = { val: 0 };
  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = '';
      if (preloader) preloader.remove();
    }
  });

  // Counter 0 to 100
  tl.to(loaderObj, {
    val: 100,
    duration: 1.35,
    ease: 'power2.inOut',
    onUpdate: () => {
      const current = Math.floor(loaderObj.val);
      counterEl.textContent = current;
      if (barFill) barFill.style.width = `${current}%`;
    }
  });

  // "Hey, welcome!" handwriting greeting reveal
  tl.to(greetingEl, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    ease: 'power3.out'
  }, '+=0.08');

  // Brief pause for legibility
  tl.to({}, { duration: 0.3 });

  // Curtain slides up
  tl.to(preloader, {
    yPercent: -100,
    duration: 0.9,
    ease: 'power4.inOut'
  });

  // Hero "PRIYANKA" letters rise in sequentially
  tl.to(heroChars, {
    y: '0%',
    opacity: 1,
    duration: 0.8,
    stagger: 0.055,
    ease: 'back.out(1.4)'
  }, '-=0.5');

  // Metadata fade in
  tl.from('.hero-meta-row', {
    y: 25,
    opacity: 0,
    duration: 0.75,
    ease: 'power3.out'
  }, '-=0.4');

  tl.from('.hero-badge-wrap', {
    scale: 0.8,
    opacity: 0,
    duration: 0.65,
    ease: 'back.out(1.5)'
  }, '-=0.55');
}

/* ==========================================================================
   4. HERO LIQUID EFFECT & MOUSE GLOW
   ========================================================================== */
function initHeroLiquidEffect() {
  const hero = document.getElementById('hero');
  const heroTitle = document.getElementById('heroTitle');
  const dispMap = document.getElementById('liquid-displacement');
  const turbulence = document.getElementById('liquid-turbulence');

  // Ambient mouse glow tracker
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty('--mouse-x', `${x}px`);
      hero.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  }

  if (!heroTitle || !dispMap || !turbulence || typeof gsap === 'undefined') return;

  let liquidTween = null;
  let freqAnimId = null;
  let freqX = 0.02;
  let freqY = 0.04;

  function rippleFrame() {
    freqX = 0.015 + Math.sin(Date.now() * 0.003) * 0.008;
    freqY = 0.035 + Math.cos(Date.now() * 0.004) * 0.012;
    turbulence.setAttribute('baseFrequency', `${freqX.toFixed(4)} ${freqY.toFixed(4)}`);
    freqAnimId = requestAnimationFrame(rippleFrame);
  }

  heroTitle.addEventListener('mouseenter', () => {
    if (liquidTween) liquidTween.kill();
    cancelAnimationFrame(freqAnimId);
    freqAnimId = requestAnimationFrame(rippleFrame);

    const currentScale = parseFloat(dispMap.getAttribute('scale') || '0');
    liquidTween = gsap.to({ scale: currentScale }, {
      scale: 30,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: function() {
        dispMap.setAttribute('scale', this.targets()[0].scale);
      }
    });
  });

  heroTitle.addEventListener('mouseleave', () => {
    if (liquidTween) liquidTween.kill();
    cancelAnimationFrame(freqAnimId);

    const currentScale = parseFloat(dispMap.getAttribute('scale') || '0');
    liquidTween = gsap.to({ scale: currentScale }, {
      scale: 0,
      duration: 0.85,
      ease: 'elastic.out(1, 0.45)',
      onUpdate: function() {
        dispMap.setAttribute('scale', this.targets()[0].scale);
      },
      onComplete: () => {
        turbulence.setAttribute('baseFrequency', '0.0001 0.0001');
      }
    });
  });
}

/* ==========================================================================
   5. CURRENTLY LEARNING TICKER STRIP
   ========================================================================== */
function initCurrentlyLearningTicker() {
  const tickerEl = document.getElementById('learningTicker');
  if (!tickerEl) return;

  const topics = [
    'Data Structures and Algorithms',
    'Machine Learning',
    'Full Stack Development',
    'IoT'
  ];

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % topics.length;

    tickerEl.style.opacity = '0';
    tickerEl.style.transform = 'translateY(10px)';

    setTimeout(() => {
      tickerEl.textContent = topics[currentIndex];
      tickerEl.style.transform = 'translateY(-10px)';
      
      requestAnimationFrame(() => {
        tickerEl.style.opacity = '1';
        tickerEl.style.transform = 'translateY(0)';
      });
    }, 320);
  }, 2800);
}

/* ==========================================================================
   6. INTERACTIVE ABOUT PHOTO (3D Tilt & Parallax Floating Glass Chips with LERP)
   ========================================================================== */
function initInteractiveAboutPhoto(reducedMotion) {
  const perspectiveWrapper = document.getElementById('photoPerspective');
  const photoCard = document.getElementById('photoCard');
  const chipSd = document.getElementById('chipSd');
  const chipDs = document.getElementById('chipDs');
  const chipFs = document.getElementById('chipFs');

  if (!perspectiveWrapper || !photoCard) return;

  if (reducedMotion || window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
    return;
  }

  let mouseActive = false;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let targetScale = 1.0;
  
  let targetChip1X = 0, targetChip1Y = 0;
  let targetChip2X = 0, targetChip2Y = 0;
  let targetChip3X = 0, targetChip3Y = 0;

  let currentRotateX = 0;
  let currentRotateY = 0;
  let currentScale = 1.0;
  let currentChip1X = 0, currentChip1Y = 0;
  let currentChip2X = 0, currentChip2Y = 0;
  let currentChip3X = 0, currentChip3Y = 0;

  perspectiveWrapper.addEventListener('mouseenter', () => {
    mouseActive = true;
    targetScale = 1.025;
  });

  perspectiveWrapper.addEventListener('mousemove', (e) => {
    const rect = perspectiveWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    targetRotateX = -normY * 8;
    targetRotateY = normX * 8;

    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    photoCard.style.setProperty('--shine-x', `${localX}px`);
    photoCard.style.setProperty('--shine-y', `${localY}px`);
    photoCard.style.setProperty('--glow-x', `${localX}px`);
    photoCard.style.setProperty('--glow-y', `${localY}px`);

    targetChip1X = normX * 22; // Software Development chip
    targetChip1Y = normY * 18;

    targetChip2X = normX * -26; // Data Science chip
    targetChip2Y = normY * -20;

    targetChip3X = normX * 32; // Full Stack chip
    targetChip3Y = normY * 26;
  }, { passive: true });

  perspectiveWrapper.addEventListener('mouseleave', () => {
    mouseActive = false;
    targetRotateX = 0;
    targetRotateY = 0;
    targetScale = 1.0;

    targetChip1X = 0; targetChip1Y = 0;
    targetChip2X = 0; targetChip2Y = 0;
    targetChip3X = 0; targetChip3Y = 0;
  });

  function updateTilt() {
    const lerpFactor = mouseActive ? 0.12 : 0.08;

    currentRotateX += (targetRotateX - currentRotateX) * lerpFactor;
    currentRotateY += (targetRotateY - currentRotateY) * lerpFactor;
    currentScale += (targetScale - currentScale) * lerpFactor;

    photoCard.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;

    // Chip 1: Software Development
    if (chipSd) {
      currentChip1X += (targetChip1X - currentChip1X) * lerpFactor;
      currentChip1Y += (targetChip1Y - currentChip1Y) * lerpFactor;
      chipSd.style.transform = `translate3d(${currentChip1X.toFixed(2)}px, ${currentChip1Y.toFixed(2)}px, 45px)`;
    }

    // Chip 2: Data Science
    if (chipDs) {
      currentChip2X += (targetChip2X - currentChip2X) * lerpFactor;
      currentChip2Y += (targetChip2Y - currentChip2Y) * lerpFactor;
      chipDs.style.transform = `translate3d(${currentChip2X.toFixed(2)}px, ${currentChip2Y.toFixed(2)}px, 60px)`;
    }

    // Chip 3: Full Stack
    if (chipFs) {
      currentChip3X += (targetChip3X - currentChip3X) * lerpFactor;
      currentChip3Y += (targetChip3Y - currentChip3Y) * lerpFactor;
      chipFs.style.transform = `translate3d(${currentChip3X.toFixed(2)}px, ${currentChip3Y.toFixed(2)}px, 75px)`;
    }

    requestAnimationFrame(updateTilt);
  }

  requestAnimationFrame(updateTilt);
}

/* ==========================================================================
   7. PROJECT CARDS 3D HOVER TILT & CURSOR BORDER GLOW
   ========================================================================== */
function initProjectCardGlowAndTilt(reducedMotion) {
  const projectRows = document.querySelectorAll('.project-row');
  if (!projectRows.length) return;

  projectRows.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--card-mouse-x', `${x}px`);
      card.style.setProperty('--card-mouse-y', `${y}px`);

      if (!reducedMotion && !window.matchMedia('(hover: none)').matches) {
        const normX = (x - rect.width / 2) / (rect.width / 2);
        const normY = (y - rect.height / 2) / (rect.height / 2);
        card.style.transform = `perspective(1000px) rotateX(${(-normY * 2.2).toFixed(2)}deg) rotateY(${(normX * 2.2).toFixed(2)}deg) translateX(8px)`;
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   8. MAGNETIC BUTTON PHYSICS
   ========================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;
  if (typeof gsap === 'undefined') return;

  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.32;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.32;

      gsap.to(btn, {
        x: x,
        y: y,
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)'
      });
    });
  });
}

/* ==========================================================================
   9. EXPERTISE ACCORDION
   ========================================================================== */
function initExpertiseAccordion() {
  const rows = document.querySelectorAll('.accordion-row');
  if (!rows.length) return;

  rows.forEach((row) => {
    const header = row.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = row.classList.contains('is-active');

      rows.forEach((otherRow) => {
        if (otherRow !== row) {
          otherRow.classList.remove('is-active');
          const otherHeader = otherRow.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        row.classList.remove('is-active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        row.classList.add('is-active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   10. CERTIFICATIONS INSTANT SEARCH & CATEGORY FILTER
   ========================================================================== */
function initCertificationsSearchAndFilter() {
  const searchInput = document.getElementById('certSearchInput');
  const searchClear = document.getElementById('certSearchClear');
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCols = document.querySelectorAll('.cert-group-column');
  const noResultsMsg = document.getElementById('certNoResults');

  if (!certCols.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let totalVisible = 0;

    certCols.forEach((col) => {
      const colCategory = col.getAttribute('data-category');
      const categoryMatches = (activeCategory === 'all' || colCategory === activeCategory);

      if (!categoryMatches) {
        col.classList.add('is-hidden');
        return;
      }

      const items = col.querySelectorAll('.cert-item');
      let visibleInCol = 0;

      items.forEach((item) => {
        const nameEl = item.querySelector('.cert-name') || item;
        const text = nameEl.textContent.toLowerCase();
        const matchesSearch = !searchQuery || text.includes(searchQuery);

        if (matchesSearch) {
          item.classList.remove('is-filtered-out');
          visibleInCol++;
        } else {
          item.classList.add('is-filtered-out');
        }
      });

      if (visibleInCol > 0) {
        col.classList.remove('is-hidden');
        totalVisible += visibleInCol;
      } else {
        col.classList.add('is-hidden');
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = (totalVisible === 0) ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      if (searchClear) {
        searchClear.style.display = searchQuery ? 'block' : 'none';
      }
      applyFilters();
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClear.style.display = 'none';
        applyFilters();
        searchInput.focus();
      });
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      applyFilters();
    });
  });
}

/* ==========================================================================
   11. COPY TO CLIPBOARD BUTTONS & TOAST
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('copyToast');
  const toastMessage = document.getElementById('toastMessage');

  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;

    toast.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        const isEmail = textToCopy.includes('@');
        showToast(isEmail ? 'Email copied to clipboard!' : 'Phone number copied to clipboard!');
      } catch (err) {
        showToast('Copied: ' + textToCopy);
      }
    });
  });
}

/* ==========================================================================
   12. FLOATING BACK TO TOP BUTTON
   ========================================================================== */
function initFloatingBackToTop() {
  const backToTopBtn = document.getElementById('floatingBackToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   13. NAVIGATION & ACTIVE SECTION HIGHLIGHT
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }, { passive: true });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function updateActiveLink() {
    const scrollPos = window.scrollY + 220;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   14. SCROLL REVEAL ANIMATIONS (Lightweight & 60fps)
   ========================================================================== */
function initScrollAnimations(reducedMotion) {
  if (reducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.huge-heading').forEach((heading) => {
    gsap.from(heading, {
      y: 40,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.project-row').forEach((row, i) => {
    gsap.from(row, {
      y: 45,
      opacity: 0,
      duration: 0.75,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: row,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
      x: -25,
      opacity: 0,
      duration: 0.65,
      delay: i * 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.profile-card').forEach((card, i) => {
    gsap.from(card, {
      y: 35,
      opacity: 0,
      duration: 0.65,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });
}
