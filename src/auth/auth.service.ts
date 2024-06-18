/**
 * 
 * Reference:
 *  - https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private jwtService : JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 補充說明: 第一次login就是會進入authservice, 當拿到jwt, 之後的交互都會採用jwtstrategy來進行validate user
  async login(user: User) {
    console.log('user', user);
    
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    console.log('payload', payload);
    console.log('access token', this.jwtService.sign(payload));
    

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    console.log('refreshToken');
    
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}