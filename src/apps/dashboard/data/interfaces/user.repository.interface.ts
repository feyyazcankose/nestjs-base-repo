import { User } from '@prisma/client';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(userData: Partial<User>): Promise<User>;
}
