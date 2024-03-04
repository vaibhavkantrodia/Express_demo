const userModel = require('../models/user.model');
const message = require('../constants/message');


exports.findAllUser = async () => {
  try {
    const users = await userModel.find();
    return {
      totalCount: users.length,
      data: users,
    };
  } catch (error) {
    throw error;
  }
}

exports.findOneUserService = async (id) => {
  try {
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
}

exports.updateUser = async (id, user) => {
  try {
    const { name } = user;
    const updatedUser = await userModel.findByIdAndUpdate(id, { $set: { name: name } }, { new: true });
    if (!updatedUser) {
      throw new Error(message.USER_NOT_FOUND);
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

exports.deleteUser = async (id) => {
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error(message.USER_NOT_FOUND);
    }
    return user;
  } catch (error) {
    throw error;
  }
}