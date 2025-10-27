import { TabsFactory } from '@/components/ui/tabs/index';
import { CreditCard, Settings } from 'lucide-react';

export default function ExampleTabs() {
  return (
    <TabsFactory
      defaultValue="home"
      triggers={[
        { value: 'home', label: 'Home' },
        { value: 'settings', label: 'Settings', icon: Settings  , props: {}},
        {
          value: 'billing',
          label: 'Billing',
          icon: CreditCard,
          iconPosition: 'right'
        }
      ]}
      contents={[
        { value: 'home', element: <div>🏠 Welcome home</div> },
        { value: 'settings', element: <div>⚙️ Settings panel</div> },
        { value: 'billing', element: <div>💳 Billing section</div> }
      ]}
      listProps={{ className: 'mx-auto w-fit' }}
      contentsProps={{ className: 'mt-4' }}
    />
  );
}
