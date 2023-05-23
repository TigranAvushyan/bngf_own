import { PermissionStatus } from 'expo-modules-core/src/PermissionsInterface';
import * as Camera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useCallback } from 'react';

export const usePermissions = () => {
  const [hasPermissions, setHasPermissions] = React.useState(false);
  const askCameraPermissions = useCallback(async (): Promise<PermissionStatus> => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status;
  }, []);

  const askMediaPermissions = useCallback(async (): Promise<PermissionStatus> => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status;
  }, []);


  React.useEffect(() => {
    (async () => {
      try {
        const camera = await askMediaPermissions();
        const media = await askCameraPermissions();
        if (camera === 'granted' && media === 'granted') {
          setHasPermissions(true);
        } else setHasPermissions(false);
      } catch (e) {
        console.log('usePermissions: ', e);
      }
    })();
  }, []);

  return hasPermissions;
};
