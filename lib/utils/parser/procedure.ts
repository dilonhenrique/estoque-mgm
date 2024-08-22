import {
  Procedure as PrismaProcedure,
  Service,
  ProductOnProcedure,
  User,
} from "@prisma/client";
import { Procedure } from "../../../types/schemas";
import { parseProduct, ProductInput } from "./product";
import { CustomerInput, parseCustomer } from "./customer";
import { LogInput, parseLog } from "./log";

export type ProcedureInput = PrismaProcedure & {
  service: Service | null;
  created_by: User;
  customer: CustomerInput | null;
  productsOnProcedures: (ProductOnProcedure & { product: ProductInput })[];
  logs?: LogInput[] | null;
};

export function parseProcedure(payload: ProcedureInput): Procedure {
  return {
    id: payload.id,
    service: payload.service
      ? {
          id: payload.service.id,
          name: payload.service.name,
        }
      : undefined,
    confirmed_by_customer: payload.confirmed_by_customer,
    created_by: payload.created_by ?? undefined,
    created_at: payload.created_at,
    scheduled_for: payload.scheduled_for ?? undefined,
    done: payload.done,
    customer: payload.customer ? parseCustomer(payload.customer) : undefined,
    products: payload.productsOnProcedures.map((productOnProcedure) => ({
      ...parseProduct(productOnProcedure.product),
      qty: productOnProcedure.qty,
    })),
    logs: payload.logs?.map((item) => parseLog(item)),
  };
}
