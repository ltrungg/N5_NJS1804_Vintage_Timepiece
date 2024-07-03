import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from 'src/entities/cart.entity';


@Injectable()
export class CartService {
  private carts: Map<string, Cart> = new Map();

  async addToCart(userId: string, productId: string, quantity: number): Promise<void> {
    let cart = this.carts.get(userId);
    if (!cart) {
      cart = { userId, items: [] };
      this.carts.set(userId, cart);
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = { productId, quantity };
      cart.items.push(newItem);
    }
  }

  async getCart(userId: string): Promise<Cart> {
    return this.carts.get(userId) || { userId, items: [] };
  }

  async removeFromCart(userId: string, productId: string): Promise<void> {
    const cart = this.carts.get(userId);
    if (cart) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    }
  }
  async updateQuantity(userId: string, productId: string, quantity: number): Promise<void> {
    const cart = this.carts.get(userId);
    if (cart) {
      const existingItem = cart.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    }
  }
}
