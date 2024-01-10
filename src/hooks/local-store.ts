import { useEffect, useLayoutEffect, useState } from 'react';

export const useLocalStore = <T>(key: string, initialData: T) => {
  if (typeof initialData != 'object') {
    throw new TypeError(`'initialData' argument must be a object`);
  }
  const [value, setValue] = useState(initialData);

  const onSync = () => localStorage.setItem(key, JSON.stringify(value));

  const onRestore = () => {
    const data: T = JSON.parse(
      localStorage.getItem(key) || JSON.stringify(initialData)
    );
    setValue((value) => ({ ...value, ...data }));
  };

  useEffect(() => {
    onSync();
  }, [value]);

  useLayoutEffect(() => {
    onRestore();
  }, []);

  return { value, setValue };
};
