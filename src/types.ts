export interface Product {
  id: string;
  name: string;
  category: 'Skincare' | 'Hair Care' | 'Body Care' | 'Bundles';
  tagline: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  volume: string;
  stock?: number; // Live stock counter
}

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  status?: 'Approved' | 'Flagged' | 'Hidden'; // Moderation status
}

export interface Order {
  id: string;
  date: string;
  items: { product: Product; quantity: number }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  isActive: boolean;
  useCount: number;
}
