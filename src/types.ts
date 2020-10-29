import * as jwt from "jsonwebtoken";

export enum TOKEN {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}

export interface JwtOptions {
  secretOrPrivateKey: jwt.Secret;
  algorithm: jwt.Algorithm;
}
