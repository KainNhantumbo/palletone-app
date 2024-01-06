import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const exportToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    console.warn(error);
    return {
      error: true,
      message:
        (error as Error).message || 'Error while trying to copy to clipboard.'
    };
  }
};

export const importFromClipboard = async () => {
  try {
    return await navigator.clipboard.readText();
  } catch (error) {
    console.warn(error);
    return {
      error: true,
      message:
        (error as Error).message ||
        'Error while trying to retrieve data from clipboard.'
    };
  }
};
