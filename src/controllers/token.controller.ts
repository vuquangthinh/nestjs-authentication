import { Controller, Put, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "@agiletech.vn/nestjs-util";
import { InjectTokenService } from "../injects";
import { TokenService } from "../services/token.service";
import { RefreshToken } from "../dtos/tokens.dto";
import { TOKEN } from "../types";

@ApiTags("Authentication")
@Controller("auth")
export class TokenController {
  constructor(@InjectTokenService() private tokenService: TokenService) {}

  @Post("refresh")
  async refresh(@Body() tokens: RefreshToken) {
    const newTokens = await this.tokenService.refreshToken(tokens.refreshToken);
    return newTokens;
  }

  @Put("revoke")
  async revoke(
    @Body()
    data: RefreshToken
  ) {
    await Promise.all([
      this.tokenService.remokeToken(data.refreshToken, TOKEN.REFRESH_TOKEN),
      this.tokenService.remokeToken(data.refreshToken, TOKEN.ACCESS_TOKEN),
    ]);

    return new Response.Ok();
  }
}
