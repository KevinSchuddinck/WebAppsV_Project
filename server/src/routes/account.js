import express from 'express';
import Account from '../models/account';
import { comparePasswords, generateWebToken } from '../utils/index';

const router = express.Router();

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  console.log(req.body)
  var account;
  try {
    account = await Account.findOne({ email });
    console.log(account)
    const isValid = await comparePasswords(password, account.password);
    if(!isValid ){
      return res.status(401).json({ message: 'invalid credentials' });
    }
    return res.json({ authToken: generateWebToken(account.email, account.firstName, account.lastName) });
  } catch (err) {
    console.warn('ERROR', err);
    if(account === null || account === ''){
      return res.status(401).json({ message: 'invalid credentials' });
    }
    return res.status(400).json({ message: 'Error while fetching account' });
  }

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
