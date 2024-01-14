import {
  EditSolidColorDialog,
  EditSolidColorDialogProps
} from '@/components/edit-solid-color-dialog';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  copyToClipboard,
  randomColor,
  transformColorsToString
} from '@/lib/utils';
import type { RGBA, SolidColor } from '@/types';
import { ShadowInnerIcon } from '@radix-ui/react-icons';
import { useDocumentTitle, useLocalStorage } from '@uidotdev/usehooks';
import {
  CandyIcon,
  CopyIcon,
  DownloadIcon,
  LucideIcon,
  Paintbrush2Icon,
  PencilIcon,
  ShuffleIcon
} from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';

type ColorVariantsHeadings = Array<{
  name: string;
  editFunc: () => void;
  color: string;
}>;

type Actions = Array<{ handler: () => void; name: string; icon: LucideIcon }>;

export default function Palettes() {
  useDocumentTitle('Palletone | Palettes');

  const [rgbaColor, setRgbaColor] = useState<RGBA>(() => randomColor());

  const [, updateSolidColorDB] = useLocalStorage<SolidColor[]>(
    'solid-colors-db',
    []
  );

  const colorVariants = useMemo(
    () => transformColorsToString(rgbaColor),
    [rgbaColor]
  );

  const colorHeadings: ColorVariantsHeadings = [
    {
      name: 'rgba',
      color: colorVariants.rgba,
      editFunc: () => editRgbaColor()
    },
    {
      name: 'hex',
      color: colorVariants.hex,
      editFunc: () => {}
    },
    {
      name: 'hsl',
      color: colorVariants.hsl,
      editFunc: () => {}
    },
    {
      name: 'hsv',
      color: colorVariants.hsv,
      editFunc: () => {}
    }
  ];

  const actions: Actions = [
    {
      name: 'random color',
      icon: ShuffleIcon,
      handler: () => setRgbaColor(randomColor())
    },
    {
      name: 'save color',
      icon: DownloadIcon,
      handler: () => onSaveColor()
    }
  ];

  const onSaveColor = () => {
    updateSolidColorDB((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        value: rgbaColor,
        createdAt: new Date().toISOString()
      }
    ]);
    toast.success('Color saved successfully.');
  };

  const [editColorProps, setEditColorProps] =
    useState<EditSolidColorDialogProps>({
      isOpen: false,
      title: '',
      description: '',
      inputPlaceholder: '',
      onClose: () => {},
      onConfirm: () => {},
      onChange: () => {},
      currentInputValue: ''
    });

  const editRgbaColor = () => {
    setEditColorProps((current) => ({
      ...current,
      isOpen: true,
      title: 'RGBA Color Editor',
      inputPlaceholder: 'Ex: 19, 179, 51, 0.7',
      description: 'Edit or paste custom RGB or RGBA values in the below. Example: Ex: 19, 179, 51, 0.7',
      onClose() {
        setEditColorProps((current) => ({ ...current, isOpen: false, currentInputValue: '' }));
      },
      onChange(e) {
        const currentInputValue = e.target.value;
        setEditColorProps((current) => ({ ...current, currentInputValue }));
      },
      onConfirm() {
        const color = editColorProps.currentInputValue
        const isValid = tinycolor(`rgba (34, 138, 205),`).isValid();
        console.info(`207, 74, 99, 1`.split(', '), isValid);

        if (!isValid) return toast.error('Parse Error: color syntax must meet the example.');
      }
    }));
  };

  return (
    <Layout>
      <EditSolidColorDialog {...editColorProps} />

      <main className='w-full pb-24 pt-20 mx-auto max-w-5xl'>
        <Tabs defaultValue='solid' className='w-full px-2'>
          <TabsList className='grid w-fit grid-cols-2 place-content-center place-items-center mx-auto mb-3 bg-background-default gap-8'>
            <TabsTrigger
              value='solid'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
              <Paintbrush2Icon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold group-hover:text-blue-400 transition-colors'>
                Solid
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='gradient'
              className='group w-full mx-auto max-w-[200px] flex items-center gap-1 rounded-3xl'>
              <CandyIcon className='w-[18px] group-hover:stroke-blue-400 transition-colors' />
              <span className='font-semibold group-hover:text-blue-400 transition-colors'>
                Gradient
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='solid' className='w-full flex flex-col'>
            <section className='w-full bg-foreground-default p-4 rounded-2xl base-border flex gap-3'>
              <div
                style={{ background: tinycolor(rgbaColor).toRgbString() }}
                className='w-[280px] h-[300px] rounded-2xl base-shadow base-border'
              />

              <section className='w-full flex flex-col gap-3'>
                <div className='w-full flex items-center justify-center gap-2'>
                  {actions.map((action, i) => (
                    <Button
                      key={i}
                      variant={'outline'}
                      size={'lg'}
                      onClick={action.handler}
                      className='group flex items-center gap-2 rounded-3xl'>
                      <action.icon className='group-hover:stroke-blue-400 group-active:stroke-blue-400 transition-colors w-4' />
                      <span className='group-hover:text-blue-400 transition-colors capitalize'>
                        {action.name}
                      </span>
                    </Button>
                  ))}
                </div>

                <Separator decorative />

                <div className='w-full flex items-center justify-center gap-3'>
                  {colorHeadings.map((item, i) => (
                    <Fragment key={i}>
                      <div className='w-fit flex flex-col items-center gap-1'>
                        <div className='flex items-center gap-3 w-fit'>
                          <h3 className='uppercase font-semibold text-sm text-primary-default'>
                            {item.name}
                          </h3>
                          {/* <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='group rounded-full'
                            onClick={() => item.editFunc()}>
                            <PencilIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                          </Button> */}
                        </div>
                        <div className='flex items-center gap-1'>
                          <p className='font-medium text-sm uppercase'>
                            {item.color}
                          </p>
                          <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='group rounded-full'
                            onClick={() => copyToClipboard(item.color)}>
                            <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                          </Button>
                        </div>
                      </div>

                      {colorHeadings[i + 1] ? (
                        <Separator decorative orientation='vertical' />
                      ) : null}
                    </Fragment>
                  ))}
                </div>

                <Separator decorative />

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
          <TabsContent value='gradient' className='w-full flex flex-col'>
            <section className='w-full bg-foreground-default p-4 rounded-2xl base-border flex gap-3'>
              <div
                style={{ background: tinycolor(rgbaColor).toRgbString() }}
                className='w-[280px] h-[300px] rounded-2xl base-shadow base-border'
              />

              <section className='w-full flex flex-col gap-3'>
                <div className='w-full flex items-center justify-center gap-2'>
                  {actions.map((action, i) => (
                    <Button
                      key={i}
                      variant={'outline'}
                      size={'lg'}
                      onClick={action.handler}
                      className='group flex items-center gap-2 rounded-3xl'>
                      <action.icon className='group-hover:stroke-blue-400 group-active:stroke-blue-400 transition-colors w-4' />
                      <span className='group-hover:text-blue-400 transition-colors capitalize'>
                        {action.name}
                      </span>
                    </Button>
                  ))}
                </div>

                <Separator decorative />

                <div className='w-full flex items-center justify-center gap-3'>
                  {colorHeadings.map((item, i) => (
                    <Fragment key={i}>
                      <div className='w-fit flex flex-col items-center gap-1'>
                        <div className='flex items-center gap-3 w-fit'>
                          <h3 className='uppercase font-semibold text-sm text-primary-default'>
                            {item.name}
                          </h3>
                          {/* <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='group rounded-full'
                            onClick={() => item.editFunc()}>
                            <PencilIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                          </Button> */}
                        </div>
                        <div className='flex items-center gap-1'>
                          <p className='font-medium text-sm uppercase'>
                            {item.color}
                          </p>
                          <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='group rounded-full'
                            onClick={() => copyToClipboard(item.color)}>
                            <CopyIcon className='group-hover:stroke-primary group-active:stroke-blue-400 transition-colors w-4' />
                          </Button>
                        </div>
                      </div>

                      {colorHeadings[i + 1] ? (
                        <Separator decorative orientation='vertical' />
                      ) : null}
                    </Fragment>
                  ))}
                </div>

                <Separator decorative />

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

        </Tabs>
      </main>
    </Layout>
  );
}
