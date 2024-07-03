// report.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from 'src/entities/report.entity';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
