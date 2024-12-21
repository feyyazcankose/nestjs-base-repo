import { Get, Post, Param, Body, Inject } from '@nestjs/common';
import { IUserService } from '@dashboard/business/interfaces/user.service.interface';
import { DashboardController } from '@shared/decorators/prefix.controller.decorator';
import { UserBaseDto, UserDto } from '@dashboard/shared/dtos/user.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@DashboardController('users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Get user' })
  async getUserById(@Param('id') id: string) {
    return new UserDto(await this.userService.getUserById(id));
  }

  @Get()
  @ApiOkResponse({ type: [UserDto] })
  @ApiOperation({ summary: 'Get users' })
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user) => new UserDto(user));
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() userData: UserBaseDto) {
    return this.userService.createUser(userData);
  }
}
