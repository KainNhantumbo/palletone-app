import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useHarmonyColors } from '@/hooks/use-harmony-colors';
import { cn, copyToClipboard, normalizeColorOutput } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { Fragment } from 'react';
import tinycolor from 'tinycolor2';

export function MonochromaticTab() {
  const {
    harmonyColors,
    monochromaticColorActions,
    setHarmonyColors,
    rawMonochromaticColors
  } = useHarmonyColors();

  return (
    <section className="flex w-full flex-col">
      <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 lg:flex-row ">
        <div className="base-shadow base-border grid max-h-[680px]  w-full grid-cols-5 overflow-clip rounded-2xl lg:max-w-[350px]">
          {[
            ...harmonyColors.monochromatic.chroma,
            harmonyColors.monochromatic.originalColor
          ].map((value, i) => (
            <Fragment key={i}>
              <div
                style={{
                  background: tinycolor(value).toRgbString()
                }}
                className="relative min-h-40 w-full">
                <span
                  className={cn(
                    'base-border absolute left-2 top-2 h-[25px] w-[25px] rounded-full bg-background-default p-1 text-xs font-bold',
                    { 'h-fit w-fit px-1': i > 2 }
                  )}>
                  {i > 3 ? 'Original' : `0${i + 1}`}
                </span>
              </div>
            </Fragment>
          ))}
        </div>

        <section className="flex w-full flex-col gap-3">
          <section className="flex flex-col gap-2">
            <div className="flex flex-col-reverse gap-2 lg:flex-col ">
              <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-nowrap">
                {rawMonochromaticColors.values.map((array, arrIndex) => (
                  <div
                    key={arrIndex}
                    className="flex w-full flex-wrap items-center justify-evenly gap-1">
                    {array.map((item, i) => (
                      <div key={i} className="flex w-fit flex-col items-center gap-1">
                        <div className="flex w-fit items-center gap-3">
                          <h3 className="text-sm font-semibold uppercase text-primary-default">
                            0{arrIndex + 1} - {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium uppercase">{item.value}</p>
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
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Separator decorative />
              <div className="mx-auto my-2 mb-5 flex w-full max-w-lg flex-col gap-4">
                <div className="flex w-full items-center gap-3">
                  <Label
                    htmlFor="monochromatic-alpha-input"
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
                      id="monochromatic-alpha-input"
                      step={0.1}
                      min={0}
                      max={1}
                      value={harmonyColors.monochromatic.originalColor.a}
                      onChange={(e) =>
                        setHarmonyColors((state) => ({
                          ...state,
                          monochromatic: {
                            ...state.monochromatic,
                            originalColor: {
                              ...state.monochromatic.originalColor,
                              a: parseFloat(e.target.value)
                            }
                          }
                        }))
                      }
                      className="base-range-input bg-slate-400 dark:bg-slate-600"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-3">
                  <Label
                    htmlFor="monochromatic-red-input"
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
                      id="monochromatic-red-input"
                      step={1}
                      min={0}
                      max={255}
                      value={harmonyColors.monochromatic.originalColor.r}
                      onChange={(e) =>
                        setHarmonyColors((state) => ({
                          ...state,
                          monochromatic: {
                            ...state.monochromatic,
                            originalColor: {
                              ...state.monochromatic.originalColor,
                              r: parseInt(e.target.value)
                            }
                          }
                        }))
                      }
                      className="base-range-input bg-red-600"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-3">
                  <Label
                    htmlFor="monochromatic-green-input"
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
                      id="monochromatic-green-input"
                      step={1}
                      min={0}
                      max={255}
                      value={harmonyColors.monochromatic.originalColor.g}
                      onChange={(e) =>
                        setHarmonyColors((state) => ({
                          ...state,
                          monochromatic: {
                            ...state.monochromatic,
                            originalColor: {
                              ...state.monochromatic.originalColor,
                              g: parseInt(e.target.value)
                            }
                          }
                        }))
                      }
                      className="base-range-input bg-green-600"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-3">
                  <Label
                    htmlFor="monochromatic-blue-input"
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
                      id="monochromatic-blue-input"
                      step={1}
                      min={0}
                      max={255}
                      value={harmonyColors.monochromatic.originalColor.b}
                      onChange={(e) =>
                        setHarmonyColors((state) => ({
                          ...state,
                          monochromatic: {
                            ...state.monochromatic,
                            originalColor: {
                              ...state.monochromatic.originalColor,
                              b: parseInt(e.target.value)
                            }
                          }
                        }))
                      }
                      className="base-range-input bg-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator decorative />

            <div className="my-3 flex w-full flex-wrap items-center justify-center gap-2 md:flex-nowrap">
              {monochromaticColorActions.map((action, i) => (
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

            <Separator decorative />
            <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
              <h3>Monochromatic</h3>

              <p className="text-sm ">
                Monochromatic variations (shades) of a single hue, made by altering the
                saturation and brightness of the base color. This combination creates bright
                color palette.
              </p>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
