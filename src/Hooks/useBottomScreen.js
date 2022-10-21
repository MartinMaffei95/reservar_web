import React, { useEffect, useRef } from 'react';

const useBottomScreen = () => {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer;

    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setIsOnScreen(true);
        observer.disconnect();
      }
    };

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: '0px',
      });
      observer.observe(fromRef.current);
    });
    return () => observer && observer.disconnect();
  }, []);
  return { isOnScreen, fromRef };
};

export default useBottomScreen;
