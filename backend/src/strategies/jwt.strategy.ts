import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JWT_SECRET } from "env";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: JWT_SECRET
        })
    }
    async validate({mail}) {
        return mail
    }
}