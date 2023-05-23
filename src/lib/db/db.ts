import { AsyncDbManager } from 'altek-toolkit';
import { DbFields } from './DbFields';
import { DbProps } from './DbProps';

const db = new AsyncDbManager<typeof DbFields, DbProps>(DbFields);

export default db;
