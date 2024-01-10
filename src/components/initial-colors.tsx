import { useMemo } from 'react';
import tinyColors from 'tinycolor2';
import { exportToClipboard } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { InputEvent } from '@/types';
import { useSearchParams } from 'react-router-dom';

export const InitialColors = () => {
  const [params, setParams] = useSearchParams('');

  const colors = useMemo((): Array<{ value: string; name: string }> => {
    return Object.entries(tinyColors.names)
      .map(([key, value]) => ({
        name: key,
        value: `#${value}`
      }))
      .filter((element) =>
        element.name.includes(String(params.get('q') || ''))
      );
  }, [params]);

  const onChange = (e: InputEvent) => setParams({ q: e.target.value }, {});

  return (
    <section className='w-full max-w-5xl mx-auto p-2 flex flex-col gap-3'>
      <section className='max-w-xl  mx-auto w-full'>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type='search'
            placeholder='Search color name...'
            className='w-full'
            onChange={onChange}
          />
        </form>
      </section>
      <section className='w-full max-w-5xl mx-auto p-2 md:flex md:justify-center md:items-center md:flex-wrap md:gap-3 grid grid-cols-2 mobile-x:grid-cols-3 gap-2'>
        {colors.map((color, i) => (
          <div
            key={i}
            className='flex flex-col gap-3 bg-foreground-default p-2 rounded-lg base-shadow'>
            <div
              className='md:w-[200px] md:h-[120px] w-full h-[90px] rounded-lg shadow-lg'
              style={{
                background: color.value
              }}
            />

            <div className='flex w-full items-center gap-2 justify-between max-w-[100%] '>
              <div className='flex flex-col gap-1 md:max-w-[160px] max-w-[120px]'>
                <span className='font-semibold uppercase  md:text-sm text-xs'>
                  {color.value}
                </span>
                <span className='font-semibold uppercase md:text-sm text-xs text-ellipsis whitespace-nowrap overflow-hidden'>
                  {color.name}
                </span>
              </div>
              <Button
                variant={'ghost'}
                size={'icon'}
                className='group'
                onClick={() => exportToClipboard(color.value)}>
                <CopyIcon className='group-hover:stroke-primary-default group-active:stroke-blue-400 transition-colors' />
              </Button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
