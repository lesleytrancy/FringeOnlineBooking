import { Request, Response } from 'express';

export const PublicEventController = {
  async listEvents(req: Request, res: Response) {
    res.json({ events: [] });
  },
  async getEventDetails(req: Request, res: Response) {
    res.json({ event: {} });
  },
};