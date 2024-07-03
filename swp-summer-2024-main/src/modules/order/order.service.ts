import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}
  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  async findOne(id: string): Promise<any | null> {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  async getOrdersByUser(userId: string): Promise<any | null> {
    return this.orderRepository.find({
      relations: ['user'],
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        createdAt: -1
      }
    });
  }

  async createOrder(order: any): Promise<any> {
    return this.orderRepository.save(order);
  }

  async updateOrder(id: string, update: any): Promise<any> {
    return this.orderRepository.update(id, update);
  }
}
