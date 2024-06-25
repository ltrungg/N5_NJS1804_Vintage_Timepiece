import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPE_ORM_CONFIG } from './config/orm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { StaffModule } from './modules/staff/staff.module';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/product/product.module';
import { ProvinceModule } from './modules/province/province.module';
import { ContactModule } from './modules/contact/contact.module';
import { ContactService } from './modules/contact/contact.service';
import { ContactController } from './modules/contact/contact.controller';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/orderItem/orderItem.module';
import { SellModule } from './modules/sell/sell.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(TYPE_ORM_CONFIG),
    ScheduleModule.forRoot(),
    AuthModule,
    AdminModule,
    ClientModule,
    StaffModule,
    ProductModule,
    ProvinceModule,
    ContactModule,
    OrderModule,
    OrderItemModule,
    SellModule
  ],
  providers: [ContactService],
  controllers: [ContactController],
})
export class AppModule {}
