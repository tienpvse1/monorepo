import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';

@Module({
  controllers: [SocketController],
  providers: [SocketService]
})
export class SocketModule {}
