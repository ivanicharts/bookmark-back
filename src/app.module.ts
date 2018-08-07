import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';
import { config } from './ormconfig';
import { RolesGuard } from './guard';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [...config.map(TypeOrmModule.forRoot), UserModule, AuthModule],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard('jwt'),
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    // consumer
    //     .apply(LoggerMiddleware)
    //     .with(ApplicationModule.name)
    //     .forRoutes('*');

    return consumer;
  } 
}
