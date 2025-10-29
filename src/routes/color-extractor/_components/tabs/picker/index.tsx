import { DropzoneArea } from '@/components/dropzone';
import { PickerColorsRenderer } from '@/components/picker-colors-renderer';
import { Button } from '@/components/ui/button';
import { useColorExtractor } from '@/hooks/use-color-extractor';
import { XIcon } from 'lucide-react';
import { ImageColorPicker } from 'react-image-color-picker';

export function PickerTab() {
  const {
    extractedColors,
    mappedPickerColors,
    handleClearPickerColors,
    handleClearPickerImage,
    handlePickColorImage,
    removeColorFromPicker,
    onPickColor
  } = useColorExtractor();

  return (
    <section className="flex w-full flex-col">
      <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4">
        {extractedColors.picker.image ? (
          <section className="z-10 mx-auto flex w-full max-w-xl flex-col gap-3 rounded-3xl">
            <ImageColorPicker
              imgSrc={extractedColors.picker.image}
              onColorPick={onPickColor}
            />
          </section>
        ) : (
          <DropzoneArea handler={handlePickColorImage} />
        )}

        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          {extractedColors.picker.image ? (
            <Button
              variant="ghost"
              onClick={handleClearPickerImage}
              className="base-border group flex items-center gap-2 rounded-3xl">
              <XIcon className="w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500" />
              <span className="font-medium capitalize transition-colors group-hover:text-red-500">
                Clear Image
              </span>
            </Button>
          ) : null}

          {extractedColors.picker.colors.length > 0 ? (
            <Button
              variant="ghost"
              onClick={handleClearPickerColors}
              className="base-border group flex items-center gap-2 rounded-3xl">
              <XIcon className="w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500" />
              <span className="font-medium capitalize transition-colors group-hover:text-red-500">
                Clear Colors
              </span>
            </Button>
          ) : null}
        </div>

        {!extractedColors.picker.image ? (
          <div className="mx-auto flex w-full max-w-xl flex-col gap-2">
            <h3 className="text-md">Notes:</h3>
            <ul className="text-sm">
              <li>
                Add an image to activate picker and select colors you want to picker from
                image to build a palette.
              </li>
              <li>Extracted colors form image will appear here.</li>
              <li>You can click on the delete button to delete color from the list.</li>
            </ul>
          </div>
        ) : null}

        <PickerColorsRenderer
          colors={extractedColors.picker.colors}
          handleRemove={removeColorFromPicker}
          paletteColors={mappedPickerColors}
        />
      </section>
    </section>
  );
}
