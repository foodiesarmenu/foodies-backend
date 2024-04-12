import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) { }

  private readonly logger = new Logger(AuthService.name);

  public async validateAdmin(email: string, pass: string): Promise<any> {
    const user = await this.adminService.findOne(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return { ...omit(user, ['password']) };
    }

    return null;
  }

  public login(user: Express.User) {
    try {
      const { name, email, _id, phoneNumber, countryCode, type, image } = user as Admin;
      const payload = {
        name,
        _id,
        image,
        email,
        countryCode,
        phoneNumber,
        type,
      };
      return {
        user: payload,
        accessToken: this.signJwt(payload),
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public signJwt(payload) {
    return this.jwtService.sign(payload);
  }
}
