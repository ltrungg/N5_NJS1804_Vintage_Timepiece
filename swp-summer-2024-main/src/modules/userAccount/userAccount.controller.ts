import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { AccountService } from './userAccount.service';
import { AccountEntity } from 'src/entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Post()
  createAccount(
    @Body()
    account: Partial<AccountEntity>,
  ) {
    return this.accountService.createAccount(account);
  }

  @Patch(':id')
  updateAccount(
    @Param('id') id: string,
    @Body()
    update: Partial<AccountEntity>,
  ) {
    return this.accountService.updateAccount(id, update);
  }

  @Delete(':id')
  deleteAccount(@Param('id') id: string) {
    return this.accountService.deleteAccount(id);
  }
}
