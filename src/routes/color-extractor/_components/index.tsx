import { TabsFactory } from '@/components/ui/tabs/index';
import { BirdIcon, SparklesIcon } from 'lucide-react';
import { PaletteTab } from './tabs/palette';
import { PickerTab } from './tabs/picker';

export function ColorExtractorTabsContainer() {
  return (
    <TabsFactory
      defaultValue="palette"
      triggers={[
        { value: 'palette', label: 'Palette', icon: SparklesIcon },
        { value: 'picker', label: 'Picker', icon: BirdIcon }
      ]}
      contents={[
        { value: 'palette', element: <PaletteTab /> },
        { value: 'picker', element: <PickerTab /> }
      ]}
    />
  );
}
