import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductDto } from "src/database/dto/product.dto";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor ( private productService: ProductsService) {}

    @Get()
    async getAll() {
        return this.productService.getAll()
    }

    @Get(':name')
    async get(@Param('name') params: string) {
        return this.productService.get(params.slice(1))
    }
    
    @Post('create')
    async create(@Body() dto: ProductDto) {
        return this.productService.create(dto)
    }

    @Post('delete:id')
    async delete(@Param('id') params: string) {
        return this.productService.delete(params.slice(1))
    }
    
}