import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,         // 🔁 true in dev, false in prod (use migrations)
  logging: false,
  entities: [__dirname + '/../entities/*.ts'],
  migrations: [__dirname + '/../migrations/*.ts'],
  migrationsRun: true
});
