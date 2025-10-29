import { DropzoneArea } from '@/components/dropzone';
import { ImageViewer } from '@/components/image-viewer';
import { PaletteRenderer } from '@/components/palette-renderer';
import { Button } from '@/components/ui/button';
import { useColorExtractor } from '@/hooks/use-color-extractor';
import { XIcon } from 'lucide-react';

export function PaletteTab() {
  const {
    extractedColors,
    mappedPaletteColors,
    handleClearPaletteColors,
    handleClearPaletteImage,
    removeColorFromPalette,
    onGeneratePalette
  } = useColorExtractor();

  return (
    <section className="flex w-full flex-col">
      <section className="base-border flex w-full flex-col gap-3 rounded-2xl bg-foreground-default p-4">
        {extractedColors.palette.image ? (
          <section className="mx-auto flex w-full max-w-xl flex-col gap-3">
            <ImageViewer imageData={extractedColors.palette.image} />
          </section>
        ) : (
          <DropzoneArea handler={onGeneratePalette} />
        )}

        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          {extractedColors.palette.image ? (
            <Button
              variant="ghost"
              onClick={handleClearPaletteImage}
              className="base-border group flex items-center gap-2 rounded-3xl">
              <XIcon className="w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500" />
              <span className="font-medium capitalize transition-colors group-hover:text-red-500">
                Clear Image
              </span>
            </Button>
          ) : null}
          {extractedColors.palette.colors.length > 0 ? (
            <Button
              variant="ghost"
              onClick={handleClearPaletteColors}
              className="base-border group flex items-center gap-2 rounded-3xl">
              <XIcon className="w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500" />
              <span className="font-medium capitalize transition-colors group-hover:text-red-500">
                Clear Colors
              </span>
            </Button>
          ) : null}
        </div>

        {!extractedColors.palette.image ? (
          <div className="mx-auto flex w-full max-w-xl flex-col gap-2">
            <h3 className="text-md">Notes:</h3>
            <ul className="text-sm">
              <li>
                Add an image to extract to automatically extract colors and build a palette.
              </li>
              <li>Extracted colors form image will appear here.</li>
              <li>You can click on the delete button to delete color from the list.</li>
            </ul>
          </div>
        ) : null}

        <PaletteRenderer
          colors={extractedColors.palette.colors}
          handleRemove={removeColorFromPalette}
          paletteColors={mappedPaletteColors}
        />
      </section>
    </section>
  );
}
