import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-customer.dto';
import { CreateUserDto } from './dto/registeration.dto';
import { CreateResponse } from 'src/common';
import { User } from 'src/models/common/user.schema';
import { UserFactoryService } from './factory/user.factory';

@Controller('dashboard/auth')
@ApiTags(swagger.MobileAuth)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userFactoryService: UserFactoryService,
  ) { }


  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const createAdminResponse = new CreateResponse<User>();
    try {
      const user = await this.userFactoryService.createNewUser(
        createUserDto,
      );
      const createdAdmin = await this.authService.register(user);
      createAdminResponse.success = true;
      createAdminResponse.data = createdAdmin;
    } catch (error) {
      createAdminResponse.success = false;
      throw error;
    }
    return createAdminResponse;
  }


  @Public()
  @UseGuards(AuthGuard('local-admin'))
  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }
}
