import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({
    required: true,
    description: 'success code',
    default: 200,
  })
  statusCode: number;

  @ApiProperty({
    required: false,
    description: 'message',
    default: '200',
  })
  message?: string;

  @ApiProperty({
    required: false,
    description: 'entity_id',
    default: null,
    example: 1,
  })
  entity_id?: number;
}
