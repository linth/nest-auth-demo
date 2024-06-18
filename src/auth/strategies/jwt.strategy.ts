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

// jwt strategy 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // 補充說明: 第一次login就是會進入authservice, 當拿到jwt, 之後的交互都會採用jwtstrategy來進行validate user
  async validate(payload: any) {
    // console.log('call validate function by jwt strategy.');
    return { user: payload.sub, username: payload.username };
  }
}