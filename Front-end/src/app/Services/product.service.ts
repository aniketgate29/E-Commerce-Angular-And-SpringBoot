import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerUrl } from './ServerUrl';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:any[] = [];
  private apiUrl = ServerUrl;


  constructor(private http: HttpClient) {
  }
  addProduct(product: any) {
    return this.http.post(`${this.apiUrl}/product`, product);
    alert("product added successfully"+product.name);
    console.log(product);
  }
  getProducts(){
  this.http.get<any[]>(`${this.apiUrl}/products`).subscribe(data => {
    this.products = data;
  });
  }
 
  getProductsByCategory(categoryname: String): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/category/${categoryname}`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/product/${id}`);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.apiUrl}/product/${id}`, product);
  }

}