import { Strategy } from "passport-jwt";
import { IdentityServiceInterface } from "./identity.service.interface";
import { JwtOptions } from "./types";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    protected jwtOptions: JwtOptions;
    protected identityService: IdentityServiceInterface;
    constructor(jwtOptions: JwtOptions, identityService: IdentityServiceInterface);
    validate(payload: any): Promise<import("./identity.interface").Identity>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map