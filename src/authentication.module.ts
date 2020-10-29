import {
  Module,
  DynamicModule,
  ModuleMetadata,
  ValueProvider,
  FactoryProvider,
  Provider,
} from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { IdentityServiceInterface } from "./identity.service.interface";
import { TokenService } from "./services";

import { JwtStrategy } from "./jwt.strategy";
import { TokenController } from "./controllers/token.controller";
import { IDENTITY_SERVICE, TOKEN_SERVICE, JWT_OPTIONS } from "./constants";
import { JwtOptions } from "./types";

type JwtOptionsServiceProvider = ValueProvider<JwtOptions> | FactoryProvider<JwtOptions>;

interface AuthenticationConfig {
  jwtOptions: Partial<JwtOptionsServiceProvider>;
  TokenService: Omit<Provider<TokenService>, "provide">;
  IdentityService: Omit<Provider<IdentityServiceInterface>, "provide">; // new (...args: any[]) => AbstractIdentityService;
}

interface AuthenticationConfig {}

@Module({})
export class AuthenticationModule {
  static forRoot({
    exports,
    imports,
    providers,
    IdentityService,
    TokenService,
    jwtOptions,
  }: Partial<AuthenticationConfig & Partial<ModuleMetadata>>): DynamicModule {
    if (!IdentityService) {
      throw new Error("invalid identity service");
    }

    if (!TokenService) {
      throw new Error("invalid token service");
    }

    return {
      global: true,
      module: AuthenticationModule,
      providers: [
        {
          provide: IDENTITY_SERVICE,
          ...IdentityService,
        },
        {
          provide: TOKEN_SERVICE,
          ...TokenService,
        } as any,
        {
          provide: JWT_OPTIONS,
          ...jwtOptions,
        },
        JwtStrategy,
        ...(providers || []),
      ],
      controllers: [TokenController],
      imports: [PassportModule.register({ defaultStrategy: "jwt" }), ...(imports || [])],
      exports: [IDENTITY_SERVICE, TOKEN_SERVICE, ...(exports || [])],
    };
  }
}
