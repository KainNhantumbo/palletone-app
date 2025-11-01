import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useHarmonyColors } from '@/hooks/use-harmony-colors';
import { cn, copyToClipboard, normalizeColorOutput } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { Fragment } from 'react';
import tinycolor from 'tinycolor2';

export function ComplementTab() {
  const { complementColorActions, harmonyColors, rawComplementColors, setHarmonyColors } =
    useHarmonyColors();

  return (
    <section className="flex w-full flex-col">
      <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 lg:flex-row">
        <div className="base-shadow base-border grid max-h-[180px] w-full grid-cols-2  overflow-clip rounded-2xl lg:max-h-full lg:max-w-[380px]">
          {[harmonyColors.complement.value, harmonyColors.complement.originalColor].map(
            (value, i) => (
              <Fragment key={i}>
                <div
                  style={{
                    background: tinycolor(value).toRgbString()
                  }}
                  className="relative min-h-60 w-full">
                  <span
                    className={cn(
                      'base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 px-2 text-xs font-bold'
                    )}>
                    {i > 0 ? 'Original' : `Complement`}
                  </span>
                </div>
              </Fragment>
            )
          )}
        </div>
        <section className="flex w-full flex-col gap-3">
          <div className="flex flex-col-reverse gap-2 lg:flex-col">
            <section>
              <div className="flex w-full flex-wrap items-center justify-center gap-3 md:flex-nowrap">
                {rawComplementColors.complement.map((item, i) => (
                  <Fragment key={i}>
                    <div className="flex w-fit flex-col items-center gap-1">
                      <div className="flex w-fit items-center gap-3">
                        <h3 className="text-sm font-semibold uppercase text-primary-default">
                          {item.name}
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
                  </Fragment>
                ))}
              </div>
            </section>

            <Separator decorative />

            <div className="mx-auto mb-3 flex w-full max-w-lg flex-col gap-4">
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="complement-alpha-input"
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
                    id="complement-alpha-input"
                    step={0.1}
                    min={0}
                    max={1}
                    value={harmonyColors.complement.originalColor.a}
                    onChange={(e) =>
                      setHarmonyColors((state) => ({
                        ...state,
                        complement: {
                          ...state.complement,
                          originalColor: {
                            ...state.complement.originalColor,
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
                  htmlFor="complement-red-input"
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
                    id="complement-red-input"
                    step={1}
                    min={0}
                    max={255}
                    value={harmonyColors.complement.originalColor.r}
                    onChange={(e) =>
                      setHarmonyColors((state) => ({
                        ...state,
                        complement: {
                          ...state.complement,
                          originalColor: {
                            ...state.complement.originalColor,
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
                  htmlFor="complement-green-input"
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
                    id="complement-green-input"
                    step={1}
                    min={0}
                    max={255}
                    value={harmonyColors.complement.originalColor.g}
                    onChange={(e) =>
                      setHarmonyColors((state) => ({
                        ...state,
                        complement: {
                          ...state.complement,
                          originalColor: {
                            ...state.complement.originalColor,
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
                  htmlFor="complement-blue-input"
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
                    id="complement-blue-input"
                    step={1}
                    min={0}
                    max={255}
                    value={harmonyColors.complement.originalColor.b}
                    onChange={(e) =>
                      setHarmonyColors((state) => ({
                        ...state,
                        complement: {
                          ...state.complement,
                          originalColor: {
                            ...state.complement.originalColor,
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

          <div className="flex w-full flex-wrap items-center justify-center gap-2 md:flex-nowrap">
            {complementColorActions.map((action, i) => (
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
            <h3>Complement</h3>

            <p className="text-sm ">
              Two colors that are on opposite side of the color wheel. This combination has
              an extremely high contrast and termed as loud.
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}
