import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-customer.dto';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { SendEmailResponse, changePasswordResponse } from 'src/common';
import { Client } from 'src/models';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { VerifyOtpDto } from './dto/verifyOtp';

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

  @ApiOperation({ summary: 'Reset password' })
  @Patch('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Request() req: Express.Request
  ) {
    const PasswordResponse = new changePasswordResponse<Client>();
    try {
      const password = await this.authService.resetPassword(
        resetPasswordDto,
        req.user['_id']);
      PasswordResponse.success = true;
      PasswordResponse.data = password;
    } catch (error) {
      PasswordResponse.success = false;
      throw error;
    }
    return PasswordResponse;
  }

  @ApiOperation({ summary: 'Forget Password' })
  @Public()
  @Post('forget-password')
  async forgetPassword(@Body() body: { email: string }) {
    const response = new SendEmailResponse()

    try {
      this.authService.forgetPassword(body.email);
      response.message = 'OTP sent to your email';
      response.to = body.email;
      response.success = true;
    } catch (error) {
      response.success = false;
      throw error;

    }
    return response;
  }

  @ApiOperation({ summary: 'Verify OTP' })
  @Public()
  @Post('verify-otp')
  async verifyOTP(@Body() body: VerifyOtpDto) {
    const response = new SendEmailResponse()

    try {
      await this.authService.verifyOTP(body.email, body.code);
      response.message = 'OTP verified';
      response.to = body.email;
      response.success = true;
    } catch (error) {
      response.message = error.message;
      response.success = false;
      throw error;
    }
    return response;
  }

  @ApiOperation({ summary: 'Change Password' })
  @Public()
  @Patch('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Body('email') email: string
  ) {
    const PasswordResponse = new changePasswordResponse<Client>();
    try {
      const password = await this.authService.changePassword(
        changePasswordDto,
        email
      );
      PasswordResponse.success = true;
      PasswordResponse.data = password;
    } catch (error) {
      PasswordResponse.success = false;
      throw error;
    }
    return PasswordResponse;
  }
}

