// report.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from 'src/entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>,
  ) {}
  zz;

  async createReport(report: any): Promise<ReportEntity> {
    return this.reportRepository.save(report);
  }

  async findAllReports(): Promise<ReportEntity[]> {
    return await this.reportRepository.find({ relations: ['account'] });
  }

  async getAllProductReports(): Promise<ReportEntity[]> {
    return await this.reportRepository.find({
      where: {
        on: 'product',
      },
      relations: ['account'],
    });
  }

  async getAllUserReports(): Promise<ReportEntity[]> {
    return await this.reportRepository.find({
      where: {
        on: 'user',
      },
      relations: ['account'],
    });
  }

  async checkAlreadyReported(
    userId: string,
    reportedId: string,
  ): Promise<boolean> {
    const found = await this.reportRepository.findOne({
      where: {
        account: {
          id: userId,
        },
        reportedId: reportedId,
      },
    });
    if (found) return true;
    else return false;
  }

  async findReportById(id: string): Promise<ReportEntity> {
    return await this.reportRepository.findOne({
      where: { id },
      relations: ['account'],
    });
  }

  async updateReport(id: string, update: any): Promise<any> {
    return this.reportRepository.update(id, update);
  }
}
