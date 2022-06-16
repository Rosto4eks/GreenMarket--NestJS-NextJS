import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWT_SECRET } from "env";
import { User } from "src/database/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module( {
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret: JWT_SECRET})],
    exports: [TypeOrmModule],
    controllers: [UsersController],
    providers: [UsersService]
})

export class UsersModule {}