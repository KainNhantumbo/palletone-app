import {
  DiamondIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4,
  Dice4Icon,
  DicesIcon,
  SparklesIcon
} from 'lucide-react';
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

export default function HarmonyColors() {
  useDocumentTitle('Palletone - Harmony Colors');

  return (
    <Layout>
      <main className='w-full pb-24 pt-20 mx-auto max-w-5xl'>
        <Tabs defaultValue='complement' className='w-full px-2'>
          <TabsList className='grid w-fit grid-cols-4 place-content-center place-items-center mx-auto mb-3 bg-background-default gap-3'>
            <TabsTrigger
              value='complement'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
              <DicesIcon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold capitalize group-hover:text-blue-400 transition-colors'>
                complement
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='analogous'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
              <Dice2Icon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold capitalize group-hover:text-blue-400 transition-colors'>
                analogous
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='triadic'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
              <Dice3Icon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold capitalize group-hover:text-blue-400 transition-colors'>
                triadic
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='tetradic'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
              <Dice4Icon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold capitalize group-hover:text-blue-400 transition-colors'>
                tetradic
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='complement'
            className='w-full flex flex-col'></TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}
