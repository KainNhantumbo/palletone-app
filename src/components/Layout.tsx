import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import Header from './Header';
import Drawer from './Drawer';
import { Toaster } from '@/components/ui/sonner';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion strict={true} features={domAnimation}>
        <Header />
        {children}
        <Drawer />
        <Toaster />
      </LazyMotion>
    </MotionConfig>
  );
}
