import { Blog } from '@prisma/client';

export interface IBlogService {
  getBlogById(id: string): Promise<Blog | null>;
  getAllBlogs(): Promise<Blog[]>;
  createBlog(blogData: Partial<Blog>): Promise<Blog>;
}
