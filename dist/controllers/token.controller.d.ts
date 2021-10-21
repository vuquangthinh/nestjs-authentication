import { Response } from "@agiletech.vn/nestjs-util";
import { TokenService } from "../services/token.service";
import { RefreshToken } from "../dtos/tokens.dto";
export declare class TokenController {
    private tokenService;
    constructor(tokenService: TokenService);
    refresh(tokens: RefreshToken): Promise<import("../dtos/tokens.dto").TokensDto>;
    revoke(data: RefreshToken): Promise<Response.Ok>;
}
//# sourceMappingURL=token.controller.d.ts.map