import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const avatarPath = path.join(__dirname, '..', '..', 'assets', 'images', 'user-icon.png');
console.log('Default avatar path:', avatarPath);

export default {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/omni-interview-test',
  jwtSecret: process.env.JWT_SECRET || 'fallback_jwt_secret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'fallback_refresh_token_secret',
  jwtExpiresIn: '2m',
  refreshTokenExpiresIn: '5m',
  defaultAvatarPath: avatarPath
};
