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
import { copyToClipboard, transformColorsToString } from '@/lib/utils';
import type { ColorVariantsHeadings, RGBA } from '@/types';
import { ClipboardCopyIcon, DropletsIcon, MoreVerticalIcon } from 'lucide-react';
import { useMemo, type FC } from 'react';
import { Button } from './ui/button';

export type SolidOptionsMenuProps = {
  color: RGBA;
};

export const SolidOptionsMenu: FC<SolidOptionsMenuProps> = ({ color }) => {
  const colors: ColorVariantsHeadings = useMemo(
    () =>
      Object.entries(transformColorsToString(color)).map(([key, value]) => ({
        name: key,
        color: value
      })),

    [color]
  );

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
              <span>Copy as</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {colors.map(({ name, color }, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={() => copyToClipboard(color, false)}>
                    <DropletsIcon className="mr-2 h-4 w-4" />
                    <span className="capitalize">{name} color</span>
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
