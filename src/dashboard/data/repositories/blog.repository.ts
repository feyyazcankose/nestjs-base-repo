import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { IBlogRepository } from '@dashboard/data/interfaces/blog.repository.interface';
import { Blog } from '@prisma/client';

@Injectable()
export class BlogRepository implements IBlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Blog | null> {
    return this.prisma.blog.findUnique({ where: { id } });
  }

  async findAll(): Promise<Blog[]> {
    return this.prisma.blog.findMany();
  }

  async create(blogData: Partial<Blog>): Promise<Blog> {
    return this.prisma.blog.create({
      data: {
        title: blogData.title,
        content: blogData.content,
        userId: blogData.userId,
      },
    });
  }
}
