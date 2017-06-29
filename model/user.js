"use strict"

const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');
const db = require('../db/db');

class User {

  createUser(email, password, name) {
    var hash = bcrypt.hashSync(password);
    return db.one({
      text: 'INSERT INTO users (email, password, name, date_joined, current_city) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [email, hash, name, moment().format('M-D-YYYY'), 1]
    })
  }

  findByEmail(email) {
    return db.one({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    })
  }

  isValidUser(email, password) {
    var hash = bcrypt.hashSync(password);
    return db.one({
      text: 'SELECT * FROM users WHERE email = $1 and password = $2',
      values: [email, hash]
    })
  }

  updateByEmail(old_email, new_email, password) {
    if (new_email) {
      db.one({
        text: 'UPDATE users SET email = $1 WHERE email = $2',
        values: [new_email, old_email]
      })
    }
    if (password) {
      var hash = bcrypt.hashSync(password);
      db.one({
        text: 'UPDATE users SET password = $1 WHERE email = $2',
        values: [hash, old_email]
      })
    }
  }

}

module.exports = new User(db);
