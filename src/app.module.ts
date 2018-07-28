import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { UserModule } from './modules/user';
import { config } from './ormconfig';
import { Connection } from 'typeorm';

console.log(UserModule)
@Module({
  imports: [...config.map(TypeOrmModule.forRoot), UserModule],
})
export class AppModule implements NestModule {
  // constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewaresConsumer) {
    // consumer
    //     .apply(LoggerMiddleware)
    //     .with(ApplicationModule.name)
    //     .forRoutes('*');

    return consumer;
  } 
}
