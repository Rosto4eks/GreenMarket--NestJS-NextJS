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

    public async get(login) {
        return this.usersRepository.findOne({login: login})
    }

    async create(dto: UserDto): Promise<User> {

        const user = new User();
        user.login = dto.login;
        user.mail = dto.mail;
        user.password = dto.login;

        return this.usersRepository.save(user);

    }

    public async delete(id) {
        return this.usersRepository.delete({id: id})
    }

}