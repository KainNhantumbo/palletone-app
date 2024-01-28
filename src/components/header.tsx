import logoImage from '@/assets/favicon.png';
import { PocketIcon, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { TooltipWrapper } from './tooltip-wrapper';

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
          onClick={() => navigate('/')}>
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
          <Link to={'/saved'}>
            <TooltipWrapper content="Saved colors">
              <Button variant={'ghost'} size={'icon'} className="group rounded-full">
                <PocketIcon className="h-auto w-5 transition-colors group-hover:stroke-primary-default group-active:stroke-blue-400" />
              </Button>
            </TooltipWrapper>
          </Link>
          <Link to={'/preferences'}>
            <TooltipWrapper content="Preferences">
              <Button variant={'ghost'} size={'icon'} className="group rounded-full">
                <Settings2 className="h-auto w-5 transition-colors group-hover:stroke-primary-default group-active:stroke-blue-400" />
              </Button>
            </TooltipWrapper>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
