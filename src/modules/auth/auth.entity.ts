import { IsEmail, IsString, Length, MinLength, IsAlphanumeric } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ILoginEmail, ILoginName } from './interface';
import { LOGIN_EMAIL, LOGIN_NAME } from '../../config';


export class AuthEntity implements ILoginEmail, ILoginName {
  @IsEmail(undefined, { groups: [LOGIN_EMAIL] })
  @ApiModelProperty({ type: String, required: true, example: 'user@email.com' })
  email: string;

  @IsString({ groups: [LOGIN_NAME] })
  @IsAlphanumeric({ groups: [LOGIN_NAME] })
  @Length(3, 20, { groups: [LOGIN_NAME] })
  @ApiModelProperty({ type: String, required: true, minLength: 3, maxLength: 20, format: 'alphanumeric' })
  name: string;

  @Length(6, 255, { always: true })
  @ApiModelProperty({ type: String, required: true, minLength: 6, maxLength: 255 })
  password: string;
}



