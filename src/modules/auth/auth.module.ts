import { Module } from '@nestjs/common';
import { AuthService, JwtStrategy } from './';
// import { UsersModule } from '../user';

@Module({
  imports: [UserModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}