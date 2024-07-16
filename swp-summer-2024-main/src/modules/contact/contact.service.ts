import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactUsEntity } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactUsEntity)
    private contactRepository: Repository<ContactUsEntity>,
  ) {}

  async create(contact: ContactUsEntity): Promise<ContactUsEntity> {
    const newContact = this.contactRepository.create(contact);
    return this.contactRepository.save(newContact);
  }

  async findAll(): Promise<ContactUsEntity[]> {
    return this.contactRepository.find();
  }
}
