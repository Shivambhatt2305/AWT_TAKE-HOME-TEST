const AuthUseCase = require('../../application/use-cases/AuthUseCase');
const logger = require('../../infrastructure/logging/logger');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await AuthUseCase.register(username, email, password, role);
    logger.info(`User registered: ${email}`);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthUseCase.login(email, password);
    logger.info(`User logged in: ${email}`);
    res.json(result);
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};
