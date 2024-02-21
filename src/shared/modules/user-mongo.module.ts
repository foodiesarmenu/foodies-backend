import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserRepository, UserSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ]
  ,
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserMongoModule { }
