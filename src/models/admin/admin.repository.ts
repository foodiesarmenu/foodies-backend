import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Admin, AdminDocument } from './admin.schema';

export class AdminRepository extends AbstractRepository<Admin> {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {
    super(adminModel);
  }
}
