import { TabsFactory } from '@/components/ui/tabs/index';
import { BoxSelectIcon, Dice2Icon, Dice3Icon, Dice4Icon, DicesIcon } from 'lucide-react';
import { AnalogousTab } from './tabs/analogous';
import { ComplementTab } from './tabs/complement';
import { MonochromaticTab } from './tabs/monochromatic';
import { SplitComplement } from './tabs/split-complement';
import { TriadicTab } from './tabs/triadic';

export function HarmonyColorsTabsContainer() {
  return (
    <TabsFactory
      defaultValue="complement"
      triggers={[
        { value: 'complement', label: 'Complement', icon: DicesIcon },
        { value: 'analogous', label: 'Analogous', icon: Dice2Icon },
        { value: 'split-complement', label: 'Complement/2', icon: Dice2Icon },
        { value: 'triadic', label: 'Triadic', icon: Dice3Icon },
        { value: 'tetradic', label: 'Tetradic', icon: Dice4Icon },
        { value: 'monochromatic', label: 'Monochromatic', icon: BoxSelectIcon }
      ]}
      contents={[
        { value: 'complement', element: <ComplementTab /> },
        { value: 'analogous', element: <AnalogousTab /> },
        { value: 'split-complement', element: <SplitComplement /> },
        { value: 'triadic', element: <TriadicTab /> },
        { value: 'monochromatic', element: <MonochromaticTab /> }
      ]}
    />
  );
}
