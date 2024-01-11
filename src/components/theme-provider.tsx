import { toast } from 'sonner';
import { useLocalStore } from '@/hooks/local-store';
import { ReactNode, createContext, useContext, useEffect } from 'react';

type Props = { children: ReactNode };

type Theme = { theme: 'light' | 'dark' };

type Context = {
  theme: Theme;
  setTheme: () => void;
};

const context = createContext<Context>({
  theme: { theme: 'light' },
  setTheme: () => {}
});

export const ThemeProvider = ({ children }: Props) => {
  const {
    value: { theme },
    setValue: setTheme
  } = useLocalStore<Theme>('ui-theme', { theme: 'light' });

  const toggleTheme = () => {
    const html = document.querySelector('html');
    if (!html) return toast.error('Failed to change theme');
    const currentTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('class', currentTheme);
    setTheme({ theme: currentTheme });
  };

  const onLoad = () => {
    const html = document.querySelector('html');
    if (!html) return toast.error('Failed to change theme');
    html.setAttribute('class', theme);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <context.Provider value={{ theme: { theme }, setTheme: toggleTheme }}>
      {children}
    </context.Provider>
  );
};

export const useTheme = () => useContext(context);
