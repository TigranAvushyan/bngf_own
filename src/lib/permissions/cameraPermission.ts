import { attach, createEffect, createEvent, createStore } from 'effector';
import { Camera } from 'expo-camera';

const setCameraPermission = createEvent<boolean>();
const $isSetCameraPermission = createStore(false).on(
    setCameraPermission,
    (_, payload) => payload,
);

const checkCameraPermission = createEffect(async () => {
  const { granted } = await Camera.requestCameraPermissionsAsync();
  setCameraPermission(granted);
  return granted;
});

export const getCameraPermission = attach({
  source: $isSetCameraPermission,
  mapParams: (_: void, state) => ({ state }),
  effect: createEffect(async ({ state }: { state: boolean }) => {
    if (state) return true;
    const isSavedPermissionGranted = await checkCameraPermission();
    if (isSavedPermissionGranted) return true;
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(granted);
    return granted;
  }),
});
