"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/register', userController_1.register);
router.post('/login', userController_1.login);
router.post('/change-password', auth_1.authenticateJWT, userController_1.changePassword);
router.post('/validate-refresh-token', userController_1.validateRefreshToken);
router.get('/dummy-data', auth_1.authenticateJWT, userController_1.getDummyData);
exports.default = router;
