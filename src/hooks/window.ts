import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  const onResize = (): void => {
    setWindowSize({
      width: +window.innerWidth.toFixed(0),
      height: +window.innerHeight.toFixed(0)
    });
  };

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return windowSize;
};
