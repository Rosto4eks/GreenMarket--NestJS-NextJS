import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductDto } from "src/database/dto/product.dto";
import { ProductsService } from "./products.service";

@Controller('/')
export class ProductsController {

    constructor ( private productService: ProductsService) {}

    @Get()
    async getAll() {
        return this.productService.getAll()
    }

    @Get(':productId')
    async get(@Param('productId') params) {
       return this.productService.get(params.slice(1))
    }
    
    @Post('/create')
    async create(@Body() dto: ProductDto) {
        return this.productService.create(dto)
    }

    @Post('/delete:productId')
    async delete(@Param('productId') params) {
        return this.productService.delete(params.slice(1))
    }
}