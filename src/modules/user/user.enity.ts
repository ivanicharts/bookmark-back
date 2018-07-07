import { Entity, ObjectID, Column } from 'typeorm';
import { IUser } from './interace';

@Entity('user')
export class User implements IUser {

  @Column()
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



