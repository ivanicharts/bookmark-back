import { Connection, EntityRepository, MongoRepository } from 'typeorm';
import { IRepositoryProvider } from '../../../interface';
import { BookmarkSharedEntity } from '../entity';

@EntityRepository(BookmarkSharedEntity)
export class BookmarkSharedRepository extends MongoRepository<BookmarkSharedEntity> {}

export const BookmarkSharedRepositoryProvider: IRepositoryProvider = Object.freeze({
    provide: BookmarkSharedRepository.name,
    useFactory: (connection: Connection) => connection.getCustomRepository<BookmarkSharedRepository>(BookmarkSharedRepository),
    inject: [Connection],
});
