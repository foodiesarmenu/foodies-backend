import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VendorStrategy } from './stratigies/mobile.strategy';
import { LocalStrategy } from './stratigies/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantRepository, RestaurantSchema } from 'src/models';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { ADMIN_PRIVATE_KEY, ADMIN_PUBLIC_KEY } =
          configService.get('access');
        return {
          privateKey: Buffer.from(ADMIN_PRIVATE_KEY, 'base64').toString(
            'ascii',
          ),
          publicKey: Buffer.from(ADMIN_PUBLIC_KEY, 'base64').toString('ascii'),
          signOptions: {
            expiresIn: '1y',
            algorithm: 'RS256',
          },
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,

      },

    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, VendorStrategy, RestaurantRepository],
  exports: [AuthService, RestaurantRepository]
})
export class AuthVendorModule { }
