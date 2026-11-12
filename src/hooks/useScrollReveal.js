import { useEffect } from 'react';

/**
 * Custom hook to trigger reveal animations when elements enter viewport
 * @param {string} selector - CSS class selector to observe, defaults to '.reveal-on-scroll'
 */
export function useScrollReveal(selector = '.reveal-on-scroll') {
  useEffect(() => {
    // Scroll to top on route mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for older browsers
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
}

