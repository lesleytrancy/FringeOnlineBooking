import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';

console.log(process.env.DB_HOST);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,         // 🔁 true in dev, false in prod (use migrations)
  logging: false,
  entities: [path.join(__dirname, '/entities/**/*.ts')],
  migrations: [path.join(__dirname, '/migrations/**/*.ts')],
  subscribers: [],
});
