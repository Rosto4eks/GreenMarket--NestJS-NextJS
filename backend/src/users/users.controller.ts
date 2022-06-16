import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { UserDto } from "src/database/dto/user.dto";
import { UsersService } from "./users.service";

@Controller('/users')
export class UsersController {

    constructor ( private userService: UsersService) {}

    @Post('register')
    async register(@Body() user: UserDto) {
        const oldUser = await this.userService.find(user.mail)
        if(oldUser) {
            throw new BadRequestException('exist')
        }
        else {
            console.log(user)
            return this.userService.create(user)
        }
    }

    @Post('login')
    async login(@Body() {mail, password}: UserDto) {
        const name = await this.userService.validate(mail, password)
        return this.userService.login(name)
    }

    // dev func
    @Get()
    async getAll() {
        return this.userService.getAll()
    }
}