import { Entity, ObjectID, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ColumnOptions, Index, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail, IsString, Length, MinLength, IsAlphanumeric } from 'class-validator';
import { Expose, Exclude, Type, Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { LOGIN_EMAIL, LOGIN_NAME, READ } from '../../config';
import { IUser } from '.';


@Entity({ name: 'users' })
export class User implements IUser {

  @Type(() => String)
  @ApiModelProperty({ type: String, readOnly: true })
  @ObjectIdColumn()
  id: ObjectID;

  @IsEmail({}, { groups: [LOGIN_EMAIL] })
  @ApiModelProperty({ type: String, required: true, example: 'user@email.com' })
  @Column({ unique: true })
  email: string;

  @IsString({ groups: [LOGIN_NAME] })
  @IsAlphanumeric({ groups: [LOGIN_NAME] })
  @Length(3, 20, { groups: [LOGIN_NAME] })
  @ApiModelProperty({ type: String, required: true, minLength: 3, maxLength: 20, format: 'alphanumeric' })
  @Column({ unique: true })
  name: string;

  @Length(6, 255, { groups: [LOGIN_NAME, LOGIN_EMAIL] })
  @Exclude({ toPlainOnly: true })
  @ApiModelProperty({ type: String, required: true, minLength: 6, maxLength: 255 })
  @Column()
  password: string;

  @Expose({ groups: [READ] })
  @CreateDateColumn()
  @ApiModelProperty({ type: String, readOnly: true, format: 'date-time' })
  createdAt: Date;

  @Expose({ groups: [READ] })
  @UpdateDateColumn()
  @ApiModelProperty({ type: String, readOnly: true, format: 'date-time' })
  updatedAt: Date;

  @BeforeInsert()
  async beforeInsert() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
    this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS || 12);
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  async validatePassword(plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  }

}



