import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RolesGuard } from './guard';
// import { appBootstrap } from './app';

// import { LoggerService } from 'platform-common';
// import { ApplicationModule } from './modules/application.module';

async function bootstrap() {
  // const logger 

  const app: INestApplication = await NestFactory.create(AppModule, {
    // logger
  });

  bootstrapSwagger(app);
  // await appBootstrap(app, logger);
  await app.listen((<string>process.env.PORT) || 3000);
}

function bootstrapSwagger(app: INestApplication) {
  console.log('qwe', process.env.SWAGGER_ENABLED)
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
