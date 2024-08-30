import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order.model';
import { ServerUrl } from './ServerUrl';

export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  todayOrders: number;
  todaySales: number;
  totalProducts: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = ServerUrl;

  constructor(private http: HttpClient) { }

  
  getTodayOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/today`);
  }

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/dashboard`);
  }

}
