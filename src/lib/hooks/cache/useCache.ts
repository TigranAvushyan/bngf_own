import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';
import useStateIfMounted from '../useStateIfMounted';
import * as shorthash from 'shorthash';


const useCache = (uri: string) => {
  const [localUri, setLocalUri] = useStateIfMounted(uri);

  const [loading, setLoading] = useStateIfMounted(true);


  useEffect(() => {
    const abortController = new AbortController();
    setLocalUri(uri);
    (async () => {
      if (!uri) {
        setLoading(false);
        return;
      }
      if (uri.startsWith('file:/')) {
        setLoading(false);
        setLocalUri(uri);
        return;
      }
      const name = shorthash.unique(uri);

      const filePath = `${ FileSystem.cacheDirectory }${ name }`;

      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        setLocalUri(fileInfo.uri);
        setLoading(false);
        return;
      }

      try {
        if (uri.startsWith('http')) {
          const cachedFileInfo = await FileSystem.downloadAsync(uri, filePath);
          setLocalUri(cachedFileInfo.uri);
        }
      } catch (e) {
        console.log('ERROR: useCache() downloadAsync', e);
      }

      setLoading(false);
    })();


    return () => abortController.abort();
  }, [uri]);

  return { loading, uri: localUri };
};


export default useCache;
