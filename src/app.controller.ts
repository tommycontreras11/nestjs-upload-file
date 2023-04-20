import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        storage: diskStorage({
          destination: './uploads',
          filename: function(req, file, cb) {
            cb(null, file.originalname)
          }
        })
      }
    )
  )
  @Post('fileUpload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      msg: `The file ${file.filename} has been uploaded successfully`
    };
  }
}
