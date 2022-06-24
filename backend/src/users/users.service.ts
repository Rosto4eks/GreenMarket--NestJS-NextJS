import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserDto } from "../database/dto/user.dto"
import { User } from "../database/user.entity"
import { Repository } from "typeorm"
import {genSalt, hash, compare} from 'bcrypt'
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService
      ) {}

    public async create(user: UserDto): Promise<User> {
        const salt = await genSalt(10)
        const newUser = new User()
        newUser.name = user.name
        newUser.mail = user.mail
        console.log(user)
        newUser.password = await hash(user.password, salt)

        return this.usersRepository.save(newUser)
    }

    public async find(mail: string) {
        return this.usersRepository.findOne({mail: mail})
    }

    public async validate(mail: string, password: string) {
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

    public async login(mail: string) {
        const data = {mail}
        return { access_token: await this.jwtService.signAsync(data)}
    }

    public async profile() {
        return this.usersRepository.findOne({id: 1})
    }

    public async getAll() {
        return this.usersRepository.find()
    }

}