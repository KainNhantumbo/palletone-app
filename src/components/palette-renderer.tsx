import { copyToClipboard, normalizeColorOutput } from '@/lib/utils';
import { RGBA } from '@/types';
import { Separator } from '@radix-ui/react-separator';
import { FinalColor } from 'extract-colors/lib/types/Color';
import { CopyIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';

export type PaletteRendererProps = {
  colors: FinalColor[];
  paletteColors: (color: RGBA) => { name: string; value: string }[];
  handleRemove: (color: FinalColor) => void;
};

export const PaletteRenderer = ({
  colors,
  paletteColors,
  handleRemove
}: PaletteRendererProps) => {
  if (colors.length < 1) return null;

  return (
    <div className="flex w-full flex-col gap-3">
      <Separator decorative />
      <h3 className="mx-auto w-full max-w-2xl">Palette</h3>

      <div className="mx-auto grid w-full max-w-2xl  place-items-center gap-3 mobile:grid-cols-2 md:grid-cols-3">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`base-border flex h-full w-full flex-col rounded-2xl bg-foreground-default shadow-lg`}>
            <div
              style={{ backgroundColor: color.hex }}
              className="relative mb-2 h-[120px] w-full rounded-2xl shadow-2xl">
              <Button
                variant="default"
                size={'icon'}
                onClick={() => handleRemove(color)}
                className="group absolute right-2 top-2 flex h-5 w-5 items-center gap-2 rounded-3xl">
                <XIcon className="w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500" />
              </Button>
            </div>
            {paletteColors({
              r: color.red,
              g: color.green,
              b: color.blue,
              a: 1
            }).map((item, i) => (
              <div
                key={i}
                className="mx-auto flex w-full items-center justify-between gap-2 px-2">
                <div className="flex w-full items-center gap-1">
                  <p className="text-[.85rem] font-medium uppercase">{item.name}:</p>
                  <p className="text-[.85rem] font-medium uppercase">{item.value}</p>
                </div>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className="group rounded-full"
                  onClick={() =>
                    copyToClipboard(normalizeColorOutput(item.value, item.name))
                  }>
                  <CopyIcon className="w-4 transition-colors group-hover:stroke-primary group-active:stroke-blue-400" />
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
