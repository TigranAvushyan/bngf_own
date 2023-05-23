import { attach, createEffect, createEvent, createStore } from 'effector';
import { Audio } from 'expo-av';

const setAudioPermission = createEvent<boolean>();
const $isSetAudioPermission = createStore(false).on(
    setAudioPermission,
    (_, payload) => payload,
);

const checkAudioPermission = createEffect(async () => {
  console.log('checkAudioPermission');
  const { granted } = await Audio.getPermissionsAsync();
  setAudioPermission(granted);
  console.log('granted', granted);
  return granted;
});

export const getAudioPermission = attach({
  source: $isSetAudioPermission,
  mapParams: (_: void, state) => ({ state }),
  effect: createEffect(async ({ state }: { state: boolean }) => {
    if (state) return true;
    const isSavedPermissionGranted = await checkAudioPermission();
    if (isSavedPermissionGranted) return true;
    const { granted } = await Audio.requestPermissionsAsync();
    setAudioPermission(granted);
    return granted;
  }),
});
