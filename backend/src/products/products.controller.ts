import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ProductDto } from "src/database/dto/product.dto";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor ( private productService: ProductsService) {}

    @Get()
    async getAll(@Query('page') page: number) {
        return this.productService.getAll(page)
    }

    @Get(':name')
    async get(@Param('name') params: string) {
        return this.productService.get(params)
    }
    
    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    async create(@Body() dto: ProductDto, @UploadedFiles() file: any) {
        return this.productService.create(dto, file)
    }

    @Post('delete/:id')
    async delete(@Param('id') params: string) {
        return this.productService.delete(params)
    }
    
}