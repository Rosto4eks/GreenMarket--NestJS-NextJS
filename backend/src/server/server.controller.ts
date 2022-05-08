import { Body, Controller, Get, Param, Post, Redirect } from "@nestjs/common";
import { ServerService } from "./server.service";

@Controller('/')
export class ServerController {

    constructor ( private ServerService: ServerService) {}

    @Get('/')
    @Redirect('products')
    async redirect() {}

    @Get('*')
    async get() {
       return '404 not found :('
    }

}