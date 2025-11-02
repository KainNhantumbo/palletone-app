import { TabsFactory } from '@/components/ui/tabs/index';
import {
  BoxSelectIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  DicesIcon,
  DropletIcon,
  PaintbrushIcon
} from 'lucide-react';
import AnalogousTab from './tabs/analogous';
import { ComplementTab } from './tabs/complement';
import { GradientsTab } from './tabs/gradients';
import { SplitComplementTab } from './tabs/split-complement';

export function SavedColorsTabsContainer() {
  return (
    <TabsFactory
      defaultValue="solids"
      triggers={[
        { value: 'solids', label: 'Solids', icon: DropletIcon },
        { value: 'gradients', label: 'Gradients', icon: PaintbrushIcon },
        { value: 'complement', label: 'Complement', icon: DicesIcon },
        { value: 'analogous', label: 'Analogous', icon: Dice2Icon },
        { value: 'split-complement', label: 'Complement/2', icon: Dice2Icon },
        { value: 'triadic', label: 'Triadic', icon: Dice3Icon },
        { value: 'tetradic', label: 'Tetradic', icon: Dice4Icon },
        { value: 'monochromatic', label: 'Monochromatic', icon: BoxSelectIcon }
      ]}
      contents={[
        { value: 'solids', element: <GradientsTab /> },
        { value: 'gradients', element: <GradientsTab /> },
        { value: 'complement', element: <ComplementTab /> },
        { value: 'analogous', element: <AnalogousTab /> },
        { value: 'split-complement', element: <SplitComplementTab /> }
      ]}
    />
  );
}
