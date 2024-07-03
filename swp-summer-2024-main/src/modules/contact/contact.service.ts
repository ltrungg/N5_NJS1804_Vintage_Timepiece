import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDto } from 'src/dto/contact.dto';
import { ContactEntity } from 'src/entities/contactreport.etity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
    constructor(
    @InjectRepository(ContactEntity)
    private contactRepository : Repository<ContactEntity>,
    ){}

    async create(contactDto: ContactDto): Promise<ContactEntity> {
        const contact = this.contactRepository.create(contactDto);
        return this.contactRepository.save(contact);
      }
}
