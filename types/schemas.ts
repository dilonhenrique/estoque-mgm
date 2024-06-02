export type User = {
  name: string;
  email: string;
  image?: string;
  lastLoginAt: Date;
};

export type UserInput = {
  name: string;
  email: string;
  image?: string;
};

export type Product = {
  name: string;
  unit: string;
  stock: number;
  userId: string;
  minStock?: number;
  code?: string;
  categoryId?: string;
  image?: string;
  brand?: string;
};
