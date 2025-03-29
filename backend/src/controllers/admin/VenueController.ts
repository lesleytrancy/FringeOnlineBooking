import { Request, Response } from 'express';

export const VenueController = {
  async getAll(req: Request, res: Response) {
    res.json({ venues: [] });
  },
  async create(req: Request, res: Response) {
    res.status(201).json({ message: 'Venue created' });
  },
  async getById(req: Request, res: Response) {
    res.json({ venue: {} });
  },
  async update(req: Request, res: Response) {
    res.json({ message: 'Venue updated' });
  },
  async remove(req: Request, res: Response) {
    res.json({ message: 'Venue deleted' });
  },
};