import { Module } from '@nestjs/common';
import { DashboardModule } from '@dashboard/dashboard.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DocModule } from '@shared/modules/docs/docs.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/src/public'),
      serveRoot: '/public',
    }),
    DashboardModule,
    DocModule,
  ],
})
export class AppModule {}
