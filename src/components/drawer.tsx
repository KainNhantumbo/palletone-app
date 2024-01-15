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
      animate={{ y: 0, }}
      transition={{ delay: 0.6, duration: .6 }}
     className='w-full min-h-12 flex items-center rounded-3xl justify-center fixed px-2 z-50 bottom-2'>
      <div className='w-fit h-full flex items-center justify-between mx-auto max-w-5xl rounded-3xl bg-foreground-default/80 backdrop-blur-md py-2 pb-3 base-shadow px-3'>
        <div className='flex items-center gap-2'>
          {routes.map((route, i) => (
            <Link
              to={route.path}
              key={i}
              className={cn('relative', {
                'before:absolute before:w-8 before:h-1 before:-bottom-2 before:left-[calc(50%_-_16px)] before:bg-blue-400 before:rounded-full':
                  location.href.includes(route.alias)
              })}>
              <Button
                className='group gap-2 rounded-3xl border-font/15'
                variant={'outline'}>
                <route.icon
                  className={cn(
                    'group-hover:stroke-primary-default group-active:stroke-blue-400 transition-colors w-5 h-auto relative'
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
