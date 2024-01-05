import Prompt from './Prompt';
import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Toast from './Toast';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  const toast = useSelector((state: RootState) => state.toast);
  const prompt = useSelector((state: RootState) => state.prompt);

  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion strict={true} features={domAnimation}>
        <Toast key={toast.title.split(' ').join('') || undefined} />
        <Prompt key={prompt.title.split(' ').join('') || undefined} />
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
