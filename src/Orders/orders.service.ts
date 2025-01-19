import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/Entities/orders.entity';
import { Products } from 'src/Entities/products.entity';
import { Users } from 'src/Entities/users.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/Entities/orderdetails.entity';
@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Products) private productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
) {}
async createOrder( user_id: string, products: Products[]) {
  let total = 0;
  const user = await this.usersRepository.findOne({ where: { id: user_id } });
  if(!user) throw new NotFoundException(`El usuario con el id ${user_id} no existe`);
  const order = new Orders();
  order.date = new Date();
  order.user_id = user;
  const newOrder = await this.ordersRepository.save(order); 
  const productArray = await Promise.all(
    products.map(async (product: Products) => {
      const productExist = await this.productsRepository.findOne({
        where: {id: product.id}
      });
      if(!productExist) throw new NotFoundException(`El producto con el id ${product.id} no existe`);
      if( productExist.stock <= 0) throw new BadRequestException(`El producto con el id ${product.id} no tiene stock`);
      total += Number(productExist.price);
      await this.productsRepository.update({id: product.id}, { stock: productExist.stock - 1 });
      return productExist; 
  })
  )
  const orderDetail = new OrderDetails();
  orderDetail.price = Number(Number(total).toFixed(2));
  orderDetail.product = productArray;
  orderDetail.order = newOrder;
  await this.orderDetailsRepository.save(orderDetail);

  newOrder.orderdetails = orderDetail;
  await this.ordersRepository.save(newOrder);
  
  const orderView = await this.ordersRepository.findOne({
    where: { id: newOrder.id },
    relations: ['user_id', 'orderdetails'],
    select: {
      user_id: {
        id: true,
      },
    },
  });
  return orderView;
}

async getOrder(id_order: string) {
  // Buscar la orden con las relaciones necesarias
  console.log(id_order)
  const orderView = await this.ordersRepository.findOne({
    where: { id: id_order },
    relations: ['user_id', 'orderdetails', 'orderdetails.product'], // Incluye los productos
    select: {
      user_id: {
        id: true,
      },
    },
  });

  // Verificar si la orden existe
  if (!orderView) {
    throw new NotFoundException('Order not found');
  }

  // Transformar los datos para cumplir con el formato esperado
  const response = {
    id: orderView.id,
    date: orderView.date,
    user: {
      id: orderView.user_id.id,
      name: orderView.user_id.name,
      email: orderView.user_id.email,
      phone: orderView.user_id.phone,
      country: orderView.user_id.country,
      address: orderView.user_id.address,
      city: orderView.user_id.city,
      isAdmin: orderView.user_id.isAdmin,
    },
    orderDetails: {
      id: orderView.orderdetails.id,
      price: orderView.orderdetails.price,
      products: orderView.orderdetails.product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    },
  };

  return response;
}

}
