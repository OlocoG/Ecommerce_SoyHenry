import { Injectable, NotFoundException } from '@nestjs/common';
import { FileManagementRepository } from './file-management.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { Repository } from 'typeorm';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class FileManagementService {
    constructor(private fileManagementRepository: FileManagementRepository,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
    ) {}
    async uploadProductImage(file: Express.Multer.File, product_id: string) {
        const product = await this.productsRepository.findOne({where: {id: product_id}});
        if(!product) throw new NotFoundException(`El producto con el id ${product_id} no existe`);

        const uploadImage: UploadApiResponse = await this.fileManagementRepository.uploadProductImage(file) as UploadApiResponse;
        await this.productsRepository.update({id: product_id}, {imgUrl: uploadImage.secure_url});
        return await this.productsRepository.findOne({where: {id: product_id}});
    }
}
