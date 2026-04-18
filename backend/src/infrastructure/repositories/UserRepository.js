const User = require('../database/models/User');

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    await user.save();
    return this._formatUser(user);
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user ? this._formatUser(user) : null;
  }

  async findById(id) {
    const user = await User.findById(id);
    return user ? this._formatUser(user) : null;
  }
  
  async findAll() {
    const users = await User.find();
    return users.map(user => this._formatUser(user));
  }

  async update(id, data) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user ? this._formatUser(user) : null;
  }

  async delete(id) {
    const result = await User.findByIdAndDelete(id);
    return result != null;
  }

  // Helper to map _id to id so use cases don't break
  _formatUser(userDoc) {
    // Return lean object
    const obj = userDoc.toObject();
    obj.id = obj._id.toString();
    return obj;
  }
}

module.exports = new UserRepository();
