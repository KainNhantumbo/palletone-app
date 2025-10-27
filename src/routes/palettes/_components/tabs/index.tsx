import { TabsFactory } from '@/components/ui/tabs/index';
import { DropletIcon } from 'lucide-react';
import { SolidsTab } from './solids';

export function PalettesTabsContainer() {
  return (
    <TabsFactory
      defaultValue="solids"
      triggers={[{ value: 'solids', label: 'Home', icon: DropletIcon }]}
      contents={[{ value: 'solids', element: <SolidsTab /> }]}
    />
  );
}
