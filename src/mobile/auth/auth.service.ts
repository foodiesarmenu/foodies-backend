import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { ClientRepository } from 'src/models';
import { Client } from '../client/entities/client.entity';

import { ChangePasswordDto } from './dto/ChangePasswordDto';

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

  async changePassword(user: Client, changePasswordDto: ChangePasswordDto) {
    try {
      const userId = user._id;      
      const { currentPassword, newPassword } = changePasswordDto;
      const userFromDb = await this.clientRepository.getOne(userId);
      if (!userFromDb) {
        throw new Error('User not found');
      }
      if (!bcrypt.compareSync(currentPassword, userFromDb.password)) {
        throw new Error('Current password is incorrect');
      }
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      await this.clientRepository.update({ _id: userId }, { password: hashedNewPassword }, {});
      return { message: 'Password changed successfully' };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
