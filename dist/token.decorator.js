"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGuard = void 0;
const passport_1 = require("@nestjs/passport");
exports.TokenGuard = passport_1.AuthGuard("jwt");
