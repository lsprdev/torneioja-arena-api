import { Controller, Get, Post, Put, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CourtService } from './court.service';

class Courts {
    @ApiProperty()
    name: string;

    @ApiProperty()
    type: string;
    
    @ApiProperty()
    arenaId: number;

    arena: any;
}

@ApiTags('Courts')
@Controller('api')
export class CourtController {
    constructor(
        private courtsService: CourtService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('courts')
    async getCourts() {
        try {
            const courts = await this.courtsService.courts({});
            return {
                message: `${courts.length} quadras encontradas`,
                data: courts,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar quadras.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('courts/:id')
    async getCourtById(@Param('id') id: string) {
        try {
            const court = await this.courtsService.court({ id: Number(id) });
            return {
                message: 'Quadra encontrada.',
                data: court,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar a quadra.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('courts/arena/:arenaId')
    async getCourtsByArenaId(@Param('arenaId') arenaId: number) {
        try {
            const courts = await this.courtsService.courts({
                where: { arenaId: Number(arenaId) },
            });
            return {
                message: `${courts.length} quadras encontradas.`,
                data: courts,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar quadras.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Post('courts')
    async createCourt(@Body() body: Courts ) {
        try {
            const court = await this.courtsService.createCourt({
                ...body,
            });
            return {
                message: 'Quadra criada com sucesso.',
                data: court,
            };
        } catch (error) {
            return {
                message: 'Não foi possível criar a quadra.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Put('courts/:id')
    async updateCourt(@Param('id') id: string, @Body() body: Courts) {
        try {
            const court = await this.courtsService.updateCourt({
                where: { id: Number(id) },
                data: body,
            });
            return {
                message: 'Quadra atualizada com sucesso.',
                data: court,
            };
        } catch (error) {
            return {
                message: 'Não foi possível atualizar a quadra.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Delete('courts/:id')
    async deleteCourt(@Param('id') id: string) {
        try {
            const court = await this.courtsService.deleteCourt({ id: Number(id) });
            return {
                message: 'Quadra deletada com sucesso.',
                data: court,
            };
        } catch (error) {
            return {
                message: 'Não foi possível deletar a quadra.',
                error: error.message,
            };
        }
    }
}
