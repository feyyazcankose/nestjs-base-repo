import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserService } from '@dashboard/business/interfaces/user.service.interface';
import { IUserRepository } from '@dashboard/data/interfaces/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
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
