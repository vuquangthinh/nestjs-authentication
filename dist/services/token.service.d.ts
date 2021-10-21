import { Identity } from "../identity.interface";
import { IdentityServiceInterface } from "../identity.service.interface";
import { TOKEN } from "../types";
import { TokensDto } from "../dtos";
/**
 * Xử lý token với auth bearer
 */
export declare abstract class TokenService {
    protected readonly identityService: IdentityServiceInterface;
    constructor(identityService: IdentityServiceInterface);
    /**
     * generate access token + refresh token
     */
    generateTokens(user: Identity): Promise<TokensDto>;
    refreshToken(token: string): Promise<TokensDto>;
    getAccessToken(identity: Identity): Promise<string>;
    getRefreshToken(identity: Identity): Promise<string>;
    abstract remokeToken(token: string, type: TOKEN): Promise<void>;
    abstract generateToken(identity: Identity, type: TOKEN): Promise<string>;
    abstract findIdByToken(token: string, type: TOKEN): Promise<string | null>;
}
//# sourceMappingURL=token.service.d.ts.map