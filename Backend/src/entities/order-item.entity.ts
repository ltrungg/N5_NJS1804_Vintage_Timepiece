import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'ORDER_ITEM',
})
export class OrderItemEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, (order) => order.id)
  order: string;

  @OneToOne(() => ProductEntity, (product) => product.id)
  product: string;
  
  @Column({
    name: 'price',
    type: 'float',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string;
}
