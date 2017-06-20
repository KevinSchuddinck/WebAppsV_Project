import bodyParser from 'body-parser';
import express from 'express';
import config from './config';

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
