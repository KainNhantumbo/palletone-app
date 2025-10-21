import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { Header } from './header';
import { Drawer } from './drawer';
import { Toaster } from '@/components/ui/sonner';

type Props = { children: ReactNode };

export const Layout = ({ children }: Props) => {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion strict={true} features={domAnimation}>
        <Header />
        {children}
        <Drawer />
        <Toaster closeButton loadingIcon />
      </LazyMotion>
    </MotionConfig>
  );
};
