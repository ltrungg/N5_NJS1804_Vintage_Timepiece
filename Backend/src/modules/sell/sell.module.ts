import { Module } from '@nestjs/common';
import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { SellEntity } from 'src/entities/sell.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([SellEntity])],
    exports: [TypeOrmModule],
    controllers: [SellController],
    providers: [SellService],
})
export class SellModule {}