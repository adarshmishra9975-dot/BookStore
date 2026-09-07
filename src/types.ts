export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  rating: number;
  stock: number;
  badge?: string;
  badgeColor?: string;
  createdAt?: string;
}

export interface BackendFileCode {
  fileName: string;
  filePath: string;
  description: string;
  tags: string[];
  code: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  access: 'Public' | 'Admin';
  samplePayload?: string;
  sampleResponse: string;
}
