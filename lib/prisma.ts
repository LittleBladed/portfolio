import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

function createClient(): PrismaClient {
  // Prisma Postgres (production / Vercel) speaks the accelerate protocol;
  // plain postgres:// URLs (local `prisma dev`, direct TCP) use the pg adapter.
  if (url!.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url! });
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url! }) });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
