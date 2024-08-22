export type User = {
  name: string;
  email: string;
  image?: string;
  lastLoginAt?: Date;
};

export type Product = {
  id: string;
  account_id: string;
  name: string;
  unit: string;
  minStock?: number;
  code?: string;
  img_url?: string;
  stock: number;
  category?: ProductCategory;
};

export type ProductCategory = {
  id: string;
  name: string;
};

export type Customer = {
  id: string;
  name: string;
  img_url?: string;
  email?: string;
  phone?: string;
  birthday?: Date;
  address?: Address;
};

export type Address = {
  id: string;
  zip_code: string;
  country: string;
  state: string;
  city: string;
  neighborhood?: string;
  street: string;
  number: string;
  complement?: string;
};

export type Service = {
  id: string;
  name: string;
  products: ProductWithQty[];
};

export type ProductWithQty = Product & {
  qty: number;
};

export type Procedure = {
  id: string;
  service?: {
    id: string;
    name: string;
  };
  customer?: Customer;
  created_by: User;
  created_at: Date;
  scheduled_for?: Date;
  done: boolean;
  confirmed_by_customer: boolean;
  products: ProductWithQty[];
  logs?: ProductLog[];
  // sheet_id
  // procedureMedia
};

export type ProductLog = {
  id: string;
  qty: number;
  product: Product;
};

// export type ProductStock = {
//   id: string;
//   qty: number;
// };

// export type ProductVariant = {
//   id: string;
//   name: string;
//   options: ProductVariantOption[];
// };

// export type ProductVariantOption = {
//   id: string;
//   name: string;
// };
