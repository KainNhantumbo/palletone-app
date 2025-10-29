import { TabsFactory } from '@/components/ui/tabs/index';
import { DropletIcon, PaintbrushIcon } from 'lucide-react';
import { GradientsTab } from './gradients';
import { SolidsTab } from './solids';

export function PalettesTabsContainer() {
  return (
    <TabsFactory
      defaultValue="solids"
      triggers={[
        { value: 'solids', label: 'Home', icon: DropletIcon },
        { value: 'gradients', label: 'Gradients', icon: PaintbrushIcon }
      ]}
      contents={[
        { value: 'solids', element: <SolidsTab /> },
        { value: 'gradients', element: <GradientsTab /> }
      ]}
    />
  );
}
