import { Module } from '@nestjs/common';
import { NestMinioModule } from 'nestjs-minio';
import * as dotenv from 'dotenv';
import { MinioService } from './minio.service';

dotenv.config();

@Module({
  imports: [
    NestMinioModule.register({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    }),
  ],
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule {}
