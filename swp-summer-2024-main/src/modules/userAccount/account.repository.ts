import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../entities/account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepo: Repository<AccountEntity>,
  ) {}

  async findById(id: string): Promise<AccountEntity> {
    return this.accountRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<AccountEntity[]> {
    return this.accountRepo.find();
  }

  async create(account: Partial<AccountEntity>): Promise<AccountEntity> {
    const newAccount = this.accountRepo.create(account);
    return this.accountRepo.save(newAccount);
  }

  async update(id: string, update: Partial<AccountEntity>): Promise<any> {
    return this.accountRepo.update(id, update);
  }

  async delete(id: string): Promise<void> {
    await this.accountRepo.delete(id);
  }
}
