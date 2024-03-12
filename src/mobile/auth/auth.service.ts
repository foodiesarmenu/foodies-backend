import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { ClientRepository } from 'src/models';
import { Client } from '../client/entities/client.entity';

import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { message } from 'src/common/constants/message.constant';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private clientRepository: ClientRepository,
  ) { }

  private readonly logger = new Logger(AuthService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  public async validateClient(email: string, pass: string): Promise<any> {
    const user = await this.clientRepository.getOne({ email });
    if (user && bcrypt.compareSync(pass, user.password)) {
      return { ...omit(user, ['password']) };
    }

    return null;
  }



  public login(user: Express.User) {
    try {
      const { email, _id, phoneNumber, countryCode, type } = user as Client;
      const payload = {
        _id,
        email,
        countryCode,
        phoneNumber,
        type
      };
      return {
        user: payload,
        accessToken: this.signJwt(payload),
      };
    } catch (error) {
      this.handleError(error)
    }
  }

  public signJwt(payload: any) {
    return this.jwtService.sign(payload);
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: string) {
    try {


      if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
        throw new BadRequestException(message.user.PasswordNotMatch)
      }

      const user = await this.clientRepository.getOne({ _id: userId });

      if (!user) {
        throw new ConflictException(message.user.NotFound);
      }

      if (!bcrypt.compareSync(changePasswordDto.currentPassword, user.password)) {
        throw new ConflictException(message.user.InvalidPassword);
      }

      const hashedPassword = bcrypt.hashSync(changePasswordDto.newPassword, 10);
      const updatedUser = await this.clientRepository.update(
        { _id: userId },
        { password: hashedPassword },
        { new: true }
      );
      console.log(updatedUser, 'updatedUser');

      return updatedUser;
    } catch (error: any) {
      this.handleError(error);
    }
  }


}
