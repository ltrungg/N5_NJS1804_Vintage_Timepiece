import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(
    private accountRepository: AccountRepository,
  ) {}

  async findAll(): Promise<AccountEntity[]> {
    return await this.accountRepository.findAll();
  }

  async findOne(id: string): Promise<AccountEntity | null> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async createAccount(account: Partial<AccountEntity>): Promise<AccountEntity> {
    return this.accountRepository.create(account);
  }

  async updateAccount(id: string, update: Partial<AccountEntity>): Promise<any> {
    return this.accountRepository.update(id, update);
  }

  async deleteAccount(id: string): Promise<void> {
    return this.accountRepository.delete(id);
  }
}
