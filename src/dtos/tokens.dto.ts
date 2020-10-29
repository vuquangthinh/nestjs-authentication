import { ApiProperty } from "@nestjs/swagger";

export class AccessToken {
  @ApiProperty()
  accessToken!: string;
}

export class RefreshToken {
  @ApiProperty()
  refreshToken!: string;
}

export type TokensDto = AccessToken & RefreshToken;
