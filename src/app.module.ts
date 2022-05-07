import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { ServerModule } from './server/server.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    UsersModule,
    ServerModule
  ]
})
export class AppModule {}
