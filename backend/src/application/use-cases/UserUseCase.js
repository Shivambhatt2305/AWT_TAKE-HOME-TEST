const userRepository = require('../../infrastructure/repositories/UserRepository');

class UserUseCase {
  async getAllUsers() {
    const users = await userRepository.findAll();
    return users.map(u => ({ id: u.id, username: u.username, email: u.email, role: u.role }));
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return { id: user.id, username: user.username, email: user.email, role: user.role };
  }

  async updateUser(id, data) {
    // Sanitize input
    const updateData = {};
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email;
    if (data.role) updateData.role = data.role;

    const user = await userRepository.update(id, updateData);
    if (!user) throw new Error('User not found');
    return { id: user.id, username: user.username, email: user.email, role: user.role };
  }

  async deleteUser(id) {
    const success = await userRepository.delete(id);
    if (!success) throw new Error('User not found');
    return true;
  }
}

module.exports = new UserUseCase();
