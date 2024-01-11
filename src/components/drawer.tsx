import { BookmarkCheckIcon, HomeIcon, PaintBucketIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ColorWheelIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const routes = [
  { path: '/?r=colors', alias: 'colors', icon: HomeIcon, label: 'Colors' },
  {
    path: '/palettes',
    alias: 'palettes',
    icon: PaintBucketIcon,
    label: 'Palettes'
  },
  { path: '/swatch', alias: 'swatch', icon: ColorWheelIcon, label: 'Swatch' },
  { path: '/saved', alias: 'saved', icon: BookmarkCheckIcon, label: 'Saved' }
];

export const Drawer = () => {
  return (
    <section className='w-full min-h-12 flex items-center rounded-lg justify-center fixed px-2 z-50 bottom-2'>
      <div className='w-fit h-full flex items-center justify-between mx-auto max-w-5xl rounded-lg bg-foreground-default/80 backdrop-blur-md py-2 pb-3 base-shadow px-3'>
        <div className='flex items-center gap-2'>
          {routes.map((route, i) => (
            <Link
              to={route.path}
              key={i}
              className={cn('relative', {
                'before:absolute before:w-8 before:h-1 before:-bottom-2 before:left-[calc(50%_-_16px)] before:bg-blue-400 before:rounded-full':
                  location.href.includes(route.alias)
              })}>
              <Button className='group gap-2' variant={'outline'}>
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
    </section>
  );
};
