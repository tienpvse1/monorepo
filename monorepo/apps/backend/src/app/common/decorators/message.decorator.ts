import { SetMetadata } from '@nestjs/common';

export const MESSAGE = 'message';
export const HistoryLog = (message?: string) =>
  SetMetadata(MESSAGE, message || '');
