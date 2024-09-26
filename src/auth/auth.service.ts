import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ArenaService } from 'src/arena/arena.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.user({ email: email });
        if (user && await this.comparePasswords(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async signup(user: any) {
        try {
            const userExists = await this.usersService.user({ email: user.email });
            if (userExists) {
                return {
                    message: 'Usuário já existe!',
                    data: {},
                };
            } else {
                const hashedPassword = await this.hashPassword(user.password);
                const newUser = await this.usersService.createUser({
                    ...user,
                    password: hashedPassword,
                });
                const payload = {
                    id: newUser.id,
                    email: newUser.email,
                };
                return {
                    message: 'Usuário criado com sucesso!',
                    data: {
                        access_token: this.jwtService.sign(payload),
                    }
                };
            }
        } catch (error) {
            return {
                message: 'Não foi possível criar o usuário!',
                data: {},
            };
        }
    }

    async login(user: any) {
        try {
            const userExists = await this.usersService.user({ email: user.email });
            if (!userExists) {
                return {
                    message: 'Usuário não existe!',
                    data: {},
                };
            } else {
                const payload = {
                    id: userExists.id,
                    email: userExists.email
                };
                return {
                    message: 'Login bem sucedido!',
                    data: {
                        ...payload,
                        access_token: this.jwtService.sign(payload),
                    }
                };
            }
        } catch (error) {
            return {
                message: 'Não foi possível realizar o login!',
                data: {},
            };
        }
    }
}