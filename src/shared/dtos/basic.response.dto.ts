import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BasicResponseDto {
  constructor(response: { status?: number; message: string }) {
    this.status = response?.status ?? 200;
    this.message = response.message;
  }

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'success' })
  status: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'success' })
  message: string;
}
