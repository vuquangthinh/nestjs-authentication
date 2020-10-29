import * as jwt from "jsonwebtoken";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { Identity } from "../identity.interface";
import { IdentityServiceInterface } from "../identity.service.interface";
import { InjectIdentityService } from "../injects";

import { TOKEN } from "../types";
import { TokensDto } from "../dtos";

/**
 * Xử lý token với auth bearer
 */
export abstract class TokenService {
  constructor(
    @InjectIdentityService()
    protected readonly identityService: IdentityServiceInterface
  ) {}

  /**
   * generate access token + refresh token
   */
  async generateTokens(user: Identity): Promise<TokensDto> {
    const accessToken = await this.getAccessToken(user);
    const refreshToken = await this.getRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string): Promise<TokensDto> {
    const userId = await this.findIdByToken(token, TOKEN.REFRESH_TOKEN);
    if (userId) {
      const identity = await this.identityService.findById(userId);

      await this.remokeToken(token, TOKEN.REFRESH_TOKEN);
      return await this.generateTokens(identity);
    }

    throw new UnauthorizedException("invalid token");
  }

  async getAccessToken(identity: Identity): Promise<string> {
    return this.generateToken(identity, TOKEN.ACCESS_TOKEN);
  }

  async getRefreshToken(identity: Identity): Promise<string> {
    return this.generateToken(identity, TOKEN.REFRESH_TOKEN);
  }

  abstract async remokeToken(token: string, type: TOKEN): Promise<void>;
  abstract async generateToken(identity: Identity, type: TOKEN): Promise<string>;
  abstract async findIdByToken(token: string, type: TOKEN): Promise<string | null>;
}
