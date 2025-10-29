import { TabsFactory } from '@/components/ui/tabs/index';
import { BirdIcon, SparklesIcon } from 'lucide-react';
import { PaletteTab } from './tabs/palette';

export function PalettesTabsContainer() {
  return (
    <TabsFactory
      defaultValue="solids"
      triggers={[
        { value: 'palette', label: 'Palette', icon: SparklesIcon },
        { value: 'picker', label: 'Picker', icon: BirdIcon }
      ]}
      contents={[
        { value: 'palette', element: <PaletteTab /> }
        // { value: 'picker', element: <GradientsTab /> }
      ]}
    />
  );
}
