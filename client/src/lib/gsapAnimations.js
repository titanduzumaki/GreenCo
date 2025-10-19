import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Common animation configurations
export const animationConfig = {
  duration: 1.2,
  ease: "power3.out",
  stagger: 0.2,
};

// Performance optimization settings
const performanceSettings = {
  reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  isMobile: window.innerWidth < 768,
  isLowEnd: navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4,
};

// Adjust animation settings based on device performance
const getOptimizedConfig = (config) => {
  if (performanceSettings.reduceMotion) {
    return { ...config, duration: 0.1, ease: "none" };
  }
  if (performanceSettings.isMobile || performanceSettings.isLowEnd) {
    return { ...config, duration: config.duration * 0.7 };
  }
  return config;
};

// Fade in from bottom animation
export const fadeInUp = (elements, options = {}) => {
  if (!elements || elements.length === 0) return;

  const config = getOptimizedConfig({ ...animationConfig, ...options });

  gsap.fromTo(
    elements,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    }
  );
};

// Fade in from left animation
export const fadeInLeft = (elements, options = {}) => {
  if (!elements || elements.length === 0) return;

  const config = getOptimizedConfig({ ...animationConfig, ...options });

  gsap.fromTo(
    elements,
    {
      x: -100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    }
  );
};

// Fade in from right animation
export const fadeInRight = (elements, options = {}) => {
  const config = { ...animationConfig, ...options };

  gsap.fromTo(
    elements,
    {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Scale in animation
export const scaleIn = (elements, options = {}) => {
  const config = { ...animationConfig, ...options };

  gsap.fromTo(
    elements,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Rotate in animation
export const rotateIn = (elements, options = {}) => {
  const config = { ...animationConfig, ...options };

  gsap.fromTo(
    elements,
    {
      rotation: 180,
      opacity: 0,
      scale: 0.5,
    },
    {
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Text reveal animation
export const textReveal = (elements, options = {}) => {
  const config = { ...animationConfig, ...options };

  gsap.fromTo(
    elements,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: 0.1,
      scrollTrigger: {
        trigger: elements,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Parallax effect
export const parallaxEffect = (elements, speed = 0.5) => {
  gsap.to(elements, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: elements,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Counter animation
export const animateCounter = (elements, options = {}) => {
  const config = { ...animationConfig, ...options };

  elements.forEach((element) => {
    const endValue = parseInt(element.textContent.replace(/\D/g, ""));
    const suffix = element.textContent.replace(/\d/g, "");

    gsap.fromTo(
      element,
      { textContent: 0 },
      {
        textContent: endValue,
        duration: config.duration,
        ease: config.ease,
        snap: { textContent: 1 },
        onUpdate: function () {
          element.textContent =
            Math.ceil(this.targets()[0].textContent) + suffix;
        },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

// Image reveal animation
export const imageReveal = (elements, options = {}) => {
  const config = { ...animationConfig, ...options };

  gsap.fromTo(
    elements,
    {
      scale: 1.2,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Card hover animation
export const cardHover = (elements) => {
  elements.forEach((card) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(card, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });

    card.addEventListener("mouseenter", () => tl.play());
    card.addEventListener("mouseleave", () => tl.reverse());
  });
};

// Page entrance animation
export const pageEntrance = (elements) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
    }
  );
};

// Cleanup function
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Utility function to apply performance optimizations to all animations
export const optimizeAnimations = () => {
  // Disable animations on low-end devices
  if (performanceSettings.isLowEnd) {
    gsap.globalTimeline.timeScale(2);
  }

  // Reduce motion for accessibility
  if (performanceSettings.reduceMotion) {
    gsap.globalTimeline.timeScale(0.1);
  }
};

// Initialize performance optimizations
optimizeAnimations();
