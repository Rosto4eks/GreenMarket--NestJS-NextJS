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

    @Get('search')
    async getByName(@Query('products') name: string) {
        return this.productService.search(name)
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.productService.getById(id)
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

    @Post('count')
    async getCount() {
        return this.productService.getCount()
    }
    
}