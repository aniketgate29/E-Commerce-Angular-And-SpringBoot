import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { DashboardService } from '../../Services/dashboard.service';
import { Order } from '../../Services/order.model';
import { HttpClient } from '@angular/common/http';
import { ServerUrl } from '../../Services/ServerUrl';
import { AuthService } from '../../Services/auth.service';

export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  todayOrders: number;
  todaySales: number;
  totalProducts: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private apiUrl = ServerUrl
  orders: Order[] = [];
  dashboardData: DashboardData | null = null;
  areas: any[] =  [];
  selectedArea: string = 'All Area'; 
  filteredOrders: Order[] = [];
  constructor(private orderService: OrderService,private dashboardService: DashboardService,private http:HttpClient,private authService: AuthService) {
    this.getAllArea();
    this.fetchTodayOrders();
    this.fetchDashboardData();
  }

  ngOnInit(): void {
    this.fetchTodayOrders();
    this.fetchDashboardData();
  
  }

  async getAllArea(){ 
    const data = await this.http.get<any[]>(`${this.apiUrl}/areas`).toPromise();
    this.areas=data || [];
    console.log(this.areas);
  }
  fetchDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe((data: DashboardData) => {
      this.dashboardData = data  ;
      console.log(this.dashboardData);
    });
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'Pending':
        return 'pending-status';
      case 'Canceled':
        return 'canceled-status';
      case 'Completed':
        return 'completed-status';
      default:
        return '';
    }
  }

  fetchTodayOrders(): void {
    this.dashboardService.getTodayOrders().subscribe((data: Order[]) => {
      this.orders = data;
      this.filteredOrders = this.orders; 
    });
  }
  applyFilter(): void {
    if(this.selectedArea=="All Area"){
      this.filteredOrders = this.orders; // If no area is selected, show all orders
    }
    else if (this.selectedArea ) {
      this.filteredOrders = this.orders.filter(order => order.area == this.selectedArea);
    } else {
      this.filteredOrders = this.orders; // If no area is selected, show all orders
    }
  }


  logout(): void {
    // Implement logout functionality here 
       this.authService.logout();
   }
}
