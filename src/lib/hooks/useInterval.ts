import React from 'react';

const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = React.useRef(callback);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clear = React.useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  const start = React.useCallback(() => {
    intervalRef.current = setInterval(() => callbackRef.current(), delay);
  }, [delay, clear]);


  const reset = React.useCallback(() => {
    clear();
    start();
  }, [clear, start]);

  return { reset, clear, start };
};


export default useInterval;
