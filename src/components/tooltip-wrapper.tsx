import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import type { FC, ReactNode } from 'react';

export type TooltipProps = {
  children: ReactNode;
  content: string;
  offsetDistance?: number | undefined;
};

export const TooltipWrapper: FC<TooltipProps> = ({ offsetDistance, children, content }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent sideOffset={offsetDistance}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
