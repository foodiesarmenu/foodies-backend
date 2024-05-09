import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { Admin, AdminRepository } from '../../models';
import { message } from 'src/common/constants/message.constant';
import { UpdateAdminDto } from './dtos';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) { }

  private readonly logger = new Logger(AdminService.name);

  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }
  public async create(admin: Admin) {
    try {
      const adminExists = await this.adminRepository.exists({
        $or: [{ email: admin.email }, { phoneNumber: admin.phoneNumber }],
      });

      if (adminExists) {
        throw new ConflictException(message.user.AlreadyExists);
      }

      const userCreated = await this.adminRepository.create(admin);


      if (!userCreated) {
        throw new BadRequestException(message.user.AlreadyExists);
      }

      return omit(userCreated, ['password']) as unknown as Admin;
    } catch (error) {
      this.handleError(error)
    }
  }
  
  public async findOne(email: string) {
    try {
      return await this.adminRepository.getOne({ email });
    } catch (error) {
      this.logger.error('--Error--', error);
      throw new BadRequestException(error);
    }
  }
  

  public async update(adminId: string, admin: UpdateAdminDto) {
    try {
      const adminExists = await this.adminRepository.exists({
        _id: adminId,
      });
  
      if (!adminExists) {
        throw new NotFoundException(message.user.NotFound);
      }
  
      const updatedAdmin = await this.adminRepository.update(
        { _id: adminId },
        admin,
        { new: true },
      );
  
      if (!updatedAdmin) {
        throw new BadRequestException(message.user.FailedToUpdate);
      }
  
      return omit(updatedAdmin, ['password']) as unknown as Admin;
    } catch (error) {
      this.handleError(error);
    }
  }

}
