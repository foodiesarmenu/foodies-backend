import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [AuthModule, ClientModule, RestaurantModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class MobileAppModule { }
