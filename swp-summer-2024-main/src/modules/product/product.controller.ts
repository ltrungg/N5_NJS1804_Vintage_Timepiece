import { Controller, Get, Param, Post, Body, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export enum ProductStatus {
  IN_APPRAISAL = 'IN APPRAISAL',
  AVAILABLE = 'AVAILABLE',
  UPDATE_REQUESTED = 'UPDATE_REQUESTED',
  SOLD = 'SOLD',
  CANCELED = 'CANCELED',
}
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  findAll() {
    return this.productService.findAll();
  }

  @Get('available/:id')
  findAllAvailable(@Param('id') userId: string) {
    return this.productService.findAllAvailable(userId);
  }

  @Get('latest')
  findLatest() {
    return this.productService.findLatest();
  }

  @Get('featured')
  getFeaturedList() {
    return this.productService.getFeaturedList();
  }

  @Get('brand')
  getBrandList() {
    return this.productService.getBrandList();
  }

  @Get('buy')
  // @Render('buy/buy')
  async getBuy() {
    const products = await this.productService.findAll();
    return { products };
  }

  @Get('/search/:key')
  getSearchList(@Param('key') key: string) {
    return this.productService.getSearchList(key);
  }

  @Get('user/:id')
  // @Render('buy/buy')
  getProductByUser(@Param('id') userId: string) {
    return this.productService.findByUser(userId);
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
      pastUsageTime: number;
      yearOfProduction: number;
      remainingInsurance: number;
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
      pastUsageTime: number;
      yearOfProduction: number;
      remainingInsurance: number;
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
