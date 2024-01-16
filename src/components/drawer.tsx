import {
  Pocket,
  BlocksIcon,
  PyramidIcon,
  PaintBucketIcon,
  SunDimIcon,
  type LucideIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { m as motion } from 'framer-motion';

type RouteList = Array<{
  path: string;
  alias: string;
  icon: LucideIcon;
  label: string;
}>;

const routes: RouteList = [
  { path: '/?r=colors', alias: 'colors', icon: PyramidIcon, label: 'Colors' },
  {
    path: '/palettes',
    alias: 'palettes',
    icon: PaintBucketIcon,
    label: 'Palettes'
  },
  {
    path: '/color-extractor',
    alias: 'color-extractor',
    icon: BlocksIcon,
    label: 'Extractor'
  },
  {
    path: '/harmony-colors',
    alias: 'harmony-colors',
    icon: SunDimIcon,
    label: 'Harmony'
  },
  { path: '/saved', alias: 'saved', icon: Pocket, label: 'Saved' }
];

export const Drawer = () => {
  return (
    <motion.footer
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className='fixed bottom-2 z-50 flex min-h-12 w-full items-center justify-center rounded-3xl px-2'>
      <div className='base-shadow mx-auto flex h-full w-fit max-w-5xl items-center justify-between rounded-3xl bg-foreground-default/80 px-3 py-2 pb-3 backdrop-blur-md'>
        <div className='flex items-center gap-2'>
          {routes.map((route, i) => (
            <Link
              to={route.path}
              key={i}
              className={cn('relative', {
                'before:absolute before:-bottom-2 before:left-[calc(50%_-_16px)] before:h-1 before:w-8 before:rounded-full before:bg-blue-400':
                  location.href.includes(route.alias)
              })}>
              <Button
                className='group gap-2 rounded-3xl border-font/15 bg-transparent'
                variant={'outline'}>
                <route.icon
                  className={cn(
                    'relative h-auto w-5 transition-colors group-hover:stroke-primary-default group-active:stroke-blue-400'
                  )}
                />
                <span className='font-semibold group-active:text-blue-400'>
                  {route.label}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};
