import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ignoreElements } from "rxjs";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements: false,
      secretOrKey: 'SECRET' // move to env. var
    })
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name
    };
  }
}