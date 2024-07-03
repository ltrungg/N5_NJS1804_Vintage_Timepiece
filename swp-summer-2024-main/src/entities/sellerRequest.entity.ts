import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
import { AccountEntity } from './account.entity';

@Entity({
  name: 'SELLER_REQUEST',
})
export class SellerRequestEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.sellerRequests)
  account: AccountEntity;

  @ManyToOne(() => ProductEntity, (product) => product.sellerRequests)
  product: ProductEntity;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ['create', 'update', 'delete'],
    nullable: false,
  })
  type: string;

  @Column({
    name: 'update',
    type: 'simple-json',
    nullable: true,
  })
  update: Object;

  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string;

  @Column({
    name: 'status',
    type: 'bool',
    nullable: false,
    default: false,
  })
  status: boolean;
}
