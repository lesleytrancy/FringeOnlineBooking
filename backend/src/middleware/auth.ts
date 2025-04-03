import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

/**
 * Middleware to authenticate JWT tokens
 */
export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, jwtConfig.secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(401).json({ message: 'Authorization header missing or invalid' });
  }
}

/**
 * Middleware to authorize users based on their role
 */
export function authorizeRole(role: string): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction): void {
    const user = req.user as any;
    if (user?.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
  };
}