import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import type { ExtractedColors, RGBA } from '@/types';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { BirdIcon, CopyIcon, SparklesIcon, XIcon } from 'lucide-react';
import { DropzoneArea } from '@/components/dropzone';
import { extractColors } from 'extract-colors';
import { ImageViewer } from '@/components/image-viewer';
import { FinalColor } from 'extract-colors/lib/types/Color';
import { copyToClipboard, transformColorsToString } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import 'eyedropper-polyfill';

export default function ColorExtractor() {
  useDocumentTitle('Palletone - Color Extractor');

  const [extractedColors, setExtractedColors] = useState<ExtractedColors>({
    palette: { colors: [], image: '' },
    picker: { colors: [], image: '' }
  });

  const generateAutoPalette = async (imageData: string) => {
    try {
      const result = await extractColors(imageData, { distance: 0.12 });
      setExtractedColors((current) => ({
        ...current,
        palette: { colors: result, image: imageData }
      }));
    } catch (error) {
      console.error(error);
      toast.error('Error: failed to generate palette from selected image.');
    }
  };

  const handlePickColor = async () => {
    if ('EyeDropper' in window) {
      // @ts-expect-error: eyeDropper might not exist in some browsers
      const eyeDropper = new window.EyeDropper();
      eyeDropper
        .open()
        .then((result: unknown) => {
          // Use the selected color information
          console.log(
            'Selected color:',
            (result as { sRGBHex: string }).sRGBHex
          );
        })
        .catch((error: unknown) => {
          console.error('Error:', error);
        });

      // setExtractedColors((current) => ({
      //   ...current,
      //   picker: { ...current.picker, colors: [...current.picker.colors] }
      // }));
    } else {
      return toast.error('Picker feature not supported in your browser');
    }
  };

  const handleClearPaletteColors = () => {
    setExtractedColors((state) => ({
      ...state,
      palette: { ...state.palette, colors: [] }
    }));
  };

  const removeColorFromPalette = (color: FinalColor) =>
    setExtractedColors((state) => ({
      ...state,
      palette: {
        ...state.palette,
        colors: state.palette.colors.filter((item) => item.hex != color.hex)
      }
    }));

  const handleClearPaletteImage = () => {
    setExtractedColors((state) => ({
      ...state,
      palette: { ...state.palette, image: '' }
    }));
  };

  const handleClearPickerColors = () => {
    setExtractedColors((state) => ({
      ...state,
      picker: { ...state.picker, colors: [] }
    }));
  };

  const handleClearPickerImage = () => {
    setExtractedColors((state) => ({
      ...state,
      picker: { ...state.picker, image: '' }
    }));
  };

  const mappedPaletteColors = (color: RGBA) =>
    [...Object.entries(transformColorsToString(color))].map(([key, value]) => ({
      name: key,
      value
    }));

  return (
    <main className='mx-auto w-full max-w-5xl pb-24 pt-20'>
      <Tabs defaultValue='automatic-palette' className='w-full px-2'>
        <TabsList className='mx-auto mb-3 grid w-fit grid-cols-2 place-content-center place-items-center gap-8 bg-background-default'>
          <TabsTrigger
            value='automatic-palette'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <SparklesIcon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='font-semibold capitalize transition-colors group-hover:text-blue-400'>
              palette
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='picker'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <BirdIcon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='font-semibold capitalize transition-colors group-hover:text-blue-400'>
              picker
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='automatic-palette' className='flex w-full flex-col'>
          <section className='base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4'>
            {extractedColors.palette.image ? (
              <section className='mx-auto flex w-full max-w-xl flex-col gap-3'>
                <ImageViewer imageData={extractedColors.palette.image} />
              </section>
            ) : (
              <DropzoneArea handler={generateAutoPalette} />
            )}

            <div className='flex w-full flex-wrap items-center justify-center gap-3'>
              {extractedColors.palette.image ? (
                <Button
                  variant='ghost'
                  onClick={handleClearPaletteImage}
                  className='base-border group flex items-center gap-2 rounded-3xl'>
                  <XIcon className='w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500' />
                  <span className='font-medium capitalize transition-colors group-hover:text-red-500'>
                    Clear Image
                  </span>
                </Button>
              ) : null}
              {extractedColors.palette.colors.length > 0 ? (
                <Button
                  variant='ghost'
                  onClick={handleClearPaletteColors}
                  className='base-border group flex items-center gap-2 rounded-3xl'>
                  <XIcon className='w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500' />
                  <span className='font-medium capitalize transition-colors group-hover:text-red-500'>
                    Clear Colors
                  </span>
                </Button>
              ) : null}
            </div>

            {!extractedColors.palette.image ? (
              <div className='mx-auto flex w-full max-w-xl flex-col gap-2'>
                <h3 className='text-md'>Notes:</h3>
                <ul className='text-sm'>
                  <li>
                    Add an image to extract to automatically extract colors and
                    build a palette.
                  </li>
                  <li>Extracted colors form image will appear here.</li>
                  <li>
                    You can click on the delete button to delete color from the
                    list.
                  </li>
                </ul>
              </div>
            ) : null}

            {extractedColors.palette.colors.length > 0 ? (
              <div className='flex w-full flex-col gap-3'>
                <Separator decorative />
                <h3 className='mx-auto w-full max-w-2xl'>Palette</h3>

                <div className='mx-auto grid w-full max-w-2xl  place-items-center gap-3 mobile:grid-cols-2 md:grid-cols-3'>
                  {extractedColors.palette.colors.map((color, i) => (
                    <div
                      key={i}
                      className={`base-border flex h-full w-full flex-col rounded-2xl bg-foreground-default shadow-lg`}>
                      <div
                        style={{ backgroundColor: color.hex }}
                        className='relative mb-2 h-[120px] w-full rounded-2xl shadow-2xl'>
                        <Button
                          variant='default'
                          size={'icon'}
                          onClick={() => removeColorFromPalette(color)}
                          className='group absolute right-2 top-2 flex h-5 w-5 items-center gap-2 rounded-3xl'>
                          <XIcon className='w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500' />
                        </Button>
                      </div>
                      {mappedPaletteColors({
                        r: color.red,
                        g: color.green,
                        b: color.blue,
                        a: 1
                      }).map((item, i) => (
                        <div
                          key={i}
                          className='mx-auto flex w-full items-center justify-between gap-2 px-2'>
                          <div className='flex w-full items-center gap-1'>
                            <p className='text-[.85rem] font-medium uppercase'>
                              {item.name}:
                            </p>
                            <p className='text-[.85rem] font-medium uppercase'>
                              {item.value}
                            </p>
                          </div>
                          <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='group rounded-full'
                            onClick={() => copyToClipboard(item.value)}>
                            <CopyIcon className='w-4 transition-colors group-hover:stroke-primary group-active:stroke-blue-400' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </TabsContent>

        <TabsContent value='picker' className='flex w-full flex-col'>
          {extractedColors.picker.image ? (
            <section className='mx-auto flex w-full max-w-xl flex-col gap-3'>
              <ImageViewer imageData={extractedColors.picker.image} />
              <div className='flex w-full flex-wrap items-center justify-center gap-3'>
                <Button
                  variant='ghost'
                  onClick={handleClearPickerImage}
                  className='base-border group flex items-center gap-2 rounded-3xl'>
                  <XIcon className='w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500' />
                  <span className='font-medium capitalize transition-colors group-hover:text-red-500'>
                    Clear Image
                  </span>
                </Button>
                <Button
                  variant='ghost'
                  onClick={handleClearPickerColors}
                  className='base-border group flex items-center gap-2 rounded-3xl'>
                  <XIcon className='w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500' />
                  <span className='font-medium capitalize transition-colors group-hover:text-red-500'>
                    Clear Colors
                  </span>
                </Button>
              </div>
            </section>
          ) : (
            <DropzoneArea
              handler={() => {
                handlePickColor();
              }}
            />
          )}

          <Separator decorative />
        </TabsContent>
      </Tabs>
    </main>
  );
}
