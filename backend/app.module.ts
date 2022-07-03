import { Module } from '@nestjs/common';
import { DatabaseModule } from './src/database/database.module';
import { FileModule } from './src/file/file.module';
import { ProductsModule } from './src/products/products.module';
import { ProfileModule } from './src/profile/profile.module';


@Module({
  imports: [
    DatabaseModule,
    FileModule,
    ProductsModule,
    ProfileModule,
  ]
})
export class AppModule {}
