import { forwardRef, Inject } from "@nestjs/common";

import { IDENTITY_SERVICE, TOKEN_SERVICE } from "./constants";

export const InjectIdentityService = (direct: boolean = false) => {
  if (direct) {
    return Inject(IDENTITY_SERVICE);
  }

  return Inject(forwardRef(() => IDENTITY_SERVICE));
};

export const InjectTokenService = () => Inject(forwardRef(() => TOKEN_SERVICE));
