import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AdminModule } from './admin/admin.module';
import { AuthAdminModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [RestaurantModule, AdminModule, AuthAdminModule, CategoryModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },]
})
export class dashboardAppModule { }
