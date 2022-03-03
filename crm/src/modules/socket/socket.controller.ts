import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';

@Controller('socket')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @Post()
  create(@Body() createSocketDto: CreateSocketDto) {
    return this.socketService.create(createSocketDto);
  }

  @Get()
  findAll() {
    return this.socketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(+id, updateSocketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socketService.remove(+id);
  }
}
