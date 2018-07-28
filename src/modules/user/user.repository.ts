import { Connection, EntityRepository, MongoRepository } from 'typeorm';
import { IRepositoryProvider } from '../../interface';
import { User } from './';

@EntityRepository(User)
export class UserRepository extends MongoRepository<User> {}

export const UserRepositoryProvider: IRepositoryProvider = Object.freeze({
    provide: UserRepository.name,
    useFactory: (connection: Connection) => connection.getCustomRepository<UserRepository>(UserRepository),
    inject: [Connection],
});
