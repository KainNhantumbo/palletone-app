import { transformColorsToString } from '@/lib/utils';
import { ExtractedColors, RGBA } from '@/types';
import { extractColors } from 'extract-colors';
import { FinalColor } from 'extract-colors/lib/types/Color';
import compareObjects from 'lodash.isequal';
import * as React from 'react';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';

export const useColorExtractor = () => {
  const [extractedColors, setExtractedColors] = React.useState<ExtractedColors>({
    palette: { colors: [], image: '' },
    picker: { colors: [], image: '' }
  });

  const onGeneratePalette = async (imageData: string) => {
    try {
      const result = await extractColors(imageData, { distance: 0.12 });
      setExtractedColors((current) => ({
        ...current,
        palette: { colors: result, image: imageData }
      }));
    } catch (error) {
      console.error(error);
      toast.error('Error: failed to generate palette from selected image.');
    }
  };

  const handlePickColorImage = async (imageData: string) => {
    setExtractedColors((current) => ({
      ...current,
      picker: { ...current.picker, image: imageData }
    }));
  };

  const onPickColor = React.useCallback(
    (rawRGBColorString: string) => {
      const pickedColor = tinycolor(rawRGBColorString).toRgb();

      const isDuplicate = extractedColors.picker.colors
        .map((color) => color.value)
        .some((value: RGBA) => compareObjects(value, pickedColor));

      if (isDuplicate) return toast.error('Color already picked.');

      setExtractedColors((current) => ({
        ...current,
        picker: {
          ...current.picker,
          colors: current.picker.colors.concat({
            id: `${crypto.randomUUID()}-${rawRGBColorString}`,
            value: pickedColor
          })
        }
      }));
    },
    [extractedColors]
  );

  const handleClearPaletteColors = () => {
    setExtractedColors((state) => ({
      ...state,
      palette: { ...state.palette, colors: [] }
    }));
  };

  const removeColorFromPalette = (color: FinalColor) =>
    setExtractedColors((state) => ({
      ...state,
      palette: {
        ...state.palette,
        colors: state.palette.colors.filter((item) => item.hex != color.hex)
      }
    }));

  const removeColorFromPicker = (id: string) =>
    setExtractedColors((state) => ({
      ...state,
      picker: {
        ...state.picker,
        colors: state.picker.colors.filter((item) => item.id != id)
      }
    }));

  const handleClearPaletteImage = () => {
    setExtractedColors((state) => ({
      ...state,
      palette: { ...state.palette, image: '' }
    }));
  };

  const handleClearPickerColors = () => {
    setExtractedColors((state) => ({
      ...state,
      picker: { ...state.picker, colors: [] }
    }));
  };

  const handleClearPickerImage = () => {
    setExtractedColors((state) => ({
      ...state,
      picker: { ...state.picker, image: '' }
    }));
  };

  const mappedPaletteColors = (color: RGBA) =>
    Object.entries(transformColorsToString(color)).map(([key, value]) => ({
      name: key,
      value
    }));

  const mappedPickerColors = (color: { id: string; value: RGBA }) =>
    Object.entries(transformColorsToString(color.value)).map(([key, value]) => ({
      id: color.id,
      name: key,
      value
    }));

  return {
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
    onGeneratePalette,
    extractedColors
  };
};
