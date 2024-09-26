import { Controller, Get, Post, Put, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';

class Schedule {
    @ApiProperty()
    userId: number;
    user: any;
    
    @ApiProperty()
    arenaId: number;
    arena: any;
    
    @ApiProperty()
    courtId: number;
    court: any;
    
    @ApiProperty()
    initTime: Date;

    @ApiProperty()
    endTime: Date;
}

@ApiTags('Schedule')
@Controller('api')
export class ScheduleController {
    constructor(
        private scheduleService: ScheduleService,
    ) { }

    @Get('schedule')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async getSchedules() {
        try {
            const schedules = await this.scheduleService.schedules({});
            return {
                message: `${schedules.length} agendamentos encontrados`,
                data: schedules,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar agendamentos.',
                error: error.message,
            };
        }
    }

    @Get('schedule/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async getSchedule(@Param('id') id: string) {
        try {
            const schedule = await this.scheduleService.schedule({ id: Number(id) });
            return {
                message: 'Agendamento encontrado.',
                data: schedule,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar o agendamento.',
                error: error.message,
            };
        }
    }

    @Get('schedule/user/:userId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async getSchedulesByUserId(@Param('userId') userId: number) {
        try {
            const schedules = await this.scheduleService.schedules({
                where: { userId: Number(userId) },
            });
            return {
                message: `${schedules.length} agendamentos encontrados.`,
                data: schedules,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar os agendamentos.',
                error: error.message,
            };
        }
    }

    @Get('schedule/arena/:arenaId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async getSchedulesByArenaId(@Param('arenaId') arenaId: number) {
        try {
            const schedules = await this.scheduleService.schedules({
                where: { arenaId: Number(arenaId) },
            });
            return {
                message: `${schedules.length} agendamentos encontrados.`,
                data: schedules,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar os agendamentos.',
                error: error.message,
            };
        }
    }

    @Get('schedule/court/:courtId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async getSchedulesByCourtId(@Param('courtId') courtId: number) {
        try {
            const schedules = await this.scheduleService.schedules({
                where: { courtId: Number(courtId) },
            });
            return {
                message: `${schedules.length} agendamentos encontrados.`,
                data: schedules,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar os agendamentos.',
                error: error.message,
            };
        }
    }

    @Post('schedule')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async createSchedule(@Body() schedule: Schedule) {
        try {
            const newSchedule = await this.scheduleService.createSchedule(schedule);
            return {
                message: 'Agendamento criado com sucesso.',
                data: newSchedule,
            };
        } catch (error) {
            return {
                message: 'Não foi possível criar o agendamento.',
                error: error.message,
            };
        }
    }

    @Put('schedule/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async updateSchedule(@Param('id') id: string, @Body() schedule: Schedule) {
        try {
            const updatedSchedule = await this.scheduleService.updateSchedule({
                where: { id: Number(id) },
                data: schedule,
            });
            return {
                message: 'Agendamento atualizado com sucesso.',
                data: updatedSchedule,
            };
        } catch (error) {
            return {
                message: 'Não foi possível atualizar o agendamento.',
                error: error.message,
            };
        }
    }

    @Delete('schedule/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    async deleteSchedule(@Param('id') id: string) {
        try {
            const deletedSchedule = await this.scheduleService.deleteSchedule({ id: Number(id) });
            return {
                message: 'Agendamento deletado com sucesso.',
                data: deletedSchedule,
            };
        } catch (error) {
            return {
                message: 'Não foi possível deletar o agendamento.',
                error: error.message,
            };
        }
    }
}
