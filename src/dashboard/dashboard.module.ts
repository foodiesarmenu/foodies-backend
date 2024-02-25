import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AdminModule } from './admin/admin.module';
import { AuthAdminModule } from './auth/auth.module';

@Module({
    imports: [RestaurantModule, AdminModule, AuthAdminModule]


})
export class dashboardAppModule { }
