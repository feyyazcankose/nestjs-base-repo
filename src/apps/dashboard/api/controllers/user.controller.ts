import { Get, Post, Param, Body, Inject } from '@nestjs/common';
import { IUserService } from '@dashboard/business/interfaces/user.service.interface';
import { DashboardController } from '@shared/decorators/prefix.controller.decorator';

@DashboardController('users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() userData: any) {
    return this.userService.createUser(userData);
  }
}
