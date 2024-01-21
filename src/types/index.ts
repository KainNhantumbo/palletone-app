import type { FinalColor } from "extract-colors/lib/types/Color";
import type { LucideIcon } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";

export type Option = { value: string; label: string };

export type InputEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

export type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type SolidColor = {
  id: string;
  value: RGBA;
  createdAt: string;
};

export type MixedGradient = {
  id: string;
  color_1: RGBA;
  color_2: RGBA;
  // amount_1: number;
  // amount_2: number;
  createdAt: string;
};

export type ColorActions = Array<{
  handler: () => void;
  name: string;
  icon: LucideIcon;
}>;

export type ExtractedColors = {
  palette: {
    colors: FinalColor[];
    image: string;
  };
  picker: {
    colors: Array<{ id: string; value: RGBA }>;
    image: string;
  };
};

export type RouteList = Array<{
  path: string;
  alias: string;
  icon: LucideIcon;
  label: string;
}>;

export type ColorVariantsHeadings = Array<{
  name: string;
  color: string;
}>;

export type HarmonyColors = {
  complementColors: { originalColor: RGBA; complement: RGBA };
  splitComplement: { originalColor: RGBA; values: Array<RGBA> };
  analogous: { originalColor: RGBA; values: Array<RGBA> };
  triadic: { originalColor: RGBA; values: Array<RGBA> };
  tetradic: { originalColor: RGBA; values: Array<RGBA> };
  monochromatic: { originalColor: RGBA; chroma: Array<RGBA> };
};

// TODO: improve this type
export type HarmonyColorsDB = {
  complementColors: { originalColor: RGBA; complement: RGBA }[];
  splitComplement: { originalColor: RGBA; values: Array<RGBA> }[];
  analogous: { originalColor: RGBA; values: Array<RGBA> }[];
  triadic: { originalColor: RGBA; values: Array<RGBA> }[];
  tetradic: { originalColor: RGBA; values: Array<RGBA> }[];
  monochromatic: { originalColor: RGBA; chroma: Array<RGBA> }[];
};
