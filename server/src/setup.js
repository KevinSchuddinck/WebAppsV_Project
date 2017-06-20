import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/development';
import accountRoutes from './routes/account';

const setupDatabase = () => {
  mongoose.Promise = global.Promise;
  console.log(`connecting to ${config.DATABASE_URL}`);
  mongoose.connect(config.DATABASE_URL);
  const db = mongoose.connection;
  db.on('error', () => { console.log('Database error') });
  db.once('open', () => { console.log('Database connection established') });
};

const setupExpress = () => {
  // Routes
  const app = express();
  // Middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/account', accountRoutes);

  app.get('/api', (req, res, next) => {
    res.json({ message: 'Hello World!' });
  })

  app.listen(config.PORT, () => {
    console.log(`Express server started on port ${config.PORT}`)
  });
};

export { setupDatabase, setupExpress };
