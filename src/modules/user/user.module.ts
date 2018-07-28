import { Module, NestModule } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserController, UserRepositoryProvider, UserService, UserByIdPipe, UserRepository } from './';

console.log(UserRepositoryProvider, 'UserRepositoryProvider')
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserRepositoryProvider, UserService, UserByIdPipe],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer {
        return consumer;
    }
}