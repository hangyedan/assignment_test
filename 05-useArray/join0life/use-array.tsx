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
  const [array, setArray] = useState(defaultValue);

  const set = setArray;

  const push = (element: T) => {
    const newArray = [...array, element];
    setArray(newArray);
  };

  const filter = (
    callback: (value: T, index: number, array: T[]) => boolean,
  ) => {
    const newArray = array.filter(callback);
    setArray(newArray);
  };

  const update = (index: number, newElement: T) => {
    const newArray = array.map((element, i) =>
      i === index ? newElement : element,
    );
    setArray(newArray);
  };

  const remove = (index: number) => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
  };

  const clear = () => {
    setArray([]);
  };

  return { array, set, push, filter, update, remove, clear };
}
