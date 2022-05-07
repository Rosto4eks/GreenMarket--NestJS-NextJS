import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "src/database/dto/product.dto";
import { Product } from "src/database/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
      ) {}

    public async getAll() {
        return this.productsRepository.find();
    }

    public async get(id) {
        return this.productsRepository.findOne({id: id})
    }

    async create(dto: ProductDto): Promise<Product> {

        const product = new Product();
        product.name = dto.name;

        return this.productsRepository.save(product);

    }

    public async delete(id) {
        return this.productsRepository.delete({id: id})
    }

}
