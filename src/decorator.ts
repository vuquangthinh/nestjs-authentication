import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export const CurrentUser = createParamDecorator((data, cxt: ExecutionContext) => {
  if (cxt.getType() === "http") {
    return cxt.switchToHttp().getRequest().user;
  }

  throw new Error("not yet");
});

export const TokenGuard = AuthGuard("jwt");
