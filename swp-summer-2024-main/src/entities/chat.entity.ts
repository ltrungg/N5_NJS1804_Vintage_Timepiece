import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'CHAT',
})
export class ChatEntity extends BaseEntity {
  @Column({
    type: 'text',
    nullable: false,
  }) // id of sessionChat
  sessionChat: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  message: string;
}