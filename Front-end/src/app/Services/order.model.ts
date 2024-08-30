export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    // Add other fields as needed
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    // Add other fields as needed
  }
  
  export interface OrderProduct {
    id: number;
    product: Product;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    order_id: number;
    user: User;
    orderDate: string;
    totalAmount: number;
    status: string;
    sociaty_name: string;
    flat_no: string;
    wing_name: string;
    area: string;
    orderProducts: OrderProduct[];
  }

 
  