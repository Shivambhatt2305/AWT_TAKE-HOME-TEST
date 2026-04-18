const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../../infrastructure/repositories/UserRepository');

class AuthUseCase {
  async register(username, email, password, role) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'student'
    });

    return { id: user.id, username: user.username, email: user.email, role: user.role };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      id: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
  }
}

module.exports = new AuthUseCase();
