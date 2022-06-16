import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserDto } from "src/database/dto/user.dto";
import { UsersService } from "./users.service";

@Controller('/users')
export class UsersController {

    constructor ( private userService: UsersService) {}

    @Post('register')
    async register(@Body() user: UserDto) {
        const oldUser = await this.userService.find(user.mail)
        console.log(oldUser)
        if(oldUser) {
            return 'exist'
        }
        else {
            console.log(user)
            return this.userService.create(user)
        }
    }

    // dev func
    @Get()
    async getAll() {
        return this.userService.getAll()
    }
}