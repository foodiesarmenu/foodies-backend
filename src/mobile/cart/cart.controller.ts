import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from 'src/models/cart/cart.schema';


@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Cart> {
        return this.cartService.getById(id);
    }

    @Post('createCart')
    async add(@Body() cart: Cart): Promise<Cart> {
        return this.cartService.add(cart);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Cart> {
        return this.cartService.delete(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedCart: Partial<Cart>): Promise<Cart> {
        return this.cartService.update(id, updatedCart);
    }
}
