import { Request, Response } from 'express';

export const AdminSettingsController = {
  async getAll(req: Request, res: Response) {
    // TODO: Fetch all admin settings
    res.json({ settings: [] });
  },

  async updateSetting(req: Request, res: Response) {
    const { key } = req.params;
    // TODO: Update setting value
    res.json({ message: `Setting ${key} updated` });
  },
};