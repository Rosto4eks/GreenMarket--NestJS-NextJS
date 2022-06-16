import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserDto } from "src/database/dto/user.dto"
import { User } from "src/database/user.entity"
import { Repository } from "typeorm"
import {genSaltSync, hashSync} from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
      ) {}

    public async create(user: UserDto): Promise<User> {

        const salt = genSaltSync(10)
        const newUser = new User()
        newUser.name = user.name
        newUser.mail = user.mail
        console.log(user)
        newUser.password = hashSync(user.password, salt)

        return this.usersRepository.save(newUser)
    }

    public async find(mail: string) {
        return this.usersRepository.findOne({mail: mail})
    }

    public async getAll() {
        return this.usersRepository.find()
    }

}