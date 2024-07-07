"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDummyData = exports.validateRefreshToken = exports.changePassword = exports.login = exports.register = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jwt_1 = require("../utils/jwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, avatar } = req.body;
        const user = new UserModel_1.default({
            username,
            password,
            isActive: true,
            avatar // This can be undefined, and the pre-save hook will set the default
        });
        yield user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield UserModel_1.default.findOne({ username });
        if (!user || !(yield user.comparePassword(password))) {
            return res.sendStatus(204);
        }
        const token = (0, jwt_1.generateToken)(user._id.toString());
        const refreshToken = (0, jwt_1.generateRefreshToken)(user._id.toString());
        res.status(200).json({ token, refreshToken });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body;
        const user = yield UserModel_1.default.findById(userId);
        if (!user || !(yield user.comparePassword(oldPassword))) {
            return res.status(400).json({ message: 'Invalid old password' });
        }
        user.password = newPassword;
        yield user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error changing password', error });
    }
});
exports.changePassword = changePassword;
const validateRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
        const newToken = (0, jwt_1.generateToken)(decoded.userId);
        res.status(200).json({ token: newToken });
    }
    catch (error) {
        res.status(500).json({ message: 'Error validating refresh token', error });
    }
});
exports.validateRefreshToken = validateRefreshToken;
const getDummyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'This is dummy data' });
});
exports.getDummyData = getDummyData;
