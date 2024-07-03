import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { AppraisalReportService } from './appraisalReport.service';
import { AppraisalReportEntity } from 'src/entities/appraisal-report.entity';

@Controller('appraisal-reports')
export class AppraisalReportController {
  constructor(private readonly appraisalReportService: AppraisalReportService) {}

  @Post()
  async createReport(@Body() report: Partial<AppraisalReportEntity>): Promise<AppraisalReportEntity> {
    return this.appraisalReportService.createReport(report);
  }

  @Get()
  async findAll(): Promise<AppraisalReportEntity[]> {
    return this.appraisalReportService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AppraisalReportEntity> {
    return this.appraisalReportService.findById(id);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() { status }: { status: boolean }): Promise<AppraisalReportEntity> {
    return this.appraisalReportService.updateStatus(id, status);
  }
}
