import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/database/dto/user.dto";
import { User } from "src/database/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
      ) {}

    public async get(login: string) {
        return this.usersRepository.findOne({login: login})
    }

    async create(user: UserDto): Promise<User> {

        const newUser = new User();
        newUser.login = user.login;
        newUser.mail = user.mail;
        newUser.password = user.login;

        return this.usersRepository.save(newUser);

    }

    public async delete(id: any) {
        return this.usersRepository.delete({id: id})
    }

}