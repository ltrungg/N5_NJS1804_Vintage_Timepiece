import { BaseEntity } from 'src/common/base/entity.base';
import { Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { ChatRoomEntity } from './chat-room.entity';

@Entity({
  name: 'CHAT_ROOM_TO_USER',
})
export class ChatRoomToUserEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.chatRoomToUser)
  participant: AccountEntity;

  @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.chatRoomToUser)
  chatRoom: ChatRoomEntity;
}
