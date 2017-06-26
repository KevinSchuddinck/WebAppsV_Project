import express from 'express';
import { auth } from '../middleware/authentication';

const router = express.Router();

router.post('/', auth, (req, res, next) => {
  return res.json({ message: 'TODO' });
});

export default router;
