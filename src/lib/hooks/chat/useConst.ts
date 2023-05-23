import { MutableRefObject, useRef } from 'react';

export function useConst<T>(initGenerator: () => T) {
  const ref = useRef<T>(null) as MutableRefObject<T>;
  if (ref.current === null) {
    ref.current = initGenerator();
  }
  return ref.current;
}
