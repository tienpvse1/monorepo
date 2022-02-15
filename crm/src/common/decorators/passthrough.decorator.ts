import { SetMetadata } from '@nestjs/common';

export const PASSTHROUGH = 'passthrough';

export const IsPassthrough = () => SetMetadata(PASSTHROUGH, true);
