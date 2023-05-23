import { DbFields } from './DbFields';
import { JwtToken } from '../types/token/jwtToken';

export type DeterminedDbProps = {
  [DbFields.JWT_TOKEN]: JwtToken,
  [DbFields.EXPO_TOKEN]: string
}

export type DbProps = Record<
  Exclude<DbFields, keyof DeterminedDbProps>,
  string>
  & DeterminedDbProps
