import { useEffect, useLayoutEffect, useState } from 'react';

export const useLocalStore = <T>(key: string, initialData: T) => {
  const [value, setValue] = useState(initialData);

  const onSync = () => localStorage.setItem(key, JSON.stringify(value));

  const onRestore = () => {
    const data: T = JSON.parse(
      localStorage.getItem(key) || JSON.stringify(initialData)
    );
    setValue((value: T) => ({ ...value, ...data }));
  };

  useEffect(() => { 
    onSync();
  }, [value]);

  useLayoutEffect(() => {
    onRestore();
  }, []);

  return { value, setValue };
};
