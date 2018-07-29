import { Module } from '@nestjs/common';
import { AuthService, AuthController } from './';
import { JwtStrategy, JwtProvider } from './jwt'
import { UserModule } from '../user';


console.log('LocalStartegy', JwtStrategy)
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtProvider, JwtStrategy],
})
export class AuthModule {}