import { ComponentIcon, DownloadIcon, SparklesIcon } from 'lucide-react';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import type { ExtractedColors, RGBA } from '@/types';
import { useDocumentTitle, useLocalStorage } from '@uidotdev/usehooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropzoneArea } from '@/components/dropzone';
import { extractColors } from 'extract-colors';
import { ImageViewer } from '@/components/image-viewer';

export default function ColorExtractor() {
  useDocumentTitle('Palletone - Color Extractor');

  const [currentColors, setCurrentColors] = useState<ExtractedColors>({
    palette: { colors: [], image: '' },
    swatch: { colors: [], image: '' }
  });

  const generateAutoPalette = async (imageData: string) => {
    try {
      const result = await extractColors(imageData);
      setCurrentColors((current) => ({
        ...current,
        palette: {
          colors: result,
          image: imageData
        }
      }));
    } catch (error) {
      console.error(error);
      toast.error('Error: failed to generate palette from selected image.');
    }
  };

  const generateSwatchColors = (imageData: string) => {};

  const handleClearPaletteColors = () => {
    setCurrentColors((state) => ({
      ...state,
      palette: { ...state.palette, colors: [] }
    }));
  };

  const handleClearPaletteImage = () => {
    setCurrentColors((state) => ({
      ...state,
      palette: { ...state.palette, image: '' }
    }));
  };

  const handleClearSwatchColors = () => {
    setCurrentColors((state) => ({
      ...state,
      swatch: { ...state.swatch, colors: [] }
    }));
  };

  const handleClearSwatchImage = () => {
    setCurrentColors((state) => ({
      ...state,
      swatch: { ...state.swatch, image: '' }
    }));
  };

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
            {currentColors.palette.image ? (
              <ImageViewer
                imageData={currentColors.palette.image}
                handleClearColors={handleClearPaletteColors}
                handleClearImage={handleClearPaletteImage}
              />
            ) : (
              <div className='w-full flex flex-col gap-3'>
                <DropzoneArea handler={generateAutoPalette} />
                <div className='w-full flex flex-col gap-2'>
                  <h4>Notes</h4>
                  <ul>
                    <li>askdlaksd</li>
                    <li>askdlaksd</li>
                    <li>askdlaksd</li>
                  </ul>
                </div>
              </div>
            )}

            {currentColors.palette.colors.length > 0 ? (
              <div className='w-full flex flex-col gap-3'>
                <Separator decorative />
                <h3 className='w-full max-w-xl mx-auto'>Palettes</h3>
              </div>
            ) : null}
          </section>
        </TabsContent>

        <TabsContent value='swatch' className='w-full flex flex-col'>
          {currentColors.swatch.image ? (
            <ImageViewer
              imageData={currentColors.swatch.image}
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
