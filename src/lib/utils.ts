import { RGBA } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { CSSProperties } from 'react';
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

export const buildGradient = (color1: RGBA, color2: RGBA) => {
  const gradient = {
    color_1: `${color1.r}, ${color1.g}, ${color1.b}, ${color1.a}`,
    color_2: `${color2.r}, ${color2.g}, ${color2.b}, ${color2.a}`
  };

  const cssGradient: CSSProperties = {
    background: `linear-gradient(45deg, rgba(${gradient.color_1}), rgba(${gradient.color_2}))`
  };

  return {
    css: cssGradient,
    cssString: cssGradient.background?.toString(),
    gradient
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
