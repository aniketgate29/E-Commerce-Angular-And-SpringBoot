import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
interface Order {
  id: number;
  customer: string;
  date: string;
  product: string; // New field
  quantity: number; // New field
  price: string; // New field
  total: string;
  area: string; // New field
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getOrders(): Observable<Order[]> {
    // Mock order data with additional fields
    const orders: Order[] = [
      { id: 1, customer: 'John Doe', date: '2024-05-01', product: 'Widget', quantity: 2, price: '$25', total: '$50', area: 'North', status: 'Completed' },
      { id: 2, customer: 'Jane Smith', date: '2024-05-03', product: 'Gadget', quantity: 1, price: '$50', total: '$50', area: 'South', status: 'Pending' },
      { id: 3, customer: 'Bob Johnson', date: '2024-05-04', product: 'Tool', quantity: 3, price: '$30', total: '$90', area: 'East', status: 'Canceled' },
      { id: 4, customer: 'Alice Brown', date: '2024-05-05', product: 'Gear', quantity: 1, price: '$150', total: '$150', area: 'West', status: 'Completed' },
      { id: 5, customer: 'Charlie Black', date: '2024-05-06', product: 'Machine', quantity: 2, price: '$90', total: '$180', area: 'Central', status: 'Pending' },
    ];
    return of(orders);
  }
}