import { cn } from '@/lib/utils';
import { DownloadIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useCallback } from 'react';
import { ALLOWED_MIMETYPES } from '@/shared/constants';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

export type DropZoneProps = {
  handler: (file: string) => void;
};

export const DropzoneArea = ({ handler }: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: useCallback(<T extends File>(acceptedFiles: T[]) => {
      const file = acceptedFiles[0];
      if (!file || !ALLOWED_MIMETYPES.includes(String(file.type)))
        return toast.error('Error: file type forbbiden.');

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e: ProgressEvent<FileReader>) {
        const encodedImage: string = e.target?.result as string;
        handler(encodedImage);
      };
    }, [])
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'w-full max-w-xl mx-auto bg-foreground-default p-4 py-12 rounded-2xl base-border grid place-content-center',
        { isDragActive: 'border-blue-400 bg-red' }
      )}>
      <div className='w-full flex flex-col gap-3 items-center select-none'>
        <DownloadIcon
          className={cn({
            isDragActive: 'bg-red-300'
          })}
        />
        <h3>
          {isDragActive ? (
            <span>Drop your image here</span>
          ) : (
            <span>Click to select or drag and drop an image here</span>
          )}
        </h3>
        <span className='description'>Extensions: [.JPEG, .JPG, .PNG].</span>

        <Input {...getInputProps()} />
      </div>
    </div>
  );
};
