const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Bad email provided'],
  },
  password: {
    type: String,
    required: true,
    // Validation is done within pre hooks
  },
});

adminSchema.pre('save', async function (next) {
  try {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!this.password.match(regex)) {
      return next(new Error('Password failed validation'));
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

adminSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (!this._update.password) return next();

    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!this._update.password.match(regex)) {
      return next(new Error('New password failed validation'));
    }

    const salt = await bcrypt.genSalt(10);
    this._update.password = await bcrypt.hash(this._update.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

adminSchema.methods.checkPassword = async function (input) {
  try {
    return await bcrypt.compare(input, this.password);
  } catch (err) {
    return err;
  }
};

const Admin = model('Admin', adminSchema);

module.exports = Admin;
