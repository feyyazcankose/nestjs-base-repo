import { Module } from '@nestjs/common';
import { BlogRepository } from '@dashboard/data/repositories/blog.repository';
import { PrismaService } from '@shared/prisma/prisma.service';
import { BaseRepository } from '@shared/base/repositories/base.repository';
import { User, Prisma } from '@prisma/client';

@Module({
  providers: [
    PrismaService,
    { provide: 'IBlogRepository', useClass: BlogRepository },
    {
      provide: 'IUserRepository', // Interface adı
      useFactory: (prisma: PrismaService) =>
        new BaseRepository<User, Prisma.UserDelegate>(prisma.user), // Implementasyon
      inject: [PrismaService],
    },
  ],
  exports: ['IBlogRepository', 'IUserRepository'],
})
export class DataModule {}
