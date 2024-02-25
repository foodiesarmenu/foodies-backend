import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
    imports: [RestaurantModule],
})
export class dashboardAppModule { }
