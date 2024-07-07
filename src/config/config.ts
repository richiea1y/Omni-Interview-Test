import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/omni-interview-test',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret',
  jwtExpiresIn: '2m',
  refreshTokenExpiresIn: '5m'
};