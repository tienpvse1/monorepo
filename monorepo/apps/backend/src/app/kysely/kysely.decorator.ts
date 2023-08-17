import { Inject } from '@nestjs/common';
import { KYSELY_INSTANCE } from './kysely.module';

export const InjectKysely = Inject(KYSELY_INSTANCE);
