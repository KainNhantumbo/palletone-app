import { CSSProperties } from 'react';
import { BeatLoader, RiseLoader } from 'react-spinners';

const styles: CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  fontWeight: '500',
  fontSize: '1.2rem',
  flexDirection: 'column',
  gap: '20px',
  color: 'rgb(var(--font))',
  alignItems: 'center',
  padding: 'calc(25% - 1px) 12px'
};

const messages: Array<string> = [
  'floating color backets',
  'sync execute => colors.mode(rgb - hex - hsl - hsv);',
  'mixing colors',
  'creating your palettes',
  'backing your colors',
  'colouring your environment'
];

const ramdomMessage = (): string => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export const Loader = () => {
  return (
    <section style={{ ...styles }}>
      <h3 className='font-medium uppercase font-sans-display text-md'>
        {ramdomMessage()}
      </h3>
      <RiseLoader
        color={`rgb(var(--primary-default))`}
        cssOverride={{
          display: 'block',
          background: `transparent})`
        }}
      />
    </section>
  );
};
