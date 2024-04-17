import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AdminModule } from './admin/admin.module';
import { AuthAdminModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common';
import { CategoryModule } from './category/category.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
    imports: [
        RestaurantModule,
        AdminModule,
        AuthAdminModule,
        CategoryModule,
        CouponModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },]
})
export class dashboardAppModule { }
