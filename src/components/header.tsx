import logoImage from '@/assets/favicon.png';
import { Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const naviagate = useNavigate();

  return (
    <section className='w-full min-h-20 flex items-center justify-center fixed px-2 z-50'>
      <div className='w-full h-full flex items-center justify-between mx-auto max-w-4xl base-shadow rounded-lg backdrop-blur-md bg-foreground-default/80 py-2 px-4'>
        <div
          className='flex items-center gap-2 select-none cursor-pointer'
          onClick={() => naviagate('/')}>
          <img
            src={logoImage}
            loading='lazy'
            decoding='async'
            className='w-[38px] rounded-full h-auto '
          />
          <h1 className='font-semibold font-sans-display text-xl text-primary-default'>
            Palletone{' '}
            <i className='font-medium font-sans text-xs text-primary-default uppercase'>
              | Desktop
            </i>
          </h1>
        </div>

        <div className='flex items-center gap-2'>
          <Link to={'preferences'}>
            <Button variant={'ghost'} size={'icon'} className='group'>
              <Settings2 className='group-hover:stroke-primary-default group-active:stroke-blue-400 transition-colors w-5 h-auto' />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </section>
  );
};
