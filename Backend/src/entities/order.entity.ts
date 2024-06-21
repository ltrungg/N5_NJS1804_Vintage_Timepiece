import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { VoucherEntity } from './voucher.entity';
import { AccountEntity } from './account.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_DELIVERY = 'IN DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED',
}
@Entity({
  name: 'ORDER',
})
export class OrderEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.id)
  user: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 8,
    unique: true,
    nullable: false,
  })
  code: string; //Code 8 kí tự generate bên frontend

  @Column({
    name: 'total',
    type: 'float',
    nullable: false,
  })
  total: number;

  @Column({
    name: 'contact',
    type: 'simple-json',
    nullable: false,
  })
  contact: {
    email: '';
    phone: '';
  };

  @Column({
    name: 'purchaseMethod',
    type: 'varchar',
    nullable: false,
    default: 'offline',
  })
  purchaseMethod: string;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: false,
    default: '',
  })
  address: string;

  @ManyToOne(() => VoucherEntity, (voucher) => voucher.id)
  voucher: string;

  @Column({
    name: 'paidStatus',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  paidStatus: boolean;

  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string;
}
