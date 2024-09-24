import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

class User {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

@ApiTags('Auth')
@Controller('api')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('signup')
    async signup(@Body() body: User) {
        return this.authService.signup(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() { email, password }: User) {
        return this.authService.login({ email, password });
    }
}
