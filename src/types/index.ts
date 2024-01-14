import type { LucideIcon } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';

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
  amount: number;
  createdAt: string;
};

export type ColorActions = Array<{
  handler: () => void;
  name: string;
  icon: LucideIcon;
}>;
