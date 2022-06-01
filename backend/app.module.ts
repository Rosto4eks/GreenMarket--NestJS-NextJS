import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './src/database/database.module';
import { FileModule } from './src/file/file.module';
import { ProductsModule } from './src/products/products.module';
import { UsersModule } from './src/users/users.module';


@Module({
  imports: [
    DatabaseModule,
    FileModule,
    ProductsModule,
    UsersModule,
  ]
})
export class AppModule {}
