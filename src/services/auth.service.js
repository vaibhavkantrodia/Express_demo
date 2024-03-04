const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const message = require('../constants/message');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (user) => {
  try {
    const { name, email, password, role } = user;
    const existsUser = await userModel.findOne({ email });
    if (existsUser) {
      throw new Error(message.EMAIL_ALREADY_EXISTS);
    }

    const salt_hash = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt_hash);

    const newUser = new userModel({ name, email, role, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

exports.login = async (user) => {
  try {
    const { email, password } = user;
    const existsUser = await userModel.findOne({ email: email });
    if (!existsUser) {
      throw new Error(message.INVALID_LOGIN_CREDENTIALS);
    }
    const match = await bcrypt.compare(password, existsUser.password);
    if (!match) {
      throw new Error(message.INVALID_LOGIN_CREDENTIALS);
    }

    const token = jwt.sign({ email: existsUser.email, role: existsUser.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    return { token, data: existsUser };

  } catch (error) {
    throw error;
  }
}

exports.forgotPassword = async (user) => {
  try {
    const { email } = user;
    const existsUser = await userModel.findOne({ email: email.toLowerCase() });
    if (!existsUser) {
      throw new Error(message.USER_NOT_FOUND);
    }
    const token = await jwt.sign({ email: existsUser.email, role: existsUser.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const resetpasswordLink = `http://localhost:3000/auth/forgotPassword/${token}`;
    return resetpasswordLink;
  } catch (error) {
    throw error;
  }
}

exports.resetPassword = async (user) => {
  try {
    const { token, password } = user;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const existsUser = await userModel.findOne({ email: decoded.email });
    if (!existsUser) {
      throw new Error(message.USER_NOT_FOUND);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.findOneAndUpdate({ email: decoded.email }, { password: hashedPassword });
  } catch (error) {
    throw error;
  }
}