"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const avatarPath = path_1.default.join(__dirname, '..', '..', 'assets', 'images', 'user-icon.png');
console.log('Default avatar path:', avatarPath);
exports.default = {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/omni-interview-test',
    jwtSecret: process.env.JWT_SECRET || 'fallback_jwt_secret',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'fallback_refresh_token_secret',
    jwtExpiresIn: '2m',
    refreshTokenExpiresIn: '5m',
    defaultAvatarPath: avatarPath
};
