import express from 'express';
import { register, login, changePassword, validateRefreshToken, getDummyData } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/change-password', authenticateJWT, changePassword);
router.post('/validate-refresh-token', validateRefreshToken);
router.get('/dummy-data', authenticateJWT, getDummyData);

export default router;