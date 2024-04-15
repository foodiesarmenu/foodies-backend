import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateCouponeDto, UpdateCouponeDto } from '../dtos';
import { Coupone } from '../entities/coupone.entity';
import { Coupon } from 'src/models';

@Injectable()
export class CouponeFactoryService {
  async createNewCoupone(createCouponeDto: CreateCouponeDto) {
    const newCoupone = new Coupon();

    newCoupone.code = createCouponeDto.code;
    newCoupone.expires = createCouponeDto.expires;
    newCoupone.discount = createCouponeDto.descount;


    return newCoupone;
  }

  updateCoupone(updateCouponetDto: UpdateCouponeDto) {
    const newCoupone = new Coupon();

    newCoupone.code = updateCouponetDto.code && updateCouponetDto.code;
    newCoupone.discount = updateCouponetDto.descount && updateCouponetDto.descount;
    newCoupone.expires =
      updateCouponetDto.expires && updateCouponetDto.expires;


    return newCoupone;
  }
}
