import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateResponse, FindAllQuery, FindAllResponse, FindOneResponse, RemoveResponse, Role, Roles, UpdateResponse, swagger } from "src/common";
import { CartService } from "./cart.service";
import { CreateCartDTO } from "./dto/cart-dto";
import { Cart } from "src/models/cart/cart.schema";
import { CartFactoryService } from "./factory/cart.factory";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";

@Roles(Role.Client)
@ApiTags(swagger.MobileCart)
@Controller('mobile/cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        private readonly cartFactoryService: CartFactoryService,
    ) { }


    @ApiOperation({ summary: 'Add Meal To Cart' })
    @Post()
    async create(
        @Body() createNewCartDTO: CreateCartDTO,
        @Request() req: Express.Request,
    ) {
        const createCartResponse = new CreateResponse<Cart>();
        try {
            const cart = await this.cartFactoryService.createNewCart(createNewCartDTO, req.user['_id']);

            const createdCart = await this.cartService.addMealToCart(cart);
            createCartResponse.success = true;
            createCartResponse.data = cart;
        } catch (error) {
            createCartResponse.success = false;
            throw error;
        }
        return createCartResponse;
    }


    @ApiOperation({ summary: 'Get Cart' })
    @Get()
    async get(
        @Request() req: Express.Request,
    ) {
        const findCartResponse = new FindOneResponse<Cart>();
        try {
            const cart = await this.cartService.getCart(req.user['_id']);
            console.log(cart);

            findCartResponse.success = true;
            findCartResponse.data = cart;
        } catch (error) {
            findCartResponse.success = false;
            throw error;
        }
        return findCartResponse;
    }

    @ApiOperation({ summary: 'Remove Meal From Cart' })
    @Delete(':cartId')
    async delete(
        @Param('cartId') cartId: string,
        @Request() req: Express.Request,
    ) {
        const deleteCartResponse = new RemoveResponse();
        try {
            await this.cartService.removeMealFromCart(cartId, req.user['_id']);

            deleteCartResponse.success = true;

        } catch (error) {
            deleteCartResponse.success = false;
            throw error;
        }
        return deleteCartResponse;
    }

    @ApiOperation({ summary: 'Delete Cart' })
    @Delete()
    async deleteCart(
        @Request() req: Express.Request,
    ) {
        const deleteCartResponse = new RemoveResponse();
        try {
            await this.cartService.deleteCart(req.user['_id']);
            deleteCartResponse.success = true;

        } catch (error) {
            deleteCartResponse.success = false;
            throw error;
        }
        return deleteCartResponse;
    }
}




