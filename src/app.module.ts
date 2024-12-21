import { Module } from '@nestjs/common';
import { UserController } from '@dashboard/api/controllers/user.controller';
import { BlogController } from '@dashboard/api/controllers/blog.controller';
import { UserService } from '@dashboard/business/services/user.service';
import { BlogService } from '@dashboard/business/services/blog.service';
// import { UserRepository } from '@dashboard/data/repositories/user.repository';
import { BlogRepository } from '@dashboard/data/repositories/blog.repository';
import { PrismaService } from '@shared/prisma/prisma.service';
import { BaseRepository } from '@shared/base/repositories/base.repository';
import { User, Prisma } from '@prisma/client';

@Module({
  controllers: [UserController, BlogController],
  providers: [
    PrismaService,
    // { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IBlogRepository', useClass: BlogRepository },
    { provide: 'IBlogService', useClass: BlogService },
    {
      provide: 'IUserRepository', // Interface adı
      useFactory: (prisma: PrismaService) =>
        new BaseRepository<User, Prisma.UserDelegate>(prisma.user), // Implementasyon
      inject: [PrismaService],
    },
  ],
})
export class AppModule {}
