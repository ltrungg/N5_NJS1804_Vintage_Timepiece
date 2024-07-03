import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellRequest } from 'src/entities/sell-request.entity';
import { SellRequestController } from './sell-request.controller';
import { SellRequestService } from './sell-request.service';
import { AuthModule } from '../auth/auth.module'; // Assuming JwtService is provided in AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([SellRequest]),
    AuthModule, 
  ],
  controllers: [SellRequestController],
  providers: [SellRequestService],
})
export class SellRequestModule {}
