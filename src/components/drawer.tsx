import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { cn } from '@/lib/utils';
import type { RouteList } from '@/types';
import { m as motion } from 'framer-motion';
import { BlocksIcon, PaintBucketIcon, PyramidIcon, SunDimIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';

const routes: RouteList = [
  {
    path: '/?r=default-colors',
    alias: 'default-colors',
    icon: PyramidIcon,
    label: 'Colors',
    description: 'Default colors'
  },
  {
    path: '/palettes',
    alias: 'palettes',
    icon: PaintBucketIcon,
    label: 'Palettes',
    description: 'Solid colors and gradients'
  },
  {
    path: '/color-extractor',
    alias: 'color-extractor',
    icon: BlocksIcon,
    label: 'Extractor',
    description: 'Color extrator'
  },
  {
    path: '/harmony-colors',
    alias: 'harmony-colors',
    icon: SunDimIcon,
    label: 'Harmony',
    description: 'Color harmony'
  }
];

export const Drawer = () => {
  useNavigate();

  return (
    <motion.footer
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed bottom-2 z-50 flex min-h-12 w-full items-center justify-center rounded-3xl px-2">
      <Dock className="base-border mx-auto flex h-full w-fit max-w-5xl items-center justify-between gap-12 rounded-3xl bg-foreground-default/80 px-6 backdrop-blur-md">
        {routes.map((route, idx) => (
          <Link
            to={route.path}
            key={idx}
            viewTransition
            className={cn('relative', {
              'before:absolute before:-bottom-2 before:left-[calc(50%_-_4px)] before:h-1 before:w-2 before:rounded-full before:bg-blue-400 min-[540px]:before:left-[calc(50%_-_16px)] min-[540px]:before:w-8':
                window.location.href.includes(route.alias)
            })}>
            <DockItem>
              <DockLabel>{route.description}</DockLabel>
              <DockIcon
                label={route.label}
                className={cn(
                  'relative h-auto w-5 transition-colors group-hover:stroke-primary-default group-active:stroke-blue-400'
                )}>
                <route.icon />
              </DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </motion.footer>
  );

  return (
    <motion.footer
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed bottom-2 z-50 flex min-h-12 w-full items-center justify-center rounded-3xl px-2">
      <div className="base-shadow mx-auto flex h-full w-fit max-w-5xl items-center justify-between rounded-3xl bg-foreground-default/80 px-3 py-2 pb-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {routes.map((route, i) => (
            <Link
              to={route.path}
              key={i}
              viewTransition
              className={cn('relative', {
                'before:absolute before:-bottom-2 before:left-[calc(50%_-_4px)] before:h-1 before:w-2 before:rounded-full before:bg-blue-400 min-[540px]:before:left-[calc(50%_-_16px)] min-[540px]:before:w-8':
                  window.location.href.includes(route.alias)
              })}>
              <TooltipWrapper content={route.description}>
                <Button
                  className="group gap-2 rounded-3xl border-font/15 bg-transparent"
                  variant={'outline'}>
                  <route.icon
                    className={cn(
                      'relative h-auto w-5 transition-colors group-hover:stroke-primary-default group-active:stroke-blue-400'
                    )}
                  />
                  <span className="hidden font-semibold group-active:text-blue-400 min-[540px]:block">
                    {route.label}
                  </span>
                </Button>
              </TooltipWrapper>
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};
