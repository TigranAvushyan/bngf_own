import { DependencyList, useEffect } from 'react';
import useTimeout from './useTimeout';

const useDebounce = (callback: () => void, delay: number, dependencies: DependencyList) => {
  const { reset, clear, start } = useTimeout(callback, delay);
  useEffect(start, []);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};

export default useDebounce;
