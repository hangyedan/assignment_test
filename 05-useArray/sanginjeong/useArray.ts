import { useState, type Dispatch, type SetStateAction } from "react";

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

  const update = (index: number, newElement: T) => {
    const copied = [...array];
    copied.forEach((_, i) => {
      if (i === index) {
        copied[i] = newElement;
      }
    });

    set(copied);
  };

  const remove = (index: number) => {
    const copied = [...array];
    copied.forEach((_, i) => {
      if (i === index) {
        copied.splice(i, 1);
      }
    });
    set(copied);
  };

  const filter = (
    callback: (value: T, index: number, array: T[]) => boolean,
  ) => {
    const filtered = array.filter(callback);

    set(filtered);
  };

  const clear = () => {
    set([]);
  };

  return { array, push, update, remove, filter, set, clear };
}
