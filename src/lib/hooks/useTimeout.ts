import React from 'react';

const useTimeout = (callback: () => void, delay: number) => {
  const callbackRef = React.useRef(callback);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clear = React.useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const start = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay, clear]);


  const reset = React.useCallback(() => {
    clear();
    start();
  }, [clear, start]);

  return { reset, clear, start };
};


export default useTimeout;
