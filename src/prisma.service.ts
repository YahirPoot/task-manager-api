import { Injectable } from "@nestjs/common";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'

/*
    *This file to conecting
*/

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL as string,
        });
        super({ adapter });
    }
}