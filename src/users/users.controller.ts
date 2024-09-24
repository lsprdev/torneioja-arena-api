import { Controller, Get, Put, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

class User {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password?: string;
}

@ApiTags('Users')
@Controller('api')
export class UsersController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('users')
    async getUsers() {
        try {
            const users = await this.usersService.users({});
            return {
                message: `${users.length} usuários encontrados`,
                data: users,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar usuários.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('users/:id')
    async getUserById(@Param('id') id: number) {
        try {
            const user = await this.usersService.user({ id: Number(id) });
            return {
                message: 'Usuário encontrado.',
                data: user,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar o usuário.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Put('users/:id')
    async updateUser(@Param('id') id: number, @Body() body: User) {
        try {
            if (body.password) {
                body.password = await this.authService.hashPassword(body.password);
            }
            const user = await this.usersService.updateUser({
                where: { id: Number(id) },
                data: body,
            });

            return {
                message: 'Usuário atualizado.',
                data: user,
            };
        } catch (error) {
            return {
                message: 'Não foi possível atualizar o usuário.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Delete('users/:id')
    async deleteUser(@Param('id') id: number) {
        try {
            const user = await this.usersService.deleteUser({ id: Number(id) });
            return {
                message: 'Usuário deletado.',
                data: user,
            };
        } catch (error) {
            return {
                message: 'Não foi possível deletar o usuário.',
                error: error.message,
            };
        }
    }
}

