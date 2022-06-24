import { BadRequestException, Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { UserDto } from "../database/dto/user.dto";
import { JwtGuard } from "../guards/jwt.guard";
import { UsersService } from "./users.service";

@Controller('/profile')
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
        const res = await this.userService.validate(mail, password)
        return this.userService.login(res)
    }

    @UseGuards(JwtGuard)
    @Get()
    async profile() {
        return this.userService.profile()
    }

    // dev func
    @Get('users')
    async getAll(@Res() res: Response) {
        return this.userService.getAll()
    }
}