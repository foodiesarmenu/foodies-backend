import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { User, UserDocument } from './user.schema';

export class UserRepository extends AbstractRepository<User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    
    super(userModel);
  }
}
