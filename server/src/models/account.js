import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
// import Regex from 'regex';
import config from '../config/index';

const accountSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    id: { type: String, unique: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
    // TODO BlogPosts
});

class AccountClass {
  async setPassword (password) {
    const encryptedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
    this.password = encryptedPassword;
  }
  static isValidName (name) {
    return name !== '';
    // TODO Further validation
  }
  static isValidEmail (email) {
    // const emailRegex = new Regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    // return emailRegex.test(email);
    return email !== '';
  }
  static isValidPassword (password) {
    // const passwordRegex = new Regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    // return passwordRegex.test(password);
    return password !== '';
  }
}

accountSchema.loadClass(AccountClass);
const Account = mongoose.model('Account', accountSchema);
export default Account;
