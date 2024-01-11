import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exportToClipboard } from '@/lib/utils';
import type { RGBA } from '@/types';
import { ShadowInnerIcon } from '@radix-ui/react-icons';
import {
  CopyIcon,
  Paintbrush2Icon,
  PaletteIcon,
  PencilIcon,
  ShuffleIcon
} from 'lucide-react';
import { useMemo, useState } from 'react';
import tinyColors from 'tinycolor2';

export default function Palettes() {
  const randomizeColor = () => tinyColors.random().toRgb();

  const [rgbaColor, setRgbaColor] = useState<RGBA>(() => randomizeColor());

  const colorVariants = useMemo(() => {
    const hsv = tinyColors(rgbaColor).toHsvString();
    const hex = tinyColors(rgbaColor).toHex8String();
    const hsl = tinyColors(rgbaColor).toHslString();
    const rgba = `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.a})`;

    return {
      hex,
      hsl,
      hsv,
      rgba
    };
  }, [rgbaColor]);

  return (
    <Layout>
      <main className='w-full pb-24 pt-20 mx-auto max-w-5xl'>
        <Tabs defaultValue='solid' className='w-full px-2'>
          <TabsList className='grid w-full grid-cols-2 mx-auto bg-background-default'>
            <TabsTrigger
              value='solid'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
              <Paintbrush2Icon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold  group-hover:text-blue-400 transition-colors'>
                Solid
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='gradient'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
              <ShadowInnerIcon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold group-hover:text-blue-400 transition-colors'>
                Gradient
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='solid' className='w-full flex flex-col'>
            <section className='w-full bg-foreground-default p-4 rounded-2xl base-border flex gap-3'>
              <div
                style={{ background: tinyColors(rgbaColor).toRgbString() }}
                className='w-[280px] h-[300px] rounded-2xl base-shadow base-border'
              />

              <section className='w-full flex flex-col gap-3'>
                <div className='w-full flex items-center gap-2'>
                  <Button
                    variant={'outline'}
                    size={'lg'}
                    onClick={() => setRgbaColor(randomizeColor())}
                    className='group flex items-center gap-2 rounded-3xl'>
                    <ShuffleIcon className='group-hover:stroke-blue-400 group-active:stroke-blue-400 transition-colors w-4' />
                    <span className='group-hover:text-blue-400 transition-colors'>
                      Random color
                    </span>
                  </Button>
                  <Button
                    variant={'outline'}
                    size={'lg'}
                    className='group flex items-center gap-2 rounded-3xl'>
                    <PaletteIcon className='group-hover:stroke-blue-400 group-active:stroke-blue-400 transition-colors w-4' />
                    <span className='group-hover:text-blue-400 transition-colors'>
                      Pick color
                    </span>
                  </Button>
                </div>

                <Separator decorative />

                <div className='w-full flex items-center justify-center gap-3'>
                  <div className='w-fit flex flex-col items-center gap-1'>
                    <div className='flex items-center gap-3 w-fit'>
                      <h3 className='uppercase font-semibold text-sm text-primary-default'>
                        rgba
                      </h3>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => {}}>
                        <PencilIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium text-sm uppercase'>
                        {colorVariants.rgba}
                      </p>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => exportToClipboard(colorVariants.rgba)}>
                        <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                  </div>

                  <Separator decorative orientation='vertical' />

                  <div className='w-fit flex flex-col items-center gap-1'>
                    <div className='flex items-center gap-3 w-fit'>
                      <h3 className='uppercase font-semibold text-sm text-primary-default'>
                        hex
                      </h3>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => {}}>
                        <PencilIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium text-sm uppercase'>
                        {colorVariants.hex}
                      </p>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => exportToClipboard(colorVariants.hex)}>
                        <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                  </div>

                  <Separator decorative orientation='vertical' />

                  <div className='w-fit flex flex-col items-center gap-1'>
                    <div className='flex items-center gap-3 w-fit'>
                      <h3 className='uppercase font-semibold text-sm text-primary-default'>
                        hsl
                      </h3>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => {}}>
                        <PencilIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium text-sm uppercase'>
                        {colorVariants.hsl}
                      </p>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => exportToClipboard(colorVariants.hsl)}>
                        <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                  </div>

                  <Separator decorative orientation='vertical' />

                  <div className='w-fit flex flex-col items-center gap-1'>
                    <div className='flex items-center gap-3 w-fit'>
                      <h3 className='uppercase font-semibold text-sm text-primary-default'>
                        hsv
                      </h3>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => {}}>
                        <PencilIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium text-sm uppercase'>
                        {colorVariants.hsv}
                      </p>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => exportToClipboard(colorVariants.hsv)}>
                        <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='w-full max-w-lg mx-auto flex flex-col gap-3'>
                  <div className='w-full flex items-center gap-3'>
                    <Label
                      htmlFor='alpha-input'
                      className='w-12 uppercase text-xs font-medium'>
                      alpha
                    </Label>
                    <input
                      type='range'
                      step={0.1}
                      min={0}
                      max={1}
                      value={rgbaColor.a}
                      onChange={(e) => {
                        setRgbaColor((current) => ({
                          ...current,
                          a: parseFloat(e.target.value)
                        }));
                      }}
                      className='base-range-input bg-slate-400 dark:bg-slate-600'
                    />
                  </div>
                  <div className='w-full flex items-center gap-3'>
                    <Label
                      htmlFor='alpha-input'
                      className='w-12 uppercase text-xs font-medium'>
                      red
                    </Label>
                    <input
                      type='range'
                      step={1}
                      min={0}
                      max={255}
                      value={rgbaColor.r}
                      onChange={(e) => {
                        setRgbaColor((current) => ({
                          ...current,
                          r: parseInt(e.target.value)
                        }));
                      }}
                      className='base-range-input bg-red-600'
                    />
                  </div>
                  <div className='w-full flex items-center gap-3'>
                    <Label
                      htmlFor='alpha-input'
                      className='w-12 uppercase text-xs font-medium'>
                      green
                    </Label>
                    <input
                      type='range'
                      step={1}
                      min={0}
                      max={255}
                      value={rgbaColor.g}
                      onChange={(e) => {
                        setRgbaColor((current) => ({
                          ...current,
                          g: parseInt(e.target.value)
                        }));
                      }}
                      className='base-range-input bg-green-600'
                    />
                  </div>
                  <div className='w-full flex items-center gap-3'>
                    <Label
                      htmlFor='alpha-input'
                      className='w-12 uppercase text-xs font-medium'>
                      blue
                    </Label>
                    <input
                      type='range'
                      step={1}
                      min={0}
                      max={255}
                      value={rgbaColor.b}
                      onChange={(e) => {
                        setRgbaColor((current) => ({
                          ...current,
                          b: parseInt(e.target.value)
                        }));
                      }}
                      className='base-range-input bg-blue-400'
                    />
                  </div>
                </div>
              </section>
            </section>
          </TabsContent>

          <TabsContent value='gradient'></TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}

/**
   <Input
      id='rgb'
      value={colors.rgb}
      placeholder='Type a valid RGB color'
      onChange={(e) => {
        const value = e.target.value;
        if (tinyColors(value).isValid()) {
          setColors((current) => ({
            ...current,
            rgb: tinyColors(value).toRgbString()
          }));
          console.info(value);
        }
      }}
      className='w-fit base-border'

      <Range
        step={0.1}
        min={0}
        max={100}
        values={this.state.values}
        onChange={(values) => this.setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
    />
 */
