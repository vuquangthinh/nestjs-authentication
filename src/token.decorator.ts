import { AuthGuard } from "@nestjs/passport";

export const TokenGuard = AuthGuard("jwt");
