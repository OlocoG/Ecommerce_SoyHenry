import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/Auth/Guards/auth.guard';
import { CreateUserDto, UpdateUserDto } from 'src/Dto/users.dto';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'role.enum';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from 'src/Auth/Guards/roles.guard';
@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiQuery({name: 'page', required:  false, description: 'The page number por pagination(default is 1)', type: Number, default: 1})
  @ApiQuery({name: 'limit', required:  false, description: 'The maxium number of users for page(default is 5)', type: Number, default: 5})
  @ApiOperation({summary: 'Get all users'})
  getUser(@Query ('page') page: number, @Query ('limit') limit: number) {
    if (page && limit) {
      return this.UserService.getUsers(+page, +limit);
    }
    return this.UserService.getUsers(1, 5);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete a user by id'})
  @ApiParam({name: 'user_id', description: 'The unique identifier of a user', type: String})
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.UserService.deleteUser(id);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Update a user information'})
  @ApiParam({name: 'user_id', description: 'The unique identifier of a user', type: String})
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto) {
    return this.UserService.updateUser(id, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get a user by id'})
  @ApiParam({name: 'user_id', description: 'The unique identifier of a user', type: String})
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.UserService.getUserById(id);
  } 
}
