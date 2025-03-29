import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import { swaggerUi, swaggerSpec } from './swagger';
import { AppDataSource } from './config/db';

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('✅ MySQL connection established');
    app.set('db', AppDataSource);
  })
  .catch((err) => {
    console.error('❌ MySQL connection failed:', err);
  });

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Mount the main router
app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

