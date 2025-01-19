import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'role.enum';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>,
    private jwtService: JwtService) { }
  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException(`Credenciales incorrectas`);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new NotFoundException(`Credenciales incorrectas`);
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.isAdmin? [Role.ADMIN] : [Role.USER]
    }
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login correcto',
      token
    };
  }
  async createUser(user: Partial<Users>) {
    const userFound = await this.userRepository.findOne({ where: { email: user.email } });
    if (userFound) throw new BadRequestException(`El email ${user.email} ya existe`);

    const hashPassword = await bcrypt.hash(user.password, 10);
    const new_User = this.userRepository.create({ ...user, password: hashPassword });
    if (!new_User) throw new BadRequestException('No se pudo crear el usuario');

    const savedUser = await this.userRepository.save(new_User);
    const { password,isAdmin, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }


}
