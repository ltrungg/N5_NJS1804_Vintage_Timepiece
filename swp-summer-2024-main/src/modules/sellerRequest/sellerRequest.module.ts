import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRequestEntity } from 'src/entities/sellerRequest.entity';
import { SellerRequestService } from './sellerRequest.service';
import { SellerRequestController } from './sellerRequest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SellerRequestEntity])],
  exports: [TypeOrmModule],
  providers: [SellerRequestService],
  controllers: [SellerRequestController],
})
export class SellerRequestModule {}
