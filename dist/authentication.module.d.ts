import { DynamicModule, ModuleMetadata, ValueProvider, FactoryProvider, Provider } from "@nestjs/common";
import { IdentityServiceInterface } from "./identity.service.interface";
import { TokenService } from "./services";
import { JwtOptions } from "./types";
declare type JwtOptionsServiceProvider = ValueProvider<JwtOptions> | FactoryProvider<JwtOptions>;
interface AuthenticationConfig {
    jwtOptions: Partial<JwtOptionsServiceProvider>;
    TokenService: Omit<Provider<TokenService>, "provide">;
    IdentityService: Omit<Provider<IdentityServiceInterface>, "provide">;
}
interface AuthenticationConfig {
}
export declare class AuthenticationModule {
    static forRoot({ exports, imports, providers, IdentityService, TokenService, jwtOptions, }: Partial<AuthenticationConfig & Partial<ModuleMetadata>>): DynamicModule;
}
export {};
//# sourceMappingURL=authentication.module.d.ts.map