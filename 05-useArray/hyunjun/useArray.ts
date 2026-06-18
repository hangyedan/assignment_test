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
  const [state, setState] = useState(defaultValue);

  const push = (element: T) => {
    setState((prev) => [...prev, element]);
    return;
  };

  const update = (index: number, newElement: T) => {
    setState((prev) => {
      const newArray = [...prev];
      newArray[index] = newElement;
      return newArray;
    });
  };

  const remove = (index: number) => {
    setState((prev) => prev.filter((_, idx) => idx !== index));
  };

  const filter = (
    callback: (value: T, index: number, array: T[]) => boolean,
  ) => {
    setState((prev) => prev.filter(callback));
    return;
  };

  const clear = () => {
    setState([]);
  };

  return { push, array: state, update, remove, filter, set: setState, clear };
}
