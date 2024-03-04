const userService = require('../services/user.service');
const message = require('../constants/message');


exports.findAllUser = async (req, res) => {
  try {
    const users = await userService.findAllUser();
    res.status(200).json({ message: message.USER_LIST_FETCHED_SUCCESSFULLY, data: users });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.findOneUser = async (req, res) => {
  try {
    const user = await userService.findOneUserService(req.params.id);
    res.status(200).json({ message: message.USER_FETCHED_SUCCESSFULLY, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ message: message.USER_UPDATED_SUCCESSFULLY, data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json({ message: message.USER_DELETED_SUCCESSFULLY });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}