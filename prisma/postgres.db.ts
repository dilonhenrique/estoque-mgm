import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  postgresGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const postgres = globalThis.postgresGlobal ?? prismaClientSingleton();

export default postgres;

if (process.env.NODE_ENV !== "production") globalThis.postgresGlobal = postgres;
