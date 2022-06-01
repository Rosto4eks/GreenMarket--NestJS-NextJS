import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "env";
import { Product } from "src/database/product.entity";
import { User } from 'src/database/user.entity'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            username: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME,
            entities: [User, Product],
            synchronize: true,
        })
    ]
})
export class DatabaseModule {}