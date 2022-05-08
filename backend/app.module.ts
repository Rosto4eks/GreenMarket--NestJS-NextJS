import { Module } from '@nestjs/common';
import { DatabaseModule } from './src/database/database.module';
import { FileModule } from './src/file/file.module';
import { ProductsModule } from './src/products/products.module';
import { ServerModule } from './src/server/server.module';
import { UsersModule } from './src/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    FileModule,
    ProductsModule,
    UsersModule,
    ServerModule
  ]
})
export class AppModule {}
