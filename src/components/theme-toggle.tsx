import { SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './theme-provider';
import { MoonIcon } from '@radix-ui/react-icons';

export const ThemeToggle = () => {
  const { setTheme: onClick } = useTheme();

  return (
    <Button
      variant='ghost'
      size='icon'
      className='p-0 group bg-transparent'
      onClick={onClick}>
      <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-120 scale-100 transition-all dark:rotate-0 dark:scale-0' />
      <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100' />
    </Button>
  );
};
