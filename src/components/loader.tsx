import { RiseLoader } from 'react-spinners';

const messages: Array<string> = [
  'floating color buckets',
  'sync execute => colors.mode(rgb - hex - hsl - hsv);',
  'mixing color gradients',
  'organizing your tools and brushes',
  'creating colorful palettes',
  'backing your favored colors',
  'colouring your environment'
];

const randomMessage = (): string => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export const Loader = () => (
  <div className="grid h-[100vh] w-[100vw] place-content-center place-items-center">
    <section className="flex h-full w-full flex-col items-center gap-8 p-[calc(25%_-_1px)_12px] font-medium">
      <h3 className="text-center font-sans-display text-lg font-medium uppercase">
        {randomMessage()}
      </h3>
      <RiseLoader
        color={`rgb(var(--primary-default))`}
        cssOverride={{
          display: 'block',
          background: `transparent})`
        }}
      />
    </section>
  </div>
);
