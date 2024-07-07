import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Define a custom interface extending Request
interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};