import { PaletteIcon } from 'lucide-react';

export default function Header() {
  return (
    <section className='w-full min-h-20 flex items-center justify-center fixed px-2'>
      <div className='w-full h-full flex items-center justify-between mx-auto max-w-5xl shadow-xl base-border rounded-2xl bg-foreground/40 backdrop-blur-md p-3 '>
        <div className='flex items-center gap-2'>
          <PaletteIcon className='stroke-primary' />
          <h1 className='font-semibold font-sans-display text-xl text-primary'>
            Palletone
          </h1>
        </div>

        <div className='flex'></div>
      </div>
    </section>
  );
}
