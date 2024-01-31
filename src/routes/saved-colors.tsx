import {
  copyToClipboard,
  normalizeColorOutput,
  buildGradient,
  getDate,
  transformColorsToString
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
  CopyIcon,
  DropletIcon,
  PaintbrushIcon,
  PocketIcon
} from 'lucide-react';
import tinycolor from 'tinycolor2';
import { m as motion } from 'framer-motion';
import { SolidOptionsMenu } from '@/components/solid-colors-menu';
import { RemoveColorAlert } from '@/components/remove-color-alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyMessage } from '@/components/empty-message';
import { useMemo } from 'react';
import { GradientsColorsMenu } from '@/components/gradient-colors-menu';

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
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {solidColorsDB.length} colors saved.</h3>
              <Separator decorative className="mb-2" />

              {solidColorsDB.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {solidColorsDB
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, value, createdAt }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.2 } }}
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
                  icon={BirdIcon}
                  message="Your saved colors will appear here. Collect and save some colors to start."
                />
              ) : null}
            </section>
          </TabsContent>

          <TabsContent value="gradient">
            <section className="base-border flex w-full flex-col gap-3  rounded-2xl bg-foreground-default p-4">
              <h3>About {gradientColorsDB.length} gradients saved.</h3>
              <Separator decorative className="mb-2" />

              {gradientColorsDB.length > 0 ? (
                <section className="grid w-full grid-cols-1 gap-2 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
                  {gradients
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map(({ id, color_1, color_2, CSSGradient, createdAt }, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: i * 0.2 } }}
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
                  icon={CandyCaneIcon}
                  message="Your saved gradients will appear here. Collect and save some gradient colors to start."
                />
              ) : null}
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
