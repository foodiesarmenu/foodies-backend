import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { swagger } from '../../common/constants/swagger.constant';
import { Public } from '../../common/decorators/public.decorator';
import {
  CreateResponse,
  FindOneResponse,
  UpdateResponse,
} from '../../common/dto/response.dto';
import { Admin } from '../../models/admin/admin.schema';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dtos';
import { AdminFactoryService } from './factory/admin.factory';
import { Role, Roles } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadInterceptor } from 'src/blocks/interceptors/image-upload.interceptor';

@ApiTags(swagger.Dashboard)
@Controller('dashboard/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminFactoryService: AdminFactoryService,
  ) {}

  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('image'),
    new ImageUploadInterceptor('profile'),
  )
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

  @ApiOperation({ summary: 'Get admin' })
  @Get('profile/:email')
  async getOneAdmin(@Param('email') email: string) { 
    const getOneAdminResponse = new FindOneResponse<Admin>();

    try {
      const admin = await this.adminService.findOne(email);
      getOneAdminResponse.success = true;
      getOneAdminResponse.data = admin;
    } catch (error) {
      getOneAdminResponse.success = false;
      throw error;
    }
    return getOneAdminResponse;
  }

  @ApiOperation({ summary: 'update admin' })
  @Patch()
  async updateAdmin(
    @Body() updateAdminDto: UpdateAdminDto,
    @Request() req: Express.Request,
  ) {
    const updateAdminResponse = new UpdateResponse<Admin>();
    try {
      const admin = await this.adminFactoryService.updateAdmin(
        updateAdminDto,
      );
      const updatedAdmin = await this.adminService.update(
        req.user['_id'],
        admin,
      );
      updateAdminResponse.success = true;
      updateAdminResponse.data = updatedAdmin;
    } catch (error) {
      updateAdminResponse.success = false;
      throw error;
    }
    return updateAdminResponse;
  }
}
