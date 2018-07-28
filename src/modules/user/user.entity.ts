import { Entity, ObjectID, Column, ObjectIdColumn } from 'typeorm';
import { IUser } from './interace';

@Entity({ name: 'users' })
export class User implements IUser {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

}



