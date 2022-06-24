import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../database/product.entity";
import { FileService } from "../file/file.service";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module( {
    imports: [TypeOrmModule.forFeature([Product])],
    exports: [TypeOrmModule],
    controllers: [ProductsController],
    providers: [ProductsService, FileService]
})

export class ProductsModule {}