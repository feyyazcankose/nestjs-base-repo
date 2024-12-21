import { Module } from '@nestjs/common';
import { UserController } from '@dashboard/api/controllers/user.controller';
import { BlogController } from '@dashboard/api/controllers/blog.controller';
import { BusinessModule } from '@dashboard/business/business.module';

@Module({
  controllers: [UserController, BlogController],
  imports: [BusinessModule],
})
export class DashboardModule {}
