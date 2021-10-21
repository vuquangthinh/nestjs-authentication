"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGuard = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
exports.CurrentUser = common_1.createParamDecorator((data, cxt) => {
    if (cxt.getType() === "http") {
        return cxt.switchToHttp().getRequest().user;
    }
    throw new Error("not yet");
});
exports.TokenGuard = passport_1.AuthGuard("jwt");
