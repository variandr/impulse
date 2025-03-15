import { Module } from '@nestjs/common';

import { ConfigModule } from '@libs/config';

import { AuthGuard } from './guards';
import { ErrorInterceptor } from './interceptors';
import { SecurityMiddleware } from './middlewares';

@Module({
  imports: [ConfigModule],
  providers: [AuthGuard, ErrorInterceptor, SecurityMiddleware],
  exports: [AuthGuard, ErrorInterceptor, SecurityMiddleware],
})
export class CommonModule {}
