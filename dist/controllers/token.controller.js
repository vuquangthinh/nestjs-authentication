"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_util_1 = require("@agiletech.vn/nestjs-util");
const injects_1 = require("../injects");
const token_service_1 = require("../services/token.service");
const tokens_dto_1 = require("../dtos/tokens.dto");
const types_1 = require("../types");
let TokenController = class TokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async refresh(tokens) {
        const newTokens = await this.tokenService.refreshToken(tokens.refreshToken);
        return newTokens;
    }
    async revoke(data) {
        await Promise.all([
            this.tokenService.remokeToken(data.refreshToken, types_1.TOKEN.REFRESH_TOKEN),
            this.tokenService.remokeToken(data.refreshToken, types_1.TOKEN.ACCESS_TOKEN),
        ]);
        return new nestjs_util_1.Response.Ok();
    }
};
__decorate([
    common_1.Post("refresh"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tokens_dto_1.RefreshToken]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "refresh", null);
__decorate([
    common_1.Put("revoke"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tokens_dto_1.RefreshToken]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "revoke", null);
TokenController = __decorate([
    swagger_1.ApiTags("Authentication"),
    common_1.Controller("auth"),
    __param(0, injects_1.InjectTokenService()),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenController);
exports.TokenController = TokenController;
