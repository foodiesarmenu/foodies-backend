import { Injectable } from "@nestjs/common";
import { Order } from "src/models";
import { CreateOrderDto } from "../dto";
import { Types } from "mongoose";

@Injectable()
export class OrderFactoryService {
    async createNewOrder(createOrderDto: CreateOrderDto, userId: Types.ObjectId) {

        const createOrder = new Order();
        createOrder.userId = userId;
        createOrder.deliveryAddress = createOrderDto.deliveryAddress;
        return createOrder;

    }
}
