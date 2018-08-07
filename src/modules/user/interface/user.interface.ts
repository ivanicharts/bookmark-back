import { ObjectID } from 'typeorm';

export interface IName {
  name: string;
}

export interface IEmail {
  email: string;
}

export interface IUser extends IName, IEmail {
  readonly id: ObjectID,
  readonly password: string,
  readonly createdAt: Date | string,
  readonly updatedAt: Date | string,
}

export type TUniqueUserColumns = IName | IEmail;

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}