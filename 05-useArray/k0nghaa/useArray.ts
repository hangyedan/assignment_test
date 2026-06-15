import { useState, type Dispatch, type SetStateAction } from 'react';

interface UseArrayReturn<T> {
  array: T[];
  set: Dispatch<SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

export default function useArray<T>(defaultValue: T[]): UseArrayReturn<T> {
  const [array, set] = useState<T[]>(defaultValue);

  const push = (element: T) => {
    set((prev) => [...prev, element]);
  };

  // const filter = (
  //   callback: (value: T, index: number, array: T[]) => boolean,
  // ) => {};

  const update = (index: number, newElement: T) => {
    set((prev) => {
      prev[index] = newElement;
      return [...prev];
    });
  };

  const remove = (index: number) => {
    set((prev) => {
      prev.filter((_, i) => i !== index);
      return [...prev];
    });
  };

  const clear = () => {
    set([]);
  };

  return { array, set, push, filter, update, remove, clear };
}
