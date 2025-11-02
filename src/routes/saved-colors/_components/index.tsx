import { TabsFactory } from '@/components/ui/tabs/index';
import { PaletteTab } from '@/routes/color-extractor/_components/tabs/palette';
import { PickerTab } from '@/routes/color-extractor/_components/tabs/picker';
import {
  BirdIcon,
  BoxSelectIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  DicesIcon,
  DropletIcon,
  PaintbrushIcon,
  SparklesIcon
} from 'lucide-react';

export function SavedColorsTabsContainer() {
  return (
    <TabsFactory
      defaultValue="solids"
      triggers={[
        { value: 'solids', label: 'Solids', icon: DropletIcon },
        { value: 'gradients', label: 'Gradients', icon: PaintbrushIcon },
        { value: 'palette', label: 'Palette', icon: SparklesIcon },
        { value: 'picker', label: 'Picker', icon: BirdIcon },
        { value: 'complement', label: 'Complement', icon: DicesIcon },
        { value: 'analogous', label: 'Analogous', icon: Dice2Icon },
        { value: 'split-complement', label: 'Complement/2', icon: Dice2Icon },
        { value: 'triadic', label: 'Triadic', icon: Dice3Icon },
        { value: 'tetradic', label: 'Tetradic', icon: Dice4Icon },
        { value: 'monochromatic', label: 'Monochromatic', icon: BoxSelectIcon }
      ]}
      contents={[
        { value: 'palette', element: <PaletteTab /> },
        { value: 'picker', element: <PickerTab /> }
      ]}
    />
  );
}
