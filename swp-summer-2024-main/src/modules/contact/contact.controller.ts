import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactUsEntity } from 'src/entities/contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createFeedback(
    @Body()
    contact: ContactUsEntity,
  ): Promise<ContactUsEntity> {
    return this.contactService.create(contact);
  }

  @Get()
  async findAll(): Promise<ContactUsEntity[]> {
    return this.contactService.findAll();
  }
}
