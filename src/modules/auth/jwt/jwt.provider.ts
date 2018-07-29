import { initEnvVariables } from '../../../utils'

initEnvVariables();

export const JwtProvider = {
    provide: 'jwt',
    useValue: {
        secret: process.env.TOKEN_SECRET,
        expires: process.env.TOKEN_EXPIRES,
    }
}