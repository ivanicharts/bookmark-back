import { Connection, EntityRepository, MongoRepository } from 'typeorm';
import { IRepositoryProvider } from '../../../interface';
import { BookmarkEntity } from '../entity';

@EntityRepository(BookmarkEntity)
export class BookmarkRepository extends MongoRepository<BookmarkEntity> {}

console.log('asd0', BookmarkEntity)

export const BookmarkRepositoryProvider: IRepositoryProvider = Object.freeze({
    provide: BookmarkRepository.name,
    useFactory: (connection: Connection) => connection.getCustomRepository<BookmarkRepository>(BookmarkRepository),
    inject: [Connection],
});
