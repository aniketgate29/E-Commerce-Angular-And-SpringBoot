import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from './orders.model';
import { OrderItemDto } from './order-item-dto.model';
import { OrderDetailsDto } from './order-details-dto.model';
import { ServerUrl } from './ServerUrl';
import { Order } from './order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = ServerUrl; // Assuming your API is served from the same domain

  constructor(private http: HttpClient) { }
  getOrders(){

    return this.http.get<Orders[]>(`${this.baseUrl}/all`);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${orderId}`);
  }

  updateOrder(orderId: number, orderItemDtos: OrderItemDto[]): Observable<Orders> {
    return this.http.post<Orders>(`${this.baseUrl}/update/${orderId}`, orderItemDtos);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/all`);
  }
  

  getOrdersByUser(mobileNumber: string): Observable<OrderDetailsDto[]> {
    return this.http.get<OrderDetailsDto[]>(`${this.baseUrl}/user/${mobileNumber}`);
  }

  
  
}
