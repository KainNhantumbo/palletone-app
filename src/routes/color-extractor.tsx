import { ComponentIcon, DownloadIcon, SparklesIcon } from 'lucide-react';
import { Layout } from '@/components/layout';
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

export default function ColorExtrator() {
  useDocumentTitle('Palletone - Color Extrator');

  const [currentColors, setCurrentColors] = useState<ExtractedColors>({
    palette: {
      colors: [],
      image: ''
    },
    swatch: {
      colors: [],
      image: ''
    }
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
      console.log(result);
    } catch (error) {
      console.error(error);
      toast.error('Error: failed to generate pallete from selected image.');
    }
  };

  const generateSwatchColors = (file: File) => {};

  return (
    <Layout>
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
          <TabsContent
            value='automatic-palette'
            className='w-full flex flex-col'>
            <section className='w-full bg-foreground-default p-4 rounded-2xl base-border flex gap-3'>
              <DropzoneArea handler={generateAutoPalette} />
            </section>
          </TabsContent>

          <TabsContent value='swatch' className='w-full flex flex-col'>
            <DropzoneArea handler={generateSwatchColors} />
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}
