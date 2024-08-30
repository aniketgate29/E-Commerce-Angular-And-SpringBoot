import { Component, Renderer2, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { HttpClient } from '@angular/common/http';
import { ServerUrl } from '../../Services/ServerUrl';

interface Product {
  id: number;
  name: string;
  verient: string;
  price: number;
  category: string;
  image: string;
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  products: Product[] = [];
  selectedQuantity: number = 1;
  selectedCategory: string = '';
  isMobile: boolean = true;

  apiUrl = ServerUrl;

  constructor(private http: HttpClient, private cartService: CartService, private renderer: Renderer2) {
    this.getProducts();
  }

  ngOnInit(): void {}

  async getProducts(): Promise<void> {
    try {
      const data = await this.http.get<any[]>(`${this.apiUrl}/products`).toPromise();
      this.products = data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addToCart(product: Product): Promise<void> {
    console.log('Added to cart:', product.name, 'Quantity:', this.selectedQuantity);
    try {
      await this.cartService.addToCart(product);
      alert('Product added to the Cart Successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  async buyNow(product: Product): Promise<void> {
    console.log('Buying now:', product.name, 'Quantity:', this.selectedQuantity);
    try {
      await this.cartService.buyNow(product);
    } catch (error) {
      console.error('Error buying product:', error);
    }
  }

  async filterByCategory(event: any): Promise<void> {
    this.selectedCategory = event.target.value || '';
  }

  get filteredProducts() {
    if (!this.selectedCategory) {
      return this.products; // If no category is selected, return all products
    } else {
      return this.products.filter(product => product.category === this.selectedCategory);
    }
  }

  isCategoryMatch(productCategory: string): boolean {
    return (
      this.selectedCategory === '' ||
      this.selectedCategory.toLowerCase() === 'all' ||
      productCategory.toLowerCase().startsWith(this.selectedCategory.toLowerCase())
    );
  }

  async incrementQuantity(product: Product): Promise<void> {
    if (product.quantity) {
      product.quantity++;
    }
  }

  async decrementQuantity(product: Product): Promise<void> {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
}
