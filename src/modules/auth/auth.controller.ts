import { Controller, Get, Post, Param, Req, Body, Query, Res, ValidationPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { UserService, User } from '../user';
import { TransformClassToPlain } from 'class-transformer';
import { bodyValidation, LOGIN_EMAIL, LOGIN_NAME, READ } from '../../config';
import { AuthEntity, AuthService } from './'
import { ILoginSuccess } from './interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post('/signup')
    @TransformClassToPlain({ groups: [READ] })
    async signup(
        @Body(new ValidationPipe(bodyValidation)) user: User
    ): Promise<User> {
        const existingUser = await this.userService.checkIfUserExists({ name: user.name, email: user.email });

        if (existingUser) {
            throw new BadRequestException('User with such Name or Email already exists');
        }

        return this.userService.create(user);
    }

    @Post('/signin/email')
    async signinByEmail(
        @Body(new ValidationPipe({
            ...bodyValidation,
            groups: [LOGIN_EMAIL],
        })) credentials: User
    ): Promise<ILoginSuccess> {
        const loginSuccess: ILoginSuccess = await this.authService.loginByEmail(credentials);

        return loginSuccess;
    }

    @Post('/signin/name')
    async signinByName(
        @Body(new ValidationPipe({
            ...bodyValidation,
            groups: [LOGIN_NAME],
        })) credentials: User,
        @Res() res,
    ): Promise<ILoginSuccess> {
        const loginSuccess: ILoginSuccess = await this.authService.loginByName(credentials);

        console.log('res.cookie', res.cookie);
        res.cookie('jwt', loginSuccess.token, { httpOnly: true, secure: true });
        return res.json(loginSuccess);
    }

}

