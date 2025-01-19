import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  @ApiOperation({summary: 'Get all categories'})
  @ApiResponse({status: 200, example: [
    {
      "id": "ae19d9fb-5124-4583-b6d2-9194c2e86f54",
      "name": "smartphone"
    },
    {
      "id": "99a71c3c-b6cf-41c5-ab67-82b049c7dc47",
      "name": "monitor"
    },
    {
      "id": "29f31885-565a-45a1-a691-1888298770d4",
      "name": "keyboard"
    },
    {
      "id": "466719e6-8284-4142-802c-77da26f9cac4",
      "name": "mouse"
    }
  ]})
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
