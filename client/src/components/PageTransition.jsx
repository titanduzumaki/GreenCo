import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageTransition({ children }) {
  const transitionRef = useRef(null);

  useEffect(() => {
    // Page entrance animation
    const tl = gsap.timeline();

    tl.fromTo(
      transitionRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );

    return () => {
      // Page exit animation
      gsap.to(transitionRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      });
    };
  }, []);

  return (
    <div ref={transitionRef} className="page-transition">
      {children}
    </div>
  );
}
