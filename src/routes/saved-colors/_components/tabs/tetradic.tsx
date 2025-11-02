import { EmptyMessage } from '@/components/empty-message';
import { GenericColorsMenu } from '@/components/generic-colors-menu';
import { RemoveColorAlert } from '@/components/remove-color-alert';
import { Separator } from '@/components/ui/separator';
import { initialHarmonyColorsValue } from '@/hooks/use-harmony-colors';
import { cn, getDate } from '@/lib/utils';
import { HARMONY_COLOR_STORAGE_KEY } from '@/shared/constants';
import { HarmonyColorsDB } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { m as motion } from 'framer-motion';
import { Layers3Icon } from 'lucide-react';
import { Fragment } from 'react';
import tinycolor from 'tinycolor2';

export function TetradicTab() {
  const [harmonyColorsDB, updateHarmonyColorsDB] = useLocalStorage<HarmonyColorsDB>(
    HARMONY_COLOR_STORAGE_KEY,
    initialHarmonyColorsValue
  );

  const handleRemoveTetradicColor = (id: string) =>
    updateHarmonyColorsDB((db) => ({
      ...db,
      tetradic: [...db.tetradic.filter((item) => item.id !== id)]
    }));

  return (
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
                    <RemoveColorAlert onConfirm={() => handleRemoveTetradicColor(id)} />
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
  );
}
