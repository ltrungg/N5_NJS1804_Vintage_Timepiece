import { Controller, Post, Get, Param, Req, Res, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request, Response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-to-cart/:productId')
  async addToCart(@Req() request: Request, @Res() response: Response, @Param('productId') productId: string, @Body() body: { quantity: number }) {
    const user = request['user'];
    const quantity = parseInt(body.quantity.toString(), 10);

    if (user) {
      await this.cartService.addToCart(user.id, productId, quantity);
      return response.redirect(`/viewDetailProduct/${productId}?message=Successful`);
    } else {
      response.status(401).send('Unauthorized');
    }
  }

  @Get('viewCart')
  async viewCart(@Req() request: Request, @Res() response: Response) {
    const user = request['user'];
    if (user) {
      const cart = await this.cartService.getCart(user.id);
      response.render('viewCart', { cart });
    } else {
      response.status(401).send('Unauthorized');
    }
  }

  @Post('remove-from-cart/:productId')
  async removeFromCart(@Req() request: Request, @Res() response: Response, @Param('productId') productId: string) {
    const user = request['user'];
    if (user) {
      await this.cartService.removeFromCart(user.id, productId);
      response.redirect('/cart');
    } else {
      response.status(401).send('Unauthorized');
    }
  }
  @Post('update-quantity/:productId')
  async updateQuantity(@Req() request: Request, @Res() response: Response, @Param('productId') productId: string, @Body() body: { quantity: number }) {
    const user = request['user'];
    if (user) {
      await this.cartService.updateQuantity(user.id, productId, body.quantity);
      response.status(200).send();
    } else {
      response.status(401).send('Unauthorized');
    }
  }
}
