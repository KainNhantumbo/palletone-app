'use client';

import * as React from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentsProps,
  type TabsContentProps
} from '@/components/ui/tabs/tabs';

/* ---------------------------------------------------------
 * Types
 * --------------------------------------------------------- */

export type TabTriggerItem<T extends string = string> = {
  /** Identificador único da tab */
  value: T;
  /** Texto ou elemento exibido no botão */
  label: React.ReactNode;
  /** Ícone opcional exibido ao lado do label */
  icon?: React.ReactNode;
  /** Posição do ícone (esquerda ou direita) */
  iconPosition?: 'left' | 'right';
  /** Props opcionais adicionais */
  props?: Omit<TabsTriggerProps, 'value' | 'children'>;
};

export type TabContentItem<T extends string = string> = {
  /** Valor que corresponde ao trigger */
  value: T;
  /** Conteúdo da aba */
  element: React.ReactNode;
  /** Props opcionais adicionais */
  props?: Omit<TabsContentProps, 'value' | 'children'>;
};

export type TabsFactoryProps<T extends string = string> = Omit<TabsProps<T>, 'children'> & {
  /** Lista de triggers (botões das tabs) */
  triggers: TabTriggerItem<T>[];
  /** Lista de conteúdos correspondentes */
  contents: TabContentItem<T>[];
  /** Props opcionais para personalizar a lista */
  listProps?: Omit<TabsListProps, 'children'>;
  /** Props opcionais para personalizar os conteúdos */
  contentsProps?: Omit<TabsContentsProps, 'children'>;
  /** Exibir avisos no console sobre inconsistências */
  debugWarnings?: boolean;
};

/* ---------------------------------------------------------
 * Component
 * --------------------------------------------------------- */

export function TabsFactory<T extends string = string>({
  triggers,
  contents,
  listProps,
  contentsProps,
  debugWarnings = true,
  ...tabsProps
}: TabsFactoryProps<T>) {
  // 🚨 Validação runtime
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
      <TabsList {...listProps}>
        {triggers.map(({ value, label, icon, iconPosition = 'left', props }) => (
          <TabsTrigger key={value} value={value} {...props}>
            <span className="flex items-center gap-2">
              {icon && iconPosition === 'left' && <span className="h-4 w-4">{icon}</span>}
              <span>{label}</span>
              {icon && iconPosition === 'right' && <span className="h-4 w-4">{icon}</span>}
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
