import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "src/database/dto/product.dto";
import { Product } from "src/database/product.entity";
import { FileService } from "src/file/file.service";
import { ObjectID, Repository } from "typeorm";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private fileService: FileService
      ) {}

    public async getAll(page: number = 1) {
        if (page < 1) {
            page = 1
        }
        return this.productsRepository.find({ take: 5, skip: (page-1) * 5});
    }

    public async get(id: any) {
        return this.productsRepository.findOne({id: id})
    }

    async create(dto: ProductDto, file: any): Promise<Product> {

        const product = new Product();
        product.name = dto.name;
        product.price = dto.price;
        this.fileService.createFile(file, dto.name)

        return this.productsRepository.save(product);

    }

    public async delete(id: any) {
        return this.productsRepository.delete({id: id})
    }

    public async getCount() {
        return this.productsRepository.count()
    }

}
