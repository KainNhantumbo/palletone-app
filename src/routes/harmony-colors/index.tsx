import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useHarmonyColors } from '@/hooks/use-harmony-colors';
import { cn, copyToClipboard, normalizeColorOutput } from '@/lib/utils';
import { useDocumentTitle } from '@uidotdev/usehooks';
import {
  BoxSelectIcon,
  CopyIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  DicesIcon
} from 'lucide-react';
import { Fragment } from 'react';
import tinycolor from 'tinycolor2';

export default function HarmonyColors() {
  useDocumentTitle('Palletone - Harmony Colors');
  const {
    analogousColorActions,
    complementColorActions,
    harmonyColors,
    monochromaticColorActions,
    rawComplementColors,
    setHarmonyColors,
    rawAnalogousColors,
    rawMonochromaticColors,
    rawTriadicColors,
    tetradicColorActions,
    triadicColorActions,
    splitComplementColorActions,
    rawSplitComplementColors,
    rawTetradicColors
  } = useHarmonyColors();

  return (
    <main className="mx-auto w-full max-w-5xl pb-24 pt-20">
      <Tabs defaultValue="complement" className="w-full px-2">
        <TabsList className="mx-auto mb-3 grid w-fit grid-cols-6 place-content-center place-items-center gap-3 bg-background-default">
          <TabsTrigger
            value="complement"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <DicesIcon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block">
              complement
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="analogous"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <Dice2Icon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block">
              analogous
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="split-complement"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <Dice2Icon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block">
              complement/2
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="triadic"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <Dice3Icon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block">
              triadic
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="tetradic"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <Dice4Icon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block">
              tetradic
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="monochromatic"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <BoxSelectIcon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block">
              monochromatic
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="complement">
          <section className="flex w-full flex-col">
            <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 lg:flex-row">
              <div className="base-shadow base-border grid max-h-[180px] w-full grid-cols-2  overflow-clip rounded-2xl lg:max-h-full lg:max-w-[380px]">
                {[
                  harmonyColors.complement.value,
                  harmonyColors.complement.originalColor
                ].map((value, i) => (
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
                ))}
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
                                  copyToClipboard(
                                    normalizeColorOutput(item.value, item.name)
                                  )
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
                    Two colors that are on opposite side of the color wheel. This
                    combination has an extremely high contrast and termed as loud.
                  </p>
                </div>
              </section>
            </section>
          </section>
        </TabsContent>

        <TabsContent value="analogous">
          <section className="flex w-full flex-col">
            <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 lg:flex-row ">
              <div className="base-shadow base-border grid max-h-[540px]  w-full grid-cols-4 overflow-clip rounded-2xl lg:max-w-[320px]">
                {[
                  ...harmonyColors.analogous.values,
                  harmonyColors.analogous.originalColor
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
                          { 'h-fit w-fit px-2': i > 2 }
                        )}>
                        {i > 2 ? 'Original' : `0${i + 1}`}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>

              <section className="flex w-full flex-col gap-3">
                <section className="flex flex-col gap-2">
                  <div className="flex flex-col-reverse gap-2 lg:flex-col ">
                    <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-nowrap">
                      {rawAnalogousColors.values.map((array, arrIndex) => (
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
                                <p className="text-sm font-medium uppercase">
                                  {item.value}
                                </p>
                                <Button
                                  variant={'ghost'}
                                  size={'icon'}
                                  className="group rounded-full"
                                  onClick={() =>
                                    copyToClipboard(
                                      normalizeColorOutput(item.value, item.name)
                                    )
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
                          htmlFor="analogous-alpha-input"
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
                            id="analogous-alpha-input"
                            step={0.1}
                            min={0}
                            max={1}
                            value={harmonyColors.analogous.originalColor.a}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                analogous: {
                                  ...state.analogous,
                                  originalColor: {
                                    ...state.analogous.originalColor,
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
                          htmlFor="analogous-red-input"
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
                            id="analogous-red-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.analogous.originalColor.r}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                analogous: {
                                  ...state.analogous,
                                  originalColor: {
                                    ...state.analogous.originalColor,
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
                          htmlFor="analogous-green-input"
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
                            id="analogous-green-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.analogous.originalColor.g}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                analogous: {
                                  ...state.analogous,
                                  originalColor: {
                                    ...state.analogous.originalColor,
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
                          htmlFor="analogous-blue-input"
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
                            id="analogous-blue-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.analogous.originalColor.b}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                analogous: {
                                  ...state.analogous,
                                  originalColor: {
                                    ...state.analogous.originalColor,
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
                    {analogousColorActions.map((action, i) => (
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
                    <h3>Analogous</h3>

                    <p className="text-sm ">
                      Three colors that are side by side on the color wheel. This color
                      combination is versatile, but can be overwhelming.
                    </p>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </TabsContent>

        <TabsContent value="split-complement">
          <section className="flex w-full flex-col">
            <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 lg:flex-row ">
              <div className="base-shadow base-border grid max-h-[540px]  w-full grid-cols-4 overflow-clip rounded-2xl lg:max-w-[320px]">
                {[
                  ...harmonyColors.splitComplement.values,
                  harmonyColors.splitComplement.originalColor
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
                          { 'h-fit w-fit px-2': i > 2 }
                        )}>
                        {i > 2 ? 'Original' : `0${i + 1}`}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>

              <section className="flex w-full flex-col gap-3">
                <section className="flex flex-col gap-2">
                  <div className="flex flex-col-reverse gap-2 lg:flex-col ">
                    <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-nowrap">
                      {rawSplitComplementColors.values.map((array, arrIndex) => (
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
                                <p className="text-sm font-medium uppercase">
                                  {item.value}
                                </p>
                                <Button
                                  variant={'ghost'}
                                  size={'icon'}
                                  className="group rounded-full"
                                  onClick={() =>
                                    copyToClipboard(
                                      normalizeColorOutput(item.value, item.name)
                                    )
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
                          htmlFor="split-complement-alpha-input"
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
                            id="split-complement-alpha-input"
                            step={0.1}
                            min={0}
                            max={1}
                            value={harmonyColors.splitComplement.originalColor.a}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                splitComplement: {
                                  ...state.splitComplement,
                                  originalColor: {
                                    ...state.splitComplement.originalColor,
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
                          htmlFor="split-complement-red-input"
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
                            id="split-complement-red-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.splitComplement.originalColor.r}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                splitComplement: {
                                  ...state.splitComplement,
                                  originalColor: {
                                    ...state.splitComplement.originalColor,
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
                          htmlFor="split-complement-green-input"
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
                            id="split-complement-green-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.splitComplement.originalColor.g}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                splitComplement: {
                                  ...state.splitComplement,
                                  originalColor: {
                                    ...state.splitComplement.originalColor,
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
                          htmlFor="split-complement-blue-input"
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
                            id="split-complement-blue-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.splitComplement.originalColor.b}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                splitComplement: {
                                  ...state.splitComplement,
                                  originalColor: {
                                    ...state.splitComplement.originalColor,
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
                    {splitComplementColorActions.map((action, i) => (
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
                    <h3 className="capitalize">split complement</h3>

                    <p className="text-sm ">
                      Primary color with two analogous colors. This combination has strong
                      contrast as complement color.
                    </p>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </TabsContent>

        <TabsContent value="triadic">
          <section className="flex w-full flex-col">
            <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 lg:flex-row ">
              <div className="base-shadow base-border grid max-h-[540px]  w-full grid-cols-4 overflow-clip rounded-2xl lg:max-w-[320px]">
                {[...harmonyColors.triadic.values, harmonyColors.triadic.originalColor].map(
                  (value, i) => (
                    <Fragment key={i}>
                      <div
                        style={{
                          background: tinycolor(value).toRgbString()
                        }}
                        className="relative min-h-40 w-full">
                        <span
                          className={cn(
                            'base-border absolute left-2 top-2 h-[25px] w-[25px] rounded-full bg-background-default p-1 text-xs font-bold',
                            { 'h-fit w-fit px-2': i > 2 }
                          )}>
                          {i > 2 ? 'Original' : `0${i + 1}`}
                        </span>
                      </div>
                    </Fragment>
                  )
                )}
              </div>

              <section className="flex w-full flex-col gap-3">
                <section className="flex flex-col gap-2">
                  <div className="flex flex-col-reverse gap-2 lg:flex-col ">
                    <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-nowrap">
                      {rawTriadicColors.values.map((array, arrIndex) => (
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
                                <p className="text-sm font-medium uppercase">
                                  {item.value}
                                </p>
                                <Button
                                  variant={'ghost'}
                                  size={'icon'}
                                  className="group rounded-full"
                                  onClick={() =>
                                    copyToClipboard(
                                      normalizeColorOutput(item.value, item.name)
                                    )
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
                          htmlFor="triadic-alpha-input"
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
                            id="triadic-alpha-input"
                            step={0.1}
                            min={0}
                            max={1}
                            value={harmonyColors.triadic.originalColor.a}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                triadic: {
                                  ...state.triadic,
                                  originalColor: {
                                    ...state.triadic.originalColor,
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
                          htmlFor="triadic-red-input"
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
                            id="triadic-red-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.triadic.originalColor.r}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                triadic: {
                                  ...state.triadic,
                                  originalColor: {
                                    ...state.triadic.originalColor,
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
                          htmlFor="triadic-green-input"
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
                            id="triadic-green-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.triadic.originalColor.g}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                triadic: {
                                  ...state.triadic,
                                  originalColor: {
                                    ...state.triadic.originalColor,
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
                          htmlFor="triadic-blue-input"
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
                            id="triadic-blue-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.triadic.originalColor.b}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                triadic: {
                                  ...state.triadic,
                                  originalColor: {
                                    ...state.triadic.originalColor,
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
                    {triadicColorActions.map((action, i) => (
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
                    <h3>Triadic</h3>

                    <p className="text-sm ">
                      Three colors that are evenly spaced on the color wheel. This
                      combination creates bold and vibrant color palettes.
                    </p>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </TabsContent>

        <TabsContent value="tetradic">
          <section className="flex w-full flex-col">
            <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 lg:flex-row ">
              <div className="base-shadow base-border grid max-h-[680px]  w-full grid-cols-5 overflow-clip rounded-2xl lg:max-w-[350px]">
                {[
                  ...harmonyColors.tetradic.values,
                  harmonyColors.tetradic.originalColor
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
                      {rawTetradicColors.values.map((array, arrIndex) => (
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
                                <p className="text-sm font-medium uppercase">
                                  {item.value}
                                </p>
                                <Button
                                  variant={'ghost'}
                                  size={'icon'}
                                  className="group rounded-full"
                                  onClick={() =>
                                    copyToClipboard(
                                      normalizeColorOutput(item.value, item.name)
                                    )
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
                          htmlFor="tetradic-alpha-input"
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
                            id="tetradic-alpha-input"
                            step={0.1}
                            min={0}
                            max={1}
                            value={harmonyColors.tetradic.originalColor.a}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                tetradic: {
                                  ...state.tetradic,
                                  originalColor: {
                                    ...state.tetradic.originalColor,
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
                          htmlFor="tetradic-red-input"
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
                            id="tetradic-red-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.tetradic.originalColor.r}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                tetradic: {
                                  ...state.tetradic,
                                  originalColor: {
                                    ...state.tetradic.originalColor,
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
                          htmlFor="tetradic-green-input"
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
                            id="tetradic-green-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.tetradic.originalColor.g}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                tetradic: {
                                  ...state.tetradic,
                                  originalColor: {
                                    ...state.tetradic.originalColor,
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
                          htmlFor="tetradic-blue-input"
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
                            id="tetradic-blue-input"
                            step={1}
                            min={0}
                            max={255}
                            value={harmonyColors.tetradic.originalColor.b}
                            onChange={(e) =>
                              setHarmonyColors((state) => ({
                                ...state,
                                tetradic: {
                                  ...state.tetradic,
                                  originalColor: {
                                    ...state.tetradic.originalColor,
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
                    {tetradicColorActions.map((action, i) => (
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
                    <h3>Tetradic</h3>

                    <p className="text-sm ">
                      Four colors that are evenly spaced on the color wheel. For this
                      combination, works best if you let one color be dominant and others as
                      accents.
                    </p>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </TabsContent>

        <TabsContent value="monochromatic">
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
                                <p className="text-sm font-medium uppercase">
                                  {item.value}
                                </p>
                                <Button
                                  variant={'ghost'}
                                  size={'icon'}
                                  className="group rounded-full"
                                  onClick={() =>
                                    copyToClipboard(
                                      normalizeColorOutput(item.value, item.name)
                                    )
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
                      Monochromatic variations (shades) of a single hue, made by altering
                      the saturation and brightness of the base color. This combination
                      creates bright color palette.
                    </p>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
