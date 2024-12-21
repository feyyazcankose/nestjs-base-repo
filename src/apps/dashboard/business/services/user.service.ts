import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserService } from '@dashboard/business/interfaces/user.service.interface';
import { User } from '@prisma/client';
import { IBaseRepository } from '@shared/base/interfaces/base.repository.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IBaseRepository<User>,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }
}
