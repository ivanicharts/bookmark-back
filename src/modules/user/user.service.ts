import { Injectable, Inject } from '@nestjs/common';
// import {  } from 'typeorm/'
import { User, UserRepository } from './';

console.log(UserRepository)
@Injectable()
export class UserService {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

    list() {
        return this.userRepository.find();
    }

    create(user) {
        this.userRepository.save(user);
    }
}