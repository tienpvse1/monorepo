import { Kysely as RootType } from 'kysely';
import { DB } from './models';
export type Kysely = RootType<DB>;
