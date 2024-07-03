import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  exports: [TypeOrmModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}