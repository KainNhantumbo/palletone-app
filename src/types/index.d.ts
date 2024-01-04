import type { ChangeEvent, FormEvent } from 'react';

export type Theme = {
  primary_a: string;
  primary_b: string;
  primary_c: string;
  foreground: string;
  background: string;
  white: string;
  black: string;
  error: string;
  font: string;
};

export type ColorScheme = {
  mode: 'auto' | 'manual';
  scheme: 'dark' | 'light';
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export type Modal = {
  title: string;
  status: boolean;
  message: string;
  closeOnDelay?: boolean;
  actionButtonMessage?: string;
  handleFunction?: (data?: unknown) => void | Promise<void>;
};

export type Preferences = {
  author: { name: string; picture?: string };
  theme: ColorScheme;
};


export type Query = {
  search: string;
  sort: string;
  status: string;
  priority: string;
};

export type Option = { value: string; label: string };

export type InputEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;
