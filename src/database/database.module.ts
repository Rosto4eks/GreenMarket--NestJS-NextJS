import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/product.entity";
import { User } from 'src/database/user.entity'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'KQ3kefFfa23lFiGG',
            database: 'greenmarket',
            entities: [User, Product],
            synchronize: true,
        })
    ]
})
export class DatabaseModule {}