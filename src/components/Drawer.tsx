import { m as motion } from 'framer-motion';
import { PaintBucketIcon } from 'lucide-react';

export default function Drawer() {
  return (
    <section className='w-full min-h-8 flex items-center justify-center fixed px-2 z-50 bottom-0'>
      <div className='w-full h-full flex items-center justify-between mx-auto max-w-5xl shadow-xl base-border rounded-tl-2xl rounded-tr-2xl bg-foreground/80 backdrop-blur-md py-2 px-4'>
        <div className='flex items-center gap-2'>
          <motion.button
            whileTap={{ scale: 0.8 }}
            className='group px-2 base-border rounded-xl outline-none bg-transparent flex gap-2 items-center'>
            <PaintBucketIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-5 h-auto' />
            <span className='font-semibold group-hover:text-primary '>
             Colors
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
