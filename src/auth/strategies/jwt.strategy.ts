import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";


/**
 * export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh')
 * 
 * 這裡的 PassportStrategy 是一個高階函數 (Higher-Order Function)，
 * 它接受兩個參數並返回一個新的類。這樣的用法通常用於設置或配置某個類，
 * 然後返回一個自定義的類，該類可以被繼承。
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name
    };
  }
}