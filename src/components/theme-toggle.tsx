import { toast } from 'sonner';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStore } from '@/hooks/local-store';

export type Theme = { theme: 'light' | 'dark' };

export const ThemeToggle = () => {
  const {
    value: { theme },
    setValue: setTheme
  } = useLocalStore<Theme>('ui-theme', { theme: 'light' });

  const onClick = () => {
    const html = document.querySelector('html');
    if (!html) return toast.error('Failed to change theme');
    const currentTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('class', currentTheme);
    setTheme({ theme: currentTheme });
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      className='p-0 group bg-transparent'
      onClick={onClick}>
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:stroke-primary-default' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:stroke-primary-default' />
    </Button>
  );
};
