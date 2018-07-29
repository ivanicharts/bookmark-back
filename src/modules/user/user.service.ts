import { Injectable, Inject, UnprocessableEntityException, BadRequestException, UsePipes } from '@nestjs/common';
import { User, UserRepository, TUniqueUserColumns, UserByIdPipe } from './';
import { ObjectID } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

    list(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(criteria): Promise<User> {
        return this.userRepository.findOne(criteria); 
    }

    findOneById(id: ObjectID): Promise<User> {
        return this.userRepository.findOneOrFail(id);
    }

    async checkIfUserExists(columns: TUniqueUserColumns): Promise<Boolean> {
        const user = await this.getOneByNameOrEmail(columns);
        return !!(user);
    }

    async getOneByNameOrEmail(columns: TUniqueUserColumns): Promise<User> {
        const credentials = Object.entries(columns).map(([key, value]) => ({ [key]: value }));

        if (!credentials.length) {
            throw new Error('Provide name or email');
        }

        return await this.userRepository.findOne({ where: { $or: credentials } });
    }

    async create(user: User): Promise<User> {
        try {
            return (await this.userRepository.save(user));
        } catch (e) {
            throw new UnprocessableEntityException(e.message, e);
        }
    }
}