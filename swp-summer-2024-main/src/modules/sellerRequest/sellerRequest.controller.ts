import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { SellerRequestService } from './sellerRequest.service';

export enum ProductStatus {
  IN_APPRAISAL = 'IN APPRAISAL',
  AVAILABLE = 'AVAILABLE',
  ORDERED = 'ORDERED',
  SOLD = 'SOLD',
}
@Controller('sellerRequest')
export class SellerRequestController {
  constructor(private readonly sellerRequestService: SellerRequestService) {}

  @Get()
  findAll() {
    return this.sellerRequestService.findAll();
  }

  @Get('seller')
  getAllSellerRequest() {
    return this.sellerRequestService.getAllSellerRequest();
  }

  @Get('appraiser')
  getAllAppraiserRequest() {
    return this.sellerRequestService.getAllAppraiserRequest();
  }

  @Get('pending')
  getAllPending() {
    return this.sellerRequestService.getAllPending();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerRequestService.findOne(id);
  }

  @Post()
  createSellerRequest(
    @Body()
    data: {
      account: UUID;
      product: UUID;
      type: string;
      update: Object;
      details: string;
      status?: boolean;
    },
  ) {
    return this.sellerRequestService.createSellerRequest(data);
  }

  @Patch(':id')
  updateSellerRequest(@Param('id') id: string, @Body() data: any) {
    return this.sellerRequestService.updateRequest(id, data);
  }
}
