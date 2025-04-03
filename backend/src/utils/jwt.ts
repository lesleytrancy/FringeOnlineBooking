import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
/*
  create token
*/
export function generateToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: jwtConfig.expiresIn });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
