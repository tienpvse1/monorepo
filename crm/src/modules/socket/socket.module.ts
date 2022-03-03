import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketService],
})
export class SocketModule {}
