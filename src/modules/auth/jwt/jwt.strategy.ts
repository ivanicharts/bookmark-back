import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, UnauthorizedException, Injectable } from '@nestjs/common'; 
import { JwtPayload, IJwtConfig } from '../interface';
import { User } from '../../user';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject('jwt') private readonly JWT: IJwtConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.secret,
    });
  }

  async validate (payload: JwtPayload, done: Function): Promise<any> {
    try {
      const user = await this.authService.validateUser(payload);
      if (!user) {
        return done(new UnauthorizedException(), false);
      }
      console.log('qqqAAAAAAAAZZZZZZ', user, user instanceof User)
      return done(null, user);
    } catch (error) {
      // TODO: add log error.stack
      return done(new UnauthorizedException(error.message), false);
    }
  }
}