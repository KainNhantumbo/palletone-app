import { ComponentIcon, SparklesIcon } from 'lucide-react';
import { Layout } from '@/components/layout';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import type { RGBA } from '@/types';
import { useDocumentTitle, useLocalStorage } from '@uidotdev/usehooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ColorExtrator() {
  useDocumentTitle('Palletone - Color Extrator');

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
            className='w-full flex flex-col'></TabsContent>

          <TabsContent
            value='swatch'
            className='w-full flex flex-col'></TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}
