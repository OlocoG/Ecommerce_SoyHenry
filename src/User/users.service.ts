import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
   constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}
  
  async getUsers(page: number, limit: number) {
    const users =  await this.userRepository.find();
    if(!users) throw new NotFoundException('No se encontraron usuarios');
    const start = (page - 1) * limit;
    const end = start + limit;
    return users.slice(start, end);
  }
  async getUserById(id: string) {
    const user = await this.userRepository.findOne({where: {id}});
    if(!user) throw new NotFoundException(`El usuario con el id ${id} no existe`);
    return user;
  }
  
  async updateUser(id: string, user: Partial<Users>) {
    const userFound = await this.userRepository.findOne({where: {id}});
    if(!userFound) throw new NotFoundException(`El usuario con el id ${id} no existe`);
    await this.userRepository.update(id, user);
    return `El usuario con el id ${id} ha sido actualizado`;
  }
  async deleteUser(id: string) {
    const foundUser = await this.userRepository.findOne({where: {id}});
    if(!foundUser) throw new NotFoundException(`El usuario con el id ${id} no existe`);
     await this.userRepository.delete(id);
     return `El usuario con el id ${id} ha sido eliminado`;
  } 
  } 

