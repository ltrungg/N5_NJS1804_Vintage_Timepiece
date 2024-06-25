import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SellService } from './sell.service';
import { CreateSellDto } from '../../dto/sell.dto';
import { Multer } from 'multer';

@Controller('sell')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  @Post('information')
  async create(@Body() createSellDto: CreateSellDto) {
    return this.sellService.create(createSellDto);
  }

  @Post('uploadImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Multer.File) {
    return { imagePath: file.path };
  }
}
