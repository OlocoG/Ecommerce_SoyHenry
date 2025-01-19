import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/Dto/users.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
   @Post('signin')
   @ApiOperation({summary: 'Loggin with credentials'})
   @ApiResponse({status: 201, example: {"message": "Login correcto",
  "token": "UUID token"}})
  login(@Body() userCredentials: LoginUserDto) {
    if( userCredentials.email && userCredentials.password ){
      const {email, password} = userCredentials;
      return this.AuthService.loginUser(email, password);
    }
    return {message: 'Faltan datos'}
  } 
  @Post('signup')
  @ApiOperation({summary: 'Create a user'})
  @ApiResponse({status: 201, example: {
    "id": "85720f4a-ce18-421f-89ab-b0995c3235fe",
  "name": "Oloco",
  "email": "santillanfrancisco075@gmail.com",
  "phone": 3884630512,
  "country": "Cordoba",
  "address": "string",
  "city": "Cordoba"
  }})
  createUser(@Body() user: CreateUserDto) {
    const {confirmPassword, ...userWithoutConfirmPassword} = user;
    return this.AuthService.createUser(userWithoutConfirmPassword);
  }
}
