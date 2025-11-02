import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  copyToClipboard,
  normalizeColorOutput,
  randomColor,
  transformColorsToString
} from '@/lib/utils';
import { ColorVariantsHeadings, InputEvent, RGBA } from '@/types';
import { useDocumentTitle } from '@uidotdev/usehooks';
import * as Lucide from 'lucide-react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';

export default function ConverterPage() {
  useDocumentTitle('Palletone - Converter');

  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  const [rgbaColor, setRgbaColor] = useState<RGBA>(() => randomColor());
  const colorVariants = useMemo(() => transformColorsToString(rgbaColor), [rgbaColor]);

  const colorHeadings: ColorVariantsHeadings = [
    { name: 'rgba', color: colorVariants.rgba },
    { name: 'hex', color: colorVariants.hex },
    { name: 'hsl', color: colorVariants.hsl },
    { name: 'hsv', color: colorVariants.hsv }
  ];

  const onChange = (e: InputEvent) => {
    setCurrentInputValue(e.target.value);
  };

  const onPaste = async () => {
    try {
      const value = await navigator.clipboard.readText();
      setCurrentInputValue(value);
    } catch (error) {
      const message = 'Error while pasting color value';
      console.error(error);
      console.warn(message);
      toast.error(message);
    }
  };

  useEffect(() => {
    const isValidColor = tinycolor(currentInputValue).isValid();
    if (isValidColor) {
      setRgbaColor(tinycolor(currentInputValue).toRgb());
    }
  }, [currentInputValue]);

  return (
    <main className="mx-auto flex w-full  max-w-5xl flex-col gap-3 pb-24 pt-20">
      <div className=" flex items-center gap-4 ">
        <TooltipWrapper content="Get back">
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => history.back()}
            className="rounded-full">
            <Lucide.ArrowLeftIcon />
          </Button>
        </TooltipWrapper>
        <h1 className="flex items-center gap-2">
          <Lucide.RefreshCwIcon className="h-auto w-6" />
          <span className="text-lg">Color Converter</span>
        </h1>
      </div>

      <Separator decorative />

      <section className="mt-3 flex w-full flex-col gap-3">
        <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 md:flex-row">
          <div
            style={{ background: tinycolor(rgbaColor).toRgbString() }}
            className="base-shadow base-border min-h-[180px] rounded-2xl sm:w-full md:max-w-[200px]"
          />

          <section className="flex w-full flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h3>
                <span>Enter a color</span>
              </h3>

              <div className="flex flex-nowrap items-center gap-3">
                <Button variant={'outline'} onClick={onPaste} className="rounded-full">
                  <Lucide.ClipboardPasteIcon className="mr-2 w-4" />
                  <span>Paste</span>
                </Button>
                <Input
                  placeholder="Type your color value here"
                  value={currentInputValue}
                  onChange={onChange}
                  className="rounded-full"
                />
              </div>
            </div>

            <Separator decorative />

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
          </section>
        </section>
      </section>
    </main>
  );
}
