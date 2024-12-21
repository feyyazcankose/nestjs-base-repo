import { Blog } from '@prisma/client';

export interface IBlogRepository {
  findById(id: string): Promise<Blog | null>;
  findAll(): Promise<Blog[]>;
  create(blogData: Partial<Blog>): Promise<Blog>;
}
