import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "../database/dto/product.dto";
import { Product } from "../database/product.entity";
import { FileService } from "../file/file.service";
import { Like, Repository } from "typeorm";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private fileService: FileService
    ) {}

    public async getAll(page: number = 1) {
        if (page < 1) page = 1
        return this.productsRepository.find({ take: 5, skip: (page-1) * 5});
    }

    public async getById(id: any) {
        return this.productsRepository.findOne({id: id})
    }

    public async search(name: string) {
        return this.productsRepository.find({name: Like(`%${name}%`)})
    } 

    public async create(product: ProductDto, file: any): Promise<Product> { 

        const newProduct = new Product();
        newProduct.name = product.name;
        newProduct.price = product.price;
        this.fileService.createFile(file, newProduct.name)

        return this.productsRepository.save(newProduct);

    }

    public async delete(id: any) {
        return this.productsRepository.delete({id: id})
    }

    public async getCount() {
        return this.productsRepository.count()
    }

}
