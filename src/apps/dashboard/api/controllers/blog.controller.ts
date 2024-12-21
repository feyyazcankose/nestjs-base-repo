import { Get, Post, Param, Body, Inject } from '@nestjs/common';
import { IBlogService } from '@dashboard/business/interfaces/blog.service.interface';
import { DashboardController } from '@shared/decorators/prefix.controller.decorator';

@DashboardController('blogs')
export class BlogController {
  constructor(
    @Inject('IBlogService') private readonly blogService: IBlogService,
  ) {}

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Post()
  async createBlog(@Body() blogData: any) {
    return this.blogService.createBlog(blogData);
  }
}
