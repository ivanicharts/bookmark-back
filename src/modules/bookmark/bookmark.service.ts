import { Injectable, Inject, UnprocessableEntityException, ForbiddenException, BadRequestException, HttpStatus } from '@nestjs/common';
import { BookmarkRepository } from './repository';
import { BookmarkEntity } from './entity';
import { ObjectID } from 'mongodb';
import { SuccessResponse, FailResponse, ISuccessResponse } from '../../common/response';
import { LOGIN_EMAIL } from 'config';
import { ITag } from '.';

@Injectable()
export class BookmarkService {
    constructor(@Inject('BookmarkRepository') private readonly bookmarkRepository: BookmarkRepository) {}

    // async listByUserId(userId: string): Promise<ISuccessResponse<BookmarkEntity[]>> {
    listByUserId(userId: string): Promise<BookmarkEntity[]> {
        return this.bookmarkRepository.find({ userId });
        // return new SuccessResponse({ data: await this.bookmarkRepository.find({ userId }) }) ;
    }

    // findOneById(id: ObjectID): Promise<User> {
    //     return this.userRepository.findOneOrFail(id);
    // }

    findOne(criteria: Partial<BookmarkEntity>): Promise<Partial<BookmarkEntity>> {
        return this.bookmarkRepository.findOne(criteria);
    }

    tagListByUserId(userId: string): Promise<ITag[]> {
        return this.bookmarkRepository
            .aggregate([])
            .match({ userId })
            .unwind('$tags')
            .group({ _id: '$tags', count: { $sum: 1 } })
            .project({ name: '$_id', _id: 0, count: '$count' })
            .toArray();
    }

    create(bookmark: BookmarkEntity): Promise<BookmarkEntity> {
        try {
            return this.bookmarkRepository.save(bookmark);
        } catch (e) {
            throw new UnprocessableEntityException(e.message, e);
        }
    }

    async delete(userId: string, bookmarkId: string) {
        // try {
            const bookmark = await this.bookmarkRepository.findOneOrFail(bookmarkId);
            if (bookmark.userId === userId) {
                const removeResult = await this.bookmarkRepository.remove(bookmark);
                if (removeResult) {
                    return new SuccessResponse({ statusCode: HttpStatus.NO_CONTENT });
                }
                throw new BadRequestException();
            }
            throw new ForbiddenException();
        // } catch (error) {
        //     return new FailResponse(error);
        // }
    }
}