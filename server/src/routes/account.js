import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.post('/login', (req, res, next) => {
  res.json({ message: 'TODO' });
});

router.post('/register', async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;
  const validationErrors = {};
  if (!Account.isValidEmail(email)) {
    validationErrors['EMAIL'] = 'Invalid email';
  }
  if (!Account.isValidName(firstName)) {
    validationErrors['FIRSTNAME'] = 'Invalid firstName';
  }
  if (!Account.isValidName(lastName)) {
    validationErrors['LASTNAME'] = 'Invalid lastName';
  }
  if (!Account.isValidPassword(password)) {
    validationErrors['PASSWORD'] = 'Invalid password';
  }
  if (Object.keys(validationErrors).length !== 0) {
    return res.status(400).json({ errors: validationErrors });
  }
  const account = new Account();
  await account.setPassword(password);
  account.email = email;
  account.firstName = firstName;
  account.lastName = lastName;
  try {
    await account.save();
  } catch (err) {
    console.warn('ERROR', err);
    return res.status(400).json({ message: 'Error while saving account' });
  }
  return res.status(201).json({ email, firstName, lastName });
});

router.get('/', (req, res, next) => {
  res.json({ message: 'TODO' });
});

export default router;
