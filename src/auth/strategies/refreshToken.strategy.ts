/**
 * 
 * Reference:
 *  - https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
 */

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refrash') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authentication')
      .replace('Bearer', '').trim();
    
    return {
      ...payload,
      refreshToken,
    };
  }
}