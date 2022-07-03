import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserDto } from "../DTO/user.dto"
import { User } from "../database/entities/user.entity"
import { Repository } from "typeorm"
import { genSalt, hash, compare } from 'bcrypt'
import { JwtService } from "@nestjs/jwt"
import jwtDecode from "jwt-decode"

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        private readonly jwtService: JwtService
      ) {}

    async create(user: UserDto) {
        const salt = await genSalt(10)
        const newUser = new User()
        newUser.name = user.name
        newUser.mail = user.mail
        newUser.password = await hash(user.password, salt)
        this.repository.save(newUser)
        const data = {mail: user.mail}
        return { access_token: await this.jwtService.signAsync(data)}
    }

    async find(mail: string) {
        return this.repository.findOne({mail: mail})
    }

    async validate(mail: string, password: string) {
        const user = await this.find(mail)
        if (!user) {
            throw new UnauthorizedException('not found')
        }

        const isCorrect = await compare(password, user.password)
        if (!isCorrect) {
            throw new UnauthorizedException('wrong password')
        }
        return mail
    }

    async login(mail: string) {
        const data = {mail}
        return { access_token: await this.jwtService.signAsync(data)}
    }

    async profile(token: string) {
        const mail = jwtDecode(token)["mail"]
        const user = await this.repository.findOne({mail: mail})
        return {mail: user.mail, name: user.name}
    }
}