'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAP = () => {
  const formOverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = formOverRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, { opacity: 0, y: 0, yPercent: 100 });

    return () => {
      // Cleanup
      gsap.killTweensOf(element);
    };
  }, []);

  const showForm = () => {
    if (formOverRef.current) {
      gsap.to(formOverRef.current, { 
        duration: 0.4, 
        opacity: 1, 
        yPercent: 0,
        ease: "power2.out"
      });
    }
  };

  const hideForm = () => {
    if (formOverRef.current) {
      gsap.to(formOverRef.current, { 
        duration: 0.5, 
        opacity: 0, 
        yPercent: 100,
        ease: "power2.in"
      });
    }
  };

  return { formOverRef, showForm, hideForm };
};

export const useDomainAnimations = () => {
  useEffect(() => {
    const domainItems = document.querySelectorAll('li');
    
    domainItems.forEach((element) => {
      const animation = gsap.to(element, {
        duration: 0.1,
        className: '+= superShadow',
        rotation: -1,
        scale: 1.01,
        paused: true,
        ease: "power1.easeIn"
      });

      const handleMouseEnter = () => animation.play();
      const handleMouseLeave = () => animation.reverse();

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);
};
