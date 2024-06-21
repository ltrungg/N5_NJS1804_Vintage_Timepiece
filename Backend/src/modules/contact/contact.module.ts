import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from 'src/entities/contactreport.etity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ContactEntity])],
    exports: [TypeOrmModule],
    providers: [ContactService],
    controllers: [ContactController],
})

export class ContactModule {}
