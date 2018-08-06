import { Controller, Get, Post, Param, Req, Body, Query, Res, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService, User } from './';
import { TransformClassToPlain } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('/list')
    @UseGuards(AuthGuard('jwt'))
    @TransformClassToPlain({ groups: ['read'] })
    list(): Promise<User[]> {
        return this.userService.list();
    }

    @Get('/profile')
    @UseGuards(AuthGuard('jwt'))
    @TransformClassToPlain({ groups: ['read'] })
    get(@Req() req): User {
        return req.user;
    }    

}

// user dictionaries with expose or excld\ude
// typeorm index ??? unique ??? columnd options ?>?? +
// handle duplicate errror +
// send common success response
// before create, update +
// move signup to auth module

// write react form validator usin class-validator + type as component
