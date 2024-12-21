import { User } from '@prisma/client';

export interface IUserService {
  getUserById(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  createUser(userData: Partial<User>): Promise<User>;
}
