import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DashboardStrategy } from './stratigies/dashboard.strategy';
import { LocalStrategy } from './stratigies/local.strategy';
import { UserRepository } from 'src/models';
import { UserFactoryService } from './factory/user.factory';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';

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
    UserMongoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, DashboardStrategy, UserFactoryService],
  exports: [AuthService]
})
export class AuthModule { }
