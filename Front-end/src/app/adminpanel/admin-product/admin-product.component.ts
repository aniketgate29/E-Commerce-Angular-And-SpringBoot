import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerUrl } from '../../Services/ServerUrl';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'] // Corrected to `styleUrls`
})
export class AdminProductComponent {
  private apiUrl = ServerUrl
  categories: any[] = [];
  ProductData = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productCategory: '',
    productImage: '',
    verient: '',
    productquantities: 0
  };
  
  productList: any[] = [];
  selectedFile: File | null = null;
  
  // Properties to track edit mode
  isEditMode: boolean = false;
  currentProductIndex: number | null = null;
constructor(private http: HttpClient, private productService: ProductService, private router: Router) {
  this.getCategories();
  this.getProducts();
}

async getCategories() {
  try {
    const data = await this.http.get<any[]>(`${this.apiUrl}/categories`).toPromise();
    this.categories = data|| [];
    console.log(this.categories);
  } catch (error) {
    console.log(error);
  }
}

async getProducts() { 
  try {
    const data = await this.http.get<any[]>(`${this.apiUrl}/products`).toPromise();
    this.productList = data || [];
    console.log(this.productList);
  } catch (error) {
    console.log(error);
  }
}

async onSubmit() {
  if (!this.ProductData.productName || !this.ProductData.productDescription || !this.ProductData.productPrice || !this.ProductData.productCategory || (!this.selectedFile && !this.isEditMode)) {
    alert('Please fill all fields');
    return ; // Exit the function if any required field is empty
  }

  const  product = {
    name:this.ProductData.productName,
    description: this.ProductData.productDescription,
    price: this.ProductData.productPrice,
    category: this.ProductData.productCategory,
    image: this.selectedFile ? URL.createObjectURL(this.selectedFile):'',
    quantity: 1,
    quantities: this.ProductData.productquantities  ,
    verient: this.ProductData.verient   
  };

  if (this.isEditMode && this.currentProductIndex !== null) {
    try {
      await this.productService.updateProduct(this.productList[this.currentProductIndex].id, product).toPromise();
      this.isEditMode = false;
      this.currentProductIndex = null;
      this.onCancel();
      this.getProducts();
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await this.productService.addProduct(product).toPromise();
      this.onCancel();
      this.getProducts();
      alert("Product Added Successfully")
    } catch (error) {
      console.log(error);
    }
  }
}

async onFileSelected(event: any) {
  try {
    this.selectedFile = event.target.files[0];
  } catch (error) {
    console.log(error);
  }
}

async onCancel() {
  // Implement cancel logic here
  this.ProductData.productName = '';
  this.ProductData.productDescription = '';
  this.ProductData.productPrice = 0;
  this.ProductData.productCategory = '';
  this.ProductData.productImage = '';
  this.ProductData.productquantities = 0;
  this.ProductData.verient = '';
  this.selectedFile = null;

  this.isEditMode = false;
  this.currentProductIndex = null;

  console.log('Cancel clicked');
}

async editProduct(product: any) {  
  this.currentProductIndex = this.productList.indexOf(product);
  this.ProductData.productName = product.name;
  this.ProductData.productDescription = product.description;
  this.ProductData.productPrice = product.price;
  this.ProductData.productquantities = product.quantities;
  this.ProductData.productCategory = product.category;
  this.ProductData.verient = product.verient;
  this.isEditMode = true;

  console.log('Edit clicked');
}

async deleteProduct(product: any) {
  
  const index = this.productList.indexOf(product);
  this.productList.splice(index, 1);
  
  try {
    await this.productService.deleteProduct(product.id).toPromise();
  } catch (error) {
    console.log(error);
  }
  
  //this.getProducts();
  //this.productList.slice(this.productList.indexOf(product), 1); // Remove the deleted product from the productList(product);
  
  alert("Product deleted successfully");
  
}

}
