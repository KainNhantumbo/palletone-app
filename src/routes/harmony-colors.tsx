import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  copyToClipboard,
  normalizeColorOutput,
  randomColor,
  transformColorsToString
} from "@/lib/utils";
import { HARMONY_COLOR_STORAGE_KEY } from "@/shared/constants";
import type {
  ColorActions,
  HarmonyColors,
  HarmonyColorsDB,
  RGBA
} from "@/types";
import { useDocumentTitle, useLocalStorage } from "@uidotdev/usehooks";
import compareObjects from "lodash.isequal";
import {
  BoxSelectIcon,
  CopyIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  DicesIcon,
  DownloadIcon,
  ShuffleIcon
} from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { toast } from "sonner";
import tinycolor from "tinycolor2";

export default function HarmonyColors() {
  useDocumentTitle("Palletone - Harmony Colors");

  const [harmonyColors, setHarmonyColors] = useState<HarmonyColors>({
    complementColors: {
      originalColor: randomColor(),
      complement: randomColor()
    },
    splitComplement: { originalColor: randomColor(), values: [] },
    analogous: { originalColor: randomColor(), values: [] },
    triadic: { originalColor: randomColor(), values: [] },
    tetradic: { originalColor: randomColor(), values: [] },
    monochromatic: { originalColor: randomColor(), chroma: [] }
  });

  const [, updateHarmonyColorsDB] = useLocalStorage<HarmonyColorsDB>(
    HARMONY_COLOR_STORAGE_KEY,
    {
      complementColors: [],
      splitComplement: [],
      analogous: [],
      triadic: [],
      tetradic: [],
      monochromatic: []
    }
  );

  // complement functions
  useMemo(() => {
    const complement = tinycolor(harmonyColors.complementColors.originalColor)
      .complement()
      .toRgb();

    setHarmonyColors((current) => ({
      ...current,
      complementColors: { ...current.complementColors, complement }
    }));
  }, [harmonyColors.complementColors.originalColor]);

  const complementColorsString = useMemo(
    () => ({
      color: transformColorsToString(
        harmonyColors.complementColors.originalColor
      ),
      complement: transformColorsToString(
        harmonyColors.complementColors.complement
      )
    }),
    [harmonyColors.complementColors]
  );

  const rawComplementColors = {
    color: Object.entries(complementColorsString.color).map(([key, value]) => ({
      name: key,
      value
    })),
    complement: Object.entries(complementColorsString.complement).map(
      ([key, value]) => ({
        name: key,
        value
      })
    )
  };

  const complementColorActions: ColorActions = [
    {
      name: "random color",
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((current) => ({
          ...current,
          complementColors: {
            ...current.complementColors,
            originalColor: randomColor()
          }
        }))
    },
    {
      name: "save color",
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.complementColors
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(
                originalColor,
                harmonyColors.complementColors.originalColor
              )
            );

          if (isDuplicate) {
            toast.error("Complement color already saved.");
            return db;
          }
          return {
            ...db,
            complementColors: [
              ...db.complementColors,
              { ...harmonyColors.complementColors, id: crypto.randomUUID() }
            ]
          };
        });
      }
    }
  ];

  // TODO: analogous functions
  useMemo(() => {
    const resultArray = tinycolor(harmonyColors.analogous.originalColor)
      .analogous()
      .map((instance) => instance.toRgb());

    setHarmonyColors((current) => ({
      ...current,
      analogous: { ...current.analogous, values: resultArray }
    }));
  }, [harmonyColors.analogous.originalColor]);

  const analogousColorsString = useMemo(
    () => ({
      originalColor: transformColorsToString(
        harmonyColors.analogous.originalColor
      ),
      values: harmonyColors.analogous.values.map((value) =>
        transformColorsToString(value)
      )
    }),
    [harmonyColors.analogous]
  );

  const rawAnalogousColors = {
    originalColor: Object.entries(analogousColorsString.originalColor).map(
      ([key, value]) => ({
        name: key,
        value
      })
    ),
    values: analogousColorsString.values.map((item) =>
      Object.entries(item).map(([key, value]) => ({
        name: key,
        value
      }))
    )
  };

  const analogousColorActions: ColorActions = [
    {
      name: "random color",
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((current) => ({
          ...current,
          analogous: {
            ...current.analogous,
            originalColor: randomColor()
          }
        }))
    },
    {
      name: "save color",
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.analogous
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(
                originalColor,
                harmonyColors.analogous.originalColor
              )
            );

          if (isDuplicate) {
            toast.error("Analogous color already saved.");
            return db;
          }
          return {
            ...db,
            analogous: [
              ...db.analogous,
              { ...harmonyColors.analogous, id: crypto.randomUUID() }
            ]
          };
        });
      }
    }
  ];

  // TODO: split complement functions
  useMemo(() => {
    const resultArray = tinycolor(harmonyColors.splitComplement.originalColor)
      .splitcomplement()
      .map((instance) => instance.toRgb());

    setHarmonyColors((current) => ({
      ...current,
      splitComplement: { ...current.splitComplement, values: resultArray }
    }));
  }, [harmonyColors.splitComplement.originalColor]);

  const splitComplementColorsString = useMemo(
    () => ({
      originalColor: transformColorsToString(
        harmonyColors.splitComplement.originalColor
      ),
      values: harmonyColors.splitComplement.values.map((value) =>
        transformColorsToString(value)
      )
    }),
    [harmonyColors.splitComplement]
  );

  const rawSplitComplementColors = {
    originalColor: Object.entries(
      splitComplementColorsString.originalColor
    ).map(([key, value]) => ({
      name: key,
      value
    })),
    values: splitComplementColorsString.values.map((item) =>
      Object.entries(item).map(([key, value]) => ({
        name: key,
        value
      }))
    )
  };

  const splitComplementColorActions: ColorActions = [
    {
      name: "random color",
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((current) => ({
          ...current,
          splitComplement: {
            ...current.splitComplement,
            originalColor: randomColor()
          }
        }))
    },
    {
      name: "save color",
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.splitComplement
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(
                originalColor,
                harmonyColors.splitComplement.originalColor
              )
            );

          if (isDuplicate) {
            toast.error("Split complement colors already saved.");
            return db;
          }
          return {
            ...db,
            splitComplement: [
              ...db.splitComplement,
              { ...harmonyColors.splitComplement, id: crypto.randomUUID() }
            ]
          };
        });
      }
    }
  ];

  // TODO: split triadic functions

  // TODO: split tetradic functions

  // TODO: split monochromatic functions
  // console.info(
  //   tinycolor().monochromatic()
  // )

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

        <TabsContent value="complement" className="flex w-full flex-col">
          <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4 lg:flex-row">
            <div className="base-shadow base-border grid w-full grid-cols-2 rounded-2xl lg:max-w-[380px]">
              <div
                style={{
                  background: tinycolor(
                    harmonyColors.complementColors.originalColor
                  ).toRgbString()
                }}
                className="min-h-60 w-full rounded-l-2xl"
              />
              <div
                style={{
                  background: tinycolor(
                    harmonyColors.complementColors.complement
                  ).toRgbString()
                }}
                className="min-h-60 w-full rounded-r-2xl"
              />
            </div>
            <section className="flex w-full flex-col gap-3">
              <div className="flex w-full flex-wrap items-center justify-center gap-2 md:flex-nowrap">
                {complementColorActions.map((action, i) => (
                  <Button
                    key={i}
                    variant={"outline"}
                    size={"lg"}
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
              <div className="flex flex-col gap-2">
                <h3>Complement</h3>

                <p className="text-sm ">
                  Two colors that are on opposite side of the color wheel. This
                  combination has an extremely high contrast and termed as loud.
                </p>
              </div>

              <Separator decorative />

              <section>
                <h3 className="my-1 mb-2">Complement Color</h3>
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
                          <p className="text-sm font-medium uppercase">
                            {item.value}
                          </p>
                          <Button
                            variant={"ghost"}
                            size={"icon"}
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

                <Separator decorative />
                <h3 className="my-1 mb-2">Original Color</h3>

                <div className="flex w-full flex-wrap items-center justify-center gap-3 md:flex-nowrap">
                  {rawComplementColors.color.map((item, i) => (
                    <Fragment key={i}>
                      <div className="flex w-fit flex-col items-center gap-1">
                        <div className="flex w-fit items-center gap-3">
                          <h3 className="text-sm font-semibold uppercase text-primary-default">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium uppercase">
                            {item.value}
                          </p>
                          <Button
                            variant={"ghost"}
                            size={"icon"}
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

              <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
                <div className="flex w-full items-center gap-3">
                  <Label
                    htmlFor="alpha-input"
                    className="w-12 text-xs font-medium uppercase">
                    alpha
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
                      id="alpha-input"
                      step={0.1}
                      min={0}
                      max={1}
                      value={harmonyColors.complementColors.originalColor.a}
                      onChange={(e) =>
                        setHarmonyColors((current) => ({
                          ...current,
                          complementColors: {
                            ...current.complementColors,
                            originalColor: {
                              ...current.complementColors.originalColor,
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
                    htmlFor="red-input"
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
                      id="red-input"
                      step={1}
                      min={0}
                      max={255}
                      value={harmonyColors.complementColors.originalColor.r}
                      onChange={(e) =>
                        setHarmonyColors((current) => ({
                          ...current,
                          complementColors: {
                            ...current.complementColors,
                            originalColor: {
                              ...current.complementColors.originalColor,
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
                    htmlFor="green-input"
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
                      id="green-input"
                      step={1}
                      min={0}
                      max={255}
                      value={harmonyColors.complementColors.originalColor.g}
                      onChange={(e) =>
                        setHarmonyColors((current) => ({
                          ...current,
                          complementColors: {
                            ...current.complementColors,
                            originalColor: {
                              ...current.complementColors.originalColor,
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
                    htmlFor="blue-input"
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
                      id="blue-input"
                      step={1}
                      min={0}
                      max={255}
                      value={harmonyColors.complementColors.originalColor.b}
                      onChange={(e) =>
                        setHarmonyColors((current) => ({
                          ...current,
                          complementColors: {
                            ...current.complementColors,
                            originalColor: {
                              ...current.complementColors.originalColor,
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
            </section>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
