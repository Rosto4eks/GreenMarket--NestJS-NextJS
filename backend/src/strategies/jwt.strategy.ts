import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JWT_SECRET } from "../../env";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: true,
            secretOrKey: JWT_SECRET
        })
    }

    private static extractJWT(req: Request) {
        if (req.cookies && 'token' in req.cookies && req.cookies.token > 0) {
            return req.cookies.token
        }
        return null
    }

    async validate({mail}) {
        return mail
    }
}