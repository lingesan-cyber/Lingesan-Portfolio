import Lenis from 'lenis';

let globalLenisInstance: Lenis | null = null;

/**
 * Stores the global Lenis instance initialized at App layout level.
 */
export const setGlobalLenis = (instance: Lenis) => {
  globalLenisInstance = instance;
};

/**
 * Accessor hook for the smooth scroller instance.
 */
export const useLenis = () => {
  const scrollTo = (
    target: string | HTMLElement | number, 
    options?: {
      offset?: number;
      immediate?: boolean;
      duration?: number;
      easing?: (t: number) => number;
    }
  ) => {
    if (globalLenisInstance) {
      globalLenisInstance.scrollTo(target, {
        offset: options?.offset || 0,
        immediate: options?.immediate || false,
        duration: options?.duration || 1.2,
        easing: options?.easing || ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))), // easeOutExpo
      });
    } else {
      // Fallback if lenis is not yet mounted or failed to load
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  };

  const getLenis = () => globalLenisInstance;

  const stop = () => {
    globalLenisInstance?.stop();
  };

  const start = () => {
    globalLenisInstance?.start();
  };

  return { scrollTo, getLenis, stop, start };
};

export default useLenis;
