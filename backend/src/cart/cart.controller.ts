import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  userId = 1;

  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() body: { productId: number; quantity: number }) {
    if (!body.productId || !body.quantity) {
      throw new BadRequestException('ProductId and Quantity are required');
    }

    return this.cartService.addToCart(
      this.userId,
      body.productId,
      body.quantity,
    );
  }

  @Get()
  async getCart() {
    const cart = await this.cartService.getCart(this.userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  @Put(':cartId/item/:productId')
  async updateCartItem(
    @Body() body: { quantity: number },
    @Param('productId') productId: string,
  ) {
    if (!body.quantity || body.quantity <= 0) {
      throw new BadRequestException('ProductId and Quantity are required');
    }

    return this.cartService.updateCartItemQuantity(
      this.userId,
      Number(productId),
      body.quantity,
    );
  }
}
