import {
  normalizeColorOutput,
  buildGradient,
  getDate,
  transformColorsToString,
  cn
} from '@/lib/utils';
import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  HARMONY_COLOR_STORAGE_KEY,
  MIXED_GRADIENT_STORAGE_KEY,
  SOLID_COLORS_STORAGE_KEY
} from '@/shared/constants';
import { HarmonyColorsDB, MixedGradient, SolidColor } from '@/types';
import { useDocumentTitle, useLocalStorage } from '@uidotdev/usehooks';
import {
  ArrowLeftIcon,
  BirdIcon,
  CandyCaneIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  DicesIcon,
  DropletIcon,
  DropletsIcon,
  Layers2Icon,
  Layers3Icon,
  PaintbrushIcon,
  PocketIcon,
  SailboatIcon
} from 'lucide-react';
import tinycolor from 'tinycolor2';
import { m as motion } from 'framer-motion';
import { SolidOptionsMenu } from '@/components/solid-colors-menu';
import { RemoveColorAlert } from '@/components/remove-color-alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyMessage } from '@/components/empty-message';
import { Fragment, useMemo } from 'react';
import { GradientsColorsMenu } from '@/components/gradient-colors-menu';
import { ComplementColorsMenu } from '@/components/complement-colors-menu';
import { GenericColorsMenu } from '@/components/generic-colors-menu';

