import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { Restaurant, RestaurantRepository } from 'src/models';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private restaurantRepository: RestaurantRepository,
  ) { }

  private readonly logger = new Logger(AuthService.name);


  handleError(error: any) {
    this.logger.error(error);
    throw error;
  }

  public async validateVendor(email: string, pass: string): Promise<any> {
    const user = await this.restaurantRepository.getOne({ email });
    if (user && bcrypt.compareSync(pass, user.password)) {
      return { ...omit(user, ['password']) };
    }

    return null;
  }



  public login(vendor: Express.User) {
    try {
      const { _id, email, address, phoneNumber, type } = vendor as Restaurant;
      const payload = {
        _id,
        email,
        phoneNumber,
        address,
        type
      };
      return {
        vendor: payload,
        accessToken: this.signJwt(payload),
      };
    } catch (error) {
      this.handleError(error)
    }
  }

  public signJwt(payload: any) {
    return this.jwtService.sign(payload);
  }
}
