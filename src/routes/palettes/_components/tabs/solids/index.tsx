import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  copyToClipboard,
  normalizeColorOutput,
  randomColor,
  transformColorsToString
} from '@/lib/utils';
import { SOLID_COLORS_STORAGE_KEY } from '@/shared/constants';
import type { ColorActions, ColorVariantsHeadings, RGBA, SolidColor } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import compareObjects from 'fast-deep-equal';
import * as Lucide from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';

export function SolidsTab() {
  const [rgbaColor, setRgbaColor] = useState<RGBA>(() => randomColor());

  const [solidColorsDB, updateSolidColorDB] = useLocalStorage<SolidColor[]>(
    SOLID_COLORS_STORAGE_KEY,
    []
  );

  const colorVariants = useMemo(() => transformColorsToString(rgbaColor), [rgbaColor]);

  const colorHeadings: ColorVariantsHeadings = [
    { name: 'rgba', color: colorVariants.rgba },
    { name: 'hex', color: colorVariants.hex },
    { name: 'hsl', color: colorVariants.hsl },
    { name: 'hsv', color: colorVariants.hsv }
  ];

  const solidColorActions: ColorActions = [
    {
      name: 'random color',
      icon: Lucide.ShuffleIcon,
      handler: () => setRgbaColor(randomColor())
    },
    {
      name: 'save color',
      icon: Lucide.DownloadIcon,
      handler: () => handleSaveSolidColor()
    }
  ];

  const handleSaveSolidColor = () => {
    const isDuplicate = solidColorsDB
      .map((color) => color.value)
      .some((value: RGBA) => compareObjects(value, rgbaColor));

    if (isDuplicate) return toast.error('Color already saved.');

    updateSolidColorDB((current) => {
      return [
        ...current,
        {
          id: crypto.randomUUID(),
          value: rgbaColor,
          createdAt: new Date().toISOString()
        }
      ];
    });
    toast.success('Color saved successfully.');
  };

  return (
    <section className="flex w-full flex-col">
      <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 md:flex-row">
        <div
          style={{ background: tinycolor(rgbaColor).toRgbString() }}
          className="base-shadow base-border min-h-[200px] rounded-2xl md:w-full md:max-w-[220px]"
        />

        <section className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-wrap items-center justify-center gap-3 md:flex-nowrap">
            {colorHeadings.map((item, i) => (
              <Fragment key={i}>
                <div className="flex w-fit flex-col items-center gap-1">
                  <div className="flex w-fit items-center gap-3">
                    <h3 className="text-sm font-semibold uppercase text-primary-default">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium uppercase">{item.color}</p>
                    <TooltipWrapper content="Copy to clipboard">
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="group rounded-full"
                        onClick={() =>
                          copyToClipboard(normalizeColorOutput(item.color, item.name))
                        }>
                        <Lucide.CopyIcon className="w-4 transition-colors group-hover:stroke-primary group-active:stroke-blue-400" />
                      </Button>
                    </TooltipWrapper>
                  </div>
                </div>

                {colorHeadings[i + 1] ? (
                  <Separator decorative orientation="vertical" />
                ) : null}
              </Fragment>
            ))}
          </div>

          <Separator decorative />

          <div className="mx-auto mb-3 flex w-full max-w-lg flex-col gap-4">
            <div className="flex w-full items-center gap-3">
              <Label htmlFor="alpha-input" className="w-12 text-xs font-medium uppercase">
                alpha
              </Label>
              <div className="relative -top-1 w-full">
                <span className="first-letter: absolute -bottom-4 left-0 text-xs font-semibold ">
                  0
                </span>
                <span className="first-letter: absolute -bottom-4 right-0 text-xs font-semibold">
                  1
                </span>
                <input
                  type="range"
                  id="alpha-input"
                  step={0.1}
                  min={0}
                  max={1}
                  value={rgbaColor.a}
                  onChange={(e) => {
                    setRgbaColor((current) => ({
                      ...current,
                      a: parseFloat(e.target.value)
                    }));
                  }}
                  className="base-range-input bg-slate-400 dark:bg-slate-600"
                />
              </div>
            </div>
            <div className="flex w-full items-center gap-3">
              <Label htmlFor="red-input" className="w-12 text-xs font-medium uppercase">
                red
              </Label>
              <div className="relative -top-1 w-full">
                <span className="first-letter: absolute -bottom-4 left-0 text-xs font-semibold ">
                  0
                </span>
                <span className="first-letter: absolute -bottom-4 right-0 text-xs font-semibold">
                  255
                </span>
                <input
                  type="range"
                  id="red-input"
                  step={1}
                  min={0}
                  max={255}
                  value={rgbaColor.r}
                  onChange={(e) => {
                    setRgbaColor((current) => ({
                      ...current,
                      r: parseInt(e.target.value)
                    }));
                  }}
                  className="base-range-input bg-red-600"
                />
              </div>
            </div>
            <div className="flex w-full items-center gap-3">
              <Label htmlFor="green-input" className="w-12 text-xs font-medium uppercase">
                green
              </Label>
              <div className="relative -top-1 w-full">
                <span className="first-letter: absolute -bottom-4 left-0 text-xs font-semibold ">
                  0
                </span>
                <span className="first-letter: absolute -bottom-4 right-0 text-xs font-semibold">
                  255
                </span>
                <input
                  type="range"
                  id="green-input"
                  step={1}
                  min={0}
                  max={255}
                  value={rgbaColor.g}
                  onChange={(e) => {
                    setRgbaColor((current) => ({
                      ...current,
                      g: parseInt(e.target.value)
                    }));
                  }}
                  className="base-range-input bg-green-600"
                />
              </div>
            </div>
            <div className="flex w-full items-center gap-3">
              <Label htmlFor="blue-input" className="w-12 text-xs font-medium uppercase">
                blue
              </Label>
              <div className="relative -top-1 w-full">
                <span className="first-letter: absolute -bottom-4 left-0 text-xs font-semibold ">
                  0
                </span>
                <span className="first-letter: absolute -bottom-4 right-0 text-xs font-semibold">
                  255
                </span>
                <input
                  type="range"
                  id="blue-input"
                  step={1}
                  min={0}
                  max={255}
                  value={rgbaColor.b}
                  onChange={(e) => {
                    setRgbaColor((current) => ({
                      ...current,
                      b: parseInt(e.target.value)
                    }));
                  }}
                  className="base-range-input bg-blue-400"
                />
              </div>
            </div>
          </div>

          <Separator decorative />

          <div className="flex w-full flex-wrap items-center justify-center gap-2 md:flex-nowrap">
            {solidColorActions.map((action, i) => (
              <Button
                key={i}
                variant={'outline'}
                size={'lg'}
                onClick={action.handler}
                className="group flex w-full items-center gap-2 rounded-3xl mobile:w-fit">
                <action.icon className="w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400" />
                <span className="capitalize transition-colors group-hover:text-blue-400">
                  {action.name}
                </span>
              </Button>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}
