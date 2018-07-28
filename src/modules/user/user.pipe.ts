import { Injectable, PipeTransform } from '@nestjs/common';
import { UserRepository, User } from './';
import { ObjectID } from 'typeorm';

@Injectable()
export class UserByIdPipe implements PipeTransform<{ id: ObjectID }, Promise<User>> {
    constructor(private readonly userRepository: UserRepository) {}

    transform({ id }) {
        return this.userRepository.findOneOrFail(id);
    }
}