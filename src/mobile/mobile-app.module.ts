import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, ClientModule, CategoryModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class MobileAppModule { }
