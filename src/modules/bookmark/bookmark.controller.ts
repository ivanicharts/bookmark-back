import { Controller, Get, Post, Param, Req, Body, Query, Res, ValidationPipe, UseGuards, BadRequestException } from '@nestjs/common';
import { GroupEnum } from './interface';
import { Roles, User } from './../../common';
import { TransformClassToPlain, plainToClass, classToPlain } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guard'
import { BookmarkService } from './bookmark.service';
import { RoleEnum, User as UserEntity } from '../user';
import { bodyValidation } from '../../config';
import { BookmarkEntity } from './entity';
import { BookmarkModel } from './model';
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
        console.log('ZZ', await this.bookmarkService.listByUserId(user.id))
        return this.bookmarkService.listByUserId(user.id);
    }

    @Post()
    @Roles(RoleEnum.USER)
    async create(
        @Body(new ValidationPipe({
            ...bodyValidation,
            groups: [GroupEnum.ADD],
        })) bookmark: BookmarkEntity,
        @Req() req,
    ): Promise<BookmarkEntity> {
        const { id: userId } = req.user;
        const { url } = bookmark;

        const existingBookmarkForCurrentUser = await this.bookmarkService.findOne({ url, userId: String(userId) });
        const existingBookmark = existingBookmarkForCurrentUser || await this.bookmarkService.findOne(bookmark);

        const resolvedMetadata: Partial<BookmarkEntity> = existingBookmark
            ? classToPlain(existingBookmark, { groups: [GroupEnum.COPY] } )
            : JSON.parse(decodeURI(await this.client.send('getMetadataFromUrl', bookmark).toPromise()));

        const metadata: Partial<BookmarkEntity> = {
            ...resolvedMetadata,
            userId: String(userId),
            url: bookmark.url,
            domain: parse(url).hostname,
        }

        const Bookmark = plainToClass(BookmarkEntity, metadata, { groups: [GroupEnum.PRIVATE] });
        
        if (existingBookmarkForCurrentUser) {
            Bookmark._id = existingBookmarkForCurrentUser._id;
            Bookmark.status = 1;
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
            throw new BadRequestException(validationErrors, 'Validation error');
        }

        // TODO: check why default status is not applied
        // TODO: check why if add unique, it's still not unique
        // TODO: prevent if user sends 2+ requests for same url at the same time (maybe queue per user ?)
        await this.bookmarkService.create(Bookmark);

        return Bookmark;
    }

}

