import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { UserRepository } from 'src/models';
import { CreateUserDto } from './dto/registeration.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) { }

  private readonly logger = new Logger(AuthService.name);

  public async validateAdmin(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.getOne({ email });
    if (user && bcrypt.compareSync(pass, user.password)) {
      return { ...omit(user, ['password']) };
    }

    return null;
  }


  public async register(createUserDto: CreateUserDto) {

    try {
      const isExist = await this.userRepository.exists({ email: createUserDto.email });

      if (isExist) throw new ConflictException()

      const user = await this.userRepository.create(createUserDto);

      return omit(user, ['password']) as unknown as User;



    } catch (error) {
      throw error
    }
  }

  public login(user: Express.User) {
    try {
      const { email, _id, phoneNumber, countryCode, type } = user as User;
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
      this.logger.error(error);
      throw error;
    }
  }

  public signJwt(payload) {
    return this.jwtService.sign(payload);
  }
}
