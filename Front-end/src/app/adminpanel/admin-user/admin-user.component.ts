import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { OrderService } from '../../Services/order.service';
import { DashboardService } from '../../Services/dashboard.service';

export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  todayOrders: number;
  todaySales: number;
  totalProducts: number;
}
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {
 
  dashboardData: DashboardData | null = null;
  user:any[] = [];

  constructor(private dashboardService: DashboardService,private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.dashboardService.getDashboardData().subscribe((data: DashboardData) => {
      this.dashboardData = data  ;
    });

    this.userService.getTotalUsers().subscribe((data: any[]) => {
      this.user = data;
    });
  
  }

}
