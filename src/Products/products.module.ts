import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { Categories } from 'src/Entities/categories.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Products]),
   TypeOrmModule.forFeature([Categories])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
