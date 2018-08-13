import { Controller, Get, Post, Param, Req, Body, Query, Res, ValidationPipe, UseGuards } from '@nestjs/common';
import { GroupEnum } from './interface';
import { Roles } from './../../common/decorator'
import { TransformClassToPlain } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guard'
import { BookmarkService } from './bookmark.service';
import { RoleEnum } from '../user';
import { bodyValidation } from '../../config';
import { BookmarkEntity } from './entity';

console.log('ttt', BookmarkService)
@Controller('/api/v1/bookmark')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BookmarkController {

    constructor(private readonly bookmarkService: BookmarkService) {}

    @Post()
    @Roles(RoleEnum.USER)
    create(
        @Body(new ValidationPipe({
            ...bodyValidation,
            groups: [GroupEnum.ADD],
        })) bookmark: BookmarkEntity
    ) {
        console.log(bookmark);
        return bookmark;
    }

    // @Get('/my')
    // @Roles(RoleEnum.ADMIN)
    // @TransformClassToPlain({ groups: ['read'] })
    // getByToken(@Req() req): Promise<User[]> {
    //     return this.userService.list();
    // }

    // @Get('/profile')
    // @TransformClassToPlain({ groups: ['read'] })
    // get(@Req() req): User {
    //     return req.user;
    // }    

}
