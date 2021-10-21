"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthenticationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const token_controller_1 = require("./controllers/token.controller");
const constants_1 = require("./constants");
let AuthenticationModule = AuthenticationModule_1 = class AuthenticationModule {
    static forRoot({ exports, imports, providers, IdentityService, TokenService, jwtOptions, }) {
        if (!IdentityService) {
            throw new Error("invalid identity service");
        }
        if (!TokenService) {
            throw new Error("invalid token service");
        }
        return {
            global: true,
            module: AuthenticationModule_1,
            providers: [
                {
                    provide: constants_1.IDENTITY_SERVICE,
                    ...IdentityService,
                },
                {
                    provide: constants_1.TOKEN_SERVICE,
                    ...TokenService,
                },
                {
                    provide: constants_1.JWT_OPTIONS,
                    ...jwtOptions,
                },
                jwt_strategy_1.JwtStrategy,
                ...(providers || []),
            ],
            controllers: [token_controller_1.TokenController],
            imports: [passport_1.PassportModule.register({ defaultStrategy: "jwt" }), ...(imports || [])],
            exports: [constants_1.IDENTITY_SERVICE, constants_1.TOKEN_SERVICE, ...(exports || [])],
        };
    }
};
AuthenticationModule = AuthenticationModule_1 = __decorate([
    common_1.Module({})
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
