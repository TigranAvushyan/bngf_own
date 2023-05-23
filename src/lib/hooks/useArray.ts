import { useState } from 'react';

const useArray = <T>(defaultValue: T[]) => {
  const [array, setArray] = useState<T[]>(defaultValue);

  const push = (element: T | T[]) => {
    if (Array.isArray(element)) {
      setArray((a) => [...a, ...element]);
      return;
    }
    setArray((a) => [...a, element]);
  };

  const filter = (callback: <S extends T>(value: T, index: number, array: T[]) => value is S) => {
    setArray((a) => a.filter(callback));
  };

  const update = (index: number, newElement: T) => {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  };

  const remove = (index: number) => {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  };

  const clear = () => {
    setArray([]);
  };

  return { array, set: setArray, push, filter, update, remove, clear };
};
export default useArray;
