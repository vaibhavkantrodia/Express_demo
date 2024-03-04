const authService = require('../services/auth.service');
const USER_ROLE = require('../constants/user-role');
const bcrypt = require('bcrypt');
const message = require('../constants/message');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authService.createUser({ name, email, password: hashedPassword, role: USER_ROLE.USER });
    res.status(201).json({ message: message.USER_CREATED_SUCCESSFULLY, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });
    res.status(200).json({ message: message.LOGIN_SUCCESSFULLY, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetpasswordLink = await authService.forgotPassword({ email });
    res.status(200).json({ message: message.FORGOT_PASSWORD, resetpasswordLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const resetpasswordLink = await authService.resetPassword({ token, password });
    res.status(200).json({ message: message.RESET_PASSWORD_SUCCESSFULLY, resetpasswordLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}