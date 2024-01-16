import { ComponentIcon, CopyIcon, SparklesIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import type { ExtractedColors, RGBA } from '@/types';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropzoneArea } from '@/components/dropzone';
import { extractColors } from 'extract-colors';
import { ImageViewer } from '@/components/image-viewer';
import { copyToClipboard, transformColorsToString } from '@/lib/utils';
import { FinalColor } from 'extract-colors/lib/types/Color';

export default function ColorExtractor() {
  useDocumentTitle('Palletone - Color Extractor');

  const [extractedColors, setExtractedColors] = useState<ExtractedColors>({
    palette: { colors: [], image: '' },
    swatch: { colors: [], image: '' }
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

  const generateSwatchColors = (imageData: string) => {};

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

  const handleClearSwatchColors = () => {
    setExtractedColors((state) => ({
      ...state,
      swatch: { ...state.swatch, colors: [] }
    }));
  };

  const handleClearSwatchImage = () => {
    setExtractedColors((state) => ({
      ...state,
      swatch: { ...state.swatch, image: '' }
    }));
  };

  const mappedPaletteColors = (color: RGBA) =>
    [...Object.entries(transformColorsToString(color))].map(([key, value]) => ({
      name: key,
      value
    }));

  return (
    <main className='w-full pb-24 pt-20 mx-auto max-w-5xl'>
      <Tabs defaultValue='automatic-palette' className='w-full px-2'>
        <TabsList className='grid w-fit grid-cols-2 place-content-center place-items-center mx-auto mb-3 bg-background-default gap-8'>
          <TabsTrigger
            value='automatic-palette'
            className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
            <SparklesIcon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
            <span className='font-semibold group-hover:text-blue-400 transition-colors capitalize'>
              automatic palette
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='swatch'
            className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
            <ComponentIcon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
            <span className='font-semibold group-hover:text-blue-400 transition-colors capitalize'>
              swatch
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='automatic-palette' className='w-full flex flex-col'>
          <section className='w-full bg-foreground-default p-4 rounded-2xl base-border flex flex-col gap-3'>
            {extractedColors.palette.image ? (
              <ImageViewer
                imageData={extractedColors.palette.image}
                handleClearColors={handleClearPaletteColors}
                handleClearImage={handleClearPaletteImage}
              />
            ) : (
              <div className='w-full flex flex-col gap-3'>
                <DropzoneArea handler={generateAutoPalette} />
                <div className='w-full max-w-xl mx-auto flex flex-col gap-2'>
                  <h3 className='text-md'>Notes:</h3>
                  <ul className='text-sm'>
                    <li>
                      Add an image to extract to automatically extract colors
                      and build a palette.
                    </li>
                    <li>Extracted colors form image will appear here.</li>
                    <li>
                      You can click on the delete button to delete color from
                      the list.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {extractedColors.palette.colors.length > 0 ? (
              <div className='w-full flex flex-col gap-3'>
                <Separator decorative />
                <h3 className='w-full max-w-2xl mx-auto'>Palette</h3>

                <div className='w-full max-w-2xl mx-auto grid  mobile:grid-cols-2 md:grid-cols-3 place-items-center gap-3'>
                  {extractedColors.palette.colors.map((color, i) => (
                    <div
                      key={i}
                      className={`w-full h-full flex flex-col shadow-lg bg-foreground-default rounded-2xl base-border`}>
                      <div
                        style={{ backgroundColor: color.hex }}
                        className='relative w-full h-[120px] rounded-2xl shadow-2xl mb-2'>
                        <Button
                          variant='default'
                          size={'icon'}
                          onClick={() => removeColorFromPalette(color)}
                          className='group flex items-center gap-2 rounded-3xl w-5 h-5 absolute top-2 right-2'>
                          <XIcon className='group-hover:stroke-red-500 group-active:stroke-red-500 transition-colors w-4' />
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
                          className='w-full flex items-center gap-2 mx-auto justify-between px-2'>
                          <div className='w-full flex items-center gap-1'>
                            <p className='font-medium text-[.85rem] uppercase'>
                              {item.name}:
                            </p>
                            <p className='font-medium text-[.85rem] uppercase'>
                              {item.value}
                            </p>
                          </div>
                          <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='group rounded-full'
                            onClick={() => copyToClipboard(item.value)}>
                            <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
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

        <TabsContent value='swatch' className='w-full flex flex-col'>
          {extractedColors.swatch.image ? (
            <ImageViewer
              imageData={extractedColors.swatch.image}
              handleClearColors={handleClearSwatchColors}
              handleClearImage={handleClearSwatchImage}
            />
          ) : (
            <DropzoneArea handler={generateSwatchColors} />
          )}

          <Separator decorative />
        </TabsContent>
      </Tabs>
    </main>
  );
}
