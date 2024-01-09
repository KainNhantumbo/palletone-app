import { BookmarkCheckIcon, PaintBucketIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ColorWheelIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const routes = [
  { path: '/palletes', icon: PaintBucketIcon, label: 'Palletes' },
  { path: '/swatch', icon: ColorWheelIcon, label: 'Swatch' },
  { path: '/saved', icon: BookmarkCheckIcon, label: 'Saved' }
];

export const Drawer = () => {
  return (
    <section className='w-full min-h-12 flex items-center rounded-lg justify-center fixed px-2 z-50 bottom-2'>
      <div className='w-fit h-full flex items-center justify-between mx-auto max-w-5xl rounded-lg bg-foreground-default/80 backdrop-blur-md py-2 base-shadow px-3 base-border'>
        <div className='flex items-center gap-2'>
          {routes.map((route) => (
            <Link to={route.path}>
              <Button className='group gap-2' variant={'outline'}>
                <route.icon className='group-hover:stroke-primary-default group-active:stroke-blue-400 transition-colors w-5 h-auto' />
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
