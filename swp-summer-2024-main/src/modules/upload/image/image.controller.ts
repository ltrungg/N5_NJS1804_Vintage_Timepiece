import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  FileInterceptor,
  MemoryStorageFile,
  UploadedFile,
} from '@blazity/nest-file-fastify';
import { FastifyReply } from 'fastify';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.FILE_PATH_STORAGE;
const api_key = process.env.API_KEY;

@ApiTags('file')
@Controller('file')
export class ImageController {
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MemoryStorageFile) {
    try {
      const fileBlob = new Blob([file.buffer], { type: file.mimetype });
      const dataForm = new FormData();
      dataForm.append('file', fileBlob);
      const response = await fetch(url + 'image/upload', {
        method: 'POST',
        headers: {
          'Api-Key': api_key,
        },
        body: dataForm,
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new HttpException('Network response was not ok', 404);
    }
  }
  // get image to show

  @Get('image/:path')
  async showFile(@Param('path') path: string, @Res() res: FastifyReply) {
    try {
      const response = await fetch(url + 'image/' + path, {
        method: 'GET',
        headers: {
          'Api-Key': api_key,
        },
      });
      const buffer = await response.arrayBuffer();
      const image = Buffer.from(buffer);
      res.header('Content-Type', 'image/png');
      res.send(image);
    } catch (error) {
      throw new HttpException('Network response was not ok', 404);
    }
  }
}
