import { Module } from '@nestjs/common';
import { FileManagementService } from './file-management.service';
import { FileManagementController } from './file-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { cloudinaryConfig } from 'src/config/cloudinary.config';
import { FileManagementRepository } from './file-management.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileManagementController],
  providers: [FileManagementService, cloudinaryConfig, FileManagementRepository],
})
export class FileManagementModule {}
