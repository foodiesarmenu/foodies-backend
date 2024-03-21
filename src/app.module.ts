import { CartModule } from './mobile/cart/cart.module';
import { CartService } from './mobile/cart/cart.service';
import { CartController } from './mobile/cart/cart.controller'; // Correct the path to the CartController file

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import configuration from './config/envs';
import { MobileAppModule } from './mobile/mobile-app.module';
import { dashboardAppModule } from './dashboard/dashboard.module';
import { VendorModule } from './vendor/vendor-app.module';
import { CartFactoryService } from './mobile/cart/factory/cart.factory';

@Module({
  imports: [
    CartModule,
    CartFactoryService,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    },
    ),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('onlineDatabase').url,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    dashboardAppModule,
    MobileAppModule,
    VendorModule,
  ],
  controllers: [
    CartController,],
  providers: [
    CartService,
    CartFactoryService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
