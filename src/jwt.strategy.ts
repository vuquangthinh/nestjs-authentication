import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { InjectIdentityService } from "./injects";
import { IdentityServiceInterface } from "./identity.service.interface";
import { JWT_OPTIONS } from "./constants";
import { JwtOptions } from "./types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JWT_OPTIONS)
    protected jwtOptions: JwtOptions,

    @InjectIdentityService()
    protected identityService: IdentityServiceInterface
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.secretOrPrivateKey,
    });
  }

  async validate(payload: any) {
    const user = await this.identityService.findById(payload.sub);
    if (user) {
      return user;
    }

    throw new ForbiddenException("invalid user");
  }
}
