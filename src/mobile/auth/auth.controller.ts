import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-customer.dto';
import { CreateResponse } from 'src/common';
import { User } from 'src/models/common/user.schema';

@Controller('dashboard/auth')
@ApiTags(swagger.MobileAuth)
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
}
