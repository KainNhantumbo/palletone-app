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
  copyToClipboard,
  normalizeColorOutput,
  transformColorsToString
} from '@/lib/utils';
import type { RGBA } from '@/types';
import { ClipboardCopyIcon, DropletsIcon, MoreVerticalIcon } from 'lucide-react';
import { useMemo, type FC } from 'react';
import { Button } from './ui/button';

export type GenericMenuProps = {
  originalColor: RGBA;
  values: Array<RGBA>;
  title: string;
};

export const GenericColorsMenu: FC<GenericMenuProps> = (props) => {
  const { originalColor, colors } = useMemo(
    () => ({
      originalColor: Object.entries(transformColorsToString(props.originalColor)).map(
        ([key, value]) => ({
          name: key,
          color: value
        })
      ),
      colors: props.values
        .map((value) => transformColorsToString(value))
        .map((item) =>
          Object.entries(item).map(([key, value]) => ({
            name: key,
            value
          }))
        )
    }),
    [props]
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
      <DropdownMenuContent className="base-border w-56">
        <DropdownMenuLabel>{props.title}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-font/[.12]" />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ClipboardCopyIcon className="mr-2 h-4 w-4" />
              <span>Copy original color as</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {originalColor.map(({ name, color }, i) => (
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

          {colors.map((values, arrayIndex) => (
            <DropdownMenuSub key={arrayIndex}>
              <DropdownMenuSubTrigger>
                <ClipboardCopyIcon className="mr-2 h-4 w-4" />
                <span>
                  Copy <i className="font-semibold">0{arrayIndex + 1}</i> color as
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {values.map(({ name, value: color }, i) => (
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
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
