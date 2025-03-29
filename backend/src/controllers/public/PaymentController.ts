import { Request, Response } from 'express';

export const PaymentController = {
  async processPayment(req: Request, res: Response) {
    res.json({ message: 'Payment processed' });
  },
};