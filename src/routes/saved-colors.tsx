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
  CopyIcon,
  DropletIcon,
  PaintbrushIcon,
  PocketIcon
} from 'lucide-react';
import { RemoveColorAlert } from '@/components/remove-color-alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import tinycolor from 'tinycolor2';
import { m as motion } from 'framer-motion';
import { SolidOptionsMenu } from '@/components/solid-colors-menu';

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

          <TabsContent value="solid" className="flex w-full flex-col">
            <section className="base-border grid w-full grid-cols-1 gap-2 rounded-2xl bg-foreground-default p-4 mobile:grid-cols-2 md:grid-cols-3 md:flex-row md:gap-3">
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
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
