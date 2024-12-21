import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT, '0.0.0.0');
  Logger.verbose(`Application is running on: ${await app.getUrl()}`);
  Logger.verbose(
    `Application API documentation is running on: ${await app.getUrl()}/api/doc`,
  );
}
bootstrap();
