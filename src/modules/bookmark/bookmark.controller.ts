import { Controller, Get, Post, Param, Req, Body, Query, Res, ValidationPipe, UseGuards, BadRequestException, Delete } from '@nestjs/common';
import { GroupEnum, StatusEnum } from './interface';
import { Roles, User } from './../../common';
import { TransformClassToPlain, plainToClass, classToPlain } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guard'
import { RoleEnum, User as UserEntity } from '../user';
import { bodyValidation } from '../../config';
import { BookmarkService } from './bookmark.service';
import { BookmarkEntity } from './entity';
import { BookmarkModel } from './model';
// import { BookmarkEntity, BookmarkModel, BookmarkService } from './'
import { Transport, Client, ClientProxy } from '@nestjs/microservices';
import { validate, ValidationError } from 'class-validator';
import * as parse from 'url-parse';

@Controller('/api/v1/bookmark')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BookmarkController {

    constructor(private readonly bookmarkService: BookmarkService) {}

    @Client({ transport: Transport.TCP, options: { port: 1338 } })
    client: ClientProxy;

    @Get('/list')
    @Roles(RoleEnum.USER)
    async list(@User() user: UserEntity): Promise<BookmarkEntity[]> {
        return this.bookmarkService.listByUserId(user.getId());
    }

    @Get('/tags')
    @Roles(RoleEnum.USER)
    async tagList(@User() user: UserEntity): Promise<object[]> {
        return this.bookmarkService.tagListByUserId(user.getId());
    }

    @Delete('/:id')
    @Roles(RoleEnum.USER)
    delete(@User() user: UserEntity, @Param('id') id: string) {
        return this.bookmarkService.delete(user.getId(), id);
    }

    @Post()
    @Roles(RoleEnum.USER)
    async create(
        @Body(new ValidationPipe({
            ...bodyValidation,
            groups: [GroupEnum.ADD],
        })) data: BookmarkEntity,
        @User() user: UserEntity,
    ): Promise<BookmarkEntity> {
        const userId = user.getId();
        const { url } = data;

        const existingBookmarkForCurrentUser = await this.bookmarkService.findOne({ url, userId });
        const existingBookmark = existingBookmarkForCurrentUser || await this.bookmarkService.findOne(data);

        const resolvedMetadata: Partial<BookmarkEntity> = existingBookmark
            ? classToPlain(existingBookmark, { groups: [GroupEnum.COPY] } )
            : JSON.parse(decodeURI(await this.client.send('getMetadataFromUrl', data).toPromise()));

        const metadata: Partial<BookmarkEntity> = {
            ...resolvedMetadata,
            url,
            userId,
            domain: parse(url).hostname,
            status: StatusEnum.ACTIVE,
        }

        const Bookmark = plainToClass(BookmarkEntity, metadata, { groups: [GroupEnum.PRIVATE] });

        // If user have bookmark, just update with status ACTIVE
        if (existingBookmarkForCurrentUser) {
            Bookmark.id = existingBookmarkForCurrentUser.id;
        }

        const validationErrors: ValidationError[] = await validate(Bookmark, { 
            groups: [GroupEnum.PRIVATE, ...(existingBookmarkForCurrentUser ? [GroupEnum.UPDATE] : [])], 
            whitelist: true, 
            forbidUnknownValues: true, 
            forbidNonWhitelisted: true, 
            skipMissingProperties: false,
            validationError: { target: false } 
        });
        
        if (validationErrors.length) {
            throw new BadRequestException(validationErrors);
        }

        // TODO: check why default status is not applied - seems not implemented yet
        // TODO: check why if add unique, it's still not unique - seems not implemented yet
        // TODO: prevent if user sends 2+ requests for same url at the same time (maybe queue per user ?) - solved by creatin
        // unique idndex for url + userId
        return this.bookmarkService.create(Bookmark);
    }

}

