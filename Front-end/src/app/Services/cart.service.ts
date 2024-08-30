import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
  id: number;
  name: string;
  verient: string;
  price: number;
  category: string;
  image: string;
  description: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private buyItemsSubject = new BehaviorSubject<Product[]>([]);
  buyItems$ = this.buyItemsSubject.asObservable();

  constructor() { }

  addToCart(item: Product) {
    const currentItems = this.cartItemsSubject.getValue();
    const existingItem = currentItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }
    this.cartItemsSubject.next(currentItems);
  }

  deleteFromCart(product: Product) {
    console.log('Deleting from cart:', product.name);
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item !== product);
    this.cartItemsSubject.next(updatedItems);
  }

  buyNow(product: Product) {
    const currentItems = this.buyItemsSubject.getValue();
    const existingItem = currentItems.find(i => i.name === product.name);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      currentItems.push(product);
    }
    this.buyItemsSubject.next(currentItems);
  }

  deleteFromBuy(product: Product) {
    const currentItems = this.buyItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item !== product);
    this.buyItemsSubject.next(updatedItems);
  }

}

