import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';
import { config } from './ormconfig';

@Module({
  imports: [...config.map(TypeOrmModule.forRoot), UserModule, AuthModule],
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
