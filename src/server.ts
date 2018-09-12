import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RolesGuard } from './guard';
import { GlobalErrorsInterceptor } from './interceptor';
import { Transport } from '@nestjs/microservices'
import { GlobalExceptionFilter } from './filter/exception.filter';
// import { appBootstrap } from './app';

// import { LoggerService } from 'platform-common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({ transport: Transport.TCP, options: { port: 1338 } });
  
  bootstrapSwagger(app);
  // app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new GlobalErrorsInterceptor());
  
  await app.startAllMicroservicesAsync();
  await app.listen((<string>process.env.PORT) || 3000);
}

function bootstrapSwagger(app: INestApplication) {
  if (process.env.SWAGGER_ENABLED) {
    const options = new DocumentBuilder()
      .setTitle('Bookmarks app')
      .setDescription('The Bookmarks API')
      .setVersion('1.0')
      .addTag('bookmarks')
      .setSchemes(process.env.SWAGGER_SCHEME as 'http' | 'https')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/doc', app, document);
  }
}

bootstrap();
