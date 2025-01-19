import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from 'src/Dto/order.dto';
import { AuthGuard } from 'src/Auth/Guards/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Create a order'})
  createOrder(@Body() createOrder: createOrderDto) {
    const { user_id, products } = createOrder;
    return this.ordersService.createOrder(user_id, products);
  }
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id_order')
  @ApiOperation({summary: 'Get a order by id'})
  getOrder(@Param('id_order', ParseUUIDPipe) id_order: string) {
  return  this.ordersService.getOrder(id_order);
  }
}

