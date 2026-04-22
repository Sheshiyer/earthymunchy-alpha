/**
 * EARTHY MUNCHY - TEXT ANIMATION LIBRARY
 * Version 2.0
 * 
 * GSAP-powered text animations for premium typography effects.
 * Requires: GSAP 3.x + ScrollTrigger
 */

class TextAnimations {
  constructor() {
    this.initialized = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    if (this.initialized || this.prefersReducedMotion) return;
    
    if (typeof gsap === 'undefined') {
      console.warn('TextAnimations: GSAP not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    this.initialized = true;
    
    this.initLineReveals();
    this.initWordSlides();
    this.initCharacterCascades();
    this.initBlurReveals();
    this.initFadeUps();
    this.initParallaxText();
    this.initMagneticText();
    this.initUnderlineDraws();
    this.initLetterSpacingExpand();
    this.initScrambleText();
    this.initCounterAnimations();
  }

  // ============================================
  // SPLIT TEXT UTILITY (No SplitText plugin needed)
  // ============================================
  
  splitIntoWords(element) {
    const text = element.textContent;
    const words = text.split(/\s+/);
    element.innerHTML = '';
    
    return words.map(word => {
      const wrapper = document.createElement('span');
      wrapper.className = 'split-parent';
      
      const inner = document.createElement('span');
      inner.className = 'split-word';
      inner.textContent = word;
      inner.style.display = 'inline-block';
      
      wrapper.appendChild(inner);
      element.appendChild(wrapper);
      element.appendChild(document.createTextNode(' '));
      
      return inner;
    });
  }

  splitIntoChars(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    return text.split('').map(char => {
      const span = document.createElement('span');
      span.className = 'split-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });
  }

  splitIntoLines(element) {
    const text = element.innerHTML;
    const lines = text.split(/<br\s*\/?>/i);
    element.innerHTML = '';
    
    return lines.map((line, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'split-parent';
      wrapper.style.overflow = 'hidden';
      
      const inner = document.createElement('div');
      inner.className = 'split-line';
      inner.innerHTML = line.trim();
      
      wrapper.appendChild(inner);
      element.appendChild(wrapper);
      
      return inner;
    });
  }

  // ============================================
  // LINE REVEAL ANIMATION
  // Text lines slide up from behind a mask
  // ============================================
  
  initLineReveals() {
    const elements = document.querySelectorAll('[data-animate="line-reveal"]');
    
    elements.forEach(element => {
      const lines = this.splitIntoLines(element);
      
      gsap.set(lines, { yPercent: 100 });
      
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  // ============================================
  // WORD SLIDE ANIMATION
  // Words slide up sequentially
  // ============================================
  
  initWordSlides() {
    const elements = document.querySelectorAll('[data-animate="word-slide"]');
    
    elements.forEach(element => {
      const words = this.splitIntoWords(element);
      
      gsap.set(words, { yPercent: 100, opacity: 0 });
      
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  // ============================================
  // CHARACTER CASCADE ANIMATION
  // Characters fall into place with rotation
  // ============================================
  
  initCharacterCascades() {
    const elements = document.querySelectorAll('[data-animate="char-cascade"]');
    
    elements.forEach(element => {
      const chars = this.splitIntoChars(element);
      
      gsap.set(chars, { 
        y: 50, 
        opacity: 0, 
        rotateX: -90,
        transformOrigin: '50% 50% -50px',
      });
      
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  // ============================================
  // BLUR REVEAL ANIMATION
  // Text starts blurred and sharpens
  // ============================================
  
  initBlurReveals() {
    const elements = document.querySelectorAll('[data-animate="blur-reveal"]');
    
    elements.forEach(element => {
      gsap.set(element, { filter: 'blur(20px)', opacity: 0 });
      
      gsap.to(element, {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  // ============================================
  // FADE UP ANIMATION
  // Simple fade with upward motion
  // ============================================
  
  initFadeUps() {
    const elements = document.querySelectorAll('[data-animate="fade-up"]');
    
    elements.forEach(element => {
      const delay = parseFloat(element.dataset.delay) || 0;
      
      gsap.set(element, { y: 40, opacity: 0 });
      
      gsap.to(element, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  // ============================================
  // PARALLAX TEXT
  // Text moves at different speed than scroll
  // ============================================
  
  initParallaxText() {
    const elements = document.querySelectorAll('[data-animate="parallax"]');
    
    elements.forEach(element => {
      const speed = parseFloat(element.dataset.speed) || 0.5;
      
      gsap.to(element, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  // ============================================
  // MAGNETIC TEXT (Hover Effect)
  // Text subtly follows cursor
  // ============================================
  
  initMagneticText() {
    const elements = document.querySelectorAll('[data-animate="magnetic"]');
    
    elements.forEach(element => {
      const strength = parseFloat(element.dataset.strength) || 0.3;
      
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)',
        });
      });
    });
  }

  // ============================================
  // UNDERLINE DRAW (Hover Effect)
  // Animated underline on hover
  // ============================================
  
  initUnderlineDraws() {
    const elements = document.querySelectorAll('[data-animate="underline-draw"]');
    
    elements.forEach(element => {
      element.style.position = 'relative';
      element.style.display = 'inline-block';
      
      const underline = document.createElement('span');
      underline.style.cssText = `
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: right;
      `;
      element.appendChild(underline);
      
      element.addEventListener('mouseenter', () => {
        gsap.to(underline, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.4,
          ease: 'power2.out',
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(underline, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.4,
          ease: 'power2.inOut',
        });
      });
    });
  }

  // ============================================
  // LETTER SPACING EXPAND (Hover Effect)
  // ============================================
  
  initLetterSpacingExpand() {
    const elements = document.querySelectorAll('[data-animate="letter-expand"]');
    
    elements.forEach(element => {
      const originalSpacing = getComputedStyle(element).letterSpacing;
      
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          letterSpacing: '0.15em',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          letterSpacing: originalSpacing === 'normal' ? '0' : originalSpacing,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      });
    });
  }

  // ============================================
  // SCRAMBLE TEXT ANIMATION
  // Text scrambles before revealing
  // ============================================
  
  initScrambleText() {
    const elements = document.querySelectorAll('[data-animate="scramble"]');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    elements.forEach(element => {
      const originalText = element.textContent;
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        onEnter: () => {
          let iteration = 0;
          const interval = setInterval(() => {
            element.textContent = originalText
              .split('')
              .map((char, index) => {
                if (index < iteration) return originalText[index];
                if (char === ' ') return ' ';
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');
            
            iteration += 1/3;
            if (iteration >= originalText.length) clearInterval(interval);
          }, 30);
        },
        once: true,
      });
    });
  }

  // ============================================
  // COUNTER ANIMATION
  // Numbers count up/down
  // ============================================
  
  initCounterAnimations() {
    const elements = document.querySelectorAll('[data-animate="counter"]');
    
    elements.forEach(element => {
      const target = parseFloat(element.dataset.target) || parseFloat(element.textContent);
      const prefix = element.dataset.prefix || '';
      const suffix = element.dataset.suffix || '';
      const duration = parseFloat(element.dataset.duration) || 2;
      
      const counter = { value: 0 };
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(counter, {
            value: target,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
              element.textContent = prefix + Math.round(counter.value) + suffix;
            },
          });
        },
        once: true,
      });
    });
  }

  // ============================================
  // GRADIENT TEXT ANIMATION
  // Animated gradient background on text
  // ============================================
  
  animateGradientText(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      element.style.cssText = `
        background: linear-gradient(
          90deg,
          var(--earth-terracotta, #D4876F) 0%,
          var(--earth-clay, #C17855) 25%,
          var(--earth-warmBrown, #8B6F47) 50%,
          var(--earth-clay, #C17855) 75%,
          var(--earth-terracotta, #D4876F) 100%
        );
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      `;
      
      gsap.to(element, {
        backgroundPosition: '-200% 0',
        duration: 8,
        ease: 'none',
        repeat: -1,
      });
    });
  }

  // ============================================
  // TYPEWRITER EFFECT
  // ============================================
  
  typewriter(element, options = {}) {
    const defaults = {
      speed: 0.05,
      delay: 0,
      cursor: true,
    };
    
    const config = { ...defaults, ...options };
    const text = element.textContent;
    element.textContent = '';
    
    if (config.cursor) {
      element.style.borderRight = '2px solid currentColor';
    }
    
    const tl = gsap.timeline({ delay: config.delay });
    
    text.split('').forEach((char, i) => {
      tl.to(element, {
        duration: config.speed,
        textContent: text.substring(0, i + 1),
        ease: 'none',
      });
    });
    
    if (config.cursor) {
      tl.to(element, {
        borderColor: 'transparent',
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    }
    
    return tl;
  }

  // ============================================
  // SCALE ON SCROLL
  // ============================================
  
  scaleOnScroll(selector, scaleRange = [0.8, 1]) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      gsap.fromTo(element,
        { scale: scaleRange[0] },
        {
          scale: scaleRange[1],
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    });
  }

  // ============================================
  // REFRESH SCROLL TRIGGERS
  // ============================================
  
  refresh() {
    ScrollTrigger.refresh();
  }

  // ============================================
  // DESTROY ALL ANIMATIONS
  // ============================================
  
  destroy() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    this.initialized = false;
  }
}

// Create global instance
window.textAnimations = new TextAnimations();

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.textAnimations.init();
});

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TextAnimations;
}
