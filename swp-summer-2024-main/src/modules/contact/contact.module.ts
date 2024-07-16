import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUsEntity } from 'src/entities/contact.entity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ContactUsEntity])],
    exports: [TypeOrmModule],
    providers: [ContactService],
    controllers: [ContactController],
})

export class ContactModule {}
