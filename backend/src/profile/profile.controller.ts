import { BadRequestException, Body, Controller, Get, Head, Header, Headers, Post, UseGuards } from "@nestjs/common";
import { UserDto } from "../DTO/user.dto";
import { JwtGuard } from "../guards/jwt.guard";
import { ProfileService } from "./profile.service";

@Controller('/profile')
export class ProfileController {

    constructor ( private profileService: ProfileService) {}

    @Post('register')
    async register(@Body() user: UserDto) {
        const oldUser = await this.profileService.find(user.mail)
        if(oldUser) {
            throw new BadRequestException('exist')
        }
        else {
            return this.profileService.create(user)
        }
    }

    @Post('login')
    async login(@Body() {mail, password}: UserDto) {
        const res = await this.profileService.validate(mail, password)
        return this.profileService.login(res)
    }

    @UseGuards(JwtGuard)
    @Get()
    async profile(@Headers('Authorization') token: string) {
        return this.profileService.profile(token)
    }

}