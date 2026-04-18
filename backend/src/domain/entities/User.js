class User {
  constructor(id, username, email, password, role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password; // hashed
    this.role = role || 'student'; // librarian, student
  }
}
module.exports = User;
