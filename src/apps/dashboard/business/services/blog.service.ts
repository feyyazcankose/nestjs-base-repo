import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IBlogService } from '@dashboard/business/interfaces/blog.service.interface';
import { IBlogRepository } from '@dashboard/data/interfaces/blog.repository.interface';
import { Blog } from '@prisma/client';

@Injectable()
export class BlogService implements IBlogService {
  constructor(
    @Inject('IBlogRepository') private readonly blogRepository: IBlogRepository,
  ) {}

  async getBlogById(id: string): Promise<Blog | null> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async getAllBlogs(): Promise<Blog[]> {
    return this.blogRepository.findAll();
  }

  async createBlog(blogData: Partial<Blog>): Promise<Blog> {
    return this.blogRepository.create(blogData);
  }
}
