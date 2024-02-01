import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = { theme: 'light' };

  return (
    <Sonner
    duration={1200}
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background-default group-[.toaster]:text-foreground group-[.toaster]:base-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-background-default  group-[.toast]:text-muted-foreground bg-error stroke-error base-border'
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
