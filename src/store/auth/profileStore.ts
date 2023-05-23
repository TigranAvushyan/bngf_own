import { createEffect, createEvent, createStore } from 'effector';
import { User } from '../../lib/types/user/userType';
import { http_get } from '../../lib/server/http';
import { attach } from 'effector/effector.umd';
import { urls } from '../../lib/server/urls';

export const getProfile = createEffect(async () => {
  try {
    const resMe = await http_get<{ id: number, email: string }>(urls.userMe());
    const user = await http_get<any>(urls.userId(resMe.id));
    return {
      id: user.bitrix?.bitrix_id,
      first_name: user.bitrix?.first_name,
      last_name: user.bitrix?.last_name,
      avatar: user.bitrix?.avatar,
      bitrix: user.bitrix,
    };
  } catch (e) {
    console.log('getProfile: ', e);
  }
});

export const clearProfileStore = createEvent();

export const $profile = createStore<User | null>(null)
    .on(getProfile.done, (_, payload: any) => payload.result)
    .reset(clearProfileStore);

export const getMe = attach({
  source: $profile,
  effect: (profile) => profile,
});
