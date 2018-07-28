import { Controller, Get, Post, Param, Req, Body, Query, Res } from '@nestjs/common';
import { UserService } from './';

@Controller('/api/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('/list')
    list() {
        return this.userService.list();
    }

    @Post('/signup')
    signup(@Body()) {
        
    }

}