import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminRepository, AdminSchema, Client, ClientRepository, ClientSchema, User, UserSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: Client.name, schema: ClientSchema },
          { name: Admin.name, schema: AdminSchema }
        ],
      },

    ]),
  ]
  ,
  providers: [ClientRepository, AdminRepository],
  exports: [ClientRepository, AdminRepository],
})
export class UserMongoModule { }
