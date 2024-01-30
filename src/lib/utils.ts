import { RGBA } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { CSSProperties } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import tinycolor from 'tinycolor2';
import moment from 'moment';

export const getDate = (date: string): string => moment(date).calendar();

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const randomColor = (): RGBA => tinycolor.random().toRgb();

export const transformColorsToString = (color: RGBA) => {
  const hex = tinycolor(color).toHex8String();
  const rgba = `${color.r}, ${color.g}, ${color.b}, ${color.a}`;
  let hsv = tinycolor(color).toHsvString();
  let hsl = tinycolor(color).toHslString();

  if (hsl.charAt(4) === '(') {
    hsl = hsl.substring(5).replace(')', '');
  } else {
    hsl = hsl.substring(4).replace(')', '');
  }

  if (hsv.charAt(4) === '(') {
    hsv = hsv.substring(5).replace(')', '');
  } else {
    hsv = hsv.substring(4).replace(')', '');
  }

  return { hex, hsl, hsv, rgba };
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

export const copyToClipboard = async (content: string, renderToast = true) => {
  try {
    await navigator.clipboard.writeText(content);
    renderToast && toast.success('Copied to clipboard!');
  } catch (error) {
    console.warn(error);
    toast.error('Error while trying to copy to clipboard.');
  }
};

export const normalizeColorOutput = (color: string, type: string) => {
  if (color.includes('#')) return color.toUpperCase();
  return `${type}(${color})`;
};
