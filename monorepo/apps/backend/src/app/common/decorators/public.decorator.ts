import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/constance';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
