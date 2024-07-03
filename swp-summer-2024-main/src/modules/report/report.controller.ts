// report.controller.ts
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ReportService } from './report.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  findAllReports() {
    return this.reportService.findAllReports();
  }

  @Get('product')
  getAllProductReports() {
    return this.reportService.getAllProductReports();
  }

  @Get('user')
  getAllUserReports() {
    return this.reportService.getAllUserReports();
  }

  @Get('check/:userId/:reportedId')
  checkAlreadyReported(
    @Param('userId') userId: string,
    @Param('reportedId') reportedId: string,
  ) {
    return this.reportService.checkAlreadyReported(userId, reportedId);
  }

  @Get(':id')
  findReportById(@Param('id') id: string) {
    return this.reportService.findReportById(id);
  }

  @Post()
  async createReport(
    @Body()
    report: {
      account: UUID;
      on: string;
      reportedId: string;
      criteria: string[];
      note?: string;
    },
  ) {
    const result = await this.reportService.createReport(report);
    if (result) {
      return result;
    } else {
      return { message: 'Failed to create new report' };
    }
  }

  @Patch(':id')
  async updateReport(
    @Param('id') id: string,
    @Body() update: { criteria?: string[]; note?: string },
  ) {
    const result = await this.reportService.updateReport(id, update);
    return result
      ? result
      : {
          message: 'Failed to update report',
        };
  }
}
