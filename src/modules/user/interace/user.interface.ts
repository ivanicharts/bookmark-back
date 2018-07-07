import { ObjectID } from 'typeorm';

export interface IUser {
  readonly id: ObjectID,
  name: string
  email: string,
  password: string,
  readonly createdAt: Date | string,
  readonly updatedAt: Date | string,
}