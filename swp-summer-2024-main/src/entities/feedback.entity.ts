import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({
  name: 'FEEDBACK',
})
export class FeedbackEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.sentFeedbacks, {
    eager: true,
  })
  evaluator: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.receivedFeedbacks, {
    eager: true,
  })
  evaluated: AccountEntity;

  @Column({
    name: 'rating',
    type: 'int',
    nullable: false,
  })
  rating: number;

  @Column({
    name: 'comment',
    type: 'text',
    nullable: true,
  })
  comment: string;
}
