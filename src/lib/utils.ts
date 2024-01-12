import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
