import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Arena, Prisma } from '@prisma/client';

@Injectable()
export class ArenaService {
    constructor(private prisma: PrismaService) { }

    async arena(
        arenaWhereUniqueInput: Prisma.ArenaWhereUniqueInput,
    ): Promise<Arena | null> {
        return this.prisma.arena.findUnique({
            where: arenaWhereUniqueInput,
        });
    }

    async arenas(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ArenaWhereUniqueInput;
        where?: Prisma.ArenaWhereInput;
        orderBy?: Prisma.ArenaOrderByWithRelationInput;
    }): Promise<Arena[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.arena.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createArena(data: Prisma.ArenaCreateInput): Promise<Arena> {
        return this.prisma.arena.create({
            data,
        });
    }

    async updateArena(params: {
        where: Prisma.ArenaWhereUniqueInput;
        data: Prisma.ArenaUpdateInput;
    }): Promise<Arena> {
        const { where, data } = params;
        return this.prisma.arena.update({
            data,
            where,
        });
    }

    async deleteArena(where: Prisma.ArenaWhereUniqueInput): Promise<Arena> {
        return this.prisma.arena.delete({
            where,
        });
    }
}
