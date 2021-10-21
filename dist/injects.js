"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectTokenService = exports.InjectIdentityService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
exports.InjectIdentityService = (direct = false) => {
    if (direct) {
        return common_1.Inject(constants_1.IDENTITY_SERVICE);
    }
    return common_1.Inject(common_1.forwardRef(() => constants_1.IDENTITY_SERVICE));
};
exports.InjectTokenService = () => common_1.Inject(common_1.forwardRef(() => constants_1.TOKEN_SERVICE));
