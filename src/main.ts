import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { RestLoggingInterceptor } from './blocks/interceptors/rest-logging';
import { swaggerUi } from './config/docs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      rawBody: true,
    }
  );
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('port');
  console.log(port)
  const document = SwaggerModule.createDocument(app, swaggerUi);
  SwaggerModule.setup('api-docs', app, document);

  //app.use(json({ limit: '5mb' }));
  app.useGlobalInterceptors(new RestLoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(urlencoded({ extended: true }));
  app.use(compression());

  app.enableCors();

  await app.listen(port || 8000, () => {
    console.warn(`Server running on port ${port}`);
  });
}

bootstrap();
