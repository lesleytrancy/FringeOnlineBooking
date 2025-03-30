import 'dotenv/config';


export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'SUPER_SECRET',
  expiresIn: 3600,
};
