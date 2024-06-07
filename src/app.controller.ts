import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.gaurd';
import { AuthenticiatedGuard } from './auth/authenticated.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  first() {
    return 'hello world.'
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user); // TODO: return JWT access token.
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string { // TODO: require an Bearer token, validate token.
    return req.user; 
  }
}
