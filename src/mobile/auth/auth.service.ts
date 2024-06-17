import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { ClientRepository } from 'src/models';
import { Client } from '../client/entities/client.entity';

import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { message } from 'src/common/constants/message.constant';
import { EmailService } from 'src/common/email/sendEmail';
import { ChangePasswordDto } from './dto/ChangePasswordDto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private clientRepository: ClientRepository,
    private emailService: EmailService
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
      const { email, _id, name, phoneNumber, countryCode, type } = user as Client;
      const payload = {
        _id,
        name,
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

  async resetPassword(resetPasswordDto: ResetPasswordDto, userId: string) {
    try {


      if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
        throw new BadRequestException(message.user.PasswordNotMatch)
      }

      const user = await this.clientRepository.getOne({ _id: userId });

      if (!user) {
        throw new ConflictException(message.user.NotFound);
      }

      if (!bcrypt.compareSync(resetPasswordDto.currentPassword, user.password)) {
        throw new ConflictException(message.user.InvalidPassword);
      }

      const hashedPassword = bcrypt.hashSync(resetPasswordDto.newPassword, 10);
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


  async forgetPassword(email: string) {
    try {
      const user = await this.clientRepository.exists({ email });

      if (!user) {
        throw new ConflictException(message.user.NotFound);
      }
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      await this.emailService.sendEmail({
        email,
        code
      });

      await this.clientRepository.update({
        email
      }, {
        emailCode: code
      }, {
        new: true
      });

    } catch (error: any) {
      this.handleError(error);
    }
  }

  async verifyOTP(email: string, code: string) {
    try {
      const user = await this.clientRepository.getOne({ email });
      if (user.emailCode !== code) {
        throw new ConflictException(message.user.InvalidCode);
      }
      await this.clientRepository.update({
        email
      }, {
        emailCode: null
      }, {
        new: true
      });

    } catch (error: any) {
      this.handleError(error);
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, email: string) {
    try {
      console.log(changePasswordDto, 'changePasswordDto', email, 'email');

      if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
        throw new BadRequestException(message.user.PasswordNotMatch)
      }

      const user = await this.clientRepository.getOne({ email });

      if (!user) {
        throw new ConflictException(message.user.NotFound);
      }

      const hashedPassword = bcrypt.hashSync(changePasswordDto.newPassword, 10);
      const updatedUser = await this.clientRepository.update(
        { email },
        { password: hashedPassword },
        { new: true }
      );

      return updatedUser;
    } catch (error: any) {
      this.handleError(error);
    }
  }
}
