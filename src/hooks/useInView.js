import { useCallback, useEffect, useRef, useState } from 'react';

const useInView = (
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }
) => {
  const [inView, setInView] = useState(false);
  const targetRef = useRef(null);

  const isMounted = useRef(true);

  const inViewRef = useCallback((node) => {
    if (node) {
      targetRef.current = node;
    }
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (isMounted.current) {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            setInView(false);
          }
        }
      });
    }, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
  }, [options]);

  return { ref: targetRef, inView, inViewRef };
};

export default useInView;
