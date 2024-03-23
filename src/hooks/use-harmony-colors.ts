import { randomColor, transformColorsToString } from '@/lib/utils';
import { HARMONY_COLOR_STORAGE_KEY } from '@/shared/constants';
import { ColorActions, HarmonyColors, HarmonyColorsDB, RGBA } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import compareObjects from 'lodash.isequal';
import { DownloadIcon, ShuffleIcon } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';
import tinycolor from 'tinycolor2';

export const useHarmonyColors = () => {
  const [harmonyColors, setHarmonyColors] = React.useState<HarmonyColors>({
    complement: { originalColor: randomColor(), value: randomColor() },
    splitComplement: { originalColor: randomColor(), values: [] },
    analogous: { originalColor: randomColor(), values: [] },
    triadic: { originalColor: randomColor(), values: [] },
    tetradic: { originalColor: randomColor(), values: [] },
    monochromatic: { originalColor: randomColor(), chroma: [] }
  });

  const [, updateHarmonyColorsDB] = useLocalStorage<HarmonyColorsDB>(
    HARMONY_COLOR_STORAGE_KEY,
    {
      complement: [],
      splitComplement: [],
      analogous: [],
      triadic: [],
      tetradic: [],
      monochromatic: []
    }
  );

  // complement functions
  React.useMemo(() => {
    const complement = tinycolor(harmonyColors.complement.originalColor)
      .complement()
      .toRgb();

    setHarmonyColors((state) => ({
      ...state,
      complement: { ...state.complement, value: complement }
    }));
  }, [harmonyColors.complement.originalColor]);

  const complementColorsString = React.useMemo(
    () => ({
      color: transformColorsToString(harmonyColors.complement.originalColor),
      complement: transformColorsToString(harmonyColors.complement.value)
    }),
    [harmonyColors.complement]
  );

  const rawComplementColors = {
    color: Object.entries(complementColorsString.color).map(([key, value]) => ({
      name: key,
      value
    })),
    complement: Object.entries(complementColorsString.complement).map(([key, value]) => ({
      name: key,
      value
    }))
  };

  const complementColorActions: ColorActions = [
    {
      name: 'random color',
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((state) => ({
          ...state,
          complement: { ...state.complement, originalColor: randomColor() }
        }))
    },
    {
      name: 'save color',
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.complement
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(originalColor, harmonyColors.complement.originalColor)
            );

          if (isDuplicate) {
            toast.error('Complement color already saved.');
            return db;
          }
          toast.success('Complement color saved.');
          return {
            ...db,
            complement: [
              ...db.complement,
              {
                ...harmonyColors.complement,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
              }
            ]
          };
        });
      }
    }
  ];

  // analogous functions
  React.useMemo(() => {
    const resultArray = tinycolor(harmonyColors.analogous.originalColor)
      .analogous(3)
      .map((instance) => instance.toRgb());

    setHarmonyColors((state) => ({
      ...state,
      analogous: { ...state.analogous, values: resultArray }
    }));
  }, [harmonyColors.analogous.originalColor]);

  const analogousColorsString = React.useMemo(
    () => ({
      originalColor: transformColorsToString(harmonyColors.analogous.originalColor),
      values: harmonyColors.analogous.values.map((value) => transformColorsToString(value))
    }),
    [harmonyColors.analogous]
  );

  const rawAnalogousColors = {
    originalColor: Object.entries(analogousColorsString.originalColor).map(
      ([key, value]) => ({
        name: key,
        value
      })
    ),
    values: analogousColorsString.values.map((item) =>
      Object.entries(item).map(([key, value]) => ({ name: key, value }))
    )
  };

  const analogousColorActions: ColorActions = [
    {
      name: 'random color',
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((state) => ({
          ...state,
          analogous: { ...state.analogous, originalColor: randomColor() }
        }))
    },
    {
      name: 'save color',
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.analogous
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(originalColor, harmonyColors.analogous.originalColor)
            );

          if (isDuplicate) {
            toast.error('Analogous color already saved.');
            return db;
          }
          toast.success('Analogous color palette saved.');
          return {
            ...db,
            analogous: [
              ...db.analogous,
              {
                ...harmonyColors.analogous,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
              }
            ]
          };
        });
      }
    }
  ];

  // split complement functions
  React.useMemo(() => {
    const resultArray = tinycolor(harmonyColors.splitComplement.originalColor)
      .splitcomplement()
      .map((instance) => instance.toRgb());

    setHarmonyColors((state) => ({
      ...state,
      splitComplement: { ...state.splitComplement, values: resultArray }
    }));
  }, [harmonyColors.splitComplement.originalColor]);

  const splitComplementColorsString = React.useMemo(
    () => ({
      originalColor: transformColorsToString(harmonyColors.splitComplement.originalColor),
      values: harmonyColors.splitComplement.values.map((value) =>
        transformColorsToString(value)
      )
    }),
    [harmonyColors.splitComplement]
  );

  const rawSplitComplementColors = {
    originalColor: Object.entries(splitComplementColorsString.originalColor).map(
      ([key, value]) => ({
        name: key,
        value
      })
    ),
    values: splitComplementColorsString.values.map((item) =>
      Object.entries(item).map(([key, value]) => ({ name: key, value }))
    )
  };

  const splitComplementColorActions: ColorActions = [
    {
      name: 'random color',
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((state) => ({
          ...state,
          splitComplement: {
            ...state.splitComplement,
            originalColor: randomColor()
          }
        }))
    },
    {
      name: 'save color',
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.splitComplement
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(originalColor, harmonyColors.splitComplement.originalColor)
            );

          if (isDuplicate) {
            toast.error('Split complement colors already saved.');
            return db;
          }
          toast.success('Split complement color palette saved.');
          return {
            ...db,
            splitComplement: [
              ...db.splitComplement,
              {
                ...harmonyColors.splitComplement,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
              }
            ]
          };
        });
      }
    }
  ];

  // triadic functions
  React.useMemo(() => {
    const resultArray = tinycolor(harmonyColors.triadic.originalColor)
      .triad()
      .map((instance) => instance.toRgb());

    setHarmonyColors((state) => ({
      ...state,
      triadic: { ...state.triadic, values: resultArray }
    }));
  }, [harmonyColors.triadic.originalColor]);

  const triadicColorsString = React.useMemo(
    () => ({
      originalColor: transformColorsToString(harmonyColors.triadic.originalColor),
      values: harmonyColors.triadic.values.map((value) => transformColorsToString(value))
    }),
    [harmonyColors.triadic]
  );

  const rawTriadicColors = {
    originalColor: Object.entries(triadicColorsString.originalColor).map(
      ([key, value]) => ({
        name: key,
        value
      })
    ),
    values: triadicColorsString.values.map((item) =>
      Object.entries(item).map(([key, value]) => ({ name: key, value }))
    )
  };

  const triadicColorActions: ColorActions = [
    {
      name: 'random color',
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((state) => ({
          ...state,
          triadic: { ...state.triadic, originalColor: randomColor() }
        }))
    },
    {
      name: 'save color',
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.triadic
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(originalColor, harmonyColors.triadic.originalColor)
            );

          if (isDuplicate) {
            toast.error('Triadic colors already saved.');
            return db;
          }
          toast.success('Triadic color palette saved.');
          return {
            ...db,
            triadic: [
              ...db.triadic,
              {
                ...harmonyColors.triadic,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
              }
            ]
          };
        });
      }
    }
  ];

  // tetradic functions
  React.useMemo(() => {
    const resultArray = tinycolor(harmonyColors.tetradic.originalColor)
      .tetrad()
      .map((instance) => instance.toRgb());

    setHarmonyColors((state) => ({
      ...state,
      tetradic: { ...state.tetradic, values: resultArray }
    }));
  }, [harmonyColors.tetradic.originalColor]);

  const tetradicColorsString = React.useMemo(
    () => ({
      originalColor: transformColorsToString(harmonyColors.tetradic.originalColor),
      values: harmonyColors.tetradic.values.map((value) => transformColorsToString(value))
    }),
    [harmonyColors.tetradic]
  );

  const rawTetradicColors = {
    originalColor: Object.entries(tetradicColorsString.originalColor).map(
      ([key, value]) => ({
        name: key,
        value
      })
    ),
    values: tetradicColorsString.values.map((item) =>
      Object.entries(item).map(([key, value]) => ({ name: key, value }))
    )
  };

  const tetradicColorActions: ColorActions = [
    {
      name: 'random color',
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((state) => ({
          ...state,
          tetradic: { ...state.tetradic, originalColor: randomColor() }
        }))
    },
    {
      name: 'save color',
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.tetradic
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(originalColor, harmonyColors.tetradic.originalColor)
            );

          if (isDuplicate) {
            toast.error('Tetradic colors already saved.');
            return db;
          }
          toast.success('Tetradic color palette saved.');
          return {
            ...db,
            tetradic: [
              ...db.tetradic,
              {
                ...harmonyColors.tetradic,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
              }
            ]
          };
        });
      }
    }
  ];

  // monochromatic functions
  React.useMemo(() => {
    const resultArray = tinycolor(harmonyColors.monochromatic.originalColor)
      .monochromatic(4)
      .map((instance) => instance.toRgb());

    setHarmonyColors((state) => ({
      ...state,
      monochromatic: { ...state.monochromatic, chroma: resultArray }
    }));
  }, [harmonyColors.monochromatic.originalColor]);

  const monochromaticColorsString = React.useMemo(
    () => ({
      originalColor: transformColorsToString(harmonyColors.monochromatic.originalColor),
      values: harmonyColors.monochromatic.chroma.map((value) =>
        transformColorsToString(value)
      )
    }),
    [harmonyColors.monochromatic]
  );

  const rawMonochromaticColors = {
    originalColor: Object.entries(monochromaticColorsString.originalColor).map(
      ([key, value]) => ({
        name: key,
        value
      })
    ),
    values: monochromaticColorsString.values.map((item) =>
      Object.entries(item).map(([key, value]) => ({ name: key, value }))
    )
  };

  const monochromaticColorActions: ColorActions = [
    {
      name: 'random color',
      icon: ShuffleIcon,
      handler: () =>
        setHarmonyColors((state) => ({
          ...state,
          monochromatic: { ...state.monochromatic, originalColor: randomColor() }
        }))
    },
    {
      name: 'save color',
      icon: DownloadIcon,
      handler: () => {
        updateHarmonyColorsDB((db) => {
          const isDuplicate = db.monochromatic
            .map(({ originalColor }) => originalColor)
            .some((originalColor: RGBA) =>
              compareObjects(originalColor, harmonyColors.monochromatic.originalColor)
            );

          if (isDuplicate) {
            toast.error('Monochromatic colors already saved.');
            return db;
          }
          toast.success('Monochromatic color palette saved.');
          return {
            ...db,
            monochromatic: [
              ...db.monochromatic,
              {
                ...harmonyColors.monochromatic,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
              }
            ]
          };
        });
      }
    }
  ];

  return {
    analogousColorActions,
    complementColorActions,
    harmonyColors,
    monochromaticColorActions,
    rawComplementColors,
    setHarmonyColors,
    rawAnalogousColors,
    rawMonochromaticColors,
    rawTriadicColors,
    tetradicColorActions,
    triadicColorActions,
    splitComplementColorActions,
    rawSplitComplementColors,
    rawTetradicColors
  };
};
