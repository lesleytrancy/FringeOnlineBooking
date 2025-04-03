import { Request, Response } from 'express';

export const SeatController = {
  async getByVenue(req: Request, res: Response) {
    res.json({ seats: [] });
  },
  async create(req: Request, res: Response) {
    res.status(201).json({ message: 'Seat created' });
  },
};