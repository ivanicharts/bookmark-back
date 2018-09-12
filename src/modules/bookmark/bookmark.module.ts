import { Module, NestModule } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity, BookmarkRepositoryProvider, BookmarkRepository } from './'
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';

console.log(BookmarkRepositoryProvider, BookmarkService, BookmarkController)

@Module({
    imports: [TypeOrmModule.forFeature([BookmarkEntity])],
    // exports: [BookmarkService],
    controllers: [BookmarkController],
    providers: [BookmarkRepositoryProvider, BookmarkService],
})
export class BookmarkModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer {
        return consumer;
    }
}