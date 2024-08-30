export interface OrderDetailsDto {
    orderId: number;
    userName: string;
    sociatyName: string;
    flatNo: string;
    wingName: string;
    area: string;
    status: string;
    orderProducts: OrderProductDto[];
  }
  
  export interface OrderProductDto {
    productName: string;
    quantity: number;
  }
  