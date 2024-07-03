import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { OrderItemService } from './orderItem.service';
import { UUID } from 'crypto';

@Controller('orderItem')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get('order/:id')
  findByOrder(@Param('id') orderId: string) {
    return this.orderItemService.findByOrder(orderId);
  }

  @Post()
  createOrderItem(
    @Body()
    orderItem: {
      order: UUID;
      product: UUID;
      price: number;
      note: string;
    },
  ) {
    const result = this.orderItemService.createOrderItem(orderItem);
    return result
      ? result
      : {
          message: 'Failed to create new orderItem',
        };
  }
}
