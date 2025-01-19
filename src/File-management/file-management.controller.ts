import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileManagementService } from './file-management.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/Guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('files')
export class FileManagementController {
  constructor(private readonly fileManagementService: FileManagementService) {}
  @UseGuards(AuthGuard)
  @Post('uploadimage/:product_id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiOperation({summary: 'Update a product image'})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
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
  async uploadImage(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({maxSize: 200000, message: 'El archivo supera el tamaño permitido'}),
        new FileTypeValidator({fileType: /(jpeg|jpg|png|webp)$/})
      ],
    })
  ) file: Express.Multer.File, @Param('product_id', ParseUUIDPipe) product_id: string) {
    return this.fileManagementService.uploadProductImage(file, product_id);
  }
}
//agregar que se vea el archivo a subir 