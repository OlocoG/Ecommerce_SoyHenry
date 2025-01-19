import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { OrderDetails } from 'src/Entities/orderdetails.entity';
import { Users } from 'src/Entities/users.entity';
import { Orders } from 'src/Entities/orders.entity';

@Module({
  imports : [TypeOrmModule.forFeature([OrderDetails]),
  TypeOrmModule.forFeature([Orders]),
  TypeOrmModule.forFeature([Users]), 
  TypeOrmModule.forFeature([Products])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
