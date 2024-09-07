import { FieldError } from "react-hook-form";
import { ZodIssue } from "zod";

export type AnyObject<T = any> = { [k: string]: T };

export type ServiceResult<T = any> = {
  message: string;
  status: number;
} & (
  | {
      success: true;
      data: T;
      fieldErrors?: ZodErrorObject;
    }
  | {
      success: false;
      data?: T;
      fieldErrors: ZodErrorObject;
    }
);

// export type ZodErrorObject = AnyObject<string>;
export type ZodErrorObject = ZodIssue[];

export type SearchList<T = any> = {
  total: number;
  items: T[];
};

export type ActionResult<T = any> = {
  fieldErrors: AnyObject<FieldError>;
  message?: string;
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
