'use client';

import { useEffect, useState } from 'react';

export const useInnerWindowSize = () => {
  const [innerWindowSize, setInnerWindowSize] = useState({
    width: 0,
    height: 0
  });

  const computeInnerWindowSize = (): void => {
    setInnerWindowSize({
      width: +window.innerWidth.toFixed(0),
      height: +window.innerHeight.toFixed(0)
    });
  };

  useEffect(() => {
    computeInnerWindowSize();
    window.addEventListener('resize', computeInnerWindowSize);
    return () => {
      window.removeEventListener('resize', computeInnerWindowSize);
    };
  }, []);

  return innerWindowSize;
};
