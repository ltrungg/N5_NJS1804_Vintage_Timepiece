import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from 'src/entities/chat.entity';
import { SessionChatEntity } from 'src/entities/session-chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionChatEntity, ChatEntity])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
