import { Module } from '@nestjs/common';
import { UserModule } from './User/users.module';
import { AuthModule } from './Auth/auth.module';
import { ProductsModule } from './Products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { FileManagementModule } from './File-management/file-management.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CategoriesModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    AuthModule,
    OrdersModule,
    FileManagementModule],
})
export class AppModule { }
