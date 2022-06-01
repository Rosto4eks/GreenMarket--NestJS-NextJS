import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserDto } from "src/database/dto/user.dto";
import { UsersService } from "./users.service";

@Controller('/users')
export class UsersController {

    constructor ( private userService: UsersService) {}

    @Get(':login')
    async get(@Param('login') params: string) {
        return this.userService.get(params)
    }
    
    @Post('create')
    async create(@Body() user: UserDto) {
        return this.userService.create(user)
    }

    @Post('delete:userId')
    async delete(@Param('userId') params: any) {
        return this.userService.delete(params)
    }
}