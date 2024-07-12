import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppraisalReportEntity } from 'src/entities/appraisal-report.entity';

@Injectable()
export class AppraisalReportService {
  constructor(
    @InjectRepository(AppraisalReportEntity)
    private appraisalReportRepository: Repository<AppraisalReportEntity>,
  ) {}

  async createReport(report: Partial<AppraisalReportEntity>): Promise<AppraisalReportEntity> {
    const newReport = this.appraisalReportRepository.create(report);
    return this.appraisalReportRepository.save(newReport);
  }

  async findAll(): Promise<AppraisalReportEntity[]> {
    return this.appraisalReportRepository.find({ relations: ['appraiser', 'product'] });
  }

  async findById(id: string): Promise<AppraisalReportEntity> {
    return this.appraisalReportRepository.findOneOrFail({
      where: { id },
      relations: ['appraiser', 'product'],
    });
  }

  async updateStatus(id: string, status: string, note?: string, startingPrice?: number): Promise<AppraisalReportEntity> {
    const report = await this.findById(id);
    report.appraisalResult = status;
    report.note = note || null;
    report.status = status === 'APPROVED' ? true : false;
    return this.appraisalReportRepository.save(report);
  }
}
