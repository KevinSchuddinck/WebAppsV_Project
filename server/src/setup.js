import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/index';
import accountRoutes from './routes/account';
import blogPostRoutes from './routes/blogPost';

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
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/api/account', accountRoutes);
  app.use('/api/blogpost', blogPostRoutes);

  app.get('/api', (req, res, next) => {
    res.json({ message: 'Hello World!' });
  })

  app.listen(config.PORT, () => {
    console.log(`Express server started on port ${config.PORT}`)
  });
};

export { setupDatabase, setupExpress };
