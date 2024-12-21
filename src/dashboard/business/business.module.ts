import { Module } from '@nestjs/common';
import { UserService } from '@dashboard/business/services/user.service';
import { BlogService } from '@dashboard/business/services/blog.service';
import { DataModule } from '@dashboard/data/data.module';

@Module({
  imports: [DataModule],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IBlogService', useClass: BlogService },
  ],
  exports: ['IUserService', 'IBlogService'],
})
export class BusinessModule {}
