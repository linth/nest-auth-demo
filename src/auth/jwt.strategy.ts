import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET, // move to env. var
    })
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name
    };
  }
}