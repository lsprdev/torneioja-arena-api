import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Court, Prisma } from '@prisma/client';

@Injectable()
export class CourtService {
    constructor(private prisma: PrismaService) { }

    async court(
        courtWhereUniqueInput: Prisma.CourtWhereUniqueInput,
    ): Promise<Court | null> {
        return this.prisma.court.findUnique({
            where: courtWhereUniqueInput,
        });
    }

    async courts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CourtWhereUniqueInput;
        where?: Prisma.CourtWhereInput;
        orderBy?: Prisma.CourtOrderByWithRelationInput;
    }): Promise<Court[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.court.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createCourt(data: Prisma.CourtCreateInput): Promise<Court> {
        return this.prisma.court.create({
            data,
        });
    }

    async updateCourt(params: {
        where: Prisma.CourtWhereUniqueInput;
        data: Prisma.CourtUpdateInput;
    }): Promise<Court> {
        const { where, data } = params;
        return this.prisma.court.update({
            data,
            where,
        });
    }

    async deleteCourt(where: Prisma.CourtWhereUniqueInput): Promise<Court> {
        return this.prisma.court.delete({
            where,
        });
    }
}
