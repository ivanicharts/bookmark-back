import { Injectable, Inject, UnprocessableEntityException, BadRequestException, UsePipes } from '@nestjs/common';
// import { User, UserRepository, TUniqueUserColumns, UserByIdPipe } from './';
import { BookmarkRepository } from './repository';
import { BookmarkEntity } from './entity';
import { ObjectID } from 'typeorm';

@Injectable()
export class BookmarkService {
    constructor(@Inject('BookmarkRepository') private readonly bookmarkRepository: BookmarkRepository) {}

    listByUserId(id: string): Promise<BookmarkEntity[]> {
        console.log('id', typeof id);
        // TODO transform user.id to string, HOW ???
        return this.bookmarkRepository.find({ userId: "5b86a6b8b4bd1b0d4267e88f" });
    }

    // findOneById(id: ObjectID): Promise<User> {
    //     return this.userRepository.findOneOrFail(id);
    // }

    async findOne(criteria: Partial<BookmarkEntity>): Promise<Partial<BookmarkEntity>> {
        return this.bookmarkRepository.findOne(criteria);
    }

    async create(bookmark: BookmarkEntity): Promise<BookmarkEntity> {
        try {
            return (await this.bookmarkRepository.save(bookmark));
        } catch (e) {
            throw new UnprocessableEntityException(e.message, e);
        }
    }
}