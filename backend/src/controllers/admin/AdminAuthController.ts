import { Request, Response } from 'express';

export const AdminAuthController = {
  async login(req: Request, res: Response) {
    // TODO: Admin login logic
    res.json({ message: 'Admin login successful' });
  },
};