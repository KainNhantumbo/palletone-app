import { Button } from '@/components/ui/button';
import { MoonIcon } from '@radix-ui/react-icons';
import { SunIcon } from 'lucide-react';
import { useTheme } from './theme-provider';
import { TooltipWrapper } from './tooltip-wrapper';

export const ThemeToggle = () => {
  const { setTheme: onClick } = useTheme();

  return (
    <div className="base-border w-16 min-w-16 rounded-full bg-background-default px-1 py-[3px]">
      <TooltipWrapper content="Toggle theme">
        <Button
          variant="ghost"
          size="icon"
          className="base-border group h-auto w-fit rounded-full bg-foreground-default p-1 transition-transform dark:translate-x-7"
          onClick={onClick}>
          <MoonIcon className="rotate-120 absolute h-auto w-4 scale-100 transition-all dark:rotate-0 dark:scale-0" />
          <SunIcon className="h-auto w-4 rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
        </Button>
      </TooltipWrapper>
    </div>
  );
};
