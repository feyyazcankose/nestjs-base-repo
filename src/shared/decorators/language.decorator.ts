import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function Language() {
  return applyDecorators(
    ApiHeader({
      name: 'Accept-Language',
      description: 'language',
      example: 'tr',
    }),
  );
}
