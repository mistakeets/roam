class City {

  constructor(db) {
    this.db = db;
  }

  findByEmailById(id) {
    return this.db.one({
      text: 'SELECT * FROM cities WHERE id = $1',
      values: [id]
    })
  }

}

module.exports = new City(db);
