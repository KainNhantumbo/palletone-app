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
import { copyToClipboard, normalizeColorOutput } from '@/lib/utils';
import type { ColorVariantsHeadings, RGBA } from '@/types';
import {
  ApertureIcon,
  BrushIcon,
  ClipboardCopyIcon,
  DropletsIcon,
  MoreVerticalIcon
} from 'lucide-react';
import { type FC } from 'react';
import { Button } from './ui/button';

export type GradientColorsMenuProps = {
  color_1: { raw: RGBA; stringColors: ColorVariantsHeadings };
  color_2: { raw: RGBA; stringColors: ColorVariantsHeadings };
  linearCSSGradient: string;
  radialCSSGradient: string;
};

export const GradientsColorsMenu: FC<GradientColorsMenuProps> = ({
  color_1,
  color_2,
  linearCSSGradient,
  radialCSSGradient
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
        <DropdownMenuLabel>Gradient Colors</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-font/[.12]" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => copyToClipboard(linearCSSGradient, false)}>
            <BrushIcon className="mr-2 h-4 w-4" />
            <span>Copy linear css gradient</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard(radialCSSGradient, false)}>
            <ApertureIcon className="mr-2 h-4 w-4" />
            <span>Copy radial css gradient</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ClipboardCopyIcon className="mr-2 h-4 w-4" />
              <span>Copy primary color as</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {color_1.stringColors.map(({ name, color }, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={() =>
                      copyToClipboard(normalizeColorOutput(color, name), false)
                    }>
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
              <span>Copy secondary color as</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {color_2.stringColors.map(({ name, color }, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={() =>
                      copyToClipboard(normalizeColorOutput(color, name), false)
                    }>
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
