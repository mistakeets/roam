const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

Class User {

  constructor(db) {
    this.db = db;
  }

  createUser(email, password, name) {
    var hash = bcrypt.hashSync(password);
    return this.db.one({
      text: 'INSERT INTO users (name, email, password, date_joined)',
      values: [name, email, hash, moment().format()]
    })
  }

  findByEmail(email) {
    return this.db.one({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    })
  }

  isValidUser(email, password) {
    var hash = bcrypt.hashSync(password);
    return this.db.one({
      text: 'SELECT * FROM users WHERE email = $1 and password = $2',
      values: [email, hash]
    })
  }

  updateByEmail(old_email, new_email, password) {
    if (new_email) {
      this.db.one({
        text: 'UPDATE users SET email = $1 WHERE email = $2',
        values: [new_email, old_email]
      })
    }
    if (password) {
      var hash = bcrypt.hashSync(password);
      this.db.one({
        text: 'UPDATE users SET password = $1 WHERE email = $2',
        values: [hash, old_email]
      })
    }
  }

}

module.exports = new User(db);