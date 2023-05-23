import { BitrixProfile } from '../../lib/types/user/userType';

export interface News {
  id: number,
  title: string,
  detail_text: string,
  from_bitrix_user: BitrixProfile,
  read?: boolean,
  time: string
}

export interface NewsType {
  totalItems: number,
  nextPortionUrl: string,
  previous?: string | null,
  news: News[]
}
