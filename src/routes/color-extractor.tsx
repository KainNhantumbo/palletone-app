import { DropzoneArea } from '@/components/dropzone';
import { ImageViewer } from '@/components/image-viewer';
import { PaletteRenderer } from '@/components/palette-renderer';
import { PickerColorsRenderer } from '@/components/picker-colors-renderer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useColorExtractor } from '@/hooks/use-color-extractor';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { BirdIcon, SparklesIcon, XIcon } from 'lucide-react';
import { ImageColorPicker } from 'react-image-color-picker';

export default function ColorExtractor() {
  useDocumentTitle('Palletone - Color Extractor');
  const {
    extractedColors,
    mappedPaletteColors,
    mappedPickerColors,
    handleClearPaletteColors,
    handleClearPaletteImage,
    handleClearPickerColors,
    handleClearPickerImage,
    handlePickColorImage,
    removeColorFromPalette,
    removeColorFromPicker,
    onPickColor,
    onGeneratePalette
  } = useColorExtractor();

  return (
    <main className="mx-auto w-full max-w-5xl pb-24 pt-20">
      <Tabs defaultValue="automatic-palette" className="w-full px-2">
        <TabsList className="mx-auto mb-3 grid w-fit grid-cols-2 place-content-center place-items-center gap-8 bg-background-default">
          <TabsTrigger
            value="automatic-palette"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <SparklesIcon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="font-semibold capitalize transition-colors group-hover:text-blue-400">
              palette
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="picker"
            className="group mx-auto flex w-full max-w-[200px] items-center gap-1 rounded-3xl">
            <BirdIcon className="w-[18px] transition-colors group-hover:stroke-blue-400" />
            <span className="font-semibold capitalize transition-colors group-hover:text-blue-400">
              picker
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="automatic-palette">
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
                      Add an image to extract to automatically extract colors and build a
                      palette.
                    </li>
                    <li>Extracted colors form image will appear here.</li>
                    <li>
                      You can click on the delete button to delete color from the list.
                    </li>
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
        </TabsContent>

        <TabsContent value="picker">
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
                      Add an image to activate picker and select colors you want to picker
                      from image to build a palette.
                    </li>
                    <li>Extracted colors form image will appear here.</li>
                    <li>
                      You can click on the delete button to delete color from the list.
                    </li>
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
        </TabsContent>
      </Tabs>
    </main>
  );
}
