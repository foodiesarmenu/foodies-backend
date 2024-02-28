import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import configuration from './config/envs';
import { MobileAppModule } from './mobile/mobile-app.module';
import { dashboardAppModule } from './dashboard/dashboard.module';
import { VendorModule } from './vendor/vendor-app.module';
import { RestaurantModule } from './mobile/restaurant/restaurant.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database').url,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),


    dashboardAppModule,
    MobileAppModule,
    VendorModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
