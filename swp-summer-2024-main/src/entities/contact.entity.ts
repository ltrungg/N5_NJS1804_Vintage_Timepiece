import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({
  name: 'CONTACT_US',
})
export class ContactUsEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.contactReports)
  owner: AccountEntity;

  @Column({
    name: 'Name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'Email',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'Phone',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'Message',
    type: 'text',
    nullable: false,
  })
  message: string;
}
