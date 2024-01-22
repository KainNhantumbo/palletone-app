export type ImageViewerProps = {
  imageData: string;
};

export const ImageViewer = ({ imageData }: ImageViewerProps) => (
  <img
    src={imageData}
    loading='lazy'
    alt='user selected image'
    className='base-border h-full max-h-[280px] w-full rounded-md object-cover shadow-2xl'
  />
);
