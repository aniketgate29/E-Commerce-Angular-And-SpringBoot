import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { OrderService } from '../../Services/order.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  selectedProducts: Product[] = [];
  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5];
  isLoggedIn: boolean = false;
  private apiUrl = ServerUrl;

  constructor(private cartService: CartService,private http:HttpClient ,private orderService: OrderService
    ,private authService: AuthService 
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadBuyItems();
    this.checkLoginStatus();
    this.loadCustomerData();
    this.totalprice = this.totalPrice;
  }
  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn(); // Assuming AuthService has an isLoggedIn method
  }

  loadCartItems() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  loadBuyItems() {
    this.cartService.buyItems$.subscribe(items => {
      this.selectedProducts = items;
    });
  }

  

  deleteFromCart(product: Product) {
    console.log('Deleting from cart:', product.name);
    this.cartService.deleteFromCart(product);
  }

  deleteFromBuy(product: Product) {
    console.log('Deleting from buy:', product.name);
    this.cartService.deleteFromBuy(product);
  }

  updateTotalPrice(product: any): number {
    const totalPrice = product.prices * product.quantity;
    return totalPrice;
  }

  incrementQuantity(product: any) {
    if (product.quantity) {
      product.quantity++;
    }
  }

  decrementQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
   
  }

buyAll() {
  this.cartItems.forEach(product => {
    this.cartService.buyNow(product);
    this.deleteFromCart(product);

  });
}
get totalPrice(): number {
  return this.selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
}
 

//--------------------------------------------------------

customer: any = {
  user_id:'',
  first_name: '',
  last_name: '',
  sociaty_name: '',
  flat_no: '',
  wing_name: '',
  area: '',
  email: '',
  mobile: ''
};

  totalprice: number = this.totalPrice;
  showAddressChange: boolean = false;
  newAddress: string = '';
  discountPrice: number=0;
  paymentMethods = ['GPay', 'PhonePe', 'Cash on Delivery'];
  selectedPaymentMethod: string = this.paymentMethods[0];
  upiNumber: string = '';


  Coupon : any ={
    coupon_id:0,
    name:'',
    discount :  0
 };  
 async applyCoupon(name: String) {
  
  try {
    const response = await this.http.get<any>(`${this.apiUrl}/coupon/${name}/user/${this.customer.user_id}`).toPromise();
    const message = JSON.stringify(response.message);
    
    if (response.message == 'Coupon is valid' || response.coupon) {

      const coupon = JSON.stringify(response.coupon);
      this.Coupon.coupon_id=response.coupon.coupon_id; 
      this.Coupon.name=response.coupon.name;
      this.Coupon.discount=response.coupon.discount;    
      console.log(this.Coupon);

    } else {
      this.Coupon.discount = 0;
      alert(message);
    }
  } catch (error) {
    this.Coupon.discount = 0;
    alert("An error occurred while applying the coupon");
  }
   this.discountPrice = (this.totalPrice*this.Coupon.discount)/100;
   this.totalprice = this.totalPrice- this.discountPrice;


}

 

  changeAddress() {
    this.showAddressChange = true;
  }

  confirmAddressChange() {
    this.customer.sociaty_name = this.customer.sociaty_name;
    this.customer.flat_no = this.customer.flat_no;
    this.customer.wing_name = this.customer.wing_name;
    this.showAddressChange = false;
  }

  confirmOrder() {
    // Logic to confirm order
    alert('Order confirmed!');
    this.placeOrder();
  }
loadCustomerData() {
  const userData = this.authService.getUserData();
  if (userData) {
    this.customer = userData;
  } else {
    console.error('No user data available');
  }
}



//---------------------------------------------
async placeOrder() {
    const orderItems: any[] = this.selectedProducts.map(product => ({
    productId: product.id,
    quantity: product.quantity
  }));

  const orderData = {
    user: this.customer,
    orderItems: orderItems,
    coupon: this.Coupon
    
  };

  if (this.selectedProducts.length > 0) {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/orders/create`, orderData).toPromise();
      console.log('Order placed successfully', response.message);
      alert('Order placed successfully');
      this.selectedProducts = [];
    } catch (error:any) {
      console.error('Error occurred during order placement', error);
      alert('Order failed: ' + (error.error?.message || error.message));
    }
  }
}


}
