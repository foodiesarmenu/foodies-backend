import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-customer.dto';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { Client } from '../client/entities/client.entity';

@ApiTags(swagger.MobileAuth)
@Controller('mobile/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @ApiOperation({ summary: 'Login' })
  @Public()
  @UseGuards(AuthGuard('local-client'))
  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }


  @ApiOperation({ summary: 'Change Password' })
  @Patch('change-password')
  async changePassword(@Request() req: Express.Request, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user as Client, changePasswordDto);
  }
}

