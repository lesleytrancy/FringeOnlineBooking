import { createClient } from 'redis';
import 'dotenv/config';

export const redisClient = createClient({
  socket: {
    host: process.env.CACHE_HOST,
    port: Number(process.env.CACHE_PORT),
  },
  username: process.env.CACHE_USERNAME || undefined,
  password: process.env.CACHE_PASSWORD || undefined,
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('✅ Redis connected');
  }
}
