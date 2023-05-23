import { usePrevious } from './usePrevious';
import React, { DependencyList, EffectCallback } from 'react';

export const useEffectAllDepsChange = (effect: EffectCallback, deps: DependencyList) => {
  const prevDeps = usePrevious(deps);
  const changeTarget = React.useRef<typeof prevDeps>();

  React.useEffect(() => {
    if (changeTarget.current === undefined) {
      changeTarget.current = prevDeps;
      return effect();
    }

    if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
      changeTarget.current = deps;

      return effect();
    }
  }, [effect, prevDeps, deps]);
};
