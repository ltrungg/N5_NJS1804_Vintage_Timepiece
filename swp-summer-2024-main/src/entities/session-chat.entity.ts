import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({
  name: 'SESSION_CHAT',
})
export class SessionChatEntity extends BaseEntity {
  @Column({
    type: 'text',
    nullable: false,
  })
  sender: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  receiver: string;
}
