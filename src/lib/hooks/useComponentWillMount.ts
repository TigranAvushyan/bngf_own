import { useRef } from 'react';

export const useComponentWillMount = (fn: () => void) => {
  const isMounted = useRef(false);
  if (!isMounted.current) {
    fn();
    isMounted.current = true;
  }
};
