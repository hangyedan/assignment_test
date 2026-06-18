import { useState } from "react";

export default function useArray<T>(defaultValue: T[]) {
  const [array, setArray] = useState<T[]>(defaultValue);

  function push(newItem: T) {
    setArray((prev) => [...prev, newItem]);
  }
  function update(index: number, newItem: T) {
    setArray((prev) => prev.map((item, i) => (i === index ? newItem : item)));
  }
  function remove(index: number) {
    setArray((prev) => prev.filter((_, i) => i !== index));
  }
  function filter(callback: (item: T, index: number, array: T[]) => boolean) {
    setArray((prev) => prev.filter(callback));
  }

  function clear() {
    setArray([]);
  }
  return { array, push, update, remove, filter, set: setArray, clear };
}
