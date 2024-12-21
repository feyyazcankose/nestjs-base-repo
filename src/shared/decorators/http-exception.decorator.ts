import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { BadRequestResponseDto } from '@shared/dtos/bad-request.response.dto';
import { ServerErrorResponseDto } from '@shared/dtos/server-error.response.dto';

export function HttpExceptionDecorators() {
  return applyDecorators(
    ApiBadRequestResponse({ type: BadRequestResponseDto }),
    ApiInternalServerErrorResponse({ type: ServerErrorResponseDto }),
  );
}
