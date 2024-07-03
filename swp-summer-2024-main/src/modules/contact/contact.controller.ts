import { Body, Controller,Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from 'src/dto/contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService : ContactService){}
    @Post('report')
    async create(@Body() contactDto:ContactDto){
        return this.contactService.create(contactDto);
    }

    
}
