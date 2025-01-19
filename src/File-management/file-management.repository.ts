import { Injectable } from "@nestjs/common";
import {v2 as cloudinary, UploadApiResponse} from 'cloudinary';
import toStream = require ('buffer-to-stream');
@Injectable()
export class FileManagementRepository {
    async uploadProductImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise(async (resolve, reject) => {
            const uploadImage = await cloudinary.uploader.upload_stream({resource_type: 'auto'}, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            toStream(file.buffer).pipe(uploadImage);
        });
    }
}