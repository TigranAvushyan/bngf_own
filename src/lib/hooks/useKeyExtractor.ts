import { useCallback } from 'react';

const useKeyExtractor = () => useCallback((_, idx: number) => idx.toString(), []);

export default useKeyExtractor;
