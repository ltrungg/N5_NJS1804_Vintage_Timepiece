import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({
  name: 'REPORT',
})
export class ReportEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account)
  account: AccountEntity;

  @Column({
    name: 'on',
    type: 'enum',
    enum: ['user', 'product'],
    nullable: false,
  })
  on: string;

  @Column({
    name: 'reportedId',
    type: 'varchar',
    nullable: false,
  })
  reportedId: string;

  @Column({
    name: 'criteria',
    type: 'simple-array',
    default: [],
  })
  criteria: string[];

  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string;
}
