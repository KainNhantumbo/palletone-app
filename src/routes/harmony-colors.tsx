import {
  BoxSelectIcon,
  DiamondIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4,
  Dice4Icon,
  DicesIcon,
  SparklesIcon
} from 'lucide-react';
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
    <main className='mx-auto w-full max-w-5xl pb-24 pt-20'>
      <Tabs defaultValue='complement' className='w-full px-2'>
        <TabsList className='mx-auto mb-3 grid w-fit grid-cols-6 place-content-center place-items-center gap-3 bg-background-default'>
          <TabsTrigger
            value='complement'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <DicesIcon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='font-semibold capitalize transition-colors group-hover:text-blue-400'>
              complement
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='splitcomplement'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <Dice2Icon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='font-semibold capitalize transition-colors group-hover:text-blue-400'>
              complement/2
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='monochromatic'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <BoxSelectIcon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='font-semibold capitalize transition-colors group-hover:text-blue-400'>
              monochromatic
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='analogous'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <Dice2Icon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='font-semibold capitalize transition-colors group-hover:text-blue-400'>
              analogous
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='triadic'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <Dice3Icon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='font-semibold capitalize transition-colors group-hover:text-blue-400'>
              triadic
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='tetradic'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <Dice4Icon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='font-semibold capitalize transition-colors group-hover:text-blue-400'>
              tetradic
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value='complement'
          className='flex w-full flex-col'></TabsContent>
      </Tabs>
    </main>
  );
}