export default function SavedColors() {
  useDocumentTitle('Palletone - Saved colors');

  const [solidColorsDB, updateSolidColorDB] = useLocalStorage<SolidColor[]>(
    SOLID_COLORS_STORAGE_KEY,
    []
  );

  const [gradientColorsDB, updateGradientColorsDB] = useLocalStorage<
    MixedGradient[]
  >(MIXED_GRADIENT_STORAGE_KEY, []);

  const [harmonyColorsDB, updateHarmonyColorsDB] = useLocalStorage<HarmonyColorsDB>(
    HARMONY_COLOR_STORAGE_KEY,
    {
      complement: [],
      splitComplement: [],
      analogous: [],
      triadic: [],
      tetradic: [],
      monochromatic: []
    }
  );

  const gradients = useMemo(() => {
    return gradientColorsDB.map((item) => ({
      ...item,
      color_1: {
        raw: item.color_1,
        stringColors: Object.entries(transformColorsToString(item.color_1)).map(
          ([key, value]) => ({
            name: key,
            color: value
          })
        )
      },
      color_2: {
        raw: item.color_2,
        stringColors: Object.entries(transformColorsToString(item.color_2)).map(
          ([key, value]) => ({
            name: key,
            color: value
          })
        )
      },
      CSSGradient: buildGradient(item.color_1, item.color_2)
    }));
  }, [gradientColorsDB]);

  const handleRemoveComplementColor = (id: string) =>
    updateHarmonyColorsDB((db) => ({
      ...db,
      complement: [...db.complement.filter((item) => item.id !== id)]
    }));

  const handleRemoveSplitComplementColor = (id: string) =>
    updateHarmonyColorsDB((db) => ({
      ...db,
      splitComplement: [...db.splitComplement.filter((item) => item.id !== id)]
    }));

  const handleRemoveMonochromaticColor = (id: string) =>
    updateHarmonyColorsDB((db) => ({
      ...db,
      monochromatic: [...db.monochromatic.filter((item) => item.id !== id)]
    }));

  const handleRemoveTetradicColor = (id: string) =>
    updateHarmonyColorsDB((db) => ({
      ...db,
      tetradic: [...db.tetradic.filter((item) => item.id !== id)]
    }));

  const handleRemoveTriadicColor = (id: string) =>
    updateHarmonyColorsDB((db) => ({
      ...db,
      triadic: [...db.triadic.filter((item) => item.id !== id)]
    }));

  const handleRemoveAnalogousColor = (id: string) =>
    updateHarmonyColorsDB((db) => ({
      ...db,
      analogous: [...db.analogous.filter((item) => item.id !== id)]
    }));

  const handleRemoveSolidColor = (id: string) =>
    updateSolidColorDB((db) => [...db.filter((color) => color.id !== id)]);

  const handleRemoveGradientColor = (id: string) =>
    updateGradientColorsDB((db) => [...db.filter((color) => color.id !== id)]);

  return (
    <main className="w-full pb-24 pt-20">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-2">
        <div className=" flex items-center gap-4 ">
          <TooltipWrapper content="Get back">
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={() => history.back()}
              className="rounded-full">
              <ArrowLeftIcon />
            </Button>
          </TooltipWrapper>
          <h1 className="flex items-center gap-2">
            <PocketIcon className="h-auto w-6" />
            <span className="text-lg">Saved Colors</span>
          </h1>
        </div>

        <Separator decorative />

        <Tabs defaultValue="solid" className="w-full px-2">
          <TabsList className="mb-3 w-full bg-background-default">
            <section className="flex w-full flex-row flex-nowrap gap-1 overflow-x-auto  bg-background-default py-3 px-2">
              <TabsTrigger value="solid" className="rounded-full px-2">
                <span className="font-semibold transition-colors group-hover:text-blue-400">
                  Solids
                </span>
              </TabsTrigger>
              <TabsTrigger value="gradient" className="rounded-full px-2">
                <span className="font-semibold transition-colors group-hover:text-blue-400">
                  Gradients
                </span>
              </TabsTrigger>
              <TabsTrigger value="complement" className="rounded-full px-2">
                <span className="font-semibold transition-colors group-hover:text-blue-400">
                  Complement
                </span>
              </TabsTrigger>
              <TabsTrigger value="analogous" className="rounded-full px-2">
                <span className="font-semibold transition-colors group-hover:text-blue-400">
                  Analogous
                </span>
              </TabsTrigger>
              <TabsTrigger value="split-complement" className="rounded-full px-2">
                <span className="font-semibold transition-colors group-hover:text-blue-400">
                  Complement/2
                </span>
              </TabsTrigger>
              <TabsTrigger value="triadic" className="rounded-full px-2">
                <span className="font-semibold transition-colors group-hover:text-blue-400">
                  Triadic
                </span>
              </TabsTrigger>
              <TabsTrigger value="tetradic" className="rounded-full px-2">
                <span className="font-semibold transition-colors group-hover:text-blue-400">
                  Tetradic
                </span>
              </TabsTrigger>
              <TabsTrigger value="monochromatic" className="rounded-full px-2">
                <span className="font-semibold transition-colors group-hover:text-blue-400">
                  Monochromatic
                </span>
              </TabsTrigger>
            </section>
          </TabsList>

          <TabsContent value="solid">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {solidColorsDB.length} solid colors.</h3>
              <Separator decorative className="mb-2" />

              {solidColorsDB.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {solidColorsDB
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, value, createdAt }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.1 } }}
                        whileHover={{ y: -10, transition: { delay: 0 } }}
                        className="base-border base-shadow flex w-full flex-col gap-3 rounded-2xl p-1 pb-2"
                        key={id}>
                        <div
                          style={{ background: tinycolor(value).toRgbString() }}
                          className="base-shadow base-border relative min-h-[200px] rounded-2xl md:w-full md:max-w-[220px]">
                          <span className="base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 px-2 text-xs font-semibold">
                            {normalizeColorOutput(
                              transformColorsToString(value).hex,
                              'hex'
                            )}
                          </span>
                        </div>

                        <div className="flex w-full items-center justify-between gap-1 px-2">
                          <p className="text-xs font-medium">{getDate(createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <RemoveColorAlert
                              onConfirm={() => handleRemoveSolidColor(id)}
                            />
                            <SolidOptionsMenu color={value} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </section>
              ) : null}

              {solidColorsDB.length < 1 ? (
                <EmptyMessage
                  icon={DropletIcon}
                  message="Your saved colors will appear here. Collect and save some colors to start."
                />
              ) : null}
            </section>
          </TabsContent>

          <TabsContent value="gradient">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {gradientColorsDB.length} gradient colors.</h3>
              <Separator decorative className="mb-2" />

              {gradientColorsDB.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {gradients
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, color_1, color_2, CSSGradient, createdAt }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.1 } }}
                        whileHover={{ y: -10, transition: { delay: 0 } }}
                        className="base-border base-shadow flex w-full flex-col gap-3 rounded-2xl p-1 pb-2"
                        key={id}>
                        <div
                          style={{ ...CSSGradient.linearGradient.value }}
                          className="base-shadow base-border relative min-h-[200px] rounded-2xl md:w-full md:max-w-[220px]">
                          <span className="base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 px-2 text-xs font-semibold">
                            {normalizeColorOutput(
                              transformColorsToString(color_1.raw).hex,
                              'hex'
                            )}
                          </span>
                          <span className="base-border absolute left-2 top-10 h-fit w-fit rounded-full bg-background-default p-1 px-2 text-xs font-semibold">
                            {normalizeColorOutput(
                              transformColorsToString(color_2.raw).hex,
                              'hex'
                            )}
                          </span>
                        </div>

                        <div className="flex w-full items-center justify-between gap-1 px-2">
                          <p className="text-xs font-medium">{getDate(createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <RemoveColorAlert
                              onConfirm={() => handleRemoveGradientColor(id)}
                            />
                            <GradientsColorsMenu
                              color_1={color_1}
                              color_2={color_2}
                              linearCSSGradient={
                                CSSGradient.linearGradient.cssString
                              }
                              radialCSSGradient={
                                CSSGradient.radialGradient.cssString
                              }
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </section>
              ) : null}

              {gradientColorsDB.length < 1 ? (
                <EmptyMessage
                  icon={DropletsIcon}
                  message="Your saved gradients will appear here. Collect and save some gradient colors to start."
                />
              ) : null}
            </section>
          </TabsContent>

          <TabsContent value="complement">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {harmonyColorsDB.complement.length} complement colors.</h3>
              <Separator decorative className="mb-2" />

              {harmonyColorsDB.complement.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {harmonyColorsDB.complement
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, createdAt, originalColor, value }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.1 } }}
                        whileHover={{ y: -10, transition: { delay: 0 } }}
                        className="base-border base-shadow flex w-full flex-col gap-3 rounded-2xl p-1 pb-2"
                        key={id}>
                        <div className="base-shadow base-border base-shadow base-border relative grid max-h-[540px] min-h-[200px] w-full grid-cols-2 overflow-clip  rounded-2xl md:w-full md:max-w-[220px] lg:max-w-[320px]">
                          {[value, originalColor].map((value, i) => (
                            <Fragment key={i}>
                              <div
                                style={{
                                  background: tinycolor(value).toRgbString()
                                }}
                                className="relative min-h-40 w-full">
                                <span
                                  className={cn(
                                    'base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 text-xs font-bold',
                                    { 'h-fit w-fit px-2': i > 2 }
                                  )}>
                                  {i > 0 ? 'Original' : `Complement`}
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </div>

                        <div className="flex w-full items-center justify-between gap-1 px-2">
                          <p className="text-xs font-medium">{getDate(createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <RemoveColorAlert
                              onConfirm={() => handleRemoveComplementColor(id)}
                            />
                            <ComplementColorsMenu
                              originalColor={originalColor}
                              complementColor={value}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </section>
              ) : null}

              {harmonyColorsDB.complement.length < 1 ? (
                <EmptyMessage
                  icon={SailboatIcon}
                  message="Your saved complement colors will appear here. Collect and save some complement colors to start."
                />
              ) : null}
            </section>
          </TabsContent>

          <TabsContent value="analogous">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {harmonyColorsDB.analogous.length} analogous colors.</h3>
              <Separator decorative className="mb-2" />

              {harmonyColorsDB.analogous.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {harmonyColorsDB.analogous
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, createdAt, originalColor, values }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.1 } }}
                        whileHover={{ y: -10, transition: { delay: 0 } }}
                        className="base-border base-shadow flex w-full flex-col gap-3 rounded-2xl p-1 pb-2"
                        key={id}>
                        <div className="base-shadow base-border base-shadow base-border relative grid max-h-[540px] min-h-[200px] w-full grid-cols-4 overflow-clip  rounded-2xl md:w-full md:max-w-[220px] lg:max-w-[320px]">
                          {[...values, originalColor].map((value, i) => (
                            <Fragment key={i}>
                              <div
                                style={{
                                  background: tinycolor(value).toRgbString()
                                }}
                                className="relative min-h-40 w-full">
                                <span
                                  className={cn(
                                    'base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 text-xs font-bold',
                                    { hidden: i > 2 }
                                  )}>
                                  {i > 2 ? '' : `0${i + 1}`}
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </div>

                        <div className="flex w-full items-center justify-between gap-1 px-2">
                          <p className="text-xs font-medium">{getDate(createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <RemoveColorAlert
                              onConfirm={() => handleRemoveAnalogousColor(id)}
                            />
                            <GenericColorsMenu
                              title="Analogous Colors"
                              originalColor={originalColor}
                              values={values}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </section>
              ) : null}

              {harmonyColorsDB.analogous.length < 1 ? (
                <EmptyMessage
                  icon={SailboatIcon}
                  message="Your saved analogous colors will appear here. Collect and save some analogous colors to start."
                />
              ) : null}
            </section>
          </TabsContent>

          <TabsContent value="split-complement">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>
                About {harmonyColorsDB.splitComplement.length} split complement
                colors.
              </h3>
              <Separator decorative className="mb-2" />

              {harmonyColorsDB.splitComplement.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {harmonyColorsDB.splitComplement
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, createdAt, originalColor, values }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.1 } }}
                        whileHover={{ y: -10, transition: { delay: 0 } }}
                        className="base-border base-shadow flex w-full flex-col gap-3 rounded-2xl p-1 pb-2"
                        key={id}>
                        <div className="base-shadow base-border base-shadow base-border relative grid max-h-[540px] min-h-[200px] w-full grid-cols-4 overflow-clip  rounded-2xl md:w-full md:max-w-[220px] lg:max-w-[320px]">
                          {[...values, originalColor].map((value, i) => (
                            <Fragment key={i}>
                              <div
                                style={{
                                  background: tinycolor(value).toRgbString()
                                }}
                                className="relative min-h-40 w-full">
                                <span
                                  className={cn(
                                    'base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 text-xs font-bold',
                                    { hidden: i > 2 }
                                  )}>
                                  {i > 2 ? '' : `0${i + 1}`}
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </div>

                        <div className="flex w-full items-center justify-between gap-1 px-2">
                          <p className="text-xs font-medium">{getDate(createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <RemoveColorAlert
                              onConfirm={() => handleRemoveSplitComplementColor(id)}
                            />
                            <GenericColorsMenu
                              title="Split Complement"
                              originalColor={originalColor}
                              values={values}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </section>
              ) : null}

              {harmonyColorsDB.splitComplement.length < 1 ? (
                <EmptyMessage
                  icon={Layers2Icon}
                  message="Your saved split complement colors will appear here. Collect and save some split complement colors to start."
                />
              ) : null}
            </section>
          </TabsContent>

          <TabsContent value="triadic">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {harmonyColorsDB.triadic.length} triadic colors.</h3>
              <Separator decorative className="mb-2" />

              {harmonyColorsDB.triadic.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {harmonyColorsDB.triadic
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, createdAt, originalColor, values }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.1 } }}
                        whileHover={{ y: -10, transition: { delay: 0 } }}
                        className="base-border base-shadow flex w-full flex-col gap-3 rounded-2xl p-1 pb-2"
                        key={id}>
                        <div className="base-shadow base-border base-shadow base-border relative grid max-h-[540px] min-h-[200px] w-full grid-cols-4 overflow-clip rounded-2xl md:w-full md:max-w-[220px] lg:max-w-[320px]">
                          {[...values, originalColor].map((value, i) => (
                            <Fragment key={i}>
                              <div
                                style={{
                                  background: tinycolor(value).toRgbString()
                                }}
                                className="relative min-h-40 w-full">
                                <span
                                  className={cn(
                                    'base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 text-xs font-bold',
                                    { hidden: i > 2 }
                                  )}>
                                  {i > 2 ? '' : `0${i + 1}`}
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </div>

                        <div className="flex w-full items-center justify-between gap-1 px-2">
                          <p className="text-xs font-medium">{getDate(createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <RemoveColorAlert
                              onConfirm={() => handleRemoveTriadicColor(id)}
                            />
                            <GenericColorsMenu
                              title="Triadic"
                              originalColor={originalColor}
                              values={values}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </section>
              ) : null}

              {harmonyColorsDB.triadic.length < 1 ? (
                <EmptyMessage
                  icon={Layers3Icon}
                  message="Your saved triadic colors will appear here. Collect and save some triadic colors to start."
                />
              ) : null}
            </section>
          </TabsContent>

          <TabsContent value="tetradic">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {harmonyColorsDB.tetradic.length} tetradic colors.</h3>
              <Separator decorative className="mb-2" />

              {harmonyColorsDB.tetradic.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {harmonyColorsDB.tetradic
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, createdAt, originalColor, values }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.1 } }}
                        whileHover={{ y: -10, transition: { delay: 0 } }}
                        className="base-border base-shadow flex w-full flex-col gap-3 rounded-2xl p-1 pb-2"
                        key={id}>
                        <div className="base-shadow base-border base-shadow base-border relative grid max-h-[540px] min-h-[200px] w-full grid-cols-5 overflow-clip rounded-2xl md:w-full md:max-w-[220px] lg:max-w-[320px]">
                          {[...values, originalColor].map((value, i) => (
                            <Fragment key={i}>
                              <div
                                style={{
                                  background: tinycolor(value).toRgbString()
                                }}
                                className="relative min-h-40 w-full">
                                <span
                                  className={cn(
                                    'base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 text-xs font-bold',
                                    { ['hidden']: i > 3 }
                                  )}>
                                  {i > 3 ? '' : `0${i + 1}`}
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </div>

                        <div className="flex w-full items-center justify-between gap-1 px-2">
                          <p className="text-xs font-medium">{getDate(createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <RemoveColorAlert
                              onConfirm={() => handleRemoveTetradicColor(id)}
                            />
                            <GenericColorsMenu
                              title="Tetradic"
                              originalColor={originalColor}
                              values={values}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </section>
              ) : null}

              {harmonyColorsDB.tetradic.length < 1 ? (
                <EmptyMessage
                  icon={Layers3Icon}
                  message="Your saved tetradic colors will appear here. Collect and save some tetradic colors to start."
                />
              ) : null}
            </section>
          </TabsContent>

          <TabsContent value="monochromatic">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {harmonyColorsDB.monochromatic.length} chroma colors.</h3>
              <Separator decorative className="mb-2" />

              {harmonyColorsDB.monochromatic.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {harmonyColorsDB.monochromatic
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, createdAt, originalColor, chroma }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.1 } }}
                        whileHover={{ y: -10, transition: { delay: 0 } }}
                        className="base-border base-shadow flex w-full flex-col gap-3 rounded-2xl p-1 pb-2"
                        key={id}>
                        <div className="base-shadow base-border base-shadow base-border relative grid max-h-[540px] min-h-[200px] w-full grid-cols-5 overflow-clip rounded-2xl md:w-full md:max-w-[220px] lg:max-w-[320px]">
                          {[...chroma, originalColor].map((value, i) => (
                            <Fragment key={i}>
                              <div
                                style={{
                                  background: tinycolor(value).toRgbString()
                                }}
                                className="relative min-h-40 w-full">
                                <span
                                  className={cn(
                                    'base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 text-xs font-bold',
                                    { ['hidden']: i > 3 }
                                  )}>
                                  {i > 3 ? '' : `0${i + 1}`}
                                </span>
                              </div>
                            </Fragment>
                          ))}
                        </div>

                        <div className="flex w-full items-center justify-between gap-1 px-2">
                          <p className="text-xs font-medium">{getDate(createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <RemoveColorAlert
                              onConfirm={() => handleRemoveMonochromaticColor(id)}
                            />
                            <GenericColorsMenu
                              title="Monochromatic"
                              originalColor={originalColor}
                              values={chroma}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </section>
              ) : null}

              {harmonyColorsDB.monochromatic.length < 1 ? (
                <EmptyMessage
                  icon={Layers3Icon}
                  message="Your saved monochromatic colors will appear here. Collect and save some monochromatic colors to start."
                />
              ) : null}
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
