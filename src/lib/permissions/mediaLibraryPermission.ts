import { attach, createEffect, createEvent, createStore } from 'effector';
import * as MediaLibrary from 'expo-media-library';

const setMediaLibraryPermission = createEvent<boolean>();
const $isSetMediaLibraryPermission = createStore(false).on(
    setMediaLibraryPermission,
    (_, payload) => payload,
);

const checkMediaLibraryPermission = createEffect(async () => {
  const { granted } = await MediaLibrary.getPermissionsAsync();
  setMediaLibraryPermission(granted);
  return granted;
});

export const getMediaLibraryPermission = attach({
  source: $isSetMediaLibraryPermission,
  mapParams: (_: void, state) => ({ state }),
  effect: createEffect(async ({ state }: { state: boolean }) => {
    if (state) return true;
    const isSavedPermissionGranted = await checkMediaLibraryPermission();
    if (isSavedPermissionGranted) return true;
    const { granted } = await MediaLibrary.getPermissionsAsync();
    setMediaLibraryPermission(granted);
    return granted;
  }),
});
