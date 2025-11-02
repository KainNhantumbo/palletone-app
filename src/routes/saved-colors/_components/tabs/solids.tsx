import { EmptyMessage } from '@/components/empty-message';
import { RemoveColorAlert } from '@/components/remove-color-alert';
import { SolidOptionsMenu } from '@/components/solid-colors-menu';
import { Separator } from '@/components/ui/separator';
import { getDate, normalizeColorOutput, transformColorsToString } from '@/lib/utils';
import { SOLID_COLORS_STORAGE_KEY } from '@/shared/constants';
import { SolidColor } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { m as motion } from 'framer-motion';
import { DropletIcon } from 'lucide-react';
import tinycolor from 'tinycolor2';

export function SavedTab() {
  const [solidColorsDB, updateSolidColorDB] = useLocalStorage<SolidColor[]>(
    SOLID_COLORS_STORAGE_KEY,
    []
  );

  const handleRemoveSolidColor = (id: string) =>
    updateSolidColorDB((db) => [...db.filter((color) => color.id !== id)]);

  return (
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
                    {normalizeColorOutput(transformColorsToString(value).hex, 'hex')}
                  </span>
                </div>

                <div className="flex w-full items-center justify-between gap-1 px-2">
                  <p className="text-xs font-medium">{getDate(createdAt)}</p>
                  <div className="flex items-center gap-1">
                    <RemoveColorAlert onConfirm={() => handleRemoveSolidColor(id)} />
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
  );
}
