import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const comparePasswords = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}

export const generateWebToken = (email, firstName, lastName) => {
  const token = jwt.sign({ data:{ email, firstName, lastName }, exp: Math.floor(moment() / 1000) + (60 * 60)}, 'banaansecret');
  return token;
}
