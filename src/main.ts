import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { swagger } from '@shared/modules/docs/docs.config';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    [process.env.API_DOC_PATH, process.env.API_DOC_PATH + '-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.API_DOC_USER]: process.env.API_DOC_PASS,
      },
    }),
  );
  swagger(app);
  await app.listen(process.env.APP_PORT, '0.0.0.0');
  Logger.verbose(`Application is running on: ${await app.getUrl()}`);
  Logger.verbose(
    `Application API documentation is running on: ${await app.getUrl()}/api/doc`,
  );
}
bootstrap();
