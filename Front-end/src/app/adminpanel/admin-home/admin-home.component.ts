import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  areas: string[] = ['North', 'South', 'East', 'West'];
  productList: any[] = [
    { productName: 'Product 1', productPrice: 100 },
    { productName: 'Product 2', productPrice: 200 },
    { productName: 'Product 3', productPrice: 300 }
  ];
  orders: any[] = [
    { id: '#123', customerName: 'John Doe', productName: 'Product 1', quantity: 5, price: 100, total: 500, area: 'North' },
    { id: '#124', customerName: 'Jane Smith', productName: 'Product 2', quantity: 3, price: 200, total: 600, area: 'South' },
    { id: '#125', customerName: 'Michael Johnson', productName: 'Product 3', quantity: 2, price: 300, total: 600, area: 'East' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
