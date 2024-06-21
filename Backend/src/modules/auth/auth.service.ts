import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AccountEntity, Role } from '../../entities/account.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AccountEntity)
    private readonly repositoryAccount: Repository<AccountEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async register(data: any): Promise<any> {
    var account = await this.repositoryAccount.findOne({
      where: { email: data.email },
    });
    if (account)
      throw new HttpException(
        'Email has already existed',
        HttpStatus.BAD_REQUEST,
      );
    data.password = await this.hashPassword(data.password);
    var result = await this.repositoryAccount.save(data);
    result.password = undefined;
    return result;
  }

  async login(email: string, password: string): Promise<any> {
    var account = await this.repositoryAccount.findOne({
      where: { email: email },
    });
    if (!account)
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    if (
      !bcrypt.compareSync(password, account.password) ||
      account.deletedAt != null
    )
      throw new HttpException(
        'Account info is not valid',
        HttpStatus.BAD_REQUEST,
      );
    return this.generateToken({
      id: account.id,
      username: account.username,
      email: account.email,
      phone: account.phone,
      role: account.role,
    });
  }

  async generateToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<boolean> {
    if (!token) {
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    }
    const decodedToken = await this.decodeToken(token);
    if (decodedToken.email && decodedToken.exp < Date.now()) {
      var account = await this.repositoryAccount.findOne({
        where: { email: decodedToken.email },
      });
      if (account.email === decodedToken.email && account.deletedAt == null) {
        return true;
      }
    }
  }

  async verifyUserToken(token: string): Promise<boolean> {
    if (!token)
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    const decodedToken = await this.decodeToken(token);
    if (decodedToken.email && decodedToken.exp < Date.now()) {
      var account = await this.repositoryAccount.findOne({
        where: { email: decodedToken.email },
      });
      if (
        account.email === decodedToken.email &&
        account.role === 'user' &&
        account.deletedAt == null
      )
        return true;
    }
    return false;
  }

  async verifyStaffToken(token: string): Promise<boolean> {
    if (!token)
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    const decodedToken = await this.decodeToken(token);
    if (decodedToken.email && decodedToken.exp < Date.now()) {
      var account = await this.repositoryAccount.findOne({
        where: { email: decodedToken.email },
      });
      if (
        account.email === decodedToken.email &&
        account.role === 'staff' &&
        account.deletedAt == null
      )
        return true;
    }
    return false;
  }

  async verifyAdminToken(token: string): Promise<boolean> {
    if (!token)
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    const decodedToken = await this.decodeToken(token);
    if (decodedToken.email && decodedToken.exp < Date.now()) {
      var account = await this.repositoryAccount.findOne({
        where: { email: decodedToken.email },
      });
      if (
        account.email === decodedToken.email &&
        account.role === 'admin' &&
        account.deletedAt == null
      )
        return true;
    }
    return false;
  }

  async decodeToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }
  // ! features for admin
  async getAllAccounts(): Promise<any> {
    // get all accounts without password
    return this.repositoryAccount.find({
      select: [
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'username',
        'email',
        'phone',
        'role',
        'avatar',
      ],
    });
  }

  async getAccountByEmail(email: string): Promise<any> {
    const found = await this.repositoryAccount.findOne({
      where: { email: email },
      select: [
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'username',
        'email',
        'phone',
        'role',
        'avatar',
      ],
    });
    if (found) return found;
    else throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
  }

  async softDeleteAccount(id: string): Promise<any> {
    // block admin account to delete another admin account
    var account = await this.repositoryAccount.findOne({ where: { id: id } });
    if (!account)
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    if (account?.role === 'admin') {
      throw new HttpException(
        "Admin account can't delete another admin account",
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repositoryAccount.update(id, { deletedAt: new Date() });
  }

  async undoDeleteAccount(id: string): Promise<any> {
    return await this.repositoryAccount.update(id, { deletedAt: null });
  }
}
