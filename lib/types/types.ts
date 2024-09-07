import { Sort } from "mongodb";

export type AnyObject<T = any> = { [k: string]: T };

export type MutationResult<T = any> = {
  errors: ZodErrorObject;
  status?: number;
} & (
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      data?: T;
    }
);

export type ZodErrorObject = AnyObject<string>;

export type SearchList<T = any> = {
  total: number;
  items: T[];
};

export type Query = {
  search?: string;
  sort?: Sort;
  limit?: number;
  skip?: number;
};
