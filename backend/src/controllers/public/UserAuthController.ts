import { AppDataSource } from '../../config/db';
import { User } from '../../entities/User';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { generateToken } from '../../utils/jwt';

const userRepo = AppDataSource.getRepository(User);

export const UserAuthController = {
  register: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const existing = await userRepo.findOne({ where: { email } });
      if (existing)
      {
        res.status(400).json({ message: 'Email already registered' });
      }
      else
      {
        //TODO send email by email address, and  send the verification link inside.
        const hashed = await bcrypt.hash(password, 10);
        const user = userRepo.create({ email, password: hashed });
        await userRepo.save(user);
  
        res.status(201).json({ message: 'User registered' });
      }       
    } catch (err) {
      res.status(500).json({ message: 'Registration failed', error: err });
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await userRepo.findOne({ where: { email } });
      if (!user)
      {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      } 

      const match = await bcrypt.compare(password, user.password);
      if (!match) 
      {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      } 
      const token = generateToken({ userId: user.id, role: 'user', email: user.email });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Login failed', error: err });
    }
  },
};