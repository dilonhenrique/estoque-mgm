export type User = {
  name: string;
  email: string;
  image?: string;
  lastLoginAt: Date;
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
