import Header from './Header';
import Footer from './Footer';
import Toast from './Toast';
import Cookies from './Cookies';
import Prompt from './Prompt';
import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

interface Props {
  children: ReactNode;
  renderHeader?: boolean;
  renderFooter?: boolean;
}

function Layout({ children, renderHeader, renderFooter }: Props) {
  const toast = useSelector((state: RootState) => (state.toast));
  const prompt = useSelector((state: RootState) => (state.prompt));

  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion strict={true} features={domAnimation}>
        {renderHeader ? <Header /> : null}
        <Cookies />
        <Toast key={toast.title.split(' ').join('') || undefined} />
        <Prompt key={prompt.title.split(' ').join('') || undefined} />
        {children}
        {renderFooter ? <Footer /> : null}
      </LazyMotion>
    </MotionConfig>
  );
}

export default Layout;
