import { Controller,Get } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService : ContactService){}
    @Get('report')
    getReport(){
        return this.contactService.getReport();
    }
}
