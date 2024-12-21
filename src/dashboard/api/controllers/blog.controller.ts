import { Get, Post, Param, Body, Inject } from '@nestjs/common';
import { IBlogService } from '@dashboard/business/interfaces/blog.service.interface';
import { DashboardController } from '@shared/decorators/prefix.controller.decorator';
import { ApiOperation } from '@nestjs/swagger';

@DashboardController('blogs')
export class BlogController {
  constructor(
    @Inject('IBlogService') private readonly blogService: IBlogService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get blog' })
  // @ApiOkResponse({ type: AgreementDto })
  async getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get blogs' })
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Post()
  @ApiOperation({ summary: 'Create blogs' })
  async createBlog(@Body() blogData: any) {
    return this.blogService.createBlog(blogData);
  }
}
