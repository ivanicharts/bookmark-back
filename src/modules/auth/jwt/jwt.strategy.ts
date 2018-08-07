import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, UnauthorizedException, Injectable } from '@nestjs/common'; 
import { JwtPayload, IJwtConfig } from '../interface';


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
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}