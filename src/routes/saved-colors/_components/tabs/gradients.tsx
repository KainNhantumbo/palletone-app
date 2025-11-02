import { EmptyMessage } from '@/components/empty-message';
import { GradientsColorsMenu } from '@/components/gradient-colors-menu';
import { RemoveColorAlert } from '@/components/remove-color-alert';
import { Separator } from '@/components/ui/separator';
import {
  buildGradient,
  getDate,
  normalizeColorOutput,
  transformColorsToString
} from '@/lib/utils';
import { MIXED_GRADIENT_STORAGE_KEY } from '@/shared/constants';
import { MixedGradient } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { m as motion } from 'framer-motion';
import { DropletsIcon } from 'lucide-react';
import { useMemo } from 'react';

export function GradientsTab() {
  const [gradientColorsDB, updateGradientColorsDB] = useLocalStorage<MixedGradient[]>(
    MIXED_GRADIENT_STORAGE_KEY,
    []
  );

  const gradients = useMemo(() => {
    return gradientColorsDB.map((item) => ({
      ...item,
      color_1: {
        raw: item.color_1,
        stringColors: Object.entries(transformColorsToString(item.color_1)).map(
          ([key, value]) => ({ name: key, color: value })
        )
      },
      color_2: {
        raw: item.color_2,
        stringColors: Object.entries(transformColorsToString(item.color_2)).map(
          ([key, value]) => ({ name: key, color: value })
        )
      },
      CSSGradient: buildGradient(item.color_1, item.color_2)
    }));
  }, [gradientColorsDB]);

  const handleRemoveGradientColor = (id: string) =>
    updateGradientColorsDB((db) => [...db.filter((color) => color.id !== id)]);

  return (
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
                  className="base-shadow base-border relative min-h-[200px] w-full rounded-2xl">
                  <span className="base-border absolute left-2 top-2 h-fit w-fit rounded-full bg-background-default p-1 px-2 text-xs font-semibold">
                    {normalizeColorOutput(transformColorsToString(color_1.raw).hex, 'hex')}
                  </span>
                  <span className="base-border absolute left-2 top-10 h-fit w-fit rounded-full bg-background-default p-1 px-2 text-xs font-semibold">
                    {normalizeColorOutput(transformColorsToString(color_2.raw).hex, 'hex')}
                  </span>
                </div>

                <div className="flex w-full items-center justify-between gap-1 px-2">
                  <p className="text-xs font-medium">{getDate(createdAt)}</p>
                  <div className="flex items-center gap-1">
                    <RemoveColorAlert onConfirm={() => handleRemoveGradientColor(id)} />
                    <GradientsColorsMenu
                      color_1={color_1}
                      color_2={color_2}
                      linearCSSGradient={CSSGradient.linearGradient.cssString}
                      radialCSSGradient={CSSGradient.radialGradient.cssString}
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
  );
}
