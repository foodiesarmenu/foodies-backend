import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { omit } from 'lodash';
import { Admin, AdminRepository } from '../../models';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  private readonly logger = new Logger(AdminService.name);

  public async create(admin: Admin) {
    try {
      const adminExists = await this.adminRepository.exists({
        $or: [{ email: admin.email }, { phoneNumber: admin.phoneNumber }],
      });

      if (adminExists) {
        throw new ConflictException('Account already exists!');
      }

      await this.adminRepository.create(admin);

      const userCreated = await this.findOne(admin.email);

      if (!userCreated) {
        throw new BadRequestException('Failed to create admin');
      }

      return omit(userCreated, ['password']) as unknown as Admin;
    } catch (error) {
      this.logger.error('--Error--', error);
      throw new BadRequestException('Failed to create admin');
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
}
