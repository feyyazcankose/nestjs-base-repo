import { ApiProperty } from '@nestjs/swagger';

export class ServerErrorResponseDto {
  @ApiProperty({
    required: true,
    description: 'erorr code',
    default: 500,
  })
  statusCode: number;

  @ApiProperty({
    required: true,
    description: 'message',
    default: '500',
  })
  message: string;
}
