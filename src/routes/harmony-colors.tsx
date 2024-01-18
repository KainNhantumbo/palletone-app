import {
  BoxSelectIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  DicesIcon
} from 'lucide-react';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import type { RGBA } from '@/types';
import { useDocumentTitle, useLocalStorage } from '@uidotdev/usehooks';
import RadialColorPicker from '@radial-color-picker/react-color-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {} from 'react-colorful';
import { randomColor } from '@/lib/utils';

export type HarmonyColors = {
  complement: {
    phase_1: RGBA;
    phase_2: RGBA;
  };
};

export default function HarmonyColors() {
  useDocumentTitle('Palletone - Harmony Colors');
  const [harmonyColors, setHarmonyColors] = useState<HarmonyColors>({
    complement: { phase_1: randomColor(), phase_2: randomColor() }
  });

  const complementColor = useMemo(() => {
    const complement = tinycolor('').complement();
    return complement;
  }, []);

  console.info(tinycolor(harmonyColors.complement.phase_1).complement().toRgb()); 

  return (
    <main className='mx-auto w-full max-w-5xl pb-24 pt-20'>
      <Tabs defaultValue='complement' className='w-full px-2'>
        <TabsList className='mx-auto mb-3 grid w-fit grid-cols-6 place-content-center place-items-center gap-3 bg-background-default'>
          <TabsTrigger
            value='complement'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <DicesIcon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block'>
              complement
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='split-complement'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <Dice2Icon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block'>
              complement/2
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='monochromatic'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <BoxSelectIcon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block'>
              monochromatic
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='analogous'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <Dice2Icon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block'>
              analogous
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='triadic'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <Dice3Icon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block'>
              triadic
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='tetradic'
            className='group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl'>
            <Dice4Icon className='w-[18px] transition-colors group-hover:stroke-blue-400' />
            <span className='hidden font-semibold capitalize transition-colors group-hover:text-blue-400 md:block'>
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
