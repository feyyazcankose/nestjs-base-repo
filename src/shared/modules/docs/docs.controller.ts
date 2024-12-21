import { Controller, Get, Inject, Param, Redirect, Res } from '@nestjs/common';
import { DocService } from './docs.service';
import { Response } from 'express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('/api/doc')
export class DocController {
  @Inject(DocService)
  private readonly service: DocService;

  @Get()
  @ApiExcludeEndpoint()
  @Redirect('/api/doc/dashboard')
  public getAllDocument(): void {
    ('');
  }

  @Get(':tag')
  @ApiExcludeEndpoint()
  public async getDocument(
    @Res() res: Response,
    @Param('tag') tag: string,
  ): Promise<void> {
    res.setHeader('Content-Type', 'text/html');
    res.send(await this.service.getDocument(tag));
  }
}
