import { RGBA } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import tinycolor from 'tinycolor2';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomColor = (): RGBA => tinycolor.random().toRgb();

export const transformColorsToString = (color: RGBA) => {
  const hex = tinycolor(color).toHex8String();
  const hsv = tinycolor(color)
    .toHsvString()
    .trim()
    .substring(5)
    .replace(')', '');
  const hsl = tinycolor(color)
    .toHslString()
    .trim()
    .substring(5)
    .replace(')', '');
  const rgba = `${color.r}, ${color.g}, ${color.b}, ${color.a}`;

  return {
    hex,
    hsl,
    hsv,
    rgba
  };
};

export const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  } catch (error) {
    console.warn(error);
    toast.error('Error while trying to copy to clipboard.');
  }
};

export const importFromClipboard = async () => {
  try {
    const data = await navigator.clipboard.readText();
    toast.success('Pasted successfully!');
    return data;
  } catch (error) {
    console.warn(error);
    toast.error('Error while trying to retrieve data from clipboard.');
  }
};
