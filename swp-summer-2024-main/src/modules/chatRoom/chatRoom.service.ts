import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomToUserEntity } from 'src/entities/chat-room-to-user.entity';
import { ChatRoomEntity } from 'src/entities/chat-room.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private chatRoomRepository: Repository<ChatRoomEntity>,
    @InjectRepository(ChatRoomToUserEntity)
    private chatRoomToUserRepository: Repository<ChatRoomToUserEntity>,
  ) {}

  async getAllChatRoomToUser() {
    return await this.chatRoomToUserRepository.find({
      relations: ['participant', 'chatRoom', 'chatRoom.product'],
      order: {
        createdAt: 'desc',
      },
    });
  }

  async getChatRoomByCodeOrId(id: string) {
    return await this.chatRoomToUserRepository.find({
      where: [
        {
          chatRoom: {
            id: id,
          },
        },
        {
          chatRoom: {
            code: id,
          },
        },
      ],
      relations: ['participant', 'chatRoom', 'chatRoom.product'],
      order: {
        createdAt: 'desc',
      },
    });
  }

  async getChatRoomByIdButAccount(butAccountId: string, chatRoomId: string) {
    return await this.chatRoomToUserRepository.findOne({
      where: [
        {
          chatRoom: {
            id: chatRoomId,
          },
          participant: {
            id: Not(butAccountId),
          },
        },
        {
          chatRoom: {
            code: chatRoomId,
          },
          participant: {
            id: Not(butAccountId),
          },
        },
      ],
      relations: ['participant', 'chatRoom', 'chatRoom.product'],
      order: {
        createdAt: 'desc',
      },
    });
  }

  async getChatRoomByCodeButAccount(butAccountId: string, code: string) {
    return await this.chatRoomToUserRepository.findOne({
      where: {
        chatRoom: {
          code: code,
        },
        participant: {
          id: Not(butAccountId),
        },
      },

      relations: ['participant', 'chatRoom', 'chatRoom.product'],
      order: {
        createdAt: 'desc',
      },
    });
  }

  async getChatRoomByUser(accountId: string) {
    return await this.chatRoomToUserRepository.find({
      where: {
        participant: {
          id: accountId,
        },
      },
      relations: ['participant', 'chatRoom', 'chatRoom.product'],
      order: {
        createdAt: 'desc',
      },
    });
  }

  async createChatRoom(data: any) {
    try {
      const createChatRoom = await this.chatRoomRepository.save({
        code: data.code,
        product: data.product,
      });
      data.participants.map(async (accountId: string) => {
        await this.chatRoomToUserRepository
          .createQueryBuilder()
          .insert()
          .into('CHAT_ROOM_TO_USER')
          .values({
            participant: accountId,
            chatRoom: createChatRoom.id,
          })
          .execute();
      });

      return {
        message: 'A new chat room has been created',
      };
    } catch (err) {
      return err;
    }
  }

  async deleteChatRoom(id: string) {
    await this.chatRoomToUserRepository
      .createQueryBuilder()
      .delete()
      .from('CHAT_ROOM_TO_USER')
      .where('chatRoom.id = :id', {
        id: id,
      })
      .execute();
    return await this.chatRoomRepository
      .createQueryBuilder()
      .delete()
      .from('CHAT_ROOM')
      .where('id = :id', {
        id: id,
      })
      .execute();
  }
}
