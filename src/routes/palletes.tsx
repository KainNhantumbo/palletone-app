import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { useLocalStore } from '@/hooks/local-store';
import { exportToClipboard } from '@/lib/utils';
import { Slider } from '@radix-ui/react-slider';
import {
  CopyIcon,
  PaintBucketIcon,
  Paintbrush2Icon,
  PencilIcon
} from 'lucide-react';
import { useMemo, useState } from 'react';
import tinyColors from 'tinycolor2';

import { Range } from 'react-range';
import { ButtonIcon } from '@radix-ui/react-icons';

type ColorsFormats = {
  hex: string;
  hsl: string;
  rgb: string;
};

export default function Palettes() {
  // const { value: solidColorsStore, setValue: updateSolidColorsStore } =
  //   useLocalStore('solid-colors', []);
  // const { value: solidGradientStore, setValue: updateGradientColorsStore } =
  //   useLocalStore('gradient-colors', []);

  const [colors, setColors] = useState<ColorsFormats>(() => {
    const initialRGB = tinyColors.random().toRgbString();
    const initialHEX = tinyColors.random().toHexString();
    const initialHSL = tinyColors.random().toHslString();

    return {
      hex: initialHEX,
      hsl: initialHSL,
      rgb: initialRGB
    };
  });

  // useMemo(() => {
  //   setColors((current) => {
  //     return {
  //       ...current
  //     };
  //   });
  // }, [colors]);

  return (
    <Layout>
      <main className='w-full pb-24 pt-20 mx-auto max-w-5xl'>
        <Tabs defaultValue='solid' className='w-full '>
          <TabsList className='grid w-full grid-cols-2 mx-auto bg-background-default'>
            <TabsTrigger
              value='solid'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1'>
              <Paintbrush2Icon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold  group-hover:text-blue-400 transition-colors'>
                Solid
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='gradient'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1'>
              <PaintBucketIcon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold group-hover:text-blue-400 transition-colors'>
                Gradient
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='solid' className='w-full flex flex-col'>
            <section className='w-full bg-foreground-default p-4 rounded-2xl base-border flex gap-3'>
              <div
                style={{ background: colors.rgb }}
                className='w-[280px] h-[300px] rounded-2xl base-shadow base-border'
              />

              <section className='w-full flex flex-col gap-3'>
                <div className='w-full flex flex-col'>
                  <div className='w-full flex-col flex gap-1'>
                    <div className='flex items-center gap-3 w-fit'>
                      <h3 className='uppercase font-semibold text-sm text-primary-default'>
                        rgb
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
                      <p className='font-bold uppercase'>
                        {tinyColors(colors.rgb).toRgb().r},
                        {tinyColors(colors.rgb).toRgb().g},
                        {tinyColors(colors.rgb).toRgb().b}
                      </p>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='group'
                        onClick={() => exportToClipboard(colors.rgb)}>
                        <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex items-center gap-3'>
                    <Label htmlFor='alpha-input' className='capitalize'>
                      alpha
                    </Label>
                    <Slider
                      id='alpha-input'
                      min={0}
                      max={1}
                      step={0.1}
                      onChange={(e) => {
                        console.info(e.currentTarget.ariaValueNow);
                      }}
                    />
                    <Range
                      step={0.1}
                      min={0}
                      max={1}
                      values={[0.9]}
                      onChange={(values) => console.log({ values })}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            backgroundColor: '#ccc'
                          }}>
                          {children}
                        </div>
                      )}

                      allowOverlap
                      draggableTrack
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
