import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiresIn });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, config.refreshTokenSecret);
  } catch (error) {
    return null;
  }
};