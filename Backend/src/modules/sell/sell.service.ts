import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellEntity } from '../../entities/sell.entity';
import { CreateSellDto } from '../../dto/sell.dto';

@Injectable()
export class SellService {
  constructor(
    @InjectRepository(SellEntity)
    private sellRepository: Repository<SellEntity>,
  ) {}

  async create(createSellDto: CreateSellDto): Promise<SellEntity> {
    const sell = this.sellRepository.create(createSellDto);
    return this.sellRepository.save(sell);
  }

  findAll(): Promise<SellEntity[]> {
    return this.sellRepository.find();
  }

  findOne(id: number): Promise<SellEntity> {
    return this.sellRepository.findOne({ where: { id: String(id) } });
  }
}
