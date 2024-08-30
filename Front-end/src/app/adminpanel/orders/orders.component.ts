import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { Order } from '../../Services/order.model';
import { HttpClient } from '@angular/common/http';
import { ServerUrl } from '../../Services/ServerUrl';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  customerNames: string[] = [];
  private api=ServerUrl;

  constructor(private orderService: OrderService,private http:HttpClient) {}

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders(): void {
    this.http.get<Order[]>(`${this.api}/orders/all`).subscribe(
      (data: Order[]) => {
        this.orders = data;
        this.filteredOrders = this.orders;
        this.customerNames = this.getUniqueCustomerNames(this.orders);
        console.log(this.orders);
      },
      error => {
        console.error('Error fetching orders', error);
      }
    );
  }

  filterOrders(): void {
    const selectedArea = (document.getElementById('areaFilter') as HTMLSelectElement).value;
    if (selectedArea === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.area === selectedArea);
    }
  }

  getUniqueCustomerNames(orders: Order[]): string[] {
    return [...new Set(orders.map(order => `${order.user.first_name} ${order.user.last_name}`))];
  }
}
