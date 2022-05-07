import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ServerService } from "./server.service";

@Controller('/')
export class ServerController {

    constructor ( private ServerService: ServerService) {}

    @Get('*')
    async get() {
       return '404 not found :('
    }

}