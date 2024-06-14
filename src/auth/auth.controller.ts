import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service';
import { LocalAuthGuard } from './guards/local-auth.gaurd';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { RefreshJwtGuard } from './guards/refreshToken.guard';
import { JwtGuard } from './guards/jwt-auth.guard';



@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('req for login: ', req.user);    
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    console.log('req for refresh: ', req.user);
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('protected')
  async getUser(): Promise<string> {
    console.log('call protected.');    
    return 'get user';
  }
}
