import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { SellerRequestEntity } from 'src/entities/sellerRequest.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';

@Injectable()
export class SellerRequestService {
  constructor(
    @InjectRepository(SellerRequestEntity)
    private sellerRequestRepository: Repository<SellerRequestEntity>,
  ) {}
  async findAll(): Promise<SellerRequestEntity[]> {
    return this.sellerRequestRepository.find({
      relations: ['product', 'account'],
    });
  }

  async findOne(id: string): Promise<any | null> {
    const found = this.sellerRequestRepository.findOne({
      where: { id },
      relations: ['product', 'account'],
    });
    if (found) return found;
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async createSellerRequest(request: any): Promise<any> {
    return this.sellerRequestRepository.save(request);
  }

  async updateRequest(id: string, update: any): Promise<any> {
    return this.sellerRequestRepository.update(id, update);
  }
}
