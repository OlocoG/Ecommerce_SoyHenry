import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RegisterProductDto, updateProductDto } from 'src/Dto/products.dto';
import { AuthGuard } from 'src/Auth/Guards/auth.guard';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'role.enum';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @ApiQuery({name: 'page', required:  false, description: 'The page number por pagination(default is 1)', type: Number, default: 1})
  @ApiQuery({name: 'limit', required:  false, description: 'The maxium number of products for page(default is 5)', type: Number, default: 5})
  @ApiOperation({summary: 'Get all products'})
  getProducts(@Query ('page') page: number, @Query ('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(+page, +limit);
    }
    return this.productsService.getProducts(1, 5);
  }
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Add a Product'})
  createProduct(@Body() product: RegisterProductDto) {
    return this.productsService.createProduct(product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Delete a product by id'})
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Update a product information'})
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() product: updateProductDto) {
    return this.productsService.updateProduct(id, product);
  }
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get a product by id'})
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }
}
