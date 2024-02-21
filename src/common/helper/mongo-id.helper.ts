import { BadRequestException } from '@nestjs/common';
import { isArray } from 'lodash';
import mongoose from 'mongoose';

export function toMongoObjectId({
  value,
  key,
}): mongoose.Types.ObjectId | mongoose.Types.ObjectId[] {
  if (isArray(value)) {
    const arr: mongoose.Types.ObjectId[] = [];

    for (const i in value) {
      const newId = toMongoObjectId({ value: value[i], key });
      arr.push(newId as mongoose.Types.ObjectId);
    }

    return arr;
  }
  if (
    mongoose.Types.ObjectId.isValid(value) &&
    new mongoose.Types.ObjectId(value).toString() === value
  ) {
    return new mongoose.Types.ObjectId(value);
  } else {
    throw new BadRequestException(`${key} must be a valid mongo id`);
  }
}
