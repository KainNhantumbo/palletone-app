import logoImage from '@/assets/favicon.png';
import { m as motion } from 'framer-motion';
import { PocketIcon, RefreshCwIcon, Settings2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';

const paths = [
  { label: 'Color Converter', path: '/converter', icon: RefreshCwIcon },
  { label: 'Saved Colors', path: '/saved', icon: PocketIcon },
  { label: 'Preferences', path: '/preferences', icon: Settings2 }
];

export const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -500 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed z-50 flex min-h-20 w-full items-center justify-center px-2">
      <div className="base-shadow mx-auto flex h-full w-full max-w-4xl items-center justify-between rounded-3xl bg-foreground-default/80 px-4 py-2 backdrop-blur-md">
        <div
          className="flex cursor-pointer select-none items-center gap-4"
          onClick={() => navigate('/?r=default-colors')}>
          <img
            src={logoImage}
            loading="lazy"
            decoding="async"
            className="h-auto w-[28px] "
          />
          <h1 className="font-sans-display text-xl font-semibold text-primary-default">
            Palletone
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {paths.map((item, index) => (
            <Link to={item.path} key={index} viewTransition>
              <TooltipWrapper content={item.label}>
                <Button variant={'ghost'} size={'icon'} className="group rounded-full">
                  <span className="sr-only">{item.label}</span>
                  <item.icon className="h-auto w-5 transition-colors group-hover:stroke-primary-default group-active:stroke-blue-400" />
                </Button>
              </TooltipWrapper>
            </Link>
          ))}
        </div>
      </div>
    </motion.header>
  );
};
