import { Controller, Get, Post, Param, Req, Body, Query, Res, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService, User } from './';
import { RoleEnum } from './interface';
import { Roles } from './../../common/decorator'
import { TransformClassToPlain } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guard'

@Controller('/api/v1/user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('/list')
    @Roles(RoleEnum.ADMIN)
    @TransformClassToPlain({ groups: ['read'] })
    list(@Req() req): Promise<User[]> {
        return this.userService.list();
    }

    @Get('/profile')
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
