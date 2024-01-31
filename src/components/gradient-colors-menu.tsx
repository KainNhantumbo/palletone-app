import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  buildGradient,
  copyToClipboard,
  transformColorsToString
} from '@/lib/utils';
import type { ColorVariantsHeadings, RGBA } from '@/types';
import { MixedGradient } from '@/types';
import { type FC, useMemo } from 'react';
import { ClipboardCopyIcon, DropletsIcon, MoreVerticalIcon } from 'lucide-react';
import { Button } from './ui/button';

export type GradientColorsMenuProps = {
  color_1: { raw: RGBA; stringColors: ColorVariantsHeadings };
  color_2: { raw: RGBA; stringColors: ColorVariantsHeadings };
  linearCSSGradient: string;
};

export const GradientsColorsMenu: FC<GradientColorsMenuProps> = ({
  color_1,
  color_2,
  linearCSSGradient
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group grid h-8 w-6 place-content-center rounded-lg bg-transparent p-0 transition-colors">
          <MoreVerticalIcon className="w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="base-border w-56 bg-background-default">
        <DropdownMenuLabel>Solid Colors</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ClipboardCopyIcon className="mr-2 h-4 w-4" />
              <span>Copy color 1 as</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {color_1.stringColors.map(({ name, color }, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={() => copyToClipboard(color, false)}>
                    <DropletsIcon className="mr-2 h-4 w-4" />
                    <span className="font-semibold uppercase">{name} </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ClipboardCopyIcon className="mr-2 h-4 w-4" />
              <span>Copy color 2 as</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {color_2.stringColors.map(({ name, color }, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={() => copyToClipboard(color, false)}>
                    <DropletsIcon className="mr-2 h-4 w-4" />
                    <span className="font-semibold uppercase">{name} </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
