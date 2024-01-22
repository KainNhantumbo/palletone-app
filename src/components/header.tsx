import logoImage from '@/assets/favicon.png';
import { PocketIcon, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { m as motion } from 'framer-motion';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -500 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3 }}
      className='w-full min-h-20 flex items-center justify-center fixed px-2 z-50'>
      <div className='w-full h-full flex items-center justify-between mx-auto max-w-4xl base-shadow rounded-3xl backdrop-blur-md bg-foreground-default/80 py-2 px-4'>
        <div
          className='flex items-center gap-4 select-none cursor-pointer'
          onClick={() => navigate('/')}>
          <img
            src={logoImage}
            loading='lazy'
            decoding='async'
            className='w-[28px] h-auto '
          />
          <h1 className='font-semibold font-sans-display text-xl text-primary-default'>
            Palletone
          </h1>
        </div>

        <div className='flex items-center gap-2'>
          <Link to={'/saved'} >
            <Button
              variant={'ghost'}
              size={'icon'}
              className='group rounded-full'>
              <PocketIcon className='group-hover:stroke-primary-default group-active:stroke-blue-400 transition-colors w-5 h-auto' />
            </Button>
          </Link>
          <Link to={'/preferences'}>
            <Button
              variant={'ghost'}
              size={'icon'}
              className='group rounded-full'>
              <Settings2 className='group-hover:stroke-primary-default group-active:stroke-blue-400 transition-colors w-5 h-auto' />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
