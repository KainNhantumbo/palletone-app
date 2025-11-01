import { TabsFactory } from '@/components/ui/tabs/index';
import { BoxSelectIcon, Dice2Icon, Dice3Icon, Dice4Icon, DicesIcon } from 'lucide-react';
import ComplementTab from './tabs/analogous';

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
        { value: 'complement', element: <ComplementTab /> }
        // { value: 'picker', element: <PickerTab /> }
      ]}
    />
  );
}
