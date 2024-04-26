import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto, UpdateAdminDto } from '../dtos';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminFactoryService {
  async createNewAdmin(createAdminDto: CreateAdminDto) {
    const newAdmin = new Admin();
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 12);

    newAdmin.name = createAdminDto.name;
    newAdmin.image = createAdminDto.image;
    newAdmin.email = createAdminDto.email;
    newAdmin.countryCode = createAdminDto.countryCode;
    newAdmin.phoneNumber = createAdminDto.phoneNumber;
    newAdmin.gender = createAdminDto.gender;
    newAdmin.dateOfBirth = createAdminDto.dateOfBirth;
    newAdmin.password = hashedPassword;

    return newAdmin;
  }

  updateAdmin(updateAdminDto: UpdateAdminDto) {
    const newAdmin = new Admin();

    newAdmin.name = updateAdminDto.name && updateAdminDto.name;
    newAdmin.email = updateAdminDto.email && updateAdminDto.email;
    newAdmin.countryCode =
      updateAdminDto.countryCode && updateAdminDto.countryCode;
    newAdmin.phoneNumber =
      updateAdminDto.phoneNumber && updateAdminDto.phoneNumber;
    newAdmin.gender = updateAdminDto.gender && updateAdminDto.gender;
    newAdmin.dateOfBirth =
      updateAdminDto.dateOfBirth && updateAdminDto.dateOfBirth;

    return newAdmin;
  }
}
