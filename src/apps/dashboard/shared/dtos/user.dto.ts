import { ApiProperty } from '@nestjs/swagger';
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

export class UserDto extends UserBaseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: new Date() })
  created_at: Date;
}
