import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/auth.module';
import { DbhandlerModule } from './modules/dbhandler/dbhandler.module'

@Module({
  imports: [AuthModule, DbhandlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
