export interface User {
  id: number,
  first_name: string,
  last_name: string,
  avatar: string,
  is_online: boolean,
  bitrix: BitrixProfile,
  chat_user?: number
}

export interface BitrixProfile {
  bitrix_id: number,
  date_of_birth: string,
  date_joined: string,
  first_name: string
  last_name: string,
  is_superuser: boolean,
  avatar: string,
  mobile_phone: string,
  work_phone: string,
  internal_phone: string,
  position: string,
  organization: string,
  subdivision: string,
  city: string,
  address: string,
  cabinet: string,
  skype: string,
}
