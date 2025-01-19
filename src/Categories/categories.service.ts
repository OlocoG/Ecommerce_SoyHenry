import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/categories.entity';
import { Repository } from 'typeorm';
import * as seed from '../seed.json';
@Injectable()
export class CategoriesService implements OnModuleInit {
    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>) { }
    async onModuleInit()  {
        // Extraemos y filtramos categorías únicas desde el archivo seed
        const uniqueCategories = Array.from(new Set(seed.map(product => product.category)));
        
        for (const categoryName of uniqueCategories) {
            // Verificamos si la categoría ya existe en la base de datos
            const existingCategory = await this.categoriesRepository.findOne({
                where: { name: categoryName },
            });
            if (!existingCategory) {
                await this.categoriesRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Categories)
                    .values({ name: categoryName })
                    .execute();
            }
        }

        return 'Categories added';
    }
    async getCategories() {
        const categories = await this.categoriesRepository.find();
        if (!categories) throw new NotFoundException('No se encontraron categorías');
        return categories;
    }
}
