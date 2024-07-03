import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/entities/order-item.entity';
import { OrderItemService } from './orderItem.service';
import { OrderItemController } from './orderItem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity])],
  exports: [TypeOrmModule],
  providers: [OrderItemService],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
