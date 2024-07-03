import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from 'src/entities/chat.entity';
import { SessionChatEntity } from 'src/entities/session-chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(SessionChatEntity)
    private sessionChatRepository: Repository<SessionChatEntity>,
  ) {}

  async createSessionChat(data: any) {
    return this.sessionChatRepository.save(data);
  }

  async getListSessionChat(sender: string) {
    return this.sessionChatRepository.find({ where: { sender } });
  }

  async getChatHistory(sessionChat: string) {
    return this.chatRepository.find({ where: { sessionChat } });
  }

  async sendMessage(sender: string, receiver: string, message: string) {
    let sessionChat = await this.sessionChatRepository.findOne({
      where: { sender, receiver },
    });
    if (!sessionChat) {
      sessionChat = await this.sessionChatRepository.save({ sender, receiver });
    }
    return this.chatRepository.save({ sessionChat: sessionChat.id, message });
  }
}
