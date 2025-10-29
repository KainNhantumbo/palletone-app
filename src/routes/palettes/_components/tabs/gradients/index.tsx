import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { buildGradient, copyToClipboard, randomColor } from '@/lib/utils';
import { MIXED_GRADIENT_STORAGE_KEY } from '@/shared/constants';
import type { ColorActions, MixedGradient } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import compareObjects from 'fast-deep-equal';
import * as Lucide from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export function GradientsTab() {
  const [gradientRGBA, setGradientRGBA] = useState<Omit<MixedGradient, 'id' | 'createdAt'>>(
    () => ({
      color_1: randomColor(),
      color_2: randomColor()
    })
  );

  const [gradientColorsDB, updateGradientColorsDB] = useLocalStorage<MixedGradient[]>(
    MIXED_GRADIENT_STORAGE_KEY,
    []
  );

  const gradients = useMemo(
    () => buildGradient(gradientRGBA.color_1, gradientRGBA.color_2),
    [gradientRGBA]
  );

  const gradientColorActions: ColorActions = [
    {
      name: 'randomize',
      icon: Lucide.ShuffleIcon,
      handler: () =>
        setGradientRGBA((current) => ({
          ...current,
          color_1: randomColor(),
          color_2: randomColor()
        }))
    },
    {
      name: 'copy as CSS',
      icon: Lucide.CopyIcon,
      handler: () => copyToClipboard(gradients.linearGradient.cssString)
    },
    {
      name: 'save',
      icon: Lucide.DownloadIcon,
      handler: () => handleSaveGradient()
    }
  ];

  const handleSaveGradient = () => {
    const isDuplicate = gradientColorsDB.some(
      (values) =>
        compareObjects(values.color_1, gradientRGBA.color_1) &&
        compareObjects(values.color_2, gradientRGBA.color_2)
    );

    if (isDuplicate) return toast.error('Gradient already saved.');

    updateGradientColorsDB((current) => [
      ...current,
      {
        ...gradientRGBA,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }
    ]);
    toast.success('Gradient saved successfully.');
  };

  return (
    <section className="flex w-full flex-col">
      <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 md:flex-row">
        <div
          style={{ ...gradients.linearGradient.value }}
          className="base-shadow base-border min-h-[200px] w-full rounded-2xl md:w-[480px]"
        />

        <section className="flex w-full flex-col gap-3">
          <h3 className="mx-auto w-full max-w-lg">Gradient Color 1</h3>

          <section className="flex w-full flex-col gap-3">
            <div className="mx-auto mb-3 flex w-full max-w-lg flex-col gap-4">
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="gradient-1-alpha-input"
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
                    id="gradient-1-alpha-input"
                    type="range"
                    step={0.1}
                    min={0}
                    max={1}
                    value={gradientRGBA.color_1.a}
                    onChange={(e) =>
                      setGradientRGBA((current) => ({
                        ...current,
                        color_1: {
                          ...current.color_1,
                          a: parseFloat(e.target.value)
                        }
                      }))
                    }
                    className="base-range-input bg-slate-400 dark:bg-slate-600"
                  />
                </div>
              </div>
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="gradient-1-red-input"
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
                    id="gradient-1-red-input"
                    type="range"
                    step={1}
                    min={0}
                    max={255}
                    value={gradientRGBA.color_1.r}
                    className="base-range-input bg-red-600"
                    onChange={(e) =>
                      setGradientRGBA((current) => ({
                        ...current,
                        color_1: {
                          ...current.color_1,
                          r: parseFloat(e.target.value)
                        }
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="gradient-1-green-input"
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
                    id="gradient-1-green-input"
                    type="range"
                    step={1}
                    min={0}
                    max={255}
                    value={gradientRGBA.color_1.g}
                    className="base-range-input bg-green-600"
                    onChange={(e) =>
                      setGradientRGBA((current) => ({
                        ...current,
                        color_1: {
                          ...current.color_1,
                          g: parseFloat(e.target.value)
                        }
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="gradient-1-blue-input"
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
                    id="gradient-1-blue-input"
                    type="range"
                    step={1}
                    min={0}
                    max={255}
                    value={gradientRGBA.color_1.b}
                    className="base-range-input bg-blue-400"
                    onChange={(e) =>
                      setGradientRGBA((current) => ({
                        ...current,
                        color_1: {
                          ...current.color_1,
                          b: parseFloat(e.target.value)
                        }
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <Separator decorative />
          <h3 className="mx-auto w-full max-w-lg">Gradient Color 2</h3>

          <section className="mb-3 flex w-full flex-col gap-3">
            <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="gradient-2-alpha-input"
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
                    id="gradient-2-alpha-input"
                    type="range"
                    step={0.1}
                    min={0}
                    max={1}
                    value={gradientRGBA.color_2.a}
                    onChange={(e) =>
                      setGradientRGBA((current) => ({
                        ...current,
                        color_2: {
                          ...current.color_2,
                          a: parseFloat(e.target.value)
                        }
                      }))
                    }
                    className="base-range-input bg-slate-400 dark:bg-slate-600"
                  />
                </div>
              </div>
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="gradient-2-red-input"
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
                    id="gradient-2-red-input"
                    type="range"
                    step={1}
                    min={0}
                    max={255}
                    value={gradientRGBA.color_2.r}
                    className="base-range-input bg-red-600"
                    onChange={(e) =>
                      setGradientRGBA((current) => ({
                        ...current,
                        color_2: {
                          ...current.color_2,
                          r: parseFloat(e.target.value)
                        }
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="gradient-2-green-input"
                  className="w-12 text-xs font-medium uppercase">
                  green
                </Label>
                <div className="relative -top-1 w-full ">
                  <span className="first-letter: absolute -bottom-4 left-0 text-xs font-semibold ">
                    0
                  </span>
                  <span className="first-letter: absolute -bottom-4 right-0 text-xs font-semibold">
                    255
                  </span>
                  <input
                    id="gradient-2-green-input"
                    type="range"
                    step={1}
                    min={0}
                    max={255}
                    value={gradientRGBA.color_2.g}
                    className="base-range-input bg-green-600"
                    onChange={(e) =>
                      setGradientRGBA((current) => ({
                        ...current,
                        color_2: {
                          ...current.color_2,
                          g: parseFloat(e.target.value)
                        }
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex w-full items-center gap-3">
                <Label
                  htmlFor="gradient-2-blue-input"
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
                    id="gradient-2-blue-input"
                    type="range"
                    step={1}
                    min={0}
                    max={255}
                    value={gradientRGBA.color_2.b}
                    className="base-range-input bg-blue-400"
                    onChange={(e) =>
                      setGradientRGBA((current) => ({
                        ...current,
                        color_2: {
                          ...current.color_2,
                          b: parseFloat(e.target.value)
                        }
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <Separator decorative />

          <div className="flex w-full flex-wrap items-center justify-center gap-2 md:flex-nowrap">
            {gradientColorActions.map((action, i) => (
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
        </section>
      </section>
    </section>
  );
}
