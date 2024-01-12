import { toast } from 'sonner';
import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

type Props = { children: ReactNode };

type ThemeVariants = 'light' | 'dark';

type Context = {
  theme: ThemeVariants;
  setTheme: () => void;
};

const context = createContext<Context>({
  theme: 'light',
  setTheme: () => {}
});

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorage<ThemeVariants>('ui-theme', 'light');

  const toggleTheme = () => {
    const html = document.querySelector('html');
    if (!html) return toast.error('Failed to change theme');
    const currentTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('class', currentTheme);
    setTheme(currentTheme);
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
    <context.Provider value={{ theme, setTheme: toggleTheme }}>
      {children}
    </context.Provider>
  );
};

export const useTheme = () => useContext(context);
