import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/entities/order-item.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}
  async findAll(): Promise<OrderItemEntity[]> {
    return this.orderItemRepository.find();
  }

  async findOne(id: string): Promise<any | null> {
    return this.orderItemRepository.findOne({
      where: { id },
    });
  }

  async findByOrder(orderId: string): Promise<any | null> {
    return this.orderItemRepository.find({
      relations: ['order', 'order.user', 'product'],
      where: {
        order: {
          id: orderId,
        },
      },
    });
  }

  async createOrderItem(orderItem: any): Promise<any> {
    return this.orderItemRepository.save(orderItem);
  }
}
