import { useMemo } from 'react';
import tinyColors from 'tinycolor2';
import { copyToClipboard } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { InputEvent } from '@/types';
import { useSearchParams } from 'react-router-dom';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

import { useLocalStorage } from '@uidotdev/usehooks';

export const InitialColors = () => {
  const [params, setParams] = useSearchParams();

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

  // TODO: debounce this function
  const onChange = (e: InputEvent) =>
    setParams((current) => ({ ...current, q: e.target.value }), {
      replace: false
    });

  return (
    <section className='w-full max-w-5xl mx-auto p-2 flex flex-col gap-3'>
      <section className='max-w-xl mx-auto w-full flex flex-col gap-3'>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='flex flex-col gap-2'>
          <Label className='pl-3'>Search</Label>
          <Input
            type='search'
            placeholder='Start by typing a color name...'
            className='w-full rounded-3xl'
            onChange={onChange}
          />
        </form>

        <p className='leading-relaxed'>
          About{' '}
          <span className='font-sans-display font-medium'>{colors.length}</span>{' '}
          colors in your workspace!
        </p>
      </section>

      <Separator
        decorative
        className='w-full max-w-4xl mx-auto bg-primary-default/20'
      />

      <section className='w-full max-w-5xl mx-auto p-2 md:flex md:justify-center md:items-center md:flex-wrap md:gap-3 grid grid-cols-2 mobile-x:grid-cols-3 gap-2'>
        {colors.map((color, i) => (
          <div
            key={i}
            className='flex flex-col gap-3 bg-foreground-default p-2 rounded-2xl base-shadow'>
            <div
              className='md:w-[200px] md:h-[120px] w-full h-[90px] rounded-2xl shadow-lg'
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
                className='group rounded-xl'
                onClick={() => copyToClipboard(color.value)}>
                <CopyIcon className='group-hover:stroke-primary-default group-active:stroke-blue-400 transition-colors' />
              </Button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
