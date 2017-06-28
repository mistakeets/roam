const pgp = require('pg-promise')();

const db = pgp('postgres://igibskvnybabbg:0cdebb42c2fcd028bf9d3ef52e01c5e3aa26564e78959ebb4e15797d8f9c3c73@ec2-54-221-220-82.compute-1.amazonaws.com:5432/d19md5vbbujhlc');

module.exports = db;