import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { randomColor, transformColorsToString } from "@/lib/utils";
import type { RGBA } from "@/types";
import { useDocumentTitle } from "@uidotdev/usehooks";
import {
  BoxSelectIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  DicesIcon
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import tinycolor from "tinycolor2";
import ColorWheel from "@uiw/react-color-wheel";

export type HarmonyColors = {
  complementHarmony: {
    color: RGBA;
    complement: RGBA;
  };
};

export default function HarmonyColors() {
  useDocumentTitle("Palletone - Harmony Colors");
  const [harmonyColors, setHarmonyColors] = useState<HarmonyColors>({
    complementHarmony: { color: randomColor(), complement: randomColor() }
  });

  const handleComplementColor = (value: string) => {
    if (!tinycolor(value).isValid()) return toast.error("Invalid color input");

    const complement = tinycolor(value).complement().toRgb();
    const color = tinycolor(value).toRgb();

    setHarmonyColors((current) => ({
      ...current,
      complementHarmony: { ...current.complementHarmony, color, complement }
    }));
  };

  const complementColorsString = useMemo(
    () => ({
      color: transformColorsToString(harmonyColors.complementHarmony.color),
      complement: transformColorsToString(
        harmonyColors.complementHarmony.complement
      )
    }),
    [harmonyColors.complementHarmony]
  );

  console.info(harmonyColors.complementHarmony);

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
            value="split-complement"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <Dice2Icon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block">
              complement/2
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
          <TabsTrigger
            value="analogous"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <Dice2Icon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block">
              analogous
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
        </TabsList>

        <TabsContent value="complement" className="flex w-full flex-col">
          <section className="base-border ">
            
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
