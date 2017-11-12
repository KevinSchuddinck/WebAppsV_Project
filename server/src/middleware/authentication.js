import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const header = req.headers.authorization ? req.headers.authorization.split(' ') : ['Bearer', ''];
  const authToken = header[1];
  try {
    const decoded = jwt.verify(authToken, 'banaansecret');
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'invalid authToken' });
  }
};
