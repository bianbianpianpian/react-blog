import React from 'react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    let enabled = true
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', () => {
      if (enabled) {
        enabled = false;
        window.requestAnimationFrame(toggleVisibility);
        // 每隔50秒触发一次，提高性能
        setTimeout(() => enabled = true, 50);
      }
    });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return <>{isVisible && <div onClick={scrollToTop} className="to-top"></div>}</>;
}
