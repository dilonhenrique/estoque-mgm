import { Sort } from "mongodb";
import { ZodIssue } from "zod";

export type ActionResult<T = any> = {
  success: boolean;
  errors: ZodIssue[];
  data?: T;
};

export type Query = {
  search?: string;
  sort?: Sort;
  limit?: number;
  skip?: number;
};
