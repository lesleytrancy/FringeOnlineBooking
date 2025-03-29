import { Request, Response } from 'express';

export const UserAuthController = {
  async register(req: Request, res: Response) {
    res.json({ message: 'User registered' });
  },
  async login(req: Request, res: Response) {
    res.json({ message: 'User login successful' });
  },
};