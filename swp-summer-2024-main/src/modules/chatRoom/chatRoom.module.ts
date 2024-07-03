import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomToUserEntity } from 'src/entities/chat-room-to-user.entity';
import { ChatRoomEntity } from 'src/entities/chat-room.entity';
import { ChatRoomController } from './chatRoom.controller';
import { ChatRoomService } from './chatRoom.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity, ChatRoomToUserEntity])],
  controllers: [ChatRoomController],
  providers: [ChatRoomService],
})
export class ChatRoomModule {}
