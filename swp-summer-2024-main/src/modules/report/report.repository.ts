// report.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from 'src/entities/report.entity';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepo: Repository<ReportEntity>,
  ) {}

  async findById(id: string): Promise<ReportEntity> {
    return this.reportRepo.findOne({ where: { id } });
  }
}
