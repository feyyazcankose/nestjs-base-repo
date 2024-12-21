import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsOptional } from 'class-validator';

export class UserBaseDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  password: string;
}

export class UserDto {
  constructor(partial: Partial<User>) {
    this.id = partial.id;
    this.name = partial.name;
    this.email = partial.email;
    this.created_at = partial.createdAt;
  }

  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: new Date() })
  created_at: Date;
}
