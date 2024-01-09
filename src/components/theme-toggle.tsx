'use client';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const ThemeToggle = () => {
  const onClick = () => {
    const html = document.querySelector('html');
    if (!html) return toast.error('Failed to change theme');
    const currentTheme = html.getAttribute('class') as
      | 'dark'
      | 'light'
      | null;
    if (currentTheme === 'dark') {
      html.setAttribute('class', 'light');
    } else {
      html.setAttribute('class', 'dark');
    }
  };


  useEffect(() => {}, []);

  return (
    <Button variant='ghost' size='icon' className='p-0 group' onClick={onClick}>
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:stroke-primary-default' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:stroke-primary-default' />
    </Button>
  );
};
