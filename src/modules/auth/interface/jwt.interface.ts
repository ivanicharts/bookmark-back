import { ObjectID } from 'typeorm';
import { RoleEnum } from '../../user';

export interface JwtPayload {
  id: ObjectID,
  role: RoleEnum,
}

export interface IJwtConfig {
  secret: string;
  expires: string;
}