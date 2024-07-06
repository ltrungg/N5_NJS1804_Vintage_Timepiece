import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './userAccount.controller';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountService } from './userAccount.service';
import { AccountRepository } from './account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
})
export class AccountModule {}
