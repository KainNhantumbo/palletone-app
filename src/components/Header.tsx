import { m as motion } from 'framer-motion';
import { CogIcon, MoonStarIcon, PaletteIcon } from 'lucide-react';

export default function Header() {
  return (
    <section className='w-full min-h-20 flex items-center justify-center fixed px-2 z-50'>
      <div className='w-full h-full flex items-center justify-between mx-auto max-w-5xl shadow-xl base-border rounded-2xl bg-foreground/40 backdrop-blur-md py-2 px-4'>
        <div className='flex items-center gap-2'>
          <PaletteIcon className='stroke-primary' />
          <h1 className='font-semibold font-sans-display text-xl text-primary'>
            Palletone
          </h1>
        </div>

        <div className='flex items-center gap-2'>
          <motion.button
            whileTap={{ scale: 0.8 }}
            className='group w-8 h-8 p-2 base-border rounded-xl outline-none bg-transparent grid place-items-center place-content-center'>
            <CogIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-5 h-auto' />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            className='group w-8 h-8 p-2 base-border rounded-xl outline-none bg-transparent grid place-items-center place-content-center'>
            <MoonStarIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-5 h-auto' />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
