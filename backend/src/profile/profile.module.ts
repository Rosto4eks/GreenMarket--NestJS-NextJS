import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWT_SECRET } from "../../env";
import { User } from "../database/entities/user.entity";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module( {
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret: JWT_SECRET}), PassportModule],
    exports: [TypeOrmModule],
    controllers: [ProfileController],
    providers: [ProfileService, JwtStrategy]
})

export class ProfileModule {}