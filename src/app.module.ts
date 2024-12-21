import { Module } from '@nestjs/common';
import { UserController } from '@dashboard/api/controllers/user.controller';
import { UserService } from '@dashboard/business/services/user.service';
import { UserRepository } from '@dashboard/data/repositories/user.repository';
import { PrismaService } from '@shared/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserService', useClass: UserService },
  ],
})
export class AppModule {}
