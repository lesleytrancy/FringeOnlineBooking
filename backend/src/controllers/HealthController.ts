// src/controllers/HealthController.ts
import { Request, Response } from 'express';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export const HealthController = {
  async status(req: Request, res: Response) {
    try {
      const htmlPath = path.join(__dirname, '../statics/health.html');
      console.log('Reading file from:', htmlPath);
      const htmlTemplate = await fs.readFile(htmlPath, 'utf-8');

      // Check MySQL
      const mysqlStatus = await req.app.get('db').query('SELECT 1')
        .then(() => ({ text: '✅ Connected', class: 'ok' }))
        .catch(() => ({ text: '❌ Error', class: 'fail' }));

      console.log('DB', mysqlStatus);
      // Check Redis
      const redis = req.app.get('redis');
      const redisStatus = await redis.ping()
        .then((pong: string) => ({
          text: pong === 'PONG' ? '✅ Connected' : '❌ Ping Failed',
          class: pong === 'PONG' ? 'ok' : 'fail'
        }))
        .catch(() => ({ text: '❌ Error', class: 'fail' }));

      // System Usage
      const totalMem = os.totalmem();

      console.log('Reading file from:', totalMem);
      const freeMem = os.freemem();
      const memoryUsage = `${((1 - freeMem / totalMem) * 100).toFixed(1)}% used (${(totalMem / 1024 ** 3).toFixed(1)} GB total)`;

      const cpus = os.cpus();
      const avgIdle = cpus.reduce((acc, c) => acc + c.times.idle, 0) / cpus.length;
      const avgTotal = cpus.reduce((acc, c) => {
        const t = c.times;
        return acc + t.user + t.nice + t.sys + t.idle + t.irq;
      }, 0) / cpus.length;
      const cpuUsage = `${(100 - (avgIdle / avgTotal) * 100).toFixed(1)}`;

      // Inject values into HTML
      const result = htmlTemplate
        .replace('{{mysqlStatus}}', mysqlStatus.text)
        .replace('{{mysqlStatusClass}}', mysqlStatus.class)
        .replace('{{redisStatus}}', redisStatus.text)
        .replace('{{redisStatusClass}}', redisStatus.class)
        .replace('{{cpuUsage}}', cpuUsage)
        .replace('{{memoryUsage}}', memoryUsage)
        .replace('{{time}}', new Date().toLocaleTimeString());

      res.send(result);
    } catch (err) {
      console.log('Error', err);
      res.status(500).send('Error loading health page');
    }
  }
};
