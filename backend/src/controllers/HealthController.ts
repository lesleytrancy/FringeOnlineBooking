// src/controllers/HealthController.ts
import { Request, Response } from 'express';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export const HealthController = {
  async status(req: Request, res: Response) {
    try {
      const htmlPath = path.join(__dirname, '../statics/health.html');
      const htmlTemplate = await fs.readFile(htmlPath, 'utf-8');

      // Check MySQL
      const mysql = req.app.get('db');

      let mysqlStatus = { text: '❌ Error', class: 'fail' };
      if (mysql) {
        mysqlStatus = await mysql.query('SELECT 1')
        .then(() => ({ text: '✅ Connected', class: 'ok' }))
        .catch(() => ({ text: '❌ Error', class: 'fail' }));
      }

      // Check Redis
      const redis = req.app.get('redis');
      let redisStatus = { text: '❌ Error', class: 'fail' };
      if (redis) {
        redisStatus = await redis.ping()
        .then((pong: string) => ({
          text: pong === 'PONG' ? '✅ Connected' : '❌ Ping Failed',
          class: pong === 'PONG' ? 'ok' : 'fail'
        }))
        .catch(() => ({ text: '❌ Error', class: 'fail' }));
      }
      

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
  },
  async checkStatus(req: Request, res: Response) {
    try {
      // Check MySQL
      const mysql = req.app.get('db');
      const mysqlStatus = mysql
        ? await mysql.query('SELECT 1')
            .then(() => 'connected')
            .catch(() => 'error')
        : 'not_configured';

      // Check Redis
      const redis = req.app.get('redis');
      const redisStatus = redis
        ? await redis.ping()
            .then((pong: string) => (pong === 'PONG' ? 'connected' : 'unreachable'))
            .catch(() => 'error')
        : 'not_configured';

      // System Stats
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const memoryUsagePercent = ((1 - freeMem / totalMem) * 100).toFixed(1);
      const memory = {
        usage: `${memoryUsagePercent}%`,
        totalGB: (totalMem / 1024 ** 3).toFixed(1),
        usedGB: ((totalMem - freeMem) / 1024 ** 3).toFixed(1),
      };

      const cpus = os.cpus();
      const avgIdle = cpus.reduce((acc, c) => acc + c.times.idle, 0) / cpus.length;
      const avgTotal = cpus.reduce((acc, c) => {
        const t = c.times;
        return acc + t.user + t.nice + t.sys + t.idle + t.irq;
      }, 0) / cpus.length;
      const cpuUsage = (100 - (avgIdle / avgTotal) * 100).toFixed(1);

      // Build response
      const response = {
        status: mysqlStatus === 'connected' && redisStatus === 'connected' ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        services: {
          mysql: mysqlStatus,
          redis: redisStatus,
        },
        system: {
          cpuUsage: `${cpuUsage}%`,
          memory,
        },
      };

      res.status(200).json(response);
    } catch (err) {
      console.error('Health check failed:', err);
      res.status(503).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Health check failed',
      });
    }
  }
};
