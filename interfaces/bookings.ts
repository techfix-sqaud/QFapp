export interface IBookings {
  id: string;
  serviceType: string;
  PaymentStatus: string;
  image: any; // Replace `any` with the appropriate type for your image source
  provider: string;
  price: number;
  date: string;
  address: string;
  receipt: string;
  rating: number;

}