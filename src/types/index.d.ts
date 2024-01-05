import type { ChangeEvent, FormEvent } from 'react';

export type Modal = {
  title: string;
  isOpen: boolean;
  description: string;
  closeDelay?: boolean;
  buttonLabel?: string;
  onSubmit?: (data?: unknown) => void | Promise<void>;
};

export type Option = { value: string; label: string };

export type InputEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;
