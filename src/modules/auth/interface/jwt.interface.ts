import { ObjectID } from 'typeorm';

export interface JwtPayload {
  id: ObjectID,
}

export interface IJwtConfig {
  secret: string;
  expires: string;
}