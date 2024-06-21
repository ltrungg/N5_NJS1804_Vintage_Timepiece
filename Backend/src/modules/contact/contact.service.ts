import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from 'src/entities/contactreport.etity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
    constructor(
    @InjectRepository(ContactEntity)
    private contactRepository : Repository<ContactEntity>,
    ){}

    async getReport(): Promise<any | null>{
        return await this.contactRepository.find(
            {
                select: ["name", "email","message"],
            }
        );
    }
}
