import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import config from '../config/index';


const accountSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
    // TODO BlogPosts
});

class AccountClass {
  async setPassword (password) {
    const encryptedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
    this.password = encryptedPassword;
  }
  async comparePassword(password){
    const result = await bcrypt.compare(password, this.password);
    console.warn('encryptedPassword', this.password);
    return result;
  }

  static isValidName (name) {
    return name !== '';
    // TODO Further validation
  }
  static isValidEmail (email) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    console.log(emailRegex.test(email));
    return emailRegex.test(email);
    //return email !== '';
  }
  static isValidPassword (password) {
    //const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    //return passwordRegex.test(password);
    return password !== '';
  }


}

accountSchema.loadClass(AccountClass);
const Account = mongoose.model('Account', accountSchema);
export default Account;
