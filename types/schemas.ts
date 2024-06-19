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
  stock: ProductStock[];
  variants?: ProductVariant[];
  category?: {
    id: string;
    name: string;
  };
};

export type ProductStock = {
  id: string;
  qty: number;
};

export type ProductVariant = {
  id: string;
  name: string;
  options: ProductVariantOption[];
};

export type ProductVariantOption = {
  id: string;
  name: string;
};
