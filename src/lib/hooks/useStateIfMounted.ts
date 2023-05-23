import { useEffect, useRef, useState } from 'react';

const useStateIfMounted = <T>(
  initialState: T,
): [T, (newState: T) => void] => {
  const isMounted = useRef(true);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const setStateIfMounted = (newState: T) => {
    if (isMounted.current) {
      setState(newState);
    }
  };

  return [state, setStateIfMounted];
};
export default useStateIfMounted;
