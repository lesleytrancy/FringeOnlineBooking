import { Request, Response } from 'express';

export const TicketAdminController = {
  async getByEvent(req: Request, res: Response) {
    res.json({ tickets: [] });
  },
};