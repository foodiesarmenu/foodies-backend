import mongoose from 'mongoose';

export class Coupone {
  readonly _id?: mongoose.Types.ObjectId;
  code: string;
  expires: string;
  descount?: string
}
