import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerUrl } from '../../Services/ServerUrl';

@Component({
  selector: 'app-admin-coupon',
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.css']
})
export class AdminCouponComponent {
  couponName: string = '';
  discount: number = 0;
  coupons: any[] = [];
  private apiUrl = ServerUrl

  constructor(private http: HttpClient, private router: Router) { 
    this.getAllCoupons();
  }

  async getAllCoupons() {
    const data = await this.http.get<any[]>(`${this.apiUrl}/coupon/all`).toPromise();
    this.coupons = data || [];
    console.log(this.coupons);
  }

  async addCoupon() {
    const coupon = { 
      name: this.couponName, 
      discount: this.discount };

    await this.http.post(`${this.apiUrl}/coupon/create`, coupon).toPromise();
    this.couponName = '';
    this.discount = 0;
    alert("Coupon is added");
    this.getAllCoupons();
  }

  async deleteCoupon(coupon: any): Promise<void> {
    const index = this.coupons.indexOf(coupon);
    this.coupons.splice(index, 1);
    console.log(coupon.coupon_id);
    await this.http.delete(`${this.apiUrl}/coupon/delete/${coupon.coupon_id}`).toPromise();
    alert("Category deleted successfully");
    this.getAllCoupons();
  }
}