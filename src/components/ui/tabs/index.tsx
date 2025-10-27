'use client';

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
  type TabsContentProps,
  type TabsContentsProps,
  type TabsListProps,
  type TabsProps,
  type TabsTriggerProps
} from '@/components/ui/tabs/tabs';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

export type TabTriggerItem<T extends string = string> = {
  value: T;
  label: React.ReactNode;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  props?: Omit<TabsTriggerProps, 'value' | 'children'>;
};

export type TabContentItem<T extends string = string> = {
  value: T;
  element: React.ReactNode;
  props?: Omit<TabsContentProps, 'value' | 'children'>;
};

export type TabsFactoryProps<T extends string = string> = Omit<TabsProps<T>, 'children'> & {
  triggers: TabTriggerItem<T>[];
  contents: TabContentItem<T>[];
  listProps?: Omit<TabsListProps, 'children'>;
  contentsProps?: Omit<TabsContentsProps, 'children'>;
  debugWarnings?: boolean;
};

export function TabsFactory<T extends string = string>({
  triggers,
  contents,
  listProps,
  contentsProps,
  debugWarnings = true,
  ...tabsProps
}: TabsFactoryProps<T>) {
  React.useEffect(() => {
    if (!debugWarnings) return;

    const triggerValues = new Set(triggers.map((t) => t.value));
    const contentValues = new Set(contents.map((c) => c.value));

    const missingContents = Array.from(triggerValues).filter((v) => !contentValues.has(v));
    const missingTriggers = Array.from(contentValues).filter((v) => !triggerValues.has(v));

    if (missingContents.length > 0) {
      console.warn(
        `[TabsFactory] ⚠️ Some triggers do not have matching contents:`,
        missingContents
      );
    }

    if (missingTriggers.length > 0) {
      console.warn(
        `[TabsFactory] ⚠️ Some contents do not have matching triggers:`,
        missingTriggers
      );
    }
  }, [triggers, contents, debugWarnings]);

  return (
    <Tabs {...(tabsProps as TabsProps<T>)}>
      <TabsList
        {...listProps}
        className={cn(
          'mx-auto mb-3 grid w-fit grid-flow-col place-content-center place-items-center gap-8 bg-background-default',
          listProps?.className
        )}>
        {triggers.map(({ value, label, icon: Icon, iconPosition = 'left', props }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={cn(
              'group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl',
              props?.className
            )}
            {...props}>
            <span className="flex items-center gap-2">
              {Icon && iconPosition === 'left' && (
                <Icon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
              )}
              <span className="font-semibold transition-colors group-hover:text-blue-400">
                {label}
              </span>
              {Icon && iconPosition === 'right' && (
                <Icon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
              )}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContents {...contentsProps}>
        {contents.map(({ value, element, props }) => (
          <TabsContent key={value} value={value} {...props}>
            {element}
          </TabsContent>
        ))}
      </TabsContents>
    </Tabs>
  );
}
