// src/app/my-account/my-account.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import { ServerUrl } from '../../Services/ServerUrl';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  private apiUrl = ServerUrl;


  editedCustomerData = {
    first_name: 'John',
    last_name: 'Doe',
    sociaty_name: 'Sample Society',
    flat_no: '123',
    wing_name: 'A',
    area: 'Pune',
    email: 'john@example.com',
    mobile: '1234567890'
  };
  areas: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.loadCustomerData();
    this.loadAreas();
  }

  loadCustomerData() {
    const userData = this.authService.getUserData();
    if (userData) {
      this.editedCustomerData = userData;
    } else {
      console.error('No user data available');
    }
  }

  async updateCustomerDetails() {
    try {
      const updatedData = await this.http.put(`${this.apiUrl}/user/${this.editedCustomerData.mobile}`, this.editedCustomerData).toPromise();
      alert('Customer details updated successfully');
      console.log('Customer details updated:', updatedData);
    } catch (error) {
      console.error('Error updating customer details:', error);
    }
  }

  async loadAreas() {
    try {
      const areasData = await this.http.get<any[]>(`${this.apiUrl}/areas`).toPromise();
      this.areas = areasData || [];
    } catch (error) {
      console.error('Error loading areas:', error);
    }
  }
}
