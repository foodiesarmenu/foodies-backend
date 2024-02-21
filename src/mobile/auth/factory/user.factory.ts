import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/registeration.dto';

@Injectable()
export class UserFactoryService {
  async createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.countryCode = createUserDto.countryCode;
    newUser.phoneNumber = createUserDto.phoneNumber;
    newUser.gender = createUserDto.gender;
    newUser.dateOfBirth = createUserDto.dateOfBirth;
    newUser.password = hashedPassword;
    newUser.isEmailVerified = createUserDto.isEmailVerified;
    newUser.isPhoneVerified = createUserDto.isPhoneVerified;

    return newUser;
  }
}
