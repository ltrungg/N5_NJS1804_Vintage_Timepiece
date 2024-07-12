import { Controller, Get, Post, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppraisalReportService } from './appraisalReport.service';
import { AppraisalReportEntity } from 'src/entities/appraisal-report.entity';

@Controller('appraisal-reports')
export class AppraisalReportController {
  constructor(private readonly appraisalReportService: AppraisalReportService) {}

  @Post()
async createReport(@Body() report: Partial<AppraisalReportEntity>) {
  try {
    const result = await this.appraisalReportService.createReport(report);
    return { message: 'Appraisal report created successfully', result };
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
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
  async updateStatus(
    @Param('id') id: string,
    @Body() { status, note }: { status: string; note?: string },
  ): Promise<AppraisalReportEntity> {
    return this.appraisalReportService.updateStatus(id, status, note);
  }

  
}
