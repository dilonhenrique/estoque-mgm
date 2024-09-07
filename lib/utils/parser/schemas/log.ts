import { ProductLog as PrismaLog } from "@prisma/client";
import { LogComplete, LogWithAction, LogWithProduct } from "@/types/schemas";
import { parseProduct, ProductInput } from "./product";
import { parseProcedure, ProcedureInput } from "./procedure";
import { parseDate } from "./dateToLocal";

export type LogInputForAction = PrismaLog & {
  product: ProductInput;
};

export function parseLogForAction(payload: null): undefined;
export function parseLogForAction(payload: LogInputForAction): LogWithProduct;
export function parseLogForAction(payload: LogInputForAction | null) {
  if (!payload) return undefined;

  const parsed: LogWithProduct = {
    id: payload.id,
    date: parseDate(payload.created_at),
    qty: payload.qty,
    product: parseProduct(payload.product),
  };

  return parsed;
}

export type LogInputForProduct = PrismaLog & {
  procedure: ProcedureInput | null;
};

export function parseLogForProduct(payload: null): undefined;
export function parseLogForProduct(payload: LogInputForProduct): LogWithAction;
export function parseLogForProduct(payload: LogInputForProduct | null) {
  if (!payload) return undefined;

  const parsed: LogWithAction = {
    id: payload.id,
    date: parseDate(payload.created_at),
    qty: payload.qty,
    cause: payload.cause,
    procedure: payload.procedure
      ? parseProcedure(payload.procedure)
      : undefined,
  };

  return parsed;
}

export type LogInputComplete = LogInputForAction & LogInputForProduct;

export function parseLogComplete(payload: null): undefined;
export function parseLogComplete(payload: LogInputComplete): LogComplete;
export function parseLogComplete(payload: LogInputComplete | null) {
  if (!payload) return undefined;

  const parsed: LogComplete = {
    id: payload.id,
    date: parseDate(payload.created_at),
    qty: payload.qty,
    cause: payload.cause,
    product: parseProduct(payload.product),
    procedure: payload.procedure
      ? parseProcedure(payload.procedure)
      : undefined,
  };

  return parsed;
}
