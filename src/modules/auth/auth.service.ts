import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserService, User, IUser } from '../user';
import * as jwt from 'jsonwebtoken';
import { JwtPayload, IJwtConfig } from './interface/jwt.interface';
import { ILoginEmail, ILoginName, ILoginSuccess } from './interface';
import { authenticate } from 'passport';
import { plainToClass } from 'class-transformer';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('jwt') private readonly JWT: IJwtConfig,
  ) {}

  createToken (user: JwtPayload) {
    return jwt.sign(user, this.JWT.secret, { expiresIn: this.JWT.expires });
  }

  async validateUser ({ id }: JwtPayload): Promise<IUser> {
    return await this.userService.findOneById(id);
  }

  loginByEmail(nameCredentials: ILoginName): Promise<ILoginSuccess> {
    return this.login(nameCredentials);
  }

  loginByName(emailCredentials: ILoginEmail): Promise<ILoginSuccess> {
    return this.login(emailCredentials);
  }

  async login(credentials: ILoginEmail | ILoginName): Promise<ILoginSuccess> {
    const { password, ...params } = credentials;
    const user = await this.userService.getOneByNameOrEmail(params);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const { id, role } = user;
    const userEntity = plainToClass(User, user);
    
    if (!(await userEntity.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.createToken({ id, role });

    return { id, token };
  }
}

