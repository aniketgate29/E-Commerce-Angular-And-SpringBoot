import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerUrl } from '../../Services/ServerUrl';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {
  private apiUrl = ServerUrl;
  catagoryName: string = '';
  description: string = '';
  categories: any[] = []; 
  
  constructor(private http:HttpClient,private router:Router ) { 
    this.getAllCategory();
  }
  
  async getAllCategory() {
    try {
      const data = await this.http.get<any[]>(`${this.apiUrl}/categories`).toPromise();
      this.categories = data || [];
      console.log(this.categories);
    } catch (error) {
      console.log(error);
    }
  }

  async addCategory() {
    const category = { name: this.catagoryName  , description: this.description };
    const res = await this.http.post(`${this.apiUrl}/category`, category).toPromise();
    this.catagoryName = '';
    this.description = '';
    alert("category is added");
    this.getAllCategory();
  }

  async deleteCategory(category: any): Promise<void> {
    const index = this.categories.indexOf(category);
    this.categories.splice(index, 1);
    await this.http.delete(`${this.apiUrl}/category/${category.category_id}`).toPromise();
    alert("Category deleted successfully");
    this.getAllCategory();  
}

}

