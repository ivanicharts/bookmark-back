import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './interface/jwt-payload.interface';
import { IUser } from '../user';

// todo: replace hardcoded values to env vars
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken (email) {
    const user: JwtPayload = { email };
    return jwt.sign(user, 'key', { expiresIn: 3600 });
  }

  async validateUser ({ email }: JwtPayload): Promise<IUser> {
    return await this.userService.findOneByEmail(email);
  }
}