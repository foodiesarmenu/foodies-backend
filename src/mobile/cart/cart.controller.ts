import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateResponse, FindAllQuery, FindAllResponse, FindOneResponse, RemoveResponse, Role, Roles, UpdateResponse, swagger } from "src/common";
import { CartService } from "./cart.service";
import { CreateCartDTO, UpdateCartDto } from "./dto/cart-dto";
import { Cart } from "src/models/cart/cart.schema";
import { CartFactoryService } from "./factory/cart.factory";

@Roles(Role.ADMIN)
@ApiTags(swagger.AdminCategory)
@Controller('mobile/cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        private readonly cartFactoryService: CartFactoryService,
    ) { }
    @ApiOperation({ summary: 'add new category' })
    @Post()
    async create(@Body() createNewCartDTO: CreateCartDTO) {
        const createCartResponse = new CreateResponse<Cart>();
        try {
            const cart = await this.cartFactoryService.createNewCart(createNewCartDTO);
            createCartResponse.success = true;
            createCartResponse.data = cart;
        } catch (error) {
            createCartResponse.success = false;
            throw error;
        }
        return createCartResponse;
    }

    @ApiOperation({ summary: 'Get cart' })
    @Get(':cartId')
    async getOne(@Param('cartId') cartId: string) {
        const getOneCartResponse = new FindOneResponse<Cart>();
        try {
            const category = await this.cartService.getOne(cartId);
            getOneCartResponse.success = true;
            getOneCartResponse.data = category;
        } catch (error) {
            getOneCartResponse.success = false;
            throw error;
        }
        return getOneCartResponse;
    }
    // async update(
    //     @Body() updateCartDto: UpdateCartDto,
    //     @Param('cartId') cartId: string,
    // ) {
    //     const updateCartResponce = new UpdateResponse<Cart>(); 
    //     try {
    //         const cartUpdate = await this.cartService.update(
    //             cartId,
    //             updateCartDto, 
    //         );
    //             updateCartResponce.success = true;
    //         updateCartResponce.data = cartUpdate;
    //     } catch (error) {
    //         updateCartResponce.success = false;
    //         throw error;
    //     }
    //     return updateCartResponce;
    // }
    
    @ApiOperation({ summary: 'Delete category' })
    @Delete(':cartId')
    async delete(@Param('cartId') cartId: string) {
        const deleteCartResponse = new RemoveResponse();
        try {
            await this.cartService.delete(cartId);

            deleteCartResponse.success = true;
        } catch (error) {
            deleteCartResponse.success = false;
            throw error;
        }
        return deleteCartResponse;
    }
}




