import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatRoomService } from './chatRoom.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
@Controller('chatRoom')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Get('/chat_room_to_user')
  getAllChatRoomToUser() {
    return this.chatRoomService.getAllChatRoomToUser();
  }

  @Get('/user/:id')
  getChatRoomByUser(@Param('id') id: string) {
    return this.chatRoomService.getChatRoomByUser(id);
  }

  @Get('/butUser/:accountId/:chatRoomId')
  getChatRoomByIdButAccount(
    @Param('accountId') accountId: string,
    @Param('chatRoomId') chatRoomId: string,
  ) {
    return this.chatRoomService.getChatRoomByIdButAccount(
      accountId,
      chatRoomId,
    );
  }

  @Get('/butUser/code/:accountId/:code')
  getChatRoomByCodeButAccount(
    @Param('accountId') accountId: string,
    @Param('code') code: string,
  ) {
    return this.chatRoomService.getChatRoomByCodeButAccount(accountId, code);
  }

  @Get(':id')
  getChatRoomByCodeOrId(@Param('id') id: string) {
    return this.chatRoomService.getChatRoomByCodeOrId(id);
  }

  @Post()
  createChatRoom(
    @Body() data: { code: string; product: UUID; participants: string[] },
  ) {
    return this.chatRoomService.createChatRoom(data);
  }

  @Delete(':id')
  deleteChatRoom(@Param('id') id: string) {
    return this.chatRoomService.deleteChatRoom(id);
  }
}
