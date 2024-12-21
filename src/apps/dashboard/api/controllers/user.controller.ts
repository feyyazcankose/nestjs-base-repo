import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { IUserService } from '@dashboard/business/interfaces/user.service.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) {}

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
