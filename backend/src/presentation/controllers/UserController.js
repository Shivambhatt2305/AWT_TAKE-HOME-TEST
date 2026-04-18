const UserUseCase = require('../../application/use-cases/UserUseCase');
const logger = require('../../infrastructure/logging/logger');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserUseCase.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserUseCase.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await UserUseCase.updateUser(req.params.id, req.body);
    logger.info(`User updated: ${user.id} by ${req.user.id}`);
    res.json(user);
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserUseCase.deleteUser(req.params.id);
    logger.info(`User deleted: ${req.params.id} by ${req.user.id}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};
