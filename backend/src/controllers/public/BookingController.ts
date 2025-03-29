import { Request, Response } from 'express';

export const BookingController = {
  async getSeatMap(req: Request, res: Response) {
    res.json({ seats: [] });
  },
  async bookTicket(req: Request, res: Response) {
    res.status(201).json({ message: 'Ticket booked' });
  },
  async getBookingDetails(req: Request, res: Response) {
    res.json({ booking: {} });
  },
};