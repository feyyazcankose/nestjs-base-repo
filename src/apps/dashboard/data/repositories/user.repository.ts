import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@dashboard/data/interfaces/user.repository.interface';
import { User } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(userData: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    });
  }
}
