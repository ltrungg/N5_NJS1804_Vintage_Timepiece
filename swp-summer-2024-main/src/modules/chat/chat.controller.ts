import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/session/:id')
  getListSessionChat(@Param('id') id: string) {
    return this.chatService.getListSessionChat(id);
  }

  @Post('/session')
  createSessionChat(@Body() data: { sender: string; receiver: string }) {
    return this.chatService.createSessionChat(data);
  }
}
