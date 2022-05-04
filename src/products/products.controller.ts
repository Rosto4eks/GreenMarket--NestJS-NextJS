import { Controller, Get } from "@nestjs/common";

@Controller('/')
export class ProductsController {

    @Get()
    async getAll() {
        return 'Products'
    }

    async get() {

    }
    
    async create() {

    }

    async delete() {
        
    }
}