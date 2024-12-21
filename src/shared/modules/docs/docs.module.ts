import { Module } from '@nestjs/common';
import { DocService } from './docs.service';
import { DocController } from './docs.controller';

@Module({
  providers: [DocService],
  controllers: [DocController],
})
export class DocModule {}
