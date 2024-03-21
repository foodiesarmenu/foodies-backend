import {
    BadRequestException,
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { FindAllQuery } from 'src/common';
import { message } from 'src/common/constants/message.constant';
import { Category } from 'src/models/category/category.schema';
import { CartRepository } from 'src/models/cart/cart.reposotory';
import { Cart } from 'src/models/cart/cart.schema';


@Injectable()
export class CartService {
    constructor(private cartRepository: CartRepository) { }

    private readonly logger = new Logger(CartService.name);


    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }
    public async create(cart: Cart) {
        try {
            const exist = await this.cartRepository.exists({
                name: cart._id
            });
            if (exist) {
                throw new ConflictException(message.cart.AlreadyExists);
            }
            const createCart = await this.cartRepository.create(cart);
            if (!createCart) {
                throw new BadRequestException(message.category.FailedToCreate);
            }
            return createCart;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async getOne(cartId: string) {
        try {
            const cart = await this.cartRepository.getOne(
                {
                    _id: cartId,
                    isDeleted: false
                }
            );
            if (!cart) {
                throw new BadRequestException(message.category.NotFound);
            }
            return cart;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async update(cartId: string, category: Category) {
        try {
            const isExist = await this.cartRepository.exists({
                _id: cartId
            });
            if (!isExist) throw new NotFoundException(message.category.NotFound);
            const cartUpdated = await this.cartRepository.update(
                { _id: cartId },
                category,
                { new: true },
            );
            return cartUpdated;
        }
        catch (error) {
            this.handleError(error);
        }
    }

    public async delete(cartId: string) {
        try {
            const isExist = await this.cartRepository.exists({
                _id: cartId
            });

            if (!isExist) throw new NotFoundException(message.category.NotFound);

            const cartDeleted = await this.cartRepository.update(
                { _id: cartId },
                { isDeleted: true },
                { new: true },
            );

            return cartDeleted;
        }
        catch (error) {
            this.handleError(error);
        }
    }

}
