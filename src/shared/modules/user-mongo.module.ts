import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientRepository, ClientSchema, User, UserSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: Client.name, schema: ClientSchema },
        ],
      },

    ]),
  ]
  ,
  providers: [ClientRepository],
  exports: [ClientRepository],
})
export class UserMongoModule { }
