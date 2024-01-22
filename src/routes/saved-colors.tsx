import {
  copyToClipboard,
  normalizeColorOutput,
  buildGradient
} from "@/lib/utils";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  HARMONY_COLOR_STORAGE_KEY,
  MIXED_GRADIENT_STORAGE_KEY,
  SOLID_COLORS_STORAGE_KEY
} from "@/shared/constants";
import { HarmonyColorsDB, MixedGradient, SolidColor } from "@/types";
import { useDocumentTitle, useLocalStorage } from "@uidotdev/usehooks";
import { ArrowLeftIcon, PocketIcon } from "lucide-react";

export default function SavedColors() {
  useDocumentTitle("Palletone - Saved colors");

  const [solidColorsDB, updateSolidColorDB] = useLocalStorage<SolidColor[]>(
    SOLID_COLORS_STORAGE_KEY,
    []
  );

  const [gradientColorsDB, updateGradientColorsDB] = useLocalStorage<
    MixedGradient[]
  >(MIXED_GRADIENT_STORAGE_KEY, []);

  const [harmonyColorsDB, updateHarmonyColorsDB] =
    useLocalStorage<HarmonyColorsDB>(HARMONY_COLOR_STORAGE_KEY, {
      complement: [],
      splitComplement: [],
      analogous: [],
      triadic: [],
      tetradic: [],
      monochromatic: []
    });

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
              variant={"ghost"}
              size={"icon"}
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
      </section>
    </main>
  );
}
