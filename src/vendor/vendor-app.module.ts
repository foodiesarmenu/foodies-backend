import { Module } from '@nestjs/common';
import { MealModule } from './meal/meal.module';
import { AuthVendorModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common';

@Module({
  imports: [MealModule, AuthVendorModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class VendorModule { }
