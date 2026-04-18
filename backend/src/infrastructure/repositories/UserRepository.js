const crypto = require('crypto');
const User = require('../../domain/entities/User');

class UserRepository {
  constructor() {
    this.users = [];
  }

  async create(userData) {
    const user = new User(
      crypto.randomUUID(),
      userData.username,
      userData.email,
      userData.password,
      userData.role
    );
    this.users.push(user);
    return user;
  }

  async findByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  async findById(id) {
    return this.users.find(u => u.id === id);
  }
  
  async findAll() {
    return this.users;
  }

  async update(id, data) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

// Export a singleton instance
module.exports = new UserRepository();
