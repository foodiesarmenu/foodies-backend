import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-customer.dto';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { changePasswordResponse } from 'src/common';
import { Client } from 'src/models';

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

  @ApiOperation({ summary: 'Change password' })
  @Patch('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req: Express.Request
  ) {
    const PasswordResponse = new changePasswordResponse<Client>();
    try {
      const password = await this.authService.changePassword(
        changePasswordDto,
        req.user['_id']);
      PasswordResponse.success = true;
      PasswordResponse.data = password;
    } catch (error) {
      PasswordResponse.success = false;
      throw error;
    }
    return PasswordResponse;
  }
}

