import { useMemo } from 'react';
import tinyColors from 'tinycolor2';
import Layout from '@/components/Layout';
import { exportToClipboard } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { m as motion } from 'framer-motion';

export default function Home() {
  const colors = useMemo((): Array<{ value: string; name: string }> => {
    return Object.entries(tinyColors.names).map(([key, value]) => ({
      name: key,
      value: `#${value}`
    }));
  }, []);

  return (
    <Layout>
      <main>
        <article className='w-full pb-24 pt-24'>
          <section className='w-full max-w-5xl mx-auto p-2 flex justify-center items-center  flex-wrap gap-3'>
            {colors.map((color, i) => (
              <div
                key={i}
                className='flex flex-col gap-3 bg-foreground  p-2 rounded-2xl base-border shadow-xl'>
                <div
                  className='rounded-2xl shadow-lg'
                  style={{
                    background: color.value,
                    width: '200px',
                    height: '120px'
                  }}
                />

                <div className='flex w-full items-center gap-2 justify-between'>
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold uppercase text-sm'>
                      {color.value}
                    </span>
                    <span className='font-semibold uppercase text-sm'>
                      {color.name}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => exportToClipboard(color.value)}
                    className='group outline-none bg-transparent'>
                    <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors ' />
                  </motion.button>
                </div>
              </div>
            ))}
          </section>
        </article>
      </main>
    </Layout>
  );
}
