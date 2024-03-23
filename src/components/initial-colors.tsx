import { copyToClipboard, normalizeColorOutput } from '@/lib/utils';
import { InputEvent } from '@/types';
import { useDebounce } from '@uidotdev/usehooks';
import { CopyIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import tinyColors from 'tinycolor2';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

export const InitialColors = () => {
  const [params, setParams] = useSearchParams();
  const debouncedParams = useDebounce(params, 300);

  const colors: Array<{ value: string; name: string }> = useMemo(
    () =>
      Object.entries(tinyColors.names)
        .map(([key, value]) => ({ name: key, value: `#${value}` }))
        .filter(({ name }) =>
          name.toLowerCase().includes(String(debouncedParams.get('q') || '').toLowerCase())
        ),
    [debouncedParams]
  );

  const onChange = (e: InputEvent) =>
    setParams((params) => ({ ...params, r: params.get('r'), q: e.target.value }), {
      replace: false
    });

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-3 p-2">
      <section className="mx-auto flex w-full max-w-xl flex-col gap-3">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
          <Label className="pl-3">Search</Label>
          <Input
            type="search"
            value={params.get('q') || ''}
            placeholder="Start by typing a color name..."
            className="w-full rounded-3xl border-font/15"
            onChange={onChange}
          />
        </form>

        <p className="leading-relaxed">
          About <span className="font-sans-display font-medium">{colors.length}</span>{' '}
          colors in your workspace!
        </p>
      </section>

      <Separator decorative className="mx-auto w-full max-w-4xl" />

      <section className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-2 p-2 mobile-x:grid-cols-3 md:grid-cols-4 md:gap-3">
        {colors.map((color, i) => (
          <div
            key={i}
            className="base-shadow flex flex-col gap-3 rounded-2xl bg-foreground-default p-2">
            <div
              className="h-[120px] w-full rounded-xl shadow-xl md:h-[160px]"
              style={{
                background: color.value
              }}
            />

            <div className="flex w-full max-w-[100%] items-center justify-between gap-2">
              <div className="flex max-w-[120px] flex-col gap-1 md:max-w-[160px]">
                <span className="text-xs font-semibold  uppercase md:text-sm">
                  {color.value}
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold uppercase md:text-sm">
                  {color.name}
                </span>
              </div>
              <TooltipWrapper content="Copy to clipboard">
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className="group rounded-xl "
                  onClick={() =>
                    copyToClipboard(normalizeColorOutput(color.value, color.name))
                  }>
                  <CopyIcon className="transition-colors group-hover:stroke-primary-default group-active:stroke-blue-400" />
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
