import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
  @ApiProperty({
    required: false,
    description: 'Erorr code',
    default: 'SERVICE_USAGE_LIMIT',
  })
  error_code?: string;

  @ApiProperty({
    required: true,
    description: 'message',
    default: '404',
  })
  message: string;
}
