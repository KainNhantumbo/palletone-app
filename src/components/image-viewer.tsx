import { XIcon } from 'lucide-react';
import { Button } from './ui/button';

export type ImageViewerProps = {
  imageData: string;
  handleClearImage: () => void;
  handleClearColors: () => void;
};

export const ImageViewer = ({
  imageData,
  handleClearColors,
  handleClearImage
}: ImageViewerProps) => (
  <section className='w-full max-w-xl mx-auto flex flex-col gap-3'>
    <img
      src={imageData}
      loading='lazy'
      alt='user selected image'
      className='w-full h-full max-h-[600px] object-cover rounded-md shadow-2xl base-border'
    />
    <div className='w-full flex items-center flex-wrap gap-3 justify-center'>
      <Button
        variant='ghost'
        onClick={handleClearImage}
        className='group flex items-center gap-2 rounded-3xl base-border'>
        <XIcon className='group-hover:stroke-red-500 group-active:stroke-red-500 transition-colors w-4' />
        <span className='group-hover:text-red-500 transition-colors font-medium capitalize'>
          Clear Image
        </span>
      </Button>
      <Button
        variant='ghost'
        onClick={handleClearColors}
        className='group flex items-center gap-2 rounded-3xl base-border'>
        <XIcon className='group-hover:stroke-red-500 group-active:stroke-red-500 transition-colors w-4' />
        <span className='group-hover:text-red-500 transition-colors font-medium capitalize'>
          Clear Colors
        </span>
      </Button>
    </div>
  </section>
);
