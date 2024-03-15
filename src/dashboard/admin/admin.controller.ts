import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import { CreateResponse } from '../../common/dto/response.dto';
import { Admin } from '../../models/admin/admin.schema';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos';
import { AdminFactoryService } from './factory/admin.factory';
import { Role, Roles } from 'src/common';
@Roles(Role.ADMIN)
@ApiTags(swagger.Dashboard)
@Controller('dashboard/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminFactoryService: AdminFactoryService,
  ) { }

  @Public()
  @Post()
  async register(@Body() createAdminDto: CreateAdminDto) {
    const createAdminResponse = new CreateResponse<Admin>();
    try {
      const admin = await this.adminFactoryService.createNewAdmin(
        createAdminDto,
      );
      const createdAdmin = await this.adminService.create(admin);
      createAdminResponse.success = true;
      createAdminResponse.data = createdAdmin;
    } catch (error) {
      createAdminResponse.success = false;
      throw error;
    }
    return createAdminResponse;
  }
}
