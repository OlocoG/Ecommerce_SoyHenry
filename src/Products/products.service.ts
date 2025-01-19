import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { Categories } from 'src/Entities/categories.entity';
import { Repository } from 'typeorm';
import * as seed from '../seed.json';
@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(@InjectRepository(Products) private productsRepository: Repository<Products>,
    @InjectRepository(Categories) private categoriesRepository: Repository<Categories>,
  ) {}
  async onModuleInit() {
    seed?.map(async (element) => {
      const categories = await this.categoriesRepository.find({
        where: { name: element.category }
      })
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.categories_id = categories[0];
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
        .execute();
    });
    return 'Products added';
  }
  async getProducts(page: number, limit: number) {
    const products = await this.productsRepository.find();
    if (!products) throw new NotFoundException('No se encontraron productos');
    const start = (page - 1) * limit;
    const end = start + limit;
    return products.slice(start, end);
  }
  async createProduct(product: Partial<Products>) {
    const newproduct = await this.productsRepository.create(product);
    if (!newproduct) throw new BadRequestException('No se pudo crear el producto');
    await this.productsRepository.save(newproduct);
    return newproduct;
  }
  async deleteProduct(id: string) {
    const product = await this.productsRepository.delete(id);
    if (!product) throw new NotFoundException(`El producto con el id ${id} no existe`);
    return `El producto con el id ${id} ha sido eliminado`;
  }
  async updateProduct(id: string, product: Partial<Products>) {
    const productFound = await this.productsRepository.findOne({ where: { id } });
    if (!productFound) throw new NotFoundException(`El producto con el id ${id} no existe`);
    await this.productsRepository.update(id, product);
    return  `El producto con el id ${id} ha sido actualizado`;
  }
  async getProductById(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`El producto con el id ${id} no existe`);
    return product;
  }
  
}
