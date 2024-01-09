import { CSSProperties } from 'react';
import { BeatLoader } from 'react-spinners';

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

export default function Loader() {
  return (
    <section style={{ ...styles }}>
      <h3>Mixing colors...</h3>
      <BeatLoader
        color={`hsl(var(--primary))`}
        cssOverride={{
          display: 'block',
          background: `transparent})`
        }}
      />
    </section>
  );
}
