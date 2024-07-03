import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppraisalReportEntity } from 'src/entities/appraisal-report.entity';
import { AppraisalReportService } from './appraisalReport.service';
import { AppraisalReportController } from './appraisalReport.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppraisalReportEntity])],
  providers: [AppraisalReportService],
  controllers: [AppraisalReportController],
})
export class AppraisalReportModule {}
