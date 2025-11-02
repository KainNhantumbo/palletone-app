import { EmptyMessage } from '@/components/empty-message';
import { GenericColorsMenu } from '@/components/generic-colors-menu';
import { RemoveColorAlert } from '@/components/remove-color-alert';
import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { initialHarmonyColorsValue } from '@/hooks/use-harmony-colors';
import { cn, getDate } from '@/lib/utils';
import { HARMONY_COLOR_STORAGE_KEY } from '@/shared/constants';
import { HarmonyColorsDB } from '@/types';
import { useDocumentTitle, useLocalStorage } from '@uidotdev/usehooks';
import { m as motion } from 'framer-motion';
import { ArrowLeftIcon, Layers3Icon, PocketIcon } from 'lucide-react';
import { Fragment } from 'react';
import tinycolor from 'tinycolor2';

export default function SavedColors() {
  useDocumentTitle('Palletone - Saved colors');

  const [harmonyColorsDB, updateHarmonyColorsDB] = useLocalStorage<HarmonyColorsDB>(
    HARMONY_COLOR_STORAGE_KEY,
    initialHarmonyColorsValue
  );

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
