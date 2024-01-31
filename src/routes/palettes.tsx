import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import compareObjects from 'lodash.isequal';
import {
  buildGradient,
  copyToClipboard,
  normalizeColorOutput,
  randomColor,
  transformColorsToString
} from '@/lib/utils';
import {
  MIXED_GRADIENT_STORAGE_KEY,
  SOLID_COLORS_STORAGE_KEY
} from '@/shared/constants';
import type {
  ColorActions,
  ColorVariantsHeadings,
  MixedGradient,
  RGBA,
  SolidColor
} from '@/types';
import { useDocumentTitle, useLocalStorage } from '@uidotdev/usehooks';
import {
  CopyIcon,
  DownloadIcon,
  DropletIcon,
  PaintbrushIcon,
  ShuffleIcon
} from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';

export default function Palettes() {
  useDocumentTitle('Palletone - Palettes');

  const [rgbaColor, setRgbaColor] = useState<RGBA>(() => randomColor());

  const [gradientRGBA, setGradientRGBA] = useState<
    Omit<MixedGradient, 'id' | 'createdAt'>
  >(() => {
    return {
      color_1: randomColor(),
      color_2: randomColor()
    };
  });

  const [solidColorsDB, updateSolidColorDB] = useLocalStorage<SolidColor[]>(
    SOLID_COLORS_STORAGE_KEY,
    []
  );

  const [gradientColorsDB, updateGradientColorsDB] = useLocalStorage<
    MixedGradient[]
  >(MIXED_GRADIENT_STORAGE_KEY, []);

  const colorVariants = useMemo(
    () => transformColorsToString(rgbaColor),
    [rgbaColor]
  );

  const gradients = useMemo(
    () => buildGradient(gradientRGBA.color_1, gradientRGBA.color_2),
    [gradientRGBA]
  );

  const colorHeadings: ColorVariantsHeadings = [
    { name: 'rgba', color: colorVariants.rgba },
    { name: 'hex', color: colorVariants.hex },
    { name: 'hsl', color: colorVariants.hsl },
    { name: 'hsv', color: colorVariants.hsv }
  ];

  const solidColorActions: ColorActions = [
    {
      name: 'random color',
      icon: ShuffleIcon,
      handler: () => setRgbaColor(randomColor())
    },
    {
      name: 'save color',
      icon: DownloadIcon,
      handler: () => handleSaveSolidColor()
    }
  ];

  const gradientColorActions: ColorActions = [
    {
      name: 'randomize',
      icon: ShuffleIcon,
      handler: () =>
        setGradientRGBA((current) => ({
          ...current,
          color_1: randomColor(),
          color_2: randomColor()
        }))
    },
    {
      name: 'copy as CSS',
      icon: CopyIcon,
      handler: () => copyToClipboard(String(gradients.cssString))
    },
    {
      name: 'save',
      icon: DownloadIcon,
      handler: () => handleSaveGradient()
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

  const handleSaveGradient = () => {
    const isDuplicate = gradientColorsDB.some(
      (values) =>
        compareObjects(values.color_1, gradientRGBA.color_1) &&
        compareObjects(values.color_2, gradientRGBA.color_2)
    );

    if (isDuplicate) return toast.error('Gradient already saved.');

    updateGradientColorsDB((current) => [
      ...current,
      {
        ...gradientRGBA,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }
    ]);
    toast.success('Gradient saved successfully.');
  };

  return (
    <main className="mx-auto w-full max-w-5xl pb-24 pt-20">
      <Tabs defaultValue="solid" className="w-full px-2">
        <TabsList className="mx-auto mb-3 grid w-fit grid-cols-2 place-content-center place-items-center gap-8 bg-background-default">
          <TabsTrigger
            value="solid"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <DropletIcon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="font-semibold transition-colors group-hover:text-blue-400">
              Solids
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="gradient"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <PaintbrushIcon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="font-semibold transition-colors group-hover:text-blue-400">
              Gradients
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="solid">
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
                          <p className="text-sm font-medium uppercase">
                            {item.color}
                          </p>
                          <TooltipWrapper content="Copy to clipboard">
                            <Button
                              variant={'ghost'}
                              size={'icon'}
                              className="group rounded-full"
                              onClick={() =>
                                copyToClipboard(
                                  normalizeColorOutput(item.color, item.name)
                                )
                              }>
                              <CopyIcon className="w-4 transition-colors group-hover:stroke-primary group-active:stroke-blue-400" />
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
                    <Label
                      htmlFor="alpha-input"
                      className="w-12 text-xs font-medium uppercase">
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
                    <Label
                      htmlFor="red-input"
                      className="w-12 text-xs font-medium uppercase">
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
                    <Label
                      htmlFor="green-input"
                      className="w-12 text-xs font-medium uppercase">
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
                    <Label
                      htmlFor="blue-input"
                      className="w-12 text-xs font-medium uppercase">
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
        </TabsContent>

        <TabsContent value="gradient">
          <section className="flex w-full flex-col">
            <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 md:flex-row">
              <div
                style={{ ...gradients.css }}
                className="base-shadow base-border min-h-[200px] w-full rounded-2xl md:w-[480px]"
              />

              <section className="flex w-full flex-col gap-3">
                <h3 className="mx-auto w-full max-w-lg">Gradient Color 1</h3>

                <section className="flex w-full flex-col gap-3">
                  <div className="mx-auto mb-3 flex w-full max-w-lg flex-col gap-4">
                    <div className="flex w-full items-center gap-3">
                      <Label
                        htmlFor="gradient-1-alpha-input"
                        className="w-12 text-xs font-medium uppercase">
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
                          id="gradient-1-alpha-input"
                          type="range"
                          step={0.1}
                          min={0}
                          max={1}
                          value={gradientRGBA.color_1.a}
                          onChange={(e) =>
                            setGradientRGBA((current) => ({
                              ...current,
                              color_1: {
                                ...current.color_1,
                                a: parseFloat(e.target.value)
                              }
                            }))
                          }
                          className="base-range-input bg-slate-400 dark:bg-slate-600"
                        />
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-3">
                      <Label
                        htmlFor="gradient-1-red-input"
                        className="w-12 text-xs font-medium uppercase">
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
                          id="gradient-1-red-input"
                          type="range"
                          step={1}
                          min={0}
                          max={255}
                          value={gradientRGBA.color_1.r}
                          className="base-range-input bg-red-600"
                          onChange={(e) =>
                            setGradientRGBA((current) => ({
                              ...current,
                              color_1: {
                                ...current.color_1,
                                r: parseFloat(e.target.value)
                              }
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-3">
                      <Label
                        htmlFor="gradient-1-green-input"
                        className="w-12 text-xs font-medium uppercase">
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
                          id="gradient-1-green-input"
                          type="range"
                          step={1}
                          min={0}
                          max={255}
                          value={gradientRGBA.color_1.g}
                          className="base-range-input bg-green-600"
                          onChange={(e) =>
                            setGradientRGBA((current) => ({
                              ...current,
                              color_1: {
                                ...current.color_1,
                                g: parseFloat(e.target.value)
                              }
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-3">
                      <Label
                        htmlFor="gradient-1-blue-input"
                        className="w-12 text-xs font-medium uppercase">
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
                          id="gradient-1-blue-input"
                          type="range"
                          step={1}
                          min={0}
                          max={255}
                          value={gradientRGBA.color_1.b}
                          className="base-range-input bg-blue-400"
                          onChange={(e) =>
                            setGradientRGBA((current) => ({
                              ...current,
                              color_1: {
                                ...current.color_1,
                                b: parseFloat(e.target.value)
                              }
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <Separator decorative />
                <h3 className="mx-auto w-full max-w-lg">Gradient Color 2</h3>

                <section className="mb-3 flex w-full flex-col gap-3">
                  <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
                    <div className="flex w-full items-center gap-3">
                      <Label
                        htmlFor="gradient-2-alpha-input"
                        className="w-12 text-xs font-medium uppercase">
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
                          id="gradient-2-alpha-input"
                          type="range"
                          step={0.1}
                          min={0}
                          max={1}
                          value={gradientRGBA.color_2.a}
                          onChange={(e) =>
                            setGradientRGBA((current) => ({
                              ...current,
                              color_2: {
                                ...current.color_2,
                                a: parseFloat(e.target.value)
                              }
                            }))
                          }
                          className="base-range-input bg-slate-400 dark:bg-slate-600"
                        />
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-3">
                      <Label
                        htmlFor="gradient-2-red-input"
                        className="w-12 text-xs font-medium uppercase">
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
                          id="gradient-2-red-input"
                          type="range"
                          step={1}
                          min={0}
                          max={255}
                          value={gradientRGBA.color_2.r}
                          className="base-range-input bg-red-600"
                          onChange={(e) =>
                            setGradientRGBA((current) => ({
                              ...current,
                              color_2: {
                                ...current.color_2,
                                r: parseFloat(e.target.value)
                              }
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-3">
                      <Label
                        htmlFor="gradient-2-green-input"
                        className="w-12 text-xs font-medium uppercase">
                        green
                      </Label>
                      <div className="relative -top-1 w-full ">
                        <span className="first-letter: absolute -bottom-4 left-0 text-xs font-semibold ">
                          0
                        </span>
                        <span className="first-letter: absolute -bottom-4 right-0 text-xs font-semibold">
                          255
                        </span>
                        <input
                          id="gradient-2-green-input"
                          type="range"
                          step={1}
                          min={0}
                          max={255}
                          value={gradientRGBA.color_2.g}
                          className="base-range-input bg-green-600"
                          onChange={(e) =>
                            setGradientRGBA((current) => ({
                              ...current,
                              color_2: {
                                ...current.color_2,
                                g: parseFloat(e.target.value)
                              }
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-3">
                      <Label
                        htmlFor="gradient-2-blue-input"
                        className="w-12 text-xs font-medium uppercase">
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
                          id="gradient-2-blue-input"
                          type="range"
                          step={1}
                          min={0}
                          max={255}
                          value={gradientRGBA.color_2.b}
                          className="base-range-input bg-blue-400"
                          onChange={(e) =>
                            setGradientRGBA((current) => ({
                              ...current,
                              color_2: {
                                ...current.color_2,
                                b: parseFloat(e.target.value)
                              }
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <Separator decorative />

                <div className="flex w-full flex-wrap items-center justify-center gap-2 md:flex-nowrap">
                  {gradientColorActions.map((action, i) => (
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
        </TabsContent>
      </Tabs>
    </main>
  );
}
