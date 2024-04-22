import { PrismaClient } from "@prisma/client";

class PrismaService {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async connect(): Promise<void> {
    this.client.$connect();
  }
  public async disconnect(): Promise<void> {
    this.client.$disconnect();
  }
}

export default PrismaService;
