import {
  Controller,
  Get,
  Param,
  Render,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export enum ProductStatus {
  IN_APPRAISAL = 'IN APPRAISAL',
  AVAILABLE = 'AVAILABLE',
  ORDERED = 'ORDERED',
  SOLD = 'SOLD',
}
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  findAll() {
    return this.productService.findAll();
  }

  @Get('available')
  findAllAvailable() {
    return this.productService.findAllAvailable();
  }

  @Get('latest')
  findLatest() {
    return this.productService.findLatest();
  }

  @Get('featured')
  getFeaturedList() {
    return this.productService.getFeaturedList();
  }

  @Get('buy')
  // @Render('buy/buy')
  async getBuy() {
    const products = await this.productService.findAll();
    return { products };
  }

  @Get('withRelated/:id')
  //56c06978-b984-44f9-aff6-ee03a0da0787
  findWithRelatedProducts(@Param('id') id: string) {
    return this.productService.findOneWithRelated(id);
  }

  @Get('related/:id')
  //56c06978-b984-44f9-aff6-ee03a0da0787
  findRelatedProducts(@Param('id') id: string) {
    return this.productService.findRelatedProducts(id);
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  async createProduct(
    @Body()
    product: {
      owner: UUID;
      name: string;
      brand: string;
      price: number;
      description: string;
      type: string;
      image: string;
      dialColor: string;
      box: boolean;
      papers: boolean;
      waterResistance: number;
      caseMaterial: string;
      caseSize: number;
      pastUsageTime: string;
      yearOfProduction: string;
      remainingInsurance: string;
      status: ProductStatus;
    },
  ) {
    const result = this.productService.createProduct(product);
    if (result) {
      return result;
    } else {
      return { message: 'Failed to create new product' };
    }
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body()
    update: {
      owner: UUID;
      name: string;
      brand: string;
      price: number;
      description: string;
      type: string;
      image: string;
      dialColor: string;
      box: boolean;
      papers: boolean;
      waterResistance: number;
      caseMaterial: string;
      caseSize: number;
      pastUsageTime: string;
      yearOfProduction: string;
      remainingInsurance: string;
      status: ProductStatus;
    },
  ) {
    const result = this.productService.updateProduct(id, update);
    return result
      ? result
      : {
          message: 'Failed to update product ',
        };
  }
}
