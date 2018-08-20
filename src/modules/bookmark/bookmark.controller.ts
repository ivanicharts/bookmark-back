import { Controller, Get, Post, Param, Req, Body, Query, Res, ValidationPipe, UseGuards } from '@nestjs/common';
import { GroupEnum } from './interface';
import { Roles, reccursiveDecode } from './../../common';
import { TransformClassToPlain, plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guard'
import { BookmarkService } from './bookmark.service';
import { RoleEnum } from '../user';
import { bodyValidation } from '../../config';
import { BookmarkEntity } from './entity';
import { Transport, Client, ClientProxy } from '@nestjs/microservices';
import { validate } from 'class-validator';

@Controller('/api/v1/bookmark')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BookmarkController {

    constructor(private readonly bookmarkService: BookmarkService) {}

    @Client({ transport: Transport.TCP, options: { port: 1338 } })
    client: ClientProxy;

    @Post()
    @Roles(RoleEnum.USER)
    async create(
        @Body(new ValidationPipe({
            ...bodyValidation,
            groups: [GroupEnum.ADD],
        })) bookmark: BookmarkEntity,
        @Req() req,
    ) {
        console.log('bookmark', bookmark);
        console.log('sss', req.user);
        
        const metadata = JSON.parse(decodeURI(await this.client.send('getMetadataFromUrl', bookmark).toPromise()));
        console.log('metadata', metadata);
        const Bookmark = plainToClass(BookmarkEntity, metadata, { groups: [GroupEnum.PRIVATE] });
        // metadata.userId = req.user.id;
        
        // await this.bookmarkService.create(metadata);

        console.log('BB', Bookmark)

        Bookmark.asd = 'asd';

        const validated = await validate(Bookmark, { groups: [GroupEnum.PRIVATE] });

        console.log('vaaal', validated);

        return Bookmark;
    }

}

