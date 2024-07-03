import {
  Controller,
  Get,
  Param,
  Render,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_DELIVERY = 'IN DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED',
}

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Post()
  createOrder(
    @Body()
    order: {
      user: UUID;
      code: string;
      total: number;
      contact: {
        email: string;
        phone: string;
      };
      purchaseMethod: string;
      address: string;
      voucher: UUID;
      paidStatus: boolean;
      status: OrderStatus;
    },
  ) {
    const result = this.orderService.createOrder(order);
    return result
      ? result
      : {
          message: 'Failed to create new order',
        };
  }

  @Get('/user/:id')
  getOrdersByUser(@Param('id') userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }

  @Patch(':id')
  updateOrder(
    @Param('id') id: string,
    @Body()
    update: {
      user: UUID;
      code: string;
      total: number;
      contact: {
        email: string;
        phone: string;
      };
      purchaseMethod: string;
      address: string;
      voucher: string;
      paidStatus: boolean;
      status: OrderStatus;
      note: string;
    },
  ) {
    return this.orderService.updateOrder(id, update);
  }
}
