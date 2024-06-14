/**
 * 
 * Reference:
 *  - https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
 */

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";


// refresh strategy.
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('call validate function by refresh strategy.');
    return { user: payload.sub, username: payload.username };
  }
}