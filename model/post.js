
Class Post {

  constructor(db) {
    this.db = db;
  }

  createPost(title, post_body, user_id, city_id) {
    return this.db.one({
      text: 'INSERT INTO posts (title, post_body, user_id, city_id)',
      values: [title, post_body, user_id, city_id]
    })
  }

  findPostsByCity(city_id) {
    return this.db.any({
      text: 'SELECT * FROM posts WHERE city_id = $1',
      values: [city_id]
    })
  }

}

module.exports = new Post(db);