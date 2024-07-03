import { Request, Response } from 'express';

export function getCartFromCookie(req: Request): any[] {
  const cookie = req.cookies['cart'];
  return cookie ? JSON.parse(cookie) : [];
}

export function getCookieByName(req: Request, name: string): string | undefined {
  const cookies = req.cookies;
  return cookies ? cookies[name] : undefined;
}

export function saveCartToCookie(cart: any[], res: Response) {
  const cartString = convertCartToString(cart);
  res.cookie('cart', cartString, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
}

export function convertCartToString(cart: any[]): string {
  return JSON.stringify(cart);
}
