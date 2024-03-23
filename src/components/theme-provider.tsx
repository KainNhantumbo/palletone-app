import { useLocalStorage } from '@uidotdev/usehooks';
import * as React from 'react';
import { toast } from 'sonner';

type ThemeVariants = 'light' | 'dark';

type Context = { theme: ThemeVariants; setTheme: () => void };

const context = React.createContext<Context>({ theme: 'light', setTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<ThemeVariants>('ui-theme', 'light');

  const toggleTheme = () => {
    const html = document.querySelector('html');
    if (!html) return toast.error('Failed to change theme');
    const currentTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('class', currentTheme);
    setTheme(currentTheme);
  };

  const onLoad = React.useCallback(() => {
    const html = document.querySelector('html');
    if (!html) return toast.error('Failed to change theme');
    html.setAttribute('class', theme);
  }, [theme]);

  React.useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <context.Provider value={{ theme, setTheme: toggleTheme }}>{children}</context.Provider>
  );
};

export const useTheme = () => React.useContext(context);
