import ThemeContext from './ThemeContext';
import { ReactNode, useEffect } from 'react';
import { updateSizes } from '@/state/slices/innerWindowSizeSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';

type Props = { children: ReactNode };

export default function AppContext({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const computeInnerWindowSize = (): void => {
    dispatch(
      updateSizes({
        width: Number(window.innerWidth.toFixed(0)),
        height: Number(window.innerHeight.toFixed(0))
      })
    );
  };

  useEffect(() => {
    computeInnerWindowSize();
    window.addEventListener('resize', computeInnerWindowSize);
    return () => {
      window.removeEventListener('resize', computeInnerWindowSize);
    };
  }, []);

  return <ThemeContext>{children}</ThemeContext>;
}
