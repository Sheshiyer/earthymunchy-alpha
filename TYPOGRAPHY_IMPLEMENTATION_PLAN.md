# Earthy Munchy Typography & Motion Design Implementation Plan

**Version:** 2.0  
**Date:** January 2026  
**Scope:** Complete typography overhaul with advanced motion and animation system

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Typography System Architecture](#typography-system-architecture)
4. [Design Token System](#design-token-system)
5. [Motion & Animation Framework](#motion--animation-framework)
6. [Component-Level Implementation](#component-level-implementation)
7. [Page-by-Page Implementation Guide](#page-by-page-implementation-guide)
8. [Performance Optimization](#performance-optimization)
9. [Accessibility Considerations](#accessibility-considerations)
10. [Implementation Timeline](#implementation-timeline)
11. [Technical Specifications](#technical-specifications)

---

## Executive Summary

This document outlines a comprehensive redesign of the typography and motion system for Earthy Munchy's digital presence. The goal is to elevate the brand's visual language from functional to exceptional, creating an immersive, premium experience that mirrors the artisanal quality of the products.

The implementation will introduce:
- A refined typographic scale with better rhythm and hierarchy
- Advanced text animations using GSAP for cinematic text reveals
- Scroll-triggered text effects that respond to user interaction
- Variable font integration for dynamic weight and width adjustments
- Micro-interactions on all text-based UI elements
- A cohesive motion language that reinforces brand storytelling

---

## Current State Analysis

### Existing Typography Stack

The current implementation uses three font families:

| Role | Font Family | Current Usage |
|------|-------------|---------------|
| Headings | Tex Gyre Termes | Primary headlines, logo |
| Subheadings | Solway | Secondary text, accents |
| Body | Lato | Paragraphs, UI elements |

**Issues Identified (January 2026):**

1. ~~**Inconsistent Font Loading**~~: ✅ FIXED - Consolidated to local fonts with proper @font-face
2. ~~**Limited Type Scale**~~: ✅ FIXED - Implemented fluid clamp() values
3. ~~**No Line Height System**~~: ✅ FIXED - Added consistent leading tokens
4. ~~**Poor Letter Spacing**~~: ✅ FIXED - Optimized tracking per font
5. ~~**Animation Gaps**~~: ✅ FIXED - Implemented comprehensive GSAP animation system
6. ~~**Missing Font Features**~~: ✅ FIXED - OpenType features properly configured
7. ~~**Text Visibility Issues**~~: ✅ FIXED - All dark background sections now use white/cream text with proper opacity (85-90% for readability)

### Existing Motion Implementation

Current animations include:
- Noise overlay animation (basic CSS keyframes)
- Fluid background orbs with GSAP parallax
- Horizontal scroll section with ScrollTrigger
- Basic fade-in on story page hero
- Magnetic button effect
- Marquee animations (CSS-based)

**Gaps:**
- No text-specific reveal animations
- No staggered character/word animations
- No scroll-linked text transformations
- No hover states on typography
- Missing entrance/exit choreography

---

## Typography System Architecture

### Font Stack Refinement

#### Primary Display Font: Tex Gyre Termes
- **Usage**: Hero headlines, section titles, product names, prices
- **Weights**: Regular (400), Bold (700)
- **Recommended Enhancements**:
  - Add italic variants for emphasis
  - Consider upgrading to a variable font alternative (e.g., Source Serif 4 Variable) for dynamic weight control
  
#### Secondary Display Font: Solway
- **Usage**: Subheadings, taglines, navigation labels, accent text
- **Weights**: Regular (400), Bold (700)
- **Enhancement**: Load additional weights (Light 300, Medium 500) for more granularity

#### Body Font: Lato
- **Usage**: Paragraphs, descriptions, form labels, small text
- **Weights**: Light (300), Regular (400), Bold (700)
- **Enhancement**: Consider switching to Inter or DM Sans for better screen rendering and more weights

### Proposed Type Scale (Fluid Typography)

Replace fixed pixel values with CSS `clamp()` for fluid responsiveness:

```css
:root {
  /* Display Scale */
  --text-display-hero: clamp(3.5rem, 8vw + 1rem, 9rem);      /* 56px - 144px */
  --text-display-large: clamp(3rem, 6vw + 1rem, 7.5rem);     /* 48px - 120px */
  --text-display-medium: clamp(2.5rem, 5vw + 0.5rem, 5rem);  /* 40px - 80px */
  
  /* Heading Scale */
  --text-heading-1: clamp(2rem, 4vw + 0.5rem, 4rem);         /* 32px - 64px */
  --text-heading-2: clamp(1.75rem, 3vw + 0.5rem, 3rem);      /* 28px - 48px */
  --text-heading-3: clamp(1.5rem, 2vw + 0.5rem, 2.25rem);    /* 24px - 36px */
  --text-heading-4: clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem); /* 20px - 28px */
  
  /* Body Scale */
  --text-body-large: clamp(1.125rem, 1vw + 0.5rem, 1.375rem); /* 18px - 22px */
  --text-body-base: clamp(1rem, 0.5vw + 0.75rem, 1.125rem);   /* 16px - 18px */
  --text-body-small: clamp(0.875rem, 0.25vw + 0.75rem, 1rem); /* 14px - 16px */
  
  /* Utility Scale */
  --text-caption: clamp(0.75rem, 0.25vw + 0.625rem, 0.875rem); /* 12px - 14px */
  --text-overline: clamp(0.625rem, 0.2vw + 0.5rem, 0.75rem);   /* 10px - 12px */
}
```

### Line Height Tokens

```css
:root {
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 1.75;
}
```

### Letter Spacing Tokens

```css
:root {
  --tracking-tighter: -0.03em;
  --tracking-tight: -0.015em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
  --tracking-mega: 0.2em;
}
```

---

## Design Token System

### Typography Semantic Tokens

Create utility classes that map to semantic purposes:

```css
/* Hero Display - For main page headers */
.text-hero {
  font-family: var(--font-heading);
  font-size: var(--text-display-hero);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  font-weight: 300;
}

/* Section Title - For major section headers */
.text-section-title {
  font-family: var(--font-heading);
  font-size: var(--text-heading-1);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
  font-weight: 400;
}

/* Product Title - For product names */
.text-product-title {
  font-family: var(--font-heading);
  font-size: var(--text-heading-2);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

/* Tagline - For subheadings and taglines */
.text-tagline {
  font-family: var(--font-subheading);
  font-size: var(--text-body-large);
  line-height: var(--leading-normal);
  font-style: italic;
}

/* Overline - For labels and categories */
.text-overline {
  font-family: var(--font-body);
  font-size: var(--text-overline);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-mega);
  text-transform: uppercase;
  font-weight: 700;
}

/* Body Copy */
.text-body {
  font-family: var(--font-body);
  font-size: var(--text-body-base);
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-normal);
}

/* Price Display */
.text-price {
  font-family: var(--font-heading);
  font-size: var(--text-heading-3);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-tight);
  font-variant-numeric: tabular-nums;
}
```

---

## Motion & Animation Framework

### GSAP Text Animation Library

Create a reusable animation system with the following effects:

#### 1. Split Text Reveal

Animate text character-by-character or word-by-word:

```javascript
// text-animations.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // Requires GSAP Club membership

gsap.registerPlugin(ScrollTrigger, SplitText);

// Character Cascade - Letters fall into place
export function characterCascade(selector, options = {}) {
  const defaults = {
    duration: 0.8,
    stagger: 0.02,
    ease: 'power3.out',
    y: 50,
    opacity: 0,
    rotateX: -90,
  };
  
  const config = { ...defaults, ...options };
  
  document.querySelectorAll(selector).forEach(element => {
    const split = new SplitText(element, { type: 'chars' });
    
    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: config.y,
      opacity: config.opacity,
      rotateX: config.rotateX,
      transformOrigin: '50% 50% -50',
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
    });
  });
}

// Word Slide - Words slide up sequentially
export function wordSlide(selector, options = {}) {
  const defaults = {
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out',
    y: '100%',
  };
  
  const config = { ...defaults, ...options };
  
  document.querySelectorAll(selector).forEach(element => {
    const split = new SplitText(element, { type: 'words' });
    
    // Wrap each word in overflow hidden container
    split.words.forEach(word => {
      const wrapper = document.createElement('span');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'inline-block';
      wrapper.style.verticalAlign = 'top';
      word.parentNode.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });
    
    gsap.from(split.words, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
      y: config.y,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
    });
  });
}

// Line Reveal - Lines reveal with mask
export function lineReveal(selector, options = {}) {
  const defaults = {
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.inOut',
  };
  
  const config = { ...defaults, ...options };
  
  document.querySelectorAll(selector).forEach(element => {
    const split = new SplitText(element, { type: 'lines' });
    
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
    
    gsap.from(split.lines, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      },
      yPercent: 100,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
    });
  });
}
```

#### 2. Scroll-Linked Text Effects

```javascript
// Parallax Text - Text moves at different speed than scroll
export function parallaxText(selector, speed = 0.5) {
  document.querySelectorAll(selector).forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
    });
  });
}

// Scale on Scroll - Text scales as user scrolls
export function scaleOnScroll(selector, scaleRange = [0.8, 1]) {
  document.querySelectorAll(selector).forEach(element => {
    gsap.fromTo(element, 
      { scale: scaleRange[0] },
      {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
        },
        scale: scaleRange[1],
        ease: 'none',
      }
    );
  });
}

// Opacity Fade - Text fades in as it enters viewport
export function opacityFade(selector) {
  document.querySelectorAll(selector).forEach(element => {
    gsap.fromTo(element,
      { opacity: 0 },
      {
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
        opacity: 1,
        ease: 'none',
      }
    );
  });
}

// Text Blur Reveal - Text starts blurred and sharpens
export function blurReveal(selector) {
  document.querySelectorAll(selector).forEach(element => {
    gsap.fromTo(element,
      { filter: 'blur(20px)', opacity: 0 },
      {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        },
        filter: 'blur(0px)',
        opacity: 1,
        ease: 'power2.out',
      }
    );
  });
}
```

#### 3. Hover Micro-Interactions

```javascript
// Magnetic Text - Text subtly follows cursor
export function magneticText(selector, strength = 0.3) {
  document.querySelectorAll(selector).forEach(element => {
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

// Underline Draw - Animated underline on hover
export function underlineDraw(selector) {
  document.querySelectorAll(selector).forEach(element => {
    const underline = document.createElement('span');
    underline.className = 'text-underline';
    underline.style.cssText = `
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    element.style.position = 'relative';
    element.appendChild(underline);
    
    element.addEventListener('mouseenter', () => {
      underline.style.transformOrigin = 'left';
      underline.style.transform = 'scaleX(1)';
    });
    
    element.addEventListener('mouseleave', () => {
      underline.style.transformOrigin = 'right';
      underline.style.transform = 'scaleX(0)';
    });
  });
}

// Letter Spacing Expand - Letters spread on hover
export function letterSpacingExpand(selector) {
  document.querySelectorAll(selector).forEach(element => {
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
        letterSpacing: originalSpacing,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    });
  });
}
```

#### 4. Special Text Effects

```javascript
// Gradient Text Animation - Animated gradient background on text
export function gradientTextAnimation(selector) {
  document.querySelectorAll(selector).forEach(element => {
    element.style.cssText = `
      background: linear-gradient(
        90deg,
        var(--earth-terracotta) 0%,
        var(--earth-clay) 25%,
        var(--earth-warmBrown) 50%,
        var(--earth-clay) 75%,
        var(--earth-terracotta) 100%
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

// Typewriter Effect - Text types out character by character
export function typewriter(selector, options = {}) {
  const defaults = {
    speed: 0.05,
    delay: 0,
    cursor: true,
  };
  
  const config = { ...defaults, ...options };
  
  document.querySelectorAll(selector).forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    if (config.cursor) {
      element.style.borderRight = '2px solid currentColor';
    }
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
      delay: config.delay,
    });
    
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
  });
}

// Scramble Text - Text scrambles before revealing
export function scrambleText(selector) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  document.querySelectorAll(selector).forEach(element => {
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
```

---

## Component-Level Implementation

### Navigation Typography

```html
<!-- Logo -->
<a href="index.html" class="logo">
  <span class="logo-primary" data-animate="magnetic">EARTHY</span>
  <span class="logo-secondary" data-animate="magnetic">MUNCHY</span>
  <span class="logo-trademark">™</span>
</a>

<!-- Nav Links -->
<nav class="nav-links">
  <a href="story.html" class="nav-link" data-animate="underline-draw">Our Story</a>
  <a href="#products" class="nav-link" data-animate="underline-draw">Products</a>
</nav>
```

```css
.logo-primary {
  font-family: var(--font-heading);
  font-size: var(--text-heading-4);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
}

.logo-secondary {
  font-family: var(--font-subheading);
  font-size: var(--text-heading-4);
  font-weight: 400;
  letter-spacing: var(--tracking-normal);
}

.logo-trademark {
  font-size: 0.5em;
  vertical-align: super;
  font-weight: 400;
}

.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--earth-warmBrown);
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--earth-terracotta);
}
```

### Hero Section Typography

```html
<header class="hero">
  <h1 class="hero-headline" data-animate="line-reveal">
    <span class="hero-line-1">From Native Roots to</span>
    <span class="hero-line-2" data-animate="gradient-text">Global Hearts.</span>
  </h1>
</header>
```

```css
.hero-headline {
  font-family: var(--font-heading);
  font-weight: 300;
  line-height: var(--leading-tight);
}

.hero-line-1 {
  font-size: var(--text-display-medium);
  color: var(--earth-cream);
  opacity: 0.9;
  display: block;
  letter-spacing: var(--tracking-tight);
}

.hero-line-2 {
  font-size: var(--text-display-hero);
  font-style: italic;
  font-weight: 500;
  display: block;
  /* Gradient will be applied via JS */
}
```

### Section Headers

```html
<section class="section">
  <span class="section-overline" data-animate="fade-up">The Earthy Munchy Promise</span>
  <h2 class="section-title" data-animate="word-slide">
    "We don't source ingredients.<br>
    <span class="text-accent">We find stories."</span>
  </h2>
</section>
```

```css
.section-overline {
  font-family: var(--font-body);
  font-size: var(--text-overline);
  font-weight: 700;
  letter-spacing: var(--tracking-mega);
  text-transform: uppercase;
  color: var(--earth-terracotta);
  margin-bottom: 1.5rem;
  display: block;
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--text-heading-1);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
}

.text-accent {
  font-style: italic;
  color: var(--earth-sage);
}
```

### Product Cards

```html
<article class="product-card">
  <span class="product-category" data-animate="letter-spacing">Native Sri Lankan</span>
  <h3 class="product-name" data-animate="blur-reveal">Ceylon Cinnamon</h3>
  <p class="product-description">True Cinnamon (C5) & Cloves.</p>
  <span class="product-price">₹550</span>
</article>
```

```css
.product-category {
  font-family: var(--font-body);
  font-size: var(--text-overline);
  font-weight: 700;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--earth-terracotta);
}

.product-name {
  font-family: var(--font-heading);
  font-size: var(--text-heading-2);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin: 0.5rem 0;
}

.product-description {
  font-family: var(--font-body);
  font-size: var(--text-body-base);
  color: var(--earth-warmBrown);
  line-height: var(--leading-relaxed);
}

.product-price {
  font-family: var(--font-heading);
  font-size: var(--text-heading-3);
  font-variant-numeric: tabular-nums;
  letter-spacing: var(--tracking-tight);
}
```

### Testimonial Cards

```html
<blockquote class="testimonial">
  <p class="testimonial-quote" data-animate="character-cascade">
    "The C5 cinnamon smells like a spice shop in Colombo."
  </p>
  <footer class="testimonial-author">
    <span class="author-name">Arjun M.</span>
    <span class="author-location">Bangalore</span>
  </footer>
</blockquote>
```

```css
.testimonial-quote {
  font-family: var(--font-heading);
  font-size: var(--text-heading-4);
  font-style: italic;
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
}

.author-name {
  font-family: var(--font-body);
  font-size: var(--text-overline);
  font-weight: 700;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

.author-location {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  color: var(--earth-text);
  opacity: 0.6;
}
```

---

## Page-by-Page Implementation Guide

### 1. Homepage (index.html) - ✅ COMPLETED

**Typography Changes Applied:**
- ✅ Hero headline: line-reveal animation with staggered delays
- ✅ Hero subtext: blur-reveal effect with enhanced visibility (text-earth-cream/90)
- ✅ CTA button: Magnetic text effect with strength 0.2
- ✅ Harvest Cycle panels: Parallax text on "ORIGIN", "WILD", "CRAFT" with white text-outline
- ✅ All panel content: White text (text-white/85) for proper contrast on video backgrounds
- ✅ Panel headings: White text for visibility
- ✅ Product grid titles: blur-reveal animation
- ✅ Manifesto section: line-reveal on quote, white text throughout
- ✅ Trust marquee: CSS animation maintained
- ✅ Testimonials: scramble-text reveal effect, white text for readability
- ✅ All author names: white/70 opacity for subtle contrast

**Visibility Improvements:**
- Hero tagline: Changed from text-earth-cream/70 to text-earth-cream/90
- Harvest panels: All text changed to white/white-85% on dark video backgrounds
- Manifesto: Enhanced from text-earth-cream/70 to text-white/80
- Testimonials: All quotes and names now use white text
- Call-to-action in Panel 4: Changed to white with border-2 for emphasis

**Motion Choreography:**
```javascript
// Homepage Animation Timeline - IMPLEMENTED
- Hero: line-reveal → blur-reveal → fade-up (staggered 0.3s, 0.5s)
- Harvest: parallax on large text, fade-up on body content
- Products: fade-up with 0.15s stagger
- Manifesto: line-reveal → fade-up (0.3s, 0.5s delays)
- Testimonials: scramble text on scroll trigger
```

### 2. Story Page (story.html)

**Typography Changes:**
- Hero: Typewriter effect on tagline "The Origin"
- Founder quote: Line-by-line reveal with mask
- Pull quotes: Magnetic text effect
- Map section titles: Blur reveal
- Testimonials: Staggered word-slide

### 3. Product Pages (product-cinnamon.html, product-honey.html)

**Typography Changes:**
- Product title: Scramble text on variant change
- Price: Number counter animation when switching variants
- Grade labels: Letter-spacing expand on hover
- Detail labels: Fade-in stagger

### 4. Shop Pages (shop.html, shop-spices.html, shop-honey.html)

**Typography Changes:**
- Category headers: Line reveal
- Product names: Blur reveal on hover
- Price displays: Tabular numerics with subtle scale on change
- Honey section titles: Parallax on scroll

### 5. Contact Page (contact.html)

**Typography Changes:**
- Header: Word slide animation
- Form labels: Subtle fade-up on focus
- Submit button: Magnetic + letter-spacing animation

---

## Performance Optimization

### Font Loading Strategy

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/TeX-Gyre-Termes/texgyretermes-regular.otf" as="font" type="font/otf" crossorigin>
<link rel="preload" href="/fonts/Solway/Solway-Regular.ttf" as="font" type="font/truetype" crossorigin>

<!-- Font-display: swap for better perceived performance -->
<style>
  @font-face {
    font-family: 'Tex Gyre Termes';
    src: url('/fonts/TeX-Gyre-Termes/texgyretermes-regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
</style>
```

### Animation Performance

1. **Use `will-change` sparingly**: Only on elements about to animate
2. **Prefer `transform` and `opacity`**: Hardware-accelerated properties
3. **Batch DOM reads/writes**: Avoid layout thrashing in animation loops
4. **Use `requestAnimationFrame`**: For any custom animation logic
5. **Lazy-load GSAP plugins**: SplitText only when needed

```javascript
// Lazy load SplitText only when needed
async function loadSplitText() {
  if (!window.SplitText) {
    const { SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(SplitText);
  }
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  initAnimations();
}
```

---

## Accessibility Considerations

### Typography Accessibility

1. **Minimum font size**: 16px base (achieved with fluid scale)
2. **Line height**: Minimum 1.5 for body text
3. **Color contrast**: All text meets WCAG AA (4.5:1 for normal text)
4. **Focus indicators**: Clear focus states on all interactive text
5. **Readable fonts**: Avoiding decorative fonts for body copy

### Animation Accessibility

1. **Respect `prefers-reduced-motion`**: Disable or minimize animations
2. **No essential content in animations**: Text reveals shouldn't hide content
3. **Pause/stop controls**: For any continuous animations
4. **Avoid flashing**: No rapid color/brightness changes

---

## Implementation Timeline

### Phase 1: Foundation (Week 1)

- [ ] Create CSS custom properties for typography tokens
- [ ] Implement fluid type scale
- [ ] Set up line-height and letter-spacing tokens
- [ ] Consolidate font loading (remove CDN duplicates)
- [ ] Create base typography utility classes

### Phase 2: Core Animations (Week 2)

- [ ] Set up GSAP animation module structure
- [ ] Implement line-reveal animation
- [ ] Implement word-slide animation
- [ ] Implement blur-reveal animation
- [ ] Add scroll-triggered activation

### Phase 3: Advanced Effects (Week 3)

- [ ] Implement character cascade (requires SplitText)
- [ ] Implement gradient text animation
- [ ] Implement scramble text effect
- [ ] Implement typewriter effect
- [ ] Add parallax text system

### Phase 4: Micro-interactions (Week 4)

- [ ] Implement magnetic text effect
- [ ] Implement underline-draw hover
- [ ] Implement letter-spacing expand
- [ ] Add button hover animations
- [ ] Polish navigation interactions

### Phase 5: Page Integration (Week 5-6)

- [x] Apply to homepage (index.html) - COMPLETED January 18, 2026
  - [x] Typography tokens applied
  - [x] Hero section: line-reveal, blur-reveal, fade-up animations
  - [x] Hero tagline: Enhanced visibility (text-earth-cream/90)
  - [x] Harvest Cycle panels: Parallax text, proper white text colors
  - [x] Panel text visibility: All text changed to white/white-85% for readability
  - [x] Product section: fade-up with staggered delays
  - [x] Manifesto section: line-reveal, fade-up, proper white colors
  - [x] Testimonials: scramble text animation, white text for readability
  - [x] All dark background sections audited for text visibility
- [ ] Apply to story page
- [ ] Apply to product pages
- [ ] Apply to shop pages
- [ ] Apply to contact page

### Phase 6: Testing & Optimization (Week 7)

- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance profiling
- [ ] Accessibility audit
- [ ] Reduced motion testing

---

## Technical Specifications

### Dependencies

```json
{
  "dependencies": {
    "gsap": "^3.13.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.18"
  }
}
```

**Note**: SplitText requires GSAP Club GreenSock membership. Alternative: Use CSS-only text splitting or a free library like `splitting.js`.

### File Structure

```
/public
  /fonts
    /TeX-Gyre-Termes
    /Solway
    /Lato (if using local)
  tailwind-fonts.css      # Font face declarations
  
/src
  /styles
    typography.css         # Typography tokens & utilities
    animations.css         # Animation keyframes
    
  /js
    text-animations.js     # GSAP text animation library
    init-animations.js     # Page-specific initialization
```

### Tailwind Configuration Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Tex Gyre Termes', 'serif'],
        subheading: ['Solway', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      fontSize: {
        // Fluid type scale using clamp()
        'display-hero': 'clamp(3.5rem, 8vw + 1rem, 9rem)',
        'display-large': 'clamp(3rem, 6vw + 1rem, 7.5rem)',
        'display-medium': 'clamp(2.5rem, 5vw + 0.5rem, 5rem)',
        // ... etc
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '1.75',
      },
      letterSpacing: {
        'tighter': '-0.03em',
        'tight': '-0.015em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'mega': '0.2em',
      },
    },
  },
};
```

---

## Conclusion

This implementation plan provides a comprehensive roadmap for transforming Earthy Munchy's typography and motion design from functional to exceptional. By systematically implementing the design tokens, animation library, and page-specific enhancements, the website will achieve a premium, immersive experience that reflects the brand's artisanal positioning.

The key principles guiding this implementation are:

1. **Consistency**: A unified type scale and motion language across all pages
2. **Performance**: Optimized font loading and animation efficiency
3. **Accessibility**: Respecting user preferences and WCAG guidelines
4. **Storytelling**: Using motion to enhance, not distract from, content
5. **Maintainability**: Modular, reusable code patterns

The estimated timeline is 7 weeks for full implementation, with Phase 1-2 providing immediate visual improvements that can be deployed incrementally.

---

*Document prepared for Earthy Munchy design system v2.0 implementation.*
