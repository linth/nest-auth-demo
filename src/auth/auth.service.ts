/**
 * 
 * Reference:
 *  - https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
 */

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('AuthService');
    
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  // login with username and password.
  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    // const [access_token, refresh_token] = await Promise.all([
    //   this.createAccessToken(payload),
    //   this.createRefreshToken(payload),
    // ]);
    
    return {
      access_token: await this.createAccessToken(payload),
      refresh_token: await this.createRefreshToken(payload),
    }
  }

  async createAccessToken(user: any) {
    return this.jwtService.signAsync({
      name: user.name,
      sub: user.id,
    });
  }

  async createRefreshToken(user: any) {
    return this.jwtService.signAsync({
      name: user.name,
      sub: user.id,
    }, {  
      secret: 'JWT_REFRESH_SECRET',
      expiresIn: '1m'
    });
  }

  // TODO: need to be implemented.
  async logout() {}
  async signUp() {}
  async updateRefreshToken() {}
  hashData() {}
}
