import { Service as PrismaService, ProductOnService } from "@prisma/client";
import { Service } from "@/types/schemas";
import { parseProduct, ProductInput } from "./product";

export type ServiceInput = PrismaService & {
  productsOnServices: (ProductOnService & { product: ProductInput })[];
};

export function parseService(payload: ServiceInput): Service {
  return {
    id: payload.id,
    name: payload.name,
    products: payload.productsOnServices.map((productOnService) => ({
      ...parseProduct(productOnService.product),
      qty: productOnService.qty,
    })),
  };
}
