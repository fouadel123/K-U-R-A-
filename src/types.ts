import { Product } from './data/products';

export interface CartItem {
  cartId: string;
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  paymentMethod: 'card' | 'apple_pay' | 'cod';
}

export interface ConfirmedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: OrderCustomer;
  estimatedDelivery: string;
}
